# Sanskritbhashi App Release Notes

This file tracks all bug fixes, improvements, and features implemented across app versions to prepare for Play Store releases.

---

## [Unreleased] - 2026-11-18

### Speed: one page per NCERT class, lighter fonts (2026-11-20)
- **Performance / Feature:** `src/pages/[lang]/modules/school-prep/[cls].astro`, `src/components/ncert/Class*Quiz.tsx` — each class now has its own page (`/en/modules/school-prep/class-9` etc.) that loads only its own questions (43–94 KB instead of 427 KB for all 867 questions). Each class page has its own title, description, Course and BreadcrumbList schema, and is listed in the sitemap in all 4 languages.
- **UI:** `src/pages/[lang]/modules/school-prep.astro` — School Prep is now a class picker with the full lesson list. Old links such as `/modules/school-prep?topic=c8-05` redirect to the class page; app deep links (`src/lib/deepLinkRouter.ts`) and the tour go straight to the class page.
- **Performance:** `src/layouts/Layout.astro`, `src/styles/globals.css` — fonts load with `<link>` + preconnect instead of a render-blocking CSS `@import`. Dropped three web fonts that were downloaded but never shown (Noto Sans JP, Rozha One, Noto Serif Devanagari); Japanese uses the system font. Geist is now one variable font, so bold 800/900 headings render properly instead of being faked.
- **Result (Lighthouse mobile, with Cloudflare-style compression):** Home 99, School Prep hub 91, Class 11 page 99, articles 96 (School Prep was 65).
- **Tests:** new `tests/unit/deepLinkRouter.test.ts`; e2e, accessibility, visual, content and performance tests updated for the class pages.

### Accessibility: WCAG 2.1 AA colour contrast, keyboard quiz, reduced motion (2026-11-20)
- **UI [Accessibility]:** `src/styles/globals.css` and pages — orange text darkened to `#B84300` (light) / `#FF8533` (dark), so it passes 4.5:1 contrast. Bright orange buttons and banners keep `#FF6F00` with near-black text (6.3:1) instead of white (2.8:1). Added the missing `saffron-300/400/700` colour tokens, so hover and dark-mode colours that silently did nothing now work.
- **UI [Accessibility]:** Dark-mode grey labels (`zinc-500` → `zinc-400`), the Report Error button and the footer copyright now pass contrast.
- **Bug Fix [Accessibility]:** `src/components/TopicQuiz.tsx` — answering no longer drops keyboard focus: a right answer moves focus to Next, a new question moves focus to its prompt, and struck wrong options stay focusable and are announced as "Incorrect" to screen readers.
- **UI [Accessibility]:** Confetti and CSS animations respect the phone's "reduce motion" setting.
- **Tests:** `tests/accessibility.spec.ts` now enforces colour contrast and checks 8 pages in all 4 languages, dark mode, quiz answer states and a keyboard-only quiz run (42 → 53 tests, all passing). Visual baselines updated for the new colours.

