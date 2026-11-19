/**
 * Shared shape of quiz content used by TopicQuiz (Shastra Study, NCERT track).
 * The correct answer is option 0 by convention in the data files; options are
 * shuffled for display.
 */

export type QuestionKind =
  | "meaning" | "grammar" | "sandhi" | "fill" | "source" | "concept"
  | "vocab" | "comprehension" | "number";

export interface QuizQuestion {
  id: string;
  kind: QuestionKind;
  prompt: string;
  /** Devanagari passage the question is about (optional). */
  verse?: string;
  /** Reference for the passage, e.g. "Bhagavad Gītā 2.47". */
  ref?: string;
  options: string[];
  correctIndex: number;
  /** Nudge shown in practice mode after a wrong first attempt. */
  hint: string;
  /** Shown after the question is answered. */
  explanation: string;
}

export interface QuizTopic {
  id: string;
  /** Small label above the title (text name, or "Class 6 · Lesson 3"). */
  text: string;
  title: string;
  summary: string;
  /** Shorter label for the topic list when groups are shown as tabs (e.g. "Lesson 3"). */
  short?: string;
  /** Optional group shown as tabs in the topic list (e.g. "Class 6"). */
  group?: string;
  questions: QuizQuestion[];
}
