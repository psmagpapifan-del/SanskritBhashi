import type { GitaAdhyaya } from "./types.ts";

export const adhyaya2: GitaAdhyaya = {
  n: 2,
  name: "साङ्ख्ययोगः",
  title: { en: "The Yoga of Knowledge", hi: "सांख्ययोग" },
  context: {
    en: "Arjuna, in tears, admits he is confused and asks Krishna to teach him. Krishna begins: the true Self is never born and never dies; pleasure and pain come and go; and we should do our duty with full effort while letting go of worry about the result. The chapter ends with a picture of the स्थितप्रज्ञ, a person whose mind stays steady in every situation.",
    hi: "आँसू भरे अर्जुन मान लेते हैं कि वे उलझन में हैं और श्रीकृष्ण से शिक्षा माँगते हैं। श्रीकृष्ण समझाना आरंभ करते हैं: सच्चा आत्मा न जन्म लेता है, न मरता है; सुख और दुःख आते-जाते रहते हैं; और हमें फल की चिंता छोड़कर पूरे मन से अपना कर्तव्य करना चाहिए। अध्याय का अंत स्थितप्रज्ञ के वर्णन से होता है, ऐसा व्यक्ति जिसका मन हर परिस्थिति में स्थिर रहता है।",
  },
  crux: [
    { en: "You are more than your body and your moods; they change, you remain.", hi: "आप अपने शरीर और मनोदशा से बढ़कर हैं; वे बदलते हैं, आप बने रहते हैं।" },
    { en: "Give your full effort to the work; don't let fear of the result control you.", hi: "काम में पूरा प्रयास लगाइए; परिणाम का डर आपको नियंत्रित न करे।" },
    { en: "A steady mind in success and failure is itself yoga.", hi: "सफलता और असफलता में स्थिर मन ही योग है।" },
  ],
  shlokas: [
    // ── Classes 6–8 ──────────────────────────────────────────────────────────
    {
      ref: "2.3",
      levels: [1],
      speaker: "श्रीभगवानुवाच",
      text: "क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते ।\nक्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परन्तप ॥",
      words: [
        { sa: "क्लैब्यम्", en: "weakness, lack of courage", hi: "नपुंसकता, कायरता" },
        { sa: "मा स्म गमः", en: "do not give in to", hi: "मत प्राप्त हो" },
        { sa: "न एतत् त्वयि उपपद्यते", en: "this does not suit you", hi: "यह तुम्हें शोभा नहीं देता" },
        { sa: "क्षुद्रम्", en: "petty, small", hi: "तुच्छ" },
        { sa: "हृदयदौर्बल्यम्", en: "weakness of heart", hi: "हृदय की दुर्बलता" },
        { sa: "त्यक्त्वा", en: "giving up", hi: "त्यागकर" },
        { sa: "उत्तिष्ठ", en: "stand up!", hi: "उठो!" },
        { sa: "परन्तप", en: "O scorcher of foes (Arjuna)", hi: "हे शत्रुओं को तपाने वाले (अर्जुन)" },
      ],
      meaning: {
        en: "O Partha, do not give in to this weakness; it does not suit you. Shake off this petty weakness of heart and stand up, O Arjuna!",
        hi: "हे पार्थ! इस कायरता को मत अपनाओ; यह तुम्हें शोभा नहीं देती। हे परन्तप! हृदय की इस तुच्छ दुर्बलता को त्यागकर उठ खड़े हो।",
      },
      situation: {
        title: { en: "One bad match", hi: "एक ख़राब मैच" },
        story: {
          en: "Aarav is the best goalkeeper in his class, but in Saturday's match he let in four goals. On Monday he tells the coach he wants to quit the team. The coach doesn't say \"It's fine, quit\". She says, \"That isn't you. One bad match doesn't make you a bad keeper. Get up and come to practice.\" That is the spirit of उत्तिष्ठ: a friend who believes in you reminds you of your strength when you have forgotten it.",
          hi: "आरव अपनी कक्षा का सबसे अच्छा गोलकीपर है, पर शनिवार के मैच में उसने चार गोल खा लिए। सोमवार को वह कोच से कहता है कि वह टीम छोड़ना चाहता है। कोच यह नहीं कहतीं कि \"ठीक है, छोड़ दो\"। वे कहती हैं, \"यह तुम नहीं हो। एक ख़राब मैच तुम्हें ख़राब कीपर नहीं बनाता। उठो और अभ्यास पर आओ।\" यही उत्तिष्ठ की भावना है: जो मित्र आप पर विश्वास करता है, वह आपकी भूली हुई शक्ति आपको याद दिलाता है।",
        },
      },
      reflect: {
        en: "What would you say to a friend who wants to give up after one failure? Can you say the same to yourself?",
        hi: "एक असफलता के बाद हार मानने वाले मित्र से आप क्या कहेंगे? क्या आप वही बात ख़ुद से कह सकते हैं?",
      },
      questions: [
        {
          prompt: { en: "What does Krishna tell Arjuna to do in this shloka?", hi: "इस श्लोक में श्रीकृष्ण अर्जुन से क्या करने को कहते हैं?" },
          options: [
            { en: "Give up weakness of heart and stand up", hi: "हृदय की दुर्बलता त्यागकर उठ खड़े हों" },
            { en: "Sit quietly and meditate", hi: "चुपचाप बैठकर ध्यान करें" },
            { en: "Go home and rest", hi: "घर जाकर आराम करें" },
            { en: "Ask Bhishma for advice", hi: "भीष्म से सलाह लें" },
          ],
          hint: { en: "Find the word उत्तिष्ठ at the end of the shloka.", hi: "श्लोक के अंत में उत्तिष्ठ शब्द खोजिए।" },
          explanation: {
            en: "क्षुद्रं हृदयदौर्बल्यं त्यक्त्वा उत्तिष्ठ: giving up petty weakness of heart, stand up! उत्तिष्ठ is the command form (लोट् लकार) of the verb उत् + स्था, to stand up.",
            hi: "क्षुद्रं हृदयदौर्बल्यं त्यक्त्वा उत्तिष्ठ: तुच्छ हृदय-दुर्बलता छोड़कर उठो! उत्तिष्ठ, उत् + स्था धातु का आज्ञार्थक रूप (लोट् लकार) है।",
          },
        },
        {
          prompt: {
            en: "Sana forgot her lines in the school play and now refuses to act ever again. Which advice matches this shloka?",
            hi: "सना स्कूल के नाटक में अपने संवाद भूल गई और अब कभी अभिनय न करने की ज़िद कर रही है। कौन-सी सलाह इस श्लोक से मेल खाती है?",
          },
          options: [
            { en: "\"One mistake doesn't define you. Let's practise and try again.\"", hi: "\"एक गलती से तुम्हारी पहचान नहीं बनती। चलो अभ्यास करें और फिर कोशिश करें।\"" },
            { en: "\"You're right, acting isn't for you.\"", hi: "\"तुम ठीक कहती हो, अभिनय तुम्हारे बस का नहीं।\"" },
            { en: "\"Next time, ask someone else to say your lines.\"", hi: "\"अगली बार अपने संवाद किसी और से बुलवा लेना।\"" },
            { en: "\"Just forget about it and never think of it again.\"", hi: "\"बस भूल जाओ और फिर कभी इसके बारे में मत सोचो।\"" },
          ],
          hint: { en: "Krishna says the weakness \"does not suit you\". He reminds Arjuna of his strength.", hi: "श्रीकृष्ण कहते हैं कि यह दुर्बलता \"तुम्हें शोभा नहीं देती\"। वे अर्जुन को उनकी शक्ति याद दिलाते हैं।" },
          explanation: {
            en: "Krishna does not agree with Arjuna's wish to quit, nor does he mock him. He reminds him who he really is (परन्तप) and asks him to rise. Good encouragement does the same.",
            hi: "श्रीकृष्ण न तो अर्जुन की हार मानने की इच्छा से सहमत होते हैं, न उनका उपहास करते हैं। वे उन्हें याद दिलाते हैं कि वे वास्तव में कौन हैं (परन्तप) और उठने को कहते हैं। सच्चा प्रोत्साहन भी यही करता है।",
          },
        },
      ],
    },
    {
      ref: "2.14",
      levels: [1],
      speaker: "श्रीभगवानुवाच",
      text: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः ।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ॥",
      words: [
        { sa: "मात्रास्पर्शाः", en: "contacts of the senses with their objects", hi: "इन्द्रियों और विषयों के संयोग" },
        { sa: "शीत-उष्ण-सुख-दुःख-दाः", en: "giving cold and heat, pleasure and pain", hi: "सर्दी-गर्मी और सुख-दुःख देने वाले" },
        { sa: "आगम-अपायिनः", en: "coming and going", hi: "आने-जाने वाले" },
        { sa: "अनित्याः", en: "not permanent", hi: "अनित्य, क्षणभंगुर" },
        { sa: "तान्", en: "them", hi: "उनको" },
        { sa: "तितिक्षस्व", en: "bear patiently", hi: "सहन करो" },
      ],
      meaning: {
        en: "O son of Kunti, the contacts of the senses with their objects bring cold and heat, pleasure and pain. They come and go and do not last; bear them patiently, O Bharata.",
        hi: "हे कुन्तीपुत्र! इन्द्रियों और विषयों के संयोग ही सर्दी-गर्मी और सुख-दुःख देने वाले हैं। वे आते-जाते रहते हैं और अनित्य हैं; इसलिए हे भारत! उन्हें सहन करो।",
      },
      situation: {
        title: { en: "The hot sports day", hi: "गर्मी वाला खेल-दिवस" },
        story: {
          en: "It is 40°C on sports day and Tara has to wait two hours for her relay. She is hot, thirsty and grumpy, and wants to go home. Her grandmother, watching from the stands, tells her, \"The sun will set, the race will start, and you will forget this heat by tonight. Drink water, sit in the shade and wait.\" Heat, a scolding, a sore knee or a sweet compliment are all आगमापायिनः: they come and they go. Learning to bear them calmly (तितिक्षा) makes you strong.",
          hi: "खेल-दिवस पर पारा 40°C है और तारा को अपनी रिले के लिए दो घंटे इंतज़ार करना है। उसे गर्मी और प्यास लग रही है, वह चिढ़ी हुई है और घर जाना चाहती है। दर्शकों में बैठी उसकी दादी कहती हैं, \"सूरज ढल जाएगा, दौड़ शुरू होगी, और रात तक तुम यह गर्मी भूल जाओगी। पानी पियो, छाँव में बैठो और प्रतीक्षा करो।\" गर्मी, डाँट, छिला हुआ घुटना या मीठी तारीफ़, सब आगमापायिनः हैं: आते हैं और चले जाते हैं। इन्हें शांति से सहना (तितिक्षा) सीखना आपको मज़बूत बनाता है।",
        },
      },
      reflect: {
        en: "Name one uncomfortable feeling you had last week. Is it still as strong today?",
        hi: "पिछले हफ़्ते की कोई एक असहज भावना बताइए। क्या वह आज भी उतनी ही तीव्र है?",
      },
      questions: [
        {
          prompt: { en: "According to this shloka, what is true of heat and cold, pleasure and pain?", hi: "इस श्लोक के अनुसार सर्दी-गर्मी और सुख-दुःख के बारे में क्या सत्य है?" },
          options: [
            { en: "They come and go and do not last", hi: "वे आते-जाते हैं और टिकते नहीं" },
            { en: "They last forever", hi: "वे हमेशा रहते हैं" },
            { en: "Only pain comes and goes; pleasure stays", hi: "केवल दुःख आता-जाता है; सुख टिका रहता है" },
            { en: "They can be avoided completely", hi: "उनसे पूरी तरह बचा जा सकता है" },
          ],
          hint: { en: "Look at आगमापायिनः and अनित्याः.", hi: "आगमापायिनः और अनित्याः शब्द देखिए।" },
          explanation: {
            en: "आगम (coming) + अपायिन् (going): they are temporary (अनित्य). That is why Krishna says तितिक्षस्व, bear them patiently.",
            hi: "आगम (आना) + अपायिन् (जाना): ये अस्थायी (अनित्य) हैं। इसीलिए श्रीकृष्ण कहते हैं तितिक्षस्व, इन्हें धैर्य से सहन करो।",
          },
        },
        {
          prompt: {
            en: "Dev gets a low mark in one maths test and feels terrible all evening. What would this shloka suggest?",
            hi: "देव को गणित की एक परीक्षा में कम अंक मिलते हैं और वह पूरी शाम बहुत दुखी रहता है। यह श्लोक क्या सुझाएगा?",
          },
          options: [
            { en: "This bad feeling will pass; stay calm and keep working", hi: "यह बुरी भावना बीत जाएगी; शांत रहकर काम करते रहो" },
            { en: "Stop studying maths so you never feel bad again", hi: "गणित पढ़ना छोड़ दो ताकि फिर कभी बुरा न लगे" },
            { en: "Stay sad until the next test", hi: "अगली परीक्षा तक दुखी रहो" },
            { en: "Pretend you did not get the result", hi: "दिखाओ कि परिणाम मिला ही नहीं" },
          ],
          hint: { en: "Pain is अनित्य. What does तितिक्षस्व ask us to do?", hi: "दुःख अनित्य है। तितिक्षस्व हमसे क्या करने को कहता है?" },
          explanation: {
            en: "तितिक्षा is calm endurance: not running away and not drowning in the feeling, but bearing it while carrying on with your duty.",
            hi: "तितिक्षा का अर्थ है शांत सहनशीलता: न भागना, न भावना में डूब जाना, बल्कि उसे सहते हुए अपना कर्तव्य करते रहना।",
          },
        },
      ],
    },
    {
      ref: "2.47",
      levels: [1],
      speaker: "श्रीभगवानुवाच",
      text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
      words: [
        { sa: "कर्मणि एव", en: "in action alone", hi: "कर्म में ही" },
        { sa: "अधिकारः ते", en: "is your right", hi: "तुम्हारा अधिकार है" },
        { sa: "मा फलेषु कदाचन", en: "never in its fruits", hi: "फलों में कभी नहीं" },
        { sa: "मा कर्मफलहेतुः भूः", en: "do not act for the sake of the reward", hi: "कर्मफल का कारण मत बनो" },
        { sa: "सङ्गः", en: "attachment", hi: "आसक्ति" },
        { sa: "अकर्मणि", en: "to not acting", hi: "कर्म न करने में" },
      ],
      meaning: {
        en: "Your right is to the work alone, never to its results. Do not let the reward be your reason for acting, and do not become attached to doing nothing.",
        hi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। कर्मफल को अपने कर्म का कारण मत बनाओ, और कर्म न करने में भी तुम्हारी आसक्ति न हो।",
      },
      situation: {
        title: { en: "Practising for the music exam", hi: "संगीत परीक्षा की तैयारी" },
        story: {
          en: "Riya keeps checking the clock and thinking, \"What if I don't pass the Grade 3 keyboard exam?\" The worry makes her practice shaky. Her teacher says, \"You can't control the examiner, but you can control these 30 minutes. Play this piece slowly, with full attention.\" Riya stops worrying about the certificate and starts enjoying the music, and her playing improves. The shloka does not say results don't matter; it says your effort is in your hands, so put your heart there. And it also warns: don't use \"results aren't mine\" as an excuse to skip practice!",
          hi: "रिया बार-बार घड़ी देखती है और सोचती है, \"अगर मैं कीबोर्ड की ग्रेड 3 परीक्षा में पास न हुई तो?\" चिंता के कारण उसका अभ्यास डगमगाता है। उसकी शिक्षिका कहती हैं, \"परीक्षक तुम्हारे हाथ में नहीं, पर ये 30 मिनट तुम्हारे हाथ में हैं। यह धुन धीरे-धीरे, पूरे ध्यान से बजाओ।\" रिया प्रमाणपत्र की चिंता छोड़कर संगीत का आनंद लेने लगती है, और उसका वादन सुधर जाता है। श्लोक यह नहीं कहता कि परिणाम महत्वहीन हैं; वह कहता है कि प्रयास आपके हाथ में है, इसलिए मन वहीं लगाइए। और यह चेतावनी भी देता है: \"फल मेरा नहीं\" कहकर अभ्यास से बचने का बहाना मत बनाइए!",
        },
      },
      reflect: {
        en: "Which part of your next exam is in your hands, and which part is not?",
        hi: "आपकी अगली परीक्षा का कौन-सा भाग आपके हाथ में है, और कौन-सा नहीं?",
      },
      questions: [
        {
          prompt: { en: "According to 2.47, what is our right (अधिकार)?", hi: "श्लोक 2.47 के अनुसार हमारा अधिकार किसमें है?" },
          options: [
            { en: "Only the action, not its result", hi: "केवल कर्म में, उसके फल में नहीं" },
            { en: "Only the result, not the action", hi: "केवल फल में, कर्म में नहीं" },
            { en: "Both the action and the result", hi: "कर्म और फल दोनों में" },
            { en: "Neither the action nor the result", hi: "न कर्म में, न फल में" },
          ],
          hint: { en: "कर्मणि एव: \"in action alone\".", hi: "कर्मणि एव: \"केवल कर्म में\"।" },
          explanation: {
            en: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन: your right is to action alone, never to its fruits. एव means \"only\".",
            hi: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन: तुम्हारा अधिकार केवल कर्म में है, फलों में कभी नहीं। एव का अर्थ है \"ही/केवल\"।",
          },
        },
        {
          prompt: {
            en: "Ishaan says, \"Results aren't in my hands anyway, so why study?\" What does the last part of 2.47 say to him?",
            hi: "इशान कहता है, \"परिणाम तो मेरे हाथ में है ही नहीं, फिर पढ़ूँ क्यों?\" श्लोक 2.47 का अंतिम भाग उससे क्या कहता है?",
          },
          options: [
            { en: "Do not be attached to inaction either (मा ते सङ्गोऽस्त्वकर्मणि)", hi: "कर्म न करने में भी आसक्ति मत रखो (मा ते सङ्गोऽस्त्वकर्मणि)" },
            { en: "He is right; if results are not ours, we need not work", hi: "वह सही है; फल हमारा नहीं तो काम की ज़रूरत नहीं" },
            { en: "Study only if a reward is promised", hi: "केवल इनाम का वादा हो तभी पढ़ो" },
            { en: "Let someone else do the work", hi: "काम किसी और को करने दो" },
          ],
          hint: { en: "अकर्मणि means \"in not acting\".", hi: "अकर्मणि का अर्थ है \"कर्म न करने में\"।" },
          explanation: {
            en: "The shloka closes the loophole: मा ते सङ्गोऽस्त्वकर्मणि, let there be no attachment to inaction. Letting go of worry about results is not permission to stop working.",
            hi: "श्लोक यह बहाना बंद कर देता है: मा ते सङ्गोऽस्त्वकर्मणि, कर्म न करने में तुम्हारी आसक्ति न हो। फल की चिंता छोड़ने का अर्थ काम छोड़ने की छूट नहीं है।",
          },
        },
      ],
    },
    // ── Classes 9–10 ─────────────────────────────────────────────────────────
    {
      ref: "2.7",
      levels: [2],
      speaker: "अर्जुन उवाच",
      text: "कार्पण्यदोषोपहतस्वभावः पृच्छामि त्वां धर्मसम्मूढचेताः ।\nयच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे शिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम् ॥",
      words: [
        { sa: "कार्पण्यदोष-उपहत-स्वभावः", en: "my nature overcome by the fault of weakness", hi: "कायरता-रूपी दोष से दबे स्वभाव वाला" },
        { sa: "धर्मसम्मूढचेताः", en: "with a mind confused about duty", hi: "धर्म के विषय में मोहित चित्त वाला" },
        { sa: "पृच्छामि त्वाम्", en: "I ask you", hi: "मैं आपसे पूछता हूँ" },
        { sa: "यत् श्रेयः स्यात्", en: "what would be truly good", hi: "जो कल्याणकारी हो" },
        { sa: "निश्चितम्", en: "for certain", hi: "निश्चित रूप से" },
        { sa: "शिष्यः ते अहम्", en: "I am your student", hi: "मैं आपका शिष्य हूँ" },
        { sa: "शाधि माम्", en: "teach me", hi: "मुझे शिक्षा दीजिए" },
        { sa: "प्रपन्नम्", en: "who has come to you for refuge", hi: "शरण में आए हुए" },
      ],
      meaning: {
        en: "Arjuna said: My nature is overcome by weakness and my mind is confused about my duty. I ask you: tell me for certain what is truly good for me. I am your student; teach me, for I have come to you for refuge.",
        hi: "अर्जुन बोले: कायरता-रूपी दोष से मेरा स्वभाव दब गया है और धर्म के विषय में मेरा चित्त मोहित है। मैं आपसे पूछता हूँ: जो निश्चित रूप से कल्याणकारी हो, वह मुझे बताइए। मैं आपका शिष्य हूँ; आपकी शरण में आए हुए मुझको शिक्षा दीजिए।",
      },
      situation: {
        title: { en: "Choosing a stream after Class 10", hi: "कक्षा 10 के बाद विषय चुनना" },
        story: {
          en: "Everyone around Dev has an opinion: his uncle says engineering, his best friend is taking commerce, his own heart is drawn to biology. Dev feels stuck and pretends he has it figured out. Finally he goes to his school counsellor and says, \"Honestly, I'm confused. Can you help me think this through?\" That is exactly Arjuna's step in 2.7: he stops arguing, admits धर्मसम्मूढचेताः (I am confused about what is right), and asks to learn. Asking for guidance from someone wise is not weakness; it is where clarity begins.",
          hi: "देव के आसपास हर किसी की अपनी राय है: चाचा इंजीनियरिंग कहते हैं, उसका सबसे अच्छा दोस्त कॉमर्स ले रहा है, और उसका अपना मन जीवविज्ञान की ओर खिंचता है। देव अटका हुआ महसूस करता है और दिखाता है कि उसने सब सोच लिया है। आख़िर में वह स्कूल के काउंसलर के पास जाकर कहता है, \"सच कहूँ तो मैं उलझन में हूँ। क्या आप सोचने में मेरी मदद करेंगे?\" श्लोक 2.7 में अर्जुन भी ठीक यही कदम उठाते हैं: वे बहस बंद करते हैं, मानते हैं धर्मसम्मूढचेताः (मैं उलझन में हूँ कि सही क्या है), और सीखने का आग्रह करते हैं। किसी ज्ञानी से मार्गदर्शन माँगना कमज़ोरी नहीं; स्पष्टता यहीं से शुरू होती है।",
        },
      },
      reflect: {
        en: "Who are the two or three people you trust enough to say \"I'm confused, please help me think\"?",
        hi: "वे दो-तीन लोग कौन हैं जिनसे आप भरोसे के साथ कह सकते हैं, \"मैं उलझन में हूँ, कृपया सोचने में मदद कीजिए\"?",
      },
      questions: [
        {
          prompt: { en: "What important change happens in Arjuna in this shloka?", hi: "इस श्लोक में अर्जुन में कौन-सा महत्वपूर्ण परिवर्तन होता है?" },
          options: [
            { en: "He stops arguing and asks Krishna to teach him as his student", hi: "वे बहस छोड़कर शिष्य के रूप में श्रीकृष्ण से शिक्षा माँगते हैं" },
            { en: "He decides to fight without any doubt", hi: "वे बिना किसी संशय के युद्ध का निश्चय कर लेते हैं" },
            { en: "He orders Krishna to drive the chariot away", hi: "वे श्रीकृष्ण को रथ दूर ले जाने का आदेश देते हैं" },
            { en: "He challenges Bhishma to a duel", hi: "वे भीष्म को द्वंद्व-युद्ध के लिए ललकारते हैं" },
          ],
          hint: { en: "Look at शिष्यस्तेऽहं शाधि माम्.", hi: "शिष्यस्तेऽहं शाधि माम् देखिए।" },
          explanation: {
            en: "शिष्यः ते अहम् (I am your student), शाधि माम् (teach me). From here Krishna becomes Arjuna's teacher, and the actual teaching of the Gita begins in 2.11.",
            hi: "शिष्यः ते अहम् (मैं आपका शिष्य हूँ), शाधि माम् (मुझे शिक्षा दीजिए)। यहीं से श्रीकृष्ण अर्जुन के गुरु बनते हैं, और गीता का वास्तविक उपदेश 2.11 से आरंभ होता है।",
          },
        },
        {
          prompt: {
            en: "You are unsure whether to report a friend who is cheating. Which step follows the example of 2.7?",
            hi: "आप असमंजस में हैं कि नकल करने वाले मित्र की शिकायत करें या नहीं। कौन-सा कदम 2.7 के उदाहरण के अनुसार है?",
          },
          options: [
            { en: "Admit you are confused and ask a trusted, wise adult for guidance", hi: "मान लें कि आप उलझन में हैं और किसी भरोसेमंद, समझदार बड़े से मार्गदर्शन लें" },
            { en: "Decide quickly so nobody notices your doubt", hi: "जल्दी फ़ैसला कर लें ताकि किसी को आपका संशय न दिखे" },
            { en: "Ask only the friend who is cheating", hi: "केवल नकल करने वाले मित्र से ही पूछें" },
            { en: "Ignore it and hope the problem disappears", hi: "अनदेखा करें और आशा करें कि समस्या अपने-आप मिट जाए" },
          ],
          hint: { en: "Arjuna says धर्मसम्मूढचेताः and then पृच्छामि त्वाम्.", hi: "अर्जुन कहते हैं धर्मसम्मूढचेताः और फिर पृच्छामि त्वाम्।" },
          explanation: {
            en: "When duty is unclear, the Gita's model is honesty about the confusion plus a humble question to someone wise. Arjuna chose Krishna, not someone who would simply agree with him.",
            hi: "जब कर्तव्य स्पष्ट न हो, तो गीता का आदर्श है: उलझन के प्रति ईमानदारी और किसी ज्ञानी से विनम्र प्रश्न। अर्जुन ने श्रीकृष्ण को चुना, किसी ऐसे को नहीं जो बस उनकी हाँ में हाँ मिला दे।",
          },
        },
      ],
    },
    {
      ref: "2.48",
      levels: [2],
      speaker: "श्रीभगवानुवाच",
      text: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय ।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥",
      words: [
        { sa: "योगस्थः", en: "established in yoga (steady)", hi: "योग में स्थित" },
        { sa: "कुरु कर्माणि", en: "do your work", hi: "कर्म करो" },
        { sa: "सङ्गं त्यक्त्वा", en: "giving up attachment", hi: "आसक्ति त्यागकर" },
        { sa: "सिद्धि-असिद्ध्योः", en: "in success and failure", hi: "सफलता और असफलता में" },
        { sa: "समः भूत्वा", en: "being even-minded", hi: "समान भाव वाला होकर" },
        { sa: "समत्वम्", en: "evenness of mind", hi: "समता" },
        { sa: "योगः उच्यते", en: "is called yoga", hi: "योग कहलाता है" },
      ],
      meaning: {
        en: "Established in yoga, do your work, O Dhananjaya, giving up attachment and staying the same in success and failure. This evenness of mind is called yoga.",
        hi: "हे धनञ्जय! आसक्ति त्यागकर और सफलता-असफलता में समान भाव रखकर, योग में स्थित होकर कर्म करो। यह समता ही योग कहलाती है।",
      },
      situation: {
        title: { en: "Board exam results day", hi: "बोर्ड परीक्षा परिणाम का दिन" },
        story: {
          en: "Results are out. Kabir scored much higher than expected and is about to post a boastful status. Ananya scored lower than she hoped and wants to delete all her social media. Their teacher, Mrs Rao, tells them both the same thing: \"Celebrate or feel sad for today, then ask the same question: what did I learn, and what is my next step?\" समत्वम् doesn't mean not caring; it means neither success nor failure knocks you off balance, so you can keep doing your best.",
          hi: "परिणाम आ गए हैं। कबीर के अंक उम्मीद से बहुत अधिक आए हैं और वह घमंड भरा स्टेटस डालने वाला है। अनन्या के अंक उसकी आशा से कम आए हैं और वह अपना सारा सोशल मीडिया मिटा देना चाहती है। उनकी शिक्षिका श्रीमती राव दोनों से एक ही बात कहती हैं: \"आज ख़ुशी या दुःख मना लो, फिर वही प्रश्न पूछो: मैंने क्या सीखा, और मेरा अगला कदम क्या है?\" समत्वम् का अर्थ परवाह न करना नहीं; इसका अर्थ है कि न सफलता, न असफलता आपका संतुलन बिगाड़े, ताकि आप अपना सर्वश्रेष्ठ करते रहें।",
        },
      },
      reflect: {
        en: "How do you usually react to a big success? To a big disappointment? Which reaction would you like to make steadier?",
        hi: "बड़ी सफलता पर आप आमतौर पर कैसी प्रतिक्रिया देते हैं? बड़ी निराशा पर? आप किस प्रतिक्रिया को अधिक स्थिर बनाना चाहेंगे?",
      },
      questions: [
        {
          prompt: { en: "How does Krishna define yoga in 2.48?", hi: "श्लोक 2.48 में श्रीकृष्ण योग की परिभाषा कैसे देते हैं?" },
          options: [
            { en: "Evenness of mind (समत्वम्)", hi: "मन की समता (समत्वम्)" },
            { en: "Skill in physical postures", hi: "शारीरिक आसनों में निपुणता" },
            { en: "Giving up all work", hi: "सारे कर्म त्याग देना" },
            { en: "Winning every contest", hi: "हर प्रतियोगिता जीतना" },
          ],
          hint: { en: "Read the last quarter: समत्वं योग उच्यते.", hi: "अंतिम चरण पढ़िए: समत्वं योग उच्यते।" },
          explanation: {
            en: "समत्वं योग उच्यते: evenness is called yoga. A little later (2.50) Krishna adds a second definition: योगः कर्मसु कौशलम्, yoga is skill in action.",
            hi: "समत्वं योग उच्यते: समता को योग कहते हैं। थोड़ा आगे (2.50) श्रीकृष्ण दूसरी परिभाषा जोड़ते हैं: योगः कर्मसु कौशलम्, कर्मों में कुशलता ही योग है।",
          },
        },
        {
          prompt: {
            en: "Your team loses the inter-school final by one point. Which response shows समत्वम्?",
            hi: "आपकी टीम अंतर-विद्यालय फ़ाइनल एक अंक से हार जाती है। कौन-सी प्रतिक्रिया समत्वम् दिखाती है?",
          },
          options: [
            { en: "Feel the disappointment, congratulate the winners, and plan what to improve", hi: "निराशा महसूस करें, विजेताओं को बधाई दें, और सुधार की योजना बनाएँ" },
            { en: "Refuse to shake hands and leave angrily", hi: "हाथ मिलाने से मना करें और ग़ुस्से में चले जाएँ" },
            { en: "Decide never to play again", hi: "फिर कभी न खेलने का निश्चय करें" },
            { en: "Claim the referee cheated, without any reason", hi: "बिना किसी कारण के कहें कि रेफ़री ने बेईमानी की" },
          ],
          hint: { en: "सिद्ध्यसिद्ध्योः समः: the same in success and failure.", hi: "सिद्ध्यसिद्ध्योः समः: सफलता और असफलता में समान।" },
          explanation: {
            en: "Evenness is not pretending you don't feel anything. It is keeping your balance, so your next action comes from clear thinking rather than from hurt pride.",
            hi: "समता का अर्थ यह दिखाना नहीं कि आपको कुछ महसूस नहीं होता। इसका अर्थ है संतुलन बनाए रखना, ताकि आपका अगला कदम आहत अहंकार से नहीं, स्पष्ट सोच से निकले।",
          },
        },
      ],
    },
    {
      ref: "2.56",
      levels: [2],
      speaker: "श्रीभगवानुवाच",
      text: "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः ।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते ॥",
      words: [
        { sa: "दुःखेषु अनुद्विग्नमनाः", en: "not disturbed in mind in sorrows", hi: "दुःखों में उद्वेग-रहित मन वाला" },
        { sa: "सुखेषु विगतस्पृहः", en: "without craving in pleasures", hi: "सुखों में स्पृहा-रहित" },
        { sa: "वीत-राग-भय-क्रोधः", en: "free from attachment, fear and anger", hi: "राग, भय और क्रोध से रहित" },
        { sa: "स्थितधीः", en: "one of steady wisdom", hi: "स्थिर बुद्धि वाला" },
        { sa: "मुनिः उच्यते", en: "is called a sage", hi: "मुनि कहलाता है" },
      ],
      meaning: {
        en: "One whose mind is not shaken by sorrows, who does not crave pleasures, and who is free from attachment, fear and anger, is called a sage of steady wisdom.",
        hi: "दुःखों में जिसका मन उद्विग्न नहीं होता, सुखों में जिसकी स्पृहा नहीं रहती, और जो राग, भय और क्रोध से रहित है, वह स्थिर बुद्धि वाला मुनि कहलाता है।",
      },
      situation: {
        title: { en: "The group chat storm", hi: "ग्रुप चैट का तूफ़ान" },
        story: {
          en: "Someone posts an embarrassing photo of Meera in the class group. Within minutes there are laughing emojis. Meera's first impulse is to fire back an angry message; her second is to stay awake all night refreshing the chat. Instead, she puts the phone down, breathes, and the next morning calmly asks the person to delete it, and tells her class teacher. Steady wisdom (स्थितधीः) doesn't mean feeling nothing. It means fear and anger don't get to take the steering wheel.",
          hi: "कोई कक्षा के ग्रुप में मीरा की एक शर्मिंदा करने वाली फ़ोटो डाल देता है। कुछ ही मिनटों में हँसी वाले इमोजी आने लगते हैं। मीरा का पहला मन होता है कि ग़ुस्से भरा जवाब भेजे; दूसरा, कि पूरी रात जागकर चैट देखती रहे। इसके बजाय वह फ़ोन रख देती है, गहरी साँस लेती है, और अगली सुबह शांति से उस व्यक्ति से फ़ोटो हटाने को कहती है और अपनी कक्षा-शिक्षिका को बताती है। स्थिर बुद्धि (स्थितधीः) का अर्थ कुछ महसूस न करना नहीं है। इसका अर्थ है कि भय और क्रोध को अपने जीवन की बागडोर न थमाना।",
        },
      },
      reflect: {
        en: "Which of the three (राग attachment, भय fear, क्रोध anger) most often makes you act without thinking?",
        hi: "तीनों में से कौन (राग, भय, क्रोध) आपको सबसे अधिक बिना सोचे काम करने पर मजबूर करता है?",
      },
      questions: [
        {
          prompt: { en: "Which three things is the person of steady wisdom free from?", hi: "स्थिर बुद्धि वाला व्यक्ति किन तीन बातों से मुक्त होता है?" },
          options: [
            { en: "Attachment, fear and anger", hi: "राग, भय और क्रोध" },
            { en: "Work, family and friends", hi: "काम, परिवार और मित्र" },
            { en: "Food, sleep and play", hi: "भोजन, नींद और खेल" },
            { en: "Knowledge, devotion and action", hi: "ज्ञान, भक्ति और कर्म" },
          ],
          hint: { en: "Split the compound वीतरागभयक्रोधः.", hi: "समास वीतरागभयक्रोधः का विग्रह कीजिए।" },
          explanation: {
            en: "वीत (gone) + राग (attachment) + भय (fear) + क्रोध (anger): one from whom attachment, fear and anger have gone. It is a बहुव्रीहि compound describing the person.",
            hi: "वीत (गए हुए) + राग + भय + क्रोध: जिसके राग, भय और क्रोध चले गए हैं। यह व्यक्ति का वर्णन करने वाला बहुव्रीहि समास है।",
          },
        },
        {
          prompt: {
            en: "Aarav wins a big prize and immediately starts wanting more and more praise. Which part of the shloka speaks to him?",
            hi: "आरव एक बड़ा पुरस्कार जीतता है और तुरंत अधिक से अधिक प्रशंसा चाहने लगता है। श्लोक का कौन-सा भाग उससे बात करता है?",
          },
          options: [
            { en: "सुखेषु विगतस्पृहः: without craving in pleasures", hi: "सुखेषु विगतस्पृहः: सुखों में स्पृहा-रहित" },
            { en: "दुःखेष्वनुद्विग्नमनाः: undisturbed in sorrows", hi: "दुःखेष्वनुद्विग्नमनाः: दुःखों में अविचलित" },
            { en: "मुनिरुच्यते: is called a sage", hi: "मुनिरुच्यते: मुनि कहलाता है" },
            { en: "स्थितधीः: of steady wisdom", hi: "स्थितधीः: स्थिर बुद्धि वाला" },
          ],
          hint: { en: "His problem is in success, not in sorrow.", hi: "उसकी समस्या सफलता में है, दुःख में नहीं।" },
          explanation: {
            en: "Steadiness is tested in both directions. In sorrow, don't be shaken (अनुद्विग्न); in pleasure, don't crave more (विगतस्पृह).",
            hi: "स्थिरता की परीक्षा दोनों ओर होती है। दुःख में विचलित न हों (अनुद्विग्न); सुख में और अधिक की लालसा न करें (विगतस्पृह)।",
          },
        },
      ],
    },
    {
      ref: "2.62",
      levels: [2],
      speaker: "श्रीभगवानुवाच",
      text: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते ।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते ॥",
      words: [
        { sa: "ध्यायतः विषयान्", en: "of one who keeps thinking about sense objects", hi: "विषयों का चिन्तन करने वाले" },
        { sa: "पुंसः", en: "of a person", hi: "मनुष्य की" },
        { sa: "सङ्गः तेषु उपजायते", en: "attachment to them arises", hi: "उनमें आसक्ति उत्पन्न होती है" },
        { sa: "सङ्गात् कामः", en: "from attachment, desire", hi: "आसक्ति से कामना" },
        { sa: "कामात् क्रोधः", en: "from desire, anger", hi: "कामना से क्रोध" },
        { sa: "अभिजायते", en: "is born", hi: "उत्पन्न होता है" },
      ],
      meaning: {
        en: "When a person keeps thinking about the objects of the senses, attachment to them arises. From attachment comes desire, and from desire (when it is blocked) comes anger.",
        hi: "विषयों का चिन्तन करने वाले मनुष्य की उनमें आसक्ति हो जाती है। आसक्ति से कामना उत्पन्न होती है, और कामना (में बाधा पड़ने) से क्रोध उत्पन्न होता है।",
      },
      situation: {
        title: { en: "\"Just one more video\"", hi: "\"बस एक और वीडियो\"" },
        story: {
          en: "Ishaan watches one gaming video before homework. Then he keeps thinking about the game during class (ध्यायतो विषयान्). By evening he is desperate to play (सङ्ग, then काम). When his mother says, \"Homework first,\" he explodes and slams the door (क्रोध). Ishaan didn't decide to get angry; it built up step by step from a thought he kept feeding. The shloka shows the chain so we can break it early, at the thinking stage.",
          hi: "इशान होमवर्क से पहले गेमिंग का एक वीडियो देखता है। फिर कक्षा में भी वह उसी गेम के बारे में सोचता रहता है (ध्यायतो विषयान्)। शाम तक वह खेलने के लिए बेचैन हो जाता है (सङ्ग, फिर काम)। जब माँ कहती हैं, \"पहले होमवर्क,\" तो वह भड़ककर दरवाज़ा पटक देता है (क्रोध)। इशान ने ग़ुस्सा होने का निर्णय नहीं लिया था; वह उस विचार से कदम-दर-कदम बना जिसे वह पोषित करता रहा। श्लोक यह शृंखला दिखाता है ताकि हम उसे शुरू में ही, सोचने के चरण पर ही, तोड़ सकें।",
        },
      },
      reflect: {
        en: "What is one thought that, if you keep feeding it, usually ends in frustration for you?",
        hi: "कौन-सा एक विचार है जिसे पोषित करते रहने पर आपको अक्सर झुंझलाहट होती है?",
      },
      questions: [
        {
          prompt: { en: "What is the correct order of the chain in 2.62?", hi: "श्लोक 2.62 की शृंखला का सही क्रम क्या है?" },
          options: [
            { en: "Thinking of objects → attachment → desire → anger", hi: "विषय-चिन्तन → आसक्ति → कामना → क्रोध" },
            { en: "Anger → desire → attachment → thinking", hi: "क्रोध → कामना → आसक्ति → चिन्तन" },
            { en: "Desire → thinking → anger → attachment", hi: "कामना → चिन्तन → क्रोध → आसक्ति" },
            { en: "Attachment → anger → thinking → desire", hi: "आसक्ति → क्रोध → चिन्तन → कामना" },
          ],
          hint: { en: "Follow the ablatives: सङ्गात् (from attachment) …, कामात् (from desire) ….", hi: "पञ्चमी विभक्ति के रूप देखिए: सङ्गात् (आसक्ति से) …, कामात् (कामना से) …।" },
          explanation: {
            en: "ध्यायतः → सङ्गः → कामः → क्रोधः. The ablative case (पञ्चमी: सङ्गात्, कामात्) shows \"from which\" each step is born. The chain continues in 2.63.",
            hi: "ध्यायतः → सङ्गः → कामः → क्रोधः। पञ्चमी विभक्ति (सङ्गात्, कामात्) बताती है कि प्रत्येक चरण \"किससे\" उत्पन्न होता है। यह शृंखला 2.63 में आगे बढ़ती है।",
          },
        },
        {
          prompt: {
            en: "According to this shloka, where is the easiest place to break the chain that leads to anger?",
            hi: "इस श्लोक के अनुसार क्रोध तक ले जाने वाली शृंखला को तोड़ने का सबसे आसान स्थान कौन-सा है?",
          },
          options: [
            { en: "At the start: what we keep thinking about", hi: "शुरुआत में: जिसके बारे में हम सोचते रहते हैं" },
            { en: "Only after the anger has already exploded", hi: "क्रोध फूट पड़ने के बाद ही" },
            { en: "Nowhere; anger cannot be controlled", hi: "कहीं नहीं; क्रोध पर नियंत्रण असंभव है" },
            { en: "By blaming the people around us", hi: "आसपास के लोगों को दोष देकर" },
          ],
          hint: { en: "Which word comes first in the shloka?", hi: "श्लोक में सबसे पहले कौन-सा शब्द आता है?" },
          explanation: {
            en: "The chain starts with ध्यायतः, repeated thinking. Choosing what we dwell on is far easier than stopping anger once it has grown.",
            hi: "शृंखला ध्यायतः, यानी बार-बार चिन्तन से शुरू होती है। किस बात पर मन टिकाएँ, यह चुनना बढ़ चुके क्रोध को रोकने से कहीं आसान है।",
          },
        },
      ],
    },
    // ── Classes 11–12 ────────────────────────────────────────────────────────
    {
      ref: "2.13",
      levels: [3],
      speaker: "श्रीभगवानुवाच",
      text: "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा ।\nतथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति ॥",
      words: [
        { sa: "देहिनः", en: "of the embodied Self", hi: "देहधारी (जीवात्मा) की" },
        { sa: "अस्मिन् देहे", en: "in this body", hi: "इस शरीर में" },
        { sa: "कौमारं यौवनं जरा", en: "childhood, youth and old age", hi: "बालपन, जवानी और वृद्धावस्था" },
        { sa: "देहान्तरप्राप्तिः", en: "the attaining of another body", hi: "दूसरे शरीर की प्राप्ति" },
        { sa: "धीरः", en: "the wise, steady person", hi: "धीर पुरुष" },
        { sa: "न मुह्यति", en: "is not deluded", hi: "मोहित नहीं होता" },
      ],
      meaning: {
        en: "Just as the embodied Self passes through childhood, youth and old age in this body, so too it passes into another body. The wise are not deluded by this.",
        hi: "जैसे जीवात्मा को इस शरीर में बालपन, जवानी और वृद्धावस्था प्राप्त होती है, वैसे ही दूसरे शरीर की प्राप्ति होती है। धीर पुरुष इस विषय में मोहित नहीं होता।",
      },
      situation: {
        title: { en: "Old photos, same person", hi: "पुरानी तस्वीरें, वही व्यक्ति" },
        story: {
          en: "Clearing her room before college, Tara finds a photo of herself aged five, with missing teeth and a frock, and one from Class 8 with braces. Every cell in her body has changed since then, her voice, her height, her opinions. Yet something in her says \"That was me\" about each photo. Krishna points to this witness that stays the same through कौमार, यौवन and जरा. Knowing that you are more than the changing body helps you face big changes, such as leaving home, losing a grandparent or your own growing up, without being lost in them (धीरस्तत्र न मुह्यति).",
          hi: "कॉलेज जाने से पहले कमरा साफ़ करते हुए तारा को अपनी पाँच साल की उम्र की फ़ोटो मिलती है, टूटे दाँत और फ़्रॉक वाली, और कक्षा 8 की एक फ़ोटो जिसमें दाँतों पर ब्रेसेज़ हैं। तब से उसके शरीर की हर कोशिका बदल चुकी है, आवाज़, क़द, विचार सब। फिर भी हर फ़ोटो के बारे में उसके भीतर कुछ कहता है, \"वह मैं थी।\" श्रीकृष्ण इसी साक्षी की ओर संकेत करते हैं जो कौमार, यौवन और जरा में एक-सा रहता है। यह जानना कि आप बदलते शरीर से बढ़कर हैं, आपको बड़े बदलावों का सामना करने में मदद करता है, जैसे घर छोड़ना, दादा-दादी को खोना या स्वयं बड़ा होना, बिना उनमें खोए (धीरस्तत्र न मुह्यति)।",
        },
      },
      reflect: {
        en: "What about you has stayed the same since you were small, even though almost everything else has changed?",
        hi: "बचपन से अब तक लगभग सब कुछ बदल गया, फिर भी आपके भीतर क्या वैसा ही बना हुआ है?",
      },
      questions: [
        {
          prompt: { en: "What example does Krishna use to explain the passing of the Self into another body?", hi: "आत्मा के दूसरे शरीर में जाने को समझाने के लिए श्रीकृष्ण कौन-सा उदाहरण देते हैं?" },
          options: [
            { en: "The change from childhood to youth to old age in one body", hi: "एक ही शरीर में बालपन से जवानी और बुढ़ापे तक का परिवर्तन" },
            { en: "A river flowing into the ocean", hi: "समुद्र में मिलती नदी" },
            { en: "A seed becoming a tree", hi: "बीज से पेड़ बनना" },
            { en: "Day turning into night", hi: "दिन का रात में बदलना" },
          ],
          hint: { en: "कौमारं यौवनं जरा.", hi: "कौमारं यौवनं जरा।" },
          explanation: {
            en: "यथा … कौमारं यौवनं जरा, तथा देहान्तरप्राप्तिः: as with the stages of life, so with a new body. यथा … तथा (\"just as … so\") sets up the comparison. (2.22 gives another image: changing old clothes for new.)",
            hi: "यथा … कौमारं यौवनं जरा, तथा देहान्तरप्राप्तिः: जैसे जीवन की अवस्थाएँ, वैसे ही नया शरीर। यथा … तथा (\"जैसे … वैसे\") तुलना बनाते हैं। (2.22 एक और उदाहरण देता है: पुराने वस्त्र बदलकर नए पहनना।)",
          },
        },
        {
          prompt: {
            en: "Kabir is anxious about moving to a new city for college and feels he will \"lose himself\". How might 2.13 help him?",
            hi: "कबीर कॉलेज के लिए नए शहर जाने से चिंतित है और उसे लगता है कि वह \"ख़ुद को खो देगा\"। श्लोक 2.13 उसकी कैसे मदद कर सकता है?",
          },
          options: [
            { en: "He has already changed hugely since childhood and is still himself; outer change need not shake his inner identity", hi: "वह बचपन से बहुत बदल चुका है और फिर भी वही है; बाहरी बदलाव उसकी आंतरिक पहचान को नहीं डिगा सकता" },
            { en: "He should avoid all change so that he stays the same", hi: "उसे हर बदलाव से बचना चाहिए ताकि वह वैसा ही रहे" },
            { en: "Only old people need to think about change", hi: "केवल बुज़ुर्गों को बदलाव के बारे में सोचना चाहिए" },
            { en: "Change is always bad and should be feared", hi: "बदलाव हमेशा बुरा होता है और उससे डरना चाहिए" },
          ],
          hint: { en: "धीरस्तत्र न मुह्यति: the steady person is not confused by change.", hi: "धीरस्तत्र न मुह्यति: धीर व्यक्ति परिवर्तन से भ्रमित नहीं होता।" },
          explanation: {
            en: "The shloka teaches stability through change: bodies, places and roles change, but the देही (the one who has the body) remains. Seeing this, the धीर person is not overwhelmed.",
            hi: "श्लोक परिवर्तन के बीच स्थिरता सिखाता है: शरीर, स्थान और भूमिकाएँ बदलती हैं, पर देही (शरीर का स्वामी) बना रहता है। यह देखकर धीर व्यक्ति विचलित नहीं होता।",
          },
        },
      ],
    },
    {
      ref: "2.22",
      levels: [3],
      speaker: "श्रीभगवानुवाच",
      text: "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि ।\nतथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥",
      words: [
        { sa: "वासांसि जीर्णानि", en: "worn-out clothes", hi: "पुराने वस्त्र" },
        { sa: "विहाय", en: "casting off", hi: "त्यागकर" },
        { sa: "नवानि अपराणि गृह्णाति", en: "takes other, new ones", hi: "दूसरे नए (वस्त्र) ग्रहण करता है" },
        { sa: "नरः", en: "a person", hi: "मनुष्य" },
        { sa: "शरीराणि जीर्णानि", en: "worn-out bodies", hi: "पुराने शरीर" },
        { sa: "संयाति", en: "goes into, enters", hi: "प्राप्त होता है" },
        { sa: "देही", en: "the embodied Self", hi: "जीवात्मा" },
      ],
      meaning: {
        en: "Just as a person casts off worn-out clothes and puts on new ones, so the embodied Self casts off worn-out bodies and enters new ones.",
        hi: "जैसे मनुष्य पुराने वस्त्रों को त्यागकर दूसरे नए वस्त्र ग्रहण करता है, वैसे ही जीवात्मा पुराने शरीरों को त्यागकर दूसरे नए शरीरों को प्राप्त होता है।",
      },
      situation: {
        title: { en: "Coping with a loss", hi: "किसी के जाने का दुःख" },
        story: {
          en: "Ananya's grandfather, who taught her chess and Sanskrit shlokas, has passed away. At the prayer meeting a family elder recites this shloka. Ananya still cries, and the Gita doesn't ask her not to. But the image stays with her: the grandfather she loved was not just the tired body in the hospital bed; that was the old garment. What he gave her, his patience and his love of learning, lives on in her. Krishna offers this teaching to Arjuna for exactly such grief.",
          hi: "अनन्या के दादाजी, जिन्होंने उसे शतरंज और संस्कृत श्लोक सिखाए थे, नहीं रहे। प्रार्थना-सभा में परिवार के एक बुज़ुर्ग यह श्लोक पढ़ते हैं। अनन्या अब भी रोती है, और गीता उसे रोने से मना नहीं करती। पर यह उपमा उसके मन में बस जाती है: जिन दादाजी से वह प्रेम करती थी, वे केवल अस्पताल के बिस्तर पर पड़ा थका शरीर नहीं थे; वह तो पुराना वस्त्र था। उन्होंने जो दिया, उनका धैर्य और सीखने का प्रेम, वह अनन्या में जीवित है। श्रीकृष्ण यह उपदेश अर्जुन को ठीक ऐसे ही शोक के लिए देते हैं।",
        },
      },
      reflect: {
        en: "What qualities of someone you love do you hope to carry forward in your own life?",
        hi: "किसी प्रियजन के कौन-से गुण आप अपने जीवन में आगे ले जाना चाहेंगे?",
      },
      questions: [
        {
          prompt: { en: "In 2.22, what are the worn-out clothes compared to?", hi: "श्लोक 2.22 में पुराने वस्त्रों की तुलना किससे की गई है?" },
          options: [
            { en: "Worn-out bodies that the Self leaves behind", hi: "पुराने शरीर, जिन्हें आत्मा छोड़ देता है" },
            { en: "Bad habits we should give up", hi: "बुरी आदतें, जिन्हें छोड़ना चाहिए" },
            { en: "Old friends we no longer meet", hi: "पुराने मित्र, जिनसे अब नहीं मिलते" },
            { en: "Old books we have finished reading", hi: "पुरानी किताबें, जो पढ़ ली गई हैं" },
          ],
          hint: { en: "The second line repeats the pattern with शरीराणि.", hi: "दूसरी पंक्ति शरीराणि के साथ वही ढाँचा दोहराती है।" },
          explanation: {
            en: "यथा वासांसि जीर्णानि विहाय … तथा शरीराणि विहाय जीर्णानि …: as with clothes, so with bodies. The देही (Self) is the wearer, not the garment.",
            hi: "यथा वासांसि जीर्णानि विहाय … तथा शरीराणि विहाय जीर्णानि …: जैसे वस्त्र, वैसे शरीर। देही (आत्मा) पहनने वाला है, वस्त्र नहीं।",
          },
        },
        {
          prompt: {
            en: "Why does Krishna teach this to Arjuna at this point in the story?",
            hi: "कथा के इस मोड़ पर श्रीकृष्ण अर्जुन को यह उपदेश क्यों देते हैं?",
          },
          options: [
            { en: "Arjuna is overwhelmed by grief at the thought of his elders and relatives dying", hi: "अपने बड़ों और संबंधियों की मृत्यु के विचार से अर्जुन शोक में डूबे हैं" },
            { en: "Arjuna wants to buy new clothes before the battle", hi: "अर्जुन युद्ध से पहले नए वस्त्र खरीदना चाहते हैं" },
            { en: "Krishna wants to describe the weather", hi: "श्रीकृष्ण मौसम का वर्णन करना चाहते हैं" },
            { en: "Arjuna has asked about the rules of chariot racing", hi: "अर्जुन ने रथ-दौड़ के नियमों के बारे में पूछा है" },
          ],
          hint: { en: "Remember how Chapter 1 ended.", hi: "याद कीजिए, पहला अध्याय कैसे समाप्त हुआ था।" },
          explanation: {
            en: "Arjuna's despair (Chapter 1) came from grief about death. Krishna's first answer is that the real Self is never destroyed (2.20) and only changes bodies (2.22).",
            hi: "अर्जुन का विषाद (अध्याय 1) मृत्यु के शोक से उपजा था। श्रीकृष्ण का पहला उत्तर है कि सच्चा आत्मा कभी नष्ट नहीं होता (2.20) और केवल शरीर बदलता है (2.22)।",
          },
        },
      ],
    },
    {
      ref: "2.50",
      levels: [3],
      speaker: "श्रीभगवानुवाच",
      text: "बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते ।\nतस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम् ॥",
      words: [
        { sa: "बुद्धियुक्तः", en: "one whose intellect is steady (in yoga)", hi: "समबुद्धि से युक्त" },
        { sa: "जहाति इह", en: "gives up here, in this life", hi: "यहीं (इस लोक में) त्याग देता है" },
        { sa: "उभे सुकृत-दुष्कृते", en: "both good and bad deeds (their binding effect)", hi: "पुण्य और पाप दोनों (के बन्धन)" },
        { sa: "तस्मात्", en: "therefore", hi: "इसलिए" },
        { sa: "योगाय युज्यस्व", en: "devote yourself to yoga", hi: "योग में लग जाओ" },
        { sa: "कर्मसु कौशलम्", en: "skill in actions", hi: "कर्मों में कुशलता" },
      ],
      meaning: {
        en: "One whose intellect is united with evenness is freed, here in this life, from the bondage of both good and bad deeds. Therefore devote yourself to yoga; yoga is skill in action.",
        hi: "समबुद्धि से युक्त पुरुष इसी लोक में पुण्य और पाप दोनों (के बन्धन) से मुक्त हो जाता है। इसलिए तुम योग में लग जाओ; कर्मों में कुशलता ही योग है।",
      },
      situation: {
        title: { en: "The surgeon and the student coder", hi: "सर्जन और विद्यार्थी कोडर" },
        story: {
          en: "Dev is building an app for his school's science fair. When he obsesses over winning, he rushes, copies code he doesn't understand and the app crashes. His mentor, a doctor, tells him how surgeons work: complete focus on each step, no panic and no showing off, because a steady mind makes skilful hands. Dev starts working that way: understand, build, test, repeat. योगः कर्मसु कौशलम्: yoga is not escaping from work; it is doing work so well, with a clear and balanced mind, that the work itself becomes your practice.",
          hi: "देव अपने स्कूल के विज्ञान मेले के लिए एक ऐप बना रहा है। जब वह जीतने की धुन में रहता है, तो जल्दबाज़ी करता है, बिना समझे कोड कॉपी करता है और ऐप क्रैश हो जाता है। उसके मार्गदर्शक, जो एक डॉक्टर हैं, बताते हैं कि सर्जन कैसे काम करते हैं: हर कदम पर पूरा ध्यान, न घबराहट, न दिखावा, क्योंकि स्थिर मन से ही हाथ कुशल बनते हैं। देव उसी तरह काम करने लगता है: समझो, बनाओ, जाँचो, दोहराओ। योगः कर्मसु कौशलम्: योग काम से भागना नहीं; बल्कि स्पष्ट और संतुलित मन से काम इतनी अच्छी तरह करना है कि काम स्वयं साधना बन जाए।",
        },
      },
      reflect: {
        en: "In what activity do you lose track of time because you are fully absorbed? What makes that possible?",
        hi: "किस काम में आप इतने डूब जाते हैं कि समय का पता नहीं चलता? ऐसा किस कारण संभव होता है?",
      },
      questions: [
        {
          prompt: { en: "What famous definition of yoga is given in 2.50?", hi: "श्लोक 2.50 में योग की कौन-सी प्रसिद्ध परिभाषा दी गई है?" },
          options: [
            { en: "योगः कर्मसु कौशलम्: yoga is skill in action", hi: "योगः कर्मसु कौशलम्: कर्मों में कुशलता ही योग है" },
            { en: "योगश्चित्तवृत्तिनिरोधः: yoga is stilling the mind's movements", hi: "योगश्चित्तवृत्तिनिरोधः: चित्त की वृत्तियों का निरोध योग है" },
            { en: "Yoga is giving up all work", hi: "सारे कर्मों का त्याग योग है" },
            { en: "Yoga is only a set of physical exercises", hi: "योग केवल शारीरिक व्यायाम है" },
          ],
          hint: { en: "Look at the last four words.", hi: "अंतिम चार शब्द देखिए।" },
          explanation: {
            en: "योगः कर्मसु कौशलम् is from the Gita (2.50). योगश्चित्तवृत्तिनिरोधः is Patanjali's Yoga Sutra 1.2, a different text with a different definition.",
            hi: "योगः कर्मसु कौशलम् गीता (2.50) से है। योगश्चित्तवृत्तिनिरोधः पतञ्जलि का योगसूत्र 1.2 है, जो दूसरा ग्रंथ और दूसरी परिभाषा है।",
          },
        },
        {
          prompt: {
            en: "Which student is practising योगः कर्मसु कौशलम् while preparing for an entrance exam?",
            hi: "प्रवेश परीक्षा की तैयारी करते हुए कौन-सा विद्यार्थी योगः कर्मसु कौशलम् का अभ्यास कर रहा है?",
          },
          options: [
            { en: "One who studies with full focus, reviews mistakes calmly and improves the method", hi: "जो पूरे ध्यान से पढ़ता है, गलतियों की शांति से समीक्षा करता है और तरीक़ा सुधारता है" },
            { en: "One who studies 16 hours a day in constant panic", hi: "जो लगातार घबराहट में दिन में 16 घंटे पढ़ता है" },
            { en: "One who gives up preparing because results are uncertain", hi: "जो परिणाम अनिश्चित होने के कारण तैयारी छोड़ देता है" },
            { en: "One who only memorises answers without understanding", hi: "जो बिना समझे केवल उत्तर रटता है" },
          ],
          hint: { en: "Skill (कौशल) comes from a steady mind (बुद्धियुक्त), not from panic.", hi: "कौशल स्थिर बुद्धि (बुद्धियुक्त) से आता है, घबराहट से नहीं।" },
          explanation: {
            en: "In the Gita, skill in action means working with a balanced, clear mind (बुद्धियोग), giving your best without being bound by anxiety over the outcome.",
            hi: "गीता में कर्म-कौशल का अर्थ है संतुलित, स्पष्ट मन (बुद्धियोग) से काम करना: परिणाम की चिंता से बँधे बिना अपना सर्वश्रेष्ठ देना।",
          },
        },
      ],
    },
    {
      ref: "2.63",
      levels: [3],
      speaker: "श्रीभगवानुवाच",
      text: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः ।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥",
      words: [
        { sa: "क्रोधात् सम्मोहः", en: "from anger, delusion", hi: "क्रोध से मूढ़भाव" },
        { sa: "सम्मोहात् स्मृतिविभ्रमः", en: "from delusion, confusion of memory", hi: "मूढ़भाव से स्मृति-भ्रम" },
        { sa: "स्मृतिभ्रंशात्", en: "from loss of memory", hi: "स्मृति-भ्रंश से" },
        { sa: "बुद्धिनाशः", en: "destruction of judgement", hi: "बुद्धि का नाश" },
        { sa: "प्रणश्यति", en: "one is ruined", hi: "मनुष्य का पतन हो जाता है" },
      ],
      meaning: {
        en: "From anger comes delusion; from delusion, confusion of memory; from loss of memory, the destruction of judgement; and when judgement is destroyed, a person is ruined.",
        hi: "क्रोध से मूढ़भाव उत्पन्न होता है, मूढ़भाव से स्मृति में भ्रम हो जाता है, स्मृति-भ्रंश से बुद्धि का नाश हो जाता है, और बुद्धि के नाश से मनुष्य का पतन हो जाता है।",
      },
      situation: {
        title: { en: "The message sent in anger", hi: "ग़ुस्से में भेजा गया संदेश" },
        story: {
          en: "Sana's best friend posts that she got the class representative post Sana wanted. Sana feels a flash of anger (क्रोध), and suddenly she can only see the friend as a rival (सम्मोह). She forgets years of kindness and the times this friend stood by her (स्मृतिविभ्रम). In that state she writes a cruel comment and posts it publicly (बुद्धिनाश). The next morning the friendship is badly damaged (प्रणश्यति). Read 2.62–63 together: two shlokas that map, step by step, how a thought becomes a disaster, and why the pause before you hit \"send\" is so powerful.",
          hi: "सना की सबसे अच्छी सहेली पोस्ट करती है कि उसे वह कक्षा-प्रतिनिधि पद मिल गया जो सना चाहती थी। सना के मन में ग़ुस्सा भड़कता है (क्रोध), और अचानक वह सहेली को केवल प्रतिद्वंद्वी के रूप में देखती है (सम्मोह)। वह बरसों की दयालुता और उन पलों को भूल जाती है जब यह सहेली उसके साथ खड़ी थी (स्मृतिविभ्रम)। उसी अवस्था में वह एक कठोर टिप्पणी लिखकर सबके सामने पोस्ट कर देती है (बुद्धिनाश)। अगली सुबह तक दोस्ती बुरी तरह टूट चुकी होती है (प्रणश्यति)। 2.62–63 को साथ पढ़िए: दो श्लोक जो कदम-दर-कदम बताते हैं कि एक विचार कैसे विपदा बन जाता है, और \"भेजें\" दबाने से पहले का ठहराव कितना शक्तिशाली है।",
        },
      },
      reflect: {
        en: "Recall a decision you made in anger. Which step of this chain did you notice too late?",
        hi: "ग़ुस्से में लिया कोई निर्णय याद कीजिए। इस शृंखला का कौन-सा चरण आपने बहुत देर से पहचाना?",
      },
      questions: [
        {
          prompt: { en: "In 2.63, what does the loss of memory (स्मृतिभ्रंश) lead to?", hi: "श्लोक 2.63 में स्मृतिभ्रंश से क्या होता है?" },
          options: [
            { en: "Destruction of judgement (बुद्धिनाश)", hi: "बुद्धि का नाश (बुद्धिनाश)" },
            { en: "Anger (क्रोध)", hi: "क्रोध" },
            { en: "Attachment (सङ्ग)", hi: "आसक्ति (सङ्ग)" },
            { en: "Peace (शान्ति)", hi: "शान्ति" },
          ],
          hint: { en: "स्मृतिभ्रंशाद् … what comes next?", hi: "स्मृतिभ्रंशाद् … आगे क्या आता है?" },
          explanation: {
            en: "क्रोध → सम्मोह → स्मृतिविभ्रम → बुद्धिनाश → प्रणाश. Together with 2.62 the full ladder of fall is: thinking → attachment → desire → anger → delusion → memory loss → loss of judgement → ruin.",
            hi: "क्रोध → सम्मोह → स्मृतिविभ्रम → बुद्धिनाश → प्रणाश। 2.62 के साथ पतन की पूरी सीढ़ी है: चिन्तन → आसक्ति → कामना → क्रोध → मोह → स्मृति-भ्रम → बुद्धिनाश → पतन।",
          },
        },
        {
          prompt: {
            en: "Why does \"memory\" (स्मृति) matter so much in this chain, in everyday terms?",
            hi: "रोज़मर्रा के अर्थ में इस शृंखला में \"स्मृति\" इतनी महत्वपूर्ण क्यों है?",
          },
          options: [
            { en: "In anger we forget our values and what we already know is right, so we judge badly", hi: "क्रोध में हम अपने मूल्य और सही-गलत की पहले से मालूम समझ भूल जाते हैं, इसलिए गलत निर्णय लेते हैं" },
            { en: "Because we forget our exam answers", hi: "क्योंकि हम परीक्षा के उत्तर भूल जाते हैं" },
            { en: "Because memory games make us angry", hi: "क्योंकि याददाश्त वाले खेल हमें ग़ुस्सा दिलाते हैं" },
            { en: "Memory has nothing to do with judgement", hi: "स्मृति का निर्णय से कोई संबंध नहीं" },
          ],
          hint: { en: "What did Sana forget in the story?", hi: "कहानी में सना क्या भूल गई थी?" },
          explanation: {
            en: "स्मृति here is remembering what we have learnt: our values, past experience, who people really are. When anger clouds it, the intellect (बुद्धि) has nothing true to judge with.",
            hi: "यहाँ स्मृति का अर्थ है जो हमने सीखा है उसका स्मरण: हमारे मूल्य, पिछला अनुभव, लोग वास्तव में कैसे हैं। जब क्रोध उसे ढक देता है, तो बुद्धि के पास निर्णय के लिए कोई सच्चा आधार नहीं बचता।",
          },
        },
      ],
    },
  ],
};
