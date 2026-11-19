import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test.describe("Sanskritbhashi Comprehensive End-to-End Test Suite", () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure a clean state for each test run
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("TC-01: Schema Validation (Course and FAQPage on school-prep)", async ({ page }) => {
    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    // Find and parse all JSON-LD script tags
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    const schemas = await Promise.all(
      scripts.map(async (script) => JSON.parse(await script.innerHTML()))
    );

    // Verify Course schema is present
    const courseSchema = schemas.find((s) => s["@type"] === "Course");
    expect(courseSchema).toBeDefined();
    expect(courseSchema.name).toContain("NCERT");

    // Verify FAQPage schema is present
    const faqSchema = schemas.find((s) => s["@type"] === "FAQPage");
    expect(faqSchema).toBeDefined();
    expect(faqSchema.mainEntity).toBeInstanceOf(Array);
    expect(faqSchema.mainEntity.length).toBeGreaterThanOrEqual(2);
    expect(faqSchema.mainEntity[0].name).toContain("NCERT");
  });

  test("TC-02: Header Validation (_headers file parse and pages.dev checks)", async ({ page }) => {
    // 1. Parse local public/_headers file
    const headersPath = path.join(process.cwd(), "public/_headers");
    expect(fs.existsSync(headersPath)).toBe(true);

    const headersContent = fs.readFileSync(headersPath, "utf8");
    expect(headersContent).toContain("pages.dev");
    expect(headersContent).toContain("X-Robots-Tag: noindex");

    // 2. Perform page checks
    await page.goto("/en");
    await page.locator('button:has-text("Skip Tour")').click();
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("TC-03: NCERT quiz core loop (hint on a wrong answer, Next unlocks on the right one)", async ({ page }) => {
    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    const card = page.locator("#ncert-quiz-card");
    await expect(card).toBeVisible();
    await expect(page.getByTestId("quiz-position")).toHaveText("Question 1 of 9");

    // A wrong answer shows the hint and keeps Next disabled.
    await card.locator('[data-option-correct="false"]').first().click();
    await expect(page.getByText("Not quite. Try again.")).toBeVisible();
    await expect(page.getByTestId("quiz-next")).toBeDisabled();

    // The right answer shows the explanation and unlocks Next.
    await card.locator('[data-option-correct="true"]').click();
    await expect(page.getByText("Correct!")).toBeVisible();
    await expect(page.getByTestId("quiz-next")).toBeEnabled();
  });

  test("TC-04: Class tabs and chapter links (Class 8 lesson opens and updates the URL)", async ({ page }) => {
    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    await expect(page.locator("[data-group]")).toHaveCount(3);
    await expect(page.locator("[data-topic]")).toHaveCount(16); // Class 6 lessons
    await page.locator('[data-group="Class 8"]').click();
    await expect(page.locator("[data-topic]")).toHaveCount(13);

    await page.locator('[data-topic="c8-05"]').click();
    await expect(page).toHaveURL(/topic=c8-05/);
    await expect(page.locator("#ncert-quiz-card h2")).toContainText("गीता सुगीता कर्तव्या");
  });

  test("TC-05: State Persistence (localStorage streak count persistence on page reload)", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const d = new Date();
      const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      localStorage.setItem("streak_count", "24");
      localStorage.setItem("last_practice_date", today);
    });

    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    const streakCounter = page.locator("#tour-step-5").first();
    await expect(streakCounter.getByTestId("streak-value")).toHaveText("24");
  });

  test("TC-06: Multilingual Routing (switch languages and verify dictionary translations)", async ({ page }) => {
    await page.goto("/en");
    await page.locator('button:has-text("Skip Tour")').click();

    // Switch to Hindi (हिन्दी) — use nth(1) for the desktop header's language selector
    await page.locator("#tour-step-6").nth(1).click();
    await page.locator("text=हिन्दी (Hindi)").click();
    await expect(page).toHaveURL(/\/hi$/);
    await expect(page.locator("h1")).toContainText("ऋषि की भाषा को परिशुद्धता के साथ");

    // Switch to Japanese (日本語) — wait for page to settle after navigation
    await page.waitForLoadState("networkidle");
    await page.locator("#tour-step-6").nth(1).click();
    await page.locator("text=日本語 (Japanese)").click();
    await expect(page).toHaveURL(/\/ja$/);
    await expect(page.locator("h1")).toContainText("聖者（リシ）の言語を");

    // Switch to Spanish (Español)
    await page.waitForLoadState("networkidle");
    await page.locator("#tour-step-6").nth(1).click();
    await page.locator("text=Español (Spanish)").click();
    await expect(page).toHaveURL(/\/es$/);
    await expect(page.locator("h1")).toContainText("Domine el Idioma de los");
  });

  test("TC-07: No chapter locks; exam results persist under sb_ncert_v1", async ({ page }) => {
    // A new visitor can open any lesson directly.
    await page.goto("/en/modules/school-prep?topic=c8-12");
    await page.locator('button:has-text("Skip Tour")').click();
    await expect(page.locator("text=Chapter Locked")).toHaveCount(0);
    await expect(page.locator("#ncert-quiz-card h2")).toContainText("सम्यग्वर्णप्रयोगेण");

    // Take the exam with every answer right.
    await page.locator('[data-mode="exam"]').click();
    const total = 8; // lesson 12 has 8 questions
    for (let i = 0; i < total; i++) {
      await page.locator('#ncert-quiz-card [data-option-correct="true"]').click();
      await page.getByTestId("quiz-next").click();
    }
    await expect(page.getByTestId("quiz-score")).toHaveText("100%");

    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("sb_ncert_v1") || "{}"));
    expect(saved.topics["c8-12"].examPassed).toBe(true);
    expect(Object.keys(saved.cards)).toHaveLength(8);

    await page.reload();
    await expect(page.locator('[data-topic="c8-12"] [aria-label="Passed"]')).toBeVisible();
  });

  test("TC-08: AdSense Non-Blocking Render (Verify ad wrappers are removed)", async ({ page }) => {
    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    // Check that the AdSense container is no longer rendered
    const adsenseWrapper = page.locator(".adsense-wrapper").first();
    await expect(adsenseWrapper).not.toBeVisible();
  });

  test("TC-09: Telemetry Submission (mock POST API response and verify correct payloads)", async ({ page }) => {
    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    // Intercept POST request to /api/report-error
    let isTelemetrySent = false;
    await page.route("**/api/report-error", async (route) => {
      const request = route.request();
      const payload = JSON.parse(request.postData() || "{}");
      
      // Validate telemetry payload contents
      expect(payload.chapterId).toBe("c6-01-1");
      expect(payload.errorCategory).toBe("Typo in Transliteration");
      expect(payload.userDetails).toBe("Expected typo in devanagari spelling");
      expect(payload.lang).toBe("en");
      expect(payload.transliterationSettings).toBe("iast");
      expect(payload.userAgent).toBeDefined();

      isTelemetrySent = true;

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true })
      });
    });

    // Click "Report Error"
    const reportBtn = page.locator('button:has-text("Report Error")').first();
    await expect(reportBtn).toBeVisible();
    await reportBtn.click();

    // Fill in report modal
    const modal = page.locator(".fixed.inset-0.bg-black\\/50");
    await expect(modal).toBeVisible();

    await modal.locator("select").selectOption("Typo in Transliteration");
    await modal.locator("textarea").fill("Expected typo in devanagari spelling");

    // Submit report
    const submitBtn = modal.locator('button[type="submit"]');
    await submitBtn.click();

    // Verify success banner/text renders
    const successMsg = modal.locator("text=Anomaly report submitted");
    await expect(successMsg).toBeVisible();

    // Verify telemetry API intercept was triggered
    expect(isTelemetrySent).toBe(true);
  });
});
