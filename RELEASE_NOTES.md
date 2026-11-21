# Sanskritbhashi App Release Notes

This file tracks all bug fixes, improvements, and features implemented across app versions to prepare for Play Store releases.

---

## [Unreleased] - 2026-11-18

### Bug Fix: संस्कृतभाषी logo no longer clips its top marks (2026-11-21)
- **UI [logo]:** `src/layouts/Layout.astro` — the gradient logo text is painted only inside its box, and Devanagari marks above the headline (the anusvara dots, the loop of ी) rise above it, so their tops were cut off, especially with the system font shown before Tiro Sanskrit loads or on phones. The box now extends upward (padding plus an equal negative margin), so nothing else moves.

### Chore: Android versionCode 7 (2026-11-21)
- **Build:** `android/app/build.gradle` — versionCode 5 → 7 and versionName 1.0.4 → 1.0.6. Play Console's last upload was versionCode 6, so the next AAB must be 7 or higher. No native code changed; content keeps shipping over the air.

### SEO: Hinglish search support (2026-11-21)
- **SEO [Gita]:** most Indian students type Hindi in Roman letters ("karmanye vadhikaraste meaning in hindi", "exam ka darr kaise door kare"). `src/lib/transliterate.ts` adds `devanagariToPlain()` (plain roman as people type it: karmanyevadhikaraste ma phaleshu kadachana). Every shloka page now shows that line above the IAST; Hindi shloka-page titles read "Karmanyevadhikaraste Ma Meaning in Hindi | गीता 2.47" and descriptions open with the roman line.
- **SEO [problem pages]:** `src/lib/gita/problems.ts` adds a Hinglish subtitle and three Hinglish questions per problem, shown on the Hindi pages only and included in their FAQ structured data. English pages stay English.
- **Tests:** unit check for the Hinglish data; GITA-26.

### Feature: A page for every Gita shloka, in four languages (2026-11-21)
- **Feature [Gita]:** `src/lib/gita/shlokaPages.ts`, `src/pages/[lang]/modules/gita/shloka/[ref].astro` — 121 shloka pages × en/hi/ja/es (e.g. `/en/modules/gita/shloka/2-47`): Sanskrit text, IAST transliteration, meaning, word-by-word glosses, the school-life story and reflection, two quiz questions with answers behind "Show answer", previous/next shloka, a link to the lesson card and related problem pages. Titles use the opening words people search for ("Bhagavad Gita 2.47 Meaning: Karmanyevadhikaraste Ma").
- **UI:** each shloka card on a chapter page links to its own page on the website (`GitaStudy.tsx`). The shloka pages are web-only search landing pages: the app bundle leaves them out (OTA bundle stays ~6.7 MB instead of ~13.7 MB) and app cards show the reference as plain text.
- **SEO:** 484 new sitemap URLs with hreflang; llms.txt explains the URL pattern.
- **Tests:** GITA-24/25; axe scans an English and a Japanese shloka page; the chapter quiz tests now wait for the quiz to hydrate (fixes an intermittent GITA-A13 failure).

### Feature: The Gita for students' problems, English and Hindi (2026-11-21)
- **Feature [Gita]:** `src/lib/gita/problems.ts`, `src/pages/[lang]/modules/gita/help/` — a hub and 9 pages for problems students search for: exam stress, focus and procrastination, bad results and comparison, choosing a stream, anger, jealousy, overthinking, sadness after failure and low confidence. Each page has a direct answer, six relevant shlokas with their school-life stories and links to the lesson cards, three practical steps and FAQs (FAQPage structured data). Exam-stress and emotion pages show a help box with Tele-MANAS (14416, 24 hours). Japanese and Spanish fall back to English (noindex).
- **SEO:** the new pages are in the sitemap (en/hi) and llms.txt, and linked from the Gita hub.
- **Tests:** unit check for the problem data; GITA-21–23; the axe scan covers the hub and a Hindi problem page.

