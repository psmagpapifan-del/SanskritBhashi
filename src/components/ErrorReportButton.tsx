"use client";

import React, { useState } from "react";
import { AlertTriangle, X, ShieldAlert, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTranslation } from "@/lib/i18n";

interface ErrorReportButtonProps {
  chapterId: number;
  questionText: string;
  lang: string;
  transliterationSettings: string;
}

export default function ErrorReportButton({
  chapterId,
  questionText,
  lang,
  transliterationSettings
}: ErrorReportButtonProps) {
  const t = getTranslation(lang);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("Inaccurate Vyakaran Rule");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const categories = [
    { value: "Inaccurate Vyakaran Rule", label: t.practice.categoryVyakaran },
    { value: "Audio Mismatch", label: t.practice.categoryAudio },
    { value: "Typo in Transliteration", label: t.practice.categoryTypo },
    { value: "Broken Translation", label: t.practice.categoryTranslation },
    { value: "Other Issue", label: t.practice.categoryOther }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const payload = {
      chapterId: String(chapterId),
      questionText,
      errorCategory: category,
      userDetails: details,
      lang,
      transliterationSettings,
      userAgent: typeof window !== "undefined" ? navigator.userAgent : "SSR"
    };

    try {
      const res = await fetch("/api/report-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStatus("success");
        setDetails("");
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
        }, 2500);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Small floating button style directly inside practice card */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200/50 bg-red-50/20 hover:bg-red-50 hover:border-red-400 text-red-600 transition-all text-xs font-semibold cursor-pointer select-none"
        title={t.practice.reportTitle}
      >
        <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
        <span>{t.practice.reportError}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              className="bg-white dark:bg-zinc-900 border-2 border-red-500 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal transition-colors cursor-pointer p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-charcoal font-latin">{t.practice.reportTitle}</h3>
              </div>

              {status === "success" ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                  <p className="text-sm font-semibold text-charcoal/80">
                    {t.practice.reportSuccess}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Question Info summary */}
                  <div className="bg-cream rounded-2xl p-3 border border-charcoal/5 text-xs text-charcoal/60 leading-relaxed font-latin">
                    <p className="font-bold text-saffron-600">
                      {lang === "ja" ? "章 ID" : lang === "hi" ? "अध्याय आईडी" : lang === "es" ? "ID de Capítulo" : "Chapter ID"}: {chapterId}
                    </p>
                    <p className="truncate">
                      <span className="font-bold">
                        {lang === "ja" ? "テキスト" : lang === "hi" ? "पाठ" : lang === "es" ? "Texto" : "Text"}:
                      </span>{" "}
                      {questionText}
                    </p>
                  </div>

                  {/* Micro-categories dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-2 font-latin">
                      {t.practice.reportCategory}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-charcoal/10 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:outline-hidden focus:border-red-400 font-latin text-charcoal"
                    >
                      {categories.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Details custom text */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-2 font-latin">
                      {t.practice.reportDetails}
                    </label>
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      rows={4}
                      placeholder={t.practice.reportPlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-charcoal/10 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:outline-hidden focus:border-red-400 font-latin text-charcoal placeholder-charcoal/30 resize-none"
                      required
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs font-semibold text-red-500">
                      {t.practice.reportErrorMsg}
                    </p>
                  )}

                  {/* Submit buttons */}
                  <div className="flex justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 rounded-xl border border-charcoal/10 text-charcoal font-semibold text-sm hover:bg-charcoal/5 transition-colors cursor-pointer"
                    >
                      {t.practice.reportCancel}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm shadow-md shadow-red-500/10 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      {isSubmitting ? t.practice.reportSubmitting : t.practice.reportSubmit}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
