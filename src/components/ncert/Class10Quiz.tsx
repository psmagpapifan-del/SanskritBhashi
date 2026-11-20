import React from "react";
import NcertQuiz from "../NcertQuiz";
import { class10 } from "../../lib/ncert/class10";

export default function Class10Quiz({ activeLang = "en" }: { activeLang?: string }) {
  return <NcertQuiz topics={class10} activeLang={activeLang} />;
}
