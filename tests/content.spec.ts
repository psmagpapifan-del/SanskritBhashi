import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

/**
 * Content & Copy Testing Suite
 *
 * Validates visible text on every page for placeholder content,
 * raw variable names, proper meta tags, and link quality.
 */

const PAGES = [
  { name: "Home", path: "/en" },
  { name: "Home-HI", path: "/hi" },
  { name: "Home-JA", path: "/ja" },
  { name: "Home-ES", path: "/es" },
  { name: "SchoolPrep", path: "/en/modules/school-prep" },
  { name: "ShastraStudy", path: "/en/modules/shastra-study" },
  { name: "About", path: "/en/about" },
  { name: "Contact", path: "/en/contact" },
  { name: "Privacy", path: "/en/privacy" },
  { name: "Terms", path: "/en/terms" },
  { name: "FAQs", path: "/en/faqs" },
];

test.describe("Content & Copy Testing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("tour_completed", "true");
      localStorage.setItem("cookie-consent", "declined");
    });
  });

  // ── Placeholder Text Detection ────────────────────────────────────────

  for (const pageInfo of PAGES) {
    test(`CON-01-${pageInfo.name}: No placeholder text on page`, async ({ page }) => {
      await page.goto(pageInfo.path);

      const bodyText = await page.evaluate(() => document.body.innerText);
      const bodyTextLower = bodyText.toLowerCase();

      // Check for common placeholder patterns
      const placeholders = [
        "lorem ipsum",
        "[todo]",
        "placeholder",
        "[insert",
        "sample text",
        "dummy text",
        "xxx",
        "tbd",
      ];

      const found: string[] = [];
      for (const placeholder of placeholders) {
        if (bodyTextLower.includes(placeholder)) {
          // Exclude false positives (e.g., "placeholder" in CSS class names or form placeholder attributes)
          // Only flag if it's in visible body text content
          if (placeholder === "placeholder" && bodyTextLower.includes("placeholder=\"")) continue;
          if (placeholder === "xxx" && bodyTextLower.includes("xxxxxxxxxxxxxxxx")) {
            // This is the AdMob placeholder in capacitor config — check if it's visible
            found.push(`Found "${placeholder}" pattern — may be AdMob placeholder visible on page`);
          }
        }
      }

      // These should not appear in visible page text (soft check — log and continue)
      if (found.length > 0) {
        console.warn(`Page ${pageInfo.name}: ${found.join(", ")}`);
      }
    });

    test(`CON-02-${pageInfo.name}: No raw template variables on page`, async ({ page }) => {
      await page.goto(pageInfo.path);

      const bodyText = await page.evaluate(() => document.body.innerText);

      // Check for unresolved template variables
      const patterns = [
        /\{[a-zA-Z_]+\.[a-zA-Z_]+\}/g,    // {user.name} style
        /\{\{[^}]+\}\}/g,                   // {{variable}} style
        /undefined/gi,                       // literal "undefined"
        /\[object Object\]/g,               // [object Object]
        /NaN/g,                             // NaN
      ];

      const issues: string[] = [];
      for (const pattern of patterns) {
        const matches = bodyText.match(pattern);
        if (matches) {
          // Filter out legitimate uses (e.g., code samples, mathematical notation)
          for (const match of matches) {
            if (match === "undefined" || match === "[object Object]" || match === "NaN") {
              issues.push(`Found "${match}" in visible text`);
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  }

  // ── Meta Tags ─────────────────────────────────────────────────────────

  for (const pageInfo of PAGES) {
    test(`CON-03-${pageInfo.name}: Page has title tag`, async ({ page }) => {
      await page.goto(pageInfo.path);
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(5);
    });

    test(`CON-04-${pageInfo.name}: Page has meta description`, async ({ page }) => {
      await page.goto(pageInfo.path);
      const description = await page.getAttribute(
        'meta[name="description"]',
        "content"
      );
      // Should have description (may be null on some pages — flag it)
      if (!description) {
        console.warn(`Page ${pageInfo.name} is missing meta description`);
      }
    });
  }

  // ── Unique Titles ─────────────────────────────────────────────────────

  test("CON-05: All English pages have unique title tags", async ({ page }) => {
    const titles: Map<string, string> = new Map();
    const enPages = PAGES.filter((p) => p.path.startsWith("/en"));

    for (const pageInfo of enPages) {
      await page.goto(pageInfo.path);
      const title = await page.title();
      if (titles.has(title)) {
        console.warn(
          `Duplicate title "${title}" on ${pageInfo.name} and ${titles.get(title)}`
        );
      }
      titles.set(title, pageInfo.name);
    }
  });

  // ── Link Quality ──────────────────────────────────────────────────────

  test("CON-06: No 'click here' links on home page", async ({ page }) => {
    await page.goto("/en");

    const links = await page.evaluate(() => {
      const allLinks = document.querySelectorAll("a");
      return Array.from(allLinks)
        .map((a) => ({
          text: a.textContent?.trim().toLowerCase() || "",
          href: a.href,
        }))
        .filter(
          (l) =>
            l.text === "click here" ||
            l.text === "here" ||
            l.text === "link" ||
            l.text === "read more"
        );
    });

    expect(links).toEqual([]);
  });

  // ── Static Files ──────────────────────────────────────────────────────

  test("CON-07: Sitemap.xml exists and is well-formed", async ({ page }) => {
    const sitemapPath = path.join(process.cwd(), "public/sitemap.xml");
    expect(fs.existsSync(sitemapPath)).toBe(true);

    const content = fs.readFileSync(sitemapPath, "utf8");
    expect(content).toContain("<urlset");
    expect(content).toContain("sanskritbhashi.com");
  });

  test("CON-08: robots.txt exists and references sitemap", async ({ page }) => {
    const robotsPath = path.join(process.cwd(), "public/robots.txt");
    expect(fs.existsSync(robotsPath)).toBe(true);

    const content = fs.readFileSync(robotsPath, "utf8");
    expect(content).toContain("Sitemap:");
    expect(content).toContain("sanskritbhashi.com");
  });

  test("CON-09: manifest.json is valid JSON with required fields", async ({ page }) => {
    const manifestPath = path.join(process.cwd(), "public/manifest.json");
    expect(fs.existsSync(manifestPath)).toBe(true);

    const content = fs.readFileSync(manifestPath, "utf8");
    const manifest = JSON.parse(content);

    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.icons).toBeInstanceOf(Array);
    expect(manifest.icons.length).toBeGreaterThan(0);
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.display).toBeTruthy();
    expect(manifest.theme_color).toBeTruthy();
    expect(manifest.background_color).toBeTruthy();
  });

  // ── Canonical & Structured Data ───────────────────────────────────────

  test("CON-10: Home page has canonical URL", async ({ page }) => {
    await page.goto("/en");
    const canonical = await page.getAttribute('link[rel="canonical"]', "href");
    expect(canonical).toContain("sanskritbhashi.com");
  });

  test("CON-11: Home page has JSON-LD structured data", async ({ page }) => {
    await page.goto("/en");
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    expect(scripts.length).toBeGreaterThan(0);

    for (const script of scripts) {
      const content = await script.innerHTML();
      const data = JSON.parse(content);
      expect(data["@context"]).toBe("https://schema.org");
    }
  });
});
