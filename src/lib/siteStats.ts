/**
 * Real content counts for the home page ("867 practice questions · 121 Gita shlokas …").
 * Computed at build time from the content itself, so they never drift from what the site offers.
 * Server-only: it imports every NCERT and Gita chapter.
 */
import { ncertChapters } from "./ncertContent.ts";
import { CHAPTERS } from "./gita/content.ts";

const learnPages = Object.keys(import.meta.glob("../pages/[lang]/learn/*.astro")).filter((f) => !f.endsWith("/index.astro"));
const gita = Object.values(CHAPTERS);

export const siteStats = {
  questions: ncertChapters.reduce((n, c) => n + c.questions.length, 0),
  shlokas: gita.reduce((n, a) => n + a.shlokas.length, 0),
  chapters: gita.length,
  guides: learnPages.length,
};
