/**
 * NCERT school track — chapter-wise quiz content for the Sanskrit textbooks.
 * Classes 6–8 use the 2025 दीपकम् series; source text is extracted to
 * content/ncert_text/ by scripts/extract_ncert_text.py.
 */
import type { QuizTopic } from "./quizContent.ts";
import { class6 } from "./ncert/class6.ts";

export const ncertChapters: QuizTopic[] = [...class6];
