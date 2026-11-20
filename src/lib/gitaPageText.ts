/**
 * Labels and page metadata for the Gita for Students pages, in all four languages.
 * Chapter content itself comes from src/lib/gita/ (en/hi) and src/lib/gita/i18n/ (ja/es).
 */
import type { GitaLevel } from "./gita/types.ts";

export interface GitaText {
  module: string;
  tagline: string;
  levelNames: Record<GitaLevel, string>;
  levelHint: Record<GitaLevel, string>;
  chooseLevel: string;
  chooseAdhyaya: string;
  adhyaya: (n: number) => string;
  comingSoon: string;
  englishForNow: string;
  shlokaCount: (n: number) => string;
  story: string;
  crux: string;
  shlokas: string;
  shloka: string;
  wordMeanings: string;
  meaning: string;
  inYourLife: string;
  thinkAbout: string;
  memorise: string;
  readMode: string;
  revealNext: string;
  startAgain: string;
  memoriseHint: string;
  quizTitle: string;
  quizList: string;
  allAdhyayas: string;
  previous: string;
  next: string;
  otherEdition: (ref: string) => string;
  languageNote: string;
  reviewNote: string;
  translatedNote: string;
  hubTitle: string;
  hubDesc: string;
  courseName: string;
  /** Chapter page <title> parts: the first is required, the rest are dropped if too long. */
  pageTitleParts: (n: number, chapterTitle: string) => string[];
  pageDesc: (n: number, name: string, refs: string) => string;
}

/** Join title parts, dropping optional ones so the title stays within ~70 characters. */
export function fitTitle(parts: string[], max = 70): string {
  return parts.reduce((acc, p, i) => (i === 0 || [...(acc + p)].length <= max ? acc + p : acc), "");
}

const EN: GitaText = {
  module: "Gita for Students",
  tagline: "Understand the Bhagavad Gita one shloka at a time, through situations from your own school life.",
  levelNames: { 1: "Classes 6–8", 2: "Classes 9–10", 3: "Classes 11–12" },
  levelHint: {
    1: "Short, simple shlokas about courage, effort and doing your part.",
    2: "Steadiness, handling results, peer pressure and asking for guidance.",
    3: "The deeper ideas: the Self, ego, skill in action and your own path.",
  },
  chooseLevel: "Choose your level",
  chooseAdhyaya: "Adhyayas (chapters)",
  adhyaya: (n) => `Adhyaya ${n}`,
  comingSoon: "Coming soon",
  englishForNow: "In English for now",
  shlokaCount: (n) => `${n} shlokas`,
  story: "Where we are in the story",
  crux: "The teaching in three lines",
  shlokas: "Shlokas",
  shloka: "Shloka",
  wordMeanings: "Word meanings",
  meaning: "Meaning",
  inYourLife: "In your life",
  thinkAbout: "Think about it",
  memorise: "Memorise",
  readMode: "Show full shloka",
  revealNext: "Reveal next line",
  startAgain: "Start again",
  memoriseHint: "Say the hidden line aloud, then reveal it to check.",
  quizTitle: "Check your understanding",
  quizList: "Shlokas",
  allAdhyayas: "All adhyayas",
  previous: "Previous adhyaya",
  next: "Next adhyaya",
  otherEdition: (ref) => `${ref} in some editions`,
  languageNote: "This chapter is not yet available in your language, so it is shown in English.",
  reviewNote: "Verse numbers follow the Gita Press (Gorakhpur) edition.",
  translatedNote: "",
  hubTitle: "Bhagavad Gita for Students, Classes 6–12",
  hubDesc: "The Bhagavad Gita for Classes 6–12: each shloka with word meanings, a situation from school life, a reflection question and a quiz.",
  courseName: "Bhagavad Gita for Students",
  pageTitleParts: (n, t) => [`Bhagavad Gita Chapter ${n}: ${t}`, " for Students", " | Sanskritbhashi"],
  pageDesc: (n, name, refs) => `Bhagavad Gita Chapter ${n} (${name}), shlokas ${refs}: meaning, word meanings, school-life situations and a quiz, for Classes 6–12.`,
};

