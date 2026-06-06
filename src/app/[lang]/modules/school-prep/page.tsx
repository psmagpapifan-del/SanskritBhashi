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
  Menu,
  ChevronLeft,
  Flame,
  CheckCircle,
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
import { curriculumChapters } from "@/lib/curriculumData";
 
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
  const [activeSource, setActiveSource] = useState<"core" | "ncert">("core");
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [navSidebarOpen, setNavSidebarOpen] = useState(true);
  const [mapOpen, setMapOpen] = useState(false);
 
  const [coreExpanded, setCoreExpanded] = useState(true);
  const [ncertExpanded, setNcertExpanded] = useState(false);
  const [selectedNcertClass, setSelectedNcertClass] = useState<number | null>(6);
 
  useEffect(() => {
    const cur = buildCurriculum();
    setCurriculum(cur);
 
    const prog = getProgress();
    setProgress(prog);
 
    // Default to the first uncompleted chapter in school-prep (Beginner/Professional)
    const schoolChapters = cur.filter((c) => c.tier === "beginner" || c.tier === "professional");
    const firstUncompleted = schoolChapters.find((c) => !prog.completedChapters.includes(c.id));
    if (firstUncompleted) {
      setActiveSource("core");
      setActiveChapterId(firstUncompleted.id);
    } else {
      setActiveSource("core");
      setActiveChapterId(1);
    }
  }, []);
 
  if (!progress || curriculum.length === 0) {
    return <div className="p-8 text-center text-charcoal/50 font-latin">{t.practice.loading}</div>;
  }
 
  const activeChapter = activeSource === "core"
    ? (curriculum.find((c) => c.id === activeChapterId) || curriculum[0])
    : (curriculumChapters.find((c) => c.id === activeChapterId) || curriculumChapters[0]);
 
  const activeQuestions = activeChapter.questions;
  const currentQuestion = activeQuestions[currentQIndex] || activeQuestions[0];
  const isChapterFinished = activeSource === "core" && progress.completedChapters.includes(activeChapterId);
 
  const handleNextQuestion = () => {
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Complete active chapter (only registered if Core chapter)
      if (activeSource === "core" && !progress.completedChapters.includes(activeChapterId)) {
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
      } else if (activeSource === "ncert") {
        // Increment streak for completing custom chapters too
        const today = new Date().toISOString().split("T")[0];
        let nextStreak = progress.streakCount;
        if (progress.lastPracticeDate !== today) {
          nextStreak += 1;
        }
        const nextProgress = {
          ...progress,
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
    if (activeSource === "core") {
      const nextCompleted = progress.completedChapters.filter((id) => id !== activeChapterId);
      const nextProgress = { ...progress, completedChapters: nextCompleted };
      setProgress(nextProgress);
      saveProgress(nextProgress);
    }
  };
 
  const selectChapterFromMap = (chapterId: number) => {
    setActiveSource("core");
    setActiveChapterId(chapterId);
    setCurrentQIndex(0);
    setMapOpen(false);
  };
 
  const coreInstances = curriculum
    .filter((c) => c.tier === "beginner" || c.tier === "professional")
    .map((c) => ({
      "@type": "CourseInstance",
      "name": localizeChapterName(c.name, lang),
      "courseMode": "online",
      "description": `Core progression chapter covering Sanskrit grammar rules.`
    }));
 
  const ncertInstances = curriculumChapters.map((c) => ({
    "@type": "CourseInstance",
    "name": c.name,
    "courseMode": "online",
    "description": `NCERT Class ${c.ncertClass} Chapter ${c.chapterNumber} syllabus practice.`
  }));
 
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": t.schoolPrep.title,
    "description": t.schoolPrep.desc,
    "provider": {
      "@type": "Organization",
      "name": "Sanskritbhashi",
      "url": "https://sanskritbhashi.com"
    },
    "hasCourseInstance": [...coreInstances, ...ncertInstances]
  };
 
  const totalChapters = curriculum.length;
  const completedChaptersCount = progress.completedChapters.length;
  const percentComplete = Math.round((completedChaptersCount / totalChapters) * 100);
 
  return (
    <Layout lang={lang}>
      <JsonLd schema={courseSchema} />
 
      {/* 3-Column Chassis Layout Grid */}
      <div className="flex flex-col xl:flex-row gap-6 items-stretch min-h-[75vh]">
        
        {/* COLUMN 1: LEFT CHAPTER SIDEBAR NAVIGATION (25%) */}
        {navSidebarOpen && (
          <aside className="w-full xl:w-1/4 flex flex-col space-y-4 xl:sticky xl:top-20 self-start z-10">
            <div className="bg-white border border-saffron-100 rounded-3xl p-5 space-y-4">
              <h3 className="text-xs font-black text-charcoal/60 uppercase tracking-widest font-latin">
                Syllabus Navigation
              </h3>
              
              <div className="space-y-3">
                {/* Core Journey Section */}
                <div className="border border-saffron-100 rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => {
                      setCoreExpanded(!coreExpanded);
                      setNcertExpanded(false);
                    }}
                    className="w-full px-4 py-3 bg-saffron-50 hover:bg-saffron-100 flex items-center justify-between text-xs font-bold text-saffron-800 uppercase tracking-wider cursor-pointer"
                  >
                    <span>🏆 Core Journey Tiers</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${coreExpanded ? "rotate-90" : ""}`} />
                  </button>
                  
                  {coreExpanded && (
                    <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto bg-white">
                      <div className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest px-2 py-1">
                        Beginner Tiers (1-30)
                      </div>
                      {curriculum.filter(c => c.tier === "beginner").map(c => {
                        const active = activeSource === "core" && activeChapterId === c.id;
                        const completed = progress.completedChapters.includes(c.id);
                        return (
                          <button
                            key={c.id}
                            onClick={() => {
                              setActiveSource("core");
                              setActiveChapterId(c.id);
                              setCurrentQIndex(0);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between items-center transition-colors cursor-pointer ${
                              active
                                ? "bg-saffron-500 text-white font-bold"
                                : "hover:bg-saffron-50 text-charcoal"
                            }`}
                          >
                            <span className="truncate">{localizeChapterName(c.name, lang)}</span>
                            {completed && <CheckCircle className={`w-3.5 h-3.5 ${active ? "text-white" : "text-emerald-500"}`} />}
                          </button>
                        );
                      })}
 
                      <div className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest px-2 py-1 pt-3">
                        Professional Tiers (31-60)
                      </div>
                      {curriculum.filter(c => c.tier === "professional").map(c => {
                        const active = activeSource === "core" && activeChapterId === c.id;
                        const completed = progress.completedChapters.includes(c.id);
                        return (
                          <button
                            key={c.id}
                            onClick={() => {
                              setActiveSource("core");
                              setActiveChapterId(c.id);
                              setCurrentQIndex(0);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between items-center transition-colors cursor-pointer ${
                              active
                                ? "bg-saffron-500 text-white font-bold"
                                : "hover:bg-saffron-50 text-charcoal"
                            }`}
                          >
                            <span className="truncate">{localizeChapterName(c.name, lang)}</span>
                            {completed && <CheckCircle className={`w-3.5 h-3.5 ${active ? "text-white" : "text-emerald-500"}`} />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
 
                {/* NCERT Class Syllabus Section */}
                <div className="border border-saffron-100 rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => {
                      setNcertExpanded(!ncertExpanded);
                      setCoreExpanded(false);
                    }}
                    className="w-full px-4 py-3 bg-saffron-50 hover:bg-saffron-100 flex items-center justify-between text-xs font-bold text-saffron-800 uppercase tracking-wider cursor-pointer"
                  >
                    <span>📚 NCERT Class Syllabus</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${ncertExpanded ? "rotate-90" : ""}`} />
                  </button>
 
                  {ncertExpanded && (
                    <div className="p-3 bg-white space-y-3">
                      {/* Class selection pills */}
                      <div className="grid grid-cols-4 gap-1">
                        {[6, 7, 8, 9, 10, 11, 12].map(cl => (
                          <button
                            key={cl}
                            onClick={() => setSelectedNcertClass(cl)}
                            className={`py-1.5 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer border ${
                              selectedNcertClass === cl
                                ? "bg-saffron-500 border-saffron-600 text-white"
                                : "bg-cream border-charcoal/5 text-charcoal hover:bg-saffron-50"
                            }`}
                          >
                            Cl {cl}
                          </button>
                        ))}
                      </div>
 
                      {/* Chapters for selected class */}
                      <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
                        {curriculumChapters.filter(c => c.ncertClass === selectedNcertClass).length === 0 ? (
                          <p className="text-[10px] text-charcoal/40 italic p-2 text-center">
                            No custom chapters ingested for Class {selectedNcertClass} yet.
                          </p>
                        ) : (
                          curriculumChapters
                            .filter(c => c.ncertClass === selectedNcertClass)
                            .map(c => {
                              const active = activeSource === "ncert" && activeChapterId === c.id;
                              return (
                                <button
                                  key={c.id}
                                  onClick={() => {
                                    setActiveSource("ncert");
                                    setActiveChapterId(c.id);
                                    setCurrentQIndex(0);
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                    active
                                      ? "bg-saffron-500 text-white font-bold"
                                      : "hover:bg-saffron-50 text-charcoal"
                                  }`}
                                >
                                  <span className="truncate">{c.name}</span>
                                </button>
                              );
                            })
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        )}
 
        {/* COLUMN 2: CENTER WORKSPACE (Practice Panel Front & Center - 50%) */}
        <div className="flex-1 w-full xl:w-2/4 flex flex-col justify-between space-y-6">
          
          {/* Header Progress and Action bar */}
          <div className="bg-white border border-saffron-100 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNavSidebarOpen(!navSidebarOpen)}
                className="p-2 rounded-xl hover:bg-saffron-50 border border-charcoal/5 flex items-center justify-center cursor-pointer"
                title={navSidebarOpen ? "Collapse Navigation Sidebar" : "Expand Navigation Sidebar"}
              >
                {navSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-[10px] font-bold uppercase tracking-wider text-charcoal/40 font-latin">
                  {t.schoolPrep.title}
                </h1>
                <h2 className="text-sm font-black text-charcoal flex items-center gap-1.5 font-latin">
                  <span>{activeSource === "core" ? localizeChapterName(activeChapter.name, lang) : activeChapter.name}</span>
                </h2>
              </div>
            </div>
 
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl hover:bg-saffron-50 border border-charcoal/5 flex items-center justify-center cursor-pointer"
                title={sidebarOpen ? "Collapse Rules Sidebar" : "Expand Rules Sidebar"}
              >
                <Layers className="w-5 h-5 text-charcoal/60" />
              </button>
              <button
                onClick={() => setMapOpen(true)}
                className="px-4 py-2 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-saffron-500/10 cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Journey</span>
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
                    {t.practice.chapterAccomplishedDesc.replace("{chapterName}", activeSource === "core" ? localizeChapterName(activeChapter.name, lang) : activeChapter.name)}
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
                      if (activeSource === "core") {
                        const nextCh = curriculum.find((c) => c.id === activeChapterId + 1);
                        if (nextCh) {
                          setActiveChapterId(nextCh.id);
                          setCurrentQIndex(0);
                        } else {
                          setMapOpen(true);
                        }
                      } else {
                        // For NCERT class, load next chapter in list if available
                        const ncertChs = curriculumChapters.filter(c => c.ncertClass === selectedNcertClass);
                        const currentIdx = ncertChs.findIndex(c => c.id === activeChapterId);
                        if (currentIdx !== -1 && currentIdx < ncertChs.length - 1) {
                          setActiveChapterId(ncertChs[currentIdx + 1].id);
                          setCurrentQIndex(0);
                        } else {
                          setNavSidebarOpen(true);
                        }
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
 
        {/* COLUMN 3: RIGHT COLLAPSIBLE SIDEBAR / PROGRESS PANEL (25%) */}
        {sidebarOpen && (
          <aside className="w-full xl:w-1/4 flex flex-col space-y-6 xl:sticky xl:top-20 self-start z-10">
            
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
 
            {/* Dynamic Grammar Rules list - GEO Structured with Semantic tags */}
            <div className="bg-white border border-saffron-100 rounded-3xl p-6 space-y-4 flex-1">
              <h3 className="text-xs font-black text-charcoal/60 uppercase tracking-widest font-latin">
                {t.practice.syllabusShorthand}
              </h3>
 
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {activeQuestions.map((q, idx) => (
                  <div
                    key={q.id || idx}
                    className="text-xs space-y-1.5 border-b border-saffron-50 pb-3 last:border-0 last:pb-0"
                    data-crawler-ref={`rules-school-ch${activeChapterId}`}
                  >
                    <h3 className="font-bold text-saffron-600 font-latin">
                      {q.conceptType || "Sutra Rule"}
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed font-latin">
                      {q.grammaticalRule}
                    </p>
                    <p className="text-[10px] text-charcoal/40 font-bold uppercase font-latin">
                      <span className="text-charcoal/50">Source:</span> <cite className="not-italic">{q.sourceAttribution}</cite>
                    </p>
                  </div>
                ))}
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
