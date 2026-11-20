import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya16 } from "../../lib/gita/adhyaya16";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya16Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya16} activeLang={activeLang} />;
}
