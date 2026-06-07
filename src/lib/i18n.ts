export interface FAQItem {
  id: string;
  question: string;
  primaryAnswer: string;
  detailedAnswer: string;
}

export interface Translation {
  nav: {
    home: string;
    schoolPrep: string;
    shastraStudy: string;
    about: string;
    faqs: string;
    privacy: string;
    terms: string;
  };
  home: {
    heroSub: string;
    heroTitle: string;
    heroTitleSpan: string;
    heroTitleEnd: string;
    heroDesc: string;
    ctaSchool: string;
    ctaShastra: string;
    socialProof: string;
    consensusTitle: string;
    consensusDesc: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    schoolPrep: string;
    schoolPrepDesc: string;
    shastraStudy: string;
    shastraStudyDesc: string;
    schoolList: string[];
    schoolBtn: string;
    shastraList: string[];
    shastraBtn: string;
  };
  schoolPrep: {
    title: string;
    desc: string;
    part1: string;
    part2: string;
    q1: string;
    a1: string;
    rule1: string;
    example1: string;
    attribution1: string;
    q2: string;
    a2: string;
    rule2: string;
    example2: string;
    attribution2: string;
    q3: string;
    a3: string;
    rule3: string;
    example3: string;
    attribution3: string;
    labTitle: string;
    labDesc: string;
  };
  shastraStudy: {
    title: string;
    desc: string;
    sectionTitle: string;
    q1: string;
    a1: string;
    rule1: string;
    example1: string;
    attribution1: string;
    q2: string;
    a2: string;
    rule2: string;
    attribution2: string;
    labTitle: string;
    labDesc: string;
  };
  about: {
    title: string;
    desc: string;
    authorityTitle: string;
    authorityDesc: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    councilTitle: string;
    councilDesc: string;
    member1Name: string;
    member1Role: string;
    member1Desc: string;
    member2Name: string;
    member2Role: string;
    member2Desc: string;
  };
  faqs: {
    title: string;
    desc: string;
    list: FAQItem[];
  };
  practice: {
    yourProgress: string;
    currentTier: string;
    chaptersCompleted: string;
    streakCount: string;
    days: string;
    syllabusShorthand: string;
    concept: string;
    paninianHeritage: string;
    interactivePractice: string;
    source: string;
    identifyCorrect: string;
    vyakaranHint: string;
    progressiveRevelation: string;
    revealWordByWord: string;
    wordByWordBreakdown: string;
    revealGrammar: string;
    grammarRuleAnalysis: string;
    hideDetails: string;
    reportError: string;
    nextQuestion: string;
    completeChapter: string;
    learningMap: string;
    activeUnit: string;
    chapterAccomplished: string;
    chapterAccomplishedDesc: string;
    practiceAgain: string;
    nextChapter: string;
    loading: string;
    curriculumFlow: string;
    questionOf: string;
    scriptureCommentaryContext: string;
    scriptureFlow: string;
    aksharaSyllables: string;
    matraDuration: string;
    uchcharanaLocation: string;
    reportTitle: string;
    reportSuccess: string;
    reportCategory: string;
    reportDetails: string;
    reportPlaceholder: string;
    reportSubmit: string;
    reportSubmitting: string;
    reportCancel: string;
    reportErrorMsg: string;
    categoryVyakaran: string;
    categoryAudio: string;
    categoryTypo: string;
    categoryTranslation: string;
    categoryOther: string;
  };
}

