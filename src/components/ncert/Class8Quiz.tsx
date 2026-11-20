import React from "react";
import NcertQuiz from "../NcertQuiz";
import { class8 } from "../../lib/ncert/class8";

export default function Class8Quiz({ activeLang = "en" }: { activeLang?: string }) {
  return <NcertQuiz topics={class8} activeLang={activeLang} />;
}
