/**
 * "Gita for students' problems": one page per problem a student might search for
 * ("exam stress", "anger", "परीक्षा का डर"), each gathering the shlokas on the site
 * that speak to it. The shloka text, meaning and school-life story come from the
 * chapter data; this file holds only the problem-specific writing.
 *
 * Written in English and Hindi. Japanese and Spanish pages fall back to English
 * and are noindex (see src/pages/[lang]/modules/gita/help/).
 */

export type ProblemLang = "en" | "hi";
export type ProblemGroup = "study" | "emotions";

export interface ProblemText {
  /** Short name for lists and links. */
  label: string;
  /** Page heading. */
  h1: string;
  /** <title>, kept within ~60 characters. */
  seoTitle: string;
  /** Meta description, ~150 characters. */
  desc: string;
  intro: string;
  /** Two or three sentences that answer the search directly. */
  quick: string;
  steps: [string, string, string];
  faqs: { q: string; a: string }[];
}

export interface Problem {
  slug: string;
  group: ProblemGroup;
  /** Show the mental-health help box. */
  help: boolean;
  /** Shloka refs, in reading order. */
  refs: string[];
  text: Record<ProblemLang, ProblemText>;
}

export const PROBLEMS: Problem[] = [
  {
    slug: "exam-stress",
    group: "study",
    help: true,
    refs: ["2.47", "3.30", "6.17", "12.12", "2.48", "18.66"],
    text: {
      en: {
        label: "Exam stress and fear of failure",
        h1: "Bhagavad Gita for exam stress: 6 shlokas for students",
        seoTitle: "Bhagavad Gita for Exam Stress: 6 Shlokas for Students",
        desc: "Scared of exams or board results? Six Bhagavad Gita shlokas that help students study calmly, put effort before marks and face results day.",
        intro:
          "Exam fear is rarely about the exam itself. It is about the result: marks, ranks, and what parents and friends will say. The Gita was spoken to someone frozen by exactly this kind of pressure. Arjuna stood before the biggest test of his life and could not lift his bow. Krishna's answer was not \"don't worry\". It was a practical way to act with full effort while letting go of the outcome you cannot control. These six shlokas, each with a story from school life, show how.",
        quick:
          "The Gita's answer to exam stress is 2.47: your right is to your effort, never to its results. Put your whole attention into the next hour of study, not the marksheet. When you stop gripping the result, the fear loosens and you study better (12.12).",
        steps: [
          "Before each study session, write down one specific task (\"finish exercise 4\"), not a marks target.",
          "When worry about results starts, repeat the first line of 2.47 to yourself and go back to the task in front of you.",
          "Stop studying an hour before bed the night before the exam. Sleep and a steady routine (6.17) help more than last-minute cramming.",
        ],
        faqs: [
          { q: "Which Gita shloka is best for exam stress?", a: "Most teachers point to 2.47, कर्मण्येवाधिकारस्ते मा फलेषु कदाचन: your right is to the action, never to its results. It moves your attention from marks, which you cannot control in the moment, to effort, which you can." },
          { q: "Does the Gita say marks don't matter?", a: "No. Krishna asks Arjuna to act with full effort and skill (2.50). The point is that worrying about the result while you work takes energy away from the work. Care about doing well; just don't let the outcome rule your mind." },
          { q: "How can I stay calm on results day?", a: "2.48 asks for evenness in success and failure (समत्वम्). Decide beforehand what you will do next if the result is good and if it isn't. Having a next step for both makes the day far less frightening." },
        ],
      },
      hi: {
        label: "परीक्षा का तनाव और असफलता का डर",
        h1: "परीक्षा के तनाव के लिए भगवद्गीता: विद्यार्थियों के लिए 6 श्लोक",
        seoTitle: "परीक्षा के तनाव के लिए गीता: विद्यार्थियों के लिए 6 श्लोक",
        desc: "परीक्षा या बोर्ड परिणाम का डर? भगवद्गीता के छह श्लोक जो शांत मन से पढ़ने, अंकों से पहले प्रयास पर ध्यान देने और परिणाम के दिन का सामना करने में मदद करते हैं।",
        intro:
          "परीक्षा का डर असल में परीक्षा का कम और परिणाम का ज़्यादा होता है: अंक, रैंक, और माता-पिता व दोस्त क्या कहेंगे। गीता ठीक ऐसे ही दबाव में जकड़े व्यक्ति से कही गई थी। अर्जुन अपने जीवन की सबसे बड़ी परीक्षा के सामने खड़े थे और धनुष नहीं उठा पा रहे थे। श्रीकृष्ण का उत्तर था \"चिंता मत करो\" नहीं, बल्कि एक व्यावहारिक तरीका: पूरे प्रयास से काम करो और उस परिणाम को छोड़ दो जो तुम्हारे वश में नहीं। स्कूली जीवन की कहानियों के साथ ये छह श्लोक यही दिखाते हैं।",
        quick:
          "परीक्षा के तनाव का गीता में उत्तर है 2.47: तुम्हारा अधिकार केवल कर्म पर है, उसके फल पर कभी नहीं। अपना पूरा ध्यान अगले एक घंटे की पढ़ाई पर लगाइए, अंकपत्र पर नहीं। जब आप परिणाम को कसकर पकड़ना छोड़ देते हैं, तो डर ढीला पड़ता है और पढ़ाई बेहतर होती है (12.12)।",
        steps: [
          "हर बार पढ़ने बैठने से पहले एक ठोस काम लिखिए (\"अभ्यास 4 पूरा करना\"), अंकों का लक्ष्य नहीं।",
          "जब परिणाम की चिंता शुरू हो, तो मन में 2.47 की पहली पंक्ति दोहराइए और सामने के काम पर लौट आइए।",
          "परीक्षा से पहले की रात, सोने से एक घंटा पहले पढ़ना बंद कर दीजिए। नींद और नियमित दिनचर्या (6.17) आख़िरी समय के रटने से ज़्यादा काम आती है।",
        ],
        faqs: [
          { q: "परीक्षा के तनाव के लिए गीता का कौन-सा श्लोक सबसे अच्छा है?", a: "अधिकतर शिक्षक 2.47 बताते हैं: कर्मण्येवाधिकारस्ते मा फलेषु कदाचन, यानी तुम्हारा अधिकार कर्म पर है, फल पर कभी नहीं। यह ध्यान अंकों से, जो उस समय आपके वश में नहीं, प्रयास पर ले आता है, जो आपके वश में है।" },
          { q: "क्या गीता कहती है कि अंक मायने नहीं रखते?", a: "नहीं। श्रीकृष्ण अर्जुन से पूरे प्रयास और कुशलता से कर्म करने को कहते हैं (2.50)। बात यह है कि काम करते समय परिणाम की चिंता काम की ऊर्जा छीन लेती है। अच्छा करने की परवाह कीजिए, बस परिणाम को मन पर राज मत करने दीजिए।" },
          { q: "परिणाम के दिन शांत कैसे रहूँ?", a: "2.48 सफलता और असफलता में समान रहने (समत्वम्) को कहता है। पहले से तय कर लीजिए कि परिणाम अच्छा आए तो आगे क्या करेंगे और अच्छा न आए तो क्या। दोनों के लिए अगला कदम तय हो तो वह दिन बहुत कम डरावना लगता है।" },
        ],
      },
    },
  },
  {
    slug: "focus-and-procrastination",
    group: "study",
    help: false,
    refs: ["6.34", "6.35", "2.62", "5.22", "12.9", "18.37"],
    text: {
      en: {
        label: "Focus, distraction and procrastination",
        h1: "Bhagavad Gita on focus and procrastination: 6 shlokas",
        seoTitle: "Bhagavad Gita on Focus and Procrastination: 6 Shlokas",
        desc: "Can't concentrate or keep putting off study? Six Bhagavad Gita shlokas on a restless mind, phone distraction and building focus, with school examples.",
        intro:
          "Even Arjuna, the greatest archer of his time, said his mind was as hard to hold as the wind (6.34). If you sit down to study and find yourself scrolling an hour later, you are in good company. The Gita doesn't shame a wandering mind. It explains how distraction grows (2.62), why quick pleasures leave you empty (5.22), and gives a simple method: steady practice and letting go (6.35), starting small (12.9).",
        quick:
          "Krishna agrees the mind is restless, and says it is trained by अभ्यास (steady practice) and वैराग्य (letting go of pulls) (6.35). In practice: start with a short, fixed study block, keep the phone out of reach, and come back gently each time you drift.",
        steps: [
          "Study in 25-minute blocks with the phone in another room. When the mind wanders, notice it and come back. Each return is the practice (6.35).",
          "Start with a step too small to refuse: open the book and read one page (12.9).",
          "Before \"just one more video\", ask how you will feel about it in an hour (18.37).",
        ],
        faqs: [
          { q: "What does the Gita say about controlling the mind?", a: "In 6.34 Arjuna says the mind is restless and strong, as hard to control as the wind. Krishna agrees, and in 6.35 says it can be trained by अभ्यास (practice) and वैराग्य (detachment)." },
          { q: "Is there a Gita shloka about phone or social media addiction?", a: "The Gita is far older than phones, but 2.62 describes the same chain: dwelling on something creates attachment, and attachment creates craving. 5.22 adds that pleasures born of the senses have a beginning and an end, so the wise don't build their happiness on them." },
          { q: "How do I stop procrastinating?", a: "12.9 offers a ladder: if you can't do the big thing, practise a smaller one. Shrink the task until starting feels easy, then return to it every day." },
        ],
      },
      hi: {
        label: "एकाग्रता, ध्यान भटकना और टालमटोल",
        h1: "एकाग्रता और टालमटोल पर भगवद्गीता: 6 श्लोक",
        seoTitle: "एकाग्रता और टालमटोल पर भगवद्गीता: 6 श्लोक",
        desc: "पढ़ाई में मन नहीं लगता या पढ़ाई टालते रहते हैं? चंचल मन, फ़ोन की लत और एकाग्रता पर भगवद्गीता के छह श्लोक, स्कूली जीवन के उदाहरणों के साथ।",
        intro:
          "अपने समय के सबसे महान धनुर्धर अर्जुन ने भी कहा था कि मन को पकड़ना हवा को पकड़ने जितना कठिन है (6.34)। अगर आप पढ़ने बैठते हैं और एक घंटे बाद स्वयं को फ़ोन स्क्रॉल करते पाते हैं, तो आप अकेले नहीं हैं। गीता भटकते मन को शर्मिंदा नहीं करती। वह बताती है कि ध्यान भटकना कैसे बढ़ता है (2.62), क्षणिक सुख खालीपन क्यों छोड़ते हैं (5.22), और एक सरल तरीका देती है: निरंतर अभ्यास और आसक्ति छोड़ना (6.35), छोटी शुरुआत के साथ (12.9)।",
        quick:
          "श्रीकृष्ण मानते हैं कि मन चंचल है, और कहते हैं कि उसे अभ्यास और वैराग्य से साधा जाता है (6.35)। व्यवहार में: पढ़ाई का एक छोटा, तय समय रखिए, फ़ोन पहुँच से दूर रखिए, और हर बार मन भटकने पर धीरे से लौट आइए।",
        steps: [
          "25 मिनट के खंडों में पढ़िए, फ़ोन दूसरे कमरे में रखकर। मन भटके तो ध्यान दीजिए और लौट आइए। हर बार लौटना ही अभ्यास है (6.35)।",
          "इतना छोटा कदम चुनिए कि मना न कर सकें: किताब खोलिए और एक पृष्ठ पढ़िए (12.9)।",
          "\"बस एक और वीडियो\" से पहले पूछिए कि एक घंटे बाद आपको इसके बारे में कैसा लगेगा (18.37)।",
        ],
        faqs: [
          { q: "मन को वश में करने के बारे में गीता क्या कहती है?", a: "6.34 में अर्जुन कहते हैं कि मन चंचल और बलवान है, हवा की तरह वश में करना कठिन। श्रीकृष्ण सहमत हैं, और 6.35 में कहते हैं कि अभ्यास और वैराग्य से उसे साधा जा सकता है।" },
          { q: "क्या फ़ोन या सोशल मीडिया की लत पर गीता का कोई श्लोक है?", a: "गीता फ़ोन से बहुत पुरानी है, पर 2.62 वही क्रम बताता है: किसी चीज़ का बार-बार चिंतन आसक्ति पैदा करता है, और आसक्ति से कामना। 5.22 जोड़ता है कि इंद्रियों से मिलने वाले सुखों का आरंभ और अंत होता है, इसलिए बुद्धिमान अपना सुख उन पर नहीं टिकाते।" },
          { q: "टालमटोल कैसे छोड़ूँ?", a: "12.9 एक सीढ़ी देता है: बड़ा काम न हो सके तो छोटे का अभ्यास कीजिए। काम को इतना छोटा कीजिए कि शुरू करना आसान लगे, फिर रोज़ उस पर लौटिए।" },
        ],
      },
    },
  },
  {
    slug: "bad-results-and-comparison",
    group: "study",
    help: false,
    refs: ["2.48", "6.40", "10.41", "3.35", "12.18", "4.38"],
    text: {
      en: {
        label: "Bad results and comparing with others",
        h1: "Bhagavad Gita on bad marks and comparing yourself with others",
        seoTitle: "Bhagavad Gita on Bad Marks and Comparison: 6 Shlokas",
        desc: "Disappointed by your marks or always comparing yourself with classmates? Six Bhagavad Gita shlokas on results, envy, your own path and real learning.",
        intro:
          "A marksheet can make you feel like a number, especially when someone else's number is higher. The Gita offers a different measure. No sincere effort is ever wasted (6.40). Others' talent is a spark of the same light you carry (10.41). Your own path, followed imperfectly, is better than copying someone else's (3.35). These six shlokas help put a result back in its place: important, but not the whole of you.",
        quick:
          "The Gita asks for evenness in success and failure (2.48) and promises that sincere effort is never lost (6.40). Compare yourself with your own last attempt, not with a classmate. Their success takes nothing away from yours (10.41).",
        steps: [
          "Write down three things you learnt while preparing, whatever the marks say. That learning stays with you (6.40, 4.38).",
          "When you catch yourself comparing, turn it into one question: what does that person do that I could try?",
          "Keep your own progress chart: this test against your last one, not against the class topper (3.35).",
        ],
        faqs: [
          { q: "What does the Gita say about failure?", a: "6.40 says that one who does good never comes to a bad end. Effort is never wasted, even when the result disappoints. 2.48 asks us to stay balanced in success and failure, because that steadiness is itself yoga." },
          { q: "How do I stop comparing myself with others?", a: "10.41 says every excellence is a spark of the Divine, so another person's talent is something to admire, not resent. 3.35 adds that your own path is better for you than someone else's, even if theirs looks shinier." },
          { q: "Do marks show how much I know?", a: "Not fully. 4.38 says nothing purifies like real knowledge, and that kind of understanding grows with time and practice. Use marks as feedback on what to work on next." },
        ],
      },
      hi: {
        label: "कम अंक और दूसरों से तुलना",
        h1: "कम अंक और दूसरों से तुलना पर भगवद्गीता",
        seoTitle: "कम अंक और दूसरों से तुलना पर गीता: 6 श्लोक",
        desc: "अपने अंकों से निराश हैं या हमेशा सहपाठियों से तुलना करते हैं? परिणाम, ईर्ष्या, अपने मार्ग और सच्ची पढ़ाई पर भगवद्गीता के छह श्लोक।",
        intro:
          "अंकपत्र आपको एक संख्या जैसा महसूस करा सकता है, ख़ासकर जब किसी और की संख्या ज़्यादा हो। गीता एक अलग पैमाना देती है। कोई सच्चा प्रयास कभी व्यर्थ नहीं जाता (6.40)। दूसरों की प्रतिभा उसी प्रकाश की चिंगारी है जो आपमें भी है (10.41)। अपना मार्ग, अधूरा ही सही, किसी और की नक़ल से बेहतर है (3.35)। ये छह श्लोक परिणाम को उसकी सही जगह पर रखने में मदद करते हैं: महत्वपूर्ण, पर आपकी पूरी पहचान नहीं।",
        quick:
          "गीता सफलता और असफलता में समान रहने को कहती है (2.48) और वचन देती है कि सच्चा प्रयास कभी नष्ट नहीं होता (6.40)। अपनी तुलना अपने पिछले प्रयास से कीजिए, किसी सहपाठी से नहीं। उसकी सफलता आपकी सफलता से कुछ नहीं छीनती (10.41)।",
        steps: [
          "तैयारी के दौरान सीखी तीन बातें लिखिए, अंक चाहे जो कहें। वह सीख आपके साथ रहती है (6.40, 4.38)।",
          "जब तुलना करते हुए ख़ुद को पकड़ें, तो उसे एक प्रश्न में बदलिए: वह व्यक्ति ऐसा क्या करता है जो मैं भी आज़मा सकूँ?",
          "अपनी प्रगति का चार्ट रखिए: यह परीक्षा पिछली परीक्षा के मुकाबले, कक्षा के टॉपर के मुकाबले नहीं (3.35)।",
        ],
        faqs: [
          { q: "असफलता के बारे में गीता क्या कहती है?", a: "6.40 कहता है कि शुभ कर्म करने वाले की कभी दुर्गति नहीं होती। प्रयास कभी व्यर्थ नहीं जाता, भले परिणाम निराश करे। 2.48 सफलता और असफलता में संतुलित रहने को कहता है, क्योंकि वही समता योग है।" },
          { q: "दूसरों से अपनी तुलना करना कैसे छोड़ूँ?", a: "10.41 कहता है कि हर उत्कृष्टता ईश्वर की चिंगारी है, इसलिए दूसरे की प्रतिभा प्रशंसा की चीज़ है, जलन की नहीं। 3.35 जोड़ता है कि आपके लिए आपका अपना मार्ग बेहतर है, भले दूसरे का ज़्यादा चमकदार दिखे।" },
          { q: "क्या अंक बताते हैं कि मुझे कितना आता है?", a: "पूरी तरह नहीं। 4.38 कहता है कि ज्ञान के समान पवित्र करने वाला कुछ नहीं, और ऐसी समझ समय और अभ्यास से बढ़ती है। अंकों को यह जानने के लिए इस्तेमाल कीजिए कि आगे किस पर काम करना है।" },
        ],
      },
    },
  },
  {
    slug: "choosing-a-stream",
    group: "study",
    help: false,
    refs: ["2.7", "3.35", "18.63", "4.40", "18.46", "18.73"],
    text: {
      en: {
        label: "Choosing a stream or career",
        h1: "Bhagavad Gita on choosing a stream or career: 6 shlokas",
        seoTitle: "Bhagavad Gita on Choosing a Stream or Career: 6 Shlokas",
        desc: "Confused about science, commerce or arts after Class 10, or about your career? Six Bhagavad Gita shlokas on doubt, your own path and deciding freely.",
        intro:
          "After Class 10, Indian students choose a stream: science, commerce or humanities. Parents, friends and relatives all have opinions, and the choice can feel permanent. Arjuna faced his own crossroads and said the honest thing: \"I am confused; teach me\" (2.7). The Gita then walks him from doubt to a clear decision he makes freely (18.63, 18.73). Its guidance fits any big choice: know your own nature, listen to good advice, think it through fully, then commit.",
        quick:
          "The Gita values your own path (स्वधर्म) over someone else's, even if theirs looks better (3.35). Ask for guidance as Arjuna did (2.7), reflect fully, then decide for yourself (18.63). Whatever you choose, doing that work sincerely is itself a kind of worship (18.46).",
        steps: [
          "List what you enjoy, what you are good at and what you would like to work on. These point to your own path (3.35).",
          "Talk to two people who actually study or work in each option, not just people with opinions about it.",
          "Set a deadline, decide, and then put your whole effort into the path you chose (18.73).",
        ],
        faqs: [
          { q: "What does the Gita say about choosing a career?", a: "3.35 and 18.47 say it is better to follow your own duty, suited to your nature, even imperfectly, than another's done well. In today's terms: choose what fits who you are, not what impresses others." },
          { q: "What if my parents want a different stream?", a: "Arjuna asked for advice openly (2.7), and Krishna explained everything before saying \"reflect fully, then do as you wish\" (18.63). Listen to your parents' reasons, share yours honestly, and look for a decision you can both understand." },
          { q: "What if I choose wrong?", a: "No sincere effort is wasted (6.40), and skills carry across fields. 18.46 says any work done sincerely and well becomes a path to growth. Many people change direction later and do well." },
        ],
      },
      hi: {
        label: "स्ट्रीम या करियर चुनना",
        h1: "स्ट्रीम या करियर चुनने पर भगवद्गीता: 6 श्लोक",
        seoTitle: "स्ट्रीम या करियर चुनने पर भगवद्गीता: 6 श्लोक",
        desc: "कक्षा 10 के बाद विज्ञान, वाणिज्य या कला में उलझन, या करियर को लेकर दुविधा? संशय, अपने मार्ग और स्वतंत्र निर्णय पर भगवद्गीता के छह श्लोक।",
        intro:
          "कक्षा 10 के बाद विद्यार्थियों को स्ट्रीम चुननी होती है: विज्ञान, वाणिज्य या कला। माता-पिता, दोस्त और रिश्तेदार, सबकी अपनी राय होती है, और यह चुनाव हमेशा के लिए लगता है। अर्जुन भी अपने चौराहे पर खड़े थे और उन्होंने सच कहा: \"मैं उलझन में हूँ, मुझे सिखाइए\" (2.7)। फिर गीता उन्हें संशय से एक स्पष्ट निर्णय तक ले जाती है, जो वे स्वयं लेते हैं (18.63, 18.73)। इसका मार्गदर्शन हर बड़े चुनाव पर लागू होता है: अपना स्वभाव पहचानिए, अच्छी सलाह सुनिए, पूरी तरह सोचिए, फिर पूरे मन से जुट जाइए।",
        quick:
          "गीता किसी और के मार्ग से ज़्यादा अपने मार्ग (स्वधर्म) को महत्व देती है, भले दूसरे का बेहतर दिखे (3.35)। अर्जुन की तरह मार्गदर्शन माँगिए (2.7), पूरी तरह विचार कीजिए, फिर स्वयं निर्णय लीजिए (18.63)। आप जो भी चुनें, उस काम को सच्चे मन से करना अपने आप में पूजा है (18.46)।",
        steps: [
          "लिखिए कि आपको क्या अच्छा लगता है, आप किसमें अच्छे हैं और किस पर काम करना चाहेंगे। ये आपके अपने मार्ग की ओर इशारा करते हैं (3.35)।",
          "हर विकल्प में सचमुच पढ़ने या काम करने वाले दो लोगों से बात कीजिए, केवल राय रखने वालों से नहीं।",
          "एक समय-सीमा तय कीजिए, निर्णय लीजिए, और फिर चुने हुए मार्ग में पूरा प्रयास लगाइए (18.73)।",
        ],
        faqs: [
          { q: "करियर चुनने के बारे में गीता क्या कहती है?", a: "3.35 और 18.47 कहते हैं कि अपने स्वभाव के अनुकूल अपना धर्म, अधूरा ही सही, दूसरे के अच्छी तरह किए धर्म से बेहतर है। आज की भाषा में: वह चुनिए जो आपके स्वभाव से मेल खाए, वह नहीं जो दूसरों को प्रभावित करे।" },
          { q: "अगर माता-पिता कोई और स्ट्रीम चाहें तो?", a: "अर्जुन ने खुलकर सलाह माँगी (2.7), और श्रीकृष्ण ने सब कुछ समझाने के बाद कहा \"पूरी तरह विचार करो, फिर जैसा चाहो करो\" (18.63)। माता-पिता के कारण सुनिए, अपने कारण ईमानदारी से बताइए, और ऐसा निर्णय खोजिए जिसे दोनों समझ सकें।" },
          { q: "अगर मैं ग़लत चुन लूँ तो?", a: "कोई सच्चा प्रयास व्यर्थ नहीं जाता (6.40), और कौशल एक क्षेत्र से दूसरे में काम आते हैं। 18.46 कहता है कि सच्चे मन और अच्छे ढंग से किया गया हर काम विकास का मार्ग बनता है। बहुत लोग बाद में दिशा बदलते हैं और अच्छा करते हैं।" },
        ],
      },
    },
  },
  {
    slug: "anger",
    group: "emotions",
    help: true,
    refs: ["2.63", "2.62", "5.23", "16.21", "12.13", "11.55"],
    text: {
      en: {
        label: "Anger",
        h1: "Bhagavad Gita on anger: 6 shlokas to calm down",
        seoTitle: "Bhagavad Gita on Anger: 6 Shlokas to Calm Down",
        desc: "Lose your temper easily? Six Bhagavad Gita shlokas on where anger comes from, how it clouds judgement, and how to pause, forgive and let go.",
        intro:
          "Most of us know the feeling: a message sent in anger, a door slammed, words you wish you could take back. The Gita traces anger to its root with surprising precision. It begins with wanting something, turns into frustration, and ends by clouding judgement (2.62–63). It also gives a practical tool: the person who can hold the force of anger before acting on it is the one who is truly happy (5.23).",
        quick:
          "The Gita says anger grows from frustrated desire and destroys clear thinking (2.62–63). The skill is to bear the urge before acting (5.23): pause, breathe, and respond later. Forgiveness (12.13) and holding no grudge (11.55) free you more than they free the other person.",
        steps: [
          "When anger rises, wait ten seconds before speaking or typing, and count your breaths (5.23).",
          "Afterwards, ask what you wanted that you didn't get. That is usually the root (2.62).",
          "Choose one old grudge and let it go this week, for your own peace (11.55).",
        ],
        faqs: [
          { q: "Which Gita shloka is about anger?", a: "2.63: from anger comes delusion, from delusion confused memory, from that the loss of reason, and with that a person is ruined. Together with 2.62 it shows how desire turns into anger and then into poor decisions." },
          { q: "How does the Gita say to control anger?", a: "5.23 praises the person who can bear the force of desire and anger while still in this body. In daily life: notice the surge, don't act on it straight away, and let it pass." },
          { q: "Is all anger bad according to the Gita?", a: "The Gita separates action from hatred. Arjuna is asked to stand up for what is right, but without personal hostility (11.55). You can say no firmly and protect yourself without being ruled by rage." },
        ],
      },
      hi: {
        label: "क्रोध",
        h1: "क्रोध पर भगवद्गीता: शांत होने के लिए 6 श्लोक",
        seoTitle: "क्रोध पर भगवद्गीता: शांत होने के लिए 6 श्लोक",
        desc: "जल्दी ग़ुस्सा आ जाता है? क्रोध कहाँ से आता है, कैसे बुद्धि पर पर्दा डालता है, और रुकना, क्षमा करना और छोड़ना कैसे सीखें, इस पर गीता के छह श्लोक।",
        intro:
          "यह अनुभव हम सबको है: ग़ुस्से में भेजा गया संदेश, ज़ोर से बंद किया दरवाज़ा, ऐसे शब्द जिन्हें काश वापस ले पाते। गीता क्रोध की जड़ तक आश्चर्यजनक बारीकी से पहुँचती है। वह किसी चीज़ की चाह से शुरू होता है, निराशा बनता है, और अंत में बुद्धि पर पर्दा डाल देता है (2.62–63)। साथ ही वह एक व्यावहारिक उपाय देती है: जो व्यक्ति कुछ करने से पहले क्रोध के वेग को सह सके, वही सच्चा सुखी है (5.23)।",
        quick:
          "गीता कहती है कि क्रोध अधूरी कामना से उपजता है और स्पष्ट सोच को नष्ट करता है (2.62–63)। कुशलता यह है कि कुछ करने से पहले उस वेग को सह लें (5.23): रुकिए, साँस लीजिए, और बाद में उत्तर दीजिए। क्षमा (12.13) और किसी से बैर न रखना (11.55) सामने वाले से ज़्यादा आपको मुक्त करते हैं।",
        steps: [
          "ग़ुस्सा उठे तो बोलने या लिखने से पहले दस सेकंड रुकिए और साँसें गिनिए (5.23)।",
          "बाद में पूछिए कि आप क्या चाहते थे जो नहीं मिला। अक्सर वही जड़ होती है (2.62)।",
          "इस हफ़्ते कोई एक पुराना मनमुटाव चुनिए और अपनी शांति के लिए उसे छोड़ दीजिए (11.55)।",
        ],
        faqs: [
          { q: "क्रोध पर गीता का कौन-सा श्लोक है?", a: "2.63: क्रोध से मोह होता है, मोह से स्मृति भ्रमित होती है, उससे बुद्धि का नाश होता है, और बुद्धि के नाश से व्यक्ति का पतन। 2.62 के साथ यह दिखाता है कि कामना कैसे क्रोध और फिर ग़लत निर्णयों में बदलती है।" },
          { q: "गीता क्रोध को वश में करने के लिए क्या कहती है?", a: "5.23 उस व्यक्ति की प्रशंसा करता है जो इसी शरीर में रहते हुए काम और क्रोध के वेग को सह सके। रोज़मर्रा में: उफान को पहचानिए, तुरंत उस पर अमल मत कीजिए, और उसे गुज़र जाने दीजिए।" },
          { q: "क्या गीता के अनुसार हर क्रोध बुरा है?", a: "गीता कर्म को द्वेष से अलग करती है। अर्जुन से धर्म के पक्ष में खड़े होने को कहा जाता है, पर बिना व्यक्तिगत बैर के (11.55)। आप दृढ़ता से मना कर सकते हैं और अपनी रक्षा कर सकते हैं, बिना क्रोध के वश में हुए।" },
        ],
      },
    },
  },
  {
    slug: "jealousy",
    group: "emotions",
    help: true,
    refs: ["10.41", "12.15", "5.18", "12.13", "10.9", "16.2"],
    text: {
      en: {
        label: "Jealousy and envy",
        h1: "Bhagavad Gita on jealousy: 6 shlokas for when you feel envious",
        seoTitle: "Bhagavad Gita on Jealousy and Envy: 6 Shlokas",
        desc: "Jealous of a friend's marks, looks or popularity? Six Bhagavad Gita shlokas that turn envy into admiration and bring peace with others' success.",
        intro:
          "A friend wins the prize you wanted, posts a holiday you can't afford, or makes it all look easy. Jealousy is normal, and it hurts. The Gita treats it as a trick of perspective. If every excellence is a spark of the same divine light (10.41), then someone else shining doesn't make you dimmer. The person Krishna calls dear is free from अमर्ष, impatience at others' good fortune (12.15).",
        quick:
          "The Gita's remedy for envy is a change of view: see others' talent as a spark of the Divine to admire (10.41), and see the same Self in everyone (5.18). Freedom from envy (12.15) and a friendly heart towards all (12.13) bring a peace that comparison never can.",
        steps: [
          "When you feel envy, congratulate the person sincerely, out loud or in a message. It is hard the first time and easier after (12.15).",
          "Turn the feeling into a question: what is one thing they do that I could learn?",
          "Don't pass on gossip about the person you envy (16.2).",
        ],
        faqs: [
          { q: "What does the Gita say about jealousy?", a: "12.15 describes the person dear to God as free from अमर्ष (envy, intolerance of others' success), excitement, fear and anxiety. 10.41 explains why: every excellence is a spark of the one Divine, so another's success is not your loss." },
          { q: "How can I stop being jealous of my friend?", a: "Admire rather than resent (10.41), and remember that in the Gita good company means people who help each other grow (10.9). Learning from your friend makes the friendship stronger and helps you improve." },
          { q: "Is feeling jealous a sin?", a: "The Gita doesn't shame feelings. It describes them and shows a way past them. Noticing envy without acting on it, and gently turning it into admiration, is part of the practice." },
        ],
      },
      hi: {
        label: "ईर्ष्या और जलन",
        h1: "ईर्ष्या पर भगवद्गीता: जलन होने पर 6 श्लोक",
        seoTitle: "ईर्ष्या और जलन पर भगवद्गीता: 6 श्लोक",
        desc: "दोस्त के अंक, रूप या लोकप्रियता से जलन होती है? भगवद्गीता के छह श्लोक जो ईर्ष्या को प्रशंसा में बदलते हैं और दूसरों की सफलता के साथ शांति लाते हैं।",
        intro:
          "कोई दोस्त वह पुरस्कार जीत लेता है जो आप चाहते थे, ऐसी छुट्टियों की तस्वीरें डालता है जो आप नहीं ले सकते, या सब कुछ आसान दिखा देता है। ईर्ष्या स्वाभाविक है, और दुख देती है। गीता इसे दृष्टि का धोखा मानती है। अगर हर उत्कृष्टता उसी दिव्य प्रकाश की चिंगारी है (10.41), तो किसी और के चमकने से आपकी चमक कम नहीं होती। श्रीकृष्ण जिसे प्रिय कहते हैं, वह अमर्ष से, यानी दूसरों के सौभाग्य पर असहिष्णुता से, मुक्त होता है (12.15)।",
        quick:
          "ईर्ष्या का गीता में उपाय है दृष्टि बदलना: दूसरों की प्रतिभा को ईश्वर की चिंगारी के रूप में देखिए, जिसकी प्रशंसा की जाए (10.41), और सबमें एक ही आत्मा देखिए (5.18)। ईर्ष्या से मुक्ति (12.15) और सबके प्रति मैत्रीपूर्ण हृदय (12.13) वह शांति देते हैं जो तुलना कभी नहीं दे सकती।",
        steps: [
          "जलन हो तो उस व्यक्ति को सच्चे मन से बधाई दीजिए, सामने या संदेश में। पहली बार कठिन लगता है, फिर आसान (12.15)।",
          "भावना को एक प्रश्न में बदलिए: वह ऐसा क्या करता है जो मैं भी सीख सकूँ?",
          "जिससे जलन होती है, उसके बारे में चुगली आगे मत बढ़ाइए (16.2)।",
        ],
        faqs: [
          { q: "ईर्ष्या के बारे में गीता क्या कहती है?", a: "12.15 ईश्वर के प्रिय व्यक्ति को अमर्ष (दूसरों की सफलता पर असहिष्णुता), हर्ष, भय और उद्वेग से मुक्त बताता है। 10.41 कारण बताता है: हर उत्कृष्टता एक ही ईश्वर की चिंगारी है, इसलिए दूसरे की सफलता आपकी हानि नहीं।" },
          { q: "अपने दोस्त से जलना कैसे छोड़ूँ?", a: "जलने के बजाय प्रशंसा कीजिए (10.41), और याद रखिए कि गीता में अच्छी संगति का अर्थ है एक-दूसरे को आगे बढ़ाने वाले लोग (10.9)। दोस्त से सीखने से दोस्ती मज़बूत होती है और आप बेहतर होते हैं।" },
          { q: "क्या ईर्ष्या महसूस करना पाप है?", a: "गीता भावनाओं को शर्मिंदा नहीं करती। वह उनका वर्णन करती है और उनसे आगे का रास्ता दिखाती है। ईर्ष्या को पहचानना, उस पर अमल न करना, और धीरे-धीरे उसे प्रशंसा में बदलना, यही अभ्यास है।" },
        ],
      },
    },
  },
  {
    slug: "overthinking",
    group: "emotions",
    help: true,
    refs: ["6.5", "2.56", "6.34", "6.35", "4.40", "5.29"],
    text: {
      en: {
        label: "Overthinking and worry",
        h1: "Bhagavad Gita on overthinking and worry: 6 shlokas",
        seoTitle: "Bhagavad Gita on Overthinking and Worry: 6 Shlokas",
        desc: "Can't stop worrying or replaying things in your head? Six Bhagavad Gita shlokas on a restless mind, doubt and finding steadiness, with school examples.",
        intro:
          "Lying awake replaying a conversation, imagining everything that could go wrong tomorrow, rereading a message ten times: overthinking is exhausting. The Gita says the mind is your best friend or your worst enemy, depending on how you relate to it (6.5). It describes a steady person who is neither shaken by sorrow nor carried away by excitement (2.56), and it is honest that endless doubt drains us (4.40). The way out is gentle, repeated practice (6.35).",
        quick:
          "The Gita says the mind can be your friend or your enemy (6.5), and that it is calmed by steady practice and letting go (6.35). When thoughts spin, return to one simple anchor, such as the breath or the task in hand, again and again. Each return is the practice.",
        steps: [
          "Write the worry down, then write the next action you can take about it. If there is none tonight, close the notebook.",
          "When thoughts loop, take five slow breaths and name one thing you can see, one you can hear and one you can feel (6.35).",
          "Talk to someone you trust instead of carrying it alone (5.29).",
        ],
        faqs: [
          { q: "What does the Gita say about overthinking?", a: "6.5–6 say the mind is the friend of one who has mastered it and the enemy of one who hasn't. 6.34–35 admit the mind is as restless as the wind, and say it is trained through practice and detachment." },
          { q: "Which shloka helps with worry?", a: "2.56 describes the स्थितप्रज्ञ, the person of steady wisdom, whose mind is not shaken by sorrow, does not crave pleasure, and is free from fear and anger. It is a picture of where practice leads." },
          { q: "Is doubt bad according to the Gita?", a: "Honest questions are welcome: Arjuna asks a great many. 4.40 warns against doubt that never resolves and stops you from acting. Ask, find good answers, then act." },
        ],
      },
      hi: {
        label: "ज़्यादा सोचना और चिंता",
        h1: "ज़्यादा सोचने और चिंता पर भगवद्गीता: 6 श्लोक",
        seoTitle: "ज़्यादा सोचने और चिंता पर भगवद्गीता: 6 श्लोक",
        desc: "चिंता रुकती नहीं या बातें दिमाग़ में घूमती रहती हैं? चंचल मन, संशय और स्थिरता पाने पर भगवद्गीता के छह श्लोक, स्कूली जीवन के उदाहरणों के साथ।",
        intro:
          "रात भर जागकर कोई बातचीत दोहराना, कल क्या-क्या ग़लत हो सकता है इसकी कल्पना करना, एक संदेश को दस बार पढ़ना: ज़्यादा सोचना थका देता है। गीता कहती है कि मन आपका सबसे अच्छा मित्र भी है और सबसे बड़ा शत्रु भी, यह इस पर निर्भर है कि आप उससे कैसे व्यवहार करते हैं (6.5)। वह ऐसे स्थिर व्यक्ति का वर्णन करती है जो न दुख से डगमगाता है न उत्साह में बहता है (2.56), और साफ़ कहती है कि अंतहीन संशय हमें खोखला करता है (4.40)। रास्ता है धैर्य से बार-बार अभ्यास (6.35)।",
        quick:
          "गीता कहती है कि मन आपका मित्र या शत्रु हो सकता है (6.5), और वह निरंतर अभ्यास और वैराग्य से शांत होता है (6.35)। जब विचार घूमने लगें, तो किसी एक सरल आधार, जैसे साँस या सामने के काम, पर बार-बार लौटिए। हर बार लौटना ही अभ्यास है।",
        steps: [
          "चिंता को लिख लीजिए, फिर उसके बारे में अगला कदम लिखिए जो आप उठा सकते हैं। अगर आज रात कोई कदम नहीं, तो कॉपी बंद कर दीजिए।",
          "जब विचार घूमें, पाँच धीमी साँसें लीजिए और एक चीज़ जो दिख रही है, एक जो सुनाई दे रही है और एक जो महसूस हो रही है, उसका नाम लीजिए (6.35)।",
          "अकेले ढोने के बजाय किसी भरोसेमंद व्यक्ति से बात कीजिए (5.29)।",
        ],
        faqs: [
          { q: "ज़्यादा सोचने के बारे में गीता क्या कहती है?", a: "6.5–6 कहते हैं कि जिसने मन को जीत लिया उसका मन मित्र है, और जिसने नहीं जीता उसका शत्रु। 6.34–35 मानते हैं कि मन हवा जैसा चंचल है, और कहते हैं कि अभ्यास और वैराग्य से उसे साधा जाता है।" },
          { q: "चिंता में कौन-सा श्लोक मदद करता है?", a: "2.56 स्थितप्रज्ञ का वर्णन करता है, जिसका मन दुख में विचलित नहीं होता, सुख की लालसा नहीं करता, और जो भय और क्रोध से मुक्त है। यह उस स्थिति का चित्र है जहाँ अभ्यास ले जाता है।" },
          { q: "क्या गीता के अनुसार संशय बुरा है?", a: "सच्चे प्रश्नों का स्वागत है: अर्जुन बहुत से प्रश्न पूछते हैं। 4.40 उस संशय से सावधान करता है जो कभी सुलझता नहीं और आपको कर्म करने से रोकता है। पूछिए, अच्छे उत्तर खोजिए, फिर कर्म कीजिए।" },
        ],
      },
    },
  },
  {
    slug: "sadness-after-failure",
    group: "emotions",
    help: true,
    refs: ["2.14", "6.40", "2.3", "9.30", "2.22", "18.66"],
    text: {
      en: {
        label: "Sadness after failure or loss",
        h1: "Bhagavad Gita for sadness after failure: 6 shlokas",
        seoTitle: "Bhagavad Gita for Sadness and Failure: 6 Shlokas",
        desc: "Feeling low after failing, losing or being let down? Six Bhagavad Gita shlokas on passing pain, second chances and not giving up, with school stories.",
        intro:
          "Failing an exam, losing a match, not being picked, or losing someone you love can leave you feeling heavy for days. The Gita begins with a sad, overwhelmed person: Arjuna sits down in tears and cannot go on. Krishna doesn't dismiss his pain. He reminds him that hard feelings come and go like seasons (2.14), that no sincere effort is wasted (6.40), and that anyone can begin again (9.30). He ends with three words: मा शुचः, do not grieve (18.66).",
        quick:
          "The Gita says pain and pleasure come and go like winter and summer, so bear them patiently (2.14). Sincere effort is never lost (6.40), and anyone can make a fresh start (9.30). You don't have to carry everything alone (18.66).",
        steps: [
          "Let yourself feel it. Then do one small, ordinary thing: a walk, a meal with family, an early night (2.14).",
          "Write down what the failure taught you and one thing you will try differently next time (6.40).",
          "Tell one trusted person how you feel. Sharing the weight makes it lighter (18.66).",
        ],
        faqs: [
          { q: "Which Gita shloka helps when you feel sad?", a: "2.14 says contact with the world brings heat and cold, pleasure and pain. These come and go and do not last, so endure them patiently. 18.66 ends Krishna's teaching with मा शुचः, \"do not grieve\"." },
          { q: "What does the Gita say about failure?", a: "6.40 promises that one who does good never comes to ruin, here or hereafter. Effort is never wasted, even when a particular result doesn't come." },
          { q: "Does the Gita help with grief after losing someone?", a: "2.22 compares the body to clothes the Self changes, and 2.13 says the Self continues through childhood, youth and old age. Many people find comfort in this. Grief still needs time and people around you, so let others support you." },
        ],
      },
      hi: {
        label: "असफलता या हानि के बाद उदासी",
        h1: "असफलता के बाद उदासी के लिए भगवद्गीता: 6 श्लोक",
        seoTitle: "उदासी और असफलता के लिए भगवद्गीता: 6 श्लोक",
        desc: "असफल होने, हारने या निराश होने के बाद मन उदास है? गुज़र जाने वाले दुख, दूसरे अवसर और हार न मानने पर भगवद्गीता के छह श्लोक, स्कूली कहानियों के साथ।",
        intro:
          "परीक्षा में असफल होना, मैच हारना, चुना न जाना, या किसी प्रियजन को खो देना कई दिनों तक मन भारी कर सकता है। गीता एक उदास, टूटे हुए व्यक्ति से शुरू होती है: अर्जुन आँसुओं के साथ बैठ जाते हैं और आगे नहीं बढ़ पाते। श्रीकृष्ण उनके दुख को नकारते नहीं। वे याद दिलाते हैं कि कठिन भावनाएँ ऋतुओं की तरह आती-जाती हैं (2.14), कोई सच्चा प्रयास व्यर्थ नहीं जाता (6.40), और कोई भी फिर से शुरुआत कर सकता है (9.30)। अंत में वे दो शब्द कहते हैं: मा शुचः, शोक मत करो (18.66)।",
        quick:
          "गीता कहती है कि दुख और सुख सर्दी-गर्मी की तरह आते-जाते हैं, इसलिए उन्हें धैर्य से सहिए (2.14)। सच्चा प्रयास कभी नष्ट नहीं होता (6.40), और कोई भी नई शुरुआत कर सकता है (9.30)। आपको सब कुछ अकेले नहीं ढोना है (18.66)।",
        steps: [
          "स्वयं को यह महसूस करने दीजिए। फिर कोई एक छोटा, साधारण काम कीजिए: टहलना, परिवार के साथ भोजन, जल्दी सोना (2.14)।",
          "लिखिए कि इस असफलता ने क्या सिखाया और अगली बार आप क्या अलग करेंगे (6.40)।",
          "किसी एक भरोसेमंद व्यक्ति को बताइए कि आप कैसा महसूस कर रहे हैं। बोझ बाँटने से हल्का होता है (18.66)।",
        ],
        faqs: [
          { q: "उदास होने पर गीता का कौन-सा श्लोक मदद करता है?", a: "2.14 कहता है कि संसार के संपर्क से सर्दी-गर्मी, सुख-दुख मिलते हैं। ये आते-जाते हैं और टिकते नहीं, इसलिए इन्हें धैर्य से सहो। 18.66 श्रीकृष्ण के उपदेश को मा शुचः, \"शोक मत करो\", के साथ समाप्त करता है।" },
          { q: "असफलता के बारे में गीता क्या कहती है?", a: "6.40 वचन देता है कि शुभ कर्म करने वाले का न इस लोक में नाश होता है न परलोक में। प्रयास कभी व्यर्थ नहीं जाता, भले कोई विशेष परिणाम न मिले।" },
          { q: "क्या गीता किसी को खोने के शोक में मदद करती है?", a: "2.22 शरीर की तुलना उन वस्त्रों से करता है जिन्हें आत्मा बदलती है, और 2.13 कहता है कि आत्मा बचपन, यौवन और बुढ़ापे से होकर चलती रहती है। बहुत लोगों को इससे सांत्वना मिलती है। फिर भी शोक को समय और अपनों का साथ चाहिए, इसलिए दूसरों को सहारा देने दीजिए।" },
        ],
      },
    },
  },
  {
    slug: "low-confidence",
    group: "emotions",
    help: true,
    refs: ["6.5", "2.3", "16.1", "11.33", "15.7", "10.41"],
    text: {
      en: {
        label: "Low confidence and self-doubt",
        h1: "Bhagavad Gita for low confidence: 6 shlokas for students",
        seoTitle: "Bhagavad Gita for Low Confidence: 6 Shlokas for Students",
        desc: "Feel you're not good enough, or afraid to speak up? Six Bhagavad Gita shlokas on self-belief, courage and your own worth, with school-life examples.",
        intro:
          "\"I'm not smart enough.\" \"Everyone else is better.\" \"I'll just embarrass myself.\" Self-doubt can stop you from raising your hand, trying out for the team, or even starting. When Arjuna lost his nerve, Krishna's first words were a wake-up call: don't give in to this weakness; stand up (2.3). The Gita then gives deeper reasons to believe in yourself: you can lift yourself with your own mind (6.5), you are part of something far larger (11.33), and you carry a spark of the Divine (15.7).",
        quick:
          "The Gita says: lift yourself by yourself, and don't put yourself down (6.5). Fearlessness comes first among the good qualities (16.1). You are an eternal part of the Divine (15.7), so your worth doesn't depend on any one test or comparison.",
        steps: [
          "Notice your inner voice. When it says \"I can't\", change it to \"I can't yet\" (6.5).",
          "Do one small brave thing this week: ask a question in class or volunteer for something (16.1).",
          "Keep a short list of things you did well, and read it before a hard day.",
        ],
        faqs: [
          { q: "Which Gita shloka builds self-confidence?", a: "6.5: उद्धरेदात्मनात्मानं नात्मानमवसादयेत्, lift yourself by yourself and don't degrade yourself, for the mind is both your friend and your enemy. 2.3 is Krishna's call to shake off faint-heartedness and stand up." },
          { q: "How can I stop doubting myself?", a: "Start with action. Krishna's answer to Arjuna's doubt was \"stand up and act\" (2.3), and confidence grew from there. Small brave actions repeated over time build real self-belief." },
          { q: "What does the Gita say about self-worth?", a: "15.7 says every living being is an eternal part of the Divine. Your worth isn't earned by marks or popularity. It is already there." },
        ],
      },
      hi: {
        label: "आत्मविश्वास की कमी और आत्म-संदेह",
        h1: "आत्मविश्वास की कमी के लिए भगवद्गीता: विद्यार्थियों के लिए 6 श्लोक",
        seoTitle: "आत्मविश्वास के लिए भगवद्गीता: विद्यार्थियों के लिए 6 श्लोक",
        desc: "लगता है आप काफ़ी अच्छे नहीं, या बोलने से डर लगता है? आत्मविश्वास, साहस और अपने मूल्य पर भगवद्गीता के छह श्लोक, स्कूली जीवन के उदाहरणों के साथ।",
        intro:
          "\"मैं उतना होशियार नहीं।\" \"बाकी सब मुझसे बेहतर हैं।\" \"मेरी तो बस हँसी उड़ेगी।\" आत्म-संदेह आपको हाथ उठाने, टीम के लिए कोशिश करने, या शुरुआत करने तक से रोक सकता है। जब अर्जुन का साहस टूटा, तो श्रीकृष्ण के पहले शब्द एक झकझोरने वाली पुकार थे: इस दुर्बलता के आगे मत झुको, उठो (2.3)। फिर गीता स्वयं पर भरोसे के गहरे कारण देती है: आप अपने मन से स्वयं को उठा सकते हैं (6.5), आप किसी बहुत बड़ी चीज़ का हिस्सा हैं (11.33), और आपमें ईश्वर की चिंगारी है (15.7)।",
        quick:
          "गीता कहती है: स्वयं से स्वयं को उठाओ, और स्वयं को नीचे मत गिराओ (6.5)। अच्छे गुणों में निर्भयता सबसे पहले है (16.1)। आप ईश्वर के सनातन अंश हैं (15.7), इसलिए आपका मूल्य किसी एक परीक्षा या तुलना पर निर्भर नहीं।",
        steps: [
          "अपनी भीतरी आवाज़ पर ध्यान दीजिए। जब वह कहे \"मुझसे नहीं होगा\", उसे बदलकर \"मुझसे अभी नहीं होता, पर हो जाएगा\" कीजिए (6.5)।",
          "इस हफ़्ते एक छोटा साहसी काम कीजिए: कक्षा में प्रश्न पूछिए या किसी काम के लिए आगे आइए (16.1)।",
          "उन बातों की छोटी सूची रखिए जो आपने अच्छी कीं, और कठिन दिन से पहले उसे पढ़िए।",
        ],
        faqs: [
          { q: "आत्मविश्वास बढ़ाने वाला गीता का श्लोक कौन-सा है?", a: "6.5: उद्धरेदात्मनात्मानं नात्मानमवसादयेत्, स्वयं से स्वयं को उठाओ और स्वयं को गिराओ मत, क्योंकि मन ही मित्र है और मन ही शत्रु। 2.3 श्रीकृष्ण की पुकार है कि हृदय की दुर्बलता छोड़कर उठ खड़े हो।" },
          { q: "स्वयं पर संदेह करना कैसे छोड़ूँ?", a: "कर्म से शुरुआत कीजिए। अर्जुन के संदेह का श्रीकृष्ण का उत्तर था \"उठो और कर्म करो\" (2.3), और आत्मविश्वास वहीं से बढ़ा। समय के साथ दोहराए गए छोटे साहसी काम सच्चा आत्मविश्वास बनाते हैं।" },
          { q: "आत्म-मूल्य के बारे में गीता क्या कहती है?", a: "15.7 कहता है कि हर जीव ईश्वर का सनातन अंश है। आपका मूल्य अंकों या लोकप्रियता से कमाया नहीं जाता। वह पहले से है।" },
        ],
      },
    },
  },
];

