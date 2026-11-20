import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya10 } from "../../lib/gita/adhyaya10";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya10Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya10} activeLang={activeLang} />;
}
