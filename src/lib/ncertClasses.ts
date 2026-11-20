/**
 * NCERT class index used by the School Prep hub and the per-class pages.
 * Each class page loads only its own question file (see src/components/ncert/),
 * so a student opening Class 9 does not download Classes 6–12.
 */
import type { QuizTopic } from "./quizContent.ts";
import { ncertChapters } from "./ncertContent.ts";

export const NCERT_CLASSES = [6, 7, 8, 9, 10, 11, 12] as const;
export type NcertClass = (typeof NCERT_CLASSES)[number];

export const classSlug = (cls: number) => `class-${cls}`;

export function chaptersFor(cls: number): QuizTopic[] {
  return ncertChapters.filter((c) => c.group === `Class ${cls}`);
}

/** Textbook names for a class, in order, e.g. ["भास्वती", "शाश्वती"]. */
export function booksFor(cls: number): string[] {
  return [...new Set(chaptersFor(cls).map((c) => c.text.split(" · ")[1]))];
}

export const BOOK_LATIN: Record<string, string> = {
  "दीपकम्": "Dīpakam",
  "शारदा": "Śāradā",
  "शेमुषी": "Śemuṣī",
  "भास्वती": "Bhāsvatī",
  "शाश्वती": "Śāśvatī",
};

/** Class number from an NCERT topic id such as "c8-05" or "c11-shashvati-02". */
export function classFromTopic(topic: string): number | undefined {
  const m = /^c(\d{1,2})-/.exec(topic);
  const n = m ? Number(m[1]) : NaN;
  return (NCERT_CLASSES as readonly number[]).includes(n) ? n : undefined;
}
