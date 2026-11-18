/**
 * Metadata for Learning Hub articles that use the shared ArticlePage template.
 * Article bodies live in src/components/articles/<slug>/{en,hi,ja,es}.astro.
 * Adding an entry here lists the article on /[lang]/learn; the page itself
 * lives in src/pages/[lang]/learn/<slug>.astro and is picked up by the sitemap.
 */
export type Lang = "en" | "hi" | "ja" | "es";

export interface LocalizedMeta {
  title: string;
  desc: string;
  subtitle: string;
}

export interface LearnArticle {
  slug: string;
  category: "Vyakaran" | "Phonetics" | "School Prep" | "Shastra" | "Linguistics";
  minutes: number;
  published: string;
  updated: string;
  module: "school-prep" | "shastra-study";
  tags: string[];
  meta: Record<Lang, LocalizedMeta>;
}

export const readingTime = (lang: string, minutes: number) =>
  lang === "hi" ? `${minutes} मिनट पठन` : lang === "ja" ? `読了時間 ${minutes}分` : lang === "es" ? `${minutes} min de lectura` : `${minutes} min read`;

export const learnArticles: LearnArticle[] = [
  {
    slug: "sanskrit-samasa-compounds",
    category: "Vyakaran",
    minutes: 9,
    published: "2026-11-18",
    updated: "2026-11-18",
    module: "school-prep",
    tags: ["Samasa", "Grammar", "Compounds"],
    meta: {
      en: {
        title: "Sanskrit Samāsa: A Complete Guide to Compound Words",
        desc: "Learn the six types of Sanskrit compounds — Avyayībhāva, Tatpuruṣa, Karmadhāraya, Dvigu, Dvandva and Bahuvrīhi — with vigraha examples.",
        subtitle: "How Sanskrit fuses several words into one, and how to take them apart again with vigraha.",
      },
      hi: {
        title: "संस्कृत समास: समस्त पदों की संपूर्ण मार्गदर्शिका",
        desc: "अव्ययीभाव, तत्पुरुष, कर्मधारय, द्विगु, द्वन्द्व और बहुव्रीहि — छहों समासों को विग्रह सहित उदाहरणों से सीखें।",
        subtitle: "संस्कृत अनेक पदों को एक पद में कैसे जोड़ती है, और विग्रह द्वारा उन्हें फिर से कैसे अलग करें।",
      },
      ja: {
        title: "サンスクリットのサマーサ：複合語の完全ガイド",
        desc: "アヴィヤイーバーヴァ、タットプルシャ、カルマダーラヤ、ドヴィグ、ドヴァンドヴァ、バフヴリーヒの6種類の複合語を、分解（ヴィグラハ）の例とともに学びます。",
        subtitle: "サンスクリット語が複数の語をひとつに結合する仕組みと、ヴィグラハによる分解の方法。",
      },
      es: {
        title: "Samāsa en Sánscrito: Guía Completa de las Palabras Compuestas",
        desc: "Aprenda los seis tipos de compuestos sánscritos —Avyayībhāva, Tatpuruṣa, Karmadhāraya, Dvigu, Dvandva y Bahuvrīhi— con ejemplos de vigraha.",
        subtitle: "Cómo el sánscrito une varias palabras en una sola y cómo separarlas de nuevo mediante el vigraha.",
      },
    },
  },
  {
    slug: "sanskrit-verb-lakaras",
    category: "Vyakaran",
    minutes: 10,
    published: "2026-11-18",
    updated: "2026-11-18",
    module: "school-prep",
    tags: ["Lakara", "Verbs", "Dhatu"],
    meta: {
      en: {
        title: "Sanskrit Verbs and Lakāras: Tenses and Moods Made Simple",
        desc: "Understand dhātus, the ten lakāras, Parasmaipada and Ātmanepada, with full conjugation tables of पठ् in five lakāras.",
        subtitle: "Nine forms per lakāra: a clear system for conjugating any Sanskrit verb.",
      },
      hi: {
        title: "संस्कृत धातु और लकार: काल और भाव की सरल व्याख्या",
        desc: "धातु, दस लकार, परस्मैपद और आत्मनेपद को समझें, तथा पाँच लकारों में पठ् धातु की पूर्ण रूप-तालिकाएँ देखें।",
        subtitle: "प्रत्येक लकार में नौ रूप: किसी भी संस्कृत धातु के रूप बनाने की स्पष्ट पद्धति।",
      },
      ja: {
        title: "サンスクリットの動詞とラカーラ：時制と法をやさしく解説",
        desc: "語根（ダートゥ）、10のラカーラ、パラスマイパダとアートマネーパダを理解し、5つのラカーラにおける पठ् の完全な活用表を学びます。",
        subtitle: "ラカーラごとに9つの形：どんな動詞でも活用できる明快な体系。",
      },
      es: {
        title: "Verbos Sánscritos y Lakāras: Tiempos y Modos Explicados",
        desc: "Comprenda los dhātus, los diez lakāras, Parasmaipada y Ātmanepada, con tablas completas de conjugación de पठ् en cinco lakāras.",
        subtitle: "Nueve formas por lakāra: un sistema claro para conjugar cualquier verbo sánscrito.",
      },
    },
  },
  {
    slug: "devanagari-reading-writing-guide",
    category: "Phonetics",
    minutes: 8,
    published: "2026-11-18",
    updated: "2026-11-18",
    module: "school-prep",
    tags: ["Devanagari", "Script", "Beginner"],
    meta: {
      en: {
        title: "How to Read and Write Devanāgarī: Vowels, Mātrās and Conjuncts",
        desc: "A beginner's guide to the Devanāgarī script used for Sanskrit: the inherent vowel, mātrā signs, halanta, conjunct consonants and punctuation.",
        subtitle: "Everything a beginner needs to start reading Sanskrit in its traditional script.",
      },
      hi: {
        title: "देवनागरी पढ़ना और लिखना: स्वर, मात्राएँ और संयुक्ताक्षर",
        desc: "संस्कृत के लिए प्रयुक्त देवनागरी लिपि की आरंभिक मार्गदर्शिका: अंतर्निहित 'अ', मात्राएँ, हलन्त, संयुक्ताक्षर और विराम-चिह्न।",
        subtitle: "संस्कृत को उसकी पारंपरिक लिपि में पढ़ना आरंभ करने के लिए आवश्यक सब कुछ।",
      },
      ja: {
        title: "デーヴァナーガリーの読み書き：母音、マートラー、結合文字",
        desc: "サンスクリット語の表記に使われるデーヴァナーガリー文字の入門ガイド。内在母音、母音記号（マートラー）、ハラント、結合子音、句読点を解説します。",
        subtitle: "伝統的な文字でサンスクリット語を読み始めるために必要なことのすべて。",
      },
      es: {
        title: "Cómo Leer y Escribir Devanāgarī: Vocales, Mātrās y Conjuntos",
        desc: "Guía para principiantes de la escritura Devanāgarī del sánscrito: la vocal inherente, los signos mātrā, el halanta, las consonantes conjuntas y la puntuación.",
        subtitle: "Todo lo que un principiante necesita para empezar a leer sánscrito en su escritura tradicional.",
      },
    },
  },
  {
    slug: "sanskrit-pratyaya-suffixes",
    category: "School Prep",
    minutes: 9,
    published: "2026-11-18",
    updated: "2026-11-18",
    module: "school-prep",
    tags: ["Pratyaya", "Suffixes", "CBSE"],
    meta: {
      en: {
        title: "Sanskrit Pratyayas: Kṛt, Taddhita and Feminine Suffixes Explained",
        desc: "Master the suffixes tested in CBSE Sanskrit: क्त्वा, ल्यप्, तुमुन्, क्त, क्तवतु, शतृ, मतुप्, ठक्, टाप् and ङीप्, with worked examples.",
        subtitle: "How a handful of suffixes turn roots and nouns into participles, infinitives and adjectives.",
      },
      hi: {
        title: "संस्कृत प्रत्यय: कृत्, तद्धित और स्त्री प्रत्यय की सरल व्याख्या",
        desc: "सीबीएसई संस्कृत में पूछे जाने वाले प्रत्यय — क्त्वा, ल्यप्, तुमुन्, क्त, क्तवतु, शतृ, मतुप्, ठक्, टाप् और ङीप् — उदाहरण सहित सीखें।",
        subtitle: "कुछ प्रत्यय धातुओं और संज्ञाओं को कृदन्त, तुमुन्नन्त और विशेषण में कैसे बदलते हैं।",
      },
      ja: {
        title: "サンスクリットの接尾辞（プラティヤヤ）：クリット、タッディタ、女性接尾辞",
        desc: "CBSE試験で出題される接尾辞 क्त्वा、ल्यप्、तुमुन्、क्त、क्तवतु、शतृ、मतुप्、ठक्、टाप्、ङीप् を例題とともにマスターします。",
        subtitle: "少数の接尾辞が、語根や名詞を分詞・不定詞・形容詞に変える仕組み。",
      },
      es: {
        title: "Los Pratyayas del Sánscrito: Sufijos Kṛt, Taddhita y Femeninos",
        desc: "Domine los sufijos del examen CBSE: क्त्वा, ल्यप्, तुमुन्, क्त, क्तवतु, शतृ, मतुप्, ठक्, टाप् y ङीप्, con ejemplos resueltos.",
        subtitle: "Cómo unos pocos sufijos convierten raíces y sustantivos en participios, infinitivos y adjetivos.",
      },
    },
  },
  {
    slug: "sanskrit-chandas-meter",
    category: "Shastra",
    minutes: 9,
    published: "2026-11-18",
    updated: "2026-11-18",
    module: "shastra-study",
    tags: ["Chandas", "Meter", "Shloka"],
    meta: {
      en: {
        title: "Sanskrit Metre (Chandas): Laghu, Guru and the Anuṣṭubh Shloka",
        desc: "Learn how Sanskrit verse is measured: light and heavy syllables, the gaṇa system, and the rules of the Anuṣṭubh metre, scanned on Gita 2.47.",
        subtitle: "The rhythmic science behind every shloka, from Piṅgala to the Bhagavad Gītā.",
      },
      hi: {
        title: "संस्कृत छन्द: लघु, गुरु और अनुष्टुप् श्लोक",
        desc: "संस्कृत पद्य को कैसे मापा जाता है: लघु-गुरु वर्ण, गण-पद्धति और अनुष्टुप् छन्द के नियम, गीता २.४७ के उदाहरण सहित।",
        subtitle: "पिङ्गल से भगवद्गीता तक, प्रत्येक श्लोक के पीछे लय का विज्ञान।",
      },
      ja: {
        title: "サンスクリットの韻律（チャンダス）：ラグ、グル、アヌシュトゥブ詩節",
        desc: "サンスクリット詩の測り方を学びます。軽音節と重音節、ガナの体系、そしてアヌシュトゥブ韻律の規則を『ギーター』2.47で実際に分析します。",
        subtitle: "ピンガラから『バガヴァッド・ギーター』まで、すべてのシュローカを支えるリズムの科学。",
      },
      es: {
        title: "La Métrica Sánscrita (Chandas): Laghu, Guru y el Śloka Anuṣṭubh",
        desc: "Aprenda cómo se mide el verso sánscrito: sílabas ligeras y pesadas, el sistema de gaṇas y las reglas del metro Anuṣṭubh, aplicadas al Gita 2.47.",
        subtitle: "La ciencia rítmica detrás de cada shloka, de Piṅgala a la Bhagavad Gītā.",
      },
    },
  },
  {
    slug: "sanskrit-numbers-and-time",
    category: "School Prep",
    minutes: 8,
    published: "2026-11-18",
    updated: "2026-11-18",
    module: "school-prep",
    tags: ["Sankhya", "Numbers", "Time"],
    meta: {
      en: {
        title: "Sanskrit Numbers (Saṅkhyā) and How to Tell Time",
        desc: "Count from one to a thousand in Sanskrit, learn how numbers agree in gender, form ordinals, and tell the time with वादनम्, सपाद, सार्ध and पादोन.",
        subtitle: "Cardinals, ordinals and clock time — a practical toolkit for everyday Sanskrit and board exams.",
      },
      hi: {
        title: "संस्कृत संख्याएँ और समय बताना",
        desc: "संस्कृत में एक से सहस्र तक गिनती, संख्याओं का लिङ्ग के अनुसार प्रयोग, क्रमवाचक संख्याएँ और वादनम्, सपाद, सार्ध, पादोन से समय बताना सीखें।",
        subtitle: "संख्यावाचक, क्रमवाचक और घड़ी का समय — दैनिक संस्कृत और बोर्ड परीक्षा के लिए व्यावहारिक सामग्री।",
      },
      ja: {
        title: "サンスクリットの数詞（サンキヤー）と時刻の言い方",
        desc: "サンスクリット語で1から1000まで数え、数詞の性の一致、序数の作り方、そして वादनम्・सपाद・सार्ध・पादोन を使った時刻の表現を学びます。",
        subtitle: "基数・序数・時刻 — 日常会話と試験に役立つ実用ツールキット。",
      },
      es: {
        title: "Los Números en Sánscrito (Saṅkhyā) y Cómo Decir la Hora",
        desc: "Cuente del uno al mil en sánscrito, aprenda la concordancia de género de los números, los ordinales y a decir la hora con वादनम्, सपाद, सार्ध y पादोन.",
        subtitle: "Cardinales, ordinales y la hora: herramientas prácticas para el sánscrito cotidiano y los exámenes.",
      },
    },
  },
];

export const getLearnArticle = (slug: string) => {
  const article = learnArticles.find((a) => a.slug === slug);
  if (!article) throw new Error(`Unknown learn article: ${slug}`);
  return article;
};