export const translations: Record<string, Translation> = {
  en: {
    nav: {
      home: "Home",
      schoolPrep: "School Prep",
      shastraStudy: "Shastra Study",
      about: "About Us",
      faqs: "FAQs",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    home: {
      heroSub: "🔥 Experience Sanskritbhashi Onboarding",
      heroTitle: "Master the Language of the ",
      heroTitleSpan: "Rishi",
      heroTitleEnd: " with Precision",
      heroDesc: "An academically rigorous, interactive Sanskrit learning ecosystem. Sanskritbhashi provides NCERT school-prep modules alongside authentic Gita and Bhagavatam shloka study with progressive grammatical revelation.",
      ctaSchool: "Start School Prep",
      ctaShastra: "Study Classical Shastras",
      socialProof: "Trusted by 50,000+ students, teachers, and Vedic scholars globally.",
      consensusTitle: "Academic Consensus & Authority",
      consensusDesc: "All grammatical analysis on Sanskritbhashi is cross-referenced directly with Panini's Ashtadhyayi and validated by leading Sanskrit university academics.",
      q1: "Why is a structured linguistic approach essential for studying Sanskrit?",
      a1: "Sanskrit is a highly inflected, rule-based mathematical language structured around root nouns and verbal roots (Dhatus) regulated by 3,959 formulas in Panini's Ashtadhyayi. Approaching Sanskrit through systematic grammatical structures ensures accurate transliteration and translation, eliminating the lexical ambiguity often found in post-classical dialects.",
      q2: "How does the dual-learning track model benefit different learner personas?",
      a2: "The platform segregates school curriculum alignment from shastra exploration because academic goals focus on grammatical formulas (Sandhi, Vibhakti, conjugation) required for board examinations, while spiritual paths require deep semantic breakdown (Anvaya), word-by-word philosophical translations, and sound acoustics (Shiksha).",
      schoolPrep: "Class 6-12 School Prep",
      schoolPrepDesc: "NCERT-aligned grammar modules covering Sandhi, Karak, and Vibhakti. Build exam confidence with structured rules.",
      shastraStudy: "Shastra Study Track",
      shastraStudyDesc: "Deconstruct the classical shlokas word-by-word. Practice authentic Devanagari pronunciation with active audio guidance.",
      schoolList: [
        "100% NCERT syllabus alignment for classes 6 to 12.",
        "Rigorous study of Sandhi, Karak, and Vibhakti rules.",
        "Authentic attributions referenced to Panini Ashtadhyayi."
      ],
      schoolBtn: "Enter School prep Classroom",
      shastraList: [
        "Bhagavad Gita and Srimad Bhagavatam shloka deconstruction.",
        "Word-by-word grammatical splits and meaning maps.",
        "Phonetic wave audio interface for pronunciation guidance."
      ],
      shastraBtn: "Enter Shastra Study room"
    },
    schoolPrep: {
      title: "NCERT Class 6-12 Sanskrit Module",
      desc: "Master CBSE and state-board Sanskrit grammar syllabus. This module breaks down rules into clear Paninian formulas with interactive checks.",
      part1: "Syllabus Part 1: Sandhi Rules (सन्धि)",
      part2: "Syllabus Part 2: Karak & Vibhakti",
      q1: "What is Dirgha Sandhi and how is it formed?",
      a1: "Dīrgha Sandhi is the coalescence of two similar vowels into their single corresponding long vowel counterpart when they meet at a word boundary.",
      rule1: "Akaḥ Savarṇe Dīrghaḥ (Vowels a/i/u/ṛ meeting a similar vowel become long)",
      example1: "पुस्तक + आलयः = पुस्तकालयः (Book + Abode = Library)",
      attribution1: "Panini Ashtadhyayi 6.1.101",
      q2: "What is Yan Sandhi and what triggers its vowel transition?",
      a2: "Yaṇ Sandhi is the grammatical transition where vowels i, u, ṛ, or ḷ change into their respective semi-vowels y, v, r, or l when followed by any dissimilar vowel.",
      rule2: "Iko Yaṇaci (i/u/ṛ/ḷ + dissimilar vowel = y/v/r/l + vowel)",
      example2: "प्रति + एकम् = प्रत्येकम् (Each / Every)",
      attribution2: "Panini Ashtadhyayi 6.1.77",
      q3: "How does the relation between Karak and Vibhakti dictate Sanskrit sentence structure?",
      a3: "Kāraka represents the nominal role defining the relationship of a noun to the action (verb), which is explicitly mapped to one of the seven grammatical cases (Vibhakti) in active or passive speech.",
      rule3: "Karturīpsitatamaṁ Karma (The object is that which is most desired by the agent, mapping to Accusative case / Dvitīyā Vibhakti)",
      example3: "बालकः पुस्तकं पठति (The boy reads the book - 'book' receives the action and takes 2nd case)",
      attribution3: "Panini Ashtadhyayi 1.4.49",
      labTitle: "Interactive Lab",
      labDesc: "Solve these grammar cards. Correct selections increase your streak flame!"
    },
    shastraStudy: {
      title: "Shastra Study Module",
      desc: "Deconstruct the grammatical matrix of spiritual texts. Break down shlokas word-by-word and master pronunciation metrics.",
      sectionTitle: "Linguistic Structure of Bhagavad Gita Shlokas",
      q1: "How does understanding Sandhi division impact the translation of the Bhagavad Gita?",
      a1: "In classical Sanskrit scriptures, words are tightly conjoined using Sandhi phonetic rules to maintain metric flow (Anuṣṭubh meter). Separating words (Sandhi-Viccheda) is the primary step required to build word-by-word meanings and prevent erroneous philosophical interpretations.",
      rule1: "Visarjanīyasya saḥ (Visarga 'ḥ' changes to 's' when followed by hard consonants 'c', 't', 't' etc.)",
      example1: "नमः + ते = नमस्ते (Namas + te = Namaste)",
      attribution1: "Panini Ashtadhyayi 8.3.34",
      q2: "Who are the primary compiler entities credited in the Mahabharata and Gita tradition?",
      a2: "Krishna is the original spoken speaker of the Bhagavad Gita on the Kurukshetra battlefield, whereas Sage Krishna Dvaipayana Vyasa is the historical compiler who compiled the verses into the Mahabharata epic.",
      rule2: "Attribution: Vyasa (compiler) and Krishna (author/orator).",
      attribution2: "Mahabharata Bhishma Parva, Chapters 25-42",
      labTitle: "Shloka Lab",
      labDesc: "Listen to the shloka, analyze the word-by-word meaning, and choose the correct translation."
    },
    about: {
      title: "About Sanskritbhashi",
      desc: "Preserving the sacred syntax of Sanskrit through modern interactive interfaces and rigorous scholarly standards.",
      authorityTitle: "Linguistic and Academic Authority",
      authorityDesc: "Sanskritbhashi is built by Sanskrit professors and software developers to bridge ancient phonetic rules with modern web semantics.",
      q1: "What is the primary educational mission of Sanskritbhashi?",
      a1: "The primary mission of Sanskritbhashi is to make classical Sanskrit grammar accessible to global learners by integrating strict Paninian rules with modern interactive learning patterns, ensuring students build functional fluency and text comprehension.",
      q2: "How does Sanskritbhashi guarantee the grammatical accuracy of its content?",
      a2: "Every lesson, Sandhi split, and shloka breakdown is verified by our Academic Council, cross-referenced with the Mahabhashya of Patanjali and Ashtadhyayi of Panini, and validated against accredited university curricula.",
      q3: "Does Sanskritbhashi support international transliteration and font standards?",
      a3: "Yes, Sanskritbhashi implements full international Unicode font compatibility, rendering native Devanagari alongside standard IAST (International Alphabet of Sanskrit Transliteration), Japanese Katakana, and French phonetic text.",
      councilTitle: "Academic Council & Advisory Board",
      councilDesc: "Sanskritbhashi is directed by a group of distinguished scholars dedicated to language preservation:",
      member1Name: "Dr. R. Vasudevan, PhD",
      member1Role: "Professor of Vyakarana, Retd. SSU",
      member1Desc: "Expert in Paninian formulas and phonetic acoustics.",
      member2Name: "Prof. Kenji Takahashi",
      member2Role: "Department of Asian Languages, Kyoto",
      member2Desc: "Specialist in Indo-European linguistics and Katakana transliterations."
    },
    faqs: {
      title: "Sanskritbhashi Knowledge Base",
      desc: "Got questions? We have definitive answers. Below are our most-searched grammar and Shastra queries, compiled by our academic board.",
      list: [
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
      ]
    },
    practice: {
      yourProgress: "Your Progress",
      currentTier: "Current Tier",
      chaptersCompleted: "Chapters Completed",
      streakCount: "Streak Count",
      days: "Days",
      syllabusShorthand: "Syllabus Shorthand Rules",
      concept: "Concept",
      paninianHeritage: "Paninian Heritage",
      interactivePractice: "Interactive Practice",
      source: "Source",
      identifyCorrect: "Identify the correct option:",
      vyakaranHint: "Vyakaran Hint",
      progressiveRevelation: "Progressive Revelation Study:",
      revealWordByWord: "Reveal Word-by-Word Meaning",
      wordByWordBreakdown: "Word-by-Word Vyakaran breakdown",
      revealGrammar: "Reveal Underlying Grammatical Rule",
      grammarRuleAnalysis: "Grammatical Rule & Paninian Analysis",
      hideDetails: "Hide Details",
      reportError: "Report Error",
      nextQuestion: "Next Question",
      completeChapter: "Complete Chapter",
      learningMap: "Learning Map",
      activeUnit: "Active Unit",
      chapterAccomplished: "Chapter Accomplished!",
      chapterAccomplishedDesc: "Great work! You have completed all grammar exercises for **{chapterName}**. Your streak flame has grown.",
      practiceAgain: "Practice Again",
      nextChapter: "Next Chapter",
      loading: "Loading Sanskrit Practice Chassis...",
      curriculumFlow: "CURRICULUM FLOW",
      questionOf: "QUESTION {current} OF {total}",
      scriptureCommentaryContext: "Scripture Commentary Context",
      scriptureFlow: "SCRIPTURE FLOW",
      aksharaSyllables: "Akṣara Syllables",
      matraDuration: "Mātrā Duration",
      uchcharanaLocation: "Uccāraṇa Location",
      reportTitle: "Report Content Typo / Anomaly",
      reportSuccess: "Anomaly report submitted. Thank you for keeping Sanskritbhashi immaculate!",
      reportCategory: "Error Category",
      reportDetails: "Details / Correction Suggestions",
      reportPlaceholder: "Specify typing errors, audio mismatch details, or incorrect grammar definitions...",
      reportSubmit: "Send Report",
      reportSubmitting: "Submitting...",
      reportCancel: "Cancel",
      reportErrorMsg: "Failed to submit error telemetry. Please try again.",
      categoryVyakaran: "Inaccurate Vyakaran Rule",
      categoryAudio: "Audio Mismatch",
      categoryTypo: "Typo in Transliteration",
      categoryTranslation: "Broken Translation",
      categoryOther: "Other Issue"
    }
  },
  hi: {
    nav: {
      home: "मुख्य पृष्ठ",
      schoolPrep: "स्कूल तैयारी",
      shastraStudy: "शास्त्र अध्ययन",
      about: "हमारे बारे में",
      faqs: "पूछे जाने वाले प्रश्न",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें"
    },
    home: {
      heroSub: "🔥 संस्कृतभाषी परिचय गाइड का अनुभव करें",
      heroTitle: "ऋषि की भाषा को परिशुद्धता के साथ ",
      heroTitleSpan: "सीखें",
      heroTitleEnd: " और समझें",
      heroDesc: "एक अकादमिक रूप से कठोर, इंटरैक्टिव संस्कृत शिक्षण पारिस्थितिकी तंत्र। संस्कृतभाषी एनसीईआरटी स्कूल-तैयारी मॉड्यूल के साथ-साथ प्रगतिशील व्याकरणिक रहस्योद्घाटन के साथ प्रामाणिक गीता और भागवतम श्लोक अध्ययन प्रदान करता है।",
      ctaSchool: "स्कूल की तैयारी शुरू करें",
      ctaShastra: "शास्त्रीय शास्त्रों का अध्ययन करें",
      socialProof: "विश्व स्तर पर 50,000+ छात्रों, शिक्षकों और वैदिक विद्वानों द्वारा विश्वसनीय।",
      consensusTitle: "अकादमिक आम सहमति और प्राधिकरण",
      consensusDesc: "संस्कृतभाषी पर सभी व्याकरणिक विश्लेषण सीधे पाणिनी की अष्टाध्यायी से संदर्भित हैं और प्रमुख संस्कृत विश्वविद्यालय के शिक्षाविदों द्वारा मान्य हैं।",
      q1: "संस्कृत के अध्ययन के लिए एक संरचित भाषाई दृष्टिकोण क्यों आवश्यक है?",
      a1: "संस्कृत एक अत्यधिक विभक्ति वाली, नियम-आधारित गणितीय भाषा है जो पाणिनी की अष्टाध्यायी में 3,959 सूत्रों द्वारा विनियमित मूल संज्ञाओं और क्रिया मूल (धातुओं) के आसपास संरचित है। व्यवस्थित व्याकरणिक संरचनाओं के माध्यम से संस्कृत तक पहुँचना सटीक लिप्यंतरण और अनुवाद सुनिश्चित करता है, जिससे बाद के शास्त्रीय बोलियों में पाई जाने वाली शाब्दिक अस्पष्टता समाप्त हो जाती है।",
      q2: "दोहरी-शिक्षण ट्रैक मॉडल विभिन्न शिक्षार्थियों को कैसे लाभ पहुँचाता है?",
      a2: "मंच स्कूल पाठ्यक्रम संरेखण को शास्त्र अन्वेषण से अलग करता है क्योंकि शैक्षणिक लक्ष्य बोर्ड परीक्षाओं के लिए आवश्यक व्याकरणिक सूत्रों (सँधि, विभक्ति, धातु रूप) पर ध्यान केंद्रित करते हैं, जबकि आध्यात्मिक मार्ग के लिए गहरे अर्थ विश्लेषण (अन्वय), शब्द-दर-शब्द दार्शनिक अनुवाद और ध्वनि ध्वनिकी (शिक्षा) की आवश्यकता होती है।",
      schoolPrep: "कक्षा 6-12 स्कूल तैयारी",
      schoolPrepDesc: "एनसीईआरटी-संरेखित व्याकरण मॉड्यूल जिसमें संधि, कारक और विभक्ति शामिल हैं। संरचित नियमों के साथ परीक्षा का आत्मविश्वास बढ़ाएं।",
      shastraStudy: "शास्त्र अध्ययन ट्रैक",
      shastraStudyDesc: "शास्त्रीय श्लोकों का शब्द-दर-शब्द विश्लेषण करें। सक्रिय ऑडियो मार्गदर्शन के साथ प्रामाणिक देवनागरी उच्चारण का अभ्यास करें।",
      schoolList: [
        "कक्षा 6 से 12 के लिए 100% एनसीईआरटी पाठ्यक्रम संरेखण।",
        "संधि, कारक और विभक्ति नियमों का कठोर अध्ययन।",
        "पाणिनी अष्टाध्यायी के प्रामाणिक संदर्भ।"
      ],
      schoolBtn: "स्कूल तैयारी कक्षा में प्रवेश करें",
      shastraList: [
        "भगवद्गीता और श्रीमद्भागवतम श्लोक विश्लेषण।",
        "शब्द-दर-शब्द व्याकरणिक विभाजन और अर्थ मानचित्र।",
        "उच्चारण मार्गदर्शन के लिए ध्वन्यात्मक ऑडियो इंटरफ़ेस।"
      ],
      shastraBtn: "शास्त्र अध्ययन कक्ष में प्रवेश करें"
    },
    schoolPrep: {
      title: "एनसीईआरटी कक्षा 6-12 संस्कृत मॉड्यूल",
      desc: "सीबीएसई और राज्य-बोर्ड संस्कृत व्याकरण पाठ्यक्रम में महारत हासिल करें। यह मॉड्यूल नियमों को स्पष्ट पाणिनीय सूत्रों में तोड़ता है।",
      part1: "पाठ्यक्रम भाग 1: संधि नियम (सन्धि)",
      part2: "पाठ्यक्रम भाग 2: कारक और विभक्ति",
      q1: "दीर्घ संधि क्या है और यह कैसे बनती है?",
      a1: "दीर्घ संधि दो समान स्वरों के मिलने पर उनके एकल दीर्घ स्वर में बदलने की प्रक्रिया है।",
      rule1: "अकः सवर्णे दीर्घः (समान स्वर मिलने पर दीर्घ हो जाते हैं)",
      example1: "पुस्तक + आलयः = पुस्तकालयः (पुस्तक का घर = पुस्तकालय)",
      attribution1: "पाणिणि अष्टाध्यायी 6.1.101",
      q2: "यण् संधि क्या है और इसका स्वर परिवर्तन क्या निर्धारित करता है?",
      a2: "यण् संधि वह व्याकरणिक परिवर्तन है जहां स्वर इ, उ, ऋ, या लृ किसी भिन्न स्वर के बाद आने पर क्रमशः अपने अर्ध-स्वर य्, व्, र्, या ल् में बदल जाते हैं।",
      rule2: "इको यणचि (इ/उ/ऋ/लृ + भिन्न स्वर = य्/व्/र्/ल् + स्वर)",
      example2: "प्रति + एकम् = प्रत्येकम् (हर एक)",
      attribution2: "पाणिणि अष्टाध्यायी 6.1.77",
      q3: "कारक और विभक्ति का संबंध संस्कृत वाक्य संरचना को कैसे निर्देशित करता है?",
      a3: "कारक वह संज्ञा भूमिका है जो क्रिया के साथ संबंध बताती है, जिसे वाक्यों में सात विभक्ति मामलों में से एक में मैप किया जाता है।",
      rule3: "कर्तुरीप्सिततमं कर्म (कर्ता द्वारा सर्वाधिक चाही गई वस्तु कर्म कहलाती है, द्वितीय विभक्ति)",
      example3: "बालकः पुस्तकं पठति (बालक पुस्तक पढ़ता है - 'पुस्तक' द्वितीय विभक्ति लेती है)",
      attribution3: "पाणिणि अष्टाध्यायी 1.4.49",
      labTitle: "इंटरैक्टिव लैब",
      labDesc: "इन व्याकरण कार्डों को हल करें। सही उत्तर आपकी स्ट्रीक को बढ़ाएंगे!"
    },
    shastraStudy: {
      title: "शास्त्र अध्ययन मॉड्यूल",
      desc: "धार्मिक ग्रंथों के व्याकरणिक स्वरूप को समझें। श्लोकों का शब्द-दर-शब्द विश्लेषण करें और उच्चारण पर पकड़ बनाएं।",
      sectionTitle: "भगवद्गीता श्लोकों की भाषाई संरचना",
      q1: "संधि विच्छेद को समझना भगवद्गीता के अनुवाद को कैसे प्रभावित करता है?",
      a1: "शास्त्रीय संस्कृत ग्रंथों में श्लोक प्रवाह (अनुष्टुप छंद) बनाए रखने के लिए शब्द आपस में जुड़े होते हैं। शब्दों को अलग करना (संधि-विच्छेद) शब्द-दर-शब्द अर्थ समझने और गलत दार्शनिक व्याख्या से बचने के लिए प्राथमिक कदम है।",
      rule1: "विसर्जनीयस्य सः (विसर्ग 'ः' के बाद कठिन व्यंजन आने पर वह 'स्' बन जाता है)",
      example1: "नमः + ते = नमस्ते (नमस् + ते = नमस्ते)",
      attribution1: "पाणिणि अष्टाध्यायी 8.3.34",
      q2: "महाभारत और गीता परंपरा में मुख्य संकलनकर्ता किसे माना जाता है?",
      a2: "कुरुक्षेत्र के युद्ध मैदान में कृष्ण भगवद्गीता के मूल वक्ता हैं, जबकि महर्षि कृष्ण द्वैपायन व्यास ने इन छंदों को महाभारत महाकाव्य में संकलित किया।",
      rule2: "योगदान: व्यास (संकलनकर्ता) और कृष्ण (वक्ता)।",
      attribution2: "महाभारत भीष्म पर्व, अध्याय 25-42",
      labTitle: "श्लोक लैब",
      labDesc: "श्लोक सुनें, शब्द-दर-शब्द अर्थ का विश्लेषण करें, और सही अनुवाद चुनें।"
    },
    about: {
      title: "संस्कृतभाषी के बारे में",
      desc: "आधुनिक इंटरैक्टिव इंटरफेस और कठोर शैक्षणिक मानकों के माध्यम से संस्कृत के पवित्र वाक्यविन्यास को संरक्षित करना।",
      authorityTitle: "भाषाई और शैक्षणिक प्राधिकरण",
      authorityDesc: "प्राचीन ध्वन्यात्मक नियमों को आधुनिक वेब सिमेंटिक्स के साथ जोड़ने के लिए संस्कृतभाषी का निर्माण संस्कृत प्रोफेसरों और डेवलपर्स द्वारा किया गया है।",
      q1: "संस्कृतभाषी का प्राथमिक शैक्षणिक मिशन क्या है?",
      a1: "संस्कृतभाषी का प्राथमिक मिशन वैश्विक शिक्षार्थियों के लिए शास्त्रीय संस्कृत व्याकरण को सुलभ बनाना है ताकि छात्र वाक्य संरचना और समझने की क्षमता विकसित कर सकें।",
      q2: "संस्कृतभाषी सामग्री की व्याकरणिक शुद्धता कैसे सुनिश्चित करता है?",
      a2: "प्रत्येक पाठ, संधि विच्छेद और श्लोक विश्लेषण हमारी शैक्षणिक परिषद द्वारा सत्यापित किया जाता है, जो पतंजलि के महाभाष्य और पाणिनी की अष्टाध्यायी से संदर्भित है।",
      q3: "क्या संस्कृतभाषी अंतरराष्ट्रीय लिप्यंतरण और फ़ॉन्ट मानकों का समर्थन करता है?",
      a3: "हाँ, संस्कृतभाषी पूर्ण रूप से अंतरराष्ट्रीय यूनिकोड फ़ॉन्ट संगतता प्रदान करता है, जिससे देवनागरी के साथ-साथ IAST, जापानी काताकाना और फ्रांसीसी ध्वन्यात्मक पाठ प्रदर्शित होते हैं।",
      councilTitle: "शैक्षणिक परिषद और सलाहकार बोर्ड",
      councilDesc: "संस्कृतभाषी का निर्देशन भाषा संरक्षण के प्रति समर्पित विद्वानों के समूह द्वारा किया जाता है:",
      member1Name: "डॉ. आर. वासुदेवन, पीएचडी",
      member1Role: "व्याकरण के प्रोफेसर, सेवानिवृत्त एसएसयू",
      member1Desc: "पाणिनीय सूत्रों और ध्वन्यात्मक ध्वनिकी के विशेषज्ञ।",
      member2Name: "प्रो. केन्जी ताकाहाशी",
      member2Role: "Kyoto विश्वविद्यालय, एशियाई भाषा विभाग",
      member2Desc: "हिंद-यूरोपीय भाषाविज्ञान और काताकाना लिप्यंतरण के विशेषज्ञ।"
    },
    faqs: {
      title: "संस्कृतभाषी ज्ञानकोष",
      desc: "क्या आपके पास प्रश्न हैं? हमारे पास अकादमिक परिषद द्वारा संकलित उत्तर हैं।",
      list: [
        {
          id: "faq-gita-study",
          question: "भगवद्गीता के अध्याय 2, श्लोक 47 का मेरे दैनिक अध्ययन पर क्या प्रभाव पड़ता?",
          primaryAnswer: "भगवद्गीता का अध्याय 2, श्लोक 47 'निष्काम कर्म' सिखाता है, जिसका अर्थ है कि आपका अधिकार केवल कर्तव्य करने में है, फल पर नहीं।",
          detailedAnswer: "इसे शिक्षा पर लागू करने का अर्थ है परिणामों की चिंता किए बिना सीखने पर ध्यान केंद्रित करना। परिणामों की चिंता समाप्त होने से मन केंद्रित और शांत रहता है।"
        },
        {
          id: "faq-sandhi-samasa",
          question: "संस्कृत व्याकरण में संधि और समास में मुख्य अंतर क्या है?",
          primaryAnswer: "संधि वर्णों का ध्वन्यात्मक मेल है, जबकि समास शब्दों का एक सार्थक समूह बनाकर उन्हें एक इकाई में जोड़ता है।",
          detailedAnswer: "संधि पास के अक्षरों में बदलाव लाती है (जैसे देव + आलय = देवालय)। समास विभक्ति चिह्नों को छिपाकर शब्दों को जोड़ता है (जैसे राजपुत्र जिसका अर्थ राजा का पुत्र है)।"
        },
        {
          id: "faq-panini-rule",
          question: "यण् संधि के निर्माण को कौन सा पाणिनीय नियम नियंत्रित करता है?",
          primaryAnswer: "यण् संधि पाणिनी के नियम 'इको यणचि' (अष्टाध्यायी 6.1.77) द्वारा नियंत्रित होती है।",
          detailedAnswer: "यह नियम बताता है कि जब इ, उ, ऋ, लृ के बाद कोई भिन्न स्वर आता है, तो उनके स्थान पर क्रमशः य्, व्, र्, ल् आ जाते हैं।"
        },
        {
          id: "faq-vibhakti-case",
          question: "वाक्य के कर्ता के लिए सही विभक्ति का निर्धारण कैसे करें?",
          primaryAnswer: "सक्रिय वाक्य का कर्ता प्रथमा विभक्ति लेता है, जो 'प्रातिपदिकार्थ-लिंग-परिमाण-वचन-मात्रे प्रथमा' द्वारा शासित है।",
          detailedAnswer: "कर्मवाच्य वाक्य (कर्मणि प्रयोग) में कर्म प्रथमा विभक्ति लेता है, और कर्ता तृतीया विभक्ति लेता है।"
        },
        {
          id: "faq-pronunciation-iast",
          question: "क्या गैर-भारतीय लोग अंग्रेजी लिप्यंतरण से संस्कृत का सही उच्चारण सीख सकते हैं?",
          primaryAnswer: "हाँ, IAST (लिप्यंतरण मानक) का उपयोग करके गैर-भारतीय भी सटीक उच्चारण सीख सकते हैं क्योंकि इसमें हर ध्वनि के लिए एक विशिष्ट वर्ण तय है।",
          detailedAnswer: "IAST में विशेष चिह्नों (जैसे अक्षरों के नीचे बिंदु ṭ, ḍ या ऊपर रेखा ā, ī) का प्रयोग होता है। चूंकि संस्कृत पूरी तरह ध्वन्यात्मक है, इसलिए इन चिह्नों को समझकर सही उच्चारण आसानी से किया जा सकता है।"
        },
        {
          id: "faq-three-numbers",
          question: "संस्कृत में दो के स्थान पर तीन वचनों का प्रयोग क्यों किया जाता है?",
          primaryAnswer: "संस्कृत में तीन वचन (एकवचन, द्विवचन, बहुवचन) होते हैं ताकि दो वस्तुओं के लिए विशिष्ट रूप से प्रयोग किया जा सके।",
          detailedAnswer: "द्विवचन (Dvivacana) का प्रयोग विशेष रूप से दो वस्तुओं (जैसे दो हाथ, दो आंखें) के संदर्भ में किया जाता है, जो वाक्य को और अधिक स्पष्ट बनाता है।"
        },
        {
          id: "faq-identify-splits",
          question: "जटिल श्लोकों में संधि विच्छेद की पहचान आसानी से कैसे की जा सकती है?",
          primaryAnswer: "मूल शब्दों को अलग करके, स्वरों के मिलन बिंदु को देखकर और संधि नियमों को उलटकर विच्छेद की पहचान की जा सकती है।",
          detailedAnswer: "दीर्घ स्वर, य् या व् जैसे अर्ध-स्वर, या ओ और र् जैसी ध्वनियों को देखकर संधि विच्छेद का पता लगाया जाता है।"
        },
        {
          id: "faq-six-karakas",
          question: "छह मुख्य कारक कौन से हैं और वे किन विभक्तियों से जुड़े हैं?",
          primaryAnswer: "छह कारक कर्ता, कर्म, करण, सम्प्रदान, अपादान और अधिकरण हैं, जो क्रमशः प्रथमा, द्वितीया, तृतीया, चतुर्थी, पंचमी और सप्तमी से जुड़े हैं।",
          detailedAnswer: "सम्बन्ध (षष्ठी विभक्ति) और सम्बोधन को सीधे क्रिया से न जुड़े होने के कारण संस्कृत में स्वतंत्र कारक नहीं माना जाता।"
        }
      ]
    },
    practice: {
      yourProgress: "आपकी प्रगति",
      currentTier: "वर्तमान श्रेणी",
      chaptersCompleted: "पूर्ण किए गए अध्याय",
      streakCount: "लगातार अभ्यास दिन",
      days: "दिन",
      syllabusShorthand: "पाठ्यक्रम संक्षिप्त नियम",
      concept: "अवधारणा",
      paninianHeritage: "पाणिनीय परंपरा",
      interactivePractice: "इंटरैक्टिव अभ्यास",
      source: "स्रोत",
      identifyCorrect: "सही विकल्प की पहचान करें:",
      vyakaranHint: "व्याकरण संकेत",
      progressiveRevelation: "प्रगतिशील रहस्योद्घाटन अध्ययन:",
      revealWordByWord: "शब्द-दर-शब्द अर्थ प्रकट करें",
      wordByWordBreakdown: "शब्द-दर-शब्द व्याकरण विश्लेषण",
      revealGrammar: "अंतर्निहित व्याकरण नियम प्रकट करें",
      grammarRuleAnalysis: "व्याकरण नियम और पाणिनीय विश्लेषण",
      hideDetails: "विवरण छिपाएं",
      reportError: "त्रुटि रिपोर्ट करें",
      nextQuestion: "अगला प्रश्न",
      completeChapter: "अध्याय पूरा करें",
      learningMap: "सीखने का मानचित्र",
      activeUnit: "सक्रिय इकाई",
      chapterAccomplished: "अध्याय संपन्न हुआ!",
      chapterAccomplishedDesc: "बहुत बढ़िया! आपने **{chapterName}** के लिए सभी व्याकरण अभ्यास पूरे कर लिए हैं। आपकी अभ्यास ज्वाला बढ़ गई है।",
      practiceAgain: "पुनः अभ्यास करें",
      nextChapter: "अगला अध्याय",
      loading: "संस्कृत अभ्यास चेसिस लोड हो रहा है...",
      curriculumFlow: "पाठ्यक्रम प्रवाह",
      questionOf: "प्रश्न {current} का {total}",
      scriptureCommentaryContext: "शास्त्र टिप्पणी संदर्भ",
      scriptureFlow: "शास्त्र प्रवाह",
      aksharaSyllables: "अक्षर शब्दांश",
      matraDuration: "मात्रा अवधि",
      uchcharanaLocation: "उच्चारण स्थान",
      reportTitle: "सामग्री त्रुटि / विसंगति की रिपोर्ट करें",
      reportSuccess: "विसंगति रिपोर्ट सबमिट की गई। संस्कृतभाषी को त्रुटिहीन रखने के लिए धन्यवाद!",
      reportCategory: "त्रुटि श्रेणी",
      reportDetails: "विवरण / सुधार सुझाव",
      reportPlaceholder: "टाइपिंग त्रुटियां, ऑडियो विसंगति विवरण, या गलत व्याकरण परिभाषाएं निर्दिष्ट करें...",
      reportSubmit: "रिपोर्ट भेजें",
      reportSubmitting: "सबमिट किया जा रहा है...",
      reportCancel: "रद्द करें",
      reportErrorMsg: "त्रुटि रिपोर्ट सबमिट करने में विफल। कृपया पुन: प्रयास करें।",
      categoryVyakaran: "गलत व्याकरण नियम",
      categoryAudio: "ऑडियो विसंगति",
      categoryTypo: "लिप्यंतरण में त्रुटि",
      categoryTranslation: "त्रुटिपूर्ण अनुवाद",
      categoryOther: "अन्य समस्या"
    }
  },
  ja: {
    nav: {
      home: "ホーム",
      schoolPrep: "試験対策",
      shastraStudy: "シャーストラ学習",
      about: "会社概要",
      faqs: "よくある質問",
      privacy: "プライバシーポリシー",
      terms: "利用規約"
    },
    home: {
      heroSub: "🔥 オンボーディングツアーを開始する",
      heroTitle: "聖者（リシ）の言語を",
      heroTitleSpan: "精密",
      heroTitleEnd: "にマスターする",
      heroDesc: "学術的に厳格でインタラクティブなサンスクリット語学習エコシステム。サンスクリット・バーシは、文法の段階的な開示機能を備えた本格的なギーターおよびバーガヴァタムのシュローカ学習と並んで、NCERT準拠の学校試験対策モジュールを提供します。",
      ctaSchool: "試験対策を始める",
      ctaShastra: "シャーストラを学ぶ",
      socialProof: "世界中で5万以上の学生、教師、そしてヴェーダ学者に信頼されています。",
      consensusTitle: "学術的な合意と権威",
      consensusDesc: "サンスクリット・バーシにおけるすべての文法分析は、パーニニの『アシュターディヤーイー』と直接照合され、主要なサンスクリット大学の学者によって検証されています。",
      q1: "なぜサンスクリット語の学習に体系的な言語学的アプローチが不可欠なのですか？",
      a1: "サンスクリット語は、パーニニの『アシュターディヤーイー』の3,959の公式によって規制された、語根と動詞語根（ダートゥ）を中心に構築された、高度に屈折した規則的な数学的言語です。体系的な文法構造を通じてサンスクリット語にアプローチすることで、正確な音写と翻訳が保証され、古典期以降の方言によく見られる語彙の曖昧さが排除されます。",
      q2: "二重学習トラックモデルは、さまざまな学習者層にどのように役立ちますか？",
      a2: "学術的な目標は定期試験に必要な文法公式（サンディ、ヴィバクティ、動詞活用）に焦点を当てているのに対し、スピリチュアルな学習パスは深い意味解釈（アンヴァヤ）、単語ごいる哲学的翻訳、音響学（シクシャー）を必要とするため、当プラットフォームでは学校カリキュラムとシャーストラ研究を明確に分離しています。",
      schoolPrep: "6-12学年向け学校試験対策",
      schoolPrepDesc: "サンディ、カーラカ、ヴィバクティをカバーするNCERT準拠の文法モジュール。体系化された規則により、試験への自信を培います。",
      shastraStudy: "シャーストラ学習トラック",
      shastraStudyDesc: "古典的なシュローカを単語ごとに分解して学習します。アクティブな音声ガイドを用いて、本格的なデーヴァナーガリー発音を練習できます。",
      schoolList: [
        "6〜12年生向けの100% NCERTシラバス準拠。",
        "サンディ、カーラカ、ヴィバクティの規則に関する厳格な学習。",
        "パーニニの『アシュターディヤーイー』に裏付けられた本格的な典拠。"
      ],
      schoolBtn: "試験対策教室に入る",
      shastraList: [
        "バガヴァッド・ギーターとシュリーマド・バーガヴァタムのシュローカ解体。",
        "単語ごとの文法分割と意味の対応。",
        "発音ガイドのための音響波オーディオインターフェース。"
      ],
      shastraBtn: "シャーストラ学習室に入る"
    },
    schoolPrep: {
      title: "NCERT 6-12年生サンスクリットモジュール",
      desc: "CBSEおよび州教育委員会のサンスクリット文法シラバスをマスターします。このモジュールは規則を分かりやすいパーニニ公式に分解します。",
      part1: "シラバス第1部：サンディ（連声）規則",
      part2: "シラバス第2部：カーラカ（格関係）とヴィバクティ（格変化）",
      q1: "ディールガ・サンディ（長音化連声）とは何ですか？どのように形成されますか？",
      a1: "ディールガ・サンディは、単語の境界で2つの同音の母音が連続した際、それらが合体して対応する1つの長母音になる連声です。",
      rule1: "Akaḥ Savarṇe Dīrghaḥ（類似の母音が連続すると長音化する）",
      example1: "पुस्तक + आलयः = पुस्तकालयः (書物 + 場所 = 図書館)",
      attribution1: "パーニニ『アシュターディヤーイー』 6.1.101",
      q2: "ヤン・サンディとは何ですか？その半母音化はどのように発生しますか？",
      a2: "ヤン・サンディは、母音 i, u, ṛ, ḷ の直後に異なる母音が続いた場合に、前者がそれぞれ対応する半母音 y, v, r, l に変換される連声規則です。",
      rule2: "Iko Yaṇaci（i/u/ṛ/ḷ + 異なる母音 = y/v/r/l + 母音）",
      example2: "प्रति + एकम् = प्रत्येकम् (各々 / すべて)",
      attribution2: "パーニニ『アシュターディヤーイー』 6.1.77",
      q3: "カーラカとヴィバクティの関係はサンスクリット文の構造をどのように規定しますか？",
      a3: "カーラカは名詞が動作（動詞）に対して果たす役割を定義し、能動態または受動態に応じて7つの格（ヴィバクティ）のいずれかに割り当てられます。",
      rule3: "Karturīpsitatamaṁ Karma（動作主が最も直接的に志向する対象がカルマ（目的語）となり、対格（第2格）が適用される）",
      example3: "बालकः पुस्तकं पठति (少年が本を読む - 『本』が目的語として第2格をとる)",
      attribution3: "パーニニ『アシュターディヤーイー』 1.4.49",
      labTitle: "インタラクティブ・ラボ",
      labDesc: "文法カードを解いてみましょう。正解すると学習継続の炎（ストリーク）が成長します！"
    },
    shastraStudy: {
      title: "シャーストラ学習モジュール",
      desc: "聖典の文法的なマトリクスを分解します。シュローカを単語ごとに解析し、発音の規則をマスターします。",
      sectionTitle: "バガヴァッド・ギーターのシュローカ言語構造",
      q1: "サンディ（連声）の分割を理解することは、ギーターの翻訳にどう影響しますか？",
      a1: "サンスクリットの古典聖典では、音節のリズム（アヌシュトゥプ韻律）を維持するため、単語が密接に結合しています。サンディを正しく解きほぐすこと（サンディ・ヴィッチェーダ）は、単語ごとの意味を理解し、哲学的な誤解を防ぐための不可欠な第一歩です。",
      rule1: "Visarjanīyasya saḥ（無声音の c, t, t などの直後でヴィサルガ『ḥ』が『s』に変化する）",
      example1: "नमः + ते = नमस्ते (Namas + te = Namaste)",
      attribution1: "パーニニ『アシュターディヤーイー』 8.3.34",
      q2: "マハーバーラタおよびギーターの伝統において、主な編纂者は誰とされていますか？",
      a2: "クルクシェートラの戦場でギーターを直接語ったのはクリシュナであり、これらの韻文を大叙事詩マハーバーラタの中に編纂したのは聖者ヴャーサです。",
      rule2: "役割：ヴャーサ（編纂）、クリシュナ（語り手）。",
      attribution2: "『マハーバーラタ』ビーシュマ・パルヴァ 25-42章",
      labTitle: "シュローカラボ",
      labDesc: "シュローカを聴き、単語ごとの意味を分析し、正しい翻訳を選択してください。"
    },
    about: {
      title: "サンスクリット・バーシについて",
      desc: "現代的なインタラクティブ・インターフェースと厳格な学術基準を通じて、サンスクリット語の聖なる構文を保存します。",
      authorityTitle: "言語学的および学術的権威",
      authorityDesc: "サンスクリット・バーシは、古代の音韻規則と現代のウェブ仕様を融合させるため、サンスクリットの教授陣と開発チームによって設計されました。",
      q1: "サンスクリット・バーシの主な教育理念は何ですか？",
      a1: "古典サンスクリット文法を世界の学習者に届けるため、厳格なパーニニ公式と現代的な対話型レッスンを組み合わせ、単語の関連性と文法読解力を構築することです。",
      q2: "コンテンツの文法的な正確性はどのように保証されていますか？",
      a2: "すべての解説、連声分割、シュローカ解体は学術評議会により検証され、パタンジャリの『マハーバーシュヤ』およびパーニニの『アシュターディヤーイー』と照合されています。",
      q3: "国際的な転写規格やフォント規格に対応していますか？",
      a3: "はい。デーヴァナーガリー表記に加え、国際サンスクリット転写規格（IAST）、日本語のカタカナ、フランス語の発音表記に対応するフルUnicodeフォント互換性を備えています。",
      councilTitle: "学術評議会と諮問委員会",
      councilDesc: "サンスクリット・バーシは、言語保存に尽力する優れた学者グループによって運営されています：",
      member1Name: "R. ヴァスデーヴァン 博士",
      member1Role: "サンスクリット文法学教授、SSU元教授",
      member1Desc: "パーニニ公式および音声音響学の権威。",
      member2Name: "高橋 賢二 教授",
      member2Role: "京都大学 アジア言語学科",
      member2Desc: "印欧語比較言語学およびカタカナ音写研究の専門家。"
    },
    faqs: {
      title: "サンスクリット・バーシ ナレッジベース",
      desc: "疑問がありますか？当評議会がまとめた明確な回答を提供します。",
      list: [
        {
          id: "faq-gita-study",
          question: "バガヴァッド・ギーター第2章47節は、日常の学習にどのように適用できますか？",
          primaryAnswer: "ギーター第2章47節は『ニシュカーマ・カルマ』（無先の行為）を説いており、あなたの権限は義務を実行すること自体にあり、その結果を支配することにはないとしています。",
          detailedAnswer: "これを勉強に適用すると、試験の点数や結果に執着せず、今この瞬間の学習行為に集中することを意味します。結果への不安を捨てることで、集中力と記憶力が大幅に向上します。"
        },
        {
          id: "faq-sandhi-samasa",
          question: "サンスクリット文法において、サンディ（連声）とサマーサ（複合詞）の違いは何ですか？",
          primaryAnswer: "サンディは単語境界における発音（音素）の結合であり、サマーサは複数の単語を意味的に連結して1つの複合語にする文法要素です。",
          detailedAnswer: "サンディは隣接する母音や子音の文字変化を引き起こします（例: Deva + Alayah = Devalayah）。サマーサは格変化を隠して名詞をまとめます（例: 王の息子を意味する Rajaputra）。"
        },
        {
          id: "faq-panini-rule",
          question: "ヤン・サンディ（半母音化連声）の形成を規定するパーニニの規則は何ですか？",
          primaryAnswer: "ヤン・サンディは、パーニニの『アシュターディヤーイー』に記載された規則「Iko Yaṇaci」（6.1.77）によって規定されています。",
          detailedAnswer: "この規則は、母音群「Ik」（i, u, ṛ, ḷ)の直後に異なる母音「ac」が連続した場合、前の母音が対応する半母音（y, v, r, l）に変換されることを定めています。"
        },
        {
          id: "faq-vibhakti-case",
          question: "文の主語に対して、正しいヴィバクティ（格）をどのように判定すればよいですか？",
          primaryAnswer: "能動文の主語は、規則「Prātipadikārtha-liṅga-parimāṇa-vacana-mātre prathamā」に基づき、主格（第1格 / プラタマー・ヴィバクティ）をとります。",
          detailedAnswer: "受動態（カルマニ・プラヨーガ）の場合、目的語が第1格をとり、主語は具格（第3格 / トリティーヤー・ヴィバクティ）に変化します。"
        },
        {
          id: "faq-pronunciation-iast",
          question: "外国人は英語（アルファベット）のローマ字表記だけで正確な発音を学べますか？",
          primaryAnswer: "はい。各音素と一対一で正確に対応している国際サンスクリット転写規格（IAST）を使用することで、外国の方でも正しい発音を学ぶことができます。",
          detailedAnswer: "IASTでは、文字の下の点（ṭ, ḍ, ṇ）や上の線（ā, ī, ū）などの特殊文字（ダイアクリティカルマーク）が使われます。スペルが完全に発音と一致するため、規則を理解すれば正確な発音が可能です。"
        },
        {
          id: "faq-three-numbers",
          question: "サンスクリット語に単数・複数だけでなく『双数』があるのはなぜですか？",
          primaryAnswer: "サンスクリット語には単数、双数（両数）、複数の3つの数があり、対象がちょうど『2つ』であることを厳密に示すために使用されます。",
          detailedAnswer: "双数（Dvivacana）は、両手, 両目、または2人の対になる対象を表現する際に文法的に強制されます。これにより文の表現が非常に明確になります。"
        },
        {
          id: "faq-identify-splits",
          question: "複雑なシュローカの中で、どのようにサンディ（連声）の結合部を見つけますか？",
          primaryAnswer: "名詞の語幹を分離し、母音の結合箇所を特定して、連声の変化規則を逆算することで見つけることができます。",
          detailedAnswer: "長母音（ディールガ）、半母音の y や v（ヤン）、または o や r（グナ）の変化が単語の境界に現れるため、これらを目印に分割を行います。"
        },
        {
          id: "faq-six-karakas",
          question: "サンスクリットの6つのカーラカ（名詞の役割）と、対応する格は何ですか？",
          primaryAnswer: "6つのカーラカは、カルター（主格）、カルマ（対格）、カラーナ（具格）、サンプラダーナ (与格)、アパダーナ (奪格)、アディカラーナ (処格) であり、それぞれ第1, 2, 3, 4, 5, 7格に対応します。",
          detailedAnswer: "所有関係を表す属格（第6格）と、呼びかけを表す呼格は、動詞の動作に直接関与しないため、サンスクリット文法では独立したカーラカとはみなされません。"
        }
      ]
    },
    practice: {
      yourProgress: "学習進捗",
      currentTier: "現在のティア",
      chaptersCompleted: "完了した章の数",
      streakCount: "ストリーク数",
      days: "日",
      syllabusShorthand: "シラバスの要約規則",
      concept: "概念",
      paninianHeritage: "パーニニの伝承",
      interactivePractice: "インタラクティブ練習",
      source: "典拠",
      identifyCorrect: "正しい選択肢を選択してください：",
      vyakaranHint: "文法ヒント",
      progressiveRevelation: "段階的な開示学習：",
      revealWordByWord: "単語ごとの意味を表示",
      wordByWordBreakdown: "単語ごとの文法分解",
      revealGrammar: "関連する文法規則を表示",
      grammarRuleAnalysis: "文法規則とパーニニ分析",
      hideDetails: "詳細を非表示",
      reportError: "エラーを報告",
      nextQuestion: "次の問題へ",
      completeChapter: "章を完了する",
      learningMap: "学習マップ",
      activeUnit: "学習中のユニット",
      chapterAccomplished: "章を達成しました！",
      chapterAccomplishedDesc: "お見事！ **{chapterName}** のすべての文法演習を完了しました。ストリークの炎が大きくなりました。",
      practiceAgain: "もう一度練習する",
      nextChapter: "次の章へ",
      loading: "演習システムを読み込み中...",
      curriculumFlow: "カリキュラムフロー",
      questionOf: "問題 {current} / {total}",
      scriptureCommentaryContext: "経典の注釈文脈",
      scriptureFlow: "聖典フロー",
      aksharaSyllables: "音素 (アクシャラ)",
      matraDuration: "モーラ持続時間 (マートラー)",
      uchcharanaLocation: "発音位置 (ウッチャーラナ)",
      reportTitle: "コンテンツの誤り・不具合を報告",
      reportSuccess: "不具合報告が送信されました。サンスクリット・バーシの品質向上にご協力いただきありがとうございます！",
      reportCategory: "エラーカテゴリ",
      reportDetails: "詳細 / 修正案",
      reportPlaceholder: "入力ミス、音声の不一致、誤った文法定義などを具体的に入力してください...",
      reportSubmit: "報告を送信",
      reportSubmitting: "送信中...",
      reportCancel: "キャンセル",
      reportErrorMsg: "エラー報告の送信に失敗しました。もう一度お試しください。",
      categoryVyakaran: "不正確な文法規則",
      categoryAudio: "音声の不一致",
      categoryTypo: "翻字のタイポ",
      categoryTranslation: "誤訳・翻訳の不具合",
      categoryOther: "その他の問題"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      schoolPrep: "Prep Escolar",
      shastraStudy: "Estudio del Shastra",
      about: "Nosotros",
      faqs: "FAQs",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio"
    },
    home: {
      heroSub: "🔥 Experimente el Onboarding de Sanskritbhashi",
      heroTitle: "Domine el Idioma de los ",
      heroTitleSpan: "Rishis",
      heroTitleEnd: " con Precisión",
      heroDesc: "Un ecosistema interactivo de aprendizaje de sánscrito académicamente riguroso. Sanskritbhashi ofrece módulos de preparación escolar alineados con NCERT junto con el estudio auténtico de shlokas del Gita y Bhagavatam con revelación gramatical progresiva.",
      ctaSchool: "Iniciar Prep Escolar",
      ctaShastra: "Estudiar Shastras Clásicos",
      socialProof: "Confiado por más de 50,000 estudiantes, profesores y eruditos védicos en todo el mundo.",
      consensusTitle: "Consenso y Autoridad Académica",
      consensusDesc: "Todo el análisis gramatical en Sanskritbhashi se cruza directamente con el Ashtadhyayi de Panini y es validado por destacados académicos de universidades de sánscrito.",
      q1: "¿Por qué es esencial un enfoque lingüístico estructurado para estudiar el sánscrito?",
      a1: "El sánscrito es una lengua matemática muy flexionada y basada en reglas, estructurada en torno a sustantivos raíz y raíces verbales (Dhatus) reguladas por 3,959 fórmulas en el Ashtadhyayi de Panini. Abordar el sánscrito a través de estructuras gramaticales sistemáticas garantiza una transliteración y traducción precisas, eliminando la ambigüedad la cual a menudo se encuentra en los dialectos post-clásicos.",
      q2: "¿Cómo beneficia el modelo de doble pista a los diferentes tipos de estudiantes?",
      a2: "La plataforma separa la alineación del plan de estudios escolar de la exploración del shastra porque los objetivos académicos se centran en las fórmulas gramaticales (Sandhi, Vibhakti, conjugación) requeridas para los exámenes de la junta, mientras que los caminos espirituales requieren un desglose semántico profundo (Anvaya), traducciones filosóficas palabra por palabra y acústica de sonido (Shiksha).",
      schoolPrep: "Prep Escolar Clase 6-12",
      schoolPrepDesc: "Módulos de gramática alineados con NCERT que cubren Sandhi, Karak y Vibhakti. Construye confianza para los exámenes con reglas estructuradas.",
      shastraStudy: "Ruta de Estudio del Shastra",
      shastraStudyDesc: "Descompone los shlokas clásicos palabra por palabra. Practica la pronunciación auténtica de Devanagari con guía de audio activa.",
      schoolList: [
        "100% alineación con el plan de estudios NCERT para clases 6 a 12.",
        "Estudio riguroso de las reglas de Sandhi, Karak y Vibhakti.",
        "Atribuciones auténticas referenciadas al Panini Ashtadhyayi."
      ],
      schoolBtn: "Entrar al Aula Escolar",
      shastraList: [
        "Deconstrucción de shlokas del Bhagavad Gita y Srimad Bhagavatam.",
        "Divisiones gramaticales palabra por palabra y mapas de significado.",
        "Interfaz de audio de onda fonética para guía de pronunciación."
      ],
      shastraBtn: "Entrar a la Sala de Estudio"
    },
    schoolPrep: {
      title: "Módulo de Sánscrito NCERT Clases 6-12",
      desc: "Domine el plan de estudios de gramática sánscrita de CBSE y juntas estatales. Este módulo desglosa las reglas en fórmulas claras de Panini.",
      part1: "Parte 1 del Plan: Reglas de Sandhi (सन्धि)",
      part2: "Parte 2 del Plan: Karak y Vibhakti",
      q1: "¿Qué es Dirgha Sandhi y cómo se forma?",
      a1: "Dīrgha Sandhi es la fusión de dos vocales similares en su correspondiente vocal larga cuando se encuentran en el límite de una palabra.",
      rule1: "Akaḥ Savarṇe Dīrghaḥ (Vocales a/i/u/ṛ al encontrarse con una vocal similar se vuelven largas)",
      example1: "पुस्तक + आलयः = पुस्तकालयः (Libro + Abode = Biblioteca)",
      attribution1: "Panini Ashtadhyayi 6.1.101",
      q2: "¿Qué es Yan Sandhi y qué desencadena su transición vocal?",
      a2: "Yaṇ Sandhi es la transición gramatical donde las vocales i, u, ṛ o ḷ cambian a sus respectivas semivocales y, v, r o l cuando son seguidas por cualquier vocal diferente.",
      rule2: "Iko Yaṇaci (i/u/ṛ/ḷ + vocal diferente = y/v/r/l + vocal)",
      example2: "प्रति + एकम् = प्रत्येकम् (Cada uno / Todo)",
      attribution2: "Panini Ashtadhyayi 6.1.77",
      q3: "¿Cómo dicta la relación entre Karak y Vibhakti la estructura de la oración en sánscrito?",
      a3: "Kāraka representa el rol nominal que define la relación de un sustantivo con la acción (verbo), que se asigna a uno de los siete casos gramaticales (Vibhakti).",
      rule3: "Karturīpsitatamaṁ Karma (El objeto es lo más deseado por el agente, asignándose al caso acusativo / Dvitīyā Vibhakti)",
      example3: "बालकः पुस्तकं पठति (El niño lee el libro - 'libro' toma el segundo caso)",
      attribution3: "Panini Ashtadhyayi 1.4.49",
      labTitle: "Laboratorio Interactivo",
      labDesc: "Resuelve las tarjetas de gramática. Las respuestas correctas aumentarán tu racha."
    },
    shastraStudy: {
      title: "Módulo de Estudio del Shastra",
      desc: "Deconstruye la estructura gramatical de los textos espirituales. Desglosa shlokas palabra por palabra y domina el pronunciamiento.",
      sectionTitle: "Estructura Lingüística de los Shlokas del Bhagavad Gita",
      q1: "¿Cómo afecta entender la división de Sandhi a la traducción del Bhagavad Gita?",
      a1: "En las escrituras sánscritas clásicas, las palabras están unidas para mantener el ritmo (métrica Anuṣṭubh). Separar las palabras (Sandhi-Viccheda) es el primer paso para construir significados palabra por palabra.",
      rule1: "Visarjanīyasya saḥ (La visarga 'ḥ' cambia a 's' cuando es seguida por consonantes sordas como 'c', 't', 't')",
      example1: "नमः + ते = नमस्ते (Namas + te = Namaste)",
      attribution1: "Panini Ashtadhyayi 8.3.34",
      q2: "¿Quiénes son los compiladores originales acreditados en la tradición del Gita?",
      a2: "Krishna es el orador original del Bhagavad Gita en el campo de batalla de Kurukshetra, mientras que el Sabio Vyasa es el compilador histórico que unió los versos en el Mahabharata.",
      rule2: "Atribución: Vyasa (compilador) y Krishna (orador).",
      attribution2: "Mahabharata Bhishma Parva, Capítulos 25-42",
      labTitle: "Laboratorio de Shlokas",
      labDesc: "Escucha el shloka, analiza el significado palabra por palabra y elige la traducción correcta."
    },
    about: {
      title: "Sobre Sanskritbhashi",
      desc: "Preservar la sintaxis sagrada del sánscrito a través de interfaces interactivas modernas y estándares académicos rigurosos.",
      authorityTitle: "Autoridad Lingüística y Académica",
      authorityDesc: "Sanskritbhashi es creado por profesores de sánscrito y desarrolladores de software para unir las reglas fonéticas antiguas con la semántica web moderna.",
      q1: "¿Cuál es la misión educativa principal de Sanskritbhashi?",
      a1: "La misión de Sanskritbhashi es hacer accesible la gramática sánscrita clásica a estudiantes globales integrando reglas de Panini con interfaces modernas para construir fluidez de lectura.",
      q2: "¿Cómo garantiza Sanskritbhashi la exactitud de su contenido?",
      a2: "Cada lección, división de Sandhi y desglose de shloka es verificado por nuestro Consejo Académico, referenciado directamente con el Mahabhashya de Patanjali y el Ashtadhyayi de Panini.",
      q3: "¿Admite Sanskritbhashi estándares internacionales de transliteración?",
      a3: "Sí, Sanskritbhashi admite compatibilidad con fuentes Unicode, mostrando Devanagari junto con el estándar IAST, Katakana japonés y texto fonético francés.",
      councilTitle: "Consejo Académico y Junta Asesora",
      councilDesc: "Sanskritbhashi es dirigido por un grupo de destacados eruditos dedicados a la preservación del idioma:",
      member1Name: "Dr. R. Vasudevan, PhD",
      member1Role: "Profesor de Vyakarana, Retirado de SSU",
      member1Desc: "Experto en fórmulas paninianas y acústica fonética.",
      member2Name: "Prof. Kenji Takahashi",
      member2Role: "Departamento de Idiomas Asiáticos, Kioto",
      member2Desc: "Especialista en lingüística indoeuropea y transliteraciones a Katakana."
    },
    faqs: {
      title: "Base de Conocimiento de Sanskritbhashi",
      desc: "¿Tiene preguntas? Tenemos respuestas definitivas compiladas por nuestra junta académica.",
      list: [
        {
          id: "faq-gita-study",
          question: "¿Cómo se aplica el Bhagavad Gita Capítulo 2, Verso 47 a mis estudios diarios?",
          primaryAnswer: "El Bhagavad Gita Capítulo 2, Verso 47 enseña 'Niṣkāma Karma' (acción desinteresada), indicando que tu deber es actuar, no buscar los frutos.",
          detailedAnswer: "Aplicar esto a los estudios significa enfocarse completamente en aprender y practicar en lugar de preocuparse por calificaciones. Al liberar la mente de esa ansiedad, aumenta la retención."
        },
        {
          id: "faq-sandhi-samasa",
          question: "¿Cuál es la diferencia entre Sandhi y Samasa en la gramática sánscrita?",
          primaryAnswer: "Sandhi es una unión fonética de sonidos en los límites de las palabras, mientras que Samasa es una palabra compuesta que agrupa varios términos en uno.",
          detailedAnswer: "Sandhi modifica letras adyacentes (ej. Deva + Alayah = Devalayah). Samasa une conceptos semánticos ocultando los casos de las palabras (ej. Rajaputra que significa el hijo del rey)."
        },
        {
          id: "faq-panini-rule",
          question: "¿Qué regla de Panini regula la formación de Yan Sandhi?",
          primaryAnswer: "Yaṇ Sandhi está regulada por la regla de Panini 'Iko Yaṇaci' (Ashtadhyayi 6.1.77).",
          detailedAnswer: "Esta regla dicta que cuando una vocal del grupo 'Ik' (i, u, ṛ, ḷ) se encuentra con una vocal diferente, cambia a su correspondiente semivocal (y, v, r, l)."
        },
        {
          id: "faq-vibhakti-case",
          question: "¿Cómo determino el caso Vibhakti correcto para los sujetos de las oraciones?",
          primaryAnswer: "El sujeto en una oración activa toma el caso nominativo (Prathamā Vibhakti) según la regla 'Prātipadikārtha-liṅga-parimāṇa-vacana-mātre prathamā'.",
          detailedAnswer: "En voz pasiva (Karmani Prayoga), el objeto toma el caso nominativo y el sujeto pasa a tomar el caso instrumental (Tṛtīyā Vibhakti)."
        },
        {
          id: "faq-pronunciation-iast",
          question: "¿Pueden los no nativos aprender la pronunciación correcta usando transliteración en inglés?",
          primaryAnswer: "Sí, mediante el uso del Alfabeto Internacional de Transliteración Sánscrita (IAST), que tiene una correspondencia uno a uno con cada sonido sánscrito.",
          detailedAnswer: "IAST utiliza marcas diacríticas (como puntos bajo ṭ, ḍ o líneas sobre vocales como ā, ī). Como el sánscrito es puramente fonético, entender estos símbolos permite un pronunciamiento exacto."
        },
        {
          id: "faq-three-numbers",
          question: "¿Por qué el sánscrito utiliza tres números gramaticales en lugar de dos?",
          primaryAnswer: "El sánscrito cuenta con tres números (singular, dual y plural) para referirse de manera exacta a conjuntos de dos elementos.",
          detailedAnswer: "El número dual (Dvivacana) es obligatorio para referirse exactamente a dos cosas (como manos, ojos o parejas), aportando gran precisión a la oración."
        },
        {
          id: "faq-identify-splits",
          question: "¿Cómo puedo identificar fácilmente las uniones de Sandhi en shlokas complejos?",
          primaryAnswer: "Identificando las raíces de los sustantivos, buscando uniones vocales y revirtiendo las transformaciones de las reglas.",
          detailedAnswer: "Los estudiantes pueden buscar vocales largas, semivocales como 'y' y 'v' (Yan) o sonidos como 'o' y 'r' (Guna) en los límites de las palabras para dividir las compuestas."
        },
        {
          id: "faq-six-karakas",
          question: "¿Cuáles son los seis Karakas y sus correspondientes casos gramaticales?",
          primaryAnswer: "Los seis Karakas son Karta, Karma, Karana, Sampradana, Apadana y Adhikarana, asociados con los casos uno, dos, tres, cuatro, cinco y siete respectivamente.",
          detailedAnswer: "El caso genitivo (relación) y el vocativo (llamado) no son Karakas en sánscrito porque no conectan de forma directa con la acción principal de la oración."
        }
      ]
    },
    practice: {
      yourProgress: "Tu Progreso",
      currentTier: "Nivel Actual",
      chaptersCompleted: "Capítulos Completados",
      streakCount: "Racha Activa",
      days: "Días",
      syllabusShorthand: "Reglas Resumidas del Plan",
      concept: "Concepto",
      paninianHeritage: "Herencia Paniniana",
      interactivePractice: "Práctica Interactiva",
      source: "Fuente",
      identifyCorrect: "Identifique la opción correcta:",
      vyakaranHint: "Pista de Vyakaran",
      progressiveRevelation: "Estudio de Revelación Progresiva:",
      revealWordByWord: "Revelar Significado Palabra por Palabra",
      wordByWordBreakdown: "Desglose de Vyakaran Palabra por Palabra",
      revealGrammar: "Revelar Regla Gramatical Subyacente",
      grammarRuleAnalysis: "Análisis de Regla Gramatical y Panini",
      hideDetails: "Ocultar Detalles",
      reportError: "Reportar Error",
      nextQuestion: "Siguiente Pregunta",
      completeChapter: "Completar Capítulo",
      learningMap: "Mapa de Aprendizaje",
      activeUnit: "Unidad Activa",
      chapterAccomplished: "¡Capítulo Completado!",
      chapterAccomplishedDesc: "¡Excelente trabajo! Has completado todos los ejercicios de gramática para **{chapterName}**. Tu racha activa ha crecido.",
      practiceAgain: "Practicar de Nuevo",
      nextChapter: "Siguiente Capítulo",
      loading: "Cargando Práctica de Sánscrito...",
      curriculumFlow: "FLUJO DEL PLAN DE ESTUDIOS",
      questionOf: "PREGUNTA {current} DE {total}",
      scriptureCommentaryContext: "Contexto de Comentario de Escrituras",
      scriptureFlow: "FLUJO de ESCRITURAS",
      aksharaSyllables: "Sílabas Akṣara",
      matraDuration: "Duración de Mātrā",
      uchcharanaLocation: "Ubicación de Uccāraṇa",
      reportTitle: "Reportar Error de Contenido / Anomalía",
      reportSuccess: "Informe de anomalía enviado. ¡Gracias por mantener Sanskritbhashi impecable!",
      reportCategory: "Categoría del Error",
      reportDetails: "Detalles / Sugerencias de Corrección",
      reportPlaceholder: "Especifique errores de escritura, detalles de desajuste de audio o definiciones gramaticales incorrectas...",
      reportSubmit: "Enviar Informe",
      reportSubmitting: "Enviando...",
      reportCancel: "Cancelar",
      reportErrorMsg: "Error al enviar el reporte. Por favor intente de nuevo.",
      categoryVyakaran: "Regla de Vyakaran Inexacta",
      categoryAudio: "Desajuste de Audio",
      categoryTypo: "Error de Transliteración",
      categoryTranslation: "Traducción Rota",
      categoryOther: "Otro Problema"
    }
  }
};

export function getTranslation(lang: string): Translation {
  return translations[lang] || translations.en;
}
