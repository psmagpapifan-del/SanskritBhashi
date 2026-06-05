import React from "react";
import Layout from "@/components/Layout";
import PracticeCard from "@/components/PracticeCard";
import JsonLd from "@/components/JsonLd";
import { BookOpen, Award, Compass, Search } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

export default async function ShastraStudyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslation(lang);

  const shastraSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Bhagavad Gita (भगवद्गीता)",
    "author": [
      {
        "@type": "Person",
        "name": "Krishna (कृष्ण)",
        "description": "Speaker of the Bhagavad Gita"
      },
      {
        "@type": "Person",
        "name": "Vyasa (व्यास)",
        "description": "Compiler of the Mahabharata"
      }
    ],
    "description": t.shastraStudy.desc,
    "inLanguage": "sa"
  };

  const gitaPractice = {
    id: "gita-2-47",
    phrase: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliterations: {
      devanagari: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      iast: "karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||",
      japanese: "カルマニェーヴァーディカーラステ マ ファレス カダーチャナ | マ カルマファラヘートゥルブールマ テ サンゴーストゥヴァカルマニ",
      french: "karmanyevadhikaraste ma phalechou kadatchana | ma karmaphalaheturbhourma te sango'stvakarmani"
    },
    wordByWord: [
      { sanskrit: "कर्मणि", english: "in action", role: "Locative singular" },
      { sanskrit: "एव", english: "only", role: "Avyaya (emphasis)" },
      { sanskrit: "अधिकारः", english: "right / claim", role: "Nominative singular" },
      { sanskrit: "ते", english: "thy / your", role: "Genitive singular" },
      { sanskrit: "मा", english: "never / not", role: "Negative particle" },
      { sanskrit: "फलेषु", english: "in fruits / results", role: "Locative plural" },
      { sanskrit: "कदाचन", english: "at any time", role: "Avyaya" }
    ],
    grammaticalRule: t.shastraStudy.rule1,
    sourceAttribution: "Bhagavad Gita Chapter 2, Verse 47",
    options: [
      lang === "hi"
        ? "आपका अधिकार केवल कर्म करने में है, उसके फल में नहीं।"
        : lang === "ja"
        ? "あなたの権限は義務の実行のみにあり、結果の支配にはない。"
        : lang === "es"
        ? "Tu derecho es a la acción solamente, nunca a sus frutos."
        : "Your right is to action alone, never to its fruits.",
      lang === "hi"
        ? "कर्म का त्याग करें और मौन रहें।"
        : lang === "ja"
        ? "行為を放棄して静寂に座す。"
        : lang === "es"
        ? "Renuncia a la acción y siéntate en silencio."
        : "Renounce action and sit in pure silence.",
      lang === "hi"
        ? "परिणाम पूर्व निर्धारित हैं, कर्म निरर्थक है।"
        : lang === "ja"
        ? "結果は決定されており行為は無意味。"
        : lang === "es"
        ? "Los resultados están predeterminados; la acción es irrelevante."
        : "Results are predetermined; action is irrelevant."
    ],
    correctIndex: 0,
    hint: t.shastraStudy.labDesc
  };

  return (
    <Layout lang={lang}>
      <JsonLd schema={shastraSchema} />

      {/* Header Banner */}
      <section className="bg-linear-to-r from-saffron-500 to-saffron-600 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-marigold-500" />
          <h1 className="text-2xl md:text-3xl font-bold font-latin">{t.shastraStudy.title}</h1>
        </div>
        <p className="text-sm md:text-base text-white/95 max-w-2xl leading-relaxed font-latin">
          {t.shastraStudy.desc}
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Content & Rules */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shloka Analysis Section */}
          <div className="bg-white border border-saffron-100 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-charcoal flex items-center gap-2 font-latin">
              <Compass className="w-5 h-5 text-saffron-500" />
              {t.shastraStudy.sectionTitle}
            </h2>

            {/* Q1 */}
            <div className="border-b border-saffron-50 pb-6 space-y-3">
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                {t.shastraStudy.q1}
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-latin">
                {t.shastraStudy.a1}
              </p>
              <div className="bg-cream rounded-2xl p-4 text-xs font-latin text-charcoal/70 space-y-1">
                <p><span className="font-bold text-saffron-600">Rule:</span> {t.shastraStudy.rule1}</p>
                <p><span className="font-bold text-saffron-600">Evidence/Example:</span> {t.shastraStudy.example1}</p>
                <p><span className="font-bold text-saffron-600">Source Attribution:</span> {t.shastraStudy.attribution1}</p>
              </div>
            </div>

            {/* Q2 */}
            <div className="border-b border-saffron-50 pb-6 space-y-3">
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                {t.shastraStudy.q2}
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-latin">
                {t.shastraStudy.a2}
              </p>
              <div className="bg-cream rounded-2xl p-4 text-xs font-latin text-charcoal/70 space-y-1">
                <p><span className="font-bold text-saffron-600">Attribution:</span> {t.shastraStudy.rule2}</p>
                <p><span className="font-bold text-saffron-600">Source Attribution:</span> {t.shastraStudy.attribution2}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Practice card */}
        <div className="space-y-6">
          <div className="bg-white border border-saffron-100 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-charcoal flex items-center gap-2 font-latin">
              <Search className="w-4 h-4 text-saffron-500" />
              {t.shastraStudy.labTitle}
            </h3>
            <p className="text-xs text-charcoal/60 leading-relaxed font-latin">
              {t.shastraStudy.labDesc}
            </p>
          </div>

          <PracticeCard {...gitaPractice} />
        </div>
      </div>
    </Layout>
  );
}
