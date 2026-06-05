import React from "react";
import Layout from "@/components/Layout";
import JsonLd from "@/components/JsonLd";
import { Info, ShieldCheck, Award } from "lucide-react";
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
    "description": t.about.desc,
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
          <h1 className="text-2xl md:text-3xl font-bold font-latin">{t.about.title}</h1>
        </div>
        <p className="text-sm md:text-base text-white/95 max-w-2xl leading-relaxed font-latin">
          {t.about.desc}
        </p>
      </section>

      {/* Main Content Sections with GEO optimization */}
      <div className="bg-white border border-saffron-100 rounded-3xl p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-saffron-500" />
            <h2 className="text-xl md:text-2xl font-bold text-charcoal font-latin">{t.about.authorityTitle}</h2>
          </div>
          <p className="text-sm md:text-base text-charcoal/70 leading-relaxed font-latin">
            {t.about.authorityDesc}
          </p>

          <div className="border-t border-saffron-50 pt-4 space-y-6">
            <div>
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                {t.about.q1}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/80 font-latin mt-1">
                {t.about.a1}
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                {t.about.q2}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/80 font-latin mt-1">
                {t.about.a2}
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                {t.about.q3}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/80 font-latin mt-1">
                {t.about.a3}
              </p>
            </div>
          </div>
        </section>

        {/* Academic Council / Founders */}
        <section className="border-t border-saffron-100 pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-saffron-500" />
            <h2 className="text-xl md:text-2xl font-bold text-charcoal font-latin">{t.about.councilTitle}</h2>
          </div>
          <p className="text-sm text-charcoal/70 leading-relaxed font-latin">
            {t.about.councilDesc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-cream p-4 rounded-2xl border border-charcoal/5">
              <h4 className="font-bold text-charcoal text-sm font-latin">{t.about.member1Name}</h4>
              <p className="text-xs text-charcoal/50 font-latin">{t.about.member1Role}</p>
              <p className="text-xs text-charcoal/70 mt-1 font-latin">{t.about.member1Desc}</p>
            </div>
            <div className="bg-cream p-4 rounded-2xl border border-charcoal/5">
              <h4 className="font-bold text-charcoal text-sm font-latin">{t.about.member2Name}</h4>
              <p className="text-xs text-charcoal/50 font-latin">{t.about.member2Role}</p>
              <p className="text-xs text-charcoal/70 mt-1 font-latin">{t.about.member2Desc}</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
