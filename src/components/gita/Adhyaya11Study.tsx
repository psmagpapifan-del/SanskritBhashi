import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya11 } from "../../lib/gita/adhyaya11";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya11Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya11} activeLang={activeLang} />;
}
