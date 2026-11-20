/**
 * Gita for Students: index of all 18 adhyayas, plus helpers that turn a chapter's
 * shlokas into quiz topics for one level and language. Only chapters listed in
 * GITA_AVAILABLE have study pages; the rest are shown as "coming soon".
 * Pages import a single chapter file (src/components/gita/AdhyayaNStudy.tsx),
 * so no page ships the whole bank.
 */
import type { QuizTopic } from "../quizContent.ts";
import type { Bi, GitaAdhyaya, GitaLevel, GitaShloka } from "./types.ts";

export type { Bi, GitaAdhyaya, GitaLevel, GitaShloka } from "./types.ts";
export { GITA_LEVELS } from "./types.ts";

export const GITA_AVAILABLE = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export interface AdhyayaMeta {
  n: number;
  name: string;
  title: Bi;
}

/** Chapter names as in the Gita Press colophons; English titles are common renderings. */
export const ADHYAYAS: AdhyayaMeta[] = [
  { n: 1, name: "अर्जुनविषादयोगः", title: { en: "Arjuna's Despair", hi: "अर्जुन का विषाद" } },
  { n: 2, name: "साङ्ख्ययोगः", title: { en: "The Yoga of Knowledge", hi: "सांख्ययोग" } },
  { n: 3, name: "कर्मयोगः", title: { en: "The Yoga of Action", hi: "कर्मयोग" } },
  { n: 4, name: "ज्ञानकर्मसंन्यासयोगः", title: { en: "Knowledge and Renunciation of Action", hi: "ज्ञानकर्मसंन्यासयोग" } },
  { n: 5, name: "कर्मसंन्यासयोगः", title: { en: "Renunciation of Action", hi: "कर्मसंन्यासयोग" } },
  { n: 6, name: "आत्मसंयमयोगः", title: { en: "The Yoga of Self-Control (Meditation)", hi: "आत्मसंयमयोग" } },
  { n: 7, name: "ज्ञानविज्ञानयोगः", title: { en: "Knowledge and Realisation", hi: "ज्ञानविज्ञानयोग" } },
  { n: 8, name: "अक्षरब्रह्मयोगः", title: { en: "The Imperishable Brahman", hi: "अक्षरब्रह्मयोग" } },
  { n: 9, name: "राजविद्याराजगुह्ययोगः", title: { en: "The Royal Knowledge and Royal Secret", hi: "राजविद्याराजगुह्ययोग" } },
  { n: 10, name: "विभूतियोगः", title: { en: "The Divine Glories", hi: "विभूतियोग" } },
  { n: 11, name: "विश्वरूपदर्शनयोगः", title: { en: "The Vision of the Cosmic Form", hi: "विश्वरूपदर्शनयोग" } },
  { n: 12, name: "भक्तियोगः", title: { en: "The Yoga of Devotion", hi: "भक्तियोग" } },
  { n: 13, name: "क्षेत्रक्षेत्रज्ञविभागयोगः", title: { en: "The Field and the Knower of the Field", hi: "क्षेत्रक्षेत्रज्ञविभागयोग" } },
  { n: 14, name: "गुणत्रयविभागयोगः", title: { en: "The Three Gunas", hi: "गुणत्रयविभागयोग" } },
  { n: 15, name: "पुरुषोत्तमयोगः", title: { en: "The Supreme Person", hi: "पुरुषोत्तमयोग" } },
  { n: 16, name: "दैवासुरसम्पद्विभागयोगः", title: { en: "Divine and Demonic Qualities", hi: "दैवासुरसम्पद्विभागयोग" } },
  { n: 17, name: "श्रद्धात्रयविभागयोगः", title: { en: "The Three Kinds of Faith", hi: "श्रद्धात्रयविभागयोग" } },
  { n: 18, name: "मोक्षसंन्यासयोगः", title: { en: "Liberation through Renunciation", hi: "मोक्षसंन्यासयोग" } },
];

export const adhyayaSlug = (n: number) => `adhyaya-${n}`;

/** Content language: Hindi pages get Hindi, everything else English. */
export type GitaLang = "en" | "hi";
export const gitaLang = (lang: string): GitaLang => (lang === "hi" ? "hi" : "en");

export function shlokasFor(a: GitaAdhyaya, level: GitaLevel): GitaShloka[] {
  return a.shlokas.filter((s) => s.levels.includes(level));
}

/** Stable id for a shloka at a level, e.g. "g2-47-l1". */
export const shlokaId = (ref: string, level: GitaLevel) => `g${ref.replace(".", "-")}-l${level}`;

/** One quiz topic per shloka (2 questions each) for the chosen level and language. */
export function toQuizTopics(a: GitaAdhyaya, level: GitaLevel, lang: GitaLang): QuizTopic[] {
  const label = lang === "hi" ? "श्लोक" : "Shloka";
  return shlokasFor(a, level).map((s) => {
    const id = shlokaId(s.ref, level);
    const firstLine = s.text.split("\n")[0].replace(/\s*[।॥].*$/, "");
    return {
      id,
      text: `${label} ${s.ref}`,
      short: `${label} ${s.ref}`,
      title: firstLine,
      summary: s.situation.title[lang],
      questions: s.questions.map((q, i) => ({
        id: `${id}-${i + 1}`,
        kind: i === 0 ? ("meaning" as const) : ("concept" as const),
        prompt: q.prompt[lang],
        verse: i === 0 ? s.text.replace("\n", " ") : undefined,
        ref: `Bhagavad Gītā ${s.ref}`,
        options: q.options.map((o) => o[lang]),
        correctIndex: 0,
        hint: q.hint[lang],
        explanation: q.explanation[lang],
      })),
    };
  });
}
