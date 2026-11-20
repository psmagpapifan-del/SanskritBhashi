---
name: web-audit
description: Measure and fix a website's accessibility (WCAG 2.1 AA via axe-core) and speed (Lighthouse) the way production serves it. Project-agnostic; works for any static or SSR site with a local preview. Use for "audit accessibility", "why is the site slow", "improve Core Web Vitals", or before/after a design or performance change.
---

# Web audit: accessibility + speed

The scripts in `scripts/` are self-contained (Node + Playwright + axe-core), so this folder can be copied into any
project's `.claude/skills/` or into `~/.claude/skills/`.

## 1. Accessibility baseline
```bash
node .claude/skills/web-audit/scripts/axe-scan.cjs http://localhost:3005 /en /en/learn /hi \
  --storage theme=dark --storage tour_completed=true      # optional localStorage seeds (theme, dismiss popups)
```
- It prints serious and critical violations per page, with the selector and the contrast numbers, and exits 1 if there are any.
- Run it in both light and dark themes and in each locale. Each locale has its own text lengths and fonts.
- Also test interactive states (open menus, quiz answered, dialogs). Static page scans miss these, so script
  them in the project's Playwright suite.
- Check `target-size` (touch targets) at a phone viewport: `--rules target-size --mobile`.

## 2. Fix colour contrast with numbers, not guesses
```bash
node .claude/skills/web-audit/scripts/contrast.cjs "#B84300" "#ffffff" "#faf9f6"   # fg vs each bg
```
- Thresholds: 4.5:1 for body text; 3:1 for large text (≥24px, or ≥18.66px bold) and for icons/UI parts.
- For a brand colour that fails, offer the owner 2 options and render before/after screenshots
  (inject a `<style>` with token overrides through Playwright `addStyleTag`) before editing code.
  The usual options: (a) darker shade everywhere; (b) keep the bright fill and put dark text on it, with a darker shade only for text.
- Look for undefined design tokens: a class like `text-brand-400` with no token renders nothing and slips past review.

## 3. Speed, measured like production
Local preview servers usually don't compress responses, so Lighthouse scores come out 15–30 points too low.
Serve the built output with brotli and immutable caching (as Cloudflare/Netlify/Vercel do):
```bash
node .claude/skills/web-audit/scripts/cfserve.cjs <built-static-dir> 3007 &
CHROME_PATH=/opt/pw-browsers/chromium/chrome-linux/chrome npx -y lighthouse@12.6.0 http://localhost:3007/en \
  --quiet --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,seo,best-practices \
  --output=json --output-path=/tmp/lh.json
```
Read `largest-contentful-paint-element`, `render-blocking-insight`, `network-requests` (sort by size) and
`unused-javascript`. Common wins, roughly in order of payoff:
1. **One big data bundle on every page:** split it per route (per-class / per-section pages, each importing only its own data).
2. **Web fonts:** drop families nobody renders (grep for the family/utility class), use variable fonts
   (`wght@400..900`), load them with `<link rel=preconnect>` + `<link rel=stylesheet>` rather than CSS `@import`, and use system fonts for CJK.
3. **Third-party scripts** (ads, analytics): defer or load them after consent.
4. **LCP is a late popup** (onboarding/cookie dialog): accept it, or render a static placeholder.

## 4. Lock it in
Add the axe scan (all locales × themes × key interactive states) to the project's Playwright suite with **no
exemptions**. Record before/after scores in the release notes.