export const problemBySlug = (slug: string) => PROBLEMS.find((p) => p.slug === slug);
export const problemLang = (lang: string): ProblemLang => (lang === "hi" ? "hi" : "en");
/** Languages these pages are written in (others fall back to English, noindex). */
export const PROBLEM_LOCALES = ["en", "hi"] as const;

export const problemUi: Record<ProblemLang, {
  hubTitle: string;
  hubSeoTitle: string;
  hubDesc: string;
  hubIntro: string;
  groups: Record<ProblemGroup, string>;
  quick: string;
  shlokas: string;
  story: string;
  reflect: string;
  fullLesson: (n: number) => string;
  steps: string;
  faqs: string;
  more: string;
  helpTitle: string;
  helpText: string;
  helpLine: string;
  helpOutside: string;
  hubLink: string;
  findHelp: string;
  findHelpDesc: string;
}> = {
  en: {
    hubTitle: "The Gita for students' problems",
    hubSeoTitle: "Bhagavad Gita for Students' Problems: Stress, Anger, Focus",
    hubDesc: "Exam stress, anger, jealousy, overthinking, low confidence: what the Bhagavad Gita says about the problems students face, with shlokas and school-life stories.",
    hubIntro: "Pick the problem on your mind. Each page gathers the Gita's shlokas that speak to it, with a short answer, a story from school life, three things to try this week and links to the full lessons.",
    groups: { study: "Studies and exams", emotions: "Feelings" },
    quick: "What the Gita says",
    shlokas: "Shlokas that help",
    story: "In school life",
    reflect: "Think about it",
    fullLesson: (n) => `Full lesson and quiz: Chapter ${n} →`,
    steps: "Try this week",
    faqs: "Questions students ask",
    more: "Other problems",
    helpTitle: "If it feels like too much",
    helpText: "The Gita can give perspective, but it is not a replacement for real help. If you feel hopeless, unsafe or unable to cope, talk to a parent, teacher or another adult you trust today.",
    helpLine: "In India, Tele-MANAS is free, confidential and open 24 hours, in many languages: call 14416 or 1-800-891-4416.",
    helpOutside: "Outside India, call your local emergency number or a mental-health helpline.",
    hubLink: "All problems",
    findHelp: "Find help in the Gita for…",
    findHelpDesc: "Exam stress, anger, overthinking and more: the shlokas that speak to each problem.",
  },
  hi: {
    hubTitle: "विद्यार्थियों की समस्याओं के लिए गीता",
    hubSeoTitle: "विद्यार्थियों की समस्याओं के लिए गीता: तनाव, क्रोध, एकाग्रता",
    hubDesc: "परीक्षा का तनाव, क्रोध, ईर्ष्या, ज़्यादा सोचना, आत्मविश्वास की कमी: विद्यार्थियों की समस्याओं पर भगवद्गीता क्या कहती है, श्लोकों और स्कूली कहानियों के साथ।",
    hubIntro: "जो समस्या मन में है, उसे चुनिए। हर पृष्ठ पर उस समस्या से जुड़े गीता के श्लोक हैं: एक छोटा उत्तर, स्कूली जीवन की एक कहानी, इस हफ़्ते आज़माने के लिए तीन बातें और पूरे पाठों के लिंक।",
    groups: { study: "पढ़ाई और परीक्षा", emotions: "भावनाएँ" },
    quick: "गीता क्या कहती है",
    shlokas: "मदद करने वाले श्लोक",
    story: "स्कूली जीवन में",
    reflect: "सोचिए",
    fullLesson: (n) => `पूरा पाठ और प्रश्नोत्तरी: अध्याय ${n} →`,
    steps: "इस हफ़्ते आज़माइए",
    faqs: "विद्यार्थियों के प्रश्न",
    more: "दूसरी समस्याएँ",
    helpTitle: "अगर बहुत भारी लगे",
    helpText: "गीता दृष्टि दे सकती है, पर वह सच्ची मदद का विकल्प नहीं है। अगर आप निराश, असुरक्षित या सँभल न पाने जैसा महसूस करें, तो आज ही माता-पिता, शिक्षक या किसी भरोसेमंद बड़े से बात कीजिए।",
    helpLine: "भारत में टेली-मानस (Tele-MANAS) मुफ़्त, गोपनीय और 24 घंटे, कई भाषाओं में उपलब्ध है: 14416 या 1-800-891-4416 पर कॉल कीजिए।",
    helpOutside: "भारत के बाहर, अपने स्थानीय आपातकालीन नंबर या किसी मानसिक स्वास्थ्य हेल्पलाइन पर कॉल कीजिए।",
    hubLink: "सभी समस्याएँ",
    findHelp: "गीता में मदद खोजिए…",
    findHelpDesc: "परीक्षा का तनाव, क्रोध, ज़्यादा सोचना और भी बहुत कुछ: हर समस्या से जुड़े श्लोक।",
  },
};
