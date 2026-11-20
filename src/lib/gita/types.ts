/**
 * Gita for Students — graded study of Bhagavad Gita shlokas for Classes 6–12.
 * Each shloka is understood through a situation from a student's day-to-day life.
 * Content is written in English and Hindi first (Japanese/Spanish pages show English).
 * Verse numbering follows the Gita Press (Gorakhpur) edition.
 */

/** 1 = Classes 6–8, 2 = Classes 9–10, 3 = Classes 11–12. */
export type GitaLevel = 1 | 2 | 3;
export const GITA_LEVELS: GitaLevel[] = [1, 2, 3];

/** Text in both content languages. */
export interface Bi {
  en: string;
  hi: string;
}

export interface GitaQuestion {
  prompt: Bi;
  /** Option 0 is the correct answer; options are shuffled for display. */
  options: [Bi, Bi, Bi, Bi];
  hint: Bi;
  explanation: Bi;
}

export interface GitaShloka {
  /** Chapter.verse in Gita Press numbering, e.g. "2.47". */
  ref: string;
  /** Number used by other editions when it differs (Chapter 1 has 46 verses in some editions). */
  altRef?: string;
  /** Levels this shloka is taught at (usually one). */
  levels: GitaLevel[];
  /** Who is speaking, as printed, e.g. "श्रीभगवानुवाच". */
  speaker: string;
  /** Devanagari text; lines separated by "\n". */
  text: string;
  /** Key words with their meaning (anvaya help). */
  words: { sa: string; en: string; hi: string }[];
  /** Plain meaning of the whole shloka. */
  meaning: Bi;
  /** A situation from a student's life that shows the shloka's message. */
  situation: { title: Bi; story: Bi };
  /** A question for the learner to think about. */
  reflect: Bi;
  /** 2 questions: understanding, then applying it to a situation. */
  questions: GitaQuestion[];
}

export interface GitaAdhyaya {
  n: number;
  /** Chapter name as printed, e.g. "अर्जुनविषादयोगः". */
  name: string;
  title: Bi;
  /** Where the chapter sits in the Kurukshetra story. */
  context: Bi;
  /** The chapter's teaching in three short lines. */
  crux: [Bi, Bi, Bi];
  shlokas: GitaShloka[];
}

/** Content languages. en/hi live in the adhyaya files; ja/es live in src/lib/gita/i18n/<lang>/. */
export type GitaLang = "en" | "hi" | "ja" | "es";
export type GitaOverlayLang = "ja" | "es";

/**
 * A Japanese or Spanish translation of one adhyaya. Shlokas are keyed by ref; each
 * entry mirrors the English fields, with word glosses in the same order as `words`.
 */
export interface GitaOverlay {
  title: string;
  context: string;
  crux: [string, string, string];
  shlokas: Record<
    string,
    {
      words: string[];
      meaning: string;
      situation: { title: string; story: string };
      reflect: string;
      questions: { prompt: string; options: [string, string, string, string]; hint: string; explanation: string }[];
    }
  >;
}

/** One shloka in a single language: what a page sends to the browser. */
export interface LocalShloka {
  ref: string;
  altRef?: string;
  levels: GitaLevel[];
  speaker: string;
  text: string;
  words: { sa: string; gloss: string }[];
  meaning: string;
  situation: { title: string; story: string };
  reflect: string;
  questions: { prompt: string; options: string[]; hint: string; explanation: string }[];
}

/** One adhyaya in a single language. */
export interface LocalAdhyaya {
  n: number;
  name: string;
  lang: GitaLang;
  title: string;
  context: string;
  crux: string[];
  shlokas: LocalShloka[];
}
