---
name: ship-release
description: Ship a finished Sanskritbhashi change — release notes, OTA bundle, targeted tests, commit, PR, merge, branch reset. Use when the user says "open the PR and merge it", "ship it", or a feature/content batch is done.
---

# Ship a change (Sanskritbhashi)

Run these steps in order. Stop and report if a test fails; don't skip or loosen tests to get green.

1. **Release notes.** Add a `### <title> (<YYYY-MM-DD>)` block at the top of `## [Unreleased]` in
   `RELEASE_NOTES.md`. Write one bullet per change: `**Type:** \`file(s)\` — what changed and why`.
   Types: Bug Fix, Feature, Performance, UI, Accessibility, Tests.
2. **Web build, then targeted tests.** Run `npx astro build`, then the specs from the test matrix in `AGENTS.md`.
   For visual diffs, open `test-results/**/<name>-diff.png` first. Update baselines only if the change was intended:
   `--update-snapshots -g "VIS-03-<Name>"`.
3. **OTA bundle** (any content/UI change):
   ```bash
   CAPACITOR_BUILD=true npx astro build && node scripts/package-ota.js && npx astro build
   ```
   This updates `public/updates/bundle-latest.zip` and `latest.json`. The final `astro build` restores the web build.
4. **Commit** on the session's dev branch. Use a short imperative subject, a body of bullets, and the attribution
   trailers the harness gives. Don't commit `dist/`, `test-results/`, keystores or NCERT PDFs.
5. **PR → merge** with the GitHub MCP tools (`create_pull_request`, then `merge_pull_request` with
   `merge_method: merge` and the **full 40-char** `expectedHeadSha`).
   PR body sections: Summary, Testing (exact pass counts), then the attribution footer.
6. **Reset the dev branch** to the merged main, so the next PR starts clean:
   ```bash
   git fetch origin main && git reset --hard origin/main && git push --force-with-lease origin <dev-branch>
   ```
7. Tell the user it's live on the next Cloudflare deploy, and that app users get it through OTA.
   A Play Store AAB is only needed for native changes; it's built on the owner's machine with `npm run deploy:all`.

## Gotchas
- Keep unconfirmed changes (e.g. a versionCode bump waiting on a Play Console check) out of unrelated PRs.
- `astro build` logs `Error: Request was cancelled` in sandboxes (network); that's harmless. A real failure says `NoMatchingImport`, `[ERROR]` or exits non-zero.
