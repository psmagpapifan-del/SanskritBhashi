import React from "react";
import TopicQuiz from "./TopicQuiz";
import { ncertChapters } from "../lib/ncertContent";

const LIST_TITLE: Record<string, string> = {
  en: "NCERT chapters",
  hi: "एनसीईआरटी पाठ",
  ja: "NCERT 教科書の章",
  es: "Capítulos NCERT",
};

/** NCERT school track: chapter-wise quizzes for the NCERT Sanskrit textbooks (दीपकम् 6–8, शारदा 9, शेमुषी 10, भास्वती/शाश्वती 11–12). */
export default function NcertQuiz({ activeLang = "en" }: { activeLang?: string }) {
  return (
    <TopicQuiz
      topics={ncertChapters}
      storeKey="sb_ncert_v1"
      cardId="ncert-quiz-card"
      listTitle={LIST_TITLE[activeLang] ?? LIST_TITLE.en}
      activeLang={activeLang}
    />
  );
}
