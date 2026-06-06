"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import PracticeCard from "@/components/PracticeCard";
import AdSenseWidget from "@/components/AdSenseWidget";
import JourneyMap from "@/components/JourneyMap";
import JsonLd from "@/components/JsonLd";
import {
  GraduationCap,
  BookOpen,
  Layers,
  Award,
  ChevronRight,
  BookMarked,
  LayoutGrid,
  Menu,
  ChevronLeft,
  Flame,
  CheckCircle,
  HelpCircle,
  Undo
} from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import {
  UserProgress,
  Chapter,
  Question,
  getProgress,
  saveProgress,
  buildCurriculum
} from "@/lib/levelsEngine";

interface PageProps {
  params: Promise<{ lang: string }>;
}

function localizeChapterName(name: string, lang: string): string {
  if (lang === "en") return name;
  const parts = name.split(":");
  const prefix = parts[0];
  const suffix = parts[1] ? parts[1].trim() : "";
  
  let localizedPrefix = prefix;
  let localizedSuffix = suffix;
  
  const tierMatch = prefix.match(/^(BEGINNER|PROFESSIONAL|EXPERT)\s+Chapter\s+(\d+)$/i);
  if (tierMatch) {
    const tier = tierMatch[1].toUpperCase();
    const chNum = tierMatch[2];
    
    let locTier = tier;
    let locCh = `Chapter ${chNum}`;
    
    if (lang === "ja") {
      locTier = tier === "BEGINNER" ? "初級" : tier === "PROFESSIONAL" ? "中級" : "上級";
      locCh = `第${chNum}章`;
      localizedPrefix = `${locTier} ${locCh}`;
    } else if (lang === "hi") {
      locTier = tier === "BEGINNER" ? "प्रारंभिक" : tier === "PROFESSIONAL" ? "व्यावसायिक" : "विशेषज्ञ";
      locCh = `अध्याय ${chNum}`;
      localizedPrefix = `${locTier} ${locCh}`;
    } else if (lang === "es") {
      locTier = tier === "BEGINNER" ? "PRINCIPIANTE" : tier === "PROFESSIONAL" ? "PROFESIONAL" : "EXPERTO";
      locCh = `Capítulo ${chNum}`;
      localizedPrefix = `${locTier} ${locCh}`;
    }
  }
  
  if (suffix === "Vowels and Basic Sandhi") {
    localizedSuffix = lang === "ja" ? "母音の基礎と基本的なサンディ (連声)" : lang === "hi" ? "स्वर और बुनियादी संधि" : "Vocales y Sandhi Básico";
  } else if (suffix === "Advanced Kāraka Relations") {
    localizedSuffix = lang === "ja" ? "高度なカーラカ関係 (格関係)" : lang === "hi" ? "उन्नत कारक संबंध" : "Relaciones Avanzadas de Kāraka";
  } else if (suffix === "Shastra Commentary & Anvaya") {
    localizedSuffix = lang === "ja" ? "シャーストラ釈義とアンヴァヤ" : lang === "hi" ? "शास्त्र व्याख्या और अन्वय" : "Comentario de Shastra y Anvaya";
  } else if (suffix.startsWith("Curriculum Topic Part")) {
    const partNum = suffix.split(" ").pop();
    localizedSuffix = lang === "ja" ? `カリキュラムトピック パート ${partNum}` : lang === "hi" ? `पाठ्यक्रम विषय भाग ${partNum}` : `Tema del Currículo Parte ${partNum}`;
  }
  
  return parts[1] ? `${localizedPrefix}: ${localizedSuffix}` : localizedPrefix;
}

