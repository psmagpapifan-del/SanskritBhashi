import { test, expect } from "@playwright/test";

/** Gita for Students: hub, levels, shloka cards, memorise mode, quiz, Hindi content, ja/es fallback. */
test.describe("Gita for Students", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
    await page.evaluate(() => {
      localStorage.setItem("tour_completed", "true");
      localStorage.setItem("cookie-consent", "declined");
    });
  });

  test("GITA-01: hub lists all 18 adhyayas, all linked, and the levels", async ({ page }) => {
    await page.goto("/en/modules/gita");
    await expect(page.locator("h1")).toHaveText("Gita for Students");
    await expect(page.locator("[data-adhyaya-link]")).toHaveCount(18);
    await expect(page.locator("#gita-adhyayas + ol > li")).toHaveCount(18);
    await expect(page.locator("[data-level-link]")).toHaveCount(3);
    await page.locator('[data-adhyaya-link="2"]').click();
    await expect(page).toHaveURL(/\/en\/modules\/gita\/adhyaya-2$/);
  });

  test("GITA-02: level tabs switch shlokas, update the URL and are remembered", async ({ page }) => {
    await page.goto("/en/modules/gita/adhyaya-2");
    const refs = () => page.locator("[data-shloka]").evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.shloka));
    await expect(page.locator('[data-level="1"]')).toHaveAttribute("aria-pressed", "true");
    expect(await refs()).toEqual(["2.3", "2.14", "2.47"]);
    await page.locator('[data-level="3"]').click();
    await expect(page).toHaveURL(/level=3/);
    expect(await refs()).toEqual(["2.13", "2.22", "2.50", "2.63"]);
    // Remembered on another chapter.
    await page.goto("/en/modules/gita/adhyaya-3");
    await expect(page.locator('[data-level="3"]')).toHaveAttribute("aria-pressed", "true");
    expect(await refs()).toEqual(["3.27", "3.30", "3.35"]);
  });

  test("GITA-03: shloka card shows words, meaning, situation and memorise mode", async ({ page }) => {
    await page.goto("/en/modules/gita/adhyaya-2?level=1");
    const card = page.locator('[data-shloka="2.47"]');
    await expect(card.getByTestId("shloka-text")).toContainText("कर्मण्येवाधिकारस्ते");
    await card.locator("summary").click();
    await expect(card.locator("dl")).toContainText("in action alone");
    await expect(card.getByTestId("situation")).toContainText("music exam");
    await card.getByTestId("memorise").click();
    await expect(card.locator('[data-hidden="true"]')).toHaveCount(2);
    await card.getByTestId("reveal-next").click();
    await expect(card.locator('[data-hidden="true"]')).toHaveCount(1);
  });

  test("GITA-04: quiz runs on the level's shlokas and saves under sb_gita_v1", async ({ page }) => {
    await page.goto("/en/modules/gita/adhyaya-1?level=1");
    const quiz = page.locator("#gita-quiz-card");
    await expect(page.locator("[data-topic]")).toHaveCount(1);
    for (let i = 0; i < 2; i++) {
      await quiz.locator('[data-option-correct="true"]').click();
      await page.getByTestId("quiz-next").click();
    }
    await expect(page.getByTestId("quiz-score")).toBeVisible();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("sb_gita_v1") || "{}"));
    expect(Object.keys(saved.topics)).toContain("g1-47-l1");
  });

  test("GITA-05: Hindi page shows Hindi content and keeps Hindi prompts in Devanagari", async ({ page }) => {
    await page.evaluate(() => localStorage.setItem("transliteration_target", "iast"));
    await page.goto("/hi/modules/gita/adhyaya-3?level=2");
    await expect(page.locator("h1")).toContainText("कर्मयोग");
    await expect(page.locator('[data-shloka="3.19"]')).toContainText("आसक्ति");
    await expect(page.getByTestId("quiz-prompt")).toHaveText(/^श्लोक 3\.\d+ /);
    // The verse still gets an IAST line.
    await expect(page.getByTestId("quiz-verse-translit")).toContainText(/[āīūṛṃḥ]/);
  });

  // Adhyaya 18 is translated last; update this when the final ja/es batch lands.
  test("GITA-06: every chapter is translated, so ja/es adhyaya 18 is indexable with all four alternates", async ({ page }) => {
    await page.goto("/es/modules/gita/adhyaya-18");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://sanskritbhashi.com/es/modules/gita/adhyaya-18");
    await expect(page.locator("h1")).toContainText("La liberación por la renuncia");
    await expect(page.getByText("aún no está disponible en español")).toHaveCount(0);
    await page.goto("/ja/modules/gita/adhyaya-18");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator("h1")).toContainText("放棄による解脱");
    await page.goto("/en/modules/gita/adhyaya-18");
    const langs = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) => els.map((e) => e.getAttribute("hreflang")));
    expect(langs.sort()).toEqual(["en", "es", "hi", "ja", "x-default"]);
  });

  test("GITA-06b: translated Japanese chapter is indexable, in Japanese, with all four alternates", async ({ page }) => {
    await page.goto("/ja/modules/gita/adhyaya-2");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://sanskritbhashi.com/ja/modules/gita/adhyaya-2");
    await expect(page).toHaveTitle(/^バガヴァッド・ギーター第2章/);
    await expect(page.locator('[data-shloka="2.47"]')).toContainText("あなたの権利は行為そのものにのみあり");
    await expect(page.getByTestId("quiz-prompt")).toHaveText(/[\u3040-\u30ff]/);
    const langs = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) => els.map((e) => e.getAttribute("hreflang")));
    expect(langs.sort()).toEqual(["en", "es", "hi", "ja", "x-default"]);
  });

  test("GITA-06c: translated Spanish chapter and hub; no chapter is marked English-only", async ({ page }) => {
    await page.goto("/es/modules/gita/adhyaya-3?level=2");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator("h1")).toContainText("El yoga de la acción");
    await expect(page.getByTestId("situation").first()).toContainText(/[áéíóúñ]/);
    await page.goto("/es/modules/gita");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('[data-adhyaya-link="1"]')).not.toContainText("Por ahora en inglés");
    await expect(page.locator('[data-adhyaya-link="18"]')).not.toContainText("Por ahora en inglés");
    await expect(page.getByText("Por ahora en inglés")).toHaveCount(0);
  });
});

