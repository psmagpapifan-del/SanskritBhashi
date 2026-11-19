/**
 * NCERT school track — chapter-wise quiz content for the Sanskrit textbooks.
 * Classes 6–8 use the दीपकम् series, Class 9 शारदा, Class 10 शेमुषी and
 * Classes 11–12 भास्वती + शाश्वती; source text is extracted to
 * content/ncert_text/ by scripts/extract_ncert_text.py.
 */
import type { QuizTopic } from "./quizContent.ts";
import { class6 } from "./ncert/class6.ts";
import { class7 } from "./ncert/class7.ts";
import { class8 } from "./ncert/class8.ts";
import { class9 } from "./ncert/class9.ts";
import { class10 } from "./ncert/class10.ts";
import { class11Bhaswati, class11Shashvati } from "./ncert/class11.ts";
import { class12Bhaswati, class12Shashvati } from "./ncert/class12.ts";

export const ncertChapters: QuizTopic[] = [...class6, ...class7, ...class8, ...class9, ...class10, ...class11Bhaswati, ...class11Shashvati,
  ...class12Bhaswati, ...class12Shashvati,
];