export default function SchoolPrepPage({ params }: PageProps) {
  const { lang } = React.use(params);
  const t = getTranslation(lang);

  // Curriculum and State
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [curriculum, setCurriculum] = useState<Chapter[]>([]);
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    const cur = buildCurriculum();
    setCurriculum(cur);

    const prog = getProgress();
    setProgress(prog);

    // Default to the first uncompleted chapter in school-prep (Beginner/Professional)
    const schoolChapters = cur.filter((c) => c.tier === "beginner" || c.tier === "professional");
    const firstUncompleted = schoolChapters.find((c) => !prog.completedChapters.includes(c.id));
    if (firstUncompleted) {
      setActiveChapterId(firstUncompleted.id);
    } else {
      setActiveChapterId(1);
    }
  }, []);

  if (!progress || curriculum.length === 0) {
    return <div className="p-8 text-center text-charcoal/50 font-latin">{t.practice.loading}</div>;
  }

  const activeChapter = curriculum.find((c) => c.id === activeChapterId) || curriculum[0];
  const activeQuestions = activeChapter.questions;
  const currentQuestion = activeQuestions[currentQIndex] || activeQuestions[0];
  const isChapterFinished = progress.completedChapters.includes(activeChapterId);

  const handleNextQuestion = () => {
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Complete active chapter
      if (!progress.completedChapters.includes(activeChapterId)) {
        const nextCompleted = [...progress.completedChapters, activeChapterId];
        
        // Update daily streak
        const today = new Date().toISOString().split("T")[0];
        let nextStreak = progress.streakCount;
        if (progress.lastPracticeDate !== today) {
          nextStreak += 1;
        }

        const nextProgress = {
          ...progress,
          completedChapters: nextCompleted,
          streakCount: nextStreak,
          lastPracticeDate: today
        };

        setProgress(nextProgress);
        saveProgress(nextProgress);
      }
    }
  };

  const restartChapter = () => {
    setCurrentQIndex(0);
    // Remove from completed if wanted, or just reset index
    const nextCompleted = progress.completedChapters.filter((id) => id !== activeChapterId);
    const nextProgress = { ...progress, completedChapters: nextCompleted };
    setProgress(nextProgress);
    saveProgress(nextProgress);
  };

  const selectChapterFromMap = (chapterId: number) => {
    setActiveChapterId(chapterId);
    setCurrentQIndex(0);
    setMapOpen(false);
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": t.schoolPrep.title,
    "description": t.schoolPrep.desc,
    "provider": {
      "@type": "Organization",
      "name": "Sanskritbhashi",
      "url": "https://sanskritbhashi.com"
    }
  };

  const totalChapters = curriculum.length;
  const completedChaptersCount = progress.completedChapters.length;
  const percentComplete = Math.round((completedChaptersCount / totalChapters) * 100);

  return (
    <Layout lang={lang}>
      <JsonLd schema={courseSchema} />

      {/* Main Chassis Layout Grid - 75% Domination on Desktop */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch min-h-[75vh]">
        
        {/* LEFT/CENTER WORKSPACE (Practice Panel Front & Center - 75%) */}
        <div className="flex-1 w-full lg:w-3/4 flex flex-col justify-between space-y-6">
          
          {/* Header Progress and Action bar */}
          <div className="bg-white border border-saffron-100 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl hover:bg-saffron-50 border border-charcoal/5 lg:flex items-center justify-center hidden cursor-pointer"
                title={sidebarOpen ? "Collapse Rules Sidebar" : "Expand Rules Sidebar"}
              >
                {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-[10px] font-bold uppercase tracking-wider text-charcoal/40 font-latin">
                  {t.schoolPrep.title}
                </h1>
                <h2 className="text-sm font-black text-charcoal flex items-center gap-1.5 font-latin">
                  <span>{localizeChapterName(activeChapter.name, lang)}</span>
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMapOpen(true)}
                className="px-4 py-2 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-saffron-500/10 cursor-pointer flex items-center gap-1.5"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{t.practice.learningMap}</span>
              </button>
            </div>
          </div>

          {/* Interactive Question Flow area */}
          <div className="flex-1 flex flex-col justify-center items-center">
            {isChapterFinished ? (
              /* Chapter Completion Screen */
              <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 text-center space-y-6 max-w-md w-full shadow-lg shadow-emerald-50/50">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <div>
                  <h3 className="text-xl font-black text-charcoal font-latin">{t.practice.chapterAccomplished}</h3>
                  <p className="text-sm text-charcoal/70 mt-2 font-latin leading-relaxed">
                    {t.practice.chapterAccomplishedDesc.replace("{chapterName}", localizeChapterName(activeChapter.name, lang))}
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={restartChapter}
                    className="flex-1 py-3 rounded-2xl border border-charcoal/10 hover:bg-saffron-50 text-charcoal font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Undo className="w-4 h-4" />
                    <span>{t.practice.practiceAgain}</span>
                  </button>
                  <button
                    onClick={() => {
                      const nextCh = curriculum.find((c) => c.id === activeChapterId + 1);
                      if (nextCh) {
                        setActiveChapterId(nextCh.id);
                        setCurrentQIndex(0);
                      } else {
                        setMapOpen(true);
                      }
                    }}
                    className="flex-1 py-3 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{t.practice.nextChapter}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* One Question at a Time Practice Card */
              <div className="w-full">
                <div className="flex justify-between items-center text-xs font-bold text-charcoal/40 font-latin px-2 mb-2">
                  <span>{t.practice.curriculumFlow}</span>
                  <span>{t.practice.questionOf.replace("{current}", String(currentQIndex + 1)).replace("{total}", String(activeQuestions.length))}</span>
                </div>
                
                <PracticeCard
                  {...currentQuestion}
                  chapterId={activeChapterId}
                  activeLang={lang}
                  onNextQuestion={handleNextQuestion}
                  hasNextQuestion={currentQIndex < activeQuestions.length - 1}
                  isCompleted={isChapterFinished}
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLLAPSIBLE SIDEBAR / PROGRESS PANEL (25%) */}
        {sidebarOpen && (
          <aside className="w-full lg:w-1/4 flex flex-col space-y-6 lg:sticky lg:top-20 self-start">
            
            {/* Sticky progress stats */}
            <div className="bg-white border border-saffron-100 rounded-3xl p-6 space-y-4 shadow-xs">
              <h3 className="text-xs font-black text-charcoal/60 uppercase tracking-widest font-latin">
                {t.practice.yourProgress}
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold font-latin">
                  <span className="text-charcoal/50">{t.practice.currentTier}</span>
                  <span className="text-saffron-600 uppercase">
                    {lang === "ja" ? (progress.currentTier === "beginner" ? "初級" : progress.currentTier === "professional" ? "中級" : "上級") : lang === "hi" ? (progress.currentTier === "beginner" ? "प्रारंभिक" : progress.currentTier === "professional" ? "व्यावसायिक" : "विशेषज्ञ") : progress.currentTier.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex justify-between text-xs font-bold font-latin">
                  <span className="text-charcoal/50">{t.practice.chaptersCompleted}</span>
                  <span className="text-charcoal">{completedChaptersCount} / {totalChapters}</span>
                </div>

                <div className="w-full bg-cream rounded-full h-2.5 overflow-hidden border border-saffron-100">
                  <div
                    className="bg-saffron-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 bg-saffron-50 border border-saffron-100 rounded-2xl p-3 text-xs font-bold text-saffron-700 font-latin">
                  <Flame className="w-5 h-5 text-saffron-500 animate-pulse fill-saffron-500" />
                  <span>{t.practice.streakCount}: {progress.streakCount} {t.practice.days}</span>
                </div>
              </div>
            </div>

            {/* Shorthand Grammar Rules list */}
            <div className="bg-white border border-saffron-100 rounded-3xl p-6 space-y-4 flex-1">
              <h3 className="text-xs font-black text-charcoal/60 uppercase tracking-widest font-latin">
                {t.practice.syllabusShorthand}
              </h3>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {/* Rule 1 */}
                <div className="text-xs space-y-1.5 border-b border-saffron-50 pb-3">
                  <p className="font-bold text-saffron-600 font-latin">{t.schoolPrep.q1}</p>
                  <p className="text-charcoal/70 leading-relaxed font-latin">{t.schoolPrep.rule1}</p>
                  <p className="text-[10px] text-charcoal/40 font-bold uppercase font-latin">{t.schoolPrep.attribution1}</p>
                </div>
                {/* Rule 2 */}
                <div className="text-xs space-y-1.5 border-b border-saffron-50 pb-3">
                  <p className="font-bold text-saffron-600 font-latin">{t.schoolPrep.q2}</p>
                  <p className="text-charcoal/70 leading-relaxed font-latin">{t.schoolPrep.rule2}</p>
                  <p className="text-[10px] text-charcoal/40 font-bold uppercase font-latin">{t.schoolPrep.attribution2}</p>
                </div>
                {/* Rule 3 */}
                <div className="text-xs space-y-1.5">
                  <p className="font-bold text-saffron-600 font-latin">{t.schoolPrep.q3}</p>
                  <p className="text-charcoal/70 leading-relaxed font-latin">{t.schoolPrep.rule3}</p>
                  <p className="text-[10px] text-charcoal/40 font-bold uppercase font-latin">{t.schoolPrep.attribution3}</p>
                </div>
              </div>
            </div>

            {/* Desktop AdSlot */}
            <AdSenseWidget slot="sidebar-ad-slot" variant="sidebar-ad" />
          </aside>
        )}
      </div>

      {/* Learning Progression Map Modal overlay */}
      <AnimatePresence>
        {mapOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl w-full shadow-2xl"
            >
              <JourneyMap
                currentLang={lang}
                onSelectChapter={selectChapterFromMap}
                onClose={() => setMapOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
