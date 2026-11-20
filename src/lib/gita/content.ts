/**
 * Server-side access to Gita for Students content (pages, sitemap). Not for the browser:
 * it imports every chapter and translation. Pages flatten one chapter to one language
 * with getLocalAdhyaya() and pass it to the GitaStudy island as a prop.
 */
import type { GitaAdhyaya, GitaLang, LocalAdhyaya } from "./types.ts";
import { GITA_AVAILABLE, localizeAdhyaya } from "./index.ts";
import { OVERLAYS } from "./i18n/index.ts";
import { adhyaya1 } from "./adhyaya1.ts";
import { adhyaya2 } from "./adhyaya2.ts";
import { adhyaya3 } from "./adhyaya3.ts";
import { adhyaya4 } from "./adhyaya4.ts";
import { adhyaya5 } from "./adhyaya5.ts";
import { adhyaya6 } from "./adhyaya6.ts";
import { adhyaya7 } from "./adhyaya7.ts";
import { adhyaya8 } from "./adhyaya8.ts";
import { adhyaya9 } from "./adhyaya9.ts";
import { adhyaya10 } from "./adhyaya10.ts";
import { adhyaya11 } from "./adhyaya11.ts";
import { adhyaya12 } from "./adhyaya12.ts";
import { adhyaya13 } from "./adhyaya13.ts";
import { adhyaya14 } from "./adhyaya14.ts";
import { adhyaya15 } from "./adhyaya15.ts";
import { adhyaya16 } from "./adhyaya16.ts";
import { adhyaya17 } from "./adhyaya17.ts";
import { adhyaya18 } from "./adhyaya18.ts";

export const CHAPTERS: Record<number, GitaAdhyaya> = {
  1: adhyaya1, 2: adhyaya2, 3: adhyaya3, 4: adhyaya4, 5: adhyaya5, 6: adhyaya6,
  7: adhyaya7, 8: adhyaya8, 9: adhyaya9, 10: adhyaya10, 11: adhyaya11, 12: adhyaya12,
  13: adhyaya13, 14: adhyaya14, 15: adhyaya15, 16: adhyaya16, 17: adhyaya17, 18: adhyaya18,
};

/** Is chapter n available in this language (en/hi always; ja/es once translated)? */
export function isTranslated(n: number, lang: string): boolean {
  if (lang === "en" || lang === "hi") return true;
  if (lang === "ja" || lang === "es") return !!OVERLAYS[lang][n];
  return false;
}

/** Locales a chapter page (or, without n, the hub) is published in. */
export function gitaLocales(n?: number): GitaLang[] {
  const extra = (["ja", "es"] as const).filter((l) =>
    n === undefined ? GITA_AVAILABLE.some((c) => isTranslated(c, l)) : isTranslated(n, l)
  );
  return ["en", "hi", ...extra];
}

/** Chapter n in the requested language, or English when it isn't translated yet. */
export function getLocalAdhyaya(n: number, lang: string): LocalAdhyaya {
  const a = CHAPTERS[n];
  if (lang === "hi") return localizeAdhyaya(a, "hi");
  if ((lang === "ja" || lang === "es") && OVERLAYS[lang][n]) return localizeAdhyaya(a, lang, OVERLAYS[lang][n]);
  return localizeAdhyaya(a, "en");
}
