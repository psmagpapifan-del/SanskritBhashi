/**
 * Registry of Japanese and Spanish translations, one file per adhyaya.
 * A chapter is "translated" (indexable, in the sitemap and hreflang) as soon as its
 * file is registered here. Unregistered chapters fall back to English with noindex.
 * Server-only: pages pick one chapter in one language, so none of this ships whole.
 */
import type { GitaOverlay, GitaOverlayLang } from "../types.ts";
import { ja1 } from "./ja/adhyaya1.ts";
import { ja2 } from "./ja/adhyaya2.ts";
import { ja3 } from "./ja/adhyaya3.ts";
import { ja4 } from "./ja/adhyaya4.ts";
import { ja5 } from "./ja/adhyaya5.ts";
import { ja6 } from "./ja/adhyaya6.ts";
import { es1 } from "./es/adhyaya1.ts";
import { es2 } from "./es/adhyaya2.ts";
import { es3 } from "./es/adhyaya3.ts";
import { es4 } from "./es/adhyaya4.ts";
import { es5 } from "./es/adhyaya5.ts";
import { es6 } from "./es/adhyaya6.ts";

export const OVERLAYS: Record<GitaOverlayLang, Partial<Record<number, GitaOverlay>>> = {
  ja: { 1: ja1, 2: ja2, 3: ja3, 4: ja4, 5: ja5, 6: ja6 },
  es: { 1: es1, 2: es2, 3: es3, 4: es4, 5: es5, 6: es6 },
};
