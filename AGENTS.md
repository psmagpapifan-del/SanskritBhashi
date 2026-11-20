# Sanskritbhashi — agent guide

Sanskrit learning site (sanskritbhashi.com) and Android app. Read this first; it is kept short so
you don't need to re-explore the repo. Task-specific workflows live in `.claude/skills/` and load on demand.

## Stack (this is Astro, not Next.js)
- **Astro 6** + **React 19 islands** + **Tailwind 4** (tokens in `src/styles/globals.css` `@theme`).
- **Web:** Cloudflare Pages (`@astrojs/cloudflare`, `output: 'server'`; pages use `export const prerender = true`).
- **App:** Capacitor 8 Android wrapper (`android/`), `webDir: dist`. Content updates ship **over the air** with Capgo:
  `public/updates/bundle-latest.zip` + `latest.json`, served from the site. A Play Store **AAB** is only needed for
  native changes (plugins, permissions, `android/`), and it can't be built in cloud sessions (no Android SDK or signing key).
- Ignore the Next.js leftovers (`.gitignore` entries, `public/next.svg`). `DESIGN.md` is a Vercel-inspired
  reference, not the live palette; the live tokens are in `globals.css`.

## Map
| Path | What |
|---|---|
| `src/pages/[lang]/…` | All pages, 4 locales: `en hi ja es`. Dynamic routes: `[cls].astro` etc. |
| `src/layouts/Layout.astro` | Head (SEO, hreflang, canonical, fonts), sidebar, footer, cookie banner |
| `src/lib/i18n.ts` | UI strings per locale (`getTranslation(lang)`) |
| `src/lib/quizContent.ts` / `quizEngine.ts` | Quiz data types; session, scoring, spaced repetition |
| `src/components/TopicQuiz.tsx` | The one quiz UI (Shastra Study + NCERT) |
| `src/lib/ncert/classN.ts` | NCERT questions, built with `chapter()` from `ncert/build.ts` |
| `src/lib/ncertClasses.ts`, `ncertPageText.ts` | Class index + localized labels for School Prep pages |
| `src/components/ncert/ClassNQuiz.tsx` | One island per class, so each page ships one class of data |
| `src/lib/shastraContent.ts` | Shastra Study (Gita, Upanishads) topics |
| `src/lib/learnArticles.ts` + `src/components/articles/<slug>/{en,hi,ja,es}.astro` | Learn Hub articles |
| `src/lib/transliterate.ts`, `useScript.ts` | Devanagari → IAST / Katakana / French script setting |
| `src/lib/deepLinkRouter.ts`, `capacitorBridge.ts` | App deep links, native prefs/haptics |
| `src/pages/sitemap.xml.ts` | Build-time sitemap; globs `[lang]/**` but **dynamic routes must be added by hand** |
| `content/ncert_text/` | Extracted NCERT chapter text (source for questions). PDFs stay **off main**. |
| `scripts/package-ota.js`, `deploy.js` | OTA bundle; native AAB build (local machine only) |

## Commands
```bash
npx astro build                                    # web build (needed before Playwright; tests use `astro preview`)
CAPACITOR_BUILD=true npx astro build && node scripts/package-ota.js   # OTA bundle, then rebuild web
npm run test:unit                                  # node:test, ~1 s
npx playwright test -c playwright.tmp.config.ts --project=chromium --trace off <spec files>
```
`playwright.tmp.config.ts` points Playwright at the preinstalled Chromium (cloud sessions).

## Test only what the change touches (the full suite is ~220 tests / 7 min)
| Change | Run |
|---|---|
| Quiz data / engine / transliteration | `test:unit` + `sanskritbhashi.spec.ts shastra-quiz.spec.ts` |
| Colours, layout, any visual change | `accessibility.spec.ts ui-visual.spec.ts` (update baselines with `--update-snapshots -g "<name>"` **after** checking the diff image) |
| Routes, links, deep links | `sanskritbhashi.spec.ts functional.spec.ts content.spec.ts` + `test:unit` |
| Head / SEO / headers | `security.spec.ts content.spec.ts sanskritbhashi.spec.ts` |
| Big refactor or release candidate | everything |

`accessibility.spec.ts` enforces WCAG AA (including colour contrast) on 9 pages × 4 locales, dark mode, quiz
states and a keyboard-only run. Keep it green; don't add exemptions.

## Conventions
- **Every user-visible string in 4 locales** (`en hi ja es`). Sanskrit text gets `lang="sa"` and `font-sanskrit`.
- **Colours (WCAG AA):** orange **text** = `text-saffron-600` (`#B84300` light / `#FF8533` dark). Filled orange
  (`bg-saffron-500` / `from-saffron-500 to-marigold-500`) takes **`text-zinc-900`**, never white. Muted text ≥ `charcoal/70`;
  dark-mode grey ≥ `zinc-400`.
- **Astro islands need a static tag** (`<Class9Quiz client:load />`); a component held in a variable won't hydrate.
- **Quiz data:** option 0 is correct (shuffled at display); 4 distinct options, plus a hint and an explanation. NCERT: 7–9
  questions per lesson, written from `content/ncert_text/`. Store keys: `sb_ncert_v1`, `sb_shastra_v1`.
- New page → check the sitemap (dynamic routes), `<title>`/description in each locale, and JSON-LD where useful.
- Fonts: `<link>` in `Layout.astro` (Geist variable, Geist Mono, Tiro Sanskrit). Don't add web fonts via CSS `@import`.

## Release notes (required)
Whenever you implement bug fixes, performance improvements, UI adjustments, or new features:
1. Append a concise summary to `RELEASE_NOTES.md` under `## [Unreleased]` (newest first).
2. Include the date, change type (Bug Fix, Feature, Performance, UI, Accessibility), file(s) affected, and a brief description.
3. These notes are compiled into the next Google Play Store release notes.

Content or UI changes also need the OTA bundle rebuilt (see Commands), so the app updates silently.
Full ship flow: `.claude/skills/ship-release/SKILL.md`.

## Never
- Commit the release keystore, `keystore.properties`, NCERT PDFs or secrets. Never upload the signing key to a cloud session.
- Put the owner's personal email or other details into code, commits or external requests.
- Bump `android/app/build.gradle` versionCode without checking the last code uploaded in Play Console.