### Content: Remove invented claims; consistent Learn Hub header (2026-11-21)
- **Content [trust]:** `src/lib/i18n.ts`, `src/pages/[lang]/{index,about,terms,privacy}.astro`, `src/components/ArticleByline.astro` — removed AI-generated claims that were not true: "Trusted by 50,000+ students" and the five-star row, "validated by university academics", the invented Academic Council and advisory board (two fictitious scholars), the "deterministic methodology" section, Srimad Bhagavatam and audio guidance (not on the site), and made-up "Last updated" dates on About, Privacy and Terms. The home page now shows real counts computed from the content (`src/lib/siteStats.ts`: 867 NCERT questions, 121 Gita shlokas in 18 chapters, 12 guides). About explains what the site is, how content is checked and how to report mistakes, and names the founder, in all four languages. Article bylines read "By the Sanskritbhashi team".
- **UI [Learn Hub]:** `src/pages/[lang]/learn/index.astro` — same gradient header as School Prep, Shastra Study and Gita; the call-to-action keeps the brand gradient in dark mode.
- **Tests:** updated the visual baselines for Home, About, Privacy and Terms after checking the diffs.

### UI: Clear phone menu labels in every language (2026-11-21)
- **UI [navigation]:** `src/lib/i18n.ts` (`navShort`), `src/layouts/Layout.astro` — the phone bottom menu showed the first word of each full menu name, which read as विद्यार्थियों / हमारे / पूछे in Hindi, Centro / Estudio in Spanish and wrapped onto three lines in Japanese. Each language now has one-word labels (e.g. गीता, लेख, परिचय, प्रश्न; ギーター, 聖典, 記事; Escuela, Artículos). The full name stays as the accessible name and tooltip.
- **Content:** `src/pages/[lang]/modules/shastra-study.astro` — the ja/es note no longer says the Gita is English/Hindi only.

### SEO: Final audit fixes (2026-11-21)
- **SEO [Gita]:** `src/lib/gitaPageText.ts`, `src/pages/[lang]/modules/gita/[adhyaya].astro` — chapter meta descriptions name the chapter and what the page offers instead of listing verse numbers, and fit search results (~150 characters); titles measure Japanese characters as double width so long ones drop the optional suffix.
- **SEO [sitemap]:** `src/pages/sitemap.xml.ts` — every URL now has `<lastmod>`.
- **SEO [AI search]:** `src/pages/llms.txt.ts` — lists the Japanese and Spanish Gita chapter pages.
- **SEO:** shorter Spanish descriptions for the home page, Gita hub and NCERT Classes 11–12. New test SEO-05 keeps Gita titles and descriptions within limits.
- **Performance (measured, no change needed):** Lighthouse mobile on 24 pages (6 per language): performance 95–99, accessibility 100, SEO 100.

### Feature: Gita for Students in Japanese and Spanish, adhyayas 16–18 — all 18 chapters translated (2026-11-21)
- **Feature [Gita, ja/es]:** new `src/lib/gita/i18n/{ja,es}/adhyaya16–18.ts` — chapters 16–18 (20 shlokas) in Japanese and Spanish, registered in `src/lib/gita/i18n/index.ts`. Every Gita chapter is now available, indexable and listed in the sitemap in all four languages (19 Gita URLs per language), with full hreflang sets. Short glosses added for dal, board exams and the Class 10 stream choice.
- **Tests:** `tests/gita.spec.ts` GITA-06 and GITA-06c now check that adhyaya 18 is indexable in ja/es and that the hub marks no chapter "In English for now". The English fallback stays in the code for any chapter added later.

### Feature: Gita for Students in Japanese and Spanish, adhyayas 13–15 (2026-11-21)
- **Feature [Gita, ja/es]:** new `src/lib/gita/i18n/{ja,es}/adhyaya13–15.ts` — chapters 13–15 (20 shlokas) in Japanese and Spanish, registered in `src/lib/gita/i18n/index.ts`. Short glosses added for Diwali, diyas, the peepal tree and the Theory of Knowledge course; the Chapter 13 notes on other editions' verse numbers are translated too. These pages are now indexable in ja/es and listed in the sitemap.

### Feature: Gita for Students in Japanese and Spanish, adhyayas 10–12 (2026-11-20)
- **Feature [Gita, ja/es]:** new `src/lib/gita/i18n/{ja,es}/adhyaya10–12.ts` — chapters 10–12 (21 shlokas) in Japanese and Spanish, registered in `src/lib/gita/i18n/index.ts`. Short glosses added for roti, raga, bhajan, Uttarakhand, cricket and board exams. These pages are now indexable in ja/es and listed in the sitemap.

### Feature: Gita for Students in Japanese and Spanish, adhyayas 7–9 (2026-11-20)
- **Feature [Gita, ja/es]:** new `src/lib/gita/i18n/{ja,es}/adhyaya7–9.ts` — chapters 7–9 (20 shlokas) in Japanese and Spanish, registered in `src/lib/gita/i18n/index.ts`. Short glosses added for Rakhi, bhajan, Teacher's Day and the LIC motto. These pages are now indexable in ja/es and listed in the sitemap.

