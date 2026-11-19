// Unit tests for src/lib/quizEngine.ts
// Run with: npm run test:unit   (node --test with built-in TypeScript type stripping)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  advance,
  answer,
  applySession,
  createSession,
  currentId,
  dueIds,
  mastery,
  optionOrder,
  practiceOrder,
  score,
  shuffle,
  updateCard,
  type Card,
} from "../../src/lib/quizEngine.ts";

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 10, 19);
const ids = ["a", "b", "c", "d", "e"];
const KEY: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, e: 0 };

/** Deterministic RNG for reproducible shuffles. */
function seeded(seed = 42) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function play(mode: "practice" | "exam", picks: Record<string, number[]>) {
  let s = createSession(ids, mode, { now: NOW, rng: seeded() });
  let guard = 0;
  while (s.phase !== "done" && guard++ < 100) {
    const id = currentId(s)!;
    const tries = picks[id] ?? [KEY[id]];
    for (const choice of s.phase === "review" ? [KEY[id]] : tries) {
      const r = answer(s, choice, KEY[id]);
      s = r.session;
      if (r.canAdvance) break;
    }
    s = advance(s);
  }
  return s;
}

test("shuffle keeps every element and does not mutate input", () => {
  const input = [1, 2, 3, 4, 5, 6];
  const out = shuffle(input, seeded());
  assert.deepEqual([...out].sort(), input);
  assert.deepEqual(input, [1, 2, 3, 4, 5, 6]);
  assert.deepEqual([...optionOrder(4, seeded())].sort(), [0, 1, 2, 3]);
});

test("practice: all correct first time scores 100 with no review round", () => {
  const s = play("practice", {});
  const sc = score(s);
  assert.equal(sc.percent, 100);
  assert.equal(sc.passed, true);
  assert.deepEqual(s.reviewQueue, []);
});

test("practice: only the first attempt counts, misses go to review", () => {
  // Miss b and d first, then get them right on the retry.
  const s = play("practice", { b: [0, 1], d: [0, 3] });
  const sc = score(s);
  assert.equal(sc.correct, 3);
  assert.equal(sc.percent, 60);
  assert.equal(sc.passed, false);
  assert.deepEqual([...sc.missed].sort(), ["b", "d"]);
  assert.deepEqual([...s.reviewQueue].sort(), ["b", "d"]);
  assert.equal(s.answers.b.attempts, 2);
});

test("practice: a wrong choice does not allow advancing", () => {
  const s = createSession(ids, "practice", { now: NOW });
  const id = currentId(s)!;
  const r = answer(s, (KEY[id] + 1) % 4, KEY[id]);
  assert.equal(r.correct, false);
  assert.equal(r.canAdvance, false);
});

test("practice: review round is entered after the main round", () => {
  let s = createSession(["a", "b"], "practice", { now: NOW });
  s = answer(s, 3, KEY.a).session; // miss a
  s = answer(s, KEY.a, KEY.a).session;
  s = advance(s);
  s = answer(s, KEY.b, KEY.b).session;
  s = advance(s);
  assert.equal(s.phase, "review");
  assert.equal(currentId(s), "a");
  s = answer(s, KEY.a, KEY.a).session;
  s = advance(s);
  assert.equal(s.phase, "done");
  // Review attempts do not change the first-attempt score.
  assert.equal(score(s).percent, 50);
});

test("exam: one attempt, locked answers, no review round", () => {
  let s = createSession(ids, "exam", { rng: seeded() });
  assert.deepEqual([...s.order].sort(), [...ids].sort());
  const first = currentId(s)!;
  const r1 = answer(s, (KEY[first] + 1) % 4, KEY[first]);
  assert.equal(r1.canAdvance, true);
  s = r1.session;
  // A second answer to the same question is ignored.
  const r2 = answer(s, KEY[first], KEY[first]);
  assert.equal(r2.session.answers[first].correct, false);
  const done = play("exam", { a: [1] }); // only a is wrong
  assert.equal(done.reviewQueue.length, 0);
  assert.equal(score(done).percent, 80);
  assert.equal(score(done).passed, true);
});

test("pass mark is 80%", () => {
  assert.equal(score(play("exam", { a: [1] })).passed, true); // 4/5 = 80
  assert.equal(score(play("exam", { a: [1], b: [0] })).passed, false); // 3/5 = 60
});

test("Leitner: correct answers climb boxes, a miss resets to box 1", () => {
  let c = updateCard(undefined, true, NOW);
  assert.equal(c.box, 1);
  assert.equal(c.due, NOW + 1 * DAY);
  c = updateCard(c, true, NOW);
  assert.equal(c.box, 2);
  assert.equal(c.due, NOW + 3 * DAY);
  for (let i = 0; i < 10; i++) c = updateCard(c, true, NOW);
  assert.equal(c.box, 5);
  assert.equal(c.due, NOW + 35 * DAY);
  c = updateCard(c, false, NOW);
  assert.equal(c.box, 1);
  assert.equal(c.due, NOW + 1 * DAY);
  assert.equal(c.seen, 13);
  assert.equal(c.correct, 12);
});

test("practice order puts due cards first, then unseen, then not-yet-due", () => {
  const cards: Record<string, Card> = {
    a: { box: 3, due: NOW + 5 * DAY, seen: 3, correct: 3 },
    b: { box: 1, due: NOW - 1, seen: 1, correct: 0 },
    d: { box: 2, due: NOW - DAY, seen: 2, correct: 1 },
  };
  assert.deepEqual(practiceOrder(ids, cards, NOW), ["b", "d", "c", "e", "a"]);
  assert.deepEqual(dueIds(ids, cards, NOW), ["b", "d"]);
});

test("applySession updates only answered questions and mastery reflects boxes", () => {
  const s = play("practice", { b: [0, 1] });
  let cards = applySession({}, s, NOW);
  assert.equal(Object.keys(cards).length, 5);
  assert.equal(cards.b.box, 1);
  assert.equal(cards.a.box, 1);
  assert.equal(mastery(ids, cards), 0);
  cards = applySession(cards, play("practice", {}), NOW);
  cards = applySession(cards, play("practice", {}), NOW);
  // a: hit, hit, hit -> box 3. b: miss (box 1), hit, hit -> box 3.
  assert.equal(cards.a.box, 3);
  assert.equal(cards.b.box, 3);
  assert.equal(mastery(ids, cards), 100);
  // One more miss on b drops it back to box 1 and lowers mastery.
  cards = applySession(cards, play("practice", { b: [0, 1] }), NOW);
  assert.equal(cards.b.box, 1);
  assert.equal(mastery(ids, cards), 80);
});
