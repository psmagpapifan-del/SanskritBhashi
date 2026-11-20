// The colour tokens in globals.css must keep every UI pairing at WCAG AA (see DESIGN.md).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
// @ts-ignore — plain ESM script
import { checkTheme } from "../../scripts/theme-check.mjs";

test("theme tokens pass contrast checks and theme colour matches brand-500", () => {
  const results = checkTheme(fs.readFileSync("src/styles/globals.css", "utf8"), {
    "Layout.astro": fs.readFileSync("src/layouts/Layout.astro", "utf8"),
    "manifest.json": fs.readFileSync("public/manifest.json", "utf8"),
  });
  const failed = results.filter((r: { ok: boolean }) => !r.ok);
  assert.deepEqual(failed, []);
});
