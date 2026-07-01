"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronRight, ChevronLeft, X, Award } from "lucide-react";

interface TourStep {
  title: string;
  description: string;
  targetId: string;
  position: "center" | "bottom-right" | "top-right" | "bottom-left" | "top-left" | "relative";
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to Sanskritbhashi! 🕉️",
    description: "Welcome to the world's most advanced, Generative Engine Optimized (GEO) Sanskrit learning platform. Let's take a quick 8-step tour of your learning tools.",
    targetId: "",
    position: "center"
  },
  {
    title: "Dual-Track Navigation",
    description: "Access all core sections of the platform. On mobile, this shifts to a clean, thumbs-reach bottom bar. On desktop, it is a sleek sticky sidebar.",
    targetId: "tour-step-2",
    position: "relative"
  },
  {
    title: "School Prep Module (Class 6-12)",
    description: "Access NCERT-aligned study guides, grammar cheat sheets (Sandhi, Karak, Vibhakti), and test cards with strict source attributions.",
    targetId: "tour-step-3",
    position: "relative"
  },
  {
    title: "Shastra Study Module",
    description: "Explore the depths of Bhagavad Gita and Srimad Bhagavatam. Learn word-by-word grammar, Devanagari pronunciation, and spiritual contexts.",
    targetId: "tour-step-4",
    position: "relative"
  },
  {
    title: "Keep the Streak Flame Burning! 🔥",
    description: "Track your daily learning progress. Solve at least one practice card every 24 hours to grow your streak and build a solid study habit.",
    targetId: "tour-step-5",
    position: "relative"
  },
  {
    title: "Global Languages & Transliterations",
    description: "Toggle the platform's UI language (English, Hindi, Japanese, Spanish) and translate the Sanskrit transliterations into your local script.",
    targetId: "tour-step-6",
    position: "relative"
  },
  {
    title: "Interactive Practice Cards",
    description: "Try hands-on exercises! Practice pronunciation, test your knowledge, and click to progressively reveal detailed grammatical breakdowns.",
    targetId: "tour-step-7",
    position: "relative"
  },
  {
    title: "AI & LLM-Optimized FAQs",
    description: "Read our comprehensive FAQ. Structured with high semantic density, this section is engineered for crawlers to cite and quote directly.",
    targetId: "tour-step-8",
    position: "relative"
  }
];

