import { Translation } from "./i18n";
import { prefGet, prefSet } from "./capacitorBridge";

export type CurriculumTier = "beginner" | "professional" | "expert";

export interface Question {
  id: string;
  phrase: string;
  transliterations: {
    devanagari: string;
    iast: string;
    japanese: string;
    french: string;
  };
  wordByWord: { sanskrit: string; english: string; role: string }[];
  grammaticalRule: string;
  sourceAttribution: string;
  options: string[]; // Strict quad-option layout
  correctIndex: number;
  hint: string;
  
  // Concept and Telemetry Data
  conceptType: string;
  paninianHeritage: string;
  sourceAttributionTelemetry: string;
  pronunciationAcoustics: {
    akshara: string;
    matra: string;
    uchcharana: string;
  };
}

export interface Chapter {
  id: number;
  name: string;
  tier: CurriculumTier;
  questions: Question[];
}

export interface UserProgress {
  currentTier: CurriculumTier;
  completedChapters: number[];
  streakCount: number;
  lastPracticeDate: string;
  gatewayScores: Record<string, number>;
}

// Structured mock data templates for each of the 5 concepts
interface SandhiTemplate {
  phrase: string;
  iast: string;
  split: string;
  options: string[];
  correctIndex: number;
  rule: string;
  sutraNum: string;
  ncertRef: string;
  hint: string;
  akshara: string;
  matra: string;
  uchcharana: string;
}

const SANDHI_TEMPLATES: SandhiTemplate[] = [
  {
    phrase: "महोत्सवः",
    iast: "mahotsavaḥ",
    split: "Mahā + Utsavaḥ",
    options: ["Mahā + Utsavaḥ (Guṇa)", "Maho + Tsavaḥ (Dīrgha)", "Mahā + Tsavaḥ (Vṛddhi)", "Maha + Utsavaḥ (Yan)"],
    correctIndex: 0,
    rule: "Ād Guṇaḥ",
    sutraNum: "6.1.87",
    ncertRef: "NCERT Class 7 Chapter 4",
    hint: "The ending vowel 'ā' in 'Mahā' meets the starting vowel 'u' in 'Utsavaḥ' to form the Guṇa vowel 'o'.",
    akshara: "ma-ho-tsa-vaḥ",
    matra: "1-2-2-2 (Laghu-Guru-Guru-Guru)",
    uchcharana: "Kanthya, Oṣṭhya, Talavya"
  },
  {
    phrase: "यद्यपि",
    iast: "yadyapi",
    split: "Yadi + Api",
    options: ["Yada + Api (Dīrgha)", "Yad + Yapi (Hal)", "Yadi + Api (Yaṇ)", "Yadī + Api (Guṇa)"],
    correctIndex: 2,
    rule: "Iko Yaṇaci",
    sutraNum: "6.1.77",
    ncertRef: "NCERT Class 8 Chapter 2",
    hint: "The short 'i' at the end of 'Yadi' changes to the semi-vowel 'y' when followed by the dissimilar vowel 'a'.",
    akshara: "yad-ya-pi",
    matra: "2-1-1 (Guru-Laghu-Laghu)",
    uchcharana: "Talavya, Dantya, Kanthya"
  },
  {
    phrase: "तथैव",
    iast: "tathaiva",
    split: "Tathā + Eva",
    options: ["Tathā + Eva (Vṛddhi)", "Tatha + Eva (Guṇa)", "Tathā + Iva (Yan)", "Tath + Aiva (Hal)"],
    correctIndex: 0,
    rule: "Vṛddhir Eci",
    sutraNum: "6.1.88",
    ncertRef: "NCERT Class 9 Chapter 3",
    hint: "The vowel 'ā' at the end of 'Tathā' and the diphthong 'e' in 'Eva' combine into the long Vṛddhi vowel 'ai'.",
    akshara: "ta-thai-va",
    matra: "1-2-1 (Laghu-Guru-Laghu)",
    uchcharana: "Dantya, Kanthya, Dantyoṣṭhya"
  }
];

interface KarakTemplate {
  phrase: string;
  iast: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  rule: string;
  sutraNum: string;
  ncertRef: string;
  hint: string;
  akshara: string;
  matra: string;
  uchcharana: string;
}

