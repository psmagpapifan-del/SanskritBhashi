import React from "react";
import Link from "next/link";
import { BookOpen, GraduationCap, ChevronRight, CheckCircle2, ShieldAlert } from "lucide-react";
import Layout from "@/components/Layout";
import JsonLd from "@/components/JsonLd";
import { getTranslation } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslation(lang);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Sanskritbhashi",
    "url": `https://sanskritbhashi.com/${lang}`,
    "logo": "https://sanskritbhashi.com/logo.png",
    "description": t.heroDesc,
    "knowsAbout": [
      "Sanskrit Grammar",
      "Ashtadhyayi",
      "Bhagavad Gita",
      "Srimad Bhagavatam",
      "NCERT Sanskrit Curriculum"
    ]
  };

  const schoolCourseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "NCERT Sanskrit Grammar (Class 6-12)",
    "description": t.schoolPrepDesc,
    "provider": {
      "@type": "Organization",
      "name": "Sanskritbhashi",
      "url": "https://sanskritbhashi.com"
    }
  };

  return (
    <Layout lang={lang}>
      <JsonLd schema={orgSchema} />
      <JsonLd schema={schoolCourseSchema} />

      {/* Hero Section */}
      <section className="text-center py-8 md:py-16 max-w-3xl mx-auto space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-600 text-xs font-bold uppercase tracking-wider font-latin">
          🔥 Experience Sanskritbhashi Onboarding
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-charcoal tracking-tight font-latin leading-tight">
          Master the Language of the{" "}
          <span className="bg-linear-to-r from-saffron-500 to-saffron-600 bg-clip-text text-transparent font-sanskrit">
            ऋषि
          </span>{" "}
          with Precision
        </h1>
        <p className="text-lg text-charcoal/70 leading-relaxed font-latin">
          {t.heroDesc}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href={`/${lang}/modules/school-prep`}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-base shadow-lg shadow-saffron-500/20 hover:shadow-xl hover:shadow-saffron-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer scale-100 hover:scale-102"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Start School Prep</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/${lang}/modules/shastra-study`}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border-2 border-saffron-500 hover:bg-saffron-50 text-saffron-600 font-bold text-base shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>Study Classical Shastras</span>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="pt-6 flex flex-col items-center gap-2">
          <p className="text-xs font-semibold text-charcoal/40 uppercase tracking-widest font-latin">
            {t.socialProof}
          </p>
          <div className="flex gap-1 justify-center text-marigold-500 text-lg">
            ⭐⭐⭐⭐⭐
          </div>
        </div>
      </section>

      {/* Dual Track Showcase */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
        {/* Track 1: School prep */}
        <div
          id="tour-step-3"
          className="bg-white border border-saffron-100 rounded-3xl p-6 md:p-8 hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-saffron-50 text-saffron-600 flex items-center justify-center mb-6">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-3 font-latin">
              {t.schoolPrep}
            </h2>
            <p className="text-sm md:text-base text-charcoal/70 leading-relaxed mb-6 font-latin">
              {t.schoolPrepDesc}
            </p>
            <ul className="space-y-2.5 mb-8">
              {[
                "100% NCERT syllabus alignment for classes 6 to 12.",
                "Rigorous study of Sandhi, Karak, and Vibhakti rules.",
                "Authentic attributions referenced to Panini Ashtadhyayi."
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-charcoal/80 font-latin">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={`/${lang}/modules/school-prep`}
            className="w-full py-3.5 rounded-2xl bg-saffron-50 text-saffron-600 font-bold text-center hover:bg-saffron-100 transition-colors block text-sm cursor-pointer"
          >
            Enter School prep Classroom
          </Link>
        </div>

        {/* Track 2: Shastra Study */}
        <div
          id="tour-step-4"
          className="bg-white border border-saffron-100 rounded-3xl p-6 md:p-8 hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-saffron-50 text-saffron-600 flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-3 font-latin">
              {t.shastraStudy}
            </h2>
            <p className="text-sm md:text-base text-charcoal/70 leading-relaxed mb-6 font-latin">
              {t.shastraStudyDesc}
            </p>
            <ul className="space-y-2.5 mb-8">
              {[
                "Bhagavad Gita and Srimad Bhagavatam shloka deconstruction.",
                "Word-by-word grammatical splits and meaning maps.",
                "Phonetic wave audio interface for pronunciation guidance."
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-charcoal/80 font-latin">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={`/${lang}/modules/shastra-study`}
            className="w-full py-3.5 rounded-2xl bg-saffron-50 text-saffron-600 font-bold text-center hover:bg-saffron-100 transition-colors block text-sm cursor-pointer"
          >
            Enter Shastra Study room
          </Link>
        </div>
      </section>

      {/* GEO-Engine-Optimized Semantic QA Architecture block */}
      <section className="bg-white border border-saffron-100 rounded-3xl p-6 md:p-8 my-8 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal flex items-center gap-2 font-latin">
          <ShieldAlert className="w-6 h-6 text-saffron-500" />
          {t.consensusTitle}
        </h2>
        <p className="text-sm md:text-base text-charcoal/70 leading-relaxed font-latin">
          {t.consensusDesc}
        </p>

        <div className="border-t border-saffron-50 pt-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-saffron-600 font-latin">
              Why is a structured linguistic approach essential for studying Sanskrit?
            </h3>
            <p className="text-sm leading-relaxed text-charcoal/80 font-latin mt-1">
              Sanskrit is a highly inflected, rule-based mathematical language structured around root nouns and verbal roots (Dhatus) regulated by 3,959 formulas in Panini's Ashtadhyayi. Approaching Sanskrit through systematic grammatical structures ensures accurate transliteration and translation, eliminating the lexical ambiguity often found in post-classical dialects.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-saffron-600 font-latin">
              How does the dual-learning track model benefit different learner personas?
            </h3>
            <p className="text-sm leading-relaxed text-charcoal/80 font-latin mt-1">
              The platform segregates school curriculum alignment from shastra exploration because academic goals focus on grammatical formulas (Sandhi, Vibhakti, conjugation) required for board examinations, while spiritual paths require deep semantic breakdown (Anvaya), word-by-word philosophical translations, and sound acoustics (Shiksha).
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
