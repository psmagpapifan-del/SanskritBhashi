// Structural checks for Gita for Students (src/lib/gita/).
import { test } from "node:test";
import assert from "node:assert/strict";
import { adhyaya1 } from "../../src/lib/gita/adhyaya1.ts";
import { adhyaya2 } from "../../src/lib/gita/adhyaya2.ts";
import { adhyaya3 } from "../../src/lib/gita/adhyaya3.ts";
import { adhyaya4 } from "../../src/lib/gita/adhyaya4.ts";
import { adhyaya5 } from "../../src/lib/gita/adhyaya5.ts";
import { adhyaya6 } from "../../src/lib/gita/adhyaya6.ts";
import { adhyaya7 } from "../../src/lib/gita/adhyaya7.ts";
import { adhyaya8 } from "../../src/lib/gita/adhyaya8.ts";
import { adhyaya9 } from "../../src/lib/gita/adhyaya9.ts";
import { adhyaya10 } from "../../src/lib/gita/adhyaya10.ts";
import { adhyaya11 } from "../../src/lib/gita/adhyaya11.ts";
import { adhyaya12 } from "../../src/lib/gita/adhyaya12.ts";
import { adhyaya13 } from "../../src/lib/gita/adhyaya13.ts";
import { adhyaya14 } from "../../src/lib/gita/adhyaya14.ts";
import { adhyaya15 } from "../../src/lib/gita/adhyaya15.ts";
import { adhyaya16 } from "../../src/lib/gita/adhyaya16.ts";
import { adhyaya17 } from "../../src/lib/gita/adhyaya17.ts";
import { adhyaya18 } from "../../src/lib/gita/adhyaya18.ts";
import { ADHYAYAS, GITA_AVAILABLE, GITA_LEVELS, localizeAdhyaya, shlokasFor, toQuizTopics } from "../../src/lib/gita/index.ts";
import { OVERLAYS } from "../../src/lib/gita/i18n/index.ts";
import { gitaLocales, isTranslated } from "../../src/lib/gita/content.ts";

const chapters = [adhyaya1, adhyaya2, adhyaya3, adhyaya4, adhyaya5, adhyaya6, adhyaya7, adhyaya8, adhyaya9, adhyaya10, adhyaya11, adhyaya12, adhyaya13, adhyaya14, adhyaya15, adhyaya16, adhyaya17, adhyaya18];
const both = (b: { en: string; hi: string }, where: string) => {
  assert.ok(b.en.trim(), `${where}: missing English`);
  assert.ok(b.hi.trim(), `${where}: missing Hindi`);
  assert.match(b.hi, /[ऀ-ॿ]/, `${where}: Hindi text has no Devanagari`);
};

test("every available chapter is loaded and matches the index", () => {
  assert.deepEqual([...GITA_AVAILABLE], chapters.map((c) => c.n));
  for (const c of chapters) assert.equal(c.name, ADHYAYAS[c.n - 1].name);
  assert.equal(ADHYAYAS.length, 18);
});

test("every chapter has at least one shloka at every level", () => {
  for (const c of chapters) for (const l of GITA_LEVELS) assert.ok(shlokasFor(c, l).length >= 1, `Adhyaya ${c.n} level ${l}`);
});

test("shlokas are well formed and fully bilingual", () => {
  const seen = new Set<string>();
  for (const c of chapters) {
    both(c.title, `Adhyaya ${c.n} title`);
    both(c.context, `Adhyaya ${c.n} context`);
    c.crux.forEach((x, i) => both(x, `Adhyaya ${c.n} crux ${i}`));
    for (const s of c.shlokas) {
      const w = `Gita ${s.ref}`;
      assert.match(s.ref, new RegExp(`^${c.n}\\.\\d{1,2}$`), `${w}: ref must be in chapter ${c.n}`);
      assert.ok(!seen.has(s.ref), `${w}: duplicate shloka`);
      seen.add(s.ref);
      assert.ok(s.levels.length >= 1);
      const lines = s.text.split("\n");
      assert.equal(lines.length, 2, `${w}: two lines`);
      assert.match(lines[0], / ।$/, `${w}: first line ends with " ।"`);
      assert.match(lines[1], / ॥$/, `${w}: second line ends with " ॥"`);
      assert.match(s.speaker, /(उ|ु)वाच$/, `${w}: speaker line`); // भगवान् + उवाच → भगवानुवाच
      assert.ok(s.words.length >= 4, `${w}: at least 4 word meanings`);
      for (const x of s.words) assert.ok(x.sa && x.en && x.hi, `${w}: word ${x.sa}`);
      both(s.meaning, `${w} meaning`);
      both(s.situation.title, `${w} situation title`);
      both(s.situation.story, `${w} situation`);
      both(s.reflect, `${w} reflect`);
      assert.equal(s.questions.length, 2, `${w}: 2 questions`);
      for (const q of s.questions) {
        both(q.prompt, `${w} prompt`);
        both(q.hint, `${w} hint`);
        both(q.explanation, `${w} explanation`);
        for (const lang of ["en", "hi"] as const) {
          const opts = q.options.map((o) => o[lang].trim());
          assert.equal(new Set(opts).size, 4, `${w}: 4 distinct ${lang} options`);
        }
      }
    }
  }
});