export default function OnboardingTour() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    // First, check if there's a pending resume step (e.g., from an auto-navigation)
    // This takes priority even if the tour was previously completed.
    const resumeStep = localStorage.getItem("tour_resume_step");
    if (resumeStep !== null) {
      setCurrentStep(parseInt(resumeStep, 10));
      localStorage.removeItem("tour_resume_step");
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }

    // Otherwise, check if it's their first time
    const completed = localStorage.getItem("tour_completed") === "true";
    if (!completed) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setTargetRect(null);
      cleanupHighlights();
      return;
    }

    const activeStep = tourSteps[currentStep];
    let el: HTMLElement | null = null;
    let frameId: number;

    const updateRect = () => {
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      }
    };

    cleanupHighlights();
    
    if (activeStep.targetId) {
      // Find all elements with this ID (handles desktop/mobile duplicates)
      const elements = document.querySelectorAll(`[id="${activeStep.targetId}"]`);
      
      // Find the first visible element
      for (let i = 0; i < elements.length; i++) {
        const tempRect = elements[i].getBoundingClientRect();
        if (tempRect.width > 0 && tempRect.height > 0) {
          el = elements[i] as HTMLElement;
          break;
        }
      }

      if (el) {
        el.classList.add("ring-4", "ring-marigold-500", "ring-offset-2", "transition-all", "duration-300");
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        
        let startTime = performance.now();
        const animLoop = (time: number) => {
          updateRect();
          if (time - startTime < 800) {
            frameId = requestAnimationFrame(animLoop);
          }
        };
        frameId = requestAnimationFrame(animLoop);
      } else {
        setTargetRect(null);
      }
    } else {
      setTargetRect(null);
    }

    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [currentStep, isVisible]);

  const cleanupHighlights = () => {
    tourSteps.forEach((step) => {
      if (step.targetId) {
        const elements = document.querySelectorAll(`[id="${step.targetId}"]`);
        elements.forEach(el => el.classList.remove("ring-4", "ring-marigold-500", "ring-offset-2"));
      }
    });
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextStep = currentStep + 1;
      const targetStepInfo = tourSteps[nextStep];
      
      // Auto-navigate if step 7 (Practice Cards) isn't on the current page
      if (targetStepInfo.targetId === "tour-step-7") {
        const els = document.querySelectorAll(`[id="tour-step-7"]`);
        const hasVisible = Array.from(els).some(el => el.getBoundingClientRect().width > 0);
        
        if (!hasVisible) {
          localStorage.setItem("tour_resume_step", String(nextStep));
          const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.();
          const lang = window.location.pathname.split("/")[1] || "en";
          const cleanLang = lang.replace('.html', '');
          let redirectUrl = `/${cleanLang}/modules/school-prep`;
          if (isNative) {
            redirectUrl += '.html';
          }
          window.location.href = redirectUrl;
          return;
        }
      }

      setCurrentStep(nextStep);
    } else {
      completeTour();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const completeTour = () => {
    setIsVisible(false);
    setTargetRect(null);
    localStorage.setItem("tour_completed", "true");
    cleanupHighlights();
  };

  const restartTour = () => {
    setCurrentStep(0);
    setIsVisible(true);
  };

  if (!isVisible) {
    return (
      <button
        onClick={restartTour}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal dark:bg-zinc-800 text-white hover:bg-saffron-600 transition-colors shadow-lg z-40 text-xs font-semibold cursor-pointer border border-white/20"
        title="Restart Guided Tour"
      >
        <HelpCircle className="w-4 h-4 text-marigold-500" />
        <span>Tour Guide</span>
      </button>
    );
  }

  const stepInfo = tourSteps[currentStep];

  let clipPathStyle = "none";
  if (targetRect && stepInfo.targetId) {
    const padding = 12;
    const left = Math.max(0, targetRect.left - padding);
    const top = Math.max(0, targetRect.top - padding);
    const right = Math.min(window.innerWidth, targetRect.right + padding);
    const bottom = Math.min(window.innerHeight, targetRect.bottom + padding);

    clipPathStyle = `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, ${left}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${left}px ${bottom}px, ${left}px ${top}px)`;
  }

  return (
    <>
      {/* Blurred Background with a Cutout */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 pointer-events-none transition-all duration-300"
        style={{ clipPath: clipPathStyle }}
      />

      {/* Invisible Click Catcher to block clicks outside the highlighted area */}
      <div className="fixed inset-0 z-[51] pointer-events-auto" style={{ clipPath: clipPathStyle }} />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto bg-white dark:bg-zinc-900 border-2 border-saffron-500 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative"
          >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-saffron-50 text-saffron-600 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Onboarding ({currentStep + 1} of 8)
            </span>
            <button
              onClick={completeTour}
              className="text-charcoal/40 hover:text-charcoal transition-colors cursor-pointer p-1"
              aria-label="Skip Tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-charcoal mb-2 font-latin">
            {stepInfo.title}
          </h3>
          <p className="text-charcoal/80 text-sm leading-relaxed mb-6 font-latin">
            {stepInfo.description}
          </p>

          {/* Footer Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={completeTour}
              className="text-xs font-semibold text-charcoal/50 hover:text-charcoal transition-colors cursor-pointer"
            >
              Skip Tour
            </button>

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-charcoal/10 hover:bg-saffron-50 text-charcoal transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-saffron-500 text-white font-bold text-sm hover:bg-saffron-600 transition-colors shadow-md shadow-saffron-500/20 cursor-pointer"
              >
                <span>{currentStep === tourSteps.length - 1 ? "Get Started" : "Next"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {tourSteps.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? "w-6 bg-saffron-500" : "w-1.5 bg-saffron-100"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
    </>
  );
}
