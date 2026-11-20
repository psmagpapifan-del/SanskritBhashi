/** Localized labels for the School Prep hub and per-class pages. */
type Lang = "en" | "hi" | "ja" | "es";

interface PageText {
  classLabel: (n: number) => string;
  chooseClass: string;
  lessons: (n: number) => string;
  questions: (n: number) => string;
  start: string;
  allClasses: string;
  classNav: string;
  chaptersHeading: (n: number) => string;
  title: (n: number, books: string) => string;
  desc: (n: number, books: string, lessons: number, questions: number) => string;
}

const TEXT: Record<Lang, PageText> = {
  en: {
    classLabel: (n) => `Class ${n}`,
    chooseClass: "Choose your class",
    lessons: (n) => `${n} lessons`,
    questions: (n) => `${n} questions`,
    start: "Start practising",
    allClasses: "All classes",
    classNav: "NCERT classes",
    chaptersHeading: (n) => `Class ${n} lessons`,
    title: (n, b) => `NCERT Sanskrit Class ${n} Quiz (${b})`,
    desc: (n, b, l, q) => `Practise every lesson of NCERT Sanskrit ${b}, Class ${n}: ${l} lessons, ${q} questions with hints, explanations, exam mode and review.`,
  },
  hi: {
    classLabel: (n) => `कक्षा ${n}`,
    chooseClass: "अपनी कक्षा चुनें",
    lessons: (n) => `${n} पाठ`,
    questions: (n) => `${n} प्रश्न`,
    start: "अभ्यास शुरू करें",
    allClasses: "सभी कक्षाएँ",
    classNav: "एनसीईआरटी कक्षाएँ",
    chaptersHeading: (n) => `कक्षा ${n} के पाठ`,
    title: (n, b) => `एनसीईआरटी संस्कृत कक्षा ${n} प्रश्नोत्तरी (${b})`,
    desc: (n, b, l, q) => `कक्षा ${n} की एनसीईआरटी संस्कृत ${b} के हर पाठ का अभ्यास: ${l} पाठ, ${q} प्रश्न — संकेत, व्याख्या, परीक्षा मोड और पुनरावृत्ति।`,
  },
  ja: {
    classLabel: (n) => `${n}年生`,
    chooseClass: "学年を選んでください",
    lessons: (n) => `${n}課`,
    questions: (n) => `${n}問`,
    start: "練習を始める",
    allClasses: "すべての学年",
    classNav: "NCERT の学年",
    chaptersHeading: (n) => `${n}年生の課`,
    title: (n, b) => `NCERT サンスクリット ${n}年生クイズ（${b}）`,
    desc: (n, b, l, q) => `${n}年生の NCERT サンスクリット教科書『${b}』の全課を練習：${l}課・${q}問。ヒント、解説、試験モード、間隔反復による復習付き。`,
  },
  es: {
    classLabel: (n) => `Clase ${n}`,
    chooseClass: "Elija su clase",
    lessons: (n) => `${n} lecciones`,
    questions: (n) => `${n} preguntas`,
    start: "Empezar a practicar",
    allClasses: "Todas las clases",
    classNav: "Clases NCERT",
    chaptersHeading: (n) => `Lecciones de la Clase ${n}`,
    title: (n, b) => `Sánscrito NCERT Clase ${n}: cuestionarios (${b})`,
    desc: (n, b, l, q) => `Practique cada lección de sánscrito NCERT ${b}, Clase ${n}: ${l} lecciones y ${q} preguntas con pistas, explicaciones, modo examen y repaso.`,
  },
};

export function ncertPageText(lang: string): PageText {
  return TEXT[(lang as Lang)] ?? TEXT.en;
}
