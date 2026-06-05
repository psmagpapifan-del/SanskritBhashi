import React from "react";
import Layout from "@/components/Layout";
import FAQAccordion from "@/components/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import { HelpCircle } from "lucide-react";

export default async function FAQsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const faqs = [
    {
      id: "faq-gita-study",
      question: "How does Bhagavad Gita Chapter 2, Verse 47 apply to my daily studies?",
      primaryAnswer: "Bhagavad Gita Chapter 2, Verse 47 teaches 'Niṣkāma Karma' (selfless action), stating that your sphere of authority lies in executing your duty, not in controlling its results.",
      detailedAnswer: "Applying this to education means focusing completely on active learning and practice rather than worrying about grades or exam outcomes. By detaching from the anxiety of results, cognitive bandwidth is freed for deep retention and focus."
    },
    {
      id: "faq-sandhi-samasa",
      question: "What is the difference between Sandhi and Samasa in Sanskrit grammar?",
      primaryAnswer: "Sandhi is a phonetic joining of letters at word boundaries, whereas Samasa is a semantic compound grouping multiple words into a single unit.",
      detailedAnswer: "Sandhi modifies adjacent vowel or consonant letters (e.g. Deva + Alayah = Devalayah). Samasa merges grammatical concepts and hides case endings to form complex nominal stems (e.g. Rajaputra meaning King's son)."
    },
    {
      id: "faq-panini-rule",
      question: "Which Panini rule governs the formation of Yan Sandhi changes?",
      primaryAnswer: "Yaṇ Sandhi is governed by the Panini rule 'Iko Yaṇaci' (Ashtadhyayi 6.1.77).",
      detailedAnswer: "This rule mandates that when a vowel belonging to the 'Ik' group (i, u, ṛ, ḷ) meets any dissimilar vowel ('ac'), the former vowel undergoes a phonetic shift into its corresponding semi-vowel (y, v, r, l) respectively."
    },
    {
      id: "faq-vibhakti-case",
      question: "How do I determine the correct Vibhakti case for sentence subjects?",
      primaryAnswer: "The subject of an active sentence takes the Nominative case (Prathamā Vibhakti) governed by the rule 'Prātipadikārtha-liṅga-parimāṇa-vacana-mātre prathamā'.",
      detailedAnswer: "In passive construction (Karmani Prayoga), however, the object takes the Prathamā Vibhakti case, and the subject shifts to the Instrumental case (Tṛtīyā Vibhakti) following the rule 'Kartṛ-karaṇayos tṛtīyā'."
    },
    {
      id: "faq-pronunciation-iast",
      question: "Can non-native speakers accurately learn Sanskrit pronunciation using English transliteration?",
      primaryAnswer: "Yes, non-native speakers can achieve perfect pronunciation by using the International Alphabet of Sanskrit Transliteration (IAST) which has a strict one-to-one mapping for every Sanskrit sound.",
      detailedAnswer: "IAST utilizes diacritics (like dots under ṭ, ḍ, ṇ or lines over vowels like ā, ī, ū) to represent unique sounds. Since Sanskrit spelling is phonetic, mapping these symbols correctly ensures flawless pronunciation, regardless of the user's native tongue."
    },
    {
      id: "faq-three-numbers",
      question: "Why does the Sanskrit language use three grammatical numbers instead of two?",
      primaryAnswer: "Sanskrit features three grammatical numbers (singular, dual, and plural) to express exact duality before moving to plural sets.",
      detailedAnswer: "The dual number (Dvivacana) is explicitly used whenever referring to exactly two items, such as hands, eyes, or pairs of entities. This adds grammatical precision to sentences and is a feature shared with other early Indo-European languages."
    },
    {
      id: "faq-identify-splits",
      question: "How can I easily identify Sandhi splits in complex classical shlokas?",
      primaryAnswer: "Sandhi splits can be identified by isolating noun stems, finding vowel junctions, and reversing phonetic change rules.",
      detailedAnswer: "Learners should look for long vowels (indicating Dirgha Sandhi), semi-vowels like 'y' and 'v' (indicating Yan Sandhi), or 'o' and 'r' (indicating Guna Sandhi) at word boundaries to break the compound strings."
    },
    {
      id: "faq-six-karakas",
      question: "What are the six Karakas and their corresponding grammatical cases?",
      primaryAnswer: "The six Karakas are Karta, Karma, Karana, Sampradana, Apadana, and Adhikarana, mapping to cases one, two, three, four, five, and seven respectively.",
      detailedAnswer: "Genitive case (Sasthi Vibhakti, relation) and Vocative case (Sambodhana) are not considered true Karakas because they do not have a direct relation to the action or verb of the sentence."
    }
  ];

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${faq.primaryAnswer} ${faq.detailedAnswer}`
      }
    }))
  };

  return (
    <Layout lang={lang}>
      <JsonLd schema={faqPageSchema} />

      {/* Header Banner */}
      <section className="bg-linear-to-r from-saffron-500 to-saffron-600 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-8 h-8 text-marigold-500" />
          <h1 className="text-2xl md:text-3xl font-bold font-latin">Sanskritbhashi Knowledge Base</h1>
        </div>
        <p className="text-sm md:text-base text-white/95 max-w-2xl leading-relaxed font-latin">
          Got questions? We have definitive answers. Below are our most-searched grammar and Shastra queries, compiled by our academic board.
        </p>
      </section>

      {/* FAQs List */}
      <div className="space-y-4 max-w-3xl mx-auto py-4">
        {faqs.map((faq) => (
          <FAQAccordion
            key={faq.id}
            id={faq.id}
            question={faq.question}
            primaryAnswer={faq.primaryAnswer}
            detailedAnswer={faq.detailedAnswer}
          />
        ))}
      </div>
    </Layout>
  );
}
