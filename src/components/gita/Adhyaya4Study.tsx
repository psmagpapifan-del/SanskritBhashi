import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya4 } from "../../lib/gita/adhyaya4";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya4Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya4} activeLang={activeLang} />;
}
