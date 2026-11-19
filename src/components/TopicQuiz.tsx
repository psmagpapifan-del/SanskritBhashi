import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, CheckCircle2, ClipboardCheck, GraduationCap, Lightbulb, RotateCcw, Trophy, XCircle } from "lucide-react";
import type { QuizQuestion, QuizTopic } from "../lib/quizContent";
import {
  advance,
  answer,
  applySession,
  createSession,
  currentId,
  dueIds,
  mastery,
  optionOrder,
  PASS_MARK,
  score,
  type Card,
  type QuizMode,
  type QuizSession,
} from "../lib/quizEngine";
import { prefGet, prefSet, hapticImpact } from "../lib/capacitorBridge";
import { hasDevanagari, renderSanskrit, sanskritLang } from "../lib/transliterate";
import { useScript } from "../lib/useScript";
import ErrorReportButton from "./ErrorReportButton";

/* ─── Persistence ─────────────────────────────────────────────────────────── */

interface TopicStats {
  bestPractice: number;
  bestExam: number;
  examPassed: boolean;
  lastPlayed: string;
}

interface TopicStore {
  cards: Record<string, Card>;
  topics: Record<string, TopicStats>;
}

const EMPTY_STORE: TopicStore = { cards: {}, topics: {} };

function loadStore(key: string): TopicStore {
  try {
    const raw = prefGet(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { cards: parsed.cards ?? {}, topics: parsed.topics ?? {} };
    }
  } catch {
    /* corrupt or unavailable storage: start fresh */
  }
  return EMPTY_STORE;
}

function saveStore(key: string, store: TopicStore) {
  try {
    prefSet(key, JSON.stringify(store));
  } catch {
    /* ignore */
  }
}

/* ─── UI strings ──────────────────────────────────────────────────────────── */

const STRINGS = {
  en: {
    topics: "Topics", practice: "Practice", exam: "Exam",
    practiceHelp: "Instant feedback and hints. Questions you miss come back at the end and in later reviews.",
    examHelp: `One attempt per question, no hints. Score ${PASS_MARK}% or more to pass the topic.`,
    question: "Question", of: "of", review: "Review round: questions you missed",
    correct: "Correct!", tryAgain: "Not quite. Try again.", hint: "Hint",
    next: "Next", finish: "See results", submit: "Submit answer",
    results: "Results", firstTry: "first-try score", passed: "Passed", notPassed: "Not passed yet",
    passNote: `Pass mark: ${PASS_MARK}%`, missed: "Questions to revisit", allCorrect: "Every question correct on the first try.",
    yourAnswer: "Your answer", rightAnswer: "Correct answer",
    again: "Practise again", takeExam: "Take the exam", backToPractice: "Back to practice",
    mastery: "mastery", due: "due", best: "Best exam", start: "Start",
    reviewDue: (n: number) => `${n} question${n === 1 ? "" : "s"} due for review`,
  },
  hi: {
    topics: "विषय", practice: "अभ्यास", exam: "परीक्षा",
    practiceHelp: "तुरंत प्रतिक्रिया और संकेत। चूके हुए प्रश्न अंत में और बाद की पुनरावृत्ति में फिर आते हैं।",
    examHelp: `प्रत्येक प्रश्न का एक ही प्रयास, कोई संकेत नहीं। विषय उत्तीर्ण करने के लिए ${PASS_MARK}% या अधिक अंक लाएँ।`,
    question: "प्रश्न", of: "/", review: "पुनरावृत्ति: जो प्रश्न चूक गए",
    correct: "सही!", tryAgain: "ठीक नहीं। फिर प्रयास करें।", hint: "संकेत",
    next: "अगला", finish: "परिणाम देखें", submit: "उत्तर दें",
    results: "परिणाम", firstTry: "पहले प्रयास के अंक", passed: "उत्तीर्ण", notPassed: "अभी उत्तीर्ण नहीं",
    passNote: `उत्तीर्णांक: ${PASS_MARK}%`, missed: "दोबारा देखने योग्य प्रश्न", allCorrect: "सभी प्रश्न पहले प्रयास में सही।",
    yourAnswer: "आपका उत्तर", rightAnswer: "सही उत्तर",
    again: "फिर अभ्यास करें", takeExam: "परीक्षा दें", backToPractice: "अभ्यास पर लौटें",
    mastery: "दक्षता", due: "शेष", best: "सर्वश्रेष्ठ परीक्षा", start: "आरंभ",
    reviewDue: (n: number) => `${n} प्रश्न पुनरावृत्ति के लिए शेष`,
  },
  ja: {
    topics: "トピック", practice: "練習", exam: "試験",
    practiceHelp: "すぐにフィードバックとヒントが表示されます。間違えた問題は最後と後日の復習でもう一度出題されます。",
    examHelp: `各問題は1回のみ、ヒントなし。${PASS_MARK}%以上で合格です。`,
    question: "問題", of: "/", review: "復習ラウンド：間違えた問題",
    correct: "正解！", tryAgain: "惜しい。もう一度。", hint: "ヒント",
    next: "次へ", finish: "結果を見る", submit: "回答する",
    results: "結果", firstTry: "初回正答率", passed: "合格", notPassed: "まだ不合格",
    passNote: `合格点：${PASS_MARK}%`, missed: "見直す問題", allCorrect: "すべて1回目で正解しました。",
    yourAnswer: "あなたの答え", rightAnswer: "正解",
    again: "もう一度練習", takeExam: "試験を受ける", backToPractice: "練習に戻る",
    mastery: "習熟度", due: "復習", best: "試験の最高点", start: "開始",
    reviewDue: (n: number) => `復習予定の問題：${n}問`,
  },
  es: {
    topics: "Temas", practice: "Práctica", exam: "Examen",
    practiceHelp: "Respuesta inmediata y pistas. Las preguntas falladas vuelven al final y en repasos posteriores.",
    examHelp: `Un intento por pregunta, sin pistas. Obtenga ${PASS_MARK}% o más para aprobar el tema.`,
    question: "Pregunta", of: "de", review: "Repaso: preguntas falladas",
    correct: "¡Correcto!", tryAgain: "No exactamente. Inténtelo de nuevo.", hint: "Pista",
    next: "Siguiente", finish: "Ver resultados", submit: "Responder",
    results: "Resultados", firstTry: "acierto al primer intento", passed: "Aprobado", notPassed: "Aún no aprobado",
    passNote: `Nota de aprobado: ${PASS_MARK}%`, missed: "Preguntas para repasar", allCorrect: "Todas correctas al primer intento.",
    yourAnswer: "Su respuesta", rightAnswer: "Respuesta correcta",
    again: "Practicar de nuevo", takeExam: "Hacer el examen", backToPractice: "Volver a la práctica",
    mastery: "dominio", due: "pendientes", best: "Mejor examen", start: "Empezar",
    reviewDue: (n: number) => `${n} pregunta${n === 1 ? "" : "s"} para repasar`,
  },
};

