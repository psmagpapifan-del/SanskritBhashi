# Sanskritbhashi App Release Notes

This file tracks all bug fixes, improvements, and features implemented across app versions to prepare for Play Store releases.

---

## [Unreleased] - 2026-11-18

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
