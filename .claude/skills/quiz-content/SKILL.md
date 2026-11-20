---
name: quiz-content
description: Write or extend Sanskritbhashi quiz/lesson content — NCERT chapter quizzes, Shastra Study topics, and the planned Gita study mode. Covers the data shape, writing rules, where files go, wiring a new class or section into pages, and the checks to run. Use when adding questions, a class, a textbook, or a new quiz module.
---

# Quiz content (Sanskritbhashi)

## Data shape (`src/lib/quizContent.ts`)
A `QuizTopic` has `{ id, text, title, summary, short?, group?, questions[] }`.
A `QuizQuestion` has `{ id, kind, prompt, verse?, ref?, options[4], correctIndex, hint, explanation }`.
`kind` is one of: meaning, grammar, sandhi, fill, source, concept, vocab, comprehension, number.
`TopicQuiz.tsx` renders any topic list: practice and exam modes, review round, spaced repetition, script setting.

## Writing rules
- **Option 0 is the correct answer** in data files; options are shuffled for display. Use 4 distinct options,
  with plausible distractors (other forms of the same word, a near-miss sandhi), never joke answers.
- **Write from the source text.** NCERT questions come from `content/ncert_text/classN/…/chNN.txt` (extracted with
  `scripts/extract_ncert_text.py`; the PDFs live off main). Quote Devanagari exactly as printed, and put a passage in `verse`.
- `hint` nudges without giving the answer away; `explanation` says why the answer is right and teaches one more fact.
- Prompts are in English (UI translation covers the chrome). Sanskrit stays in Devanagari: the user's script setting
  transliterates it, so never hard-code IAST for words the setting should convert.
- NCERT: 7–9 questions per lesson, with a mix of kinds (meaning, grammar/lakāra, sandhi, vocab, comprehension, number).
- Scripture (Gita, Upanishads): use standard Gita Press verse numbering in `ref`. Flag the meanings for owner review before merging.

## NCERT files
- `src/lib/ncert/classN.ts` exports arrays built with `chapter(cls, lesson, book, title, summary, questions, {key, short})`
  from `ncert/build.ts`. Ids: `c9-03`, or `c11-shashvati-02` when a class has two books (`key`).
- **New class or book:** add it to `ncertContent.ts` (the all-classes list used by the hub and the sitemap), `NCERT_CLASSES` and
  `BOOK_LATIN` in `ncertClasses.ts`, a `src/components/ncert/ClassNQuiz.tsx` wrapper, and a static
  `{n === N && <ClassNQuiz client:load …/>}` line in `src/pages/[lang]/modules/school-prep/[cls].astro`.
  The deep-link regexes in `deepLinkRouter.ts` and the hub redirect script list class numbers, so extend them too.

## Gita for Students (`src/lib/gita/`)
- One file per adhyaya (`adhyayaN.ts`) exporting a `GitaAdhyaya`: name, en/hi title, story context, 3-line crux, and
  shlokas. Each shloka: `ref` (Gita Press numbering; `altRef` if other editions differ, e.g. Chapter 1 has 46 verses in
  Vaishnava editions), `levels` (1 = Classes 6–8, 2 = 9–10, 3 = 11–12), speaker, two-line text ending ` ।` / ` ॥`,
  ≥4 word meanings, meaning, a school-life `situation`, a `reflect` question, and exactly 2 questions (understanding, then
  applying it to a situation). All prose in **en and hi**.
- Situations: everyday Indian school life, gender-balanced names, age-appropriate for the level; never trivialise the
  verse. Avoid verses whose numbering differs between editions unless you add `altRef`.
- A new adhyaya needs: the file, its number in `GITA_AVAILABLE`, `src/components/gita/AdhyayaNStudy.tsx`, a static
  `{n === N && <AdhyayaNStudy client:load …/>}` line plus the `CHAPTERS` map entry in `modules/gita/[adhyaya].astro`,
  and the import in `modules/gita/index.astro`. `tests/unit/gitaContent.test.ts` checks the shape.
- Hindi prompts must not be transliterated: `GitaStudy` passes `transliterateText={false}` to `TopicQuiz` for hi.
- An English translation EPUB with verse numbers (Vaishnava numbering) can be used to cross-check meanings; it has no Devanagari.

## New quiz module (e.g. Gita study mode)
- Put content in `src/lib/<module>/…` with the same `QuizTopic` shape. Use one island wrapper per page-sized chunk
  (graded level or adhyaya), so no page ships the whole bank.
- Give it its own store key (`sb_<module>_v1`), pages under `src/pages/[lang]/modules/<module>/`, and add any dynamic routes to `sitemap.xml.ts`.
- Localized page labels go in a small `<module>PageText.ts` (en/hi/ja/es), following `ncertPageText.ts`.

## Checks
```bash
npm run test:unit       # tests/unit/ncertContent.test.ts: 7–9 questions, unique ids, 4 distinct options, hint + explanation
npx astro build && npx playwright test -c playwright.tmp.config.ts --project=chromium --trace off \
  tests/sanskritbhashi.spec.ts tests/shastra-quiz.spec.ts tests/accessibility.spec.ts
```
Add a unit test for any new module's invariants (counts, id format, refs present). Then follow `ship-release`.