test("quiz topics build for every level and language with unique ids", () => {
  const ids = new Set<string>();
  for (const c of chapters) for (const l of GITA_LEVELS) for (const lang of ["en", "hi", "ja", "es"] as const) {
    const local = localizeAdhyaya(c, lang, lang === "ja" || lang === "es" ? OVERLAYS[lang][c.n] : undefined);
    for (const t of toQuizTopics(local, l)) {
      for (const q of t.questions) {
        const key = `${lang}:${q.id}`;
        assert.ok(!ids.has(key), key);
        ids.add(key);
        assert.equal(q.correctIndex, 0);
      }
    }
  }
});

test("Adhyaya 13 carries the +1 numbering of 35-verse editions on every shloka", () => {
  for (const s of adhyaya13.shlokas) {
    const [, v] = s.ref.split(".").map(Number);
    assert.equal(s.altRef, `13.${v + 1}`, s.ref);
  }
});

test("all 18 adhyayas are complete: each has a shloka at every level", () => {
  assert.equal(chapters.length, 18);
  assert.deepEqual(chapters.map((c) => c.n), Array.from({ length: 18 }, (_, i) => i + 1));
});

// Japanese and Spanish translations (src/lib/gita/i18n/<lang>/adhyayaN.ts).
const script = { ja: /[\u3040-\u30ff\u4e00-\u9fff]/, es: /[a-záéíóúñ]/i } as const;

test("ja/es translations mirror the English chapter exactly", () => {
  for (const lang of ["ja", "es"] as const) {
    for (const [key, o] of Object.entries(OVERLAYS[lang])) {
      const c = chapters[Number(key) - 1];
      const w = `${lang} Adhyaya ${key}`;
      assert.ok(o && c, w);
      const filled = (s: string, where: string) => {
        assert.ok(s.trim(), `${where}: empty`);
        assert.match(s, script[lang], `${where}: not in ${lang}`);
      };
      filled(o.title, `${w} title`);
      filled(o.context, `${w} context`);
      assert.equal(o.crux.length, 3, `${w}: 3 crux lines`);
      o.crux.forEach((x, i) => filled(x, `${w} crux ${i}`));
      assert.deepEqual(Object.keys(o.shlokas).sort(), c.shlokas.map((s) => s.ref).sort(), `${w}: same shlokas`);
      for (const s of c.shlokas) {
        const t = o.shlokas[s.ref];
        const ws = `${lang} ${s.ref}`;
        assert.equal(t.words.length, s.words.length, `${ws}: one gloss per word`);
        t.words.forEach((g, i) => filled(g, `${ws} word ${s.words[i].sa}`));
        filled(t.meaning, `${ws} meaning`);
        filled(t.situation.title, `${ws} situation title`);
        filled(t.situation.story, `${ws} situation`);
        filled(t.reflect, `${ws} reflect`);
        assert.equal(t.questions.length, 2, `${ws}: 2 questions`);
        for (const q of t.questions) {
          filled(q.prompt, `${ws} prompt`);
          filled(q.hint, `${ws} hint`);
          filled(q.explanation, `${ws} explanation`);
          q.options.forEach((x, i) => assert.ok(x.trim(), `${ws} option ${i}`));
          assert.equal(new Set(q.options.map((x) => x.trim())).size, 4, `${ws}: 4 distinct options`);
        }
      }
    }
  }
});

test("translated chapters are published (sitemap/hreflang) only in their languages", () => {
  for (const n of GITA_AVAILABLE) {
    const want = ["en", "hi", ...(["ja", "es"] as const).filter((l) => !!OVERLAYS[l][n])];
    assert.deepEqual(gitaLocales(n), want, `Adhyaya ${n}`);
    for (const l of ["ja", "es"] as const) assert.equal(isTranslated(n, l), !!OVERLAYS[l][n]);
  }
});
