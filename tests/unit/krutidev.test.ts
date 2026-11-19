// The Kruti Dev → Unicode converter (scripts/krutidev_to_unicode.py) on known NCERT lines.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const convert = (s: string) => execFileSync("python3", ["scripts/krutidev_to_unicode.py"], { input: s }).toString();

test("converts Vedic and Upaniṣad verses from the Class 10 and 12 readers", () => {
  assert.equal(convert("¬ rPp{kqnsZofgra iqjLrkPNqØeqPpjr~ A"), "ॐ तच्चक्षुर्देवहितं पुरस्ताच्छुक्रमुच्चरत् ।");
  assert.equal(convert("bZ'kkokL;fena lo± ;fRd×p txR;ka txr~ A"), "ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।");
  assert.equal(convert("oqQoZUusosg dekZf.k"), "कुर्वन्नेवेह कर्माणि");
});

test("handles NCERT's extra glyphs", () => {
  assert.equal(convert("'kqfpi;kZoj.ke~"), "शुचिपर्यावरणम्");
  assert.equal(convert("eÄõye~"), "मङ्गलम्");
  assert.equal(convert("lwfÙkQlq/k"), "सूक्तिसुधा");
  assert.equal(convert("fo|;k¿e`re'uqrs"), "विद्ययाऽमृतमश्नुते");
  assert.equal(convert("dh gS\\ D;k"), "की है? क्या");
  assert.equal(convert("ftÞk"), "जिह्वा");
  assert.equal(convert("ßLo"), "ह्रस्व");
  assert.equal(convert("rdZ"), "तर्क");
  assert.equal(convert("=kQes.k"), "क्रमेण");
});
