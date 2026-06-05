import React from "react";
import Layout from "@/components/Layout";
import PracticeCard from "@/components/PracticeCard";
import JsonLd from "@/components/JsonLd";
import { GraduationCap, Award, BookOpen, Layers } from "lucide-react";

export default async function SchoolPrepPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const schoolCourseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "NCERT Sanskrit Grammar Module (Sandhi, Karak, Vibhakti)",
    "description": "Comprehensive school-level Sanskrit grammar aligned with Central Board examinations.",
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
    grammaticalRule: "Akaḥ Savarṇe Dīrghaḥ: When a simple vowel (a, i, u, ṛ) is followed by a similar vowel (short or long), the two combine to form a single corresponding long vowel.",
    sourceAttribution: "Panini Ashtadhyayi 6.1.101",
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
    grammaticalRule: "Iko Yaṇaci: When a vowel belonging to the 'Ik' group (i, u, ṛ, ḷ) is followed by any dissimilar vowel (ac), it is replaced by its corresponding semi-vowel (y, v, r, l) respectively.",
    sourceAttribution: "Panini Ashtadhyayi 6.1.77",
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
          <h1 className="text-2xl md:text-3xl font-bold font-latin">NCERT Class 6-12 Sanskrit Module</h1>
        </div>
        <p className="text-sm md:text-base text-white/95 max-w-2xl leading-relaxed font-latin">
          Master CBSE and state-board Sanskrit grammar syllabus. This module breaks down rules into clear Paninian formulas with interactive checks.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Content & Rules */}
        <div className="lg:col-span-2 space-y-8">
          {/* Vyakaran Syllabus Section */}
          <div className="bg-white border border-saffron-100 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-charcoal flex items-center gap-2 font-latin">
              <Layers className="w-5 h-5 text-saffron-500" />
              Syllabus Part 1: Sandhi Rules (सन्धि)
            </h2>

            {/* Rule 1 */}
            <div className="border-b border-saffron-50 pb-6 space-y-3">
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                What is Dirgha Sandhi and how is it formed?
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-latin">
                Dīrgha Sandhi is the coalescence of two similar vowels into their single corresponding long vowel counterpart when they meet at a word boundary.
              </p>
              <div className="bg-cream rounded-2xl p-4 text-xs font-latin text-charcoal/70 space-y-1">
                <p><span className="font-bold text-saffron-600">Rule:</span> Akaḥ Savarṇe Dīrghaḥ (Vowels a/i/u/ṛ meeting a similar vowel become long)</p>
                <p><span className="font-bold text-saffron-600">Evidence/Example:</span> पुस्तक + आलयः = पुस्तकालयः (Book + Abode = Library)</p>
                <p><span className="font-bold text-saffron-600">Source Attribution:</span> Panini Ashtadhyayi 6.1.101</p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="border-b border-saffron-50 pb-6 space-y-3">
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                What is Yan Sandhi and what triggers its vowel transition?
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-latin">
                Yaṇ Sandhi is the grammatical transition where vowels i, u, ṛ, or ḷ change into their respective semi-vowels y, v, r, or l when followed by any dissimilar vowel.
              </p>
              <div className="bg-cream rounded-2xl p-4 text-xs font-latin text-charcoal/70 space-y-1">
                <p><span className="font-bold text-saffron-600">Rule:</span> Iko Yaṇaci (i/u/ṛ/ḷ + dissimilar vowel = y/v/r/l + vowel)</p>
                <p><span className="font-bold text-saffron-600">Evidence/Example:</span> प्रति + एकम् = प्रत्येकम् (Each / Every)</p>
                <p><span className="font-bold text-saffron-600">Source Attribution:</span> Panini Ashtadhyayi 6.1.77</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-saffron-100 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-charcoal flex items-center gap-2 font-latin">
              <Award className="w-5 h-5 text-saffron-500" />
              Syllabus Part 2: Karak & Vibhakti
            </h2>

            {/* Rule 3 */}
            <div className="border-b border-saffron-50 pb-6 space-y-3">
              <h3 className="text-base font-bold text-saffron-600 font-latin">
                How does the relation between Karak and Vibhakti dictate Sanskrit sentence structure?
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-latin">
                Kāraka represents the nominal role defining the relationship of a noun to the action (verb), which is explicitly mapped to one of the seven grammatical cases (Vibhakti) in active or passive speech.
              </p>
              <div className="bg-cream rounded-2xl p-4 text-xs font-latin text-charcoal/70 space-y-1">
                <p><span className="font-bold text-saffron-600">Rule:</span> Karturīpsitatamaṁ Karma (The object is that which is most desired by the agent, mapping to Accusative case / Dvitīyā Vibhakti)</p>
                <p><span className="font-bold text-saffron-600">Evidence/Example:</span> बालकः पुस्तकं पठति (The boy reads the book - 'book' receives the action and takes 2nd case)</p>
                <p><span className="font-bold text-saffron-600">Source Attribution:</span> Panini Ashtadhyayi 1.4.49</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Practice cards widget */}
        <div className="space-y-6">
          <div className="bg-white border border-saffron-100 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-charcoal flex items-center gap-2 font-latin">
              <BookOpen className="w-4 h-4 text-saffron-500" />
              Interactive Lab
            </h3>
            <p className="text-xs text-charcoal/60 leading-relaxed font-latin">
              Solve these grammar cards. Correct selections increase your streak flame!
            </p>
          </div>

          <PracticeCard {...devAlayahPractice} />
          <PracticeCard {...ityevamPractice} />
        </div>
      </div>
    </Layout>
  );
}
