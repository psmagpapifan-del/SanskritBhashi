/**
 * One page per shloka (/[lang]/modules/gita/shloka/2-47): the pages people land on when they
 * search a verse ("karmanye vadhikaraste meaning", "गीता 2.47 का अर्थ"). Server-only.
 */
import { GITA_AVAILABLE } from "./index.ts";
import type { GitaLang, LocalShloka } from "./types.ts";
import { CHAPTERS, getLocalAdhyaya } from "./content.ts";
import { PROBLEMS } from "./problems.ts";
import { devanagariToIast, iastToKatakana } from "../transliterate.ts";
import { fitTitle, titleWidth } from "../gitaPageText.ts";

export const shlokaSlug = (ref: string) => ref.replace(".", "-");
export const shlokaPath = (lang: string, ref: string) => `/${lang}/modules/gita/shloka/${shlokaSlug(ref)}`;

const verseNum = (ref: string) => ref.split(".").map(Number) as [number, number];

/** Every shloka on the site, in chapter and verse order. */
export const ALL_SHLOKA_REFS: string[] = GITA_AVAILABLE.flatMap((n) =>
  CHAPTERS[n].shlokas.map((s) => s.ref).sort((a, b) => verseNum(a)[1] - verseNum(b)[1])
);

export function neighbours(ref: string): { prev?: string; next?: string } {
  const i = ALL_SHLOKA_REFS.indexOf(ref);
  return { prev: ALL_SHLOKA_REFS[i - 1], next: ALL_SHLOKA_REFS[i + 1] };
}

export function localShloka(ref: string, lang: string): { s: LocalShloka; chapterTitle: string; chapterName: string; lang: GitaLang } {
  const a = getLocalAdhyaya(verseNum(ref)[0], lang);
  return { s: a.shlokas.find((x) => x.ref === ref) as LocalShloka, chapterTitle: a.title, chapterName: a.name, lang: a.lang };
}

/** Problem pages that use this shloka. */
export const problemsFor = (ref: string) => PROBLEMS.filter((p) => p.refs.includes(ref));

/** Opening words of the shloka, e.g. "कर्मण्येवाधिकारस्ते मा", without verse marks. */
function openingDev(text: string, maxWords = 2): string {
  const words = text.split("\n")[0].replace(/[।॥|0-9०-९]/g, " ").trim().split(/\s+/);
  return words.slice(0, maxWords).join(" ");
}

/** "Karmanyevadhikaraste Ma": IAST without diacritics, as people type it in search. */
function openingLatin(dev: string): string {
  const iast = devanagariToIast(dev);
  const plain = iast.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z ]/g, "");
  return plain.split(" ").filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

/** Trims text to a width budget at a word (or, for Japanese, character) boundary. */
function trimTo(text: string, budget: number): string {
  if (titleWidth(text) <= budget) return text;
  const cjk = /[぀-ヿ一-鿿]/.test(text);
  let out = "";
  for (const part of cjk ? [...text] : text.split(" ")) {
    const next = cjk ? out + part : out ? `${out} ${part}` : part;
    if (titleWidth(next) > budget - 1) break;
    out = next;
  }
  return out.replace(/[,;:、，]$/, "") + "…";
}

/** Opening words short enough for a title: two words, else one, else none. */
function shortOpening(text: string, max: number, render: (dev: string) => string): string | undefined {
  for (const words of [2, 1]) {
    const r = render(openingDev(text, words));
    if (titleWidth(r) <= max) return r;
  }
  return undefined;
}

