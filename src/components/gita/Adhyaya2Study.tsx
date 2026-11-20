import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya2 } from "../../lib/gita/adhyaya2";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya2Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya2} activeLang={activeLang} />;
}
