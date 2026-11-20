import React from "react";
import NcertQuiz from "../NcertQuiz";
import { class12Bhaswati, class12Shashvati } from "../../lib/ncert/class12";

const topics = [...class12Bhaswati, ...class12Shashvati];

export default function Class12Quiz({ activeLang = "en" }: { activeLang?: string }) {
  return <NcertQuiz topics={topics} activeLang={activeLang} />;
}