const KARAK_TEMPLATES: KarakTemplate[] = [
  {
    phrase: "वृक्षात् पत्रं पतति",
    iast: "vṛkṣāt patraṁ patati",
    questionText: "Identify the Kāraka role and case of 'vṛkṣāt' (from the tree) in this sentence.",
    options: [
      "Apādāna Kāraka (Ablative / Pañcamī Vibhakti)",
      "Karaṇa Kāraka (Instrumental / Tṛtīyā Vibhakti)",
      "Karma Kāraka (Accusative / Dvitīyā Vibhakti)",
      "Adhikaraṇa Kāraka (Locative / Saptamī Vibhakti)"
    ],
    correctIndex: 0,
    rule: "Dhruvam apāye 'pādānam",
    sutraNum: "1.4.24",
    ncertRef: "NCERT Class 6 Chapter 9",
    hint: "The tree represents the fixed point/source from which the leaf separates, taking the Ablative case.",
    akshara: "vṛk-ṣāt pa-traṁ pa-ta-ti",
    matra: "2-2-1-2-1-1-1 (Guru-Guru-Laghu-Guru-Laghu-Laghu-Laghu)",
    uchcharana: "Mūrdhanya, Dantya, Kanthya, Oṣṭhya"
  },
  {
    phrase: "रामेण बाणः हतः",
    iast: "rāmeṇa bāṇaḥ hataḥ",
    questionText: "What Kāraka or Vibhakti rule governs the use of the word 'rāmeṇa' (by Rama) in this passive sentence?",
    options: [
      "Karmaṇi Dvitīyā (Accusative Case)",
      "Kartṛ-karaṇayos Tṛtīyā (Instrumental Agent)",
      "Dvitīyā Śrita-atīta (Compound Accusative)",
      "Caturthī Sampradāne (Dative Case)"
    ],
    correctIndex: 1,
    rule: "Kartṛ-karaṇayos tṛtīyā",
    sutraNum: "2.3.18",
    ncertRef: "NCERT Class 8 Chapter 7",
    hint: "In a passive construction (Karmaṇi Prayoga), the unexpressed agent (Rama) takes the 3rd (Instrumental) case.",
    akshara: "rā-me-ṇa bā-ṇaḥ ha-taḥ",
    matra: "2-2-1-2-2-1-2 (Guru-Guru-Laghu-Guru-Guru-Laghu-Guru)",
    uchcharana: "Kanthya, Dantya, Mūrdhanya, Oṣṭhya"
  }
];

interface ConjugationTemplate {
  phrase: string;
  iast: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  rule: string;
  sutraNum: string;
  ncertRef: string;
  hint: string;
  akshara: string;
  matra: string;
  uchcharana: string;
}

const CONJUGATION_TEMPLATES: ConjugationTemplate[] = [
  {
    phrase: "पठिष्यामि",
    iast: "paṭhiṣyāmi",
    questionText: "Identify the Dhatu, Lakāra (tense), Puruṣa, and Vacana of the verb form 'paṭhiṣyāmi'.",
    options: [
      "Dhatu: Paṭh, Lṛṭ Lakāra (Future), Uttama Puruṣa, Ekavacana",
      "Dhatu: Paṭh, Laṭ Lakāra (Present), Prathama Puruṣa, Dvivacana",
      "Dhatu: Paṭh, Laṅg Lakāra (Past), Madhyama Puruṣa, Plural",
      "Dhatu: Paṭh, Loṭ Lakāra (Imperative), Uttama Puruṣa, Singular"
    ],
    correctIndex: 0,
    rule: "Lṛṭ Śeṣe Ca",
    sutraNum: "3.3.15",
    ncertRef: "NCERT Class 7 Chapter 10",
    hint: "The infix '-iṣya-' denotes the future tense (Lṛṭ Lakāra) and the suffix '-mi' denotes first person (Uttama) singular.",
    akshara: "pa-ṭhiṣ-yā-mi",
    matra: "1-2-2-1 (Laghu-Guru-Guru-Laghu)",
    uchcharana: "Mūrdhanya, Dantya, Talavya"
  },
  {
    phrase: "अभवत्",
    iast: "abhavat",
    questionText: "Analyze the grammatical parameters of the verb 'abhavat' (became).",
    options: [
      "Dhatu: Bhū, Laṭ Lakāra (Present), Prathama Puruṣa, Plural",
      "Dhatu: Bhū, Laṅg Lakāra (Past), Prathama Puruṣa, Ekavacana",
      "Dhatu: Bhū, Vidhiliṅg Lakāra (Potential), Madhyama Puruṣa, Singular",
      "Dhatu: Bhash, Lṛṭ Lakāra (Future), Uttama Puruṣa, Singular"
    ],
    correctIndex: 1,
    rule: "Anadyatane Laṅg",
    sutraNum: "3.2.111",
    ncertRef: "NCERT Class 9 Chapter 8",
    hint: "The prefix 'a-' and the ending '-t' denote the past tense (Laṅg Lakāra) and third person singular.",
    akshara: "a-bha-vat",
    matra: "1-1-2 (Laghu-Laghu-Guru)",
    uchcharana: "Kanthya, Oṣṭhya, Dantya"
  }
];

