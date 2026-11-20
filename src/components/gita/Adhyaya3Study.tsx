import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya3 } from "../../lib/gita/adhyaya3";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya3Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya3} activeLang={activeLang} />;
}
