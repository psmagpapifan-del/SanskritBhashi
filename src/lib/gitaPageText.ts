/**
 * Labels for the Gita for Students pages. Content is in English and Hindi for now;
 * Japanese and Spanish pages use the English text (and are marked noindex).
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
  languageNote: "This module is available in English and Hindi for now.",
  reviewNote: "Verse numbers follow the Gita Press (Gorakhpur) edition.",
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
  languageNote: "यह मॉड्यूल अभी अंग्रेज़ी और हिंदी में उपलब्ध है।",
  reviewNote: "श्लोक-संख्या गीता प्रेस (गोरखपुर) संस्करण के अनुसार है।",
};

export function gitaPageText(lang: string): GitaText {
  return lang === "hi" ? HI : EN;
}