interface SamasaTemplate {
  phrase: string;
  iast: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  rule: string;
  sutraNum: string;
  ncertRef: string;
  hint: string;
  akshara: string;
  matra: string;
  uchcharana: string;
}

const SAMASA_TEMPLATES: SamasaTemplate[] = [
  {
    phrase: "राजपुरुषः",
    iast: "rājapuruṣaḥ",
    questionText: "Identify the type of Samāsa compound and its Vigraha (split) for 'rājapuruṣaḥ' (king's servant).",
    options: [
      "Ṣaṣṭhī Tatpuruṣa Samāsa (Vigraha: Rājñaḥ puruṣaḥ)",
      "Itaretara Dvandva Samāsa (Vigraha: Rājā ca puruṣaḥ ca)",
      "Bahuvrīhi Samāsa (Vigraha: Rājā puruṣaḥ yasya saḥ)",
      "Avyayībhāva Samāsa (Vigraha: Puruṣam anu rājā)"
    ],
    correctIndex: 0,
    rule: "Ṣaṣṭhī Tatpuruṣaḥ",
    sutraNum: "2.2.8",
    ncertRef: "NCERT Class 10 Chapter 5",
    hint: "The relationship is possessive ('king's servant'), representing the Genitive Tatpuruṣa compound.",
    akshara: "rā-ja-pu-ru-ṣaḥ",
    matra: "2-1-1-1-2 (Guru-Laghu-Laghu-Laghu-Guru)",
    uchcharana: "Talavya, Oṣṭhya, Mūrdhanya"
  },
  {
    phrase: "पीताम्बरः",
    iast: "pītāmbaraḥ",
    questionText: "Analyze the compounding rules governing the term 'pītāmbaraḥ' (yellow-garmented one / Lord Vishnu).",
    options: [
      "Dvandva Samāsa (Vigraha: Pītaṁ ca ambaraṁ ca)",
      "Tatpuruṣa Samāsa (Vigraha: Pītasya ambaraḥ)",
      "Bahuvrīhi Samāsa (Vigraha: Pītāni ambarāṇi yasya saḥ)",
      "Karmadhāraya Samāsa (Vigraha: Pītam ambaram)"
    ],
    correctIndex: 2,
    rule: "Anekam-anyapadārthe (Bahuvrīhiḥ)",
    sutraNum: "2.2.24",
    ncertRef: "NCERT Class 10 Chapter 6",
    hint: "The compound refers to a third external entity ('he whose garments are yellow'), indicating Bahuvrīhi.",
    akshara: "pī-tām-ba-raḥ",
    matra: "2-2-1-2 (Guru-Guru-Laghu-Guru)",
    uchcharana: "Dantya, Oṣṭhya, Kanthya"
  }
];

interface AnvayaTemplate {
  phrase: string;
  iast: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  rule: string;
  sutraNum: string;
  ncertRef: string;
  hint: string;
  akshara: string;
  matra: string;
  uchcharana: string;
}

