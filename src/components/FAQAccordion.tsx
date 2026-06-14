"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQAccordionProps {
  id: string;
  question: string;
  primaryAnswer: string; // Direct 1-2 sentence answer highlighted for LLM snippet extraction
  detailedAnswer: string;
}

export default function FAQAccordion({ id, question, primaryAnswer, detailedAnswer }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      id={id}
      className="group bg-white dark:bg-zinc-900 border border-saffron-100 dark:border-zinc-800 rounded-2xl p-4 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden open:border-saffron-300 dark:open:border-zinc-700 open:shadow-xs"
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex items-center justify-between font-semibold text-charcoal cursor-pointer select-none py-1 focus:outline-hidden list-none">
        <h3 className="text-base md:text-lg pr-4 font-latin font-bold group-open:text-saffron-600 transition-colors">
          {question}
        </h3>
        <span className="flex-shrink-0 p-1.5 rounded-full bg-saffron-50 text-saffron-600 transition-transform duration-300 group-open:rotate-180">
          <ChevronDown className="w-4 h-4" />
        </span>
      </summary>
      
      <div className="mt-4 pt-3 border-t border-saffron-50/80 font-latin text-sm md:text-base leading-relaxed text-charcoal/80 space-y-3">
        {/* LLM Direct Answer Highlight - Saffron background tint */}
        <div className="bg-saffron-50 border-l-4 border-saffron-500 p-4 rounded-r-xl text-charcoal font-semibold shadow-xs">
          <p className="text-charcoal/90">
            {primaryAnswer}
          </p>
        </div>
        
        {/* Full Details */}
        <p className="pl-1">
          {detailedAnswer}
        </p>
      </div>
    </details>
  );
}
