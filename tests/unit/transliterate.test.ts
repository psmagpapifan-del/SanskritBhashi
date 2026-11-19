// Unit tests for src/lib/transliterate.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  devanagariToIast,
  iastToDevanagari,
  iastToKatakana,
  iastToFrench,
  renderSanskrit,
} from "../../src/lib/transliterate.ts";

test("Devanagari to IAST", () => {
  assert.equal(devanagariToIast("कर्मण्येवाधिकारस्ते मा फलेषु कदाचन"), "karmaṇyevādhikāraste mā phaleṣu kadācana");
  assert.equal(devanagariToIast("योगः कर्मसु कौशलम्"), "yogaḥ karmasu kauśalam");
  assert.equal(devanagariToIast("ज्ञानम्"), "jñānam");
  assert.equal(devanagariToIast("संस्कृतम्"), "saṃskṛtam");
});

test("IAST to Devanagari round-trips", () => {
  for (const dev of ["कर्मण्येवाधिकारस्ते", "तत्त्वमसि", "वसुधैव कुटुम्बकम्", "भक्तिः", "आलयः"]) {
    assert.equal(iastToDevanagari(devanagariToIast(dev)), dev);
  }
  assert.equal(iastToDevanagari("Deva"), "देव");
});

test("IAST to Katakana", () => {
  assert.equal(iastToKatakana("devālayaḥ"), "デーヴァーラヤハ");
  assert.equal(iastToKatakana("kṛṣṇa"), "クリシュナ");
  assert.equal(iastToKatakana("buddha"), "ブッダ");
  assert.equal(iastToKatakana("saṃskṛtam"), "サンスクリタム");
  assert.equal(iastToKatakana("bhaktiḥ"), "バクティヒ");
});

test("IAST to French phonetic", () => {
  assert.equal(iastToFrench("devālayaḥ"), "dévâlayah");
  assert.equal(iastToFrench("kṛṣṇa"), "krichna");
  assert.equal(iastToFrench("guru"), "gourou");
  assert.equal(iastToFrench("jñānam"), "gnyânam");
});

test("renderSanskrit converts Devanagari and drops a repeated IAST gloss", () => {
  assert.equal(renderSanskrit("योगः (yogaḥ)", "iast"), "yogaḥ");
  assert.equal(renderSanskrit("योगः (yogaḥ)", "devanagari"), "योगः");
  assert.equal(renderSanskrit("योगः (yogaḥ)", "japanese"), "ヨーガハ");
  // A meaning in brackets is kept.
  assert.equal(renderSanskrit("पावकः (fire)", "iast"), "pāvakaḥ (fire)");
  // English with an embedded Sanskrit form.
  assert.equal(renderSanskrit("Gerund with क्त्वा: 'having abandoned'", "iast"), "Gerund with ktvā: 'having abandoned'");
  // Dandas become bars outside Devanagari.
  assert.equal(renderSanskrit("योगः कर्मसु कौशलम् ।", "iast"), "yogaḥ karmasu kauśalam |");
  // Pure English is untouched.
  assert.equal(renderSanskrit("Yoga is skill in action", "japanese"), "Yoga is skill in action");
});

test("renderSanskrit latinSanskrit converts IAST sandhi splits and vigraha only", () => {
  const o = { latinSanskrit: true };
  assert.equal(renderSanskrit("Deva + Ālayaḥ (Dīrgha Sandhi)", "devanagari", o), "देव + आलयः (Dīrgha Sandhi)");
  assert.equal(renderSanskrit("Bahuvrīhi Samāsa (Vigraha: Rājā puruṣaḥ)", "devanagari", o), "Bahuvrīhi Samāsa (Vigraha: राजा पुरुषः)");
  assert.equal(renderSanskrit("Deva + Ālayaḥ (Dīrgha Sandhi)", "iast", o), "Deva + Ālayaḥ (Dīrgha Sandhi)");
  assert.equal(renderSanskrit("Sea / Ocean", "devanagari", o), "Sea / Ocean");
});
