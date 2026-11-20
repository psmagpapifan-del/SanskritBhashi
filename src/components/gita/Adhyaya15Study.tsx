import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya15 } from "../../lib/gita/adhyaya15";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya15Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya15} activeLang={activeLang} />;
}
