/**
 * NCERT school track — chapter-wise quiz content for the Sanskrit textbooks.
 * Classes 6–8 use the दीपकम् series and Class 9 uses शारदा; source text is extracted to
 * content/ncert_text/ by scripts/extract_ncert_text.py.
 */
import type { QuizTopic } from "./quizContent.ts";
import { class6 } from "./ncert/class6.ts";
import { class7 } from "./ncert/class7.ts";
import { class8 } from "./ncert/class8.ts";
import { class9 } from "./ncert/class9.ts";

export const ncertChapters: QuizTopic[] = [...class6, ...class7, ...class8, ...class9];
