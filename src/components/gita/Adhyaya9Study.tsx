import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya9 } from "../../lib/gita/adhyaya9";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya9Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya9} activeLang={activeLang} />;
}
