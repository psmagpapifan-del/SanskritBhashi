import React from "react";
import Layout from "@/components/Layout";
import FAQAccordion from "@/components/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import { HelpCircle } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

export default async function FAQsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslation(lang);

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faqs.list.map((faq) => ({
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
          <h1 className="text-2xl md:text-3xl font-bold font-latin">{t.faqs.title}</h1>
        </div>
        <p className="text-sm md:text-base text-white/95 max-w-2xl leading-relaxed font-latin">
          {t.faqs.desc}
        </p>
      </section>

      {/* FAQs List */}
      <div className="space-y-4 max-w-3xl mx-auto py-4">
        {t.faqs.list.map((faq) => (
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