### NCERT School Prep: Class 12 भास्वती and शाश्वती quizzes — Classes 6–12 complete (2026-11-19)
- **NCERT Content [Feature]:** `src/lib/ncert/class12.ts`, `src/lib/ncertContent.ts` — all 21 lessons of the two Class 12 readers (169 questions): भास्वती द्वितीयो भागः (core; Taittirīya अनुशासनम्, Bhāsa's प्रतिमा, Raghuvaṃśa canto 1, शिवराजविजयः, सूक्ति-सौरभम्, भोजप्रबन्धः, हल्दीघाटी, मदालसा, Gītā 16, काव्यमीमांसा) and शाश्वती द्वितीयो भागः (elective; Īśāvāsya Upaniṣad, Raghu and Kautsa, उत्तररामचरितम्, Gītā 2–3, शुकनासोपदेशः, सूक्तिसुधा, सिंहासनद्वात्रिंशिका, शिवराजविजयः, दीनबन्धुः श्रीनायारः, Yoga Sūtras, Mahābhāṣya). School Prep now has a Class 12 tab; ids are `c12-bhaswati-NN` and `c12-shashvati-NN`.
- **Coverage:** every main NCERT Sanskrit reader from Class 6 to 12 now has chapter quizzes — 105 lessons, 867 questions.
- **School Prep Page [UI]:** `src/pages/[lang]/modules/school-prep.astro` — text and structured data updated for Classes 6–12; the "coming next" notes are removed.

### NCERT School Prep: Class 11 भास्वती and शाश्वती quizzes (2026-11-19)
- **NCERT Content [Feature]:** `src/lib/ncert/class11.ts`, `src/lib/ncertContent.ts` — all 22 lessons of the two Class 11 readers (181 questions): भास्वती प्रथमो भागः (core; Rāmāyaṇa on governance, Cāṇakya, Caraka's ऋतुचर्या, Śākuntalam, Kādambarī, सत्याग्रहगीता, Subbaṇṇa, भारतविजयनाटकम्, Keśavacandra Dāśa, Gītā 12, Pāṇinīya Śikṣā) and शाश्वती प्रथमो भागः (elective; Vedic mantras, Jātakamālā, Vidurā, मृच्छकटिकम्, Caraka on diet, Aurobindo's भवानी भारती, विज्ञाननौका, कन्थामाणिक्यम्, Tagore's Gītāñjali, Gītā 17, तर्कसंग्रहः). School Prep now has a Class 11 tab; ids are `c11-bhaswati-NN` and `c11-shashvati-NN`.
- **Source Text [Bug Fix]:** `scripts/krutidev_to_unicode.py`, `content/ncert_text/` — fixed more legacy-font glyphs (क्र, ह्व, ह्र, द्भ and reph over क), so the Class 10–12 text now reads e.g. उत्क्रान्त, जिह्वा, ह्रस्व, अद्भुत, तर्क. Covered by `tests/unit/krutidev.test.ts`.
- **School Prep Page [UI]:** `src/pages/[lang]/modules/school-prep.astro` — text and structured data updated for Class 11.

### NCERT School Prep: Class 10 शेमुषी quizzes (2026-11-19)
- **NCERT Content [Feature]:** `src/lib/ncert/class10.ts`, `src/lib/ncertContent.ts` — all 10 lessons of शेमुषी द्वितीयो भागः for Class 10 (87 questions): शुचिपर्यावरणम्, बुद्धिर्बलवती सदा, शिशुलालनम्, जननी तुल्यवत्सला, सुभाषितानि, सौहार्दं प्रकृतेः शोभा, विचित्रः साक्षी, सूक्तयः (Tirukkuṟaḷ), भूकम्पविभीषिका and अन्योक्तयः. School Prep now has a Class 10 tab; ids are `c10-shemushi-NN`.
- **Source Text [Bug Fix]:** `scripts/krutidev_to_unicode.py`, `content/ncert_text/` — fixed four more legacy-font glyphs (क्कु, क्, रु and the colon), so the Class 10–12 text now reads e.g. ठक्कुर, पृथक्, तिरुक्कुरल्, जगाद:.
- **School Prep Page [UI]:** `src/pages/[lang]/modules/school-prep.astro` — text and structured data updated for Class 10.

### NCERT School Prep: Class 9 शारदा quizzes and Classes 9–12 source text (2026-11-19)
- **NCERT Content [Feature]:** `src/lib/ncert/class9.ts`, `src/lib/ncertContent.ts` — all 11 lessons of the NCERT शारदा textbook for Class 9 (92 questions, 8–9 per lesson): the Sanskrit song, Kauṭilya on wealth and financial literacy, Nāmadeva, Khudirām Bose, artificial intelligence, subhāṣitas, Dharmabuddhi and Pāpabuddhi, Bhṛgu–Varuṇa (five kośas), एकचक्रम्, Ṛṣabhadeva, and वर्णोच्चारण-शिक्षा. School Prep now has a Class 9 tab.
- **Source Text [Feature]:** `scripts/krutidev_to_unicode.py` (new), `scripts/extract_ncert_text.py`, `content/ncert_text/` — the Class 10–12 readers (शेमुषी, भास्वती, शाश्वती) use the legacy Kruti Dev font; a converter (unit-tested in `tests/unit/krutidev.test.ts`) turns them into Unicode. All Class 9–12 books are extracted, and Classes 6–8 are re-extracted with `pdftotext -raw`, which keeps conjuncts in order.
- **School Prep Page [UI]:** `src/pages/[lang]/modules/school-prep.astro` — text and structured data updated for Class 9; the chapter list shows each class's book name. `src/lib/ncert/build.ts` supports several books per class (ids like `c10-shemushi-01`).

### NCERT School Prep rebuilt: Class 6–8 दीपकम् quizzes (2026-11-19)
- **NCERT Content [Feature]:** `src/lib/ncertContent.ts`, `src/lib/ncert/class6.ts`, `class7.ts`, `class8.ts`, `src/lib/ncert/build.ts` — every lesson of the 2025 NCERT दीपकम् textbooks for Classes 6–8: 41 lessons, 338 questions (7–9 per lesson) written from the chapter text, covering meaning, grammar, sandhi, numbers, vocabulary and comprehension, each with a hint and an explanation. Structural checks in `tests/unit/ncertContent.test.ts`.
- **Source Text [Feature]:** `scripts/extract_ncert_text.py`, `content/ncert_text/` — chapter text extracted from the NCERT PDFs (the PDFs stay on the `feat/adsense-learning-hub` branch to keep `main` small).
- **Shared Quiz UI [Feature]:** `src/components/TopicQuiz.tsx` (from `ShastraQuiz.tsx`), `src/lib/quizContent.ts` — one quiz component for Shastra Study and NCERT, with class tabs, Devanagari titles with a transliteration line, and the "Report Error" button on every question. `src/components/NcertQuiz.tsx` saves progress under `sb_ncert_v1`.
- **School Prep Page [Bug Fix / UI]:** `src/pages/[lang]/modules/school-prep.astro` — replaced the 60 template-generated Core Journey levels, the gateway locks and the old NCERT list with the open chapter-wise quiz (practice and exam modes, review round, spaced repetition) and a crawlable chapter list. Page size dropped from about 2 MB to about 100 KB.
- **Cleanup [Performance]:** removed `PracticeCard.tsx`, `JourneyMap.tsx`, `levelsEngine.ts`, `curriculumData.ts`, `vocabTranslations.ts` and `scripts/ingestCurriculum.ts`, which are no longer used. Deep links accept `?topic=` (`src/lib/deepLinkRouter.ts`); the onboarding tour's step 7 points at the new quiz.

### Quiz options follow the Transliteration Script setting (2026-11-19)
- **Transliteration [Bug Fix]:** `src/lib/transliterate.ts` (new), `src/lib/useScript.ts` (new) — rule-based converter from Devanagari/IAST to IAST, Devanagari, Japanese Katakana and French phonetic spelling, plus a hook that updates live when the script is changed in the language menu. Covered by 6 unit tests.
- **Shastra Study [Bug Fix]:** `src/components/ShastraQuiz.tsx`, `src/lib/shastraContent.ts` — Sanskrit in options, prompts, hints and explanations now switches script instead of staying fixed; verses keep the Devanagari and show a transliteration line underneath. Sanskrit-word options (yamas, limbs of yoga, śoka/śloka) moved to Devanagari so they convert too.
- **School Prep [Bug Fix]:** `src/components/PracticeCard.tsx` — IAST sandhi splits and vigraha analyses in options now switch script; the Japanese and French phrase lines are generated from the Devanagari instead of placeholder text.

### Shastra Study rebuilt: new quiz engine and topic-based content (2026-11-19)
- **Quiz Engine [Feature]:** `src/lib/quizEngine.ts` — framework-free engine with Practice mode (instant feedback, hints, retries; only the first attempt is scored; missed questions return in a review round) and Exam mode (one attempt, no hints, shuffled questions and options, pass at 80%). Leitner spaced repetition (boxes 1–5, 1/3/7/16/35-day intervals) puts due questions first. Covered by 10 unit tests (`npm run test:unit`).
- **Shastra Content [Feature]:** `src/lib/shastraContent.ts` — 9 topics, 72 questions across the Bhagavad Gītā (Karma Yoga, Ātman, Avatāra and Devotion), Upaniṣads (Mahāvākyas, famous verses), Yoga Sūtras, Vālmīki Rāmāyaṇa, Subhāṣitas and Vedic mantras; question types cover meaning, grammar, sandhi, fill-in-the-verse, source and concept, each with a hint and an explanation.
- **Shastra Study Page [Bug Fix / UI]:** `src/pages/[lang]/modules/shastra-study.astro`, `src/components/ShastraQuiz.tsx` — replaced the 30 "expert" chapters (which repeated the same template questions and were locked behind two gateway tests, so new visitors could not use the module) with an open, topic-based quiz showing mastery, due reviews and exam trophies. Progress is saved under `sb_shastra_v1` (native-hydrated via `capacitorBridge.ts`). Page size dropped from 1.26 MB to 72 KB.
- **Tests [Feature]:** `tests/shastra-quiz.spec.ts` — practice, review round, exam pass/fail and persistence flows; full suite 191/191.
- **OTA App Update [Feature]:** `public/updates/` — rebuilt bundle so installed apps receive the new Shastra Study.

### Learning Hub expansion & test suite fixes (2026-11-18)
- **Six New Articles [Feature]:** `src/components/articles/` and `src/pages/[lang]/learn/` — Samāsa (compounds), verb Lakāras, reading and writing Devanāgarī, Pratyaya suffixes, Chandas (metre, with a Gita 2.47 scansion) and numbers and time, each in English, Hindi, Japanese and Spanish (24 new pages; sitemap now 78 URLs).
- **Shared Article Template [Feature]:** `src/components/ArticlePage.astro`, `src/lib/learnArticles.ts`, `src/components/articles/Table.astro` — new articles only need metadata and a body; the Learning Hub index lists them automatically.
- **Accessibility [Bug Fix]:** labelled the nav/aside landmarks, fixed skipped heading levels (cookie banner, FAQs, About), raised faint grey text to 70% opacity, added `aria-current="page"` to active nav links (`Layout.astro`, `FAQAccordion.tsx`, `about.astro`, module pages and components).
- **Test Suite [Bug Fix]:** `tests/*.spec.ts` — axe-core is loaded from the local package instead of a CDN; serious/critical axe violations (except colour contrast) and heading skips now fail the test; the tour, streak, active-nav and theme tests wait for the UI instead of using fixed timeouts; Linux screenshot baselines added. The full suite passes (186 tests).
- **OTA App Update [Feature]:** `public/updates/` — rebuilt bundle v0.1.0+20261118065925 so installed apps receive the new articles.

### AdSense "Low value content" & Search Console indexing fixes
- **Canonical URL Fix [Bug Fix]:** `src/layouts/Layout.astro` — canonical URLs were built from the prerender pathname and ended in `.html` (e.g. `/en/about.html`), which Cloudflare redirects, so every page declared a redirecting URL as canonical. Canonicals now use the clean URL (`/en/about`). Sidebar active-link detection uses the same clean path.
- **hreflang Alternates [Feature]:** `src/layouts/Layout.astro` — every localized page now emits `hreflang` links for en/hi/ja/es plus `x-default`.
- **Per-page Ad Control [Feature]:** `src/layouts/Layout.astro` — new `showAds`, `noindex`, `canonicalPath` and `hreflang` props. AdSense no longer loads on 404/500, the interactive quiz modules (`school-prep`, `shastra-study`), contact, privacy and terms pages, or inside Capacitor builds.
- **Generated Sitemap [Bug Fix]:** replaced the hand-written `public/sitemap.xml` (20 URLs, no Learning Hub) with `src/pages/sitemap.xml.ts`, generated at build time from `src/pages/[lang]/` (54 URLs). `public/robots.txt` pointed at a non-existent `sitemap-index.xml`; it now points at `/sitemap.xml` and disallows `/api/`.
- **Redirects [Bug Fix]:** `public/_redirects` and root `about/contact/privacy/terms.astro` — single 301 hop to the extensionless URL (previously 302 to a trailing-slash URL that redirected again). Root stubs are `noindex`.
- **Full Article Translations [Feature]:** split the 6 Learning Hub articles into `src/components/articles/<slug>/{en,hi,ja,es}.astro`. Wrote complete Japanese and Spanish versions of all 6 (previously stubs; 4 of them served Spanish text on `/ja/` URLs) and expanded 4 thin Hindi versions.
- **Content Corrections [Bug Fix]:** fixed the accusative plural रामान् (was रामन्), the Gita 2.47 verse (भूर्मा, was भूमा), BNF attribution (Ingerman 1967, not Knuth), literal `**markdown**` asterisks, a broken Hindi Kāraka table, and lists nested inside `<p>`.
- **Article Byline & Schema [Feature]:** `src/components/ArticleByline.astro` — editorial byline, published/reviewed dates, practice-module link and `Article` JSON-LD on every article.
- **Localized Meta [UI]:** localized home titles/descriptions; added descriptions to about, FAQs, contact, privacy, terms and modules. Non-English copies of the English-only privacy/terms pages are `noindex`.
- **Misc [Bug Fix]:** `AdSenseWidget.tsx` placeholder `ca-pub-YOUR_ADSENSE_ID` replaced with the real publisher ID; `tests/content.spec.ts` sitemap/robots checks updated.
- **OTA App Update [Feature]:** `public/updates/bundle-latest.zip`, `public/updates/latest.json` — rebuilt the Capacitor web bundle (v0.1.0+20261118060415) so installed Android apps receive the Learning Hub, full translations and content fixes over the air on next launch, without a Play Store release.

## [1.0.5] - 2026-07-24 (Version Code 6)

### Sanskrit Learning Hub (AdSense Approval)
- **Multilingual Articles Hub [Feature]:** Added a comprehensive educational Sanskrit Learning Hub under the `/learn` route containing 6 long-form, academic articles (translated across English, Hindi, Japanese, and Spanish) to satisfy Google AdSense's content requirements and resolve the "Low value content" status rejection.
- **Navigation Menu Integration [UI]:** Integrated the Learn Hub link and icon (`BookOpen`) into the sidebar navigation layout in `Layout.astro` and localized it in `i18n.ts`.
- **Static Page Prerendering [Performance]:** Configured all new learning articles to prerender as static assets at build time to maintain sub-20ms edge delivery speeds on Cloudflare Pages.

## [1.0.4] - 2026-07-01 (Version Code 5)

### Error Reporting System Fix
- **CORS & Preflight Options Handler:** Added `Access-Control-Allow-Origin: *` headers and a native `OPTIONS` preflight response handler to `/api/report-error` to resolve WebView CORS blocks when native app shells report questions/translation anomalies to the live server.
- **Astro Serverless Routing:** Enabled dynamic routing for the `/api/report-error` endpoint by setting `prerender = false`, allowing Astro 6 to compile it as a serverless Cloudflare Pages Function while serving the rest of the pages (which are prerendered) as static CDN assets.

---

## [1.0.3] - 2026-07-01 (Version Code 4)

### Tour Guide Navigation Fix
- **Programmatic Redirection Fix:** Configured `OnboardingTour.tsx` to append the `.html` extension to the target redirection URL when auto-navigating from Step 6 (on home page) to Step 7 (on School Prep practice card page) on native platforms (resolving local assets loading failures during tour).

---

## [1.0.2] - 2026-07-01 (Version Code 3)

### Merged Updates (from Arjun/Parth branch)
- **UI Responsive Breakpoints:** Adjusted sidebar desktop trigger breakpoint from `md` (768px) to `lg` (1024px) in `Layout.astro` to resolve double-header tablet layout horizontal overflow.
- **TypeScript Hydration Fix:** Converted runtime ESM type imports to type-only declarations (`import type`) inside components (`PracticeCard`, `JourneyMap`) and levels engine (`levelsEngine.ts`, `curriculumData.ts`) to fix local dev crash during React hydration.
- **Dark Mode Accessibility:** Centered dark container styling (`dark:bg-zinc-800`) on onboarding tooltip buttons inside `OnboardingTour.tsx` to fix contrast readability issues.
- **AdSense Cleanup:** Removed placeholder bright-white ad blocks from dark layout screens.
- **QA Infrastructure:** Added Playwright test suites covering Accessibility, Security, E2E functional flows, UI Visuals, Content Integrity, and bundle Performance.

---

## [1.0.1] - 2026-06-30 (Version Code 2)

### Native Branding & Navigation Fixes
- **App Logo Generation:** Composited official Sanskrit logo onto saffron gradient backgrounds and generated 87 density-optimized launcher icons, adaptive vectors, and light/dark splash screens under `android/app/src/main/res/` to replace placeholder Capacitor assets.
- **Local WebView Routing Fix:** Injected global navigation interceptor in `Layout.astro` and updated `LanguageSelector.tsx` / `deepLinkRouter.ts` to automatically append `.html` to sub-page links on native platforms (resolving local assets loading failures).
- **Google AdSense Verification:** Injected account verification meta tags inside index page headers to allow automated Google crawler indexing.
