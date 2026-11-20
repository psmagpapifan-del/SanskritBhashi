import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya5 } from "../../lib/gita/adhyaya5";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya5Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya5} activeLang={activeLang} />;
}
