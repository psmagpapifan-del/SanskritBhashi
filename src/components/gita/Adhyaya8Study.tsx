import React from "react";
import GitaStudy from "./GitaStudy";
import { adhyaya8 } from "../../lib/gita/adhyaya8";

/** One island per adhyaya, so each page ships only its own shlokas. */
export default function Adhyaya8Study({ activeLang = "en" }: { activeLang?: string }) {
  return <GitaStudy adhyaya={adhyaya8} activeLang={activeLang} />;
}
