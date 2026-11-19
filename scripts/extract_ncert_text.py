#!/usr/bin/env python3
"""Extract chapter text from the NCERT Sanskrit PDFs (Deepakam, Classes 6-8).

The PDFs live on the `feat/adsense-learning-hub` branch under content/ncert/
(kept off main because of their size). Usage:

  python3 scripts/extract_ncert_text.py <pdf-dir> content/ncert_text

<pdf-dir> holds the PDFs (fsde1NN.pdf, gsde1NN.pdf, hsde1NN.pdf). Output is one
UTF-8 text file per chapter: content/ncert_text/class6/ch01.txt, ...
Requires `pdftotext` (poppler-utils).
"""
import re
import subprocess
import sys
from pathlib import Path

BOOKS = {"fsde": "class6", "gsde": "class7", "hsde": "class8"}
NOISE = re.compile(r"(Reprint|\.indd|^\s*\d+\s*$|^\s*$)")


def clean(text: str) -> str:
    lines = [ln.rstrip() for ln in text.splitlines()]
    lines = [ln for ln in lines if not NOISE.search(ln)]
    return "\n".join(lines) + "\n"


def main(src: str, dst: str) -> None:
    for pdf in sorted(Path(src).glob("*.pdf")):
        m = re.match(r"(fsde|gsde|hsde)1(\d\d)$", pdf.stem)
        if not m:
            continue  # prelims (…1ps) and anything else
        out = Path(dst) / BOOKS[m.group(1)] / f"ch{m.group(2)}.txt"
        out.parent.mkdir(parents=True, exist_ok=True)
        raw = subprocess.run(["pdftotext", str(pdf), "-"], capture_output=True, text=True, check=True).stdout
        out.write_text(clean(raw), encoding="utf-8")
        print(out)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