const ANVAYA_TEMPLATES: AnvayaTemplate[] = [
  {
    phrase: "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥",
    iast: "dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ | māmakāḥ pāṇḍavāścaiva kimakurvata sañjaya ||",
    questionText: "Choose the correct logical prose syntactical alignment (Anvaya) for the first verse of the Bhagavad Gita.",
    options: [
      "सञ्जय! धर्मक्षेत्रे कुरुक्षेत्रे समवेताः युयुत्सवः मामकाः पाण्डवाः च एव किम् अकुर्वत?",
      "युयुत्सवः समवेताः मामकाः पाण्डवाः च एव सञ्जय धर्मक्षेत्रे कुरुक्षेत्रे किम् अकुर्वत?",
      "किम् अकुर्वत सञ्जय मामकाः पाण्डवाः च एव धर्मक्षेत्रे कुरुक्षेत्रे समवेताः युयुत्सवः?",
      "धर्मक्षेत्रे कुरुक्षेत्रे मामकाः पाण्डवाः च एव समवेताः युयुत्सवः किम् अकुर्वत सञ्जय?"
    ],
    correctIndex: 0,
    rule: "Anvaya Prose Order Rules",
    sutraNum: "Gita 1.1 Syntax",
    ncertRef: "Bhagavad Gita Chapter 1, Verse 1",
    hint: "Start with the vocative address ('Sañjaya!'), followed by the locations, the subjects ('māmakāḥ pāṇḍavāḥ ca'), and end with the interrogative verb phrase.",
    akshara: "dhar-ma-kṣe-tre ku-ru-kṣe-tre sa-ma-ve-tā yu-yut-sa-vaḥ...",
    matra: "2-1-2-2-1-1-2-2-1-1-2-2-1-2-1-2...",
    uchcharana: "Mūrdhanya, Dantya, Kanthya, Oṣṭhya, Talavya"
  }
];

// Seed curriculum chapters programmatically across three tiers (30 chapters each, total 90 chapters)
export const buildCurriculum = (): Chapter[] => {
  const curriculum: Chapter[] = [];

  for (let i = 1; i <= 90; i++) {
    const tier: CurriculumTier = i <= 30 ? "beginner" : i <= 60 ? "professional" : "expert";
    const localId = i <= 30 ? i : i <= 60 ? i - 30 : i - 60;
    
    curriculum.push({
      id: i,
      name: `${tier.toUpperCase()} Chapter ${localId}: ${
        i === 1 ? "Vowels and Basic Sandhi" : i === 31 ? "Advanced Kāraka Relations" : i === 61 ? "Shastra Commentary & Anvaya" : `Curriculum Topic Part ${localId}`
      }`,
      tier,
      questions: generateQuestionsForChapter(i, tier)
    });
  }

  return curriculum;
};

// Seed handcrafted playable questions for compatibility with Playwright E2E tests
function getBeginnerChapter1Questions(): Question[] {
  return [
    {
      id: "beg-1-1",
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
      grammaticalRule: "Akaḥ Savarṇe Dīrghaḥ (Vowels a/i/u/ṛ meeting a similar vowel become long)",
      sourceAttribution: "Panini Ashtadhyayi 6.1.101 / NCERT Class 6 Chapter 3",
      options: [
        "Deva + Ālayaḥ (Dīrgha Sandhi)",
        "Deva + Layaḥ (Guṇa Sandhi)",
        "Dev + Ālayaḥ (Vṛddhi Sandhi)",
        "Deva + Alayaḥ (Yaṇ Sandhi)"
      ],
      correctIndex: 0,
      hint: "Observe the junction point: the 'a' at the end of 'Deva' and the 'ā' at the start of 'ālayaḥ' fuse into a long 'ā' (Devālayaḥ).",
      conceptType: "Sandhi & Word-Junctions",
      paninianHeritage: "Akaḥ Savarṇe Dīrghaḥ (6.1.101)",
      sourceAttributionTelemetry: "Ashtadhyayi 6.1.101",
      pronunciationAcoustics: {
        akshara: "de-vā-la-yaḥ",
        matra: "2-2-1-2 (Guru-Guru-Laghu-Guru)",
        uchcharana: "Kanthya, Oṣṭhya, Talavya"
      }
    },
    {
      id: "beg-1-2",
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
      grammaticalRule: "Iko Yaṇaci (i/u/ṛ/ḷ + dissimilar vowel = y/v/r/l + vowel)",
      sourceAttribution: "Panini Ashtadhyayi 6.1.77 / NCERT Class 7 Chapter 4",
      options: [
        "Iti + Evam (Yaṇ Sandhi)",
        "Ite + Vam (Dīrgha Sandhi)",
        "It + Evam (Guṇa Sandhi)",
        "Iti + Aivam (Vṛddhi Sandhi)"
      ],
      correctIndex: 0,
      hint: "The ending short 'i' in 'iti' undergoes transition into the semi-vowel 'y' when followed by the dissimilar vowel 'e' in 'evam'.",
      conceptType: "Sandhi & Word-Junctions",
      paninianHeritage: "Iko Yaṇaci (6.1.77)",
      sourceAttributionTelemetry: "Ashtadhyayi 6.1.77",
      pronunciationAcoustics: {
        akshara: "it-ye-vam",
        matra: "2-2-2 (Guru-Guru-Guru)",
        uchcharana: "Talavya, Dantya, Kanthya"
      }
    }
  ];
}

