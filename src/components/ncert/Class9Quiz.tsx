import React from "react";
import NcertQuiz from "../NcertQuiz";
import { class9 } from "../../lib/ncert/class9";

export default function Class9Quiz({ activeLang = "en" }: { activeLang?: string }) {
  return <NcertQuiz topics={class9} activeLang={activeLang} />;
}
