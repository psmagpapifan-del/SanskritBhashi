import { test, expect, type Page } from "@playwright/test";

/**
 * Shastra Study quiz: practice mode, exam mode, review round and saved progress.
 * Options are shuffled, so tests pick answers via data-option-correct.
 */

const right = (page: Page) => page.locator('#shastra-quiz-card [data-option-correct="true"]');
const wrong = (page: Page) => page.locator('#shastra-quiz-card [data-option-correct="false"]');
const next = (page: Page) => page.getByTestId("quiz-next");

async function openTopic(page: Page, topic = "yoga-sutra") {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("tour_completed", "true");
    localStorage.setItem("cookie-consent", "declined");
  });
  await page.goto(`/en/modules/shastra-study?topic=${topic}`);
  await expect(page.locator("#shastra-quiz-card h2")).toContainText("Yoga Sūtras");
}

test.describe("Shastra Study quiz", () => {
  test("SQ-01: every topic is open to a new visitor (no gateway lock)", async ({ page }) => {
    await openTopic(page);
    await expect(page.locator("[data-topic]")).toHaveCount(9);
    await expect(page.getByText("Chapter Locked")).toHaveCount(0);
    await expect(right(page)).toHaveCount(1);
  });

  test("SQ-02: practice — a miss shows a hint, blocks Next, and returns in the review round", async ({ page }) => {
    await openTopic(page);
    await expect(page.getByTestId("quiz-position")).toHaveText("Question 1 of 8");

    // Miss question 1 first, then answer it correctly.
    await wrong(page).first().click();
    await expect(page.getByText("Not quite. Try again.")).toBeVisible();
    await expect(next(page)).toBeDisabled();
    await right(page).click();
    await expect(page.getByText("Correct!")).toBeVisible();
    await next(page).click();

    // Answer the remaining 7 correctly.
    for (let i = 2; i <= 8; i++) {
      await expect(page.getByTestId("quiz-position")).toHaveText(`Question ${i} of 8`);
      await right(page).click();
      await next(page).click();
    }

    // The missed question comes back once.
    await expect(page.getByTestId("quiz-position")).toContainText("Review round");
    await right(page).click();
    await next(page).click();

    // First-attempt score: 7 / 8 = 88%.
    await expect(page.getByTestId("quiz-results")).toBeVisible();
    await expect(page.getByTestId("quiz-score")).toHaveText("88%");
  });

  test("SQ-03: exam — no feedback during the test, pass at 80%+", async ({ page }) => {
    await openTopic(page);
    await page.locator('[data-mode="exam"]').click();
    await expect(page.locator('[data-mode="exam"]')).toHaveAttribute("aria-pressed", "true");

    for (let i = 1; i <= 8; i++) {
      await expect(page.getByTestId("quiz-position")).toHaveText(`Question ${i} of 8`);
      await expect(next(page)).toBeDisabled();
      // Get exactly one wrong: 7 / 8 = 88%, a pass.
      await (i === 3 ? wrong(page).first() : right(page)).click();
      await expect(page.getByText("Correct!")).toHaveCount(0);
      await expect(page.getByText("Not quite. Try again.")).toHaveCount(0);
      await next(page).click();
    }

    await expect(page.getByTestId("quiz-score")).toHaveText("88%");
    await expect(page.getByTestId("quiz-results")).toContainText("Passed");
    await expect(page.getByTestId("quiz-results")).toContainText("Your answer");
    // Exam pass is saved and shown as a trophy on the topic.
    await expect(page.locator('[data-topic="yoga-sutra"] [aria-label="Passed"]')).toBeVisible();
  });

  test("SQ-04: exam — 75% is not a pass", async ({ page }) => {
    await openTopic(page);
    await page.locator('[data-mode="exam"]').click();
    for (let i = 1; i <= 8; i++) {
      await (i <= 2 ? wrong(page).first() : right(page)).click();
      await next(page).click();
    }
    await expect(page.getByTestId("quiz-score")).toHaveText("75%");
    await expect(page.getByTestId("quiz-results")).toContainText("Not passed yet");
  });

  test("SQ-05: progress persists and missed questions are scheduled for review", async ({ page }) => {
    await openTopic(page);
    await page.locator('[data-mode="exam"]').click();
    for (let i = 1; i <= 8; i++) {
      await (i === 1 ? wrong(page).first() : right(page)).click();
      await next(page).click();
    }
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("sb_shastra_v1") || "{}"));
    expect(Object.keys(saved.cards)).toHaveLength(8);
    expect(saved.topics["yoga-sutra"].bestExam).toBe(88);
    const boxes = Object.values(saved.cards as Record<string, { box: number }>).map((c) => c.box);
    expect(boxes.every((b) => b === 1)).toBe(true);

    // Reload: the topic remembers its result.
    await page.reload();
    await expect(page.locator('[data-topic="yoga-sutra"] [aria-label="Passed"]')).toBeVisible();
  });
});
