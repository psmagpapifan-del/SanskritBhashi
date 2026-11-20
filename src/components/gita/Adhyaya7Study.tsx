import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya7 } from "../../lib/gita/adhyaya7";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya7Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya7} activeLang={activeLang} />;
}
