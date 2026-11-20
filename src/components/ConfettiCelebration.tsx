"use client";

import { useEffect } from "react";

export default function ConfettiCelebration() {
  useEffect(() => {
    let active = true;
    let interval: any;

    const handleConfetti = async () => {
      // Respect the "reduce motion" accessibility setting.
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      const { default: confetti } = await import("canvas-confetti");
      if (!active) return;

      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 40 * (timeLeft / duration);
        // Theme colours come from the CSS tokens (src/styles/globals.css), so a re-theme needs no change here.
        const css = getComputedStyle(document.documentElement);
        const colors = ["--color-brand-500", "--color-accent-500", "--color-cream"]
          .map((v) => css.getPropertyValue(v).trim()).filter(Boolean).concat("#4CAF50");

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors
        });
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors
        });
      }, 200);
    };

    window.addEventListener("triggerConfetti", handleConfetti);
    return () => {
      active = false;
      if (interval) clearInterval(interval);
      window.removeEventListener("triggerConfetti", handleConfetti);
    };
  }, []);

  return null;
}
export function fireConfetti() {
  window.dispatchEvent(new Event("triggerConfetti"));
}
export function completePractice() {
  window.dispatchEvent(new Event("practiceCompleted"));
}
