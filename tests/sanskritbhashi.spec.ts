import { test, expect } from "@playwright/test";

test.describe("Sanskritbhashi End-to-End Functional Tests", () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure a clean tour state for each test
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("TC-01: Redirection and Home Page Load", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await expect(page).toHaveTitle(/Sanskritbhashi | Learn and Practice Sanskrit/);
    
    // Check main localized heading
    const heading = page.locator("h1");
    await expect(heading).toContainText("Master the Language of the");
    
    // Check academic consensus block is present
    await expect(page.locator("text=Academic Consensus & Authority")).toBeVisible();
  });

  test("TC-02: Onboarding Tour and Skip Functionality", async ({ page }) => {
    await page.goto("/");
    
    // Check if onboarding modal is visible
    const tourModal = page.locator("text=Welcome to Sanskritbhashi! 🕉️");
    await expect(tourModal).toBeVisible();

    // Click "Skip Tour" to close
    const skipBtn = page.locator('button:has-text("Skip Tour")');
    await expect(skipBtn).toBeVisible();
    await skipBtn.click();

    // Verify modal is gone
    await expect(tourModal).not.toBeVisible();

    // Verify localStorage persistence
    const isCompleted = await page.evaluate(() => localStorage.getItem("tour_completed"));
    expect(isCompleted).toBe("true");
  });

  test("TC-03: Dynamic i18n Switching", async ({ page }) => {
    await page.goto("/");
    
    // Close onboarding tour
    await page.locator('button:has-text("Skip Tour")').click();

    // Click Language Selector Dropdown
    const selectorBtn = page.locator("#tour-step-6").filter({ visible: true });
    await expect(selectorBtn).toBeVisible();
    await selectorBtn.click();

    // Click Hindi (हिन्दी)
    const hindiBtn = page.locator("text=हिन्दी (Hindi)");
    await expect(hindiBtn).toBeVisible();
    await hindiBtn.click();

    // Verify URL redirects to /hi
    await expect(page).toHaveURL(/\/hi$/);

    // Verify nav links changed to Hindi
    const homeNavLink = page.locator("nav >> text=मुख्य पृष्ठ");
    await expect(homeNavLink).toBeVisible();

    // Verify headings updated to Hindi
    await expect(page.locator("h1")).toContainText("ऋषि की भाषा को परिशुद्धता के साथ");
  });

  test("TC-04: School Prep - Progressive Revelation and Practice Card", async ({ page }) => {
    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    // Check headings
    await expect(page.locator("h1")).toContainText("NCERT Class 6-12 Sanskrit Module");

    // Locate the first practice card (Dirgha Sandhi)
    const practiceCard = page.locator("#tour-step-7").first();
    await expect(practiceCard).toBeVisible();

    // Progressive Revelation Step 1: Meaning should not be present
    const wordByWordTitle = practiceCard.locator("text=Word-by-Word Vyakaran breakdown");
    await expect(wordByWordTitle).not.toBeVisible();

    // Click "Reveal Word-by-Word Meaning"
    const revealMeaningBtn = practiceCard.locator("text=Reveal Word-by-Word Meaning");
    await revealMeaningBtn.click();

    // Now meaning title should be visible
    await expect(wordByWordTitle).toBeVisible();

    // Progressive Revelation Step 2: Grammar rule should not be present
    const grammarTitle = practiceCard.locator("text=Grammatical Rule & Paninian Analysis");
    await expect(grammarTitle).not.toBeVisible();

    // Click "Reveal Underlying Grammatical Rule"
    const revealGrammarBtn = practiceCard.locator("text=Reveal Underlying Grammatical Rule");
    await revealGrammarBtn.click();

    // Now grammar rule should be visible
    await expect(grammarTitle).toBeVisible();
  });

  test("TC-05: FAQ Accordion Expansion and GEO Highlight", async ({ page }) => {
    await page.goto("/en/faqs");
    await page.locator('button:has-text("Skip Tour")').click();

    // Check first accordion (faq-gita-study)
    const accordion = page.locator("#faq-gita-study");
    await expect(accordion).toBeVisible();

    // Detailed answer is hidden by default
    const details = accordion.locator("div").first();
    await expect(details).not.toBeVisible();

    // Click summary header to open
    const summary = accordion.locator("summary");
    await summary.click();

    // Details should be visible now
    await expect(details).toBeVisible();

    // Saffron direct answer highlight check
    const highlight = details.locator(".bg-saffron-550, .bg-saffron-50");
    await expect(highlight).toBeVisible();
    await expect(highlight).toContainText("Bhagavad Gita Chapter 2, Verse 47 teaches 'Niṣkāma Karma'");
  });

  test("TC-06: PracticeCard Gamified Feedback States and Streak Increment", async ({ page }) => {
    await page.goto("/en/modules/school-prep");
    await page.locator('button:has-text("Skip Tour")').click();

    // Locate the first practice card and the streak counter
    const practiceCard = page.locator("#tour-step-7").first();
    const streakCounter = page.locator("#tour-step-5").first();

    // Verify initial streak is 0
    await expect(streakCounter.locator("span.font-bold")).toHaveText("0");

    // Click an incorrect option ("Deva + Layaḥ")
    const incorrectOption = practiceCard.locator("button").filter({ hasText: "Deva + Layaḥ" });
    await expect(incorrectOption).toBeVisible();
    await incorrectOption.click();

    // Verify Vyakaran Hint appears
    const hint = practiceCard.locator(".bg-amber-50");
    await expect(hint).toBeVisible();
    await expect(hint).toContainText("Observe the junction point");

    // Verify streak is still 0
    await expect(streakCounter.locator("span.font-bold")).toHaveText("0");

    // Click the correct option ("Deva + Ālayaḥ")
    const correctOption = practiceCard.locator("button").filter({ hasText: "Deva + Ālayaḥ" });
    await expect(correctOption).toBeVisible();
    await correctOption.click();

    // Verify Vyakaran Hint is hidden/not visible
    await expect(hint).not.toBeVisible();

    // Verify practice card shows correct state class (border-emerald-500)
    await expect(practiceCard).toHaveClass(/border-emerald-500/);

    // Verify streak counter incremented to 1
    await expect(streakCounter.locator("span.font-bold")).toHaveText("1");
  });

  test("TC-07: GEO Schema Verification (JSON-LD)", async ({ page }) => {
    // Navigate to Home Page
    await page.goto("/en");
    await page.locator('button:has-text("Skip Tour")').click();

    // Find all JSON-LD script tags
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    const schemas = await Promise.all(
      scripts.map(async (script) => {
        const text = await script.innerHTML();
        return JSON.parse(text);
      })
    );

    // Check that we have EducationalOrganization and Course schemas
    const hasOrg = schemas.some((s) => s["@type"] === "EducationalOrganization");
    const hasCourse = schemas.some((s) => s["@type"] === "Course");

    expect(hasOrg).toBe(true);
    expect(hasCourse).toBe(true);

    // Navigate to Shastra Study Page
    await page.goto("/en/modules/shastra-study");

    // Find Shastra Study JSON-LD
    const shastraScripts = await page.locator('script[type="application/ld+json"]').all();
    expect(shastraScripts.length).toBeGreaterThanOrEqual(1);

    const shastraSchemas = await Promise.all(
      shastraScripts.map(async (script) => {
        const text = await script.innerHTML();
        return JSON.parse(text);
      })
    );

    const hasCreativeWork = shastraSchemas.some((s) => s["@type"] === "CreativeWork");
    expect(hasCreativeWork).toBe(true);

    const gitaSchema = shastraSchemas.find((s) => s["@type"] === "CreativeWork");
    expect(gitaSchema.name).toContain("Bhagavad Gita");
    expect(gitaSchema.author[0].name).toContain("Krishna");
    expect(gitaSchema.author[1].name).toContain("Vyasa");
  });
});