### Feature: Gita for Students in Japanese and Spanish, adhyayas 4–6 (2026-11-20)
- **Feature [Gita, ja/es]:** new `src/lib/gita/i18n/{ja,es}/adhyaya4–6.ts` — chapters 4–6 (22 shlokas) in Japanese and Spanish, registered in `src/lib/gita/i18n/index.ts`. Short glosses added for tiffin, dal, tabla, guru, cricket and board exams. These pages are now indexable in ja/es and listed in the sitemap.

### Feature: Gita for Students in Japanese and Spanish, adhyayas 1–3 (2026-11-20)
- **Feature [Gita, ja/es]:** new `src/lib/gita/i18n/{ja,es}/adhyaya1–3.ts` — chapters 1–3 (20 shlokas) translated into Japanese and Spanish: context, crux, word meanings, meaning, school-life situation, reflection and both quiz questions. Indian names and stories are kept, with short explanations of terms such as board exams, Class 10 streams and school houses. Each translated page notes that it was translated from English.
- **SEO:** translated chapters and the Gita hub are now indexable in ja/es, listed in the sitemap and linked with hreflang; untranslated chapters stay noindex with the canonical on /en, and the hub marks them "In English for now". Localized titles and descriptions for every Gita page (`src/lib/gitaPageText.ts`).
- **Performance:** one `GitaStudy` island now receives the chapter already in the page's language from the server (`src/lib/gita/content.ts`, `localizeAdhyaya`), replacing 18 per-chapter islands; en/hi pages no longer ship the other language's text.
- **Tests:** overlay completeness test (refs, word counts, options, script) and ja/es indexing tests in `tests/gita.spec.ts`.

### Onboarding tour in four languages; lighter pages (2026-11-20)
- **UI [Tour]:** `src/components/OnboardingTour.tsx`, new `src/lib/tourText.ts` — the tour now follows the page language (English, हिन्दी, 日本語, Español; it was English-only) and has 9 steps, including a new **Gita for Students** step that highlights the sidebar link. Copy rewritten in plain, student-friendly language (removed the "GEO"/crawler wording and the Bhagavatam mention). Counter, Skip, Next, Get Started and the Tour Guide button are translated too.
- **Performance:** removed `framer-motion` (about 35 KB compressed, loaded on every page for the tour, the streak flame and the Report Error dialog). The same animations are now CSS keyframes in `src/styles/globals.css` (`animate-flame-glow`, `animate-flame-flicker`, `animate-pop-in`) and respect "reduce motion". Pages download about 37 KB less (home: 182 → 145 KB); Lighthouse mobile 98–99.
- **SEO:** Gita chapter titles now fit search results (~70 characters; seven were 84–93). Fuller Japanese descriptions for FAQs, Shastra Study and the pronunciation article.
- **Tests:** tour test updated to 9 steps; new test for the Hindi tour and the Gita step.

### Feature: Gita for Students, adhyayas 16–18: all 18 chapters complete (2026-11-20)
- **Content:** `src/lib/gita/adhyaya16.ts`, `adhyaya17.ts`, `adhyaya18.ts` — 20 more shlokas in English and Hindi, each with word meanings, a school-life situation, a reflection question and 2 quiz questions:
  - Adhyaya 16: 16.2, 16.3 (Classes 6–8); 16.1, 16.21 (9–10); 16.4, 16.24 (11–12).
  - Adhyaya 17: 17.8, 17.15 (6–8); 17.16, 17.20 (9–10); 17.3, 17.23 (11–12).
  - Adhyaya 18: 18.37, 18.78 (6–8); 18.38, 18.46, 18.73 (9–10); 18.61, 18.63, 18.66 (11–12).
- **Milestone:** Gita for Students now covers all 18 adhyayas: 121 shlokas and 242 quiz questions (Classes 6–8: 35 shlokas, 9–10: 39, 11–12: 48), in English and Hindi. No "coming soon" chapters remain on the hub.
- **Feature:** `src/components/gita/Adhyaya16–18Study.tsx` — study pages for Adhyayas 16–18, linked from the hub, sitemap and `llms.txt`.
- **Tests:** Gita e2e and content tests cover all eighteen adhyayas, including a completeness check and the speaker of 18.78 (Sanjaya).