const HI: GitaText = {
  module: "विद्यार्थियों के लिए गीता",
  tagline: "अपने स्कूली जीवन की परिस्थितियों के माध्यम से, एक-एक श्लोक करके भगवद्गीता को समझिए।",
  levelNames: { 1: "कक्षा 6–8", 2: "कक्षा 9–10", 3: "कक्षा 11–12" },
  levelHint: {
    1: "साहस, प्रयास और अपना कर्तव्य निभाने पर छोटे, सरल श्लोक।",
    2: "स्थिरता, परिणामों का सामना, साथियों का दबाव और मार्गदर्शन माँगना।",
    3: "गहरे विचार: आत्मा, अहंकार, कर्म-कौशल और अपना मार्ग।",
  },
  chooseLevel: "अपना स्तर चुनें",
  chooseAdhyaya: "अध्याय",
  adhyaya: (n) => `अध्याय ${n}`,
  comingSoon: "जल्द आ रहा है",
  englishForNow: "अभी अंग्रेज़ी में",
  shlokaCount: (n) => `${n} श्लोक`,
  story: "कथा में हम कहाँ हैं",
  crux: "तीन पंक्तियों में शिक्षा",
  shlokas: "श्लोक",
  shloka: "श्लोक",
  wordMeanings: "शब्दार्थ",
  meaning: "भावार्थ",
  inYourLife: "आपके जीवन में",
  thinkAbout: "विचार कीजिए",
  memorise: "कंठस्थ करें",
  readMode: "पूरा श्लोक दिखाएँ",
  revealNext: "अगली पंक्ति दिखाएँ",
  startAgain: "फिर से शुरू करें",
  memoriseHint: "छिपी पंक्ति ज़ोर से बोलिए, फिर जाँचने के लिए उसे खोलिए।",
  quizTitle: "अपनी समझ जाँचिए",
  quizList: "श्लोक",
  allAdhyayas: "सभी अध्याय",
  previous: "पिछला अध्याय",
  next: "अगला अध्याय",
  otherEdition: (ref) => `कुछ संस्करणों में ${ref}`,
  languageNote: "यह अध्याय अभी आपकी भाषा में उपलब्ध नहीं है, इसलिए अंग्रेज़ी में दिखाया गया है।",
  reviewNote: "श्लोक-संख्या गीता प्रेस (गोरखपुर) संस्करण के अनुसार है।",
  translatedNote: "",
  hubTitle: "विद्यार्थियों के लिए भगवद्गीता: कक्षा 6–12",
  hubDesc: "कक्षा 6–12 के विद्यार्थियों के लिए भगवद्गीता: हर श्लोक का अर्थ, शब्दार्थ, स्कूली जीवन की एक परिस्थिति, चिंतन-प्रश्न और प्रश्नोत्तरी।",
  courseName: "विद्यार्थियों के लिए भगवद्गीता",
  pageTitleParts: (n, t) => [`गीता अध्याय ${n}: ${t}`, ", विद्यार्थियों के लिए", " | Sanskritbhashi"],
  pageDesc: (n, name, refs) => `गीता अध्याय ${n} (${name}) के श्लोक ${refs}: अर्थ, शब्दार्थ, स्कूली जीवन की परिस्थितियाँ और प्रश्नोत्तरी, कक्षा 6–12 के लिए।`,
};

const JA: GitaText = {
  module: "学生のためのギーター",
  tagline: "学校生活の身近な場面を通して、バガヴァッド・ギーターを一詩節ずつ理解しましょう。",
  levelNames: { 1: "6〜8年生", 2: "9〜10年生", 3: "11〜12年生" },
  levelHint: {
    1: "勇気、努力、自分の役割を果たすことについての、短くやさしい詩節。",
    2: "心の安定、結果との向き合い方、仲間からのプレッシャー、助言を求めること。",
    3: "より深い考え：本当の自己、エゴ、行為における巧みさ、自分の道。",
  },
  chooseLevel: "レベルを選ぶ",
  chooseAdhyaya: "章（アディヤーヤ）",
  adhyaya: (n) => `第${n}章`,
  comingSoon: "近日公開",
  englishForNow: "現在は英語のみ",
  shlokaCount: (n) => `${n}詩節`,
  story: "物語のどこにいるか",
  crux: "三行でわかる教え",
  shlokas: "詩節",
  shloka: "詩節",
  wordMeanings: "語の意味",
  meaning: "意味",
  inYourLife: "あなたの生活では",
  thinkAbout: "考えてみよう",
  memorise: "暗唱する",
  readMode: "詩節をすべて表示",
  revealNext: "次の行を表示",
  startAgain: "最初から",
  memoriseHint: "隠れた行を声に出して言ってから、表示して確かめましょう。",
  quizTitle: "理解度チェック",
  quizList: "詩節",
  allAdhyayas: "すべての章",
  previous: "前の章",
  next: "次の章",
  otherEdition: (ref) => `一部の版では ${ref}`,
  languageNote: "この章はまだ日本語に翻訳されていないため、英語で表示しています。",
  reviewNote: "詩節番号はギーター・プレス（ゴーラクプル）版に従っています。",
  translatedNote: "この章の解説・物語・クイズは英語版から翻訳したものです。",
  hubTitle: "学生のためのバガヴァッド・ギーター（6〜12年生）",
  hubDesc: "6〜12年生のためのバガヴァッド・ギーター。各詩節を語の意味、学校生活の場面、考える問い、クイズとともに学べます。",
  courseName: "学生のためのバガヴァッド・ギーター",
  pageTitleParts: (n, t) => [`バガヴァッド・ギーター第${n}章：${t}`, "（学生向け）", " | Sanskritbhashi"],
  pageDesc: (n, name, refs) => `バガヴァッド・ギーター第${n}章（${name}）の詩節 ${refs}。意味、語の意味、学校生活の場面、クイズで学ぶ6〜12年生向けの教材です。`,
};

