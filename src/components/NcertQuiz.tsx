import React from "react";
import TopicQuiz from "./TopicQuiz";
import type { QuizTopic } from "../lib/quizContent";

const LIST_TITLE: Record<string, string> = {
  en: "NCERT chapters",
  hi: "एनसीईआरटी पाठ",
  ja: "NCERT 教科書の章",
  es: "Capítulos NCERT",
};

/**
 * NCERT school track quiz for one class. Callers pass only that class's chapters
 * (see src/components/ncert/ClassNQuiz.tsx) so each page ships one class of data.
 */
export default function NcertQuiz({ topics, activeLang = "en" }: { topics: QuizTopic[]; activeLang?: string }) {
  return (
    <TopicQuiz
      topics={topics}
      storeKey="sb_ncert_v1"
      cardId="ncert-quiz-card"
      listTitle={LIST_TITLE[activeLang] ?? LIST_TITLE.en}
      activeLang={activeLang}
    />
  );
}
