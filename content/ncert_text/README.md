# NCERT Sanskrit chapter text

Plain UTF-8 text of every NCERT Sanskrit textbook chapter, used as the source for
the School Prep quiz questions (`src/lib/ncert/`). Regenerate with:

```sh
python3 scripts/extract_ncert_text.py <folder-with-the-PDFs> content/ncert_text
```

The PDFs are on the `feat/adsense-learning-hub` branch under `content/ncert/`
(not merged into `main` because of their size, ~840 MB). Books typeset in the
legacy Kruti Dev font are converted with `scripts/krutidev_to_unicode.py`.

| Folder | Book | Lessons | Language | Quiz status |
|---|---|---|---|---|
| `class6/` | दीपकम् (Class 6) | 16 | Sanskrit | ✅ 16 lessons, 130 questions |
| `class7/` | दीपकम् (Class 7) | 12 + 3 appendices | Sanskrit | ✅ 12 lessons, 98 questions |
| `class8/` | दीपकम् (Class 8) | 13 + 3 appendices | Sanskrit | ✅ 13 lessons, 110 questions |
| `class9/sharada/` | शारदा (Class 9) | 11 + 5 appendices | Sanskrit | ✅ 11 lessons, 92 questions |
| `class10/shemushi/` | शेमुषी द्वितीयो भागः | 10 | Sanskrit (Kruti Dev) | ✅ 10 lessons, 87 questions |
| `class10/abhyasavan-bhava/` | अभ्यासवान् भव (writing & grammar practice) | 14 | Sanskrit | — not planned |
| `class9-10/vyakaranavithi/` | व्याकरणवीथिः (grammar, Classes 9–10) | 12 | Hindi | — not planned |
| `class11/bhaswati/` | भास्वती प्रथमो भागः (core) | 11 | Sanskrit (Kruti Dev) | ✅ 11 lessons, 91 questions |
| `class11/shashvati/` | शाश्वती प्रथमो भागः (elective) | 11 | Sanskrit (Kruti Dev) | ✅ 11 lessons, 90 questions |
| `class11/sahitya-parichay/` | संस्कृत साहित्य — परिचय | 12 | Hindi | — not planned |
| `class12/bhaswati/` | भास्वती द्वितीयो भागः (core) | 10 | Sanskrit (Kruti Dev) | ⏳ next |
| `class12/shashvati/` | शाश्वती द्वितीयो भागः (elective) | 11 | Sanskrit (Kruti Dev) | ⏳ next |

Plan (agreed): quizzes for the main readers only — शारदा, शेमुषी, भास्वती and
शाश्वती (64 lessons) — released one class per PR: Class 9, then 10, 11, 12.
The grammar and Hindi books stay as source text only.

Quiz ids: single-book classes use `c<class>-<NN>` (e.g. `c6-01`); classes with
several books pass a book key to `chapter(..., { key, short })` in
`src/lib/ncert/build.ts`, giving ids like `c10-shemushi-01`.
