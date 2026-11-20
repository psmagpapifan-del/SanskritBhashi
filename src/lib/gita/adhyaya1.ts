import type { GitaAdhyaya } from "./types.ts";

export const adhyaya1: GitaAdhyaya = {
  n: 1,
  name: "अर्जुनविषादयोगः",
  title: { en: "Arjuna's Despair", hi: "अर्जुन का विषाद" },
  context: {
    en: "The armies of the Pandavas and the Kauravas stand facing each other at Kurukshetra. The blind king Dhritarashtra asks his charioteer Sanjaya, who can see the battlefield from afar, what is happening. Arjuna asks Krishna, his charioteer, to place the chariot between the two armies. When he sees his teachers, cousins and friends on the other side, he is overcome with grief and refuses to fight.",
    hi: "कुरुक्षेत्र में पाण्डवों और कौरवों की सेनाएँ आमने-सामने खड़ी हैं। अंधे राजा धृतराष्ट्र अपने सारथी संजय से, जो दूर से युद्धभूमि देख सकते हैं, पूछते हैं कि वहाँ क्या हो रहा है। अर्जुन अपने सारथी श्रीकृष्ण से रथ को दोनों सेनाओं के बीच ले चलने को कहते हैं। सामने अपने गुरुओं, भाइयों और मित्रों को देखकर वे शोक से भर जाते हैं और युद्ध करने से मना कर देते हैं।",
  },
  crux: [
    { en: "Even the bravest person can feel confused and afraid before a big challenge.", hi: "बड़ी चुनौती से पहले सबसे वीर व्यक्ति भी उलझन और डर महसूस कर सकता है।" },
    { en: "Admitting that you are stuck is the first step towards finding the way.", hi: "यह मान लेना कि आप अटक गए हैं, रास्ता खोजने का पहला कदम है।" },
    { en: "The whole Gita begins from this moment of honest doubt.", hi: "पूरी गीता इसी सच्चे संशय के क्षण से शुरू होती है।" },
  ],
  shlokas: [
    {
      ref: "1.47",
      altRef: "1.46",
      levels: [1],
      speaker: "सञ्जय उवाच",
      text: "एवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत् ।\nविसृज्य सशरं चापं शोकसंविग्नमानसः ॥",
      words: [
        { sa: "एवम् उक्त्वा", en: "having spoken thus", hi: "ऐसा कहकर" },
        { sa: "सङ्ख्ये", en: "on the battlefield", hi: "युद्धभूमि में" },
        { sa: "रथोपस्थे", en: "on the seat of the chariot", hi: "रथ के पिछले भाग में" },
        { sa: "उपाविशत्", en: "sat down", hi: "बैठ गए" },
        { sa: "विसृज्य", en: "putting aside", hi: "छोड़कर" },
        { sa: "सशरं चापम्", en: "the bow along with the arrows", hi: "बाणसहित धनुष" },
        { sa: "शोकसंविग्नमानसः", en: "with a mind shaken by grief", hi: "शोक से व्याकुल मन वाले" },
      ],
      meaning: {
        en: "Sanjaya said: Having spoken like this on the battlefield, Arjuna put down his bow and arrows and sat down in the chariot, his mind overwhelmed by sorrow.",
        hi: "संजय बोले: युद्धभूमि में ऐसा कहकर, शोक से व्याकुल मन वाले अर्जुन बाणसहित धनुष को त्यागकर रथ के पिछले भाग में बैठ गए।",
      },
      situation: {
        title: { en: "The night before the science exhibition", hi: "विज्ञान प्रदर्शनी से पहले की रात" },
        story: {
          en: "Kabir has worked on his solar-oven model for weeks. The night before the exhibition he sees the other projects online and suddenly feels his model is useless. He switches off the lamp, pushes the model aside and says, \"I'm not going tomorrow.\" Like Arjuna, Kabir is not lazy; he is overwhelmed. What he needs now is not a scolding but someone who helps him see clearly, just as Krishna is about to help Arjuna.",
          hi: "कबीर ने हफ़्तों तक अपना सोलर-ओवन मॉडल बनाया है। प्रदर्शनी से पहले की रात वह ऑनलाइन दूसरे प्रोजेक्ट देखता है और अचानक उसे अपना मॉडल बेकार लगने लगता है। वह लैंप बंद करता है, मॉडल को एक ओर खिसका देता है और कहता है, \"मैं कल नहीं जाऊँगा।\" अर्जुन की तरह कबीर आलसी नहीं है; वह घबरा गया है। उसे अभी डाँट की नहीं, बल्कि किसी ऐसे की ज़रूरत है जो उसे साफ़ देखने में मदद करे, जैसे श्रीकृष्ण अर्जुन की मदद करने वाले हैं।",
        },
      },
      reflect: {
        en: "Think of a time you wanted to give up just before something important. What or who helped you continue?",
        hi: "कोई ऐसा समय याद कीजिए जब किसी ज़रूरी काम से ठीक पहले आप हार मान लेना चाहते थे। किस बात ने या किसने आपको आगे बढ़ने में मदद की?",
      },
      questions: [
        {
          prompt: { en: "What did Arjuna do at the end of the first chapter?", hi: "पहले अध्याय के अंत में अर्जुन ने क्या किया?" },
          options: [
            { en: "Put down his bow and arrows and sat down in the chariot", hi: "धनुष-बाण रखकर रथ में बैठ गए" },
            { en: "Blew his conch to start the battle", hi: "युद्ध शुरू करने के लिए शंख बजाया" },
            { en: "Drove the chariot back to the city", hi: "रथ को वापस नगर की ओर ले गए" },
            { en: "Shot the first arrow at the Kauravas", hi: "कौरवों पर पहला बाण चलाया" },
          ],
          hint: { en: "Look at the words विसृज्य (putting aside) and उपाविशत् (sat down).", hi: "विसृज्य (छोड़कर) और उपाविशत् (बैठ गए) शब्दों पर ध्यान दीजिए।" },
          explanation: {
            en: "विसृज्य सशरं चापं … उपाविशत्: putting aside his bow with its arrows, he sat down. His mind was शोकसंविग्न, shaken by grief.",
            hi: "विसृज्य सशरं चापं … उपाविशत्: बाणसहित धनुष छोड़कर वे बैठ गए। उनका मन शोकसंविग्न, यानी शोक से व्याकुल था।",
          },
        },
        {
          prompt: {
            en: "Meera is so nervous before her dance recital that she wants to go home. Which response follows the lesson of this shloka and of what comes next in the Gita?",
            hi: "मीरा अपने नृत्य-कार्यक्रम से पहले इतनी घबरा जाती है कि घर लौट जाना चाहती है। कौन-सी प्रतिक्रिया इस श्लोक और गीता में आगे आने वाली सीख के अनुसार है?",
          },
          options: [
            { en: "Accept that she feels overwhelmed, then talk it through with someone wise before deciding", hi: "मान ले कि वह घबरा गई है, और फ़ैसला करने से पहले किसी समझदार व्यक्ति से बात करे" },
            { en: "Hide her fear and pretend everything is fine", hi: "अपना डर छिपाए और दिखाए कि सब ठीक है" },
            { en: "Leave immediately without telling anyone", hi: "किसी को बताए बिना तुरंत चली जाए" },
            { en: "Blame the other dancers for making her nervous", hi: "घबराहट के लिए दूसरे नर्तकों को दोष दे" },
          ],
          hint: { en: "Arjuna did not hide his grief. What did he do next, in Chapter 2?", hi: "अर्जुन ने अपना शोक नहीं छिपाया। दूसरे अध्याय में उन्होंने आगे क्या किया?" },
          explanation: {
            en: "Arjuna openly showed how he felt, and in Chapter 2 he asks Krishna for guidance. Being honest about fear and asking for help is where the Gita's teaching begins.",
            hi: "अर्जुन ने अपनी भावना खुलकर दिखाई, और दूसरे अध्याय में वे श्रीकृष्ण से मार्गदर्शन माँगते हैं। डर को सच्चाई से स्वीकार करना और मदद माँगना ही गीता की शिक्षा का आरंभ है।",
          },
        },
      ],
    },
    {
      ref: "1.1",
      levels: [2, 3],
      speaker: "धृतराष्ट्र उवाच",
      text: "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥",
      words: [
        { sa: "धर्मक्षेत्रे", en: "in the field of dharma", hi: "धर्मभूमि में" },
        { sa: "कुरुक्षेत्रे", en: "at Kurukshetra", hi: "कुरुक्षेत्र में" },
        { sa: "समवेताः", en: "gathered together", hi: "एकत्र हुए" },
        { sa: "युयुत्सवः", en: "wishing to fight", hi: "युद्ध की इच्छा वाले" },
        { sa: "मामकाः", en: "my people (my sons)", hi: "मेरे (पुत्र)" },
        { sa: "पाण्डवाः च एव", en: "and the sons of Pandu", hi: "और पाण्डु के पुत्र भी" },
        { sa: "किम् अकुर्वत", en: "what did they do?", hi: "उन्होंने क्या किया?" },
      ],
      meaning: {
        en: "Dhritarashtra said: O Sanjaya, gathered at Kurukshetra, the field of dharma, eager to fight, what did my sons and the sons of Pandu do?",
        hi: "धृतराष्ट्र बोले: हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे पुत्रों और पाण्डु के पुत्रों ने क्या किया?",
      },
      situation: {
        title: { en: "\"My team\" and \"their team\"", hi: "\"मेरी टीम\" और \"उनकी टीम\"" },
        story: {
          en: "In the inter-house quiz final, Ananya's friend group is split between two houses. Before the round starts, someone in her house group chat writes, \"Our people versus those people. Let's crush them.\" Ananya notices how quickly classmates became \"those people\". Dhritarashtra does the same: he says मामकाः (my sons) and पाण्डवाः (Pandu's sons), as if his own nephews were outsiders. The very first word, धर्मक्षेत्रे, reminds us that every contest, in a stadium or an exam hall, is also a test of how fairly we behave.",
          hi: "अंतर-सदन क्विज़ फ़ाइनल में अनन्या के दोस्त दो सदनों में बँटे हैं। राउंड शुरू होने से पहले उसके सदन के ग्रुप चैट में कोई लिखता है, \"हमारे लोग बनाम वो लोग। इन्हें हरा देते हैं।\" अनन्या देखती है कि सहपाठी कितनी जल्दी \"वो लोग\" बन गए। धृतराष्ट्र भी यही करते हैं: वे मामकाः (मेरे पुत्र) और पाण्डवाः (पाण्डु के पुत्र) कहते हैं, मानो उनके अपने भतीजे पराए हों। पहला शब्द धर्मक्षेत्रे याद दिलाता है कि हर प्रतियोगिता, चाहे मैदान में हो या परीक्षा-कक्ष में, यह भी परखती है कि हम कितना न्यायपूर्ण व्यवहार करते हैं।",
        },
      },
      reflect: {
        en: "When do you divide people into \"mine\" and \"not mine\"? How does it change the way you treat them?",
        hi: "आप कब लोगों को \"मेरे\" और \"पराए\" में बाँटते हैं? इससे उनके साथ आपका व्यवहार कैसे बदल जाता है?",
      },
      questions: [
        {
          prompt: { en: "Why is the word मामकाः (\"my people\") important in this first shloka?", hi: "इस पहले श्लोक में मामकाः (\"मेरे\") शब्द क्यों महत्वपूर्ण है?" },
          options: [
            { en: "Dhritarashtra separates his sons from the Pandavas, showing his partiality", hi: "धृतराष्ट्र अपने पुत्रों को पाण्डवों से अलग करते हैं, जिससे उनका पक्षपात दिखता है" },
            { en: "It means that all the warriors belong to Sanjaya", hi: "इसका अर्थ है कि सभी योद्धा संजय के हैं" },
            { en: "It is the name of a place at Kurukshetra", hi: "यह कुरुक्षेत्र के एक स्थान का नाम है" },
            { en: "It shows that Dhritarashtra wants peace", hi: "इससे पता चलता है कि धृतराष्ट्र शांति चाहते हैं" },
          ],
          hint: { en: "The Pandavas were his brother Pandu's sons, yet he names them separately.", hi: "पाण्डव उनके भाई पाण्डु के पुत्र थे, फिर भी वे उनका नाम अलग से लेते हैं।" },
          explanation: {
            en: "By saying मामकाः पाण्डवाश्च (\"mine and Pandu's\"), the king shows that he sees his nephews as outsiders. This attachment to \"mine\" is at the root of the war.",
            hi: "मामकाः पाण्डवाश्च (\"मेरे और पाण्डु के\") कहकर राजा दिखाते हैं कि वे भतीजों को पराया मानते हैं। \"मेरे\" के प्रति यही आसक्ति युद्ध की जड़ में है।",
          },
        },
        {
          prompt: {
            en: "Before a debate against another school, your coach says, \"Remember, this is also a धर्मक्षेत्र.\" What does the coach most likely mean?",
            hi: "दूसरे विद्यालय के विरुद्ध वाद-विवाद से पहले आपके कोच कहते हैं, \"याद रखो, यह भी एक धर्मक्षेत्र है।\" कोच का सबसे संभावित आशय क्या है?",
          },
          options: [
            { en: "Winning matters, but playing fair and respecting the other side matters too", hi: "जीतना ज़रूरी है, पर ईमानदारी से खेलना और विरोधी पक्ष का सम्मान करना भी ज़रूरी है" },
            { en: "The debate hall is a holy place, so nobody should speak", hi: "वाद-विवाद कक्ष पवित्र स्थान है, इसलिए किसी को बोलना नहीं चाहिए" },
            { en: "Win by any means, because it is a battle", hi: "किसी भी तरह जीतो, क्योंकि यह युद्ध है" },
            { en: "The debate will take place in Kurukshetra", hi: "वाद-विवाद कुरुक्षेत्र में होगा" },
          ],
          hint: { en: "धर्म here means right conduct, not a place of worship.", hi: "यहाँ धर्म का अर्थ उचित आचरण है, पूजा-स्थल नहीं।" },
          explanation: {
            en: "Kurukshetra is called धर्मक्षेत्र, a field where right and wrong are tested. Any contest becomes a धर्मक्षेत्र when we care about how we compete, not only whether we win.",
            hi: "कुरुक्षेत्र को धर्मक्षेत्र कहा गया है, जहाँ सही और गलत की परख होती है। कोई भी प्रतियोगिता धर्मक्षेत्र बन जाती है जब हमें केवल जीत की नहीं, बल्कि इसकी भी परवाह हो कि हम कैसे मुकाबला करते हैं।",
          },
        },
      ],
    },
  ],
};
