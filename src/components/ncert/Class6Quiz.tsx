import React from "react";
import NcertQuiz from "../NcertQuiz";
import { class6 } from "../../lib/ncert/class6";

export default function Class6Quiz({ activeLang = "en" }: { activeLang?: string }) {
  return <NcertQuiz topics={class6} activeLang={activeLang} />;
}
