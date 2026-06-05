export interface Translation {
  title: string;
  tagline: string;
  heroDesc: string;
  schoolPrep: string;
  schoolPrepDesc: string;
  shastraStudy: string;
  shastraStudyDesc: string;
  socialProof: string;
  consensusTitle: string;
  consensusDesc: string;
  aboutTitle: string;
  aboutMission: string;
  aboutRigor: string;
}

export const translations: Record<string, Translation> = {
  en: {
    title: "Sanskritbhashi",
    tagline: "Master Sanskrit Grammar and Shastra Wisdom",
    heroDesc: "An academically rigorous, interactive Sanskrit learning ecosystem. Sanskritbhashi provides NCERT school-prep modules alongside authentic Gita and Bhagavatam shloka study with progressive grammatical revelation.",
    schoolPrep: "Class 6-12 School Prep",
    schoolPrepDesc: "NCERT-aligned grammar modules covering Sandhi, Karak, and Vibhakti. Build exam confidence with structured rules and Paninian attributions.",
    shastraStudy: "Shastra Study Track",
    shastraStudyDesc: "Deconstruct the classical shlokas word-by-word. Practice authentic Devanagari pronunciation with active audio guidance and Vyakaran breakups.",
    socialProof: "Trusted by 50,000+ students, teachers, and Vedic scholars globally.",
    consensusTitle: "Academic Consensus & Authority",
    consensusDesc: "All grammatical analysis on Sanskritbhashi is cross-referenced directly with Panini's Ashtadhyayi and validated by leading Sanskrit university academics.",
    aboutTitle: "About Sanskritbhashi",
    aboutMission: "Preserving the sacred syntax of Sanskrit through modern interactive interfaces and rigorous scholarly standards.",
    aboutRigor: "Sanskritbhashi is built by Sanskrit professors and software developers to bridge ancient phonetic rules with modern web semantics."
  },
  hi: {
    title: "संस्कृतभाषी",
    tagline: "संस्कृत व्याकरण और शास्त्र ज्ञान में महारत हासिल करें",
    heroDesc: "एक अकादमिक रूप से कठोर, इंटरैक्टिव संस्कृत शिक्षण पारिस्थितिकी तंत्र। संस्कृतभाषी एनसीईआरटी स्कूल-तैयारी मॉड्यूल के साथ-साथ प्रगतिशील व्याकरणिक रहस्योद्घाटन के साथ प्रामाणिक गीता और भागवतम श्लोक अध्ययन प्रदान करता है।",
    schoolPrep: "कक्षा 6-12 स्कूल तैयारी",
    schoolPrepDesc: "एनसीईआरटी-संरेखित व्याकरण मॉड्यूल जिसमें संधि, कारक और विभक्ति शामिल हैं। संरचित नियमों और पाणिनीय व्याख्याओं के साथ परीक्षा का आत्मविश्वास बढ़ाएं।",
    shastraStudy: "शास्त्र अध्ययन ट्रैक",
    shastraStudyDesc: "शास्त्रीय श्लोकों का शब्द-दर-शब्द विश्लेषण करें। सक्रिय ऑडियो मार्गदर्शन और व्याकरण विच्छेद के साथ प्रामाणिक देवनागरी उच्चारण का अभ्यास करें।",
    socialProof: "विश्व स्तर पर 50,000+ छात्रों, शिक्षकों और वैदिक विद्वानों द्वारा विश्वसनीय।",
    consensusTitle: "अकादमिक आम सहमति और प्राधिकरण",
    consensusDesc: "संस्कृतभाषी पर सभी व्याकरणिक विश्लेषण सीधे पाणिनी की अष्टाध्यायी से संदर्भित हैं और प्रमुख संस्कृत विश्वविद्यालय के शिक्षाविदों द्वारा मान्य हैं।",
    aboutTitle: "संस्कृतभाषी के बारे में",
    aboutMission: "आधुनिक इंटरैक्टिव इंटरफेस और कठोर शैक्षणिक मानकों के माध्यम से संस्कृत के पवित्र वाक्यविन्यास को संरक्षित करना।",
    aboutRigor: "संस्कृतभाषी का निर्माण संस्कृत प्रोफेसरों और सॉफ्टवेयर डेवलपर्स द्वारा प्राचीन ध्वन्यात्मक नियमों को आधुनिक वेब सिमेंटिक्स के साथ जोड़ने के लिए किया गया है।"
  },
  ja: {
    title: "サンスクリット・バーシ",
    tagline: "サンスクリット文法とシャーストラの叡智をマスターする",
    heroDesc: "学術的に厳格でインタラクティブなサンスクリット語学習エコシステム。サンスクリット・バーシは、文法の段階的な開示機能を備えた本格的なギーターおよびバーガヴァタムのシュローカ学習と並んで、NCERT準拠の学校試験対策モジュールを提供します。",
    schoolPrep: "6-12学年向け学校試験対策",
    schoolPrepDesc: "サンディ、カーラカ、ヴィバクティをカバーするNCERT準拠の文法モジュール。体系化された規則とパーニニ文法の典拠により、試験への自信を培います。",
    shastraStudy: "シャーストラ学習トラック",
    shastraStudyDesc: "古典的なシュローカを単語ごとに分解して学習します。アクティブな音声ガイドと文法解説を用いて、本格的なデーヴァナーガリー発音を練習できます。",
    socialProof: "世界中で5万以上の学生、教師、そしてヴェーダ学者に信頼されています。",
    consensusTitle: "学術的な合意と権威",
    consensusDesc: "サンスクリット・バーシにおけるすべての文法分析は、パーニニの『アシュターディヤーयी』と直接照合され、主要なサンスクリット大学の学者によって検証されています。",
    aboutTitle: "サンスクリット・バーシについて",
    aboutMission: "現代的なインタラクティブ・インターフェースと厳格な学術基準を通じて、サンスクリット語の聖なる構文を保存します。",
    aboutRigor: "サンスクリット・バーシは、古代の音韻規則と現代のウェブ・セマンティクスをつなぐため、サンスクリットの教授とソフトウェア開発者によって構築されています。"
  },
  es: {
    title: "Sanskritbhashi",
    tagline: "Domina la Gramática del Sánscrito y la Sabiduría del Shastra",
    heroDesc: "Un ecosistema interactivo de aprendizaje de sánscrito académicamente riguroso. Sanskritbhashi ofrece módulos de preparación escolar alineados con NCERT junto con el estudio auténtico de shlokas del Gita y Bhagavatam con revelación gramatical progresiva.",
    schoolPrep: "Prep Escolar Clase 6-12",
    schoolPrepDesc: "Módulos de gramática alineados con NCERT que cubren Sandhi, Karak y Vibhakti. Construye confianza para los exámenes con reglas estructuradas y atribuciones paninianas.",
    shastraStudy: "Ruta de Estudio del Shastra",
    shastraStudyDesc: "Descompone los shlokas clásicos palabra por palabra. Practica la pronunciación auténtica de Devanagari con guía de audio activa y desgloses de Vyakaran.",
    socialProof: "Confiado por más de 50,000 estudiantes, profesores y eruditos védicos en todo el mundo.",
    consensusTitle: "Consenso y Autoridad Académica",
    consensusDesc: "Todo el análisis gramatical en Sanskritbhashi se cruza directamente con el Ashtadhyayi de Panini y es validado por destacados académicos universitarios de sánscrito.",
    aboutTitle: "Sobre Sanskritbhashi",
    aboutMission: "Preservar la sintaxis sagrada del sánscrito a través de interfaces interactivas modernas y estándares académicos rigurosos.",
    aboutRigor: "Sanskritbhashi es creado por profesores de sánscrito y desarrolladores de software para unir las reglas fonéticas antiguas con la semántica web moderna."
  }
};

export function getTranslation(lang: string): Translation {
  return translations[lang] || translations.en;
}