### Feature: Gita for Students, adhyayas 13–15 (2026-11-20)
- **Content:** `src/lib/gita/adhyaya13.ts`, `adhyaya14.ts`, `adhyaya15.ts` — 19 more shlokas in English and Hindi, each with word meanings, a school-life situation, a reflection question and 2 quiz questions:
  - Adhyaya 13: 13.7, 13.33 (Classes 6–8); 13.1, 13.27 (9–10); 13.2, 13.8, 13.32 (11–12). Each card also shows the number used by 35-verse editions (e.g. "13.2 in some editions"), because they add an opening verse to this chapter.
  - Adhyaya 14: 14.9, 14.17 (6–8); 14.5, 14.24 (9–10); 14.21, 14.26 (11–12).
  - Adhyaya 15: 15.13, 15.14 (6–8); 15.7, 15.12 (9–10); 15.1, 15.15 (11–12).
- **Feature:** `src/components/gita/Adhyaya13–15Study.tsx` — study pages for Adhyayas 13–15, linked from the hub, sitemap and `llms.txt`.
- **Tests:** Gita e2e and content tests cover all fifteen adhyayas, plus checks for the Chapter 13 alternate numbering.

### Feature: Gita for Students, adhyayas 10–12 (2026-11-20)
- **Content:** `src/lib/gita/adhyaya10.ts`, `adhyaya11.ts`, `adhyaya12.ts` — 21 more shlokas in English and Hindi, each with word meanings, a school-life situation, a reflection question and 2 quiz questions:
  - Adhyaya 10: 10.25, 10.31 (Classes 6–8); 10.9, 10.41 (9–10); 10.8, 10.10, 10.20 (11–12).
  - Adhyaya 11: 11.8, 11.12 (6–8); 11.41, 11.55 (9–10); 11.32, 11.33, 11.54 (11–12). Shows each verse's speaker (Sanjaya for 11.12, Arjuna for 11.41).
  - Adhyaya 12: 12.13, 12.15 (6–8); 12.18, 12.19 (9–10); 12.8, 12.9, 12.12 (11–12).
- **Feature:** `src/components/gita/Adhyaya10–12Study.tsx` — study pages for Adhyayas 10–12, linked from the hub, sitemap and `llms.txt`. Two-thirds of the Gita's chapters are now covered.
- **Tests:** Gita e2e (incl. a speaker check for 11.12) and content tests cover all twelve adhyayas.

### Feature: Gita for Students, adhyayas 7–9 (2026-11-20)
- **Content:** `src/lib/gita/adhyaya7.ts`, `adhyaya8.ts`, `adhyaya9.ts` — 20 more shlokas in English and Hindi, each with word meanings, a school-life situation, a reflection question and 2 quiz questions:
  - Adhyaya 7: 7.7, 7.8 (Classes 6–8); 7.3, 7.16 (9–10); 7.4, 7.11, 7.19 (11–12).
  - Adhyaya 8: 8.7 (6–8); 8.6, 8.13 (9–10); 8.3, 8.5, 8.15 (11–12). The chapter's verses on death go to the older levels only.
  - Adhyaya 9: 9.26, 9.27 (6–8); 9.22, 9.29 (9–10); 9.30, 9.31, 9.34 (11–12).
- **Feature:** `src/components/gita/Adhyaya7–9Study.tsx` — study pages for Adhyayas 7–9, linked from the hub, sitemap and `llms.txt`.
- **Tests:** Gita e2e and content tests cover all nine adhyayas.

### Feature: Gita for Students, adhyayas 4–6 (2026-11-20)
- **Content:** `src/lib/gita/adhyaya4.ts`, `adhyaya5.ts`, `adhyaya6.ts` — 21 more shlokas in English and Hindi, each with word meanings, a school-life situation, a reflection question and 2 quiz questions:
  - Adhyaya 4: 4.7, 4.8 (Classes 6–8); 4.24, 4.34, 4.39 (9–10); 4.18, 4.38, 4.40 (11–12).
  - Adhyaya 5: 5.10, 5.29 (6–8); 5.18, 5.23 (9–10); 5.2, 5.22 (11–12).
  - Adhyaya 6: 6.5, 6.17 (6–8); 6.34, 6.35 (9–10); 6.6, 6.19, 6.40 (11–12).