export function shlokaTitle(lang: GitaLang, ref: string, text: string): string {
  const latin = shortOpening(text, 26, (d) => openingLatin(d));
  const dev = shortOpening(text, 26, (d) => d);
  const kana = shortOpening(text, 24, (d) => iastToKatakana(devanagariToIast(d)).replace(/['’]/g, ""));
  const parts: Record<GitaLang, string[]> = {
    en: [latin ? `Bhagavad Gita ${ref} Meaning: ${latin}` : `Bhagavad Gita ${ref} Meaning in Simple English`, " | Sanskritbhashi"],
    hi: [dev ? `गीता श्लोक ${ref} का अर्थ: ${dev}` : `गीता श्लोक ${ref} का सरल हिंदी अर्थ`, " | Sanskritbhashi"],
    ja: [kana ? `バガヴァッド・ギーター ${ref} の意味：${kana}` : `バガヴァッド・ギーター ${ref} の意味と解説`, " | Sanskritbhashi"],
    es: [latin ? `Bhagavad Gita ${ref}: significado de «${latin}»` : `Bhagavad Gita ${ref}: significado y explicación`, " | Sanskritbhashi"],
  };
  return fitTitle(parts[lang]);
}

export function shlokaDescription(lang: GitaLang, ref: string, meaning: string): string {
  const frame: Record<GitaLang, [string, string]> = {
    en: [`Bhagavad Gita ${ref} in simple English: `, " With word meanings, a school-life story and a quiz."],
    hi: [`गीता ${ref} का सरल अर्थ: `, " शब्दार्थ, स्कूली जीवन की कहानी और प्रश्नोत्तरी के साथ।"],
    ja: [`バガヴァッド・ギーター${ref}の意味：`, "語の意味・学校生活の例・クイズ付き。"],
    es: [`Bhagavad Gita ${ref} explicado: `, " Con glosario, una historia escolar y un cuestionario."],
  };
  const [pre, post] = frame[lang];
  const budget = 160 - titleWidth(pre) - titleWidth(post);
  // Prefer whole sentences; cut mid-sentence only when even the first one is too long.
  const sentences = meaning.match(/[^.!?。।]+[.!?。।]+["”»]?\s*/g) ?? [meaning];
  let body = "";
  for (const sen of sentences) {
    if (titleWidth(body + sen) > budget) break;
    body += sen;
  }
  // A lone "Krishna said." is too thin: fall back to the meaning cut at a word.
  if (titleWidth(body.trim()) < budget * 0.5) body = trimTo(meaning, budget);
  return pre + body.trim() + post;
}

/** Stable shuffle so the correct option (always index 0 in the data) is not always first. */
export function shuffledOptions(options: string[], seed: string): { text: string; correct: boolean }[] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const items = options.map((text, i) => ({ text, correct: i === 0 }));
  for (let i = items.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export const shlokaUi: Record<GitaLang, {
  chapter: (n: number) => string;
  words: string;
  meaning: string;
  story: string;
  reflect: string;
  quiz: string;
  showAnswer: string;
  answer: string;
  prev: string;
  next: string;
  lesson: (n: number) => string;
  related: string;
  iast: string;
}> = {
  en: {
    chapter: (n) => `Chapter ${n}`,
    words: "Word by word",
    meaning: "Meaning",
    story: "In school life",
    reflect: "Think about it",
    quiz: "Check yourself",
    showAnswer: "Show answer",
    answer: "Answer",
    prev: "Previous shloka",
    next: "Next shloka",
    lesson: (n) => `Practise this in the Chapter ${n} lesson →`,
    related: "This shloka helps with",
    iast: "Transliteration (IAST)",
  },
  hi: {
    chapter: (n) => `अध्याय ${n}`,
    words: "शब्दार्थ",
    meaning: "अर्थ",
    story: "स्कूली जीवन में",
    reflect: "सोचिए",
    quiz: "स्वयं जाँचिए",
    showAnswer: "उत्तर देखें",
    answer: "उत्तर",
    prev: "पिछला श्लोक",
    next: "अगला श्लोक",
    lesson: (n) => `अध्याय ${n} के पाठ में अभ्यास कीजिए →`,
    related: "यह श्लोक इनमें मदद करता है",
    iast: "लिप्यंतरण (IAST)",
  },
  ja: {
    chapter: (n) => `第${n}章`,
    words: "語の意味",
    meaning: "意味",
    story: "学校生活では",
    reflect: "考えてみましょう",
    quiz: "確認クイズ",
    showAnswer: "答えを見る",
    answer: "答え",
    prev: "前の詩節",
    next: "次の詩節",
    lesson: (n) => `第${n}章のレッスンで練習する →`,
    related: "この詩節が役立つこと",
    iast: "ローマ字転写（IAST）",
  },
  es: {
    chapter: (n) => `Capítulo ${n}`,
    words: "Palabra por palabra",
    meaning: "Significado",
    story: "En la vida escolar",
    reflect: "Para pensar",
    quiz: "Compruébelo",
    showAnswer: "Ver respuesta",
    answer: "Respuesta",
    prev: "Shloka anterior",
    next: "Shloka siguiente",
    lesson: (n) => `Practique esto en la lección del capítulo ${n} →`,
    related: "Este shloka ayuda con",
    iast: "Transliteración (IAST)",
  },
};
