"use client";

import React, { useState, useEffect } from "react";
import { HelpCircle, ChevronRight, ChevronLeft, X, Award } from "lucide-react";

import { langFromPath, tourText, type TourText } from "../lib/tourText";

export default function OnboardingTour() {
  // Tour text follows the page language (read once on the client; this island is client:only).
  const [text] = useState<TourText>(() => tourText(typeof window === "undefined" ? "en" : langFromPath(window.location.pathname)));
  const tourSteps = text.steps;
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
        el.classList.add("ring-4", "ring-accent-500", "ring-offset-2", "transition-all", "duration-300");
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
        elements.forEach(el => el.classList.remove("ring-4", "ring-accent-500", "ring-offset-2"));
      }
    });
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextStep = currentStep + 1;
      const targetStepInfo = tourSteps[nextStep];
      
      // Auto-navigate if step 7 (quiz options) isn't on the current page
      if (targetStepInfo.targetId === "tour-step-7") {
        const els = document.querySelectorAll(`[id="tour-step-7"]`);
        const hasVisible = Array.from(els).some(el => el.getBoundingClientRect().width > 0);
        
        if (!hasVisible) {
          localStorage.setItem("tour_resume_step", String(nextStep));
          const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.();
          const lang = window.location.pathname.split("/")[1] || "en";
          const cleanLang = lang.replace('.html', '');
          let redirectUrl = `/${cleanLang}/modules/school-prep/class-6`;
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
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal dark:bg-zinc-800 text-white hover:bg-brand-600 transition-colors shadow-lg z-40 text-xs font-semibold cursor-pointer border border-white/20"
        title={text.reopenTitle}
      >
        <HelpCircle className="w-4 h-4 text-accent-500" />
        <span>{text.reopen}</span>
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
          <div
            key={currentStep}
            className="pointer-events-auto bg-white dark:bg-zinc-900 border-2 border-brand-500 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative animate-pop-in"
          >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> {text.counter(currentStep + 1, tourSteps.length)}
            </span>
            <button
              onClick={completeTour}
              className="text-charcoal/70 hover:text-charcoal transition-colors cursor-pointer p-1"
              aria-label={text.skip}
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
              className="text-xs font-semibold text-charcoal/70 hover:text-charcoal transition-colors cursor-pointer"
            >
              {text.skip}
            </button>

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  aria-label={text.back}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-charcoal/10 hover:bg-brand-50 text-charcoal transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={handleNext}
                data-testid="tour-next"
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-brand-500 text-on-brand font-bold text-sm hover:brightness-110 transition-colors shadow-md shadow-brand-500/20 cursor-pointer"
              >
                <span>{currentStep === tourSteps.length - 1 ? text.finish : text.next}</span>
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
                  idx === currentStep ? "w-6 bg-brand-500" : "w-1.5 bg-brand-100"
                }`}
              />
            ))}
          </div>
        </div>
    </div>
    </>
  );
}