- **Feature:** `src/components/gita/Adhyaya4–6Study.tsx` and `modules/gita/[adhyaya].astro` — study pages for Adhyayas 4–6 (en/hi; ja/es show English, noindex), linked from the Gita hub, sitemap and `llms.txt`.
- **Tests:** `tests/gita.spec.ts` and `tests/unit/gitaContent.test.ts` cover all six adhyayas.

### Feature: Gita for Students, adhyayas 1–3 (2026-11-20)
- **Feature:** new study mode `/modules/gita` (`src/pages/[lang]/modules/gita/`, `src/components/gita/`, `src/lib/gita/`). Bhagavad Gita shlokas are graded for Classes 6–8, 9–10 and 11–12. Each shloka has the Devanagari text with a transliteration line (follows the script setting), word meanings, the meaning, a situation from a student's daily life, a reflection question, a memorise mode (reveal line by line) and a 2-question quiz.
- **Content:** Adhyayas 1–3, 20 shlokas (1.1, 1.47; 2.3, 2.7, 2.13, 2.14, 2.22, 2.47, 2.48, 2.50, 2.56, 2.62, 2.63; 3.8, 3.19, 3.21, 3.27, 3.30, 3.35, 3.37), each with a story context and a three-line crux per chapter. English and Hindi; Japanese/Spanish pages show English and are noindex. Verse numbers follow Gita Press; 1.47 also notes "1.46 in some editions".
- **UI:** "Gita for Students" in the sidebar; link from Shastra Study. Level choice is remembered (`sb_gita_level`) and kept in the URL (`?level=2`), and progress is saved under `sb_gita_v1`.
- **Quiz:** `TopicQuiz` gets `transliterateText`, so Hindi questions stay in Devanagari while verses still get a transliteration line.
- **SEO/app:** en/hi sitemap entries with hreflang, `llms.txt` section, share image `public/og/gita.png`, breadcrumbs; deep links keep the adhyaya and `level`.
- **Tests:** `tests/gita.spec.ts`, `tests/unit/gitaContent.test.ts`; Gita pages added to the accessibility and SEO checks.

### SEO: social previews, breadcrumbs, AI-search files, IndexNow (2026-11-20)
- **Feature [SEO]:** `src/layouts/Layout.astro` — every page now has Open Graph and Twitter card tags (title, description, canonical URL, locale and alternates, `og:type` article for Learn Hub articles) with a 1200×630 share image per section (`public/og/*.png`, made by `npm run og:images` from the theme tokens). Shared links on WhatsApp, X, Facebook and LinkedIn now show a card.
- **Feature [SEO]:** `Layout.astro` emits a BreadcrumbList for every inner page, derived from the URL (Home › Learn Hub › Article, Home › School Prep › Class). Home gets WebSite schema, so Google shows the site name.
- **SEO:** shorter NCERT class page titles and descriptions (`src/lib/ncertPageText.ts`); Contact has a description in each language; the FAQs page has a descriptive title.
- **Feature [AI search]:** `public/robots.txt` allows AI search/answer bots (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot) and blocks model-training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, Bytespider, meta-externalagent). New build-time `/llms.txt` (`src/pages/llms.txt.ts`) maps every class and article for AI assistants.
- **Tooling:** IndexNow key file and `npm run seo:indexnow` (`scripts/indexnow.mjs`) notify Bing and its partners after a deploy.
- **Tests:** new `tests/seo.spec.ts` (preview tags and image size, breadcrumbs, WebSite schema, title lengths, robots rules, llms.txt coverage, IndexNow key).

### Design tokens: re-theme the whole app from one file (2026-11-20)
- **UI [Design system]:** `src/styles/globals.css` and all components — colour tokens renamed from `saffron-*` / `marigold-*` to semantic `brand-*` / `accent-*`. New `on-brand` token for text on brand fills. Fixed three classes that pointed at non-existent shades (`saffron-55/105/755`). Confetti, the streak glow and the ad frame now read the tokens instead of hard-coded hex values. No visual change (all visual baselines unchanged).
- **Tooling:** `scripts/theme-check.mjs` (`npm run theme:check`, also run by `tests/unit/theme.test.ts`) checks every colour pair the UI uses against WCAG AA, and checks that the browser theme colour matches the brand.
- **Docs:** `DESIGN.md` rewritten for the real design system: a 6-step re-theme guide, the token table, typography, shape, component patterns and accessibility rules.
- **Repo:** removed the committed `Sanskritbhashi-release.aab` (14 MB) and the unused `Welcome.astro` starter component; `.aab`/`.apk` are now git-ignored.

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
