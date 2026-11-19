/**
 * quizEngine — framework-free quiz logic shared by Shastra Study (and, later,
 * the NCERT school track).
 *
 * Two modes:
 *  - practice: immediate feedback, retries allowed, hints shown, and every
 *    question missed on the first try is asked again in a review round at the
 *    end. Only the FIRST attempt counts towards the score.
 *  - exam: one attempt per question, no hints, no feedback until the end,
 *    questions and options shuffled. Score >= PASS_MARK passes the topic.
 *
 * Spaced repetition: each question has a Leitner card (boxes 1-5). A correct
 * first attempt moves it up a box (longer interval); a miss sends it back to
 * box 1. Due cards are asked first in practice sessions.
 *
 * Everything here is pure (no DOM, no storage) so it can be unit-tested.
 */

export type QuizMode = "practice" | "exam";

export const PASS_MARK = 80;

/** Days until a card is due again, indexed by Leitner box (1-5). */
export const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 35] as const;
export const MAX_BOX = 5;

const DAY_MS = 24 * 60 * 60 * 1000;

export interface Card {
  box: number;
  /** Epoch ms at which the card is due for review. */
  due: number;
  seen: number;
  correct: number;
}

export interface AnswerRecord {
  firstChoice: number;
  /** Was the first attempt correct? This is what the score uses. */
  correct: boolean;
  attempts: number;
}

export type Phase = "main" | "review" | "done";

export interface QuizSession {
  mode: QuizMode;
  /** Question ids for the main round, in the order they are asked. */
  order: string[];
  /** Ids missed in practice, asked again after the main round. */
  reviewQueue: string[];
  phase: Phase;
  /** Position within the current phase's list. */
  index: number;
  answers: Record<string, AnswerRecord>;
  /** Ids already solved in the current visit (practice), used to lock the card. */
  solved: string[];
}

export type Rng = () => number;

/** Fisher-Yates shuffle that does not mutate its input. */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** A permutation of option indexes, e.g. [2, 0, 3, 1]. */
export function optionOrder(count: number, rng: Rng = Math.random): number[] {
  return shuffle(Array.from({ length: count }, (_, i) => i), rng);
}

export function isDue(card: Card | undefined, now: number): boolean {
  return !card || card.due <= now;
}

/**
 * Order for a practice session: cards that are due (missed or scheduled) first,
 * then never-seen questions, then the rest — each group keeping topic order.
 */
export function practiceOrder(ids: readonly string[], cards: Record<string, Card>, now: number): string[] {
  const due = ids.filter((id) => cards[id] && cards[id].due <= now);
  const unseen = ids.filter((id) => !cards[id]);
  const rest = ids.filter((id) => cards[id] && cards[id].due > now);
  return [...due, ...unseen, ...rest];
}

export function createSession(
  ids: readonly string[],
  mode: QuizMode,
  opts: { cards?: Record<string, Card>; now?: number; rng?: Rng } = {}
): QuizSession {
  const { cards = {}, now = Date.now(), rng = Math.random } = opts;
  const order = mode === "exam" ? shuffle(ids, rng) : practiceOrder(ids, cards, now);
  return { mode, order, reviewQueue: [], phase: order.length ? "main" : "done", index: 0, answers: {}, solved: [] };
}

/** The question id currently being asked, or null when the session is done. */
export function currentId(s: QuizSession): string | null {
  if (s.phase === "main") return s.order[s.index] ?? null;
  if (s.phase === "review") return s.reviewQueue[s.index] ?? null;
  return null;
}

export interface AnswerResult {
  session: QuizSession;
  /** Whether this particular choice was right (practice feedback). */
  correct: boolean;
  /** True when this question is finished and the learner may move on. */
  canAdvance: boolean;
}

/**
 * Record a choice for the current question.
 *  - exam: always one attempt; the answer is locked immediately.
 *  - practice: the first attempt is scored; wrong choices may be retried until
 *    correct, and a first-attempt miss is queued for the review round.
 *  - review round: attempts are not scored again.
 */
export function answer(s: QuizSession, choice: number, correctIndex: number): AnswerResult {
  const id = currentId(s);
  if (!id) return { session: s, correct: false, canAdvance: false };
  const correct = choice === correctIndex;
  const answers = { ...s.answers };
  let reviewQueue = s.reviewQueue;
  let solved = s.solved;

  if (s.phase === "main") {
    const prev = answers[id];
    if (!prev) {
      answers[id] = { firstChoice: choice, correct, attempts: 1 };
      if (!correct && s.mode === "practice" && !reviewQueue.includes(id)) {
        reviewQueue = [...reviewQueue, id];
      }
    } else if (s.mode === "practice") {
      answers[id] = { ...prev, attempts: prev.attempts + 1 };
    } else {
      // Exam answers are final.
      return { session: s, correct: prev.correct, canAdvance: true };
    }
  }

  const done = s.mode === "exam" || correct;
  if (done && s.mode === "practice" && !solved.includes(`${s.phase}:${id}`)) {
    solved = [...solved, `${s.phase}:${id}`];
  }

  return { session: { ...s, answers, reviewQueue, solved }, correct, canAdvance: done };
}

/** Move to the next question, entering the review round or finishing as needed. */
export function advance(s: QuizSession): QuizSession {
  const list = s.phase === "main" ? s.order : s.reviewQueue;
  if (s.index + 1 < list.length) return { ...s, index: s.index + 1 };
  if (s.phase === "main" && s.mode === "practice" && s.reviewQueue.length > 0) {
    return { ...s, phase: "review", index: 0 };
  }
  return { ...s, phase: "done", index: 0 };
}

export interface QuizScore {
  correct: number;
  total: number;
  percent: number;
  passed: boolean;
  missed: string[];
}

/** Score = first-attempt correct answers over all questions in the topic. */
export function score(s: QuizSession): QuizScore {
  const total = s.order.length;
  const missed = s.order.filter((id) => !s.answers[id]?.correct);
  const correct = total - missed.length;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  return { correct, total, percent, passed: percent >= PASS_MARK, missed };
}

/** Leitner update for one question after its first attempt in a session. */
export function updateCard(card: Card | undefined, correct: boolean, now: number): Card {
  const prevBox = card?.box ?? 0;
  const box = correct ? Math.min(MAX_BOX, Math.max(1, prevBox + 1)) : 1;
  // A miss is due again tomorrow; a hit waits for its box interval.
  const days = correct ? BOX_INTERVAL_DAYS[box] : 1;
  return {
    box,
    due: now + days * DAY_MS,
    seen: (card?.seen ?? 0) + 1,
    correct: (card?.correct ?? 0) + (correct ? 1 : 0),
  };
}

/** Apply the first-attempt results of a finished session to the card store. */
export function applySession(cards: Record<string, Card>, s: QuizSession, now: number): Record<string, Card> {
  const next = { ...cards };
  for (const id of s.order) {
    const a = s.answers[id];
    if (a) next[id] = updateCard(next[id], a.correct, now);
  }
  return next;
}

/** Ids among `ids` that are due for review (seen before and now due). */
export function dueIds(ids: readonly string[], cards: Record<string, Card>, now: number): string[] {
  return ids.filter((id) => cards[id] && cards[id].due <= now);
}

/** Share of questions in a topic held in box >= 3 (reviewed successfully twice). */
export function mastery(ids: readonly string[], cards: Record<string, Card>): number {
  if (!ids.length) return 0;
  const strong = ids.filter((id) => (cards[id]?.box ?? 0) >= 3).length;
  return Math.round((strong / ids.length) * 100);
}