function getProfessionalChapter31Questions(): Question[] {
  return [
    {
      id: "prof-31-1",
      phrase: "नमस्ते",
      transliterations: {
        devanagari: "नमस्ते",
        iast: "namaste",
        japanese: "ナマステ",
        french: "namaste"
      },
      wordByWord: [
        { sanskrit: "नमः", english: "salutations", role: "Noun Base" },
        { sanskrit: "ते", english: "to you", role: "Dative pronoun" }
      ],
      grammaticalRule: "Visarjanīyasya saḥ (Visarga 'ḥ' changes to 's' when followed by hard voiceless consonants like 't')",
      sourceAttribution: "Panini Ashtadhyayi 8.3.34 / NCERT Class 8 Chapter 6",
      options: [
        "Namaḥ + Te (Visarga Sandhi)",
        "Namas + Te (Hal Sandhi)",
        "Nama + Ste (Dīrgha Sandhi)",
        "Namaḥ + Ate (Guṇa Sandhi)"
      ],
      correctIndex: 0,
      hint: "The final Visarga 'ḥ' in 'Namaḥ' encounters the hard consonant 't' of 'te' and becomes a sibilant 's'.",
      conceptType: "Sandhi & Word-Junctions",
      paninianHeritage: "Visarjanīyasya saḥ (8.3.34)",
      sourceAttributionTelemetry: "Ashtadhyayi 8.3.34",
      pronunciationAcoustics: {
        akshara: "na-mas-te",
        matra: "1-2-2 (Laghu-Guru-Guru)",
        uchcharana: "Kanthya, Dantya"
      }
    }
  ];
}

function getExpertChapter61Questions(): Question[] {
  return [
    {
      id: "exp-61-1",
      phrase: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      transliterations: {
        devanagari: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
        iast: "karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||",
        japanese: "カルマニェーヴァーディカーラステ マ... (truncated)",
        french: "karmanyevadhikaraste ma..."
      },
      wordByWord: [
        { sanskrit: "कर्मणि", english: "in action", role: "Locative singular" },
        { sanskrit: "एव", english: "only", role: "Avyaya (emphasis)" },
        { sanskrit: "अधिकारः", english: "right", role: "Nominative singular" },
        { sanskrit: "ते", english: "your", role: "Genitive singular" }
      ],
      grammaticalRule: "Multiple Sandhis combined: Locative case denoting sphere of authority.",
      sourceAttribution: "Bhagavad Gita Chapter 2, Verse 47",
      options: [
        "Your right is to action alone, never to its fruits.",
        "Renounce action and sit in pure silence.",
        "Results are predetermined; action is irrelevant.",
        "All actions are illusion; only knowledge is real."
      ],
      correctIndex: 0,
      hint: "Recall that karmaṇi (action) + eva (alone) + adhikāraḥ (right) + te (your) defines active execution without result dependency.",
      conceptType: "Shloka Anvaya & Prose-Ordering",
      paninianHeritage: "Gita 2.47 Syntax",
      sourceAttributionTelemetry: "Bhagavad Gita 2.47",
      pronunciationAcoustics: {
        akshara: "kar-maṇ-ye-vā-dhi-kā-ras-te",
        matra: "2-2-2-2-1-2-2-2 (Guru-Guru-Guru-Guru-Laghu-Guru-Guru-Guru)",
        uchcharana: "Mūrdhanya, Dantya, Kanthya, Oṣṭhya"
      }
    }
  ];
}

