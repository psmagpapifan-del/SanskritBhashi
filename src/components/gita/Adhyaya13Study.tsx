import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya13 } from "../../lib/gita/adhyaya13";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya13Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya13} activeLang={activeLang} />;
}
