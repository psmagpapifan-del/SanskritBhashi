import React from "react";
import NcertQuiz from "../NcertQuiz";
import { class7 } from "../../lib/ncert/class7";

export default function Class7Quiz({ activeLang = "en" }: { activeLang?: string }) {
  return <NcertQuiz topics={class7} activeLang={activeLang} />;
}
