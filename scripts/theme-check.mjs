#!/usr/bin/env node
/**
 * Theme check: reads the colour tokens from src/styles/globals.css (light @theme block
 * and the .dark block) and verifies every pairing the UI relies on meets WCAG AA.
 * Also checks that the browser theme colour in Layout.astro and manifest.json matches brand-500.
 *
 *   npm run theme:check            # after editing any colour token
 *
 * Exported so tests/unit/theme.test.ts runs the same checks.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

export function readTokens(css) {
  const block = (start) => {
    const i = css.indexOf(start);
    if (i < 0) throw new Error(`block "${start}" not found`);
    return css.slice(i, css.indexOf("}", i));
  };
  const parse = (txt) => Object.fromEntries([...txt.matchAll(/--color-([\w-]+):\s*(#[0-9A-Fa-f]{6})/g)].map((m) => [m[1], m[2]]));
  const light = parse(block("@theme {"));
  const dark = { ...light, ...parse(block(".dark {")) };
  return { light, dark };
}

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

/** [foreground token, background token or hex, minimum ratio, what it is] */
const PAIRS = [
  ["charcoal", "cream", 7, "body text on page"],
  ["brand-600", "cream", 4.5, "brand text on page"],
  ["brand-600", "#FFFFFF", 4.5, "brand text on cards (light) "],
  ["brand-600", "brand-50", 4.5, "brand text on tinted surface"],
  ["brand-600", "brand-100", 4.5, "brand text on badges"],
  ["on-brand", "brand-500", 4.5, "button / banner text"],
  ["on-brand", "accent-500", 4.5, "banner gradient end"],
];
const DARK_EXTRA = [
  ["brand-600", "#18181B", 4.5, "brand text on zinc-900 cards"],
  ["brand-600", "#27272A", 4.5, "brand text on zinc-800 cards"],
];

export function checkTheme(css, files = {}) {
  const { light, dark } = readTokens(css);
  const results = [];
  const run = (mode, t, pairs) => {
    for (const [fg, bg, min, what] of pairs) {
      if (mode === "dark" && bg === "#FFFFFF") continue; // cards are zinc in dark mode
      const f = t[fg], b = bg.startsWith("#") ? bg : t[bg];
      if (!f || !b) { results.push({ ok: false, mode, what, msg: `missing token ${!f ? fg : bg}` }); continue; }
      const r = contrast(f, b);
      results.push({ ok: r >= min, mode, what, msg: `${fg} ${f} on ${bg.startsWith("#") ? bg : `${bg} ${b}`} = ${r.toFixed(2)}:1 (need ${min})` });
    }
  };
  run("light", light, PAIRS);
  run("dark", dark, [...PAIRS, ...DARK_EXTRA]);
  for (const [name, text] of Object.entries(files)) {
    const m = text.match(/theme[-_]color["']?\s*(?:content=|:)\s*"(#[0-9A-Fa-f]{6})"/);
    const ok = !!m && m[1].toUpperCase() === light["brand-500"].toUpperCase();
    results.push({ ok, mode: "meta", what: `${name} theme colour`, msg: m ? `${m[1]} (brand-500 is ${light["brand-500"]})` : "not found" });
  }
  return results;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
  const results = checkTheme(read("src/styles/globals.css"), {
    "Layout.astro": read("src/layouts/Layout.astro"),
    "manifest.json": read("public/manifest.json"),
  });
  for (const r of results) console.log(`${r.ok ? "ok  " : "FAIL"} [${r.mode}] ${r.what}: ${r.msg}`);
  const failed = results.filter((r) => !r.ok).length;
  console.log(failed ? `\n${failed} check(s) failed` : "\nTheme passes WCAG AA for all checked pairs.");
  process.exit(failed ? 1 : 0);
}
