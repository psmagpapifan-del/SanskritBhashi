#!/usr/bin/env node
// WCAG contrast ratio of one foreground colour against one or more backgrounds.
// Usage: node contrast.cjs "#B84300" "#ffffff" "#faf9f6"
const lum = (hex) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.substr(i, 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const [fg, ...bgs] = process.argv.slice(2);
if (!fg || !bgs.length) { console.error('usage: contrast.cjs "#fg" "#bg" ["#bg2" ...]'); process.exit(2); }
for (const bg of bgs) {
  const r = ratio(fg, bg);
  const verdict = r >= 4.5 ? "AA text" : r >= 3 ? "large text / UI only" : "FAIL";
  console.log(`${fg} on ${bg}: ${r.toFixed(2)}:1  ${verdict}`);
}
