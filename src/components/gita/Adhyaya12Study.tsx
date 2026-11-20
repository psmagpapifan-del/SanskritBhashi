import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya12 } from "../../lib/gita/adhyaya12";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya12Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya12} activeLang={activeLang} />;
}