test.describe("Gita for Students: Adhyayas 4–18", () => {
  for (const [n, l1] of [[4, ["4.7", "4.8"]], [5, ["5.10", "5.29"]], [6, ["6.5", "6.17"]], [7, ["7.7", "7.8"]], [8, ["8.7"]], [9, ["9.26", "9.27"]], [10, ["10.25", "10.31"]], [11, ["11.8", "11.12"]], [12, ["12.13", "12.15"]], [13, ["13.7", "13.33"]], [14, ["14.9", "14.17"]], [15, ["15.14", "15.13"]], [16, ["16.2", "16.3"]], [17, ["17.15", "17.8"]], [18, ["18.37", "18.78"]]] as const) {
    test(`GITA-A${n}: Adhyaya ${n} loads with its Classes 6–8 shlokas and a working quiz`, async ({ page }) => {
      await page.goto("/en");
      await page.evaluate(() => { localStorage.setItem("tour_completed", "true"); localStorage.setItem("cookie-consent", "declined"); localStorage.removeItem("sb_gita_level"); });
      await page.goto(`/en/modules/gita/adhyaya-${n}`);
      const refs = await page.locator("[data-shloka]").evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.shloka));
      expect(refs).toEqual([...l1]);
      // The quiz is an island: retry the click until it has hydrated and responds.
      await expect(async () => {
        await page.locator('#gita-quiz-card [data-option-correct="true"]').click();
        await expect(page.getByTestId("quiz-next")).toBeEnabled({ timeout: 1000 });
      }).toPass({ timeout: 10000 });
    });
  }

  test("GITA-17: Adhyaya 18 links back to 17 and has no next link", async ({ page }) => {
    await page.goto("/hi/modules/gita/adhyaya-18");
    await expect(page.getByRole("link", { name: /पिछला अध्याय/ })).toHaveAttribute("href", "/hi/modules/gita/adhyaya-17");
    await expect(page.getByRole("link", { name: /अगला अध्याय/ })).toHaveCount(0);
  });
});

test("GITA-18: Adhyaya 11 shows the speaker of each shloka (Sanjaya for 11.12)", async ({ page }) => {
  await page.goto("/en/modules/gita/adhyaya-11?level=1");
  await expect(page.locator('[data-shloka="11.12"] header')).toContainText("सञ्जय उवाच");
  await expect(page.locator('[data-shloka="11.8"] header')).toContainText("श्रीभगवानुवाच");
});

test("GITA-19: Adhyaya 13 cards show the other editions' verse number", async ({ page }) => {
  await page.goto("/en/modules/gita/adhyaya-13?level=2");
  await expect(page.locator('[data-shloka="13.1"] header')).toContainText("13.2 in some editions");
  await page.goto("/hi/modules/gita/adhyaya-13?level=2");
  await expect(page.locator('[data-shloka="13.1"] header')).toContainText("कुछ संस्करणों में 13.2");
});

