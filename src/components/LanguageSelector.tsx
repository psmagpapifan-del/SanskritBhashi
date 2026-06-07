"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, Languages, ChevronDown, Check } from "lucide-react";

interface LanguageSelectorProps {
  currentLang: string;
  currentPathname: string;
}

const interfaceLanguages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "ja", name: "日本語 (Japanese)" },
  { code: "es", name: "Español (Spanish)" },
];

const transliterations = [
  { code: "devanagari", name: "Devanagari (देवनागरी)" },
  { code: "iast", name: "English (IAST Transliteration)" },
  { code: "japanese", name: "Japanese (Katakana)" },
  { code: "french", name: "French (Phonétique)" },
];

export default function LanguageSelector({ currentLang, currentPathname }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [transliteration, setTransliteration] = useState("iast");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read initial transliteration target from localStorage
    const saved = localStorage.getItem("transliteration_target");
    if (saved) {
      setTransliteration(saved);
    } else {
      localStorage.setItem("transliteration_target", "iast");
    }

    // Handle clicks outside of dropdown to close it
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInterfaceChange = (newLang: string) => {
    if (newLang === currentLang) return;
    
    // Replace the language segment in pathname
    // e.g. /en/about -> /hi/about
    const segments = currentPathname.split("/");
    segments[1] = newLang;
    const newPathname = segments.join("/");
    
    window.location.href = newPathname;
    setIsOpen(false);
  };

  const handleTransliterationChange = (newTarget: string) => {
    setTransliteration(newTarget);
    localStorage.setItem("transliteration_target", newTarget);
    
    // Trigger custom event so other components (like PracticeCard) update immediately
    window.dispatchEvent(new Event("transliterationChange"));
    setIsOpen(false);
  };

  const currentLangName = interfaceLanguages.find((l) => l.code === currentLang)?.name || "English";
  const currentTransName = transliterations.find((t) => t.code === transliteration)?.name || "English (IAST)";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-saffron-100 rounded-full bg-white text-charcoal hover:bg-saffron-50 hover:border-saffron-500 transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        id="tour-step-6"
      >
        <Globe className="w-4 h-4 text-saffron-500" />
        <span className="hidden md:inline">{currentLangName} / {currentTransName.split(" (")[0]}</span>
        <span className="inline md:hidden uppercase font-bold">{currentLang}</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl bg-white p-4 shadow-xl border border-saffron-100 z-50 animate-success-bounce">
          <div className="mb-4">
            <h4 className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2">
              <Globe className="w-3.5 h-3.5" /> Interface Language
            </h4>
            <div className="grid grid-cols-1 gap-1">
              {interfaceLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleInterfaceChange(lang.code)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                    currentLang === lang.code
                      ? "bg-saffron-500 text-white font-semibold"
                      : "hover:bg-saffron-50 text-charcoal"
                  }`}
                >
                  <span>{lang.name}</span>
                  {currentLang === lang.code && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-saffron-100 pt-3">
            <h4 className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2">
              <Languages className="w-3.5 h-3.5" /> Transliteration Script
            </h4>
            <div className="grid grid-cols-1 gap-1">
              {transliterations.map((trans) => (
                <button
                  key={trans.code}
                  onClick={() => handleTransliterationChange(trans.code)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                    transliteration === trans.code
                      ? "bg-marigold-500 text-charcoal font-semibold"
                      : "hover:bg-saffron-50 text-charcoal"
                  }`}
                >
                  <span>{trans.name}</span>
                  {transliteration === trans.code && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
