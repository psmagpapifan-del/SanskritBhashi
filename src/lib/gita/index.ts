/**
 * Gita for Students: index of all 18 adhyayas and pure helpers (safe to use in the browser).
 * Chapter content is loaded on the server by src/lib/gita/content.ts, flattened to the
 * page's language with localizeAdhyaya(), and passed to the GitaStudy island as a prop,
 * so each page ships one chapter in one language.
 */
import type { QuizTopic } from "../quizContent.ts";
import type { Bi, GitaAdhyaya, GitaLang, GitaLevel, GitaOverlay, LocalAdhyaya } from "./types.ts";

export type { Bi, GitaAdhyaya, GitaLang, GitaLevel, GitaOverlay, GitaShloka, LocalAdhyaya, LocalShloka } from "./types.ts";
export { GITA_LEVELS } from "./types.ts";

export const GITA_AVAILABLE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] as const;

export interface AdhyayaMeta {
  n: number;
  name: string;
  title: Record<GitaLang, string>;
}

/** Chapter names as in the Gita Press colophons; English titles are common renderings. */
export const ADHYAYAS: AdhyayaMeta[] = [
  { n: 1, name: "अर्जुनविषादयोगः", title: { en: "Arjuna's Despair", hi: "अर्जुन का विषाद", ja: "アルジュナの苦悩", es: "La desesperación de Arjuna" } },
  { n: 2, name: "साङ्ख्ययोगः", title: { en: "The Yoga of Knowledge", hi: "सांख्ययोग", ja: "知識のヨーガ（サーンキヤ・ヨーガ）", es: "El yoga del conocimiento" } },
  { n: 3, name: "कर्मयोगः", title: { en: "The Yoga of Action", hi: "कर्मयोग", ja: "行為のヨーガ（カルマ・ヨーガ）", es: "El yoga de la acción" } },
  { n: 4, name: "ज्ञानकर्मसंन्यासयोगः", title: { en: "Knowledge and Renunciation of Action", hi: "ज्ञानकर्मसंन्यासयोग", ja: "知識と行為の放棄", es: "El conocimiento y la renuncia a la acción" } },
  { n: 5, name: "कर्मसंन्यासयोगः", title: { en: "Renunciation of Action", hi: "कर्मसंन्यासयोग", ja: "行為の放棄", es: "La renuncia a la acción" } },
  { n: 6, name: "आत्मसंयमयोगः", title: { en: "The Yoga of Self-Control (Meditation)", hi: "आत्मसंयमयोग", ja: "自己制御のヨーガ（瞑想）", es: "El yoga del autocontrol (meditación)" } },
  { n: 7, name: "ज्ञानविज्ञानयोगः", title: { en: "Knowledge and Realisation", hi: "ज्ञानविज्ञानयोग", ja: "知識と悟り", es: "Conocimiento y realización" } },
  { n: 8, name: "अक्षरब्रह्मयोगः", title: { en: "The Imperishable Brahman", hi: "अक्षरब्रह्मयोग", ja: "不滅のブラフマン", es: "El Brahman imperecedero" } },
  { n: 9, name: "राजविद्याराजगुह्ययोगः", title: { en: "The Royal Knowledge and Royal Secret", hi: "राजविद्याराजगुह्ययोग", ja: "王なる知識と王なる秘密", es: "El conocimiento regio y el secreto regio" } },
  { n: 10, name: "विभूतियोगः", title: { en: "The Divine Glories", hi: "विभूतियोग", ja: "神の栄光", es: "Las glorias divinas" } },
  { n: 11, name: "विश्वरूपदर्शनयोगः", title: { en: "The Vision of the Cosmic Form", hi: "विश्वरूपदर्शनयोग", ja: "宇宙的姿の顕現", es: "La visión de la forma cósmica" } },
  { n: 12, name: "भक्तियोगः", title: { en: "The Yoga of Devotion", hi: "भक्तियोग", ja: "信愛のヨーガ（バクティ・ヨーガ）", es: "El yoga de la devoción" } },
  { n: 13, name: "क्षेत्रक्षेत्रज्ञविभागयोगः", title: { en: "The Field and the Knower of the Field", hi: "क्षेत्रक्षेत्रज्ञविभागयोग", ja: "場と場を知る者", es: "El campo y el conocedor del campo" } },
  { n: 14, name: "गुणत्रयविभागयोगः", title: { en: "The Three Gunas", hi: "गुणत्रयविभागयोग", ja: "三つのグナ", es: "Las tres gunas" } },
  { n: 15, name: "पुरुषोत्तमयोगः", title: { en: "The Supreme Person", hi: "पुरुषोत्तमयोग", ja: "至高の人格", es: "La Persona Suprema" } },
  { n: 16, name: "दैवासुरसम्पद्विभागयोगः", title: { en: "Divine and Demonic Qualities", hi: "दैवासुरसम्पद्विभागयोग", ja: "神的な性質と魔的な性質", es: "Cualidades divinas y demoníacas" } },
  { n: 17, name: "श्रद्धात्रयविभागयोगः", title: { en: "The Three Kinds of Faith", hi: "श्रद्धात्रयविभागयोग", ja: "三種の信仰", es: "Los tres tipos de fe" } },
  { n: 18, name: "मोक्षसंन्यासयोगः", title: { en: "Liberation through Renunciation", hi: "मोक्षसंन्यासयोग", ja: "放棄による解脱", es: "La liberación por la renuncia" } },
];

