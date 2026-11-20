import type { APIRoute } from "astro";
import { NCERT_CLASSES, booksFor, chaptersFor, classSlug, BOOK_LATIN } from "../lib/ncertClasses";
import { learnArticles } from "../lib/learnArticles";
import { ADHYAYAS, GITA_AVAILABLE, adhyayaSlug } from "../lib/gita/index";

export const prerender = true;

/**
 * /llms.txt — a plain-language map of the site for AI assistants and answer engines
 * (https://llmstxt.org). Generated at build time so new classes and articles appear automatically.
 */
const SITE = "https://sanskritbhashi.com";

// Older articles that are not in learnArticles.ts (their pages hold their own metadata).
const LEGACY_ARTICLES: Record<string, string> = {
  "bhagavad-gita-anvaya-guide": "The Art of Anvaya: How to Translate and Understand Gita Shlokas",
  "ncert-board-exam-strategy": "NCERT Sanskrit Board Exams: Proven Study and Writing Strategies",
  "panini-sandhi-rules": "Mastering Sanskrit Sandhi Rules: Vowels, Consonants, and Visargas",
  "pronunciation-and-devanagari": "Sanskrit Phonology: Articulation Points and Devanagari Pronunciation",
  "sanskrit-declensions-vibhakti": "Understanding Noun Cases: The Sanskrit Vibhakti System",
  "scientific-relevance-of-sanskrit": "The Computational Structure of Sanskrit: Paninian Grammar and Computer Science",
};

const articleSlugs = Object.keys(import.meta.glob("./\\[lang\\]/learn/*.astro"))
  .map((f) => f.replace(/^.*\/learn\//, "").replace(/\.astro$/, ""))
  .filter((s) => s !== "index" && !s.includes("["))
  .sort();

export const GET: APIRoute = () => {
  const articles = articleSlugs.map((slug) => {
    const a = learnArticles.find((x) => x.slug === slug);
    const title = a?.meta.en.title ?? LEGACY_ARTICLES[slug] ?? slug.replace(/-/g, " ");
    const desc = a?.meta.en.desc ? `: ${a.meta.en.desc}` : "";
    return `- [${title}](${SITE}/en/learn/${slug})${desc}`;
  });

  const classes = NCERT_CLASSES.map((n) => {
    const ch = chaptersFor(n);
    const books = booksFor(n).map((b) => `${b} (${BOOK_LATIN[b] ?? b})`).join(", ");
    const q = ch.reduce((s, c) => s + c.questions.length, 0);
    return `- [NCERT Sanskrit Class ${n}: ${books}](${SITE}/en/modules/school-prep/${classSlug(n)}): ${ch.length} lessons, ${q} practice questions with hints and explanations`;
  });

  const gita = GITA_AVAILABLE.map((n) => {
    const a = ADHYAYAS[n - 1];
    return `- [Bhagavad Gita Chapter ${n}: ${a.title.en} (${a.name})](${SITE}/en/modules/gita/${adhyayaSlug(n)}) · Hindi: ${SITE}/hi/modules/gita/${adhyayaSlug(n)}`;
  });

  const body = `# Sanskritbhashi

> Free website and Android app for learning Sanskrit: chapter-wise practice for every lesson of the NCERT Sanskrit textbooks (CBSE Classes 6–12), verse-by-verse study of the Bhagavad Gita and Upanishads, and clear guides to Sanskrit grammar and the Devanagari script. Available in English, Hindi, Japanese and Spanish; Sanskrit can be shown in Devanagari, IAST, Katakana or French phonetic script.

Every page exists in four languages: replace \`/en/\` in a URL with \`/hi/\`, \`/ja/\` or \`/es/\`. Questions are written from the NCERT textbook text; each has a hint, an explanation and a spaced-repetition review schedule.

## Main sections
- [Home](${SITE}/en): overview of the courses
- [NCERT School Prep](${SITE}/en/modules/school-prep): pick a class (6–12) and practise every textbook lesson
- [Shastra Study](${SITE}/en/modules/shastra-study): Bhagavad Gita and Upanishad verses with word-by-word meaning and quizzes
- [Gita for Students](${SITE}/en/modules/gita): Bhagavad Gita shlokas graded for Classes 6–8, 9–10 and 11–12, each explained through a situation from a student's daily life (English and Hindi)
- [Learn Hub](${SITE}/en/learn): articles on Sanskrit grammar, script, metre and exam preparation
- [FAQs](${SITE}/en/faqs): common questions about Sanskrit grammar and the courses

## NCERT School Prep by class
${classes.join("\n")}

## Gita for Students by adhyaya
${gita.join("\n")}

## Learn Hub articles
${articles.join("\n")}

## Optional
- [About](${SITE}/en/about): the team and the mission behind Sanskritbhashi
- [Contact](${SITE}/en/contact): corrections and feedback
- [Sitemap](${SITE}/sitemap.xml): every URL in all four languages
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
