/**
 * transliterate — converts Sanskrit text between the four scripts offered by
 * the "Transliteration Script" setting: Devanagari, IAST, Japanese Katakana
 * and French phonetic spelling.
 *
 * Devanagari is the source of truth for quiz content. Everything here is pure
 * (no DOM, no storage) so it can be unit-tested; the React hook lives in
 * useScript.ts.
 */

export type Script = "devanagari" | "iast" | "japanese" | "french";

export const SCRIPTS: readonly Script[] = ["devanagari", "iast", "japanese", "french"];

export function isScript(v: unknown): v is Script {
  return typeof v === "string" && (SCRIPTS as readonly string[]).includes(v);
}

// ---------------------------------------------------------------------------
// Devanagari -> IAST
// ---------------------------------------------------------------------------

const DEV_VOWELS: Record<string, string> = {
  "अ": "a", "आ": "ā", "इ": "i", "ई": "ī", "उ": "u", "ऊ": "ū", "ऋ": "ṛ", "ॠ": "ṝ",
  "ऌ": "ḷ", "ॡ": "ḹ", "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au",
};
const DEV_MATRAS: Record<string, string> = {
  "ा": "ā", "ि": "i", "ी": "ī", "ु": "u", "ू": "ū", "ृ": "ṛ", "ॄ": "ṝ", "ॢ": "ḷ", "ॣ": "ḹ",
  "े": "e", "ै": "ai", "ो": "o", "ौ": "au",
};
const DEV_CONSONANTS: Record<string, string> = {
  "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "ṅ",
  "च": "c", "छ": "ch", "ज": "j", "झ": "jh", "ञ": "ñ",
  "ट": "ṭ", "ठ": "ṭh", "ड": "ḍ", "ढ": "ḍh", "ण": "ṇ",
  "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
  "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
  "य": "y", "र": "r", "ल": "l", "ळ": "ḻ", "व": "v",
  "श": "ś", "ष": "ṣ", "स": "s", "ह": "h",
};
const DEV_OTHER: Record<string, string> = {
  "ं": "ṃ", "ः": "ḥ", "ँ": "m̐", "ऽ": "'", "ॐ": "oṃ", "।": "|", "॥": "||",
  "०": "0", "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
};
const VIRAMA = "्";
const NUKTA = "़";

const DEV_RANGE = /[ऀ-ॿ]/;

export function hasDevanagari(text: string): boolean {
  return DEV_RANGE.test(text);
}

export function devanagariToIast(text: string): string {
  let out = "";
  const chars = [...text.normalize("NFC")];
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const cons = DEV_CONSONANTS[ch];
    if (cons) {
      out += cons;
      let j = i + 1;
      if (chars[j] === NUKTA) j++;
      const next = chars[j];
      if (next === VIRAMA) {
        i = j;
      } else if (next && DEV_MATRAS[next]) {
        out += DEV_MATRAS[next];
        i = j;
      } else {
        out += "a";
        i = j - 1;
      }
      continue;
    }
    if (DEV_VOWELS[ch]) out += DEV_VOWELS[ch];
    else if (DEV_OTHER[ch] !== undefined) out += DEV_OTHER[ch];
    else if (ch === NUKTA || ch === "‌" || ch === "‍") continue;
    else out += ch;
  }
  return out;
}

// ---------------------------------------------------------------------------
// IAST tokenizer (shared by every IAST -> X converter)
// ---------------------------------------------------------------------------

type Tok =
  | { t: "C"; v: string } // consonant, e.g. "kh"
  | { t: "V"; v: string } // vowel, e.g. "ā", "ai"
  | { t: "M"; v: "ṃ" | "ḥ" | "m̐" } // anusvāra, visarga, candrabindu
  | { t: "X"; v: string }; // anything else (space, punctuation)

const IAST_CONS = [
  "kh", "gh", "ch", "jh", "ṭh", "ḍh", "th", "dh", "ph", "bh",
  "k", "g", "ṅ", "c", "j", "ñ", "ṭ", "ḍ", "ṇ", "t", "d", "n", "p", "b", "m",
  "y", "r", "l", "ḻ", "v", "ś", "ṣ", "s", "h",
];
const IAST_VOWELS = ["ai", "au", "a", "ā", "i", "ī", "u", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "e", "o"];

