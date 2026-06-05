"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, BookMarked, Info, HelpCircle } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import StreakCounter from "./StreakCounter";
import OnboardingTour from "./OnboardingTour";
import ConfettiCelebration from "./ConfettiCelebration";

import { getTranslation } from "@/lib/i18n";

interface LayoutProps {
  children: React.ReactNode;
  lang: string;
}

export default function Layout({ children, lang }: LayoutProps) {
  const pathname = usePathname();
  const t = getTranslation(lang);

  const navItems = [
    { name: t.nav.home, href: `/${lang}`, icon: Home, id: "tour-step-1" },
    { name: t.nav.schoolPrep, href: `/${lang}/modules/school-prep`, icon: GraduationCap, id: "tour-step-3" },
    { name: t.nav.shastraStudy, href: `/${lang}/modules/shastra-study`, icon: BookMarked, id: "tour-step-4" },
    { name: t.nav.about, href: `/${lang}/about`, icon: Info },
    { name: t.nav.faqs, href: `/${lang}/faqs`, icon: HelpCircle, id: "tour-step-8" },
  ];

  const isActive = (href: string) => {
    if (href === `/${lang}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-dvh bg-cream text-charcoal">
      {/* Confetti & Tour Providers */}
      <ConfettiCelebration />
      <OnboardingTour />

      {/* MOBILE TOP BAR (Only visible on mobile/tablet) */}
      <header className="md:hidden sticky top-0 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-saffron-100 z-30 shadow-xs">
        <Link href={`/${lang}`} className="flex items-center gap-1.5">
          <span className="text-xl font-bold bg-linear-to-r from-saffron-500 to-saffron-600 bg-clip-text text-transparent font-sanskrit">
            संस्कृतभाषी
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40 font-latin hidden xs:inline">
            bhashi
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <StreakCounter />
          <LanguageSelector currentLang={lang} />
        </div>
      </header>

      {/* DESKTOP SIDEBAR (Only visible on desktop) */}
      <aside
        id="tour-step-2"
        className="hidden md:flex flex-col w-64 fixed h-dvh bg-white border-r border-saffron-100 p-6 z-20"
      >
        {/* Logo */}
        <Link href={`/${lang}`} className="flex flex-col gap-0.5 mb-8 select-none">
          <span className="text-2xl font-black bg-linear-to-r from-saffron-500 to-saffron-600 bg-clip-text text-transparent font-sanskrit">
            संस्कृतभाषी
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 font-latin pl-1">
            Sanskritbhashi.com
          </span>
        </Link>

        {/* Sidebar Nav */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                id={item.id}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-saffron-500 text-white shadow-md shadow-saffron-500/10 scale-102"
                    : "text-charcoal/70 hover:bg-saffron-50 hover:text-saffron-600"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-white" : "text-charcoal/40 group-hover:text-saffron-500"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-saffron-100 pt-4 text-center">
          <p className="text-[10px] font-bold text-charcoal/30 font-latin uppercase tracking-widest">
            © 2026 Sanskritbhashi
          </p>
        </div>
      </aside>

      {/* DESKTOP HEADER & CONTENT AREA */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* DESKTOP TOP HEADER */}
        <header className="hidden md:flex items-center justify-end h-16 px-8 bg-white/80 backdrop-blur-md border-b border-saffron-100 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <StreakCounter />
            <LanguageSelector currentLang={lang} />
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Duolingo style, only visible on mobile/tablet) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-saffron-100 flex items-center justify-around px-2 z-30 shadow-lg">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full min-w-[48px] min-h-[48px] transition-colors relative ${
                active ? "text-saffron-600" : "text-charcoal/50 hover:text-saffron-500"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold tracking-tight font-latin">
                {item.name.split(" ")[0]}
              </span>
              {active && (
                <span className="absolute bottom-1 w-1.5 h-1.5 bg-saffron-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
