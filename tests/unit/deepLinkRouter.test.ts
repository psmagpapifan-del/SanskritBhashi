// Deep links into School Prep land on the right per-class page.
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildWebPath, parseDeepLink } from "../../src/lib/deepLinkRouter.ts";
import { classFromTopic, NCERT_CLASSES } from "../../src/lib/ncertClasses.ts";
import { ncertChapters } from "../../src/lib/ncertContent.ts";

test("an NCERT topic link goes to its class page", () => {
  const link = parseDeepLink("https://sanskritbhashi.com/en/modules/school-prep?topic=c8-05")!;
  assert.equal(buildWebPath(link), "/en/modules/school-prep/class-8?topic=c8-05");
  const two = parseDeepLink("sanskritbhashi://app/hi/modules/school-prep?topic=c11-shashvati-02")!;
  assert.equal(buildWebPath(two), "/hi/modules/school-prep/class-11?topic=c11-shashvati-02");
});

test("a class page link keeps its class", () => {
  const link = parseDeepLink("https://sanskritbhashi.com/ja/modules/school-prep/class-12")!;
  assert.equal(link.subpage, "class-12");
  assert.equal(buildWebPath(link), "/ja/modules/school-prep/class-12");
});

test("unknown class slugs and other modules are left alone", () => {
  assert.equal(parseDeepLink("https://sanskritbhashi.com/en/modules/school-prep/class-99")!.subpage, undefined);
  const shastra = parseDeepLink("https://sanskritbhashi.com/en/modules/shastra-study?topic=gita-karma-yoga")!;
  assert.equal(buildWebPath(shastra), "/en/modules/shastra-study?topic=gita-karma-yoga");
});

test("every NCERT chapter id maps to a known class", () => {
  for (const c of ncertChapters) {
    const n = classFromTopic(c.id);
    assert.ok(n && (NCERT_CLASSES as readonly number[]).includes(n), c.id);
    assert.equal(c.group, `Class ${n}`);
  }
});
