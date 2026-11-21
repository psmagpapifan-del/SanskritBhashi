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
import { ja7 } from "./ja/adhyaya7.ts";
import { ja8 } from "./ja/adhyaya8.ts";
import { ja9 } from "./ja/adhyaya9.ts";
import { ja10 } from "./ja/adhyaya10.ts";
import { ja11 } from "./ja/adhyaya11.ts";
import { ja12 } from "./ja/adhyaya12.ts";
import { ja13 } from "./ja/adhyaya13.ts";
import { ja14 } from "./ja/adhyaya14.ts";
import { ja15 } from "./ja/adhyaya15.ts";
import { ja16 } from "./ja/adhyaya16.ts";
import { ja17 } from "./ja/adhyaya17.ts";
import { ja18 } from "./ja/adhyaya18.ts";
import { es1 } from "./es/adhyaya1.ts";
import { es2 } from "./es/adhyaya2.ts";
import { es3 } from "./es/adhyaya3.ts";
import { es4 } from "./es/adhyaya4.ts";
import { es5 } from "./es/adhyaya5.ts";
import { es6 } from "./es/adhyaya6.ts";
import { es7 } from "./es/adhyaya7.ts";
import { es8 } from "./es/adhyaya8.ts";
import { es9 } from "./es/adhyaya9.ts";
import { es10 } from "./es/adhyaya10.ts";
import { es11 } from "./es/adhyaya11.ts";
import { es12 } from "./es/adhyaya12.ts";
import { es13 } from "./es/adhyaya13.ts";
import { es14 } from "./es/adhyaya14.ts";
import { es15 } from "./es/adhyaya15.ts";
import { es16 } from "./es/adhyaya16.ts";
import { es17 } from "./es/adhyaya17.ts";
import { es18 } from "./es/adhyaya18.ts";

export const OVERLAYS: Record<GitaOverlayLang, Partial<Record<number, GitaOverlay>>> = {
  ja: { 1: ja1, 2: ja2, 3: ja3, 4: ja4, 5: ja5, 6: ja6, 7: ja7, 8: ja8, 9: ja9, 10: ja10, 11: ja11, 12: ja12, 13: ja13, 14: ja14, 15: ja15, 16: ja16, 17: ja17, 18: ja18 },
  es: { 1: es1, 2: es2, 3: es3, 4: es4, 5: es5, 6: es6, 7: es7, 8: es8, 9: es9, 10: es10, 11: es11, 12: es12, 13: es13, 14: es14, 15: es15, 16: es16, 17: es17, 18: es18 },
};