function tokenizeIast(word: string): Tok[] {
  const s = word.normalize("NFC").toLowerCase().replace(/ṁ/g, "ṃ");
  const toks: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    if (s.startsWith("m̐", i)) {
      toks.push({ t: "M", v: "m̐" });
      i += 2;
      continue;
    }
    const two = s.slice(i, i + 2);
    const one = s[i];
    // "ai"/"au" are diphthongs except when the a closes a syllable before i/u
    // across a hiatus, which IAST rarely writes; treat them as diphthongs.
    if (IAST_VOWELS.includes(two)) {
      toks.push({ t: "V", v: two });
      i += 2;
    } else if (IAST_CONS.includes(two)) {
      toks.push({ t: "C", v: two });
      i += 2;
    } else if (IAST_VOWELS.includes(one)) {
      toks.push({ t: "V", v: one });
      i += 1;
    } else if (IAST_CONS.includes(one)) {
      toks.push({ t: "C", v: one });
      i += 1;
    } else if (one === "ṃ" || one === "ḥ") {
      toks.push({ t: "M", v: one });
      i += 1;
    } else {
      toks.push({ t: "X", v: one });
      i += 1;
    }
  }
  return toks;
}

// ---------------------------------------------------------------------------
// IAST -> Devanagari
// ---------------------------------------------------------------------------

const invert = (m: Record<string, string>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [v, k]));
const IAST_TO_DEV_VOWEL = invert(DEV_VOWELS);
const IAST_TO_DEV_MATRA = invert(DEV_MATRAS);
const IAST_TO_DEV_CONS = invert(DEV_CONSONANTS);

export function iastToDevanagari(text: string): string {
  let out = "";
  const toks = tokenizeIast(text);
  for (let i = 0; i < toks.length; i++) {
    const tk = toks[i];
    if (tk.t === "C") {
      out += IAST_TO_DEV_CONS[tk.v];
      const next = toks[i + 1];
      if (next?.t === "V") {
        if (next.v !== "a") out += IAST_TO_DEV_MATRA[next.v];
        i++;
      } else {
        out += VIRAMA;
      }
    } else if (tk.t === "V") {
      out += IAST_TO_DEV_VOWEL[tk.v];
    } else if (tk.t === "M") {
      out += tk.v === "ṃ" ? "ं" : tk.v === "ḥ" ? "ः" : "ँ";
    } else {
      out += tk.v === "'" ? "ऽ" : tk.v;
    }
  }
  return out.replace(/\|\|/g, "॥").replace(/\|/g, "।");
}

// ---------------------------------------------------------------------------
// IAST -> Japanese Katakana
// ---------------------------------------------------------------------------

/** Base consonant (aspiration dropped) for Katakana and gemination. */
const KANA_BASE: Record<string, string> = {
  k: "k", kh: "k", g: "g", gh: "g", c: "c", ch: "c", j: "j", jh: "j",
  ṭ: "t", ṭh: "t", t: "t", th: "t", ḍ: "d", ḍh: "d", d: "d", dh: "d",
  p: "p", ph: "p", b: "b", bh: "b", m: "m", n: "n", ṇ: "n", ñ: "ñ", ṅ: "n",
  y: "y", r: "r", l: "r", ḻ: "r", v: "v", ś: "sh", ṣ: "sh", s: "s", h: "h",
};

/** Kana for base consonant + vowel class a/i/u/e/o; "_" = consonant with no vowel. */
const KANA: Record<string, Record<"a" | "i" | "u" | "e" | "o" | "_", string>> = {
  "": { a: "ア", i: "イ", u: "ウ", e: "エ", o: "オ", _: "" },
  k: { a: "カ", i: "キ", u: "ク", e: "ケ", o: "コ", _: "ク" },
  g: { a: "ガ", i: "ギ", u: "グ", e: "ゲ", o: "ゴ", _: "グ" },
  c: { a: "チャ", i: "チ", u: "チュ", e: "チェ", o: "チョ", _: "チ" },
  j: { a: "ジャ", i: "ジ", u: "ジュ", e: "ジェ", o: "ジョ", _: "ジ" },
  t: { a: "タ", i: "ティ", u: "トゥ", e: "テ", o: "ト", _: "ト" },
  d: { a: "ダ", i: "ディ", u: "ドゥ", e: "デ", o: "ド", _: "ド" },
  n: { a: "ナ", i: "ニ", u: "ヌ", e: "ネ", o: "ノ", _: "ン" },
  ñ: { a: "ニャ", i: "ニ", u: "ニュ", e: "ニェ", o: "ニョ", _: "ン" },
  p: { a: "パ", i: "ピ", u: "プ", e: "ペ", o: "ポ", _: "プ" },
  b: { a: "バ", i: "ビ", u: "ブ", e: "ベ", o: "ボ", _: "ブ" },
  m: { a: "マ", i: "ミ", u: "ム", e: "メ", o: "モ", _: "ム" },
  y: { a: "ヤ", i: "イ", u: "ユ", e: "イェ", o: "ヨ", _: "イ" },
  r: { a: "ラ", i: "リ", u: "ル", e: "レ", o: "ロ", _: "ル" },
  v: { a: "ヴァ", i: "ヴィ", u: "ヴ", e: "ヴェ", o: "ヴォ", _: "ヴ" },
  sh: { a: "シャ", i: "シ", u: "シュ", e: "シェ", o: "ショ", _: "シュ" },
  s: { a: "サ", i: "シ", u: "ス", e: "セ", o: "ソ", _: "ス" },
  h: { a: "ハ", i: "ヒ", u: "フ", e: "ヘ", o: "ホ", _: "フ" },
};

