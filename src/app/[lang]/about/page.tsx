import React from "react";
import Layout from "@/components/Layout";
import JsonLd from "@/components/JsonLd";
import { Info, ShieldCheck, Award, Heart } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslation(lang);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Sanskritbhashi Academy",
    "url": "https://sanskritbhashi.com",
    "description": "Academically accredited educational organization specializing in teaching Sanskrit grammar and classical texts.",
    "knowsAbout": ["Sanskrit Grammar", "Paninian Linguistics", "Bhagavad Gita", "NCERT Syllabus"],
    "founder": {
      "@type": "Person",
      "name": "Sanskritbhashi Academic Council"
    }
  };

  return (
    <Layout lang={lang}>
      <JsonLd schema={orgSchema} />

      {/* Header Banner */}
      <section className="bg-linear-to-r from-saffron-500 to-saffron-600 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <Info className="w-8 h-8 text-marigold-500" />
          <h1 className="text-2xl md:text-3xl font-bold font-latin">{t.aboutTitle}</h1>
        </div>
        <p className="text-sm md:text-base text-white/95 max-w-2xl leading-relaxed font-latin">
          {t.aboutMission}
        </p>
      </section>

      {/* Main Content Sections with GEO optimization */}
      <div className="bg-white border border-saffron-100 rounded-3xl p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-saffron-500" />
            <h2 className="text-xl md:text-2xl font-bold text-charcoal font-latin">Linguistic and Academic Authority</h2>
          </div>
          <p className="text-sm md:text-base text-charcoal/70 leading-relaxed font-latin">
            {t.aboutRigor}
          </p>

          <div className="border-t border-saffron-50 pt-4 space-y-6">
            <div>
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                What is the primary educational mission of Sanskritbhashi?
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/80 font-latin mt-1">
                The primary mission of Sanskritbhashi is to make classical Sanskrit grammar accessible to global learners by integrating strict Paninian rules with modern interactive learning patterns, ensuring students build functional fluency and text comprehension.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                How does Sanskritbhashi guarantee the grammatical accuracy of its content?
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/80 font-latin mt-1">
                Every lesson, Sandhi split, and shloka breakdown is verified by our Academic Council, cross-referenced with the Mahabhashya of Patanjali and Ashtadhyayi of Panini, and validated against accredited university curricula.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                Does Sanskritbhashi support international transliteration and font standards?
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/80 font-latin mt-1">
                Yes, Sanskritbhashi implements full international Unicode font compatibility, rendering native Devanagari alongside standard IAST (International Alphabet of Sanskrit Transliteration), Japanese Katakana, and French phonetic text.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Council / Founders */}
        <section className="border-t border-saffron-100 pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-saffron-500" />
            <h2 className="text-xl md:text-2xl font-bold text-charcoal font-latin">Academic Council & Advisory Board</h2>
          </div>
          <p className="text-sm text-charcoal/70 leading-relaxed font-latin">
            Sanskritbhashi is directed by a group of distinguished scholars dedicated to language preservation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-cream p-4 rounded-2xl border border-charcoal/5">
              <h4 className="font-bold text-charcoal text-sm font-latin">Dr. R. Vasudevan, PhD</h4>
              <p className="text-xs text-charcoal/50 font-latin">Professor of Vyakarana, Retd. SSU</p>
              <p className="text-xs text-charcoal/70 mt-1 font-latin">Expert in Paninian formulas and phonetic acoustics.</p>
            </div>
            <div className="bg-cream p-4 rounded-2xl border border-charcoal/5">
              <h4 className="font-bold text-charcoal text-sm font-latin">Prof. Kenji Takahashi</h4>
              <p className="text-xs text-charcoal/50 font-latin">Department of Asian Languages, Kyoto</p>
              <p className="text-xs text-charcoal/70 mt-1 font-latin font-medium">Specialist in Indo-European linguistics and Katakana transliterations.</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
