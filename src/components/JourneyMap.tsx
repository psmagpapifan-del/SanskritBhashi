"use client";

import React, { useState, useEffect } from "react";
import { Lock, Unlock, Award, CheckCircle2, Play, Flame, HelpCircle, Hourglass, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserProgress,
  Chapter,
  Question,
  CurriculumTier,
  getProgress,
  saveProgress,
  buildCurriculum,
  generateQuestionsForChapter
} from "../lib/levelsEngine";

interface JourneyMapProps {
  currentLang: string;
  onSelectChapter?: (chapterId: number) => void;
  onClose?: () => void;
}

export default function JourneyMap({ currentLang, onSelectChapter, onClose }: JourneyMapProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [curriculum, setCurriculum] = useState<Chapter[]>([]);
  const [activeTier, setActiveTier] = useState<CurriculumTier>("beginner");
  
  // Diagnostic Gateway Test State
  const [testModal, setTestModal] = useState<{
    isOpen: boolean;
    tier: CurriculumTier;
    questions: Question[];
    currentQIndex: number;
    answers: number[];
    timeLeft: number;
    score?: number;
    passed?: boolean;
  } | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    setCurriculum(buildCurriculum());

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    window.addEventListener("openJourneyMap", handleOpen);
    window.addEventListener("closeJourneyMap", handleClose);
    return () => {
      window.removeEventListener("openJourneyMap", handleOpen);
      window.removeEventListener("closeJourneyMap", handleClose);
    };
  }, []);

  // Timer effect for Gateway diagnostic tests
  useEffect(() => {
    if (!testModal || !testModal.isOpen || testModal.timeLeft <= 0 || testModal.score !== undefined) return;
    
    const timer = setInterval(() => {
      setTestModal((prev) => {
        if (!prev) return null;
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          return { ...prev, timeLeft: 0, ...calculateScore(prev) };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testModal]);

  if (!isOpen) return null;

  if (!progress || curriculum.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div className="bg-cream rounded-3xl p-8 max-w-md w-full border border-saffron-100 text-center font-latin text-charcoal/50">
          Loading Sanskrit Learning Map...
        </div>
      </div>
    );
  }

  const isChapterUnlocked = (chapterId: number, tier: CurriculumTier): boolean => {
    if (tier === "beginner") {
      if (chapterId === 1) return true;
      return progress.completedChapters.includes(chapterId - 1);
    }
    if (tier === "professional") {
      const beginnerGatewayPassed = (progress.gatewayScores["beginner"] || 0) >= 80;
      if (!beginnerGatewayPassed) return false;
      if (chapterId === 31) return true;
      return progress.completedChapters.includes(chapterId - 1);
    }
    if (tier === "expert") {
      const professionalGatewayPassed = (progress.gatewayScores["professional"] || 0) >= 80;
      if (!professionalGatewayPassed) return false;
      if (chapterId === 61) return true;
      return progress.completedChapters.includes(chapterId - 1);
    }
    return false;
  };

  const isChapterCompleted = (chapterId: number): boolean => {
    return progress.completedChapters.includes(chapterId);
  };

  const getTierChapters = (tier: CurriculumTier) => {
    return curriculum.filter((c) => c.tier === tier);
  };

  // Launch Gateway diagnostic test
  const startGatewayTest = (tier: CurriculumTier) => {
    const chapters = getTierChapters(tier);
    const questions: Question[] = [];
    for (let idx = 0; idx < chapters.length; idx += 3) {
      const ch = chapters[idx];
      if (ch.questions && ch.questions.length > 0) {
        questions.push(ch.questions[0]);
      }
    }
    
    while (questions.length < 10) {
      const randomCh = chapters[Math.floor(Math.random() * chapters.length)];
      const randomQ = generateQuestionsForChapter(randomCh.id, tier)[0];
      questions.push(randomQ);
    }

    setTestModal({
      isOpen: true,
      tier,
      questions: questions.slice(0, 10),
      currentQIndex: 0,
      answers: new Array(10).fill(-1),
      timeLeft: 120
    });
  };

  const handleSelectAnswer = (ansIdx: number) => {
    if (!testModal || testModal.score !== undefined) return;
    const newAnswers = [...testModal.answers];
    newAnswers[testModal.currentQIndex] = ansIdx;
    setTestModal({ ...testModal, answers: newAnswers });
  };

  const calculateScore = (modal: any) => {
    let correct = 0;
    modal.questions.forEach((q: Question, idx: number) => {
      if (modal.answers[idx] === q.correctIndex) {
        correct++;
      }
    });
    const score = Math.round((correct / modal.questions.length) * 100);
    const passed = score >= 80;

    const updatedScores = { ...progress.gatewayScores, [modal.tier]: score };
    let updatedTier = progress.currentTier;
    
    if (passed) {
      if (modal.tier === "beginner" && progress.currentTier === "beginner") {
        updatedTier = "professional";
      } else if (modal.tier === "professional" && progress.currentTier === "professional") {
        updatedTier = "expert";
      }
    }

    const nextProgress = {
      ...progress,
      gatewayScores: updatedScores,
      currentTier: updatedTier
    };

    setProgress(nextProgress);
    saveProgress(nextProgress);

    return { score, passed };
  };

  const submitGatewayTest = () => {
    if (!testModal) return;
    setTestModal((prev) => {
      if (!prev) return null;
      return { ...prev, ...calculateScore(prev) };
    });
  };

  const isGatewayUnlockable = (tier: CurriculumTier): boolean => {
    const chapters = getTierChapters(tier);
    return chapters.every((c) => progress.completedChapters.includes(c.id));
  };

  const handleCloseMap = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-cream rounded-3xl p-6 border border-saffron-100 max-h-[85vh] max-w-2xl w-full overflow-y-auto select-none shadow-2xl relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black bg-linear-to-r from-saffron-500 to-saffron-600 bg-clip-text text-transparent font-latin">
              Sanskrit Progression Path
            </h2>
            <p className="text-xs text-charcoal/60 font-latin mt-0.5">
              Complete chapters sequentially. Pass timed gateway qualifying tests (&gt;=80%) to climb tiers.
            </p>
          </div>
          <button
            onClick={handleCloseMap}
            className="p-1.5 rounded-full border border-charcoal/10 hover:bg-saffron-50 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 text-charcoal/60"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5 p-1.5 bg-white dark:bg-zinc-900 border border-saffron-100 dark:border-zinc-800 rounded-2xl mb-8">
          {(["beginner", "professional", "expert"] as CurriculumTier[]).map((tier) => {
            const isTierUnlocked =
              tier === "beginner" ||
              (tier === "professional" && (progress.gatewayScores["beginner"] || 0) >= 80) ||
              (tier === "expert" && (progress.gatewayScores["professional"] || 0) >= 80);

            const active = activeTier === tier;

            return (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  active
                    ? "bg-saffron-500 text-white shadow-md shadow-saffron-500/10"
                    : "text-charcoal/60 hover:bg-saffron-50 hover:text-saffron-600"
                }`}
              >
                {isTierUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{tier}</span>
              </button>
            );
          })}
        </div>

        {/* Visual Timeline Path */}
        <div className="relative pl-6 border-l-2 border-dashed border-saffron-200 space-y-6 mb-6">
          {getTierChapters(activeTier).map((chapter, index) => {
            const unlocked = isChapterUnlocked(chapter.id, activeTier);
            const completed = isChapterCompleted(chapter.id);
            const active = unlocked && !completed && (index === 0 || isChapterCompleted(getTierChapters(activeTier)[index - 1]?.id));

            return (
              <div key={chapter.id} className="relative flex items-start gap-4">
                {/* Timeline Indicator Node */}
                <div
                  className={`absolute -left-[35px] top-1 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all ${
                    completed
                      ? "bg-marigold-500 border-marigold-600 text-white shadow-md shadow-marigold-300 animate-pulse"
                      : active
                      ? "bg-saffron-500 border-saffron-600 text-white shadow-lg shadow-saffron-400/30 ring-4 ring-saffron-100"
                      : unlocked
                      ? "bg-white border-saffron-500 text-saffron-600"
                      : "bg-slate-200 border-slate-300 text-slate-400"
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : active ? (
                    <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                  ) : unlocked ? (
                    <span className="w-1.5 h-1.5 bg-saffron-600 rounded-full" />
                  ) : (
                    <Lock className="w-2.5 h-2.5" />
                  )}
                </div>

                {/* Node Card */}
                <button
                  disabled={!unlocked}
                  onClick={() => {
                    const url = new URL(window.location.href);
                    url.searchParams.set("chapter", String(chapter.id));
                    const isExpert = chapter.tier === "expert";
                    url.searchParams.set("source", isExpert ? "core" : (url.searchParams.get("source") || "core"));
                    window.history.pushState({}, "", url.toString());
                    window.dispatchEvent(new Event("chapterChanged"));

                    if (onSelectChapter) onSelectChapter(chapter.id);
                    handleCloseMap();
                  }}
                  className={`flex-1 text-left p-4 rounded-2xl border transition-all ${
                    completed
                      ? "bg-white dark:bg-zinc-900 border-marigold-200 dark:border-zinc-800 shadow-xs hover:border-marigold-400 dark:hover:border-zinc-700 cursor-pointer"
                      : active
                      ? "bg-white dark:bg-zinc-900 border-saffron-400 dark:border-saffron-500/50 shadow-md shadow-saffron-50/50 cursor-pointer"
                      : unlocked
                      ? "bg-white dark:bg-zinc-900 border-saffron-100 dark:border-zinc-800 hover:border-saffron-300 dark:hover:border-zinc-700 cursor-pointer"
                      : "bg-slate-50 dark:bg-zinc-950/40 border-slate-200/60 dark:border-zinc-900/60 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4
                        className={`text-sm font-bold font-latin ${
                          completed ? "text-marigold-700 dark:text-marigold-400" : active ? "text-saffron-700 dark:text-saffron-400" : "text-charcoal"
                        }`}
                      >
                        {chapter.name}
                      </h4>
                      <p className="text-[10px] text-charcoal/40 font-semibold tracking-wider uppercase font-latin mt-1">
                        {chapter.questions.length} NCERT-Grammar Cards
                      </p>
                    </div>
                    {completed && (
                      <span className="text-[10px] font-bold text-marigold-600 bg-marigold-50 border border-marigold-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Completed
                      </span>
                    )}
                  </div>
                </button>
              </div>
            );
          })}

          {/* Locked Gateway Qualifying Exam Node */}
          {activeTier !== "expert" && (
            <div className="relative flex items-start gap-4 pt-4">
              <div
                className={`absolute -left-[39px] top-4 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                  (progress.gatewayScores[activeTier] || 0) >= 80
                    ? "bg-emerald-500 border-emerald-600 text-white shadow-md shadow-emerald-200"
                    : isGatewayUnlockable(activeTier)
                    ? "bg-saffron-500 border-saffron-600 text-white shadow-lg ring-4 ring-saffron-100 animate-pulse cursor-pointer"
                    : "bg-slate-300 border-slate-400 text-slate-500"
                }`}
              >
                <Award className="w-4 h-4" />
              </div>

              <div
                className={`flex-1 p-5 rounded-3xl border transition-all ${
                  (progress.gatewayScores[activeTier] || 0) >= 80
                    ? "bg-white dark:bg-zinc-900 border-emerald-200 dark:border-zinc-850"
                    : isGatewayUnlockable(activeTier)
                    ? "bg-white dark:bg-zinc-900 border-saffron-400 dark:border-saffron-500/50 shadow-md shadow-saffron-50"
                    : "bg-slate-50 dark:bg-zinc-950/40 border-slate-200/60 dark:border-zinc-900/60 opacity-60"
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-charcoal flex items-center gap-1.5 font-latin">
                      <span>Gateway Qualifying Diagnostic Exam</span>
                      {((progress.gatewayScores[activeTier] || 0) >= 80) && (
                        <span className="text-xs font-black text-emerald-600">Passed</span>
                      )}
                    </h4>
                    <p className="text-[10px] text-charcoal/50 leading-relaxed font-latin mt-1 max-w-md">
                      Timed comprehensive test covering all rules of the {activeTier} tier. You must achieve &gt;= 80% to unlock the next level tier.
                    </p>
                  </div>
                  
                  {isGatewayUnlockable(activeTier) && (progress.gatewayScores[activeTier] || 0) < 80 ? (
                    <button
                      onClick={() => startGatewayTest(activeTier)}
                      className="px-4 py-2 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-saffron-500/10 cursor-pointer"
                    >
                      Start Exam
                    </button>
                  ) : (progress.gatewayScores[activeTier] || 0) >= 80 ? (
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-latin bg-emerald-50 dark:bg-zinc-950/30 border border-emerald-100 dark:border-zinc-800 px-2 py-1 rounded-lg">
                        Score: {progress.gatewayScores[activeTier]}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-charcoal/40 flex items-center gap-1 bg-charcoal/5 px-2.5 py-1 rounded-lg select-none">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gateway timed diagnostic exam modal */}
        <AnimatePresence>
          {testModal && testModal.isOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-zinc-900 border-2 border-saffron-500 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-saffron-50 pb-4 mb-6">
                  <div>
                    <h3 className="text-lg font-black text-charcoal font-latin">
                      Gateway Diagnostic Exam: {testModal.tier.toUpperCase()}
                    </h3>
                    <p className="text-[10px] text-charcoal/40 font-semibold uppercase tracking-wider font-latin">
                      Question {testModal.currentQIndex + 1} of 10
                    </p>
                  </div>
                  {/* Timer */}
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 font-bold text-sm">
                    <Hourglass className="w-4 h-4 animate-spin" />
                    <span>{testModal.timeLeft}s</span>
                  </div>
                </div>

                {testModal.score !== undefined ? (
                  /* Results screen */
                  <div className="text-center py-6 space-y-4">
                    {testModal.passed ? (
                      <>
                        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                        <h4 className="text-2xl font-black text-emerald-600 font-latin">Qualifying Exam Passed!</h4>
                        <p className="text-sm text-charcoal/70 leading-relaxed font-latin">
                          Outstanding work! You scored **{testModal.score}%** and successfully unlocked the next learning tier of Sanskritbhashi.
                        </p>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto" />
                        <h4 className="text-2xl font-black text-red-600 font-latin">Exam Failed</h4>
                        <p className="text-sm text-charcoal/70 leading-relaxed font-latin">
                          You scored **{testModal.score}%**. A minimum of **80%** is required to unlock the next level tier. Review your grammar rules and try again.
                        </p>
                      </>
                    )}

                    <button
                      onClick={() => setTestModal(null)}
                      className="mt-6 px-6 py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                    >
                      Back to Map
                    </button>
                  </div>
                ) : (
                  /* Question screen */
                  <div>
                    {/* Sanskrit text */}
                    <div className="text-center py-6 bg-cream border border-saffron-50 rounded-2xl mb-6">
                      <span className="text-2xl font-extrabold text-saffron-600 font-sanskrit">
                        {testModal.questions[testModal.currentQIndex].phrase}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-3 font-latin">
                      Choose the correct option:
                    </p>

                    <div className="space-y-2.5 mb-6">
                      {testModal.questions[testModal.currentQIndex].options.map((opt, idx) => {
                        const isSelected = testModal.answers[testModal.currentQIndex] === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectAnswer(idx)}
                            className={`w-full px-4 py-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "border-saffron-500 bg-saffron-50 text-saffron-700"
                                : "border-charcoal/10 hover:border-saffron-500 hover:bg-saffron-50/10 text-charcoal"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Navigation footer */}
                    <div className="flex justify-between items-center border-t border-saffron-50 pt-4">
                      <button
                        disabled={testModal.currentQIndex === 0}
                        onClick={() => setTestModal({ ...testModal, currentQIndex: testModal.currentQIndex - 1 })}
                        className="px-4 py-2 rounded-lg border border-charcoal/10 text-charcoal text-xs font-bold disabled:opacity-40 cursor-pointer"
                      >
                        Previous
                      </button>

                      {testModal.currentQIndex < 9 ? (
                        <button
                          onClick={() => setTestModal({ ...testModal, currentQIndex: testModal.currentQIndex + 1 })}
                          className="px-5 py-2 rounded-lg bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          onClick={submitGatewayTest}
                          className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Submit Test
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
