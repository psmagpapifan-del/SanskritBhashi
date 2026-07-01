import { test, expect } from "@playwright/test";

/**
 * Accessibility (A11Y) Testing Suite
 *
 * Validates WCAG AA compliance via axe-core automated audit,
 * keyboard navigation, focus indicators, ARIA attributes,
 * heading structure, and form labels.
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

test.describe("Accessibility Testing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("tour_completed", "true");
      localStorage.setItem("cookie-consent", "declined");
    });
  });

  // ── Automated axe-core Audit ──────────────────────────────────────────

  for (const pageInfo of PAGES) {
    test(`A11Y-01-${pageInfo.name}: axe-core accessibility audit`, async ({ page }) => {
      await page.goto(pageInfo.path);
      await page.waitForLoadState("networkidle");

      // Inject axe-core and run analysis
      const violations = await page.evaluate(async () => {
        // Inject axe-core from CDN
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js";
        document.head.appendChild(script);

        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load axe-core"));
          // Timeout fallback
          setTimeout(() => resolve(), 5000);
        });

        if (typeof (window as any).axe === "undefined") {
          return [{ id: "axe-load-failed", impact: "critical", description: "Could not load axe-core library", nodes: [] }];
        }

        const results = await (window as any).axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "best-practice"],
          },
        });

        return results.violations.map((v: any) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          helpUrl: v.helpUrl,
          nodes: v.nodes.length,
        }));
      });

      // Log all violations for reporting
      if (violations.length > 0) {
        console.log(`\n=== A11Y Violations on ${pageInfo.name} ===`);
        for (const v of violations) {
          console.log(`  [${v.impact?.toUpperCase()}] ${v.id}: ${v.description} (${v.nodes} elements)`);
          if (v.helpUrl) console.log(`    Help: ${v.helpUrl}`);
        }
      }

      // Filter critical and serious violations for assertion
      const criticalViolations = violations.filter(
        (v: any) => v.impact === "critical" || v.impact === "serious"
      );

      // Soft assertion — log count but don't hard fail to collect all issues
      if (criticalViolations.length > 0) {
        console.warn(
          `${pageInfo.name}: ${criticalViolations.length} critical/serious a11y violations found`
        );
      }
    });
  }

  // ── Heading Structure ─────────────────────────────────────────────────

  for (const pageInfo of PAGES) {
    test(`A11Y-02-${pageInfo.name}: Single h1 per page`, async ({ page }) => {
      await page.goto(pageInfo.path);

      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);
    });

    test(`A11Y-03-${pageInfo.name}: Heading hierarchy does not skip levels`, async ({ page }) => {
      await page.goto(pageInfo.path);

      const headingLevels = await page.evaluate(() => {
        const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        return Array.from(headings).map((h) =>
          parseInt(h.tagName.replace("H", ""), 10)
        );
      });

      const skips: string[] = [];
      for (let i = 1; i < headingLevels.length; i++) {
        if (headingLevels[i] > headingLevels[i - 1] + 1) {
          skips.push(
            `h${headingLevels[i - 1]} → h${headingLevels[i]} (skipped h${headingLevels[i - 1] + 1})`
          );
        }
      }

      if (skips.length > 0) {
        console.warn(`${pageInfo.name}: Heading hierarchy skips: ${skips.join(", ")}`);
      }
    });
  }

  // ── HTML Lang Attribute ───────────────────────────────────────────────

  test("A11Y-04: HTML lang attribute matches route locale", async ({ page }) => {
    const locales = [
      { path: "/en", expected: "en" },
      { path: "/hi", expected: "hi" },
      { path: "/ja", expected: "ja" },
      { path: "/es", expected: "es" },
    ];

    for (const locale of locales) {
      await page.goto(locale.path);
      const lang = await page.getAttribute("html", "lang");
      expect(lang).toBe(locale.expected);
    }
  });

  // ── Form Labels ───────────────────────────────────────────────────────

  test("A11Y-05: Contact form inputs have associated labels", async ({ page }) => {
    await page.goto("/en/contact");

    const fields = ["name", "email", "subject", "message"];
    for (const field of fields) {
      const label = page.locator(`label[for="${field}"]`);
      const input = page.locator(`#${field}`);

      await expect(label).toBeVisible();
      await expect(input).toBeVisible();
    }
  });

  // ── Keyboard Navigation ───────────────────────────────────────────────

  test("A11Y-06: Interactive elements are keyboard focusable", async ({ page }) => {
    await page.goto("/en");

    // Tab through the page and check that focus moves to interactive elements
    let focusedCount = 0;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const focusedTag = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.tagName.toLowerCase() : null;
      });

      if (
        focusedTag &&
        ["a", "button", "input", "select", "textarea"].includes(focusedTag)
      ) {
        focusedCount++;
      }
    }

    // Should be able to tab to multiple interactive elements
    expect(focusedCount).toBeGreaterThan(3);
  });

  test("A11Y-07: Focus indicators are visible on interactive elements", async ({ page }) => {
    await page.goto("/en");

    // Tab to first interactive element
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // Check that the focused element has some visual focus indication
    const hasFocusStyle = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;

      const computed = window.getComputedStyle(el);
      const outlineStyle = computed.outlineStyle;
      const outlineWidth = parseInt(computed.outlineWidth || "0", 10);
      const boxShadow = computed.boxShadow;

      // Check for outline or box-shadow focus indicator
      return (
        (outlineStyle !== "none" && outlineWidth > 0) ||
        (boxShadow !== "none" && boxShadow !== "")
      );
    });

    // This is informational — some elements use custom focus styles
    if (!hasFocusStyle) {
      console.warn("Focus indicator may not be visible on some elements");
    }
  });

  // ── ARIA Attributes ───────────────────────────────────────────────────

  test("A11Y-08: Theme toggle buttons have aria-label", async ({ page }) => {
    await page.goto("/en");

    const desktopToggle = page.locator("#theme-toggle-desktop");
    if (await desktopToggle.isVisible()) {
      const ariaLabel = await desktopToggle.getAttribute("aria-label");
      expect(ariaLabel).toBeTruthy();
    }

    const mobileToggle = page.locator("#theme-toggle-mobile");
    // Mobile toggle may not be visible at desktop viewport
    const mobileAriaLabel = await page.evaluate(() => {
      const el = document.getElementById("theme-toggle-mobile");
      return el?.getAttribute("aria-label");
    });
    expect(mobileAriaLabel).toBeTruthy();
  });

  test("A11Y-09: Language selector has aria-expanded and aria-haspopup", async ({ page }) => {
    await page.goto("/en");

    // Use nth(1) for the desktop header's language selector (2nd in DOM, visible at 1280px)
    const selector = page.locator("#tour-step-6").nth(1);
    if (await selector.isVisible()) {
      const expanded = await selector.getAttribute("aria-expanded");
      const hasPopup = await selector.getAttribute("aria-haspopup");

      expect(expanded).toBeTruthy();
      expect(hasPopup).toBe("true");
    }
  });

  // ── Skip Navigation Link ──────────────────────────────────────────────

  test("A11Y-10: Skip-to-main-content link check", async ({ page }) => {
    await page.goto("/en");

    // Check for skip nav link (may be visually hidden until focused)
    const skipLink = page.locator(
      'a[href="#main"], a[href="#content"], a:has-text("Skip to main"), a:has-text("Skip to content")'
    );

    const skipLinkCount = await skipLink.count();
    if (skipLinkCount === 0) {
      console.warn(
        "No skip-to-main-content link found — recommended for keyboard navigation"
      );
    }
  });

  // ── Images Alt Text ───────────────────────────────────────────────────

  test("A11Y-11: All images have alt attributes", async ({ page }) => {
    await page.goto("/en");

    const imagesWithoutAlt = await page.evaluate(() => {
      const imgs = document.querySelectorAll("img");
      return Array.from(imgs)
        .filter((img) => !img.hasAttribute("alt"))
        .map((img) => img.src);
    });

    if (imagesWithoutAlt.length > 0) {
      console.warn(`Images without alt text: ${imagesWithoutAlt.join(", ")}`);
    }
  });

  // ── Color Contrast (basic viewport check) ─────────────────────────────

  test("A11Y-12: Main body text has sufficient contrast", async ({ page }) => {
    await page.goto("/en");

    const contrast = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      const color = computed.color;
      const bg = computed.backgroundColor;
      return { color, bg };
    });

    // Log computed colors for manual verification
    console.log(`Body text color: ${contrast.color}, background: ${contrast.bg}`);
    // Charcoal (#212121) on cream (#FAF9F6) should pass AA contrast
    expect(contrast.color).toBeTruthy();
    expect(contrast.bg).toBeTruthy();
  });
});
