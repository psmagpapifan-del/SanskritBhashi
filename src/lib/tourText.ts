/**
 * Onboarding tour text in all four UI languages. Each step points at an element id
 * in the layout (sidebar items, streak counter, language menu, quiz options, FAQs).
 * Keep the step order the same in every language: tests and the School Prep
 * redirect (step targeting "tour-step-7") rely on it.
 */
export interface TourStep {
  title: string;
  description: string;
  targetId: string;
  position: "center" | "relative";
}

export interface TourText {
  steps: TourStep[];
  counter: (n: number, total: number) => string;
  skip: string;
  next: string;
  finish: string;
  back: string;
  reopen: string;
  reopenTitle: string;
}

const T = (targets: string[], items: [string, string][]): TourStep[] =>
  items.map(([title, description], i) => ({ title, description, targetId: targets[i], position: targets[i] ? "relative" : "center" }));

// One target per step, shared by all languages.
const TARGETS = ["", "tour-step-2", "tour-step-3", "tour-step-4", "tour-step-gita", "tour-step-5", "tour-step-6", "tour-step-7", "tour-step-8"];

const EN: TourText = {
  steps: T(TARGETS, [
    ["Welcome to Sanskritbhashi! 🕉️", "Learn Sanskrit step by step: NCERT practice, the Bhagavad Gita and clear grammar guides. This quick 9-step tour shows you around."],
    ["Find your way", "All sections are here. On a phone this becomes a bar at the bottom of the screen; on a computer it is the sidebar."],
    ["School Prep (Classes 6–12)", "Practise every lesson of your NCERT Sanskrit textbook. Pick your class and go chapter by chapter."],
    ["Shastra Study", "Explore verses from the Bhagavad Gita and the Upanishads with word-by-word meaning and grammar."],
    ["Gita for Students", "One Gita shloka at a time, explained through a situation from your own school life. Choose Classes 6–8, 9–10 or 11–12, memorise the shloka and take a short quiz."],
    ["Keep your streak going 🔥", "Answer at least one question a day to grow your streak and build a steady study habit."],
    ["Language and script", "Switch the site language (English, हिन्दी, 日本語, Español) and choose how Sanskrit is shown: Devanagari, IAST, Katakana or French phonetic."],
    ["Practice and Exam modes", "Practice mode gives hints and brings back what you missed. Exam mode is one try per question; score 80% to pass."],
    ["Questions answered", "Common questions about Sanskrit grammar, the Gita and the courses are answered on the FAQ page."],
  ]),
  counter: (n, total) => `Tour (${n} of ${total})`,
  skip: "Skip Tour",
  next: "Next",
  finish: "Get Started",
  back: "Previous step",
  reopen: "Tour Guide",
  reopenTitle: "Restart the guided tour",
};

const HI: TourText = {
  steps: T(TARGETS, [
    ["संस्कृतभाषी में आपका स्वागत है! 🕉️", "संस्कृत एक-एक कदम सीखिए: एनसीईआरटी अभ्यास, भगवद्गीता और व्याकरण की सरल मार्गदर्शिकाएँ। यह 9 चरणों का छोटा भ्रमण आपको सब दिखाएगा।"],
    ["रास्ता खोजिए", "सभी भाग यहाँ हैं। फ़ोन पर यह स्क्रीन के नीचे की पट्टी बन जाता है; कंप्यूटर पर यह साइडबार है।"],
    ["स्कूल तैयारी (कक्षा 6–12)", "अपनी एनसीईआरटी संस्कृत पाठ्यपुस्तक के हर पाठ का अभ्यास कीजिए। अपनी कक्षा चुनिए और पाठ-दर-पाठ आगे बढ़िए।"],
    ["शास्त्र अध्ययन", "भगवद्गीता और उपनिषदों के श्लोकों को शब्दार्थ और व्याकरण सहित समझिए।"],
    ["विद्यार्थियों के लिए गीता", "एक-एक करके गीता के श्लोक, आपके अपने स्कूली जीवन की किसी परिस्थिति से समझाए गए। कक्षा 6–8, 9–10 या 11–12 चुनिए, श्लोक कंठस्थ कीजिए और छोटी प्रश्नोत्तरी दीजिए।"],
    ["अपनी लय बनाए रखिए 🔥", "रोज़ कम से कम एक प्रश्न का उत्तर दीजिए, ताकि आपकी लय बढ़े और पढ़ाई की पक्की आदत बने।"],
    ["भाषा और लिपि", "साइट की भाषा बदलिए (English, हिन्दी, 日本語, Español) और चुनिए कि संस्कृत कैसे दिखे: देवनागरी, IAST, कताकाना या फ़्रेंच उच्चारण।"],
    ["अभ्यास और परीक्षा मोड", "अभ्यास मोड संकेत देता है और छूटे प्रश्न दोबारा पूछता है। परीक्षा मोड में हर प्रश्न का एक ही प्रयास है; उत्तीर्ण होने के लिए 80% चाहिए।"],
    ["प्रश्नों के उत्तर", "संस्कृत व्याकरण, गीता और पाठ्यक्रमों के बारे में सामान्य प्रश्नों के उत्तर FAQ पृष्ठ पर हैं।"],
  ]),
  counter: (n, total) => `भ्रमण (${total} में से ${n})`,
  skip: "भ्रमण छोड़ें",
  next: "आगे",
  finish: "शुरू करें",
  back: "पिछला चरण",
  reopen: "भ्रमण गाइड",
  reopenTitle: "मार्गदर्शित भ्रमण फिर से शुरू करें",
};

