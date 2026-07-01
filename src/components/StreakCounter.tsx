"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function StreakCounter() {
  const [streak, setStreak] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const getLocalDateString = () => {
    const d = new Date();
    // Format YYYY-MM-DD
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const getYesterdayDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const checkAndUpdateStreak = () => {
    const streakCount = parseInt(localStorage.getItem("streak_count") || "0", 10);
    const lastDate = localStorage.getItem("last_practice_date") || "";
    const today = getLocalDateString();
    const yesterday = getYesterdayDateString();

    if (lastDate === today) {
      setStreak(streakCount);
      setIsActive(true);
    } else if (lastDate === yesterday) {
      setStreak(streakCount);
      setIsActive(false); // Active yesterday, needs completion today to maintain
    } else {
      // Streak broken
      setStreak(0);
      setIsActive(false);
      localStorage.setItem("streak_count", "0");
    }
  };

  useEffect(() => {
    // Initial check
    checkAndUpdateStreak();

    // Listen for custom event when a practice card is completed successfully
    const handlePracticeCompleted = () => {
      const today = getLocalDateString();
      const lastDate = localStorage.getItem("last_practice_date") || "";
      let currentStreak = parseInt(localStorage.getItem("streak_count") || "0", 10);

      if (lastDate !== today) {
        currentStreak += 1;
        localStorage.setItem("streak_count", String(currentStreak));
        localStorage.setItem("last_practice_date", today);
      }

      setStreak(currentStreak);
      setIsActive(true);
    };

    window.addEventListener("practiceCompleted", handlePracticeCompleted);
    return () => window.removeEventListener("practiceCompleted", handlePracticeCompleted);
  }, []);

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold select-none cursor-help transition-all duration-300 ${
        isActive
          ? "bg-linear-to-r from-saffron-50 to-marigold-50 dark:from-saffron-500/10 dark:to-marigold-500/10 border-saffron-500/30 text-saffron-600 dark:text-saffron-400 shadow-[0_2px_10px_rgba(245,158,11,0.15)] hover:shadow-[0_2px_15px_rgba(245,158,11,0.25)] hover:border-saffron-500/50"
          : "bg-white dark:bg-zinc-900 border-charcoal/10 dark:border-zinc-800 text-charcoal/40 hover:bg-charcoal/5 dark:hover:bg-white/5"
      }`}
      title={isActive ? "Streak active! Great job." : "Complete a practice question to start your streak!"}
      id="tour-step-5"
    >
      <div className="relative flex items-center justify-center">
        {isActive && (
          <motion.div
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-4 h-4 m-auto bg-saffron-500 rounded-full blur-[6px] z-0"
          />
        )}
        {isActive ? (
          <motion.div
            animate={{
              scale: [1, 1.08, 0.95, 1.05, 1],
              rotate: [0, -4, 3, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <Flame className="w-5 h-5 fill-saffron-500 stroke-saffron-600 drop-shadow-[0_1px_2px_rgba(230,81,0,0.5)]" />
          </motion.div>
        ) : (
          <Flame className="w-5 h-5 opacity-40 relative z-10" />
        )}
      </div>
      <div className="flex items-baseline gap-1 relative z-10">
        <span className="font-black tabular-nums tracking-tight text-[15px]">{streak}</span>
        <span className="text-[10px] font-black uppercase tracking-widest opacity-80 hidden sm:inline pt-0.5">Days</span>
      </div>
    </div>
  );
}
