import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya1 } from "../../lib/gita/adhyaya1";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya1Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya1} activeLang={activeLang} />;
}