const JA: TourText = {
  steps: T(TARGETS, [
    ["サンスクリットバーシーへようこそ！🕉️", "NCERT の練習、バガヴァッド・ギーター、わかりやすい文法ガイドで、サンスクリット語を一歩ずつ学びましょう。9 ステップの短いツアーでご案内します。"],
    ["メニュー", "すべてのセクションはここから開けます。スマートフォンでは画面下のバー、パソコンではサイドバーになります。"],
    ["スクールプレップ（6〜12年生）", "NCERT サンスクリット教科書の全課を練習できます。学年を選び、章ごとに進みましょう。"],
    ["聖典学習", "バガヴァッド・ギーターやウパニシャッドの詩節を、語ごとの意味と文法とともに学びます。"],
    ["学生のためのギーター", "ギーターの詩節を一つずつ、学校生活の身近な場面を通して理解します。6〜8年生・9〜10年生・11〜12年生から選び、詩節を暗唱して短いクイズに挑戦しましょう。"],
    ["連続記録を続けよう 🔥", "毎日少なくとも1問に答えて連続記録を伸ばし、学習の習慣を身につけましょう。"],
    ["言語と文字", "サイトの言語（English、हिन्दी、日本語、Español）を切り替え、サンスクリット語の表示方法（デーヴァナーガリー、IAST、カタカナ、フランス語式）を選べます。"],
    ["練習モードと試験モード", "練習モードではヒントが表示され、間違えた問題が後でもう一度出ます。試験モードは各問1回のみで、80%以上で合格です。"],
    ["よくある質問", "サンスクリット文法、ギーター、コースについてのよくある質問は FAQ ページで答えています。"],
  ]),
  counter: (n, total) => `ツアー（${n} / ${total}）`,
  skip: "ツアーをスキップ",
  next: "次へ",
  finish: "はじめる",
  back: "前のステップ",
  reopen: "ツアーガイド",
  reopenTitle: "ガイドツアーをもう一度見る",
};

const ES: TourText = {
  steps: T(TARGETS, [
    ["¡Bienvenido a Sanskritbhashi! 🕉️", "Aprenda sánscrito paso a paso: práctica NCERT, la Bhagavad Gita y guías de gramática claras. Este breve recorrido de 9 pasos le muestra todo."],
    ["Navegación", "Aquí están todas las secciones. En el móvil se convierte en una barra en la parte inferior; en el ordenador es la barra lateral."],
    ["School Prep (Clases 6–12)", "Practique cada lección de su libro de sánscrito NCERT. Elija su clase y avance capítulo a capítulo."],
    ["Estudio de los Shastras", "Explore versos de la Bhagavad Gita y las Upanishads con su significado palabra por palabra y su gramática."],
    ["Gita para estudiantes", "Un shloka de la Gita cada vez, explicado con una situación de la vida escolar. Elija Clases 6–8, 9–10 u 11–12, memorice el shloka y haga un breve cuestionario."],
    ["Mantenga su racha 🔥", "Responda al menos una pregunta al día para aumentar su racha y crear un hábito de estudio constante."],
    ["Idioma y escritura", "Cambie el idioma del sitio (English, हिन्दी, 日本語, Español) y elija cómo se muestra el sánscrito: devanagari, IAST, katakana o fonética francesa."],
    ["Modos de práctica y examen", "El modo práctica da pistas y repite lo que falló. El modo examen permite un intento por pregunta; se aprueba con el 80 %."],
    ["Preguntas frecuentes", "En la página de preguntas frecuentes se responden dudas habituales sobre la gramática sánscrita, la Gita y los cursos."],
  ]),
  counter: (n, total) => `Recorrido (${n} de ${total})`,
  skip: "Saltar recorrido",
  next: "Siguiente",
  finish: "Empezar",
  back: "Paso anterior",
  reopen: "Guía",
  reopenTitle: "Reiniciar el recorrido guiado",
};

const ALL: Record<string, TourText> = { en: EN, hi: HI, ja: JA, es: ES };

export function tourText(lang: string): TourText {
  return ALL[lang] ?? EN;
}

/** Locale from the current URL (/en/…, /hi/…, also /ja.html in the app build). */
export function langFromPath(pathname: string): string {
  const seg = (pathname.split("/")[1] || "en").replace(/\.html$/, "");
  return seg in ALL ? seg : "en";
}
