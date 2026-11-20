#!/usr/bin/env node
// Scan pages with axe-core and print serious/critical WCAG 2.1 AA violations.
// Usage: node axe-scan.cjs <baseUrl> <path...> [--storage key=value]... [--rules id,id] [--mobile]
// Needs `playwright` and `axe-core` resolvable (project node_modules or global).
const { chromium, devices } = require("playwright");

const args = process.argv.slice(2);
const base = args.shift();
const paths = [], storage = {};
let rules = null, mobile = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--storage") { const [k, ...v] = args[++i].split("="); storage[k] = v.join("="); }
  else if (args[i] === "--rules") rules = args[++i].split(",");
  else if (args[i] === "--mobile") mobile = true;
  else paths.push(args[i]);
}
if (!base || !paths.length) { console.error("usage: axe-scan.cjs <baseUrl> <path...>"); process.exit(2); }

let axePath;
try { axePath = require.resolve("axe-core/axe.min.js", { paths: [process.cwd(), __dirname] }); }
catch { console.error("axe-core not found: npm i -D axe-core"); process.exit(2); }

(async () => {
  // Fall back to a preinstalled Chromium when the project's Playwright has no matching browser
  // (cloud sessions ship one at /opt/pw-browsers/chromium; override with CHROME_PATH).
  let browser;
  try { browser = await chromium.launch(); }
  catch (e) {
    const fs = require("fs");
    const exe = [process.env.CHROME_PATH, "/opt/pw-browsers/chromium/chrome-linux/chrome", "/opt/pw-browsers/chromium"]
      .find((p) => p && fs.existsSync(p) && fs.statSync(p).isFile());
    if (!exe) throw e;
    browser = await chromium.launch({ executablePath: exe });
  }
  const ctx = await browser.newContext(mobile ? { ...devices["Pixel 7"] } : { viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  // Ads/analytics only add noise and network failures in sandboxes.
  await page.route(/googlesyndication|doubleclick|googletagmanager|google-analytics/, (r) => r.abort());
  await page.goto(base + paths[0]);
  await page.evaluate((s) => { for (const [k, v] of Object.entries(s)) localStorage.setItem(k, v); }, storage);
  let failed = 0;
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    await page.addScriptTag({ path: axePath });
    const v = await page.evaluate(async (rules) => {
      const opts = rules ? { runOnly: { type: "rule", values: rules } }
        : { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] } };
      const r = await window.axe.run(document, opts);
      return r.violations.filter((x) => rules || x.impact === "serious" || x.impact === "critical")
        .map((x) => ({ id: x.id, nodes: x.nodes.slice(0, 6).map((n) => `${n.target.join(" ")} :: ${(n.failureSummary || "").split("\n")[1] || ""}`) }));
    }, rules);
    console.log(`${v.length ? "FAIL" : "ok  "} ${p}`);
    for (const x of v) for (const n of x.nodes) console.log(`     [${x.id}] ${n.slice(0, 240)}`);
    if (v.length) failed++;
  }
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
