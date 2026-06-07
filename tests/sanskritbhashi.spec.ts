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
    expect(headersContent).toContain("sanskritbhashi.pages.dev");
    expect(headersContent).toContain("X-Robots-Tag: noindex");

    // 2. Perform page checks
    await page.goto("/en");
    await page.locator('button:has-text("Skip Tour")').click();
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("TC-03: Practice Panel Core Loop (shake on incorrect, success bounce on correct)", async ({ page }) => {
    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    const card = page.locator("#tour-step-7").first();
    await expect(card).toBeVisible();

    // Select an incorrect option ("Deva + Layaḥ")
    const incorrectOpt = page.locator('button:has-text("Deva + Layaḥ")').first();
    await incorrectOpt.click();
    
    // Assert shake animation class is applied
    await expect(card).toHaveClass(/animate-shake/);

    // Select the correct option ("Deva + Ālayaḥ")
    const correctOpt = page.locator('button:has-text("Deva + Ālayaḥ")').first();
    await correctOpt.click();

    // Assert success bounce animation class is applied
    await expect(card).toHaveClass(/animate-success-bounce/);
  });

  test("TC-04: Audio Playback State (pulse animation on play)", async ({ page }) => {
    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    // Locate the audio playback button
    const playBtn = page.locator('button[aria-label="Listen to pronunciation"]').first();
    await expect(playBtn).toBeVisible();

    // Click to start audio playback
    await playBtn.click();

    // Assert that the button immediately gets the animate-pulse class during playback
    await expect(playBtn).toHaveClass(/animate-pulse/);
  });

  test("TC-05: State Persistence (localStorage streak count persistence on page reload)", async ({ page }) => {
    // Pre-populate streak count in localStorage
    await page.goto("/");
    await page.evaluate(() => {
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem(
        "sanskrit_user_progress",
        JSON.stringify({
          currentTier: "beginner",
          completedChapters: [1],
          streakCount: 24,
          lastPracticeDate: today,
          gatewayScores: {}
        })
      );
      localStorage.setItem("streak_count", "24");
      localStorage.setItem("last_practice_date", today);
    });

    // Navigate to School Prep to load progress from localStorage
    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    // Verify streak displays the loaded value
    const streakCounter = page.locator("#tour-step-5").first();
    await expect(streakCounter.locator("span.font-bold")).toHaveText("24");

    // Verify progress sidebar displays correct streak
    const progressStreak = page.locator("#progress-streak");
    await expect(progressStreak).toHaveText("24 Days");
  });

  test("TC-06: Multilingual Routing (switch languages and verify dictionary translations)", async ({ page }) => {
    await page.goto("/en");
    await page.locator('button:has-text("Skip Tour")').click();

    // Switch to Hindi (हिन्दी)
    await page.locator("#tour-step-6").filter({ visible: true }).click();
    await page.locator("text=हिन्दी (Hindi)").click();
    await expect(page).toHaveURL(/\/hi$/);
    await expect(page.locator("h1")).toContainText("ऋषि की भाषा को परिशुद्धता के साथ");

    // Switch to Japanese (日本語)
    await page.locator("#tour-step-6").filter({ visible: true }).click();
    await page.locator("text=日本語 (Japanese)").click();
    await expect(page).toHaveURL(/\/ja$/);
    await expect(page.locator("h1")).toContainText("聖者（リシ）の言語を");

    // Switch to Spanish (Español)
    await page.locator("#tour-step-6").filter({ visible: true }).click();
    await page.locator("text=Español (Spanish)").click();
    await expect(page).toHaveURL(/\/es$/);
    await expect(page.locator("h1")).toContainText("Domine el Idioma de los");
  });

  test("TC-07: Diagnostic Gateway Restrictions (Verify chapter 31 is locked without gateway pass)", async ({ page }) => {
    // 1. Navigate directly to chapter 31 (Professional) with no progress
    await page.goto("/en/modules/school-prep?source=core&chapter=31");
    await page.locator('button:has-text("Skip Tour")').click();

    // Expect the card to show Locked screen
    const lockedTitle = page.locator("text=Chapter Locked");
    await expect(lockedTitle).toBeVisible();
    await expect(page.locator("text=Open Journey Map")).toBeVisible();

    // Sidebar link for chapter 31 should show lock icon and be dimmed (opacity-60)
    const ch31Link = page.locator('a[data-chapter-id="31"]').first();
    await expect(ch31Link.locator('[data-lock-icon="31"]')).toBeVisible();
    await expect(ch31Link).toHaveClass(/opacity-60/);

    // 2. Set passing gateway score in localStorage
    await page.evaluate(() => {
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem(
        "sanskrit_user_progress",
        JSON.stringify({
          currentTier: "professional",
          completedChapters: [1],
          streakCount: 5,
          lastPracticeDate: today,
          gatewayScores: { beginner: 85 }
        })
      );
      localStorage.setItem("streak_count", "5");
      localStorage.setItem("last_practice_date", today);
    });

    // Reload the page
    await page.reload();

    // Practice card should now be unlocked and display the active unit header
    await expect(lockedTitle).not.toBeVisible();
    await expect(page.locator("#active-chapter-name")).toContainText("Advanced Kāraka Relations");

    // Sidebar link lock icon should be hidden and no longer dimmed
    await expect(ch31Link.locator('[data-lock-icon="31"]')).not.toBeVisible();
    await expect(ch31Link).not.toHaveClass(/opacity-60/);
  });

  test("TC-08: AdSense Non-Blocking Render (Verify ad wrappers do not overlap target panels)", async ({ page }) => {
    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    // Check if AdSense container is rendered
    const adsenseWrapper = page.locator(".adsense-wrapper").first();
    await expect(adsenseWrapper).toBeVisible();

    // Ensure it doesn't overlap key elements like the main practice card
    const adBox = await adsenseWrapper.boundingBox();
    const cardBox = await page.locator("#tour-step-7").first().boundingBox();
    
    expect(adBox).not.toBeNull();
    expect(cardBox).not.toBeNull();
    if (adBox && cardBox) {
      const overlaps = (
        adBox.x < cardBox.x + cardBox.width &&
        adBox.x + adBox.width > cardBox.x &&
        adBox.y < cardBox.y + cardBox.height &&
        adBox.y + adBox.height > cardBox.y
      );
      expect(overlaps).toBe(false);
    }
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
      expect(payload.chapterId).toBe("1");
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