test("GITA-20: the hub has no 'coming soon' adhyayas left; 18.78 is spoken by Sanjaya", async ({ page }) => {
  await page.goto("/en/modules/gita");
  await expect(page.getByText("Coming soon")).toHaveCount(0);
  await page.goto("/en/modules/gita/adhyaya-18?level=1");
  await expect(page.locator('[data-shloka="18.78"] header')).toContainText("सञ्जय उवाच");
});

test.describe("Gita for students' problems", () => {
  test("GITA-21: a problem page answers the search, shows the help box and links to the lessons", async ({ page }) => {
    await page.goto("/en/modules/gita/help/exam-stress");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator("h1")).toContainText("exam stress");
    await expect(page.getByText("14416", { exact: false }).first()).toBeVisible();
    const types = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(types.join(" ")).toContain('"FAQPage"');
    const langs = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) => els.map((e) => e.getAttribute("hreflang")));
    expect(langs.sort()).toEqual(["en", "hi", "x-default"]);
    // The first shloka links to its lesson, at the right level and card.
    const link = page.getByRole("link", { name: /Full lesson and quiz: Chapter 2/ }).first();
    await expect(link).toHaveAttribute("href", "/en/modules/gita/adhyaya-2?level=1#shloka-2-47");
    await link.click();
    await expect(page.locator("#shloka-2-47")).toBeVisible();
  });

  test("GITA-22: Hindi page is in Hindi; study topics have no help box; ja falls back to English, noindex", async ({ page }) => {
    await page.goto("/hi/modules/gita/help/anger");
    await expect(page.locator("h1")).toContainText("क्रोध");
    await page.goto("/en/modules/gita/help/choosing-a-stream");
    await expect(page.getByText("14416", { exact: false })).toHaveCount(0);
    await page.goto("/ja/modules/gita/help/anger");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://sanskritbhashi.com/en/modules/gita/help/anger");
  });

  test("GITA-23: the Gita hub and the problems hub link to every problem page", async ({ page }) => {
    await page.goto("/en/modules/gita");
    await expect(page.locator('a[href^="/en/modules/gita/help/"]')).toHaveCount(9);
    await page.goto("/hi/modules/gita/help");
    await expect(page.locator('a[href^="/hi/modules/gita/help/"]')).toHaveCount(9);
  });
});

test.describe("Gita shloka pages", () => {
  test("GITA-24: a shloka page has the verse, IAST, meaning, words, story and a quiz with hidden answers", async ({ page }) => {
    await page.goto("/en/modules/gita/shloka/2-47");
    await expect(page).toHaveTitle(/Bhagavad Gita 2\.47 Meaning/);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator("h1")).toContainText("2.47");
    await expect(page.locator('main header p[lang="sa"].whitespace-pre-line')).toContainText("कर्मण्येवाधिकारस्ते");
    await expect(page.locator('[lang="sa-Latn"]')).toContainText("karma");
    await expect(page.locator("dl dt").first()).toBeVisible();
    const answer = page.locator("details").first();
    await expect(answer.locator("p").first()).toBeHidden();
    await answer.locator("summary").click();
    await expect(answer.locator("p").first()).toBeVisible();
    // Neighbours, lesson link and the problem pages that use this shloka.
    await expect(page.getByRole("link", { name: /Next shloka \(2\.48\)/ })).toHaveAttribute("href", "/en/modules/gita/shloka/2-48");
    await expect(page.getByRole("link", { name: /Chapter 2 lesson/ })).toHaveAttribute("href", "/en/modules/gita/adhyaya-2?level=1#shloka-2-47");
    await expect(page.locator('a[href="/en/modules/gita/help/exam-stress"]')).toBeVisible();
    const langs = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) => els.map((e) => e.getAttribute("hreflang")));
    expect(langs.sort()).toEqual(["en", "es", "hi", "ja", "x-default"]);
  });

  test("GITA-25: chapter cards link to their shloka page; ja/es shloka pages are translated and indexable", async ({ page }) => {
    await page.goto("/hi/modules/gita/adhyaya-2?level=1");
    await expect(page.locator('#shloka-2-47 h3 a')).toHaveAttribute("href", "/hi/modules/gita/shloka/2-47");
    await page.goto("/ja/modules/gita/shloka/12-13");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator("main")).toContainText(/[\u3040-\u30ff]/);
    await page.goto("/es/modules/gita/shloka/18-66");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://sanskritbhashi.com/es/modules/gita/shloka/18-66");
    await expect(page.getByRole("link", { name: /Shloka anterior/ })).toBeVisible();
  });
});
