#!/usr/bin/env python3
"""Convert Kruti Dev (legacy, non-Unicode) Devanagari text to Unicode.

Several NCERT Sanskrit readers (शेमुषी, भास्वती, शाश्वती: Classes 10–12) are
typeset in a Kruti Dev 010 variant, so `pdftotext` returns Latin gibberish such
as  'kqfpi;kZoj.ke~  for  शुचिपर्यावरणम्.  This module maps those glyphs back to
Unicode. It follows the standard Kruti Dev 010 layout plus the extra glyphs
NCERT's font uses (क written as o…Q, ङ्ग as Ä…õ, ¼ = द्ध, ¿ = ऽ, ¬ = ॐ …).

Usage:  python3 scripts/krutidev_to_unicode.py < in.txt > out.txt
"""
import re
import sys

# NCERT-specific glyphs first (they override the standard table).
NCERT = [
    ("=kQ", "क्र"), ("Þ", "ह्व"), ("ß", "ह्र"), ("‰", "द्भ"),  # उत्क्रान्त, जिह्वा, ह्रस्व, अद्भुत
    ("¬", "ॐ"), ("¿", "ऽ"), ("¼", "द्ध"), ("Í", "ऋ"), ("½", "ऋ"), ("Ük", "श"), ("Ü", "श्"), ("mQ", "ऊ"), ("Aa", "aA"), ("±", "Zं"),
    ("×", "ञ्"), ("μ", "ष्ट"),
    ("¶", "‘"), ("¸", "’"), ("éï°", "क्कु"), ("jQ", "रु"),  # quote marks around titles in NCERT's font
    ("Ñ", "कृ"), ("Ô", "्य"), ("Ï", "स्र"), ("Õ", "य्"), ("Ó", "च"), ("Ò", "व"), ("Ê", "ह्ण"),
    ("Â", "न्न"), ("É", "ह्न"), ("Û", "ञ्"), ("îõ", "ङ्ग"), ("õ", "ग"), ("\u0300", "ृ"),
    ("ð", ""), ("$", "+"), ("\\", "\u0001"), ("ú", "॰"), ("µ", "\u0002"), ("\x0c", "\n"), ("\x8f", ""),
]

# Standard Kruti Dev 010 → Unicode, longest keys first (order matters).
STANDARD = [
    ("ñ", "॰"), ("Q+Z", "QZ+"), ("sas", "sa"), ("aa", "a"), ("ZZ", "Z"),
    ("å", "०"), ("ƒ", "१"), ("„", "२"), ("…", "३"), ("†", "४"), ("‡", "५"), ("ˆ", "६"), ("‰", "७"),
    ("Š", "८"), ("‹", "९"),
    ("¶+", "फ़्"), ("d+", "क़"), ("[+k", "ख़"), ("[+", "ख़्"), ("x+", "ग़"), ("T+", "ज़्"), ("t+", "ज़"),
    ("M+", "ड़"), ("<+", "ढ़"), ("Q+", "फ़"), (";+", "य़"), ("j+", "ऱ"), ("u+", "ऩ"),
    ("Ùk", "त्त"), ("Ù", "त्त्"), ("ä", "क्त"), ("–", "दृ"), ("—", "कृ"), ("é", "न्न"), ("™", "न्न्"),
    ("à", "ह्न"), ("á", "ह्य"), ("â", "हृ"), ("ã", "ह्म"), ("ºz", "ह्र"), ("º", "ह्"), ("í", "द्द"),
    ("{k", "क्ष"), ("{", "क्ष्"), ("=k", "त्र"), ("=", "त्र्"), ("«", "त्र्"),
    ("Nî", "छ्य"), ("Vî", "ट्य"), ("Bî", "ठ्य"), ("Mî", "ड्य"), ("<î", "ढ्य"), ("|", "द्य"),
    ("K", "ज्ञ"), ("}", "द्व"), ("J", "श्र"), ("Vª", "ट्र"), ("Mª", "ड्र"), ("<ªª", "ढ्र"), ("Nª", "छ्र"),
    ("Ø", "क्र"), ("Ý", "फ्र"), ("nzZ", "र्द्र"), ("æ", "द्र"), ("ç", "प्र"), ("Á", "प्र"),
    ("xz", "ग्र"), ("#", "रु"), (":", "रू"),
    ("v‚", "ऑ"), ("vks", "ओ"), ("vkS", "औ"), ("vk", "आ"), ("v", "अ"), ("b±", "ईं"), ("Ã", "ई"),
    ("bZ", "ई"), ("b", "इ"), ("m", "उ"), ("Å", "ऊ"), (",s", "ऐ"), (",", "ए"), ("_", "ऋ"),
    ("ô", "क्क"), ("d", "क"), ("Dk", "क"), ("D", "क्"), ("[k", "ख"), ("[", "ख्"), ("x", "ग"),
    ("Xk", "ग"), ("X", "ग्"), ("Ä", "ङ"), ("?k", "घ"), ("?", "घ्"), ("³", "ङ"),
    ("pkS", "चै"), ("p", "च"), ("Pk", "च"), ("P", "च्"), ("N", "छ"), ("t", "ज"), ("Tk", "ज"), ("f", "ि"),
    ("T", "ज्"), (">", "झ"), ("÷", "झ्"), ("¥", "ञ"), ("ê", "ट्ट"), ("ë", "ट्ठ"), ("V", "ट"),
    ("B", "ठ"), ("ì", "ड्ड"), ("ï", "ड्ढ"), ("M", "ड"), ("<", "ढ"), (".k", "ण"), (".", "ण्"),
    ("r", "त"), ("Rk", "त"), ("R", "त्"), ("Fk", "थ"), ("F", "थ्"), ("n", "द"),
    ("/k", "धा"), ("èk", "ध"), ("/", "ध"), ("è", "ध्"), ("Ë", "ध्"), ("u", "न"), ("Uk", "न"),
    ("U", "न्"), ("i", "प"), ("Ik", "प"), ("I", "प्"), ("Q", "फ"), ("¶", "फ्"), ("c", "ब"),
    ("Ck", "ब"), ("C", "ब्"), ("Hk", "भ"), ("H", "भ्"), ("e", "म"), ("Ek", "म"), ("E", "म्"),
    (";", "य"), ("¸", "य्"), ("j", "र"), ("y", "ल"), ("Yk", "ल"), ("Y", "ल्"), ("G", "ळ"),
    ("o", "व"), ("Ok", "व"), ("O", "व्"), ("'k", "श"), ("'", "श्"), ('"k', "ष"), ('"', "ष्"),
    ("l", "स"), ("Lk", "स"), ("L", "स्"), ("g", "ह"),
    ("È", "ीं"), ("z", "्र"), ("ks", "ो"), ("kS", "ौ"), ("k", "ा"), ("h", "ी"), ("q", "ु"),
    ("w", "ू"), ("`", "ृ"), ("s", "े"), ("S", "ै"), ("a", "ं"), ("¡", "ँ"), ("%", "ः"), ("W", "ॅ"),
    ("•", "ऽ"), ("·", "ऽ"), ("~", "्"), ("+", "़"),
    ("AA", "॥"), ("A", "।"), ("&", "-"), ("¾", "="), ("@", "/"), ("^", "‘"), ("*", "’"),
    ("Þ", "“"), ("ß", "”"), ("]", ","), ("¯", ""), ("ª", "्र"),
]

