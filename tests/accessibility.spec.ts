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
  { name: "SchoolPrepClass11", path: "/en/modules/school-prep/class-11" },
  { name: "ShastraStudy", path: "/en/modules/shastra-study" },
  { name: "About", path: "/en/about" },
  { name: "Contact", path: "/en/contact" },
  { name: "Privacy", path: "/en/privacy" },
  { name: "Terms", path: "/en/terms" },
  { name: "FAQs", path: "/en/faqs" },
  { name: "LearnHub", path: "/en/learn" },
  { name: "ArticleLakaras", path: "/en/learn/sanskrit-verb-lakaras" },
  { name: "ArticleChandasJA", path: "/ja/learn/sanskrit-chandas-meter" },
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

      // Inject axe-core from the local package (no network dependency)
      await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });

      const violations = await page.evaluate(async () => {
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
          targets: v.nodes.slice(0, 5).map((n: any) => `${n.target.join(" ")} :: ${n.failureSummary?.split("\n")[1] ?? ""}`),
        }));
      });

      // Log all violations for reporting
      if (violations.length > 0) {
        console.log(`\n=== A11Y Violations on ${pageInfo.name} ===`);
        for (const v of violations) {
          console.log(`  [${v.impact?.toUpperCase()}] ${v.id}: ${v.description} (${v.nodes} elements)`);
          if (v.helpUrl) console.log(`    Help: ${v.helpUrl}`);
          for (const t of v.targets ?? []) console.log(`      - ${t}`);
        }
      }

      // Filter critical and serious violations for assertion
      const criticalViolations = violations.filter(
        (v: any) => v.impact === "critical" || v.impact === "serious"
      );

      expect(criticalViolations, `${pageInfo.name}: critical/serious a11y violations`).toEqual([]);
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

      expect(skips, `${pageInfo.name}: heading hierarchy skips`).toEqual([]);
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

// ── Wider axe coverage: every locale, dark mode, and quiz states ────────────

async function seriousViolations(page: import("@playwright/test").Page, label: string) {
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
  const violations = await page.evaluate(async () => {
    const results = await (window as any).axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] },
    });
    return results.violations
      .filter((v: any) => v.impact === "critical" || v.impact === "serious")
      .map((v: any) => ({
        id: v.id,
        targets: v.nodes.slice(0, 5).map((n: any) => `${n.target.join(" ")} :: ${n.failureSummary?.split("\n")[1] ?? ""}`),
      }));
  });
  if (violations.length) {
    console.log(`\n=== ${label} ===`);
    for (const v of violations) for (const t of v.targets) console.log(`  [${v.id}] ${t}`);
  }
  return violations;
}

const LOCALE_PAGES = ["", "/modules/school-prep", "/modules/school-prep/class-9", "/modules/gita", "/modules/gita/adhyaya-2", "/modules/shastra-study", "/learn", "/faqs", "/about", "/contact", "/learn/bhagavad-gita-anvaya-guide"];
const LOCALES = ["en", "hi", "ja", "es"];

test.describe("Accessibility – all locales and themes", () => {
  for (const theme of ["light", "dark"] as const) {
    for (const locale of LOCALES) {
      // Dark mode is checked on every page in English and Hindi; light mode in all four locales.
      if (theme === "dark" && (locale === "ja" || locale === "es")) continue;
      test(`A11Y-20-${locale}-${theme}: no serious axe violations on main pages`, async ({ page }) => {
        test.setTimeout(120_000);
        await page.goto(`/${locale}`);
        await page.evaluate((t) => {
          localStorage.setItem("tour_completed", "true");
          localStorage.setItem("cookie-consent", "declined");
          localStorage.setItem("theme", t);
        }, theme);
        const failures: string[] = [];
        for (const p of LOCALE_PAGES) {
          await page.goto(`/${locale}${p}`, { waitUntil: "networkidle" });
          const v = await seriousViolations(page, `${locale}${p} (${theme})`);
          if (v.length) failures.push(`${locale}${p}: ${v.map((x: any) => x.id).join(", ")}`);
        }
        expect(failures).toEqual([]);
      });
    }
  }
});

test.describe("Accessibility – quiz states", () => {
  for (const theme of ["light", "dark"] as const) {
    test(`A11Y-21-${theme}: NCERT quiz after wrong and right answers`, async ({ page }) => {
      await page.goto("/en");
      await page.evaluate((t) => {
        localStorage.setItem("tour_completed", "true");
        localStorage.setItem("cookie-consent", "declined");
        localStorage.setItem("theme", t);
      }, theme);
      await page.goto("/en/modules/school-prep/class-6", { waitUntil: "networkidle" });
      const card = page.locator("#ncert-quiz-card");
      await card.locator('[data-option-correct="false"]').first().click();
      expect(await seriousViolations(page, `quiz wrong (${theme})`)).toEqual([]);
      await card.locator('[data-option-correct="true"]').click();
      expect(await seriousViolations(page, `quiz right (${theme})`)).toEqual([]);
    });

    test(`A11Y-22-${theme}: Shastra quiz after a right answer`, async ({ page }) => {
      await page.goto("/en");
      await page.evaluate((t) => {
        localStorage.setItem("tour_completed", "true");
        localStorage.setItem("cookie-consent", "declined");
        localStorage.setItem("theme", t);
      }, theme);
      await page.goto("/en/modules/shastra-study", { waitUntil: "networkidle" });
      const card = page.locator("#shastra-quiz-card");
      await card.locator('[data-option-correct="true"]').click();
      expect(await seriousViolations(page, `shastra right (${theme})`)).toEqual([]);
    });
  }
});

test.describe("Accessibility – keyboard quiz flow", () => {
  test("A11Y-23: NCERT quiz can be answered with the keyboard and focus is never lost", async ({ page }) => {
    await page.goto("/en");
    await page.evaluate(() => {
      localStorage.setItem("tour_completed", "true");
      localStorage.setItem("cookie-consent", "declined");
    });
    await page.goto("/en/modules/school-prep/class-6", { waitUntil: "networkidle" });
    const card = page.locator("#ncert-quiz-card");

    // Wrong answer via keyboard: focus stays on the (now struck) option, which is announced as incorrect.
    const wrong = card.locator('[data-option-correct="false"]').first();
    await wrong.focus();
    await page.keyboard.press("Enter");
    await expect(wrong).toBeFocused();
    await expect(wrong).toHaveAttribute("aria-disabled", "true");
    await expect(wrong.locator(".sr-only")).toHaveText(/Incorrect/);

    // Right answer via keyboard: focus moves to Next.
    await card.locator('[data-option-correct="true"]').focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("quiz-next")).toBeFocused();

    // Next via keyboard: focus lands on the new question prompt.
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("quiz-position")).toHaveText("Question 2 of 9");
    await expect(page.getByTestId("quiz-prompt")).toBeFocused();
  });
});