type Strings = (typeof STRINGS)["en"];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

const LABELS = ["A", "B", "C", "D", "E"];

function topicFromUrl(topics: QuizTopic[]): string {
  if (typeof window === "undefined") return topics[0].id;
  const id = new URLSearchParams(window.location.search).get("topic");
  return topics.some((t) => t.id === id) ? id! : topics[0].id;
}

/* ─── Component ───────────────────────────────────────────────────────────── */

export interface TopicQuizProps {
  topics: QuizTopic[];
  /** Preference key the progress is saved under (e.g. "sb_shastra_v1"). */
  storeKey: string;
  /** DOM id of the quiz card (scroll target; used by tests). */
  cardId?: string;
  /** Override the "Topics" heading of the list. */
  listTitle?: string;
  activeLang?: string;
}

export default function TopicQuiz({ topics, storeKey, cardId = "topic-quiz-card", listTitle, activeLang = "en" }: TopicQuizProps) {
  const s: Strings = (STRINGS as Record<string, Strings>)[activeLang] ?? STRINGS.en;
  const byId = useMemo(
    () => new Map<string, QuizQuestion>(topics.flatMap((t) => t.questions.map((q) => [q.id, q] as const))),
    [topics]
  );
  const groups = useMemo(() => [...new Set(topics.map((t) => t.group).filter((g): g is string => !!g))], [topics]);

  const [store, setStore] = useState<TopicStore>(EMPTY_STORE);
  const [topicId, setTopicId] = useState<string>(topics[0].id);
  const [mode, setMode] = useState<QuizMode>("practice");
  const [session, setSession] = useState<QuizSession>(() =>
    createSession(topics[0].questions.map((q) => q.id), "practice", { rng: () => 0.5 })
  );
  // Option display order per question id (shuffled on the client only).
  const [orders, setOrders] = useState<Record<string, number[]>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [wrongChoices, setWrongChoices] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);
  // Sanskrit in verses and options follows the Transliteration Script setting.
  const script = useScript();
  const tx = (text: string) => renderSanskrit(text, script);

  const topic: QuizTopic = topics.find((t) => t.id === topicId) ?? topics[0];
  const [group, setGroup] = useState<string | undefined>(topics[0].group);
  const visibleTopics = groups.length ? topics.filter((t) => t.group === group) : topics;

  const start = useCallback(
    (nextTopic: string, nextMode: QuizMode, cards: Record<string, Card>) => {
      const t = topics.find((x) => x.id === nextTopic) ?? topics[0];
      const ids = t.questions.map((q) => q.id);
      setSession(createSession(ids, nextMode, { cards, now: Date.now() }));
      setOrders(Object.fromEntries(t.questions.map((q) => [q.id, optionOrder(q.options.length)])));
      setSelected(null);
      setFeedback(null);
      setWrongChoices([]);
    },
    [topics]
  );

  // Load saved progress and the topic from the URL once on the client.
  useEffect(() => {
    const loaded = loadStore(storeKey);
    const fromUrl = topicFromUrl(topics);
    setStore(loaded);
    setTopicId(fromUrl);
    setGroup(topics.find((t) => t.id === fromUrl)?.group);
    start(fromUrl, "practice", loaded.cards);
    setHydrated(true);

    const onPop = () => {
      const id = topicFromUrl(topics);
      setTopicId(id);
      setGroup(topics.find((t) => t.id === id)?.group);
      setMode("practice");
      start(id, "practice", loadStore(storeKey).cards);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [start, storeKey, topics]);

  const chooseTopic = (id: string) => {
    if (id === topicId && session.phase !== "done") return;
    const url = new URL(window.location.href);
    url.searchParams.set("topic", id);
    window.history.pushState({}, "", url.toString());
    setTopicId(id);
    setMode("practice");
    start(id, "practice", store.cards);
    document.getElementById(cardId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseMode = (m: QuizMode) => {
    setMode(m);
    start(topicId, m, store.cards);
  };

  const qid = currentId(session);
  const question = qid ? byId.get(qid) : undefined;
  const order = (question && orders[question.id]) || (question ? question.options.map((_, i) => i) : []);
  const isExam = mode === "exam";
  const locked = feedback === "correct" || (isExam && selected !== null && session.answers[qid ?? ""] !== undefined);

  const onChoose = (originalIndex: number) => {
    if (!question || locked) return;
    if (isExam) {
      setSelected(originalIndex);
      return;
    }
    const r = answer(session, originalIndex, question.correctIndex);
    setSession(r.session);
    setSelected(originalIndex);
    if (r.correct) {
      setFeedback("correct");
      hapticImpact("light").catch(() => {});
    } else {
      setFeedback("incorrect");
      setWrongChoices((w) => [...w, originalIndex]);
      hapticImpact("medium").catch(() => {});
    }
  };

  const finishIfDone = (next: QuizSession) => {
    if (next.phase !== "done") return;
    const now = Date.now();
    const sc = score(next);
    const prev = store.topics[topicId] ?? { bestPractice: 0, bestExam: 0, examPassed: false, lastPlayed: "" };
    const updated: TopicStore = {
      cards: applySession(store.cards, next, now),
      topics: {
        ...store.topics,
        [topicId]: {
          bestPractice: next.mode === "practice" ? Math.max(prev.bestPractice, sc.percent) : prev.bestPractice,
          bestExam: next.mode === "exam" ? Math.max(prev.bestExam, sc.percent) : prev.bestExam,
          examPassed: prev.examPassed || (next.mode === "exam" && sc.passed),
          lastPlayed: new Date(now).toISOString(),
        },
      },
    };
    setStore(updated);
    saveStore(storeKey, updated);
    // Keeps the shared streak counter in sync with other practice modules.
    window.dispatchEvent(new Event("practiceCompleted"));
  };

  const onNext = () => {
    if (!question) return;
    let next = session;
    if (isExam) {
      if (selected === null) return;
      next = answer(session, selected, question.correctIndex).session;
    }
    next = advance(next);
    setSession(next);
    setSelected(null);
    setFeedback(null);
    setWrongChoices([]);
    finishIfDone(next);
  };

  const now = hydrated ? Date.now() : 0;
  const totalDue = hydrated ? dueIds([...byId.keys()], store.cards, now).length : 0;
  const result = session.phase === "done" ? score(session) : null;
  const position = session.index + 1;
  const total = session.phase === "review" ? session.reviewQueue.length : session.order.length;

  return (
    <div className="w-full flex flex-col xl:flex-row gap-6 items-start">
      {/* Topic list */}
      <nav aria-label={listTitle ?? s.topics} className="order-2 xl:order-1 w-full xl:w-1/3 bg-white dark:bg-zinc-900 border border-saffron-100 dark:border-zinc-800 rounded-3xl p-4 space-y-3 xl:sticky xl:top-20">
        <h2 className="text-xs font-black text-charcoal/70 uppercase tracking-widest font-latin px-1">{listTitle ?? s.topics}</h2>
        {groups.length > 1 && (
          <div role="tablist" aria-label={listTitle ?? s.topics} className="flex flex-wrap gap-1.5">
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                role="tab"
                aria-selected={g === group}
                data-group={g}
                onClick={() => setGroup(g)}
                className={`px-3 py-1 rounded-full text-xs font-bold font-latin cursor-pointer border transition-colors ${
                  g === group
                    ? "bg-charcoal text-white border-charcoal dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-saffron-100 dark:border-zinc-700 text-charcoal/80 hover:bg-saffron-50 dark:hover:bg-zinc-800"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        )}
        {totalDue > 0 && (
          <p className="text-xs font-semibold text-saffron-700 dark:text-saffron-300 bg-saffron-50 dark:bg-zinc-800 rounded-xl px-3 py-2 font-latin">
            {s.reviewDue(totalDue)}
          </p>
        )}
        <ul className="space-y-1.5">
          {visibleTopics.map((t) => {
            const ids = t.questions.map((q) => q.id);
            const m = hydrated ? mastery(ids, store.cards) : 0;
            const due = hydrated ? dueIds(ids, store.cards, now).length : 0;
            const stats = store.topics[t.id];
            const active = t.id === topicId;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => chooseTopic(t.id)}
                  aria-current={active ? "true" : undefined}
                  data-topic={t.id}
                  className={`w-full text-left rounded-2xl px-3 py-2.5 border transition-colors cursor-pointer ${
                    active
                      ? "border-saffron-500 bg-saffron-50 dark:bg-zinc-800"
                      : "border-transparent hover:bg-saffron-50/60 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/70 font-latin">{(groups.length > 1 && t.short) || t.text}</span>
                  <span className="flex items-center justify-between gap-2">
                    <span className="min-w-0">
                      {hasDevanagari(t.title) ? (
                        <>
                          <span lang="sa" className="block text-sm font-bold text-charcoal font-sanskrit">{t.title}</span>
                          {script !== "devanagari" && (
                            <span lang={sanskritLang(script)} className="block text-[11px] italic text-charcoal/70 font-latin">{renderSanskrit(t.title, script)}</span>
                          )}
                        </>
                      ) : (
                        <span className="block text-sm font-bold text-charcoal font-latin">{t.title}</span>
                      )}
                    </span>
                    {stats?.examPassed && <Trophy className="w-4 h-4 text-saffron-600 shrink-0" aria-label={s.passed} />}
                  </span>
                  <span className="mt-1.5 flex items-center gap-2 text-[11px] text-charcoal/70 font-latin">
                    <span className="flex-1 h-1.5 rounded-full bg-cream dark:bg-zinc-800 overflow-hidden" aria-hidden="true">
                      <span className="block h-full bg-saffron-500" style={{ width: `${m}%` }} />
                    </span>
                    <span>{m}% {s.mastery}</span>
                    {due > 0 && <span className="font-bold text-saffron-700 dark:text-saffron-300">· {due} {s.due}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quiz */}
      <section id={cardId} className="order-1 xl:order-2 w-full xl:w-2/3 bg-white dark:bg-zinc-900 border border-saffron-100 dark:border-zinc-800 rounded-3xl p-5 md:p-7 space-y-5 scroll-mt-24">
        <header className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-saffron-700 dark:text-saffron-300 font-latin">{topic.text}</p>
          {hasDevanagari(topic.title) ? (
            <div>
              <h2 lang="sa" className="text-xl md:text-2xl font-black text-charcoal font-sanskrit">{topic.title}</h2>
              {script !== "devanagari" && (
                <p lang={sanskritLang(script)} className="text-sm italic font-semibold text-charcoal/70 font-latin">{tx(topic.title)}</p>
              )}
            </div>
          ) : (
            <h2 className="text-xl md:text-2xl font-black text-charcoal font-latin">{topic.title}</h2>
          )}
          <p className="text-sm text-charcoal/70 font-latin">{topic.summary}</p>

          <div role="group" aria-label={`${s.practice} / ${s.exam}`} className="inline-flex rounded-xl border border-saffron-100 dark:border-zinc-700 p-1 bg-cream/40 dark:bg-zinc-800">
            {(["practice", "exam"] as QuizMode[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                data-mode={m}
                onClick={() => chooseMode(m)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider font-latin cursor-pointer transition-colors ${
                  mode === m ? "bg-charcoal text-white dark:bg-zinc-100 dark:text-zinc-900" : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {m === "practice" ? <GraduationCap className="w-3.5 h-3.5" /> : <ClipboardCheck className="w-3.5 h-3.5" />}
                {m === "practice" ? s.practice : s.exam}
              </button>
            ))}
          </div>
          <p className="text-xs text-charcoal/70 font-latin">{isExam ? s.examHelp : s.practiceHelp}</p>
        </header>

        {result ? (
          <Results
            s={s}
            tx={tx}
            byId={byId}
            mode={mode}
            session={session}
            result={result}
            onAgain={() => start(topicId, mode, store.cards)}
            onExam={() => chooseMode("exam")}
            onPractice={() => chooseMode("practice")}
          />
        ) : question ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs font-bold text-charcoal/70 font-latin">
              <span data-testid="quiz-position">
                {session.phase === "review" ? `${s.review} · ` : ""}
                {s.question} {position} {s.of} {total}
              </span>
              <span className="uppercase tracking-wider">{question.kind}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-cream dark:bg-zinc-800 overflow-hidden" aria-hidden="true">
              <div className="h-full bg-saffron-500 transition-all" style={{ width: `${((position - 1) / Math.max(1, total)) * 100}%` }} />
            </div>

            {question.verse && (
              <blockquote className="bg-saffron-50/60 dark:bg-zinc-800 border-l-4 border-saffron-500 rounded-r-2xl px-4 py-4 text-center">
                <p lang="sa" data-testid="quiz-verse" className="font-sanskrit text-lg md:text-xl font-bold text-charcoal leading-relaxed">{question.verse}</p>
                {script !== "devanagari" && (
                  <p lang={sanskritLang(script)} data-testid="quiz-verse-translit" className="mt-1.5 text-sm md:text-base italic font-semibold text-charcoal/75 font-latin leading-relaxed">
                    {tx(question.verse)}
                  </p>
                )}
                {question.ref && <p className="mt-2 text-[11px] font-semibold text-charcoal/70 font-latin">— {question.ref}</p>}
              </blockquote>
            )}

            <h3 className="text-base md:text-lg font-bold text-charcoal font-latin" data-testid="quiz-prompt">{tx(question.prompt)}</h3>

            <div className="grid gap-2.5" role="list" id="tour-step-7">
              {order.map((orig, i) => {
                const isRight = orig === question.correctIndex;
                const picked = selected === orig;
                const struck = wrongChoices.includes(orig);
                let tone = "border-saffron-100 dark:border-zinc-700 hover:border-saffron-500 hover:bg-saffron-50/50 dark:hover:bg-zinc-800";
                if (!isExam && feedback === "correct" && isRight) tone = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
                else if (!isExam && struck) tone = "border-red-400 bg-red-50 dark:bg-red-950/30 opacity-80";
                else if (isExam && picked) tone = "border-saffron-500 bg-saffron-50 dark:bg-zinc-800";
                return (
                  <div role="listitem" key={orig}>
                    <button
                      type="button"
                      data-option-correct={isRight ? "true" : "false"}
                      aria-pressed={isExam ? picked : undefined}
                      disabled={locked || (!isExam && struck)}
                      onClick={() => onChoose(orig)}
                      className={`w-full text-left flex gap-3 items-start rounded-2xl border-2 px-4 py-3 transition-colors cursor-pointer disabled:cursor-default ${tone}`}
                    >
                      <span className="w-6 h-6 shrink-0 rounded-full bg-cream dark:bg-zinc-700 text-xs font-black flex items-center justify-center text-charcoal">{LABELS[i]}</span>
                      <span className="text-sm md:text-base text-charcoal font-latin" data-testid="quiz-option">{tx(question.options[orig])}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div aria-live="polite" className="space-y-3">
              {!isExam && feedback === "incorrect" && (
                <div className="flex gap-2 items-start rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 px-4 py-3 text-sm text-charcoal font-latin">
                  <Lightbulb className="w-4 h-4 mt-0.5 text-amber-700 shrink-0" />
                  <span>
                    <strong>{s.tryAgain}</strong> {s.hint}: {tx(question.hint)}
                  </span>
                </div>
              )}
              {!isExam && feedback === "correct" && (
                <div className="flex gap-2 items-start rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 px-4 py-3 text-sm text-charcoal font-latin">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-700 shrink-0" />
                  <span>
                    <strong>{s.correct}</strong> {tx(question.explanation)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <ErrorReportButton chapterId={question.id} questionText={question.prompt} lang={activeLang} transliterationSettings={script} />
              <button
                type="button"
                data-testid="quiz-next"
                onClick={onNext}
                disabled={isExam ? selected === null : feedback !== "correct"}
                className="px-6 py-2.5 rounded-xl bg-charcoal text-white dark:bg-zinc-100 dark:text-zinc-900 text-sm font-bold font-latin disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {isExam ? s.submit : currentIsLast(session) ? s.finish : s.next}
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function currentIsLast(session: QuizSession): boolean {
  const list = session.phase === "main" ? session.order : session.reviewQueue;
  return session.index === list.length - 1 && (session.phase === "review" || session.reviewQueue.length === 0);
}

/* ─── Results screen ──────────────────────────────────────────────────────── */

function Results({
  s, tx, byId, mode, session, result, onAgain, onExam, onPractice,
}: {
  s: Strings;
  tx: (text: string) => string;
  byId: Map<string, QuizQuestion>;
  mode: QuizMode;
  session: QuizSession;
  result: ReturnType<typeof score>;
  onAgain: () => void;
  onExam: () => void;
  onPractice: () => void;
}) {
  const isExam = mode === "exam";
  return (
    <div className="space-y-5" data-testid="quiz-results">
      <div className="flex items-center gap-4">
        <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 ${result.passed ? "border-emerald-500" : "border-amber-500"}`}>
          <span className="text-2xl font-black text-charcoal font-latin" data-testid="quiz-score">{result.percent}%</span>
        </div>
        <div>
          <h3 className="text-lg font-black text-charcoal font-latin flex items-center gap-2">
            {result.passed ? <Trophy className="w-5 h-5 text-saffron-600" /> : <BookOpen className="w-5 h-5 text-charcoal/70" />}
            {s.results}: {result.passed ? s.passed : s.notPassed}
          </h3>
          <p className="text-sm text-charcoal/70 font-latin">
            {result.correct} / {result.total} · {s.firstTry} · {s.passNote}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-black uppercase tracking-widest text-charcoal/70 font-latin">{s.missed}</h4>
        {result.missed.length === 0 ? (
          <p className="text-sm text-charcoal font-latin">{s.allCorrect}</p>
        ) : (
          <ul className="space-y-2">
            {result.missed.map((id) => {
              const q = byId.get(id)!;
              const a = session.answers[id];
              return (
                <li key={id} className="rounded-2xl border border-saffron-100 dark:border-zinc-700 px-4 py-3 space-y-1 text-sm font-latin">
                  <p className="font-bold text-charcoal">{tx(q.prompt)}</p>
                  {q.ref && <p className="text-xs text-charcoal/70">{q.ref}</p>}
                  {isExam && a && (
                    <p className="flex gap-1.5 items-start text-charcoal/80">
                      <XCircle className="w-4 h-4 mt-0.5 text-red-600 shrink-0" />
                      {s.yourAnswer}: {tx(q.options[a.firstChoice])}
                    </p>
                  )}
                  <p className="flex gap-1.5 items-start text-charcoal">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-700 shrink-0" />
                    {s.rightAnswer}: {tx(q.options[q.correctIndex])}
                  </p>
                  <p className="text-charcoal/70">{tx(q.explanation)}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={onAgain} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-saffron-100 dark:border-zinc-700 text-sm font-bold text-charcoal font-latin cursor-pointer hover:bg-saffron-50 dark:hover:bg-zinc-800">
          <RotateCcw className="w-4 h-4" /> {isExam ? s.takeExam : s.again}
        </button>
        {isExam ? (
          <button type="button" onClick={onPractice} className="px-4 py-2 rounded-xl bg-charcoal text-white dark:bg-zinc-100 dark:text-zinc-900 text-sm font-bold font-latin cursor-pointer">
            {s.backToPractice}
          </button>
        ) : (
          <button type="button" onClick={onExam} data-testid="quiz-take-exam" className="px-4 py-2 rounded-xl bg-charcoal text-white dark:bg-zinc-100 dark:text-zinc-900 text-sm font-bold font-latin cursor-pointer">
            {s.takeExam}
          </button>
        )}
      </div>
    </div>
  );
}
