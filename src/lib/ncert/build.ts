import type { QuestionKind, QuizQuestion, QuizTopic } from "../quizContent.ts";

/** One question as written in the class files: option 0 is the correct answer. */
export interface Q {
  kind: QuestionKind;
  prompt: string;
  verse?: string;
  options: [string, string, string, string];
  hint: string;
  explanation: string;
}

/**
 * Build an NCERT chapter topic.
 * @param cls      class number (6, 7, 8 …)
 * @param lesson   lesson number in the textbook
 * @param book     textbook name, e.g. "दीपकम्"
 * @param title    lesson title in Devanagari, as printed
 * @param summary  one-line English summary of the lesson
 * @param opts.key   short book key for classes with several books, e.g. "shemushi";
 *                   the id becomes c10-shemushi-01 instead of c10-01
 * @param opts.short label for the topic list, e.g. "शेमुषी" → "शेमुषी · Lesson 1"
 */
export function chapter(
  cls: number,
  lesson: number,
  book: string,
  title: string,
  summary: string,
  questions: Q[],
  opts: { key?: string; short?: string } = {}
): QuizTopic {
  const nn = String(lesson).padStart(2, "0");
  const id = opts.key ? `c${cls}-${opts.key}-${nn}` : `c${cls}-${nn}`;
  return {
    id,
    group: `Class ${cls}`,
    text: `Class ${cls} · ${book} · Lesson ${lesson}`,
    short: opts.key ? `${opts.short ?? book} · Lesson ${lesson}` : `Lesson ${lesson}`,
    title,
    summary,
    questions: questions.map(
      (q, i): QuizQuestion => ({
        id: `${id}-${i + 1}`,
        kind: q.kind,
        prompt: q.prompt,
        verse: q.verse,
        ref: q.verse ? `NCERT ${book}, Class ${cls}, Lesson ${lesson}` : undefined,
        options: [...q.options],
        correctIndex: 0,
        hint: q.hint,
        explanation: q.explanation,
      })
    ),
  };
}