export const adhyayaSlug = (n: number) => `adhyaya-${n}`;

/** Narrow a URL locale to a content language. */
export const gitaLang = (lang: string): GitaLang => (lang === "hi" || lang === "ja" || lang === "es" ? lang : "en");

/**
 * Flatten an adhyaya to one language. en/hi come from the adhyaya file; ja/es come from
 * an overlay (src/lib/gita/i18n/<lang>/adhyayaN.ts). Pass no overlay to get English.
 */
export function localizeAdhyaya(a: GitaAdhyaya, lang: GitaLang, overlay?: GitaOverlay): LocalAdhyaya {
  if ((lang === "ja" || lang === "es") && overlay) {
    return {
      n: a.n, name: a.name, lang, title: overlay.title, context: overlay.context, crux: [...overlay.crux],
      shlokas: a.shlokas.map((s) => {
        const o = overlay.shlokas[s.ref];
        if (!o) throw new Error(`Gita ${lang} overlay for ${a.n} is missing ${s.ref}`);
        return {
          ref: s.ref, altRef: s.altRef, levels: s.levels, speaker: s.speaker, text: s.text,
          words: s.words.map((w, i) => ({ sa: w.sa, gloss: o.words[i] })),
          meaning: o.meaning, situation: o.situation, reflect: o.reflect,
          questions: o.questions.map((q) => ({ ...q, options: [...q.options] })),
        };
      }),
    };
  }
  const l: "en" | "hi" = lang === "hi" ? "hi" : "en";
  return {
    n: a.n, name: a.name, lang: l, title: a.title[l], context: a.context[l], crux: a.crux.map((c) => c[l]),
    shlokas: a.shlokas.map((s) => ({
      ref: s.ref, altRef: s.altRef, levels: s.levels, speaker: s.speaker, text: s.text,
      words: s.words.map((w) => ({ sa: w.sa, gloss: w[l] })),
      meaning: s.meaning[l], situation: { title: s.situation.title[l], story: s.situation.story[l] }, reflect: s.reflect[l],
      questions: s.questions.map((q) => ({ prompt: q.prompt[l], options: q.options.map((o) => o[l]), hint: q.hint[l], explanation: q.explanation[l] })),
    })),
  };
}

export function shlokasFor<S extends { levels: GitaLevel[] }>(a: { shlokas: S[] }, level: GitaLevel): S[] {
  return a.shlokas.filter((s) => s.levels.includes(level));
}

/** Stable id for a shloka at a level, e.g. "g2-47-l1" (same in every language, so progress carries over). */
export const shlokaId = (ref: string, level: GitaLevel) => `g${ref.replace(".", "-")}-l${level}`;

const SHLOKA_LABEL: Record<GitaLang, string> = { en: "Shloka", hi: "श्लोक", ja: "詩節", es: "Shloka" };

/** One quiz topic per shloka (2 questions each) for the chosen level. */
export function toQuizTopics(a: LocalAdhyaya, level: GitaLevel): QuizTopic[] {
  const label = SHLOKA_LABEL[a.lang];
  return shlokasFor(a, level).map((s) => {
    const id = shlokaId(s.ref, level);
    const firstLine = s.text.split("\n")[0].replace(/\s*[।॥].*$/, "");
    return {
      id,
      text: `${label} ${s.ref}`,
      short: `${label} ${s.ref}`,
      title: firstLine,
      summary: s.situation.title,
      questions: s.questions.map((q, i) => ({
        id: `${id}-${i + 1}`,
        kind: i === 0 ? ("meaning" as const) : ("concept" as const),
        prompt: q.prompt,
        verse: i === 0 ? s.text.replace("\n", " ") : undefined,
        ref: `Bhagavad Gītā ${s.ref}`,
        options: q.options,
        correctIndex: 0,
        hint: q.hint,
        explanation: q.explanation,
      })),
    };
  });
}