const GEMINATING = new Set(["k", "g", "c", "j", "t", "d", "p", "b", "sh", "s"]);
const NASALS = new Set(["n", "ñ", "m"]);

/** Vowel -> [kana vowel class, suffix]. Sanskrit e/o are long. */
function vowelClass(v: string): ["a" | "i" | "u" | "e" | "o", string] {
  switch (v) {
    case "a": return ["a", ""];
    case "ā": return ["a", "ー"];
    case "i": return ["i", ""];
    case "ī": return ["i", "ー"];
    case "u": return ["u", ""];
    case "ū": return ["u", "ー"];
    case "e": return ["e", "ー"];
    case "o": return ["o", "ー"];
    case "ai": return ["a", "イ"];
    case "au": return ["a", "ウ"];
    default: return ["i", ""];
  }
}

function kanaVowelOnly(v: string): string {
  if (v === "ṛ" || v === "ḷ") return "リ";
  if (v === "ṝ" || v === "ḹ") return "リー";
  const [cls, suffix] = vowelClass(v);
  return KANA[""][cls] + suffix;
}

export function iastToKatakana(text: string): string {
  const toks = tokenizeIast(text);
  let out = "";
  let lastVowel: "a" | "i" | "u" | "e" | "o" = "a";
  for (let i = 0; i < toks.length; i++) {
    const tk = toks[i];
    if (tk.t === "V") {
      out += kanaVowelOnly(tk.v);
      lastVowel = vowelClass(tk.v)[0];
      continue;
    }
    if (tk.t === "M") {
      // Visarga echoes the preceding vowel (aḥ -> ハ, iḥ -> ヒ); anusvāra -> ン.
      out += tk.v === "ḥ" ? KANA.h[lastVowel] : "ン";
      continue;
    }
    if (tk.t === "X") {
      out += tk.v === "|" ? "" : tk.v;
      continue;
    }
    const base = KANA_BASE[tk.v];
    const next = toks[i + 1];
    if (next?.t === "V") {
      if (next.v === "ṛ" || next.v === "ḷ" || next.v === "ṝ" || next.v === "ḹ") {
        out += KANA[base]._ || KANA[base].u;
        out += next.v === "ṛ" || next.v === "ḷ" ? "リ" : "リー";
        lastVowel = "i";
      } else {
        const [cls, suffix] = vowelClass(next.v);
        out += KANA[base][cls] + suffix;
        lastVowel = cls;
      }
      i++;
      continue;
    }
    // Consonant with no vowel: cluster or word-final.
    const following = next?.t === "C" ? KANA_BASE[next.v] : null;
    if ((base === "n" || base === "ñ") && following === "y" && toks[i + 2]?.t === "V") {
      // n + y + vowel reads as the ny-row (karmaṇye -> カルマニェー)
      const [cls, suffix] = vowelClass((toks[i + 2] as { v: string }).v);
      out += KANA.ñ[cls] + suffix;
      lastVowel = cls;
      i += 2;
    } else if (following && following === base && GEMINATING.has(base)) {
      out += "ッ";
    } else if (NASALS.has(base) && (following || base !== "m")) {
      out += "ン";
    } else if (following === "y" && toks[i + 2]?.t === "V") {
      // ty/dy/ky + vowel: use the i-column (ityevam -> イティイェーヴァム)
      out += KANA[base].i;
    } else {
      out += KANA[base]._;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// IAST -> French phonetic spelling
// ---------------------------------------------------------------------------

const FR_VOWEL: Record<string, string> = {
  a: "a", ā: "â", i: "i", ī: "î", u: "ou", ū: "oû", ṛ: "ri", ṝ: "rî", ḷ: "li", ḹ: "lî",
  e: "é", ai: "aï", o: "o", au: "aou",
};
const FR_CONS: Record<string, string> = {
  k: "k", kh: "kh", g: "g", gh: "gh", ṅ: "n", c: "tch", ch: "tchh", j: "dj", jh: "djh", ñ: "gn",
  ṭ: "t", ṭh: "th", ḍ: "d", ḍh: "dh", ṇ: "n", t: "t", th: "th", d: "d", dh: "dh", n: "n",
  p: "p", ph: "ph", b: "b", bh: "bh", m: "m", y: "y", r: "r", l: "l", ḻ: "l", v: "v",
  ś: "ch", ṣ: "ch", s: "s", h: "h",
};

export function iastToFrench(text: string): string {
  const toks = tokenizeIast(text);
  let out = "";
  for (let i = 0; i < toks.length; i++) {
    const tk = toks[i];
    const prev = toks[i - 1];
    const next = toks[i + 1];
    if (tk.t === "V") {
      // "aï"/"aou" already mark the diphthong; a plain a + i/u hiatus is rare.
      out += FR_VOWEL[tk.v];
    } else if (tk.t === "C") {
      let c = FR_CONS[tk.v];
      const nextV = next?.t === "V" ? FR_VOWEL[next.v] : "";
      // Keep g hard before e/i, s unvoiced between vowels, ñ as n before a consonant.
      if ((tk.v === "g" || tk.v === "gh") && /^[éiî]/.test(nextV)) c += "u";
      if (tk.v === "s" && prev?.t === "V" && next?.t === "V") c = "ss";
      if (tk.v === "ñ" && next?.t !== "V") c = "n";
      if (tk.v === "j" && next?.t === "C" && next.v === "ñ") {
        // jñ is pronounced "gny" (jñāna -> gnyâna)
        out += "gny";
        i++;
        continue;
      }
      out += c;
    } else if (tk.t === "M") {
      out += tk.v === "ḥ" ? "h" : "m";
    } else {
      out += tk.v;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Convert a run of Devanagari to the target script. */
export function fromDevanagari(text: string, script: Script): string {
  if (script === "devanagari") return text;
  const iast = devanagariToIast(text);
  if (script === "iast") return iast;
  return fromIast(iast, script);
}

/** Convert IAST text (one or more words) to the target script, keeping capitals. */
export function fromIast(text: string, script: Script): string {
  if (script === "iast") return text;
  return text.replace(/[^\s]+/g, (word) => {
    if (script === "devanagari") return iastToDevanagari(word);
    if (script === "japanese") return iastToKatakana(word);
    const fr = iastToFrench(word);
    return /^\p{Lu}/u.test(word) ? fr.charAt(0).toUpperCase() + fr.slice(1) : fr;
  });
}

/** Strip diacritics and punctuation for loose IAST comparison. */
function loose(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]/g, "");
}

// A Devanagari run: Devanagari words joined by spaces (dandas excluded so they
// can be handled as punctuation).
const DEV_RUN = /[ऀ-ॣ०-ॿ]+(?:[ ]+[ऀ-ॣ०-ॿ]+)*/g;
const IAST_WORD = "[A-Za-zĀāĪīŪūṚṛṜṝḶḷṄṅÑñṬṭḌḍṆṇŚśṢṣṂṃṀṁḤḥ]+";
// Sandhi splits written in IAST: "Deva + Ālayaḥ", "Tat + tvam + asi".
const LATIN_SANDHI = new RegExp(`${IAST_WORD}(?:\\s*\\+\\s*${IAST_WORD})+`, "g");
// Compound analyses: "(Vigraha: Rājñaḥ puruṣaḥ)".
const LATIN_VIGRAHA = /(Vigraha:\s*)([^)]+)/g;

export interface RenderOptions {
  /**
   * Also convert Sanskrit written in IAST where the quiz data uses it for
   * Sanskrit (sandhi splits and "Vigraha:" analyses). Off for content whose
   * Latin text is English, where IAST only spells names and terms.
   */
  latinSanskrit?: boolean;
}

/**
 * Render mixed quiz text (English with embedded Sanskrit) in the chosen script.
 * Devanagari runs are converted; an IAST gloss in brackets that only repeats
 * the Devanagari, as in "योगः (yogaḥ)", is dropped because the run itself is
 * now shown in the learner's script. English text is left as it is.
 */
export function renderSanskrit(text: string, script: Script, opts: RenderOptions = {}): string {
  if (!text) return text;
  let out = text.normalize("NFC");

  if (opts.latinSanskrit && script !== "iast") {
    out = out.replace(LATIN_SANDHI, (m) => fromIast(m, script));
    out = out.replace(LATIN_VIGRAHA, (_m, label: string, body: string) => label + fromIast(body, script));
  }

  if (hasDevanagari(out)) {
    out = out.replace(
      new RegExp(`(${DEV_RUN.source})(\\s*\\(([^()]*)\\))?`, "g"),
      (_m, run: string, glossGroup: string | undefined, gloss: string | undefined) => {
        const converted = fromDevanagari(run, script);
        const iast = devanagariToIast(run);
        const redundant = gloss !== undefined && loose(gloss) === loose(iast);
        return converted + (glossGroup && !redundant ? glossGroup : "");
      }
    );
    if (script !== "devanagari") out = out.replace(/॥/g, "||").replace(/।/g, "|");
  }
  return out;
}

/** BCP 47 tag for Sanskrit shown in a given script (for the lang attribute). */
export function sanskritLang(script: Script): string {
  if (script === "devanagari") return "sa";
  if (script === "japanese") return "sa-Kana";
  return "sa-Latn";
}
