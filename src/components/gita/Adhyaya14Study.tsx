import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya14 } from "../../lib/gita/adhyaya14";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya14Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya14} activeLang={activeLang} />;
}