const ES: GitaText = {
  module: "Gita para estudiantes",
  tagline: "Comprenda la Bhagavad Gita shloka a shloka, a través de situaciones de su propia vida escolar.",
  levelNames: { 1: "Clases 6–8", 2: "Clases 9–10", 3: "Clases 11–12" },
  levelHint: {
    1: "Shlokas breves y sencillos sobre el valor, el esfuerzo y cumplir con su parte.",
    2: "Serenidad, cómo afrontar los resultados, la presión del grupo y pedir consejo.",
    3: "Las ideas profundas: el Ser, el ego, la destreza en la acción y el propio camino.",
  },
  chooseLevel: "Elija su nivel",
  chooseAdhyaya: "Adhyayas (capítulos)",
  adhyaya: (n) => `Adhyaya ${n}`,
  comingSoon: "Próximamente",
  englishForNow: "Por ahora en inglés",
  shlokaCount: (n) => `${n} shlokas`,
  story: "En qué punto de la historia estamos",
  crux: "La enseñanza en tres líneas",
  shlokas: "Shlokas",
  shloka: "Shloka",
  wordMeanings: "Significado de las palabras",
  meaning: "Significado",
  inYourLife: "En su vida",
  thinkAbout: "Para reflexionar",
  memorise: "Memorizar",
  readMode: "Mostrar el shloka completo",
  revealNext: "Mostrar la siguiente línea",
  startAgain: "Empezar de nuevo",
  memoriseHint: "Diga en voz alta la línea oculta y luego muéstrela para comprobarla.",
  quizTitle: "Compruebe lo que ha entendido",
  quizList: "Shlokas",
  allAdhyayas: "Todos los adhyayas",
  previous: "Adhyaya anterior",
  next: "Adhyaya siguiente",
  otherEdition: (ref) => `${ref} en algunas ediciones`,
  languageNote: "Este capítulo aún no está disponible en español, por eso se muestra en inglés.",
  reviewNote: "La numeración de los versos sigue la edición de Gita Press (Gorakhpur).",
  translatedNote: "Las explicaciones, historias y preguntas de este capítulo se han traducido de la versión en inglés.",
  hubTitle: "La Bhagavad Gita para estudiantes, Clases 6–12",
  hubDesc: "La Bhagavad Gita para las Clases 6–12: cada shloka con el significado de sus palabras, una situación de la vida escolar, una pregunta para reflexionar y un cuestionario.",
  courseName: "La Bhagavad Gita para estudiantes",
  pageTitleParts: (n, t) => [`Bhagavad Gita, capítulo ${n}: ${t}`, " para estudiantes", " | Sanskritbhashi"],
  pageDesc: (n, name, refs) => `Bhagavad Gita, capítulo ${n} (${name}), shlokas ${refs}: significado, palabras, situaciones de la vida escolar y un cuestionario, para las Clases 6–12.`,
};

const ALL: Record<string, GitaText> = { en: EN, hi: HI, ja: JA, es: ES };

export function gitaPageText(lang: string): GitaText {
  return ALL[lang] ?? EN;
}
