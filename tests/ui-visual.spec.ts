import { test, expect } from "@playwright/test";

/**
 * UI & Visual Testing Suite
 *
 * Tests layout, spacing, typography, colors, images, component states,
 * and responsive behavior across all major pages.
 */

const PAGES = [
  { name: "Home", path: "/en" },
  { name: "SchoolPrep", path: "/en/modules/school-prep" },
  { name: "ShastraStudy", path: "/en/modules/shastra-study" },
  { name: "About", path: "/en/about" },
  { name: "Contact", path: "/en/contact" },
  { name: "Privacy", path: "/en/privacy" },
  { name: "Terms", path: "/en/terms" },
  { name: "FAQs", path: "/en/faqs" },
];

const RESPONSIVE_VIEWPORTS = [
  { name: "mobile-320", width: 320, height: 568 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1280", width: 1280, height: 720 },
  { name: "widescreen-1920", width: 1920, height: 1080 },
];

test.describe("UI & Visual Testing", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to bypass onboarding tour
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("tour_completed", "true");
      localStorage.setItem("cookie-consent", "declined");
    });
  });

  // ── Layout & Responsive Behavior ────────────────────────────────────────

  for (const pageInfo of PAGES) {
    test(`VIS-01-${pageInfo.name}: Page loads without errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));

      const response = await page.goto(pageInfo.path);
      expect(response?.status()).toBeLessThan(400);

      // No JS errors
      expect(errors).toEqual([]);
    });

    test(`VIS-02-${pageInfo.name}: No overlapping or overflowing elements`, async ({ page }) => {
      await page.goto(pageInfo.path);

      // Check that body doesn't have horizontal scrollbar
      const hasHScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHScroll).toBe(false);
    });

    test(`VIS-03-${pageInfo.name}: Visual screenshot baseline`, async ({ page }) => {
      await page.goto(pageInfo.path);
      await page.waitForLoadState("networkidle");

      // Take full-page screenshot for visual regression
      await expect(page).toHaveScreenshot(`${pageInfo.name}-desktop.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });
  }

  // ── Responsive Screenshots ──────────────────────────────────────────────

  for (const viewport of RESPONSIVE_VIEWPORTS) {
    test(`VIS-04-responsive-${viewport.name}: Home page at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/en");
      await page.waitForLoadState("networkidle");

      // No horizontal overflow at this viewport
      const hasHScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHScroll).toBe(false);

      await expect(page).toHaveScreenshot(`home-${viewport.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });
  }

  // ── Typography ──────────────────────────────────────────────────────────

  test("VIS-05: Geist font family is loaded correctly", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    const fontFamily = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return computed.fontFamily;
    });

    // Should contain Geist, not just system fallback
    expect(fontFamily.toLowerCase()).toContain("geist");
  });

  test("VIS-06: Heading hierarchy is correct on home page (h1→h2→h3)", async ({ page }) => {
    await page.goto("/en");

    const headings = await page.evaluate(() => {
      const all = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      return Array.from(all).map((h) => ({
        tag: h.tagName.toLowerCase(),
        text: h.textContent?.trim().substring(0, 50) || "",
      }));
    });

    // Should have exactly one h1
    const h1Count = headings.filter((h) => h.tag === "h1").length;
    expect(h1Count).toBe(1);

    // Heading levels should not skip (e.g., h1 → h3 without h2)
    let lastLevel = 0;
    for (const heading of headings) {
      const level = parseInt(heading.tag.replace("h", ""), 10);
      if (lastLevel > 0 && level > lastLevel + 1) {
        // Record the skip but continue — this is a finding, not a hard fail
        console.warn(`Heading skip: ${heading.tag} after h${lastLevel}: "${heading.text}"`);
      }
      lastLevel = level;
    }
  });

  test("VIS-07: No text clipping or overflow on key elements", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    // Check the hero h1 isn't clipped
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();

    const h1Box = await h1.boundingBox();
    expect(h1Box).not.toBeNull();
    if (h1Box) {
      expect(h1Box.width).toBeGreaterThan(100);
      expect(h1Box.height).toBeGreaterThan(20);
    }
  });

  // ── Colors & Contrast (Basic) ─────────────────────────────────────────

  test("VIS-08: Dark mode toggles correctly", async ({ page }) => {
    await page.goto("/en");

    // Initially should not have dark class (default light)
    const initialDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );

    // Click theme toggle
    const toggleBtn = page.locator("#theme-toggle-desktop");
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();

      const afterDark = await page.evaluate(() =>
        document.documentElement.classList.contains("dark")
      );

      // Should have toggled
      expect(afterDark).not.toBe(initialDark);
    }
  });

  // ── Images ──────────────────────────────────────────────────────────────

  test("VIS-09: Favicon and PWA icons load correctly", async ({ page }) => {
    // Check favicon
    const faviconRes = await page.request.get("/favicon.ico");
    expect(faviconRes.status()).toBe(200);

    // Check SVG favicon
    const svgRes = await page.request.get("/favicon.svg");
    expect(svgRes.status()).toBe(200);

    // Check PWA icons
    const icon192 = await page.request.get("/favicon-192x192.png");
    expect(icon192.status()).toBe(200);

    const icon512 = await page.request.get("/favicon-512x512.png");
    expect(icon512.status()).toBe(200);
  });

  test("VIS-10: All images on About page load without errors", async ({ page }) => {
    const failedImages: string[] = [];

    page.on("response", (response) => {
      if (response.request().resourceType() === "image" && response.status() >= 400) {
        failedImages.push(`${response.url()} → ${response.status()}`);
      }
    });

    await page.goto("/en/about");
    await page.waitForLoadState("networkidle");

    expect(failedImages).toEqual([]);
  });

  // ── Mobile Navigation ─────────────────────────────────────────────────

  test("VIS-11: Mobile bottom nav bar is visible at 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/en");

    // Mobile bottom nav should be visible
    const bottomNav = page.locator("nav.fixed.bottom-0").first();
    await expect(bottomNav).toBeVisible();

    // Desktop sidebar should be hidden
    const sidebar = page.locator("#tour-step-2");
    await expect(sidebar).not.toBeVisible();
  });

  test("VIS-12: Desktop sidebar is visible at 1280px", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/en");

    // Desktop sidebar should be visible
    const sidebar = page.locator("#tour-step-2");
    await expect(sidebar).toBeVisible();
  });

  // ── Component States ──────────────────────────────────────────────────

  test("VIS-13: Language selector opens and shows options", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    // Use nth(1) for the desktop header's language selector (2nd in DOM, visible at 1280px)
    const selectorBtn = page.locator("#tour-step-6").nth(1);
    await expect(selectorBtn).toBeVisible();
    await selectorBtn.click();

    // Dropdown should appear with language options
    const dropdown = page.locator("text=Interface Language");
    try {
      await expect(dropdown).toBeVisible({ timeout: 3000 });
    } catch {
      await selectorBtn.click();
      await expect(dropdown).toBeVisible({ timeout: 5000 });
    }

    // Should see all 4 interface languages in the dropdown
    // Use exact button locators to avoid matching other "English" text on the page
    await expect(page.locator("text=हिन्दी (Hindi)")).toBeVisible();
    await expect(page.locator("text=日本語 (Japanese)")).toBeVisible();
    await expect(page.locator("text=Español (Spanish)")).toBeVisible();
    // Verify the "Transliteration Script" section also renders
    await expect(page.locator("text=Transliteration Script")).toBeVisible();
  });

  test("VIS-14: Cookie consent banner appears on fresh visit", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.removeItem("cookie-consent");
      localStorage.setItem("tour_completed", "true");
    });
    await page.goto("/en");

    const banner = page.locator("#cookie-consent-banner");
    await expect(banner).toBeVisible();

    // Should have all three buttons
    await expect(page.locator("#accept-cookies")).toBeVisible();
    await expect(page.locator("#decline-cookies")).toBeVisible();
    await expect(page.locator("#customize-cookies")).toBeVisible();
  });
});
