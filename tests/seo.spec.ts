import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

/**
 * Search, social-preview and AI-search essentials. Runs against `astro preview`.
 */
const PAGES = [
  { path: "/en", image: "/og/default.png" },
  { path: "/hi/modules/school-prep", image: "/og/school-prep.png" },
  { path: "/en/modules/school-prep/class-11", image: "/og/school-prep.png" },
  { path: "/ja/modules/shastra-study", image: "/og/shastra-study.png" },
  { path: "/es/learn/panini-sandhi-rules", image: "/og/learn.png" },
];

test.describe("SEO and social previews", () => {
  for (const p of PAGES) {
    test(`SEO-01 ${p.path}: Open Graph and Twitter tags`, async ({ page, request }) => {
      await page.goto(p.path);
      const meta = (sel: string) => page.locator(sel).getAttribute("content");
      expect(await meta('meta[property="og:title"]')).toBeTruthy();
      expect(await meta('meta[property="og:description"]')).toBeTruthy();
      expect(await meta('meta[property="og:url"]')).toBe(await page.locator('link[rel="canonical"]').getAttribute("href"));
      expect(await meta('meta[property="og:image"]')).toBe(`https://sanskritbhashi.com${p.image}`);
      expect(await meta('meta[name="twitter:card"]')).toBe("summary_large_image");
      const lang = p.path.split("/")[1];
      expect(await meta('meta[property="og:locale"]')).toMatch(new RegExp(`^${lang}_`));
      // The image is served and is a 1200×630 PNG.
      const img = await request.get(p.image);
      expect(img.status()).toBe(200);
      const buf = await img.body();
      expect(buf.readUInt32BE(16)).toBe(1200);
      expect(buf.readUInt32BE(20)).toBe(630);
    });
  }

  test("SEO-02: articles are og:type article with a 3-level breadcrumb", async ({ page }) => {
    await page.goto("/en/learn/sanskrit-verb-lakaras");
    expect(await page.locator('meta[property="og:type"]').getAttribute("content")).toBe("article");
    const schemas = await Promise.all(
      (await page.locator('script[type="application/ld+json"]').all()).map(async (s) => JSON.parse(await s.innerHTML()))
    );
    const crumbs = schemas.find((s) => s["@type"] === "BreadcrumbList");
    expect(crumbs.itemListElement.map((i: any) => i.item)).toEqual([
      "https://sanskritbhashi.com/en",
      "https://sanskritbhashi.com/en/learn",
      "https://sanskritbhashi.com/en/learn/sanskrit-verb-lakaras",
    ]);
  });

  test("SEO-03: home has WebSite schema and no breadcrumb", async ({ page }) => {
    await page.goto("/en");
    const types = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent!)["@type"]));
    expect(types).toContain("WebSite");
    expect(types).not.toContain("BreadcrumbList");
  });

  test("SEO-04: class page titles and descriptions fit search results", async ({ page }) => {
    for (const n of [6, 9, 11, 12]) {
      await page.goto(`/en/modules/school-prep/class-${n}`);
      expect([...(await page.title())].length).toBeLessThanOrEqual(70);
      const d = (await page.locator('meta[name="description"]').getAttribute("content"))!;
      expect([...d].length).toBeLessThanOrEqual(165);
    }
  });
});

test.describe("Crawler and AI-search files", () => {
  test("SEO-10: robots.txt allows AI search bots and blocks training bots", async ({ request }) => {
    const txt = await (await request.get("/robots.txt")).text();
    const group = (agent: string) => {
      const blocks = txt.split(/\n\s*\n/);
      return blocks.find((b) => new RegExp(`^User-agent: ${agent}$`, "m").test(b)) ?? "";
    };
    for (const bot of ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"]) expect(group(bot)).toMatch(/^Allow: \/$/m);
    for (const bot of ["GPTBot", "ClaudeBot", "Google-Extended", "CCBot"]) expect(group(bot)).toMatch(/^Disallow: \/$/m);
    expect(group("\\*")).toMatch(/^Allow: \/$/m);
    expect(txt).toContain("Sitemap: https://sanskritbhashi.com/sitemap.xml");
  });

  test("SEO-11: llms.txt lists every class and article", async ({ request }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    const txt = await res.text();
    expect(txt.startsWith("# Sanskritbhashi")).toBe(true);
    for (const n of [6, 7, 8, 9, 10, 11, 12]) expect(txt).toContain(`/en/modules/school-prep/class-${n})`);
    const slugs = fs.readdirSync(path.join(process.cwd(), "src/pages/[lang]/learn")).filter((f) => f !== "index.astro").map((f) => f.replace(".astro", ""));
    for (const s of slugs) expect(txt).toContain(`/en/learn/${s})`);
  });

  test("SEO-12: IndexNow key file is served and matches the script", async ({ request }) => {
    const script = fs.readFileSync(path.join(process.cwd(), "scripts/indexnow.mjs"), "utf8");
    const key = script.match(/const KEY = "([0-9a-f]{32})"/)![1];
    const res = await request.get(`/${key}.txt`);
    expect(res.status()).toBe(200);
    expect((await res.text()).trim()).toBe(key);
  });
});