// Generates uniquely structured questions for other chapters using our 5-concept algorithms
export const generateCurriculumQuestions = (chapterId: number, tier: CurriculumTier): Question[] => {
  const questions: Question[] = [];
  const conceptTypes = [
    "Sandhi & Word-Junctions",
    "Karak & Vibhakti Cases",
    "Dhatu-Rupa & Lakara Conjugations",
    "Samasa Compound Formations",
    "Shloka Anvaya & Prose-Ordering"
  ];

  for (let i = 0; i < 8; i++) {
    // Determine the concept algorithm dynamically based on question index and chapter ID
    const conceptIndex = (chapterId + i) % 5;
    const concept = conceptTypes[conceptIndex];
    const qId = `q-${tier}-${chapterId}-${i}`;

    let phrase = "";
    let iast = "";
    let options: string[] = [];
    let correctIndex = 0;
    let rule = "";
    let sutraNum = "";
    let ncertRef = "";
    let hint = "";
    let akshara = "";
    let matra = "";
    let uchcharana = "";
    let wordByWord: { sanskrit: string; english: string; role: string }[] = [];

    switch (conceptIndex) {
      case 0: {
        // Sandhi
        const temp = SANDHI_TEMPLATES[i % SANDHI_TEMPLATES.length];
        phrase = temp.phrase;
        iast = temp.iast;
        options = [...temp.options];
        correctIndex = temp.correctIndex;
        rule = temp.rule;
        sutraNum = temp.sutraNum;
        ncertRef = temp.ncertRef;
        hint = temp.hint;
        akshara = temp.akshara;
        matra = temp.matra;
        uchcharana = temp.uchcharana;
        wordByWord = [
          { sanskrit: temp.split.split(" + ")[0], english: "preceding stem", role: "Noun/Adjective" },
          { sanskrit: temp.split.split(" + ")[1], english: "following word", role: "Noun/Suffix" }
        ];
        break;
      }
      case 1: {
        // Karak & Vibhakti
        const temp = KARAK_TEMPLATES[i % KARAK_TEMPLATES.length];
        phrase = temp.phrase;
        iast = temp.iast;
        options = [...temp.options];
        correctIndex = temp.correctIndex;
        rule = temp.rule;
        sutraNum = temp.sutraNum;
        ncertRef = temp.ncertRef;
        hint = temp.hint;
        akshara = temp.akshara;
        matra = temp.matra;
        uchcharana = temp.uchcharana;
        wordByWord = [
          { sanskrit: phrase.split(" ")[0], english: "subject/agent", role: "Noun Stem" },
          { sanskrit: phrase.split(" ")[1], english: "object/action", role: "Verb/Noun" }
        ];
        break;
      }
      case 2: {
        // Dhatu & Conjugations
        const temp = CONJUGATION_TEMPLATES[i % CONJUGATION_TEMPLATES.length];
        phrase = temp.phrase;
        iast = temp.iast;
        options = [...temp.options];
        correctIndex = temp.correctIndex;
        rule = temp.rule;
        sutraNum = temp.sutraNum;
        ncertRef = temp.ncertRef;
        hint = temp.hint;
        akshara = temp.akshara;
        matra = temp.matra;
        uchcharana = temp.uchcharana;
        wordByWord = [
          { sanskrit: phrase, english: "conjugated form", role: "Verb (Tin-anta)" }
        ];
        break;
      }
      case 3: {
        // Samasa
        const temp = SAMASA_TEMPLATES[i % SAMASA_TEMPLATES.length];
        phrase = temp.phrase;
        iast = temp.iast;
        options = [...temp.options];
        correctIndex = temp.correctIndex;
        rule = temp.rule;
        sutraNum = temp.sutraNum;
        ncertRef = temp.ncertRef;
        hint = temp.hint;
        akshara = temp.akshara;
        matra = temp.matra;
        uchcharana = temp.uchcharana;
        wordByWord = [
          { sanskrit: phrase.substring(0, 4), english: "former compound member", role: "Upapada/Pūrva-pada" },
          { sanskrit: phrase.substring(4), english: "latter compound member", role: "Uttara-pada" }
        ];
        break;
      }
      case 4:
      default: {
        // Anvaya & Prose-Ordering
        const temp = ANVAYA_TEMPLATES[0]; // First shloka
        phrase = temp.phrase;
        iast = temp.iast;
        options = [...temp.options];
        correctIndex = temp.correctIndex;
        rule = temp.rule;
        sutraNum = temp.sutraNum;
        ncertRef = temp.ncertRef;
        hint = temp.hint;
        akshara = temp.akshara;
        matra = temp.matra;
        uchcharana = temp.uchcharana;
        wordByWord = [
          { sanskrit: "धर्मक्षेत्रे", english: "in the field of righteousness", role: "Locative Singular" },
          { sanskrit: "युयुत्सवः", english: "desiring to fight", role: "Nominative Plural" }
        ];
        break;
      }
    }

    // Inject uniquely structured semantic elements for GEO optimizations
    questions.push({
      id: qId,
      phrase,
      transliterations: {
        devanagari: phrase,
        iast,
        japanese: "サンスクリット発音",
        french: iast
      },
      wordByWord,
      grammaticalRule: `${rule} (Ashtadhyayi ${sutraNum}) - ${ncertRef}`,
      sourceAttribution: ncertRef,
      options,
      correctIndex,
      hint,
      conceptType: concept,
      paninianHeritage: `${rule} (${sutraNum})`,
      sourceAttributionTelemetry: ncertRef,
      pronunciationAcoustics: {
        akshara,
        matra,
        uchcharana
      }
    });
  }

  return questions;
};

