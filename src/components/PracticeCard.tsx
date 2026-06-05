"use client";

import React, { useState, useEffect } from "react";
import { Play, Volume2, HelpCircle, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fireConfetti, completePractice } from "./ConfettiCelebration";

interface PracticeCardProps {
  id: string;
  phrase: string; // Default Devanagari
  transliterations: {
    devanagari: string;
    iast: string;
    japanese: string;
    french: string;
  };
  wordByWord: { sanskrit: string; english: string; role: string }[];
  grammaticalRule: string;
  sourceAttribution: string; // e.g. Ashtadhyayi 6.1.77 or Gita 2.47
  options: string[];
  correctIndex: number;
  hint: string;
}

export default function PracticeCard({
  phrase,
  transliterations,
  wordByWord,
  grammaticalRule,
  sourceAttribution,
  options,
  correctIndex,
  hint
}: PracticeCardProps) {
  const [activeScript, setActiveScript] = useState("iast");
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealStep, setRevealStep] = useState(0); // 0: Question, 1: Meaning, 2: Grammar
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Read script on mount
    const saved = localStorage.getItem("transliteration_target");
    if (saved) setActiveScript(saved);

    // Listen to changes from LanguageSelector
    const handleScriptChange = () => {
      const current = localStorage.getItem("transliteration_target") || "iast";
      setActiveScript(current);
    };

    window.addEventListener("transliterationChange", handleScriptChange);
    return () => window.removeEventListener("transliterationChange", handleScriptChange);
  }, []);

  const getActiveText = () => {
    switch (activeScript) {
      case "devanagari":
        return transliterations.devanagari;
      case "japanese":
        return transliterations.japanese;
      case "french":
        return transliterations.french;
      case "iast":
      default:
        return transliterations.iast;
    }
  };

  const handlePlayAudio = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = "sa-IN"; // Sanskrit India locale
      utterance.rate = 0.7; // Slower speed for learning
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => {
        // Fallback simulated pulse if voice engine isn't configured
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 1500);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Browser doesn't support Web Speech API
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 1200);
    }
  };

  const handleOptionSelect = (index: number) => {
    if (feedback === "correct") return; // Prevent clicking after success

    setSelectedOption(index);
    if (index === correctIndex) {
      setFeedback("correct");
      setShowHint(false);
      fireConfetti();
      completePractice();
    } else {
      setFeedback("incorrect");
      setShowHint(true);
      // Reset feedback after shake animation to allow trying again
      setTimeout(() => {
        setFeedback(null);
      }, 600);
    }
  };

  return (
    <div
      id="tour-step-7"
      className={`bg-white border-2 rounded-3xl p-6 md:p-8 shadow-md transition-all duration-300 ${
        feedback === "correct"
          ? "border-emerald-500 shadow-lg shadow-emerald-50/50 bg-emerald-50/10 scale-101"
          : feedback === "incorrect"
          ? "border-red-500 animate-shake bg-red-50/5"
          : "border-saffron-100 hover:border-saffron-300"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40 font-latin">
          Interactive Practice
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-saffron-50 text-saffron-600 font-latin border border-saffron-100">
          Source: {sourceAttribution}
        </span>
      </div>

      {/* Sanskrit Phrase Text */}
      <div className="flex flex-col items-center text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-saffron-600 mb-2 font-sanskrit leading-relaxed">
          {transliterations.devanagari}
        </h3>
        
        {activeScript !== "devanagari" && (
          <p className="text-sm md:text-base font-semibold text-charcoal/70 italic max-w-lg leading-relaxed font-latin">
            {getActiveText()}
          </p>
        )}

        {/* Audio Button */}
        <button
          onClick={handlePlayAudio}
          className={`mt-4 flex items-center justify-center w-12 h-12 rounded-full border transition-all cursor-pointer ${
            isPlaying
              ? "bg-saffron-500 border-saffron-600 text-white animate-pulse"
              : "bg-saffron-50 border-saffron-200 text-saffron-600 hover:bg-saffron-100 hover:border-saffron-400"
          }`}
          title="Listen to pronunciation"
          aria-label="Listen to pronunciation"
        >
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <Play className="w-5 h-5 pl-0.5" />}
        </button>
      </div>

      {/* Multiple Choice Section */}
      <div className="space-y-3 mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2 font-latin">
          Identify the correct translation or rule:
        </p>
        <div className="grid grid-cols-1 gap-2.5">
          {options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === correctIndex;
            
            let btnClass = "border-charcoal/10 hover:border-saffron-500 hover:bg-saffron-50/30 text-charcoal";
            let Icon = null;

            if (feedback === "correct" && isCorrect) {
              btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold shadow-sm";
              Icon = CheckCircle2;
            } else if (isSelected && feedback === "incorrect") {
              btnClass = "border-red-500 bg-red-50 text-red-800 font-semibold";
              Icon = AlertCircle;
            } else if (isSelected) {
              btnClass = "border-saffron-500 bg-saffron-50 text-saffron-800 font-semibold";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={feedback === "correct"}
                className={`flex items-center justify-between w-full px-5 py-3.5 rounded-2xl border text-left text-sm transition-all duration-200 cursor-pointer min-h-[48px] ${btnClass}`}
              >
                <span>{option}</span>
                {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vyakaran Hint (Visible on Incorrect Choice) */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex gap-2.5"
          >
            <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Vyakaran Hint: </span>
              {hint}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progressive Revelation Section */}
      <div className="border-t border-saffron-100 pt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-3 font-latin">
          Progressive Revelation Study:
        </p>
        
        <div className="space-y-4">
          {/* Step 1: Word-by-Word Meaning */}
          {revealStep >= 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-cream p-4 rounded-2xl border border-charcoal/5"
            >
              <h4 className="text-xs font-bold text-saffron-600 uppercase tracking-wide mb-2.5 font-latin">
                Word-by-Word Vyakaran breakdown
              </h4>
              <div className="flex flex-wrap gap-2">
                {wordByWord.map((w, idx) => (
                  <div key={idx} className="bg-white border border-charcoal/5 rounded-xl p-2 flex flex-col items-center">
                    <span className="font-bold text-sm text-saffron-600 font-sanskrit">{w.sanskrit}</span>
                    <span className="text-xs text-charcoal/70 font-latin font-medium">{w.english}</span>
                    <span className="text-[9px] font-semibold text-charcoal/30 uppercase tracking-wider font-latin">{w.role}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setRevealStep(1)}
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl border-2 border-dashed border-saffron-200 text-saffron-600 hover:border-saffron-400 hover:bg-saffron-50/30 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>Reveal Word-by-Word Meaning</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          )}

          {/* Step 2: Grammatical Rules */}
          {revealStep >= 1 && (
            <>
              {revealStep >= 2 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-saffron-50/50 p-4 rounded-2xl border border-saffron-100"
                >
                  <h4 className="text-xs font-bold text-saffron-600 uppercase tracking-wide mb-2 font-latin">
                    Grammatical Rule & Paninian Analysis
                  </h4>
                  <p className="text-sm leading-relaxed text-charcoal/90 font-latin">
                    {grammaticalRule}
                  </p>
                </motion.div>
              ) : (
                <button
                  onClick={() => setRevealStep(2)}
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl border-2 border-dashed border-saffron-300 bg-saffron-50/10 text-saffron-700 hover:bg-saffron-50 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <span>Reveal Underlying Grammatical Rule</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
            </>
          )}

          {/* Collapse Option */}
          {revealStep > 0 && (
            <button
              onClick={() => setRevealStep(0)}
              className="flex items-center gap-1 text-xs font-semibold text-charcoal/40 hover:text-charcoal transition-colors mx-auto mt-2 cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Hide Details</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
