import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya6 } from "../../lib/gita/adhyaya6";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya6Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya6} activeLang={activeLang} />;
}
