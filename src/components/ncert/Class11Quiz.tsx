import React from "react";
import NcertQuiz from "../NcertQuiz";
import { class11Bhaswati, class11Shashvati } from "../../lib/ncert/class11";

const topics = [...class11Bhaswati, ...class11Shashvati];

export default function Class11Quiz({ activeLang = "en" }: { activeLang?: string }) {
  return <NcertQuiz topics={topics} activeLang={activeLang} />;
}
