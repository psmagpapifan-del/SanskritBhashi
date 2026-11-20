#!/usr/bin/env node
/**
 * Generate the 1200×630 social share images in public/og/ (Open Graph / Twitter cards).
 * Colours are read from the @theme block in src/styles/globals.css, so after changing
 * the colour scheme you only need to re-run:   node scripts/generate-og-images.cjs
 * Needs Playwright + network access to Google Fonts (Geist, Tiro Sanskrit).
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = path.join(__dirname, "..");
const css = fs.readFileSync(path.join(root, "src/styles/globals.css"), "utf8");
const themeBlock = css.slice(css.indexOf("@theme {"), css.indexOf("}", css.indexOf("@theme {")));
const token = (name) => {
  const m = themeBlock.match(new RegExp(`--color-${name}:\\s*(#[0-9A-Fa-f]{3,8})`));
  if (!m) throw new Error(`token --color-${name} not found in @theme`);
  return m[1];
};
const c = {
  brand: token("brand-500"),
  accent: token("accent-500"),
  ink: token("brand-600"),
  onBrand: token("on-brand"),
  canvas: token("cream"),
  text: token("charcoal"),
};

const IMAGES = [
  { file: "default.png", kicker: "Learn Sanskrit online", title: "Sanskrit grammar, NCERT practice and Shastra study", sub: "Free lessons and quizzes · English · हिन्दी · 日本語 · Español" },
  { file: "school-prep.png", kicker: "NCERT School Prep · Classes 6–12", title: "Chapter-wise Sanskrit quizzes for every NCERT lesson", sub: "दीपकम् · शारदा · शेमुषी · भास्वती · शाश्वती" },
  { file: "shastra-study.png", kicker: "Shastra Study", title: "Bhagavad Gita and Upanishads, verse by verse", sub: "Word-by-word meaning, grammar and quizzes" },
  { file: "learn.png", kicker: "Learn Hub", title: "Clear guides to Sanskrit grammar and script", sub: "Sandhi · Vibhakti · Lakāras · Samāsa · Chandas" },
];

const html = (img) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400..900&family=Tiro+Sanskrit&display=block">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: ${c.canvas}; color: ${c.text}; font-family: Geist, sans-serif;
         display: flex; flex-direction: column; justify-content: space-between; padding: 72px 80px; position: relative; overflow: hidden; }
  .band { position: absolute; inset: 0 0 auto 0; height: 14px; background: linear-gradient(90deg, ${c.brand}, ${c.accent}); }
  .orb { position: absolute; right: -140px; bottom: -180px; width: 560px; height: 560px; border-radius: 50%;
         background: radial-gradient(circle, ${c.accent}55, transparent 70%); }
  .logo { font-family: "Tiro Sanskrit", serif; font-size: 64px; color: ${c.ink}; line-height: 1; }
  .domain { font-size: 22px; font-weight: 700; letter-spacing: 0.18em; color: ${c.text}b3; margin-top: 10px; }
  .kicker { display: inline-block; background: ${c.brand}; color: ${c.onBrand}; font-weight: 800; font-size: 26px;
            padding: 10px 22px; border-radius: 999px; }
  h1 { font-size: 62px; font-weight: 900; line-height: 1.08; margin-top: 22px; max-width: 980px; letter-spacing: -0.02em; }
  .sub { font-size: 30px; margin-top: 20px; color: ${c.text}cc; font-family: Geist, "Tiro Sanskrit", sans-serif; }
</style></head><body>
  <div class="band"></div><div class="orb"></div>
  <div><div class="logo">संस्कृतभाषी</div><div class="domain">SANSKRITBHASHI.COM</div></div>
  <div><span class="kicker">${img.kicker}</span><h1>${img.title}</h1><div class="sub">${img.sub}</div></div>
</body></html>`;

(async () => {
  const outDir = path.join(root, "public/og");
  fs.mkdirSync(outDir, { recursive: true });
  let browser;
  try { browser = await chromium.launch(); }
  catch { browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/opt/pw-browsers/chromium/chrome-linux/chrome" }); }
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  for (const img of IMAGES) {
    await page.setContent(html(img), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(outDir, img.file), type: "png" });
    console.log("wrote public/og/" + img.file);
  }
  await browser.close();
})();