// Main routing helper that handles handcrafted or dynamic logic
export const generateQuestionsForChapter = (chapterId: number, tier: CurriculumTier): Question[] => {
  if (chapterId === 1 && tier === "beginner") {
    return getBeginnerChapter1Questions();
  }
  if (chapterId === 31 && tier === "professional") {
    return getProfessionalChapter31Questions();
  }
  if (chapterId === 61 && tier === "expert") {
    return getExpertChapter61Questions();
  }
  return generateCurriculumQuestions(chapterId, tier);
};

// ─── Global engine state access ───────────────────────────────────────────────
//
// Storage Strategy: Async Write-Through Memory Cache
//
// Native (Capacitor):  Reads come from the in-memory cache hydrated by
//                      capacitorBridge.initPreferencesCache() at startup.
//                      Writes update the cache synchronously (instant),
//                      then fire-and-forget to @capacitor/preferences natively.
//
// Web (browser):       prefGet/prefSet transparently fall through to
//                      localStorage — identical behaviour to the original.
//
// The call signatures of getProgress() and saveProgress() are UNCHANGED so
// PracticeCard.tsx requires zero async refactoring.

export const INITIAL_PROGRESS: UserProgress = {
  currentTier: "beginner",
  completedChapters: [],
  streakCount: 0,
  lastPracticeDate: "",
  gatewayScores: {}
};

/** Native preference key — must match the key in capacitorBridge KNOWN_PREF_KEYS */
const PROGRESS_KEY = "sb_progress";

/**
 * Returns the current UserProgress state.
 * Reads synchronously from the write-through memory cache (or localStorage on web).
 * Returns INITIAL_PROGRESS if no saved state is found.
 */
export const getProgress = (): UserProgress => {
  if (typeof window === "undefined") return INITIAL_PROGRESS;
  try {
    // Primary read: write-through cache (populated at init; falls back to
    // localStorage automatically inside prefGet on web).
    const cached = prefGet(PROGRESS_KEY);
    if (cached) return JSON.parse(cached);

    // Legacy fallback: old localStorage key used before native bridge migration.
    // Allows a seamless upgrade for existing users.
    const legacy = localStorage.getItem("sanskrit_user_progress");
    if (legacy) {
      // One-time migration: persist to the new key
      prefSet(PROGRESS_KEY, legacy);
      return JSON.parse(legacy);
    }
  } catch (e) {
    console.error("[levelsEngine] Failed to parse progress:", e);
  }
  return INITIAL_PROGRESS;
};

/**
 * Persists a UserProgress snapshot.
 *  1. Writes to the in-memory cache synchronously (PracticeCard reads are instant)
 *  2. Writes to localStorage synchronously (web fallback + StreakCounter compat)
 *  3. Fire-and-forgets the write to @capacitor/preferences on native devices
 */
export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === "undefined") return;
  try {
    const serialised = JSON.stringify(progress);

    // 1 & 3: Write-through cache + async native storage (handled inside prefSet)
    prefSet(PROGRESS_KEY, serialised);

    // 2: Backwards-compatible direct localStorage writes for StreakCounter
    //    and any other legacy consumers that read these keys directly.
    localStorage.setItem("sanskrit_user_progress", serialised);
    localStorage.setItem("streak_count", String(progress.streakCount));
    localStorage.setItem("last_practice_date", progress.lastPracticeDate);
  } catch (e) {
    console.error("[levelsEngine] Failed to save progress:", e);
  }
};
