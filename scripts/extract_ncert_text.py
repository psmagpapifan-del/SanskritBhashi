#!/usr/bin/env python3
"""Extract chapter text from the NCERT Sanskrit PDFs (Classes 6-12).

The PDFs live on the `feat/adsense-learning-hub` branch under content/ncert/
(kept off main because of their size). Usage:

  python3 scripts/extract_ncert_text.py <pdf-dir> content/ncert_text

<pdf-dir> holds the chapter PDFs (fsde101.pdf, jhsk101.pdf, …) from any class.
Output is one UTF-8 text file per chapter, e.g.
  content/ncert_text/class6/ch01.txt
  content/ncert_text/class10/shemushi/ch01.txt

Text is extracted with `pdftotext -raw` (keeps Devanagari conjuncts in order).
Books typeset in the legacy Kruti Dev font are converted to Unicode with
scripts/krutidev_to_unicode.py. Requires `pdftotext` (poppler-utils).
"""
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from krutidev_to_unicode import convert as krutidev_to_unicode  # noqa: E402

# NCERT file prefix → (output folder, legacy Kruti Dev font?)
BOOKS = {
    "fsde1": ("class6", False),                       # दीपकम् (Class 6)
    "gsde1": ("class7", False),                       # दीपकम् (Class 7)
    "hsde1": ("class8", False),                       # दीपकम् (Class 8)
    "ihsh1": ("class9/sharada", False),               # शारदा (Class 9)
    "jhva1": ("class9-10/vyakaranavithi", False),     # व्याकरणवीथिः (grammar, Classes 9–10, Hindi)
    "jsab1": ("class10/abhyasavan-bhava", False),     # अभ्यासवान् भव (practice book, Class 10)
    "jhsk1": ("class10/shemushi", True),              # शेमुषी द्वितीयो भागः (Class 10)
    "khsk1": ("class11/bhaswati", True),              # भास्वती प्रथमो भागः (core, Class 11)
    "khsk2": ("class11/shashvati", True),             # शाश्वती प्रथमो भागः (elective, Class 11)
    "klss1": ("class11/sahitya-parichay", False),     # संस्कृत साहित्य — परिचय (Hindi)
    "lhsk1": ("class12/bhaswati", True),              # भास्वती द्वितीयो भागः (core, Class 12)
    "lhsk2": ("class12/shashvati", True),             # शाश्वती द्वितीयो भागः (elective, Class 12)
}
NOISE = re.compile(r"(Reprint|\.indd|^\s*\d+\s*$|^\s*$)")


def clean(text: str) -> str:
    lines = [ln.rstrip() for ln in text.replace("\f", "\n").splitlines()]
    lines = [ln for ln in lines if not NOISE.search(ln)]
    return "\n".join(lines) + "\n"


def main(src: str, dst: str) -> None:
    for pdf in sorted(Path(src).glob("*.pdf")):
        m = re.match(r"([a-z]{4}\d)(\d\d)$", pdf.stem)
        if not m or m.group(1) not in BOOKS:
            continue  # prelims (…ps), appendices (…a1) and anything else
        folder, legacy = BOOKS[m.group(1)]
        out = Path(dst) / folder / f"ch{m.group(2)}.txt"
        out.parent.mkdir(parents=True, exist_ok=True)
        raw = subprocess.run(["pdftotext", "-raw", str(pdf), "-"], capture_output=True, text=True, check=True).stdout
        if legacy:
            raw = "\n".join(ln for ln in raw.splitlines() if "Reprint" not in ln)
            raw = krutidev_to_unicode(raw)
        out.write_text(clean(raw), encoding="utf-8")
        print(out)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
