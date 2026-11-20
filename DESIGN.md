# Sanskritbhashi design system

The look of the whole site and app comes from **design tokens in one file**:
`src/styles/globals.css` — the `@theme { … }` block (light mode) and the `.dark { … }` block (dark mode).
Components use only token names (`bg-brand-500`, `text-brand-600`, `text-on-brand`, `bg-cream`, `text-charcoal`),
never hex values. A new colour scheme means editing those two blocks and nothing else in `src/`.

## Re-theme in 6 steps
1. **Edit the colour tokens** in `@theme` (light) and `.dark` (dark). Keep the meaning of each token (table below).
2. **Run `npm run theme:check`.** It checks every colour pair the UI uses against WCAG AA and fails if one is too
   low. Adjust the shades until it passes. (`tests/unit/theme.test.ts` runs the same check in CI.)
3. **Update the browser/app theme colour** to the new `brand-500` in two places that can't read CSS:
   `<meta name="theme-color">` in `src/layouts/Layout.astro` and `theme_color` in `public/manifest.json`.
   `theme:check` fails until these match.
4. **Regenerate the share images:** `npm run og:images`. It reads the tokens and rewrites `public/og/*.png`.
5. **Rebuild and verify:** `npx astro build`, then
   `npx playwright test -c playwright.tmp.config.ts --project=chromium --trace off tests/accessibility.spec.ts tests/ui-visual.spec.ts`.
   Accessibility must pass. Visual tests will fail on purpose (new colours): look at the diff images, then
   update baselines with `--update-snapshots`.
6. **Native app icon / splash** (`assets/`, `android/app/src/main/res`) are images, not tokens. If the brand colour
   changed, edit the two gradient stops in `scripts/generate-assets.js` (lines with `addColorStop`), then run
   `node scripts/generate-assets.js` (writes `assets/`), then import the new icon into `android/app/src/main/res` with Android Studio → New → Image Asset. They ship only with a new Play Store AAB.

Changing **fonts**: edit the `--font-*` tokens and the Google Fonts `<link>` in `Layout.astro` (keep them in sync).

## Colour tokens
| Token | Light | Dark | Used for | Rule |
|---|---|---|---|---|
| `cream` | `#FAF9F6` | `#121212` | Page background | — |
| `charcoal` | `#212121` | `#F5F5F5` | Body text (use `/70`–`/80` for muted) | ≥ 7:1 on cream |
| `border-hairline` | `#E2E0D8` | `#2A2A2A` | Dividers, card borders | — |
| `brand-50`, `brand-100` | `#FFF9F2`, `#FFEAD4` | `#2C180F`, `#4B2713` | Tinted surfaces, badges, card borders | brand-600 text ≥ 4.5:1 on them |
| `brand-300`, `brand-400` | `#FFB880`, `#FF9A4D` | (same) | Dark-mode text and hover accents | — |
| `brand-500` | `#FF6F00` | `#FF8F33` | **Fills**: primary buttons, banners, active nav, progress bars | — |
| `brand-600` | `#B84300` | `#FF8533` | **Brand text**: links, labels, headings accents | ≥ 4.5:1 on cream, white, brand-50/100 |
| `brand-700` | `#9A3800` | (same) | Hover text | — |
| `accent-50` | `#FFF8E1` | `#2A2108` | Soft accent surfaces (streak) | — |
| `accent-500` / `600` | `#FFB300` / `#E6A100` | `#FFC43D` / `#E6AA00` | Gradient partner (`from-brand-500 to-accent-500`), stars, highlights | — |
| `on-brand` | `#1C1917` | `#1C1917` | Text and icons **on** brand-500 / accent-500 fills | ≥ 4.5:1 on both fills |

Neutral greys for cards and dark surfaces come from Tailwind `zinc` (`bg-white dark:bg-zinc-900`, borders
`dark:border-zinc-800`). Status colours use Tailwind `emerald` (correct), `red` (error), `amber` (hint). These stay the same
across themes.

**Choosing a new scheme:** pick `brand-500` first (the fill). If white text reads well on it (≥ 4.5:1), set
`on-brand` to `#FFFFFF`; otherwise use a near-black. Then pick `brand-600` as a darker (light mode) / lighter (dark
mode) shade of the same hue that passes on the page background. `brand-50/100` are very light tints (dark mode: very
dark tints). `contrast.cjs` in `.claude/skills/web-audit/scripts/` gives the ratio for any pair.

## Typography
| Token | Family | Use |
|---|---|---|
| `font-sans` / `font-latin` | Geist (variable 400–900), then system fonts incl. Japanese | UI and body text |
| `font-sanskrit` | Tiro Sanskrit | All Devanagari (with `lang="sa"`) |
| `font-mono` | Geist Mono | Small caps labels, domain line |

Weights in use: 400 body, 600–700 UI, 800–900 (`font-extrabold` / `font-black`) for headings and labels.
Small uppercase labels use `text-xs font-black uppercase tracking-widest`.

## Shape and depth
- Radius: `rounded-3xl` for page sections and banners, `rounded-2xl` for cards and quiz options, `rounded-xl` for
  buttons and inputs, `rounded-full` for pills, badges and avatars.
- Shadows are light: `shadow-xs` / `shadow-md` on cards, `shadow-lg shadow-brand-500/20` on the primary button and active nav.
- Spacing: sections `p-6 md:p-8`, stacks `space-y-6`, card grids `gap-4`.

## Component patterns
| Pattern | Classes |
|---|---|
| Primary button | `bg-brand-500 hover:brightness-110 text-on-brand font-bold rounded-xl px-6 py-3` |
| Secondary button | `border-2 border-brand-500 text-brand-600 bg-white dark:bg-zinc-900 rounded-xl` |
| Neutral button (quiz Next) | `bg-charcoal text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-xl` |
| Page banner | `bg-linear-to-r from-brand-500 to-accent-500 text-on-brand rounded-3xl p-6 md:p-8` |
| Card | `bg-white dark:bg-zinc-900 border border-brand-100 dark:border-zinc-800 rounded-3xl p-6` |
| Badge | `bg-brand-100 text-brand-600 text-xs font-bold rounded-full px-3 py-1` |
| Link | `text-brand-600 hover:text-brand-700 dark:hover:text-brand-300` |
| Active nav item | `bg-linear-to-r from-brand-500 to-accent-500 text-on-brand shadow-lg shadow-brand-500/20` |

## Accessibility rules (enforced by `tests/accessibility.spec.ts`)
- Colour contrast WCAG 2.1 AA in light and dark, all 4 locales. Never put white text on a fill without checking.
- Visible focus rings; every control reachable by keyboard; touch targets ≥ 24px.
- Animations respect `prefers-reduced-motion` (global rule at the end of `globals.css`).
