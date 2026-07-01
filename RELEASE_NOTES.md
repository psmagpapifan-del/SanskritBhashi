# Sanskritbhashi App Release Notes

This file tracks all bug fixes, improvements, and features implemented across app versions to prepare for Play Store releases.

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
