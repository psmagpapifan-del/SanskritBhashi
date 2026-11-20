import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya18 } from "../../lib/gita/adhyaya18";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya18Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya18} activeLang={activeLang} />;
}
