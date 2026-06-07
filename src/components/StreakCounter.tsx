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
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold select-none cursor-help transition-all ${
        isActive
          ? "bg-saffron-50 border-saffron-500 text-saffron-600 shadow-sm shadow-saffron-100"
          : "bg-white dark:bg-zinc-900 border-charcoal/10 dark:border-zinc-800 text-charcoal/40"
      }`}
      title={isActive ? "Streak active! Great job." : "Complete a practice question to start your streak!"}
      id="tour-step-5"
    >
      <div className="relative">
        {isActive ? (
          <motion.div
            animate={{
              scale: [1, 1.15, 1, 1.2, 1],
              rotate: [0, -6, 6, -3, 0],
              y: [0, -3, 0, -4, 0]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-saffron-500"
          >
            <Flame className="w-5 h-5 fill-saffron-500 stroke-saffron-600 filter drop-shadow-[0_1px_3px_rgba(230,81,0,0.3)]" />
          </motion.div>
        ) : (
          <Flame className="w-5 h-5 opacity-40" />
        )}
        {isActive && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-marigold-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-marigold-500"></span>
          </span>
        )}
      </div>
      <span className="font-bold tabular-nums">{streak}</span>
      <span className="text-xs uppercase tracking-wide opacity-80 hidden sm:inline">Days</span>
    </div>
  );
}