CONS = "कखगघङचछजझञटठडढणतथदधनपफबभमयरलळवशषसह"
MATRA_AFTER = "ािीुूृॄेैोौंँः़"
V = "ा"


def convert(text: str) -> str:
    s = text
    # A literal question mark ends a sentence; elsewhere ? is the glyph घ्.
    s = re.sub(r"\?(?=[\s\)\]]|$)", "\u0001", s)
    # क is drawn as o + Q with any vowel signs typed in between: osQ = के, oqQ = कु.
    s = re.sub(r"o([sSaq`w¡z~Z]*)Q", lambda m: "d" + m.group(1), s)
    # क्त likewise: Ù + Q (सू fÙkQ = सूक्ति).
    s = re.sub(r"Ù([sSaq`w¡k]*)Q", lambda m: "ä" + m.group(1).replace("k", "", 1), s)
    # फ is drawn the same way from प: iQ = फ, iwQ = फू.
    s = re.sub(r"i([sSaq`w¡]*)Q", lambda m: "Q" + m.group(1) + "\u0000", s).replace("\u0000", "")
    # ङ्ग is drawn as Ä + õ, again with vowel signs in between: Äõ = ङ्ग, Ähõ = ङ्गी.
    s = re.sub(r"Ä([hsSaqw`k]*)õ", lambda m: "ङ्ग" + m.group(1), s)
    for a, b in NCERT:
        s = s.replace(a, b)
    for a, b in STANDARD:
        s = s.replace(a, b)

    cluster = f"(?:[{CONS}]़?्)*[{CONS}]़?"
    # £ is a combined ि + reph typed before its cluster: दु£भक्षे = दुर्भिक्षे.
    s = re.sub(f"£({cluster})", r"र्\1ि", s)
    # ि is typed before its consonant cluster: move it after the cluster.
    s = re.sub(f"ि({cluster})", r"\1ि", s)
    # Reph (Z) is typed after the syllable it sits on: move र् before the cluster.
    s = re.sub(f"({cluster})([{MATRA_AFTER}]*)Z", r"र्\1\2", s)
    s = s.replace("Z", "र्")
    # Tidy: dot-under nukta duplicates, stray spaces inside words from the PDF layout.
    s = s.replace("\u0001", "?").replace("\u0002", ":")
    s = s.replace("्ा", "")
    s = re.sub("ं(्र)", r"\1ं", s)  # राष्टंª → राष्ट्रं
    return s


if __name__ == "__main__":
    sys.stdout.write(convert(sys.stdin.read()))
