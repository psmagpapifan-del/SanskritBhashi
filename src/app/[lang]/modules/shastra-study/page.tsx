import React from "react";
import Layout from "@/components/Layout";
import PracticeCard from "@/components/PracticeCard";
import JsonLd from "@/components/JsonLd";
import { BookOpen, Award, Compass, Search } from "lucide-react";

export default async function ShastraStudyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

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
    "description": "A 700-verse Hindu scripture that is part of the epic Mahabharata, containing a conversation between Pandava prince Arjuna and his guide Krishna.",
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
    grammaticalRule: "1. karmaṇi + eva = karmaṇyeva (Yaṇ Sandhi: i + e = ye). 2. adhikāraḥ + te = adhikāraste (Visarga Sandhi: ḥ + t = st, based on Visarjanīyasya saḥ, Ashtadhyayi 8.3.34).",
    sourceAttribution: "Bhagavad Gita Chapter 2, Verse 47",
    options: [
      "Your right is to action alone, never to its fruits.",
      "Renounce action and sit in pure silence.",
      "Results are predetermined; action is irrelevant."
    ],
    correctIndex: 0,
    hint: "This verse forms the core of 'Niṣkāma Karma' (selfless action), instructing that your sphere of authority lies in executing duty, not controlling consequences."
  };

  return (
    <Layout lang={lang}>
      <JsonLd schema={shastraSchema} />

      {/* Header Banner */}
      <section className="bg-linear-to-r from-saffron-500 to-saffron-600 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-marigold-500" />
          <h1 className="text-2xl md:text-3xl font-bold font-latin">Shastra Study Module</h1>
        </div>
        <p className="text-sm md:text-base text-white/95 max-w-2xl leading-relaxed font-latin">
          Deconstruct the grammatical matrix of spiritual texts. Break down shlokas word-by-word and master pronunciation metrics.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Content & Rules */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shloka Analysis Section */}
          <div className="bg-white border border-saffron-100 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-charcoal flex items-center gap-2 font-latin">
              <Compass className="w-5 h-5 text-saffron-500" />
              Linguistic Structure of Bhagavad Gita Shlokas
            </h2>

            {/* Q1 */}
            <div className="border-b border-saffron-50 pb-6 space-y-3">
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                How does understanding Sandhi division impact the translation of the Bhagavad Gita?
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-latin">
                In classical Sanskrit scriptures, words are tightly conjoined using Sandhi phonetic rules to maintain metric flow (Anuṣṭubh meter). Separating words (Sandhi-Viccheda) is the primary step required to build word-by-word meanings and prevent erroneous philosophical interpretations.
              </p>
              <div className="bg-cream rounded-2xl p-4 text-xs font-latin text-charcoal/70 space-y-1">
                <p><span className="font-bold text-saffron-600">Rule:</span> Visarjanīyasya saḥ (Visarga 'ḥ' changes to 's' when followed by hard consonants 'c', 't', 't' etc.)</p>
                <p><span className="font-bold text-saffron-600">Evidence/Example:</span> नमः + ते = नमस्ते (Namas + te = Namaste)</p>
                <p><span className="font-bold text-saffron-600">Source Attribution:</span> Panini Ashtadhyayi 8.3.34</p>
              </div>
            </div>

            {/* Q2 */}
            <div className="border-b border-saffron-50 pb-6 space-y-3">
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                Who are the primary compiler entities credited in the Mahabharata and Gita tradition?
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-latin">
                Krishna is the original spoken speaker of the Bhagavad Gita on the Kurukshetra battlefield, whereas Sage Krishna Dvaipayana Vyasa is the historical compiler who compiled the verses into the Mahabharata epic.
              </p>
              <div className="bg-cream rounded-2xl p-4 text-xs font-latin text-charcoal/70 space-y-1">
                <p><span className="font-bold text-saffron-600">Attribution:</span> Vyasa (compiler) and Krishna (author/orator).</p>
                <p><span className="font-bold text-saffron-600">Source Attribution:</span> Mahabharata Bhishma Parva, Chapters 25-42</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Practice card */}
        <div className="space-y-6">
          <div className="bg-white border border-saffron-100 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-charcoal flex items-center gap-2 font-latin">
              <Search className="w-4 h-4 text-saffron-500" />
              Shloka Lab
            </h3>
            <p className="text-xs text-charcoal/60 leading-relaxed font-latin">
              Listen to the shloka, analyze the word-by-word meaning, and choose the correct translation.
            </p>
          </div>

          <PracticeCard {...gitaPractice} />
        </div>
      </div>
    </Layout>
  );
}
