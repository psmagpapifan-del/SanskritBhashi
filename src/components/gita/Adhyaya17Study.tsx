import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya17 } from "../../lib/gita/adhyaya17";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya17Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya17} activeLang={activeLang} />;
}
