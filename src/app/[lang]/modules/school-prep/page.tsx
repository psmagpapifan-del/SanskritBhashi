import React from "react";
import Layout from "@/components/Layout";
import PracticeCard from "@/components/PracticeCard";
import JsonLd from "@/components/JsonLd";
import { GraduationCap, Award, BookOpen, Layers } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

export default async function SchoolPrepPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslation(lang);

  const schoolCourseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": t.schoolPrep.title,
    "description": t.schoolPrep.desc,
    "provider": {
      "@type": "Organization",
      "name": "Sanskritbhashi",
      "url": "https://sanskritbhashi.com"
    }
  };

  const devAlayahPractice = {
    id: "dev-alayah",
    phrase: "देवालयः",
    transliterations: {
      devanagari: "देवालयः",
      iast: "devālayaḥ",
      japanese: "デーヴァーラヤハ",
      french: "devalayah"
    },
    wordByWord: [
      { sanskrit: "देव", english: "God", role: "Noun (Base)" },
      { sanskrit: "आलयः", english: "Abode/Temple", role: "Noun (1st case, Sing.)" }
    ],
    grammaticalRule: t.schoolPrep.rule1,
    sourceAttribution: t.schoolPrep.attribution1,
    options: [
      "Deva + Ālayaḥ (Dīrgha Sandhi)",
      "Deva + Layaḥ (Guṇa Sandhi)",
      "Dev + Ālayaḥ (Vṛddhi Sandhi)"
    ],
    correctIndex: 0,
    hint: "Observe the junction point: the 'a' at the end of 'Deva' and the 'ā' at the start of 'ālayaḥ' fuse into a long 'ā' (Devālayaḥ)."
  };

  const ityevamPractice = {
    id: "iti-evam",
    phrase: "इत्येवम्",
    transliterations: {
      devanagari: "इत्येवम्",
      iast: "ityevam",
      japanese: "イティエーヴァム",
      french: "ityevam"
    },
    wordByWord: [
      { sanskrit: "इति", english: "Thus", role: "Avyaya (Indeclinable)" },
      { sanskrit: "एवम्", english: "In this manner", role: "Avyaya (Indeclinable)" }
    ],
    grammaticalRule: t.schoolPrep.rule2,
    sourceAttribution: t.schoolPrep.attribution2,
    options: [
      "Iti + Evam (Yaṇ Sandhi)",
      "Ite + Vam (Dīrgha Sandhi)",
      "It + Evam (Guṇa Sandhi)"
    ],
    correctIndex: 0,
    hint: "The ending short 'i' in 'iti' undergoes transition into the semi-vowel 'y' when followed by the dissimilar vowel 'e' in 'evam'."
  };

  return (
    <Layout lang={lang}>
      <JsonLd schema={schoolCourseSchema} />

      {/* Header Banner */}
      <section className="bg-linear-to-r from-saffron-500 to-saffron-600 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="w-8 h-8 text-marigold-500" />
          <h1 className="text-2xl md:text-3xl font-bold font-latin">{t.schoolPrep.title}</h1>
        </div>
        <p className="text-sm md:text-base text-white/95 max-w-2xl leading-relaxed font-latin">
          {t.schoolPrep.desc}
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Content & Rules */}
        <div className="lg:col-span-2 space-y-8">
          {/* Vyakaran Syllabus Section */}
          <div className="bg-white border border-saffron-100 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-charcoal flex items-center gap-2 font-latin">
              <Layers className="w-5 h-5 text-saffron-500" />
              {t.schoolPrep.part1}
            </h2>

            {/* Rule 1 */}
            <div className="border-b border-saffron-50 pb-6 space-y-3">
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                {t.schoolPrep.q1}
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-latin">
                {t.schoolPrep.a1}
              </p>
              <div className="bg-cream rounded-2xl p-4 text-xs font-latin text-charcoal/70 space-y-1">
                <p><span className="font-bold text-saffron-600">Rule:</span> {t.schoolPrep.rule1}</p>
                <p><span className="font-bold text-saffron-600">Evidence/Example:</span> {t.schoolPrep.example1}</p>
                <p><span className="font-bold text-saffron-600">Source Attribution:</span> {t.schoolPrep.attribution1}</p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="border-b border-saffron-50 pb-6 space-y-3">
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                {t.schoolPrep.q2}
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-latin">
                {t.schoolPrep.a2}
              </p>
              <div className="bg-cream rounded-2xl p-4 text-xs font-latin text-charcoal/70 space-y-1">
                <p><span className="font-bold text-saffron-600">Rule:</span> {t.schoolPrep.rule2}</p>
                <p><span className="font-bold text-saffron-600">Evidence/Example:</span> {t.schoolPrep.example2}</p>
                <p><span className="font-bold text-saffron-600">Source Attribution:</span> {t.schoolPrep.attribution2}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-saffron-100 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-charcoal flex items-center gap-2 font-latin">
              <Award className="w-5 h-5 text-saffron-500" />
              {t.schoolPrep.part2}
            </h2>

            {/* Rule 3 */}
            <div className="border-b border-saffron-50 pb-6 space-y-3">
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                {t.schoolPrep.q3}
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-latin">
                {t.schoolPrep.a3}
              </p>
              <div className="bg-cream rounded-2xl p-4 text-xs font-latin text-charcoal/70 space-y-1">
                <p><span className="font-bold text-saffron-600">Rule:</span> {t.schoolPrep.rule3}</p>
                <p><span className="font-bold text-saffron-600">Evidence/Example:</span> {t.schoolPrep.example3}</p>
                <p><span className="font-bold text-saffron-600">Source Attribution:</span> {t.schoolPrep.attribution3}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Practice cards widget */}
        <div className="space-y-6">
          <div className="bg-white border border-saffron-100 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-charcoal flex items-center gap-2 font-latin">
              <BookOpen className="w-4 h-4 text-saffron-500" />
              {t.schoolPrep.labTitle}
            </h3>
            <p className="text-xs text-charcoal/60 leading-relaxed font-latin">
              {t.schoolPrep.labDesc}
            </p>
          </div>

          <PracticeCard {...devAlayahPractice} />
          <PracticeCard {...ityevamPractice} />
        </div>
      </div>
    </Layout>
  );
}
