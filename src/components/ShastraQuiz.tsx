import React from "react";
import TopicQuiz from "./TopicQuiz";
import { shastraTopics } from "../lib/shastraContent";

/** Shastra Study: topic-based quiz across the Gītā, Upaniṣads, Yoga Sūtras and more. */
export default function ShastraQuiz({ activeLang = "en" }: { activeLang?: string }) {
  return <TopicQuiz topics={shastraTopics} storeKey="sb_shastra_v1" cardId="shastra-quiz-card" activeLang={activeLang} />;
}
