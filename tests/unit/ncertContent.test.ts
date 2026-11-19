// Structural checks for the NCERT question bank (src/lib/ncertContent.ts).
import { test } from "node:test";
import assert from "node:assert/strict";
import { ncertChapters } from "../../src/lib/ncertContent.ts";

test("every chapter has 7–9 questions with unique ids", () => {
  const ids = new Set<string>();
  for (const ch of ncertChapters) {
    assert.ok(ch.questions.length >= 7 && ch.questions.length <= 9, `${ch.id} has ${ch.questions.length} questions`);
    for (const q of ch.questions) {
      assert.ok(!ids.has(q.id), `duplicate id ${q.id}`);
      ids.add(q.id);
    }
  }
});

test("every question has four distinct options, a hint and an explanation", () => {
  for (const ch of ncertChapters) {
    for (const q of ch.questions) {
      assert.equal(q.options.length, 4, q.id);
      assert.equal(new Set(q.options).size, 4, `${q.id} has duplicate options`);
      assert.ok(q.correctIndex >= 0 && q.correctIndex < 4, q.id);
      assert.ok(q.prompt.trim() && q.hint.trim() && q.explanation.trim(), `${q.id} is missing text`);
    }
  }
});

test("chapters are grouped by class", () => {
  for (const ch of ncertChapters) {
    assert.match(ch.group ?? "", /^Class \d+$/, ch.id);
    assert.ok(ch.id.startsWith(`c${ch.group!.split(" ")[1]}-`), ch.id);
  }
});
