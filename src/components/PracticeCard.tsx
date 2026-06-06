"use client";

import React, { useState, useEffect } from "react";
import { Play, Volume2, HelpCircle, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, ArrowRight, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fireConfetti } from "./ConfettiCelebration";
import ErrorReportButton from "./ErrorReportButton";
import AdSenseWidget from "./AdSenseWidget";
import { getTranslation } from "@/lib/i18n";

function localizeText(text: string, lang: string): string {
  if (!text || lang === "en") return text;
  
  const dict: Record<string, Record<string, string>> = {
    ja: {
      "Sandhi & Word-Junctions": "サンドゥヒと語結合 (連声)",
      "Karak & Vibhakti Cases": "カーラカとヴィバクティ (格と格変化)",
      "Dhatu-Rupa & Lakara Conjugations": "ダートゥルーパとラカーラ動詞活用",
      "Samasa Compound Formations": "サマーサ複合成句",
      "Shloka Anvaya & Prose-Ordering": "シュローカ・アンヴァヤと散文順序",
      "Laghu-Guru-Guru-Guru": "短音-長音-長音-長音 (ラグ-グル-グル-グル)",
      "Guru-Laghu-Laghu": "長音-短音-短音",
      "Laghu-Guru-Laghu": "短音-長音-短音",
      "Guru-Guru-Laghu-Guru-Laghu-Laghu-Laghu": "長-長-短-長-短-短-短",
      "Guru-Guru-Laghu-Guru-Guru-Laghu-Guru": "長-長-短-長-長-短-長",
      "Laghu-Guru-Guru-Laghu": "短音-長音-長音-短音",
      "Laghu-Laghu-Guru": "短音-短音-長音",
      "Guru-Laghu-Laghu-Laghu-Guru": "長-短-短-短-長",
      "Guru-Guru-Laghu-Guru": "長-長-短-長",
      "Guru-Guru-Guru-Guru-Laghu-Guru-Guru-Guru": "長-長-長-長-短-長-長-長",
      "Kanthya, Oṣṭhya, Talavya": "喉音, 唇音, 口蓋音",
      "Talavya, Dantya, Kanthya": "口蓋音, 歯音, 喉音",
      "Dantya, Kanthya, Dantyoṣṭhya": "歯音, 喉音, 歯唇音",
      "Mūrdhanya, Dantya, Kanthya, Oṣṭhya": "反舌音, 歯音, 喉音, 唇音",
      "Kanthya, Dantya, Mūrdhanya, Oṣṭhya": "喉音, 歯音, 反舌音, 唇音",
      "Mūrdhanya, Dantya, Talavya": "反舌音, 歯音, 口蓋音",
      "Kanthya, Oṣṭhya, Dantya": "喉音, 唇音, 歯音",
      "Talavya, Oṣṭhya, Mūrdhanya": "口蓋音, 唇音, 反舌音",
      "Dantya, Oṣṭhya, Kanthya": "歯音, 唇音, 喉音",
      "Noun Base": "名詞語幹",
      "Noun (Base)": "名詞語幹",
      "Noun (1st case, Sing.)": "名詞 (主格, 単数)",
      "Avyaya (Indeclinable)": "不変化詞 (アヴィヤヤ)",
      "Dative pronoun": "与格代名詞",
      "Locative singular": "処格 (単数)",
      "Avyaya (emphasis)": "不変化詞 (強調)",
      "Nominative singular": "主格 (単数)",
      "Genitive singular": "属格 (単数)",
      "Noun": "名詞",
      "Noun Stem": "名詞語幹",
      "Verb/Noun": "動詞/名詞",
      "Verb (Tin-anta)": "動詞 (ティン・アンタ)",
      "Upapada/Pūrva-pada": "前節 / 前部要素 (プールヴァ・パダ)",
      "Uttara-pada": "後節 / 後部要素 (ウッタラ・パダ)",
      "preceding member": "前部語",
      "following member": "後部語",
      "preceding stem": "前部語幹",
      "following word": "後部語",
      "subject/agent": "主語 / 動作主",
      "object/action": "目的語 / 動作",
      "former compound member": "複合語の前部要素",
      "latter compound member": "複合語の後部要素",
      "conjugated form": "活用形",
      "in the field of righteousness": "正義の野において",
      "desiring to fight": "戦いを望む者たち",
      "salutations": "敬礼",
      "to you": "あなたに",
      "in action": "行為において",
      "only": "〜のみ",
      "right": "権利 / 権能",
      "right / claim": "権利 / 主張",
      "your": "あなたの",
      "thy / your": "汝の / お前の",
      "God": "神",
      "Abode/Temple": "家 / 寺院",
      "Thus": "このように",
      "In this manner": "このようにして",
      "Noun/Adjective": "名詞/形容詞",
      "Noun/Suffix": "名詞/接尾辞",
      "Suffix/Noun": "接尾辞/名詞",
      "Your right is to action alone, never to its fruits.": "あなたの権能は行為そのものにのみあり、その結果には決してない。",
      "Renounce action and sit in pure silence.": "行為を放棄し、純粋な沈黙の中に座しなさい。",
      "Results are predetermined; action is irrelevant.": "結果はあらかじめ決定されており、行為は無関係である。",
      "All actions are illusion; only knowledge is real.": "すべての行為は幻影であり、知識のみが真実である。",
      "Choose the correct logical prose syntactical alignment (Anvaya) for the first verse of the Bhagavad Gita.": "バガヴァッド・ギーター第1章第1節の、正しい論理的な散文構文配列（アンヴァヤ）を選択してください。",
      "Identify the Kāraka role and case of 'vṛkṣāt' (from the tree) in this sentence.": "この文における 'vṛkṣāt'（木から）のカーラカ（格役割）と格変化を選択してください。",
      "What Kāraka or Vibhakti rule governs the use of the word 'rāmeṇa' (by Rama) in this passive sentence?": "この受動態の文において、語句 'rāmeṇa'（ラーマによって）の使用を支配しているカーラカまたはヴィバクティの規則は何ですか？",
      "Identify the Dhatu, Lakāra (tense), Puruṣa, and Vacana of the verb form 'paṭhiṣyāmi'.": "動詞活用形 'paṭhiṣyāmi' の語根（Dhatu）、ラカーラ（時制）、人称（Puruṣa）、数（Vacana）を特定してください。",
      "Analyze the grammatical parameters of the verb 'abhavat' (became).": "動詞 'abhavat'（〜になった）の文法パラメータを分析してください。",
      "Identify the type of Samāsa compound and its Vigraha (split) for 'rājapuruṣaḥ' (king's servant).": "'rājapuruṣaḥ'（王の召使い）のサマーサ（複合語）の種類とそのヴィグラハ（釈義）を特定してください。",
      "Analyze the compounding rules governing the term 'pītāmbaraḥ' (yellow-garmented one / Lord Vishnu).": "語句 'pītāmbaraḥ'（黄色い衣をまとった者 / ヴィシュヌ神）を支配する複合語（サマーサ）の規則を分析してください。",
      "Observe the junction point: the 'a' at the end of 'Deva' and the 'ā' at the start of 'ālayaḥ' fuse into a long 'ā' (Devālayaḥ).": "接合部に注目してください：'Deva' の終わりの 'a' と 'ālayaḥ' の始めの 'ā' が融合して、1つの長音 'ā' (Devālayaḥ) になります。",
      "The ending short 'i' in 'iti' undergoes transition into the semi-vowel 'y' when followed by the dissimilar vowel 'e' in 'evam'.": "『iti』の語尾の短母音『i』は、その後に異なる母音『e』が続くことによって半母音『y』に推移します。",
      "The final Visarga 'ḥ' in 'Namaḥ' encounters the hard consonant 't' of 'te' and becomes a sibilant 's'.": "『Namaḥ』の最後のヴィサルガ『ḥ』が『te』の硬子音『t』と出会い、歯擦音『s』に変化します。",
      "Recall that karmaṇi (action) + eva (alone) + adhikāraḥ (right) + te (your) defines active execution without result dependency.": "『karmaṇi』（行為において）+『eva』（のみ）+『adhikāraḥ』（権利・権能）+『te』（あなたの）が、結果への執着なしに能動的に実行することを定義していることを思い出してください。",
      "The ending vowel 'ā' in 'Mahā' meets the starting vowel 'u' in 'Utsavaḥ' to form the Guṇa vowel 'o'.": "『Mahā』の末尾의 모음『ā』と『Utsavaḥ』の開始母音『u』が出会い、グナ母音『o』を形成します。",
      "The short 'i' at the end of 'Yadi' changes to the semi-vowel 'y' when followed by the dissimilar vowel 'a'.": "『Yadi』の末尾の短母音『i』は、その後に異なる母音『a』が続くことで半母音『y』に変化します。",
      "The vowel 'ā' at the end of 'Tathā' and the diphthong 'e' in 'Eva' combine into the long Vṛddhi vowel 'ai'.": "『Tathā』の末尾の母音『ā』と『Eva』の二重母音『e』が結合して、長母音であるヴリッディ母音『ai』になります。",
      "The tree represents the fixed point/source from which the leaf separates, taking the Ablative case.": "木は、葉がそこから分離する固定点/起点を示し、奪格をとります。",
      "In a passive construction (Karmaṇi Prayoga), the unexpressed agent (Rama) takes the 3rd (Instrumental) case.": "受動態（Karmaṇi Prayoga）では、動作主（ラーマ）は第3格（具格）をとります。",
      "The infix '-iṣya-' denotes the future tense (Lṛṭ Lakāra) and the suffix '-mi' denotes first person (Uttama) singular.": "挿入辞『-iṣya-』は未来時制（Lṛṭ Lakāra）を示し、接尾辞『-mi』は第一人称（Uttama）単数を示します。",
      "The prefix 'a-' and the ending '-t' denote the past tense (Laṅg Lakāra) and third person singular.": "接頭辞『a-』と語尾の『-t』は過去時制（Laṅg Lakāra）と第三人称単数を示します。",
      "The relationship is possessive ('king's servant'), representing the Genitive Tatpuruṣa compound.": "関係は所有格（『王の召使い』）であり、属格タトプルシャ複合語を表します。",
      "The compound refers to a third external entity ('he whose garments are yellow'), indicating Bahuvrīhi.": "この複合語は第3の外部要素（『衣服が黄色い者』）を指し、バフヴリーヒ複合語であることを示します。",
      "Start with the vocative address ('Sañjaya!'), followed by the locations, the subjects ('māmakāḥ pāṇḍavāḥ ca'), and end with the interrogative verb phrase.": "呼格による呼びかけ（『Sañjaya!』）から始め、次に場所、主語（『māmakāḥ pāṇḍavāḥ ca』）、そして疑問動詞句で終わります。",
      "Kanthya": "喉音",
      "Oṣṭhya": "唇音",
      "Talavya": "口蓋音",
      "Dantya": "歯音",
      "Dantyoṣṭhya": "歯唇音",
      "Mūrdhanya": "反舌音",
      "Locative Singular": "処格 (単数)",
      "Nominative Plural": "主格 (複数)"
    },
    hi: {
      "Sandhi & Word-Junctions": "सन्धि और शब्द-जोड़",
      "Karak & Vibhakti Cases": "कारक और विभक्ति",
      "Dhatu-Rupa & Lakara Conjugations": "धातु-रूप और लकार क्रिया रूप",
      "Samasa Compound Formations": "समास और यौगिक रूप",
      "Shloka Anvaya & Prose-Ordering": "श्लोक अन्वय और गद्य-क्रम",
      "Laghu-Guru-Guru-Guru": "लघु-गुरु-गुरु-गुरु",
      "Guru-Laghu-Laghu": "गुरु-लघु-लघु",
      "Laghu-Guru-Laghu": "लघु-गुरु-लघु",
      "Guru-Guru-Laghu-Guru-Laghu-Laghu-Laghu": "गुरु-गुरु-लघु-गुरु-लघु-लघु-लघु",
      "Guru-Guru-Laghu-Guru-Guru-Laghu-Guru": "गुरु-गुरु-लघु-गुरु-गुरु-लघु-गुरु",
      "Laghu-Guru-Guru-Laghu": "लघु-गुरु-गुरु-लघु",
      "Laghu-Laghu-Guru": "लघु-लघु-गुरु",
      "Guru-Laghu-Laghu-Laghu-Guru": "गुरु-लघु-लघु-लघु-गुरु",
      "Guru-Guru-Laghu-Guru": "गुरु-लघु-लघु-लघु-गुरु",
      "Guru-Guru-Guru-Guru-Laghu-Guru-Guru-Guru": "गुरु-गुरु-गुरु-गुरु-लघु-गुरु-गुरु-गुरु",
      "Kanthya, Oṣṭhya, Talavya": "कण्ठ्य, ओष्ठ्य, तालव्य",
      "Talavya, Dantya, Kanthya": "तालव्य, दन्त्य, कण्ठ्य",
      "Dantya, Kanthya, Dantyoṣṭhya": "दन्त्य, कण्ठ्य, दन्त्यौष्ठ्य",
      "Mūrdhanya, Dantya, Kanthya, Oṣṭhya": "मूर्धन्य, दन्त्य, कण्ठ्य, ओष्ठ्य",
      "Kanthya, Dantya, Mūrdhanya, Oṣṭhya": "कण्ठ्य, दन्त्य, मूर्धन्य, ओष्ठ्य",
      "Mūrdhanya, Dantya, Talavya": "मूर्धन्य, दन्त्य, तालव्य",
      "Kanthya, Oṣṭhya, Dantya": "कण्ठ्य, ओष्ठ्य, दन्त्य",
      "Talavya, Oṣṭhya, Mūrdhanya": "तालव्य, ओष्ठ्य, मुख्य",
      "Dantya, Oṣṭhya, Kanthya": "दन्त्य, ओष्ठ्य, कण्ठ्य",
      "Noun Base": "प्रातिपदिक (संज्ञा)",
      "Noun (Base)": "प्रातिपदिक (संज्ञा)",
      "Noun (1st case, Sing.)": "संज्ञा (प्रथमा विभक्ति, एकवचन)",
      "Avyaya (Indeclinable)": "अव्यय",
      "Dative pronoun": "सम्प्रदान सर्वनाम (चतुर्थी)",
      "Locative singular": "सप्तमी विभक्ति, एकवचन",
      "Avyaya (emphasis)": "अव्यय (अवधारण)",
      "Nominative singular": "प्रथमा विभक्ति, एकवचन",
      "Genitive singular": "षष्ठी विभक्ति, एकवचन",
      "Noun": "संज्ञा",
      "Noun Stem": "प्रातिपदिक",
      "Verb/Noun": "क्रिया/संज्ञा",
      "Verb (Tin-anta)": "तिङन्त क्रिया",
      "Upapada/Pūrva-pada": "पूर्वपद",
      "Uttara-pada": "उत्तरपद",
      "preceding member": "पूर्व पद",
      "following member": "उत्तर पद",
      "preceding stem": "पूर्व प्रकृति",
      "following word": "उत्तर पद",
      "subject/agent": "कर्ता",
      "object/action": "कर्म / क्रिया",
      "former compound member": "पूर्व समास पद",
      "latter compound member": "उत्तर समास पद",
      "conjugated form": "क्रिया रूप",
      "in the field of righteousness": "धर्मक्षेत्र में",
      "desiring to fight": "युद्ध की इच्छा रखने वाले",
      "salutations": "नमस्कार / प्रणाम",
      "to you": "तुम्हारे लिए / तुम्हें",
      "in action": "कर्म में",
      "only": "ही",
      "right": "अधिकार",
      "right / claim": "अधिकार / दावा",
      "your": "तुम्हारा",
      "thy / your": "तुम्हारा",
      "God": "देव / भगवान",
      "Abode/Temple": "आलय / मन्दिर",
      "Thus": "इति / इस प्रकार",
      "In this manner": "एवम् / इस प्रकार",
      "Noun/Adjective": "संज्ञा/विशेषण",
      "Noun/Suffix": "संज्ञा/प्रत्यय",
      "Suffix/Noun": "प्रत्यय/संज्ञा",
      "Your right is to action alone, never to its fruits.": "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं।",
      "Renounce action and sit in pure silence.": "कर्म का त्याग करें और शुद्ध मौन में बैठें।",
      "Results are predetermined; action is irrelevant.": "परिणाम पहले से निर्धारित हैं; कर्म अप्रासंगिक है।",
      "All actions are illusion; only knowledge is real.": "सभी कर्म माया हैं; केवल ज्ञान ही सत्य है।",
      "Choose the correct logical prose syntactical alignment (Anvaya) for the first verse of the Bhagavad Gita.": "भगवद्गीता के पहले श्लोक के लिए सही तार्किक गद्य वाक्यविन्यास संरेखण (अन्वय) चुनें।",
      "Identify the Kāraka role and case of 'vṛkṣāt' (from the tree) in this sentence.": "इस वाक्य में 'vṛkṣāt' (वृक्ष से) की कारक भूमिका और विभक्ति की पहचान करें।",
      "What Kāraka or Vibhakti rule governs the use of the word 'rāmeṇa' (by Rama) in this passive sentence?": "इस कर्मवाच्य वाक्य में 'rāmeṇa' (राम के द्वारा) शब्द के प्रयोग को कौन सा कारक या विभक्ति नियम नियंत्रित करता है?",
      "Identify the Dhatu, Lakāra (tense), Puruṣa, and Vacana of the verb form 'paṭhiṣyāmi'.": "क्रिया रूप 'paṭhiṣyāmi' के धातु, लकार, पुरुष और वचन की पहचान करें।",
      "Analyze the grammatical parameters of the verb 'abhavat' (became).": "क्रिया 'abhavat' (हुआ/बन गया) के व्याकरणिक मापदंडों का विश्लेषण करें।",
      "Identify the type of Samāsa compound and its Vigraha (split) for 'rājapuruṣaḥ' (king's servant).": "'rājapuruṣaḥ' (राजा का पुरुष) के लिए समास के प्रकार और उसके विग्रह की पहचान करें।",
      "Analyze the compounding rules governing the term 'pītāmbaraḥ' (yellow-garmented one / Lord Vishnu).": "पीताम्बरः' (पीले वस्त्र धारण करने वाला / भगवान विष्णु) शब्द को नियंत्रित करने वाले समास नियमों का विश्लेषण करें।",
      "Observe the junction point: the 'a' at the end of 'Deva' and the 'ā' at the start of 'ālayaḥ' fuse into a long 'ā' (Devālayaḥ).": "संधि बिंदु पर ध्यान दें: 'Deva' के अंत का 'a' और 'ālayaḥ' के प्रारंभ का 'ā' मिलकर एक दीर्घ 'ā' (Devālayaḥ) में विलीन हो जाते हैं।",
      "The ending short 'i' in 'iti' undergoes transition into the semi-vowel 'y' when followed by the dissimilar vowel 'e' in 'evam'.": "'iti' के अंत का लघु 'i' इसके बाद आने वाले भिन्न स्वर 'e' के कारण अर्ध-स्वर 'y' में परिवर्तित हो जाता है।",
      "The final Visarga 'ḥ' in 'Namaḥ' encounters the hard consonant 't' of 'te' and becomes a sibilant 's'.": "'Namaḥ' का अंतिम विसर्ग 'ḥ' 'te' के कठोर व्यंजन 't' से मिलकर सकार 's' बन जाता है।",
      "Recall that karmaṇi (action) + eva (alone) + adhikāraḥ (right) + te (your) defines active execution without result dependency.": "याद करें कि karmaṇi (कर्म में) + eva (ही) + adhikāraḥ (अधिकार) + te (तुम्हारा) बिना परिणाम की चिंता के सक्रिय कर्तव्य पालन को परिभाषित करता है।",
      "The ending vowel 'ā' in 'Mahā' meets the starting vowel 'u' in 'Utsavaḥ' to form the Guṇa vowel 'o'.": "'Mahā' के अंत का स्वर 'ā' और 'Utsavaḥ' का प्रारंभिक स्वर 'u' मिलकर गुण स्वर 'o' बनाते हैं।",
      "The short 'i' at the end of 'Yadi' changes to the semi-vowel 'y' when followed by the dissimilar vowel 'a'.": "'Yadi' के अंत का लघु 'i' इसके बाद आने वाले भिन्न स्वर 'a' के कारण अर्ध-स्वर 'y' में बदल जाता है।",
      "The vowel 'ā' at the end of 'Tathā' and the diphthong 'e' in 'Eva' combine into the long Vṛddhi vowel 'ai'.": "'Tathā' के अंत का स्वर 'ā' और 'Eva' का द्विस्वर 'e' मिलकर दीर्घ वृद्धि स्वर 'ai' बनाते हैं।",
      "The tree represents the fixed point/source from which the leaf separates, taking the Ablative case.": "वृक्ष वह निश्चित बिंदु/स्रोत है जिससे पत्ता अलग होता है, इसलिए इसमें अपादान (पंचमी विभक्ति) होती है।",
      "In a passive construction (Karmaṇi Prayoga), the unexpressed agent (Rama) takes the 3rd (Instrumental) case.": "कर्मवाच्य वाक्य (कर्मणि प्रयोग) में, अनकहा कर्ता (राम) तृतीया विभक्ति लेता है।",
      "The infix '-iṣya-' denotes the future tense (Lṛṭ Lakāra) and the suffix '-mi' denotes first person (Uttama) singular.": "प्रत्यय '-iṣya-' को दर्शाता है और प्रत्यय '-mi' उत्तम पुरुष एकवचन को दर्शाता है।",
      "The prefix 'a-' and the ending '-t' denote the past tense (Laṅg Lakāra) and third person singular.": "उपसर्ग 'a-' और अंत का '-t' भूत काल (लङ् लकार) और प्रथम पुरुष एकवचन को दर्शाते हैं।",
      "The relationship is possessive ('king's servant'), representing the Genitive Tatpuruṣa compound.": "संबंध स्वत्वबोधक ('राजा का पुरुष') है, जो षष्ठी तत्पुरुष समास को दर्शाता है।",
      "The compound refers to a third external entity ('he whose garments are yellow'), indicating Bahuvrīhi.": "यौगिक शब्द किसी तीसरे बाहरी अस्तित्व ('वह जिसके वस्त्र पीले हैं') की ओर संकेत करता है, जो बहुव्रीहि समास को दर्शाता है।",
      "Start with the vocative address ('Sañjaya!'), followed by the locations, the subjects ('māmakāḥ pāṇḍavāḥ ca'), and end with the interrogative verb phrase.": "सम्बोधन ('संजय!') से शुरू करें, उसके बाद स्थान, कर्ता ('मामकाः पाण्डवाः च एव') और अंत में प्रश्नवाचक क्रिया वाक्यांश।",
      "Kanthya": "कण्ठ्य",
      "Oṣṭhya": "ओष्ठ्य",
      "Talavya": "तालव्य",
      "Dantya": "दन्त्य",
      "Dantyoṣṭhya": "दन्त्यौष्ठ्य",
      "Mūrdhanya": "मूर्धन्य",
      "Locative Singular": "सप्तमी विभक्ति, एकवचन",
      "Nominative Plural": "प्रथमा विभक्ति, बहुवचन"
    },
    es: {
      "Sandhi & Word-Junctions": "Sandhi y uniones de palabras",
      "Karak & Vibhakti Cases": "Casos Karak y Vibhakti",
      "Dhatu-Rupa & Lakara Conjugations": "Conjugaciones Dhatu-Rupa y Lakara",
      "Samasa Compound Formations": "Formaciones de compuestos Samasa",
      "Shloka Anvaya & Prose-Ordering": "Shloka Anvaya y orden de prosa",
      "Laghu-Guru-Guru-Guru": "Laghu-Guru-Guru-Guru",
      "Guru-Laghu-Laghu": "Guru-Laghu-Laghu",
      "Laghu-Guru-Laghu": "Laghu-Guru-Laghu",
      "Kanthya, Oṣṭhya, Talavya": "Kanthya, Osthya, Talavya",
      "Noun Base": "Base del sustantivo",
      "Noun (Base)": "Base del sustantivo",
      "Noun (1st case, Sing.)": "Sustantivo (1.er caso, Sing.)",
      "Avyaya (Indeclinable)": "Avyaya (Indeclinable)",
      "Dative pronoun": "Pronombre dativo",
      "Locative singular": "Locativo singular",
      "Avyaya (emphasis)": "Avyaya (énfasis)",
      "Nominative singular": "Nominativo singular",
      "Genitive singular": "Genitivo singular",
      "Your right is to action alone, never to its fruits.": "Tu derecho es solo a la acción, nunca a sus frutos.",
      "Renounce action and sit in pure silence.": "Renuncia a la acción y siéntate en puro silencio.",
      "Results are predetermined; action is irrelevant.": "Los resultados están predeterminados; la acción es irrelevante.",
      "All actions are illusion; only knowledge is real.": "Todas las acciones son una ilusión; solo el conocimiento es real.",
      "Identify the Kāraka role and case of 'vṛkṣāt' (from the tree) in this sentence.": "Identifique la función Kāraka y el caso de 'vṛkṣāt' (del árbol) en esta oración.",
      "What Kāraka or Vibhakti rule governs the use of the word 'rāmeṇa' (by Rama) in this passive sentence?": "¿Qué regla de Kāraka o Vibhakti rige el uso de la palabra 'rāmeṇa' (por Rama) en esta oración pasiva?",
      "Identify the Dhatu, Lakāra (tense), Puruṣa, and Vacana of the verb form 'paṭhiṣyāmi'.": "Identifique el Dhatu, Lakāra (tiempo), Puruṣa y Vacana de la forma verbal 'paṭhiṣyāmi'.",
      "Analyze the grammatical parameters of the verb 'abhavat' (became).": "Analice los parámetros gramaticales del verbo 'abhavat' (llegó a ser).",
      "Identify the type of Samāsa compound and its Vigraha (split) for 'rājapuruṣaḥ' (king's servant).": "Identifique el tipo de compuesto Samāsa y su Vigraha (división) para 'rājapuruṣaḥ' (sirviente del rey).",
      "Analyze the compounding rules governing the term 'pītāmbaraḥ' (yellow-garmented one / Lord Vishnu).": "Analice las reglas de composición que rigen el término 'pītāmbaraḥ' (el de vestiduras amarillas / Señor Vishnu).",
      "Choose the correct logical prose syntactical alignment (Anvaya) for the first verse of the Bhagavad Gita.": "Elija la alineación sintáctica de prosa lógica correcta (Anvaya) para el primer verso del Gita.",
      "Observe the junction point: the 'a' at the end of 'Deva' and the 'ā' at the start of 'ālayaḥ' fuse into a long 'ā' (Devālayaḥ).": "Observe el punto de unión: la 'a' al final de 'Deva' y la 'ā' al comienzo de 'ālayaḥ' se fusionan en una 'ā' larga (Devālayaḥ).",
      "The ending short 'i' in 'iti' undergoes transition into the semi-vowel 'y' when followed by the dissimilar vowel 'e' in 'evam'.": "La 'i' corta final en 'iti' experimenta una transición a la semivocal 'y' cuando es seguida por la vocal diferente 'e' en 'evam'.",
      "The final Visarga 'ḥ' in 'Namaḥ' encounters the hard consonant 't' of 'te' and becomes a sibilant 's'.": "La Visarga 'ḥ' final en 'Namaḥ' se encuentra con la consonante fuerte 't' de 'te' y se convierte en una sibilante 's'.",
      "Recall that karmaṇi (action) + eva (alone) + adhikāraḥ (right) + te (your) defines active execution without result dependency.": "Recuerde que karmaṇi (acción) + eva (solo) + adhikāraḥ (derecho) + te (tu) define la ejecución activa sin dependencia del resultado.",
      "The ending vowel 'ā' in 'Mahā' meets the starting vowel 'u' in 'Utsavaḥ' to form the Guṇa vowel 'o'.": "El vocal final 'ā' en 'Mahā' se encuentra con el vocal inicial 'u' en 'Utsavaḥ' para formar el vocal Guṇa 'o'.",
      "The short 'i' at the end of 'Yadi' changes to the semi-vowel 'y' when followed by the dissimilar vowel 'a'.": "La 'i' corta al final de 'Yadi' cambia a la semivocal 'y' cuando es seguida por la vocal diferente 'a'.",
      "The vowel 'ā' at the end of 'Tathā' and the diphchong 'e' in 'Eva' combine into the long Vṛddhi vowel 'ai'.": "El vocal 'ā' al final de 'Tathā' y el diptongo 'e' en 'Eva' se combinan en el vocal largo Vṛddhi 'ai'.",
      "The tree represents the fixed point/source from which the leaf separates, taking the Ablative case.": "El árbol representa el punto fijo/fuente del cual la hoja se separa, tomando el caso ablativo.",
      "In a passive construction (Karmaṇi Prayoga), the unexpressed agent (Rama) takes the 3rd (Instrumental) case.": "En una construcción pasiva (Karmaṇi Prayoga), el agente no expresado (Rama) toma el tercer caso (instrumental).",
      "The infix '-iṣya-' denotes the future tense (Lṛṭ Lakāra) and the suffix '-mi' denotes first person (Uttama) singular.": "El infijo '-iṣya-' denota el tiempo futuro (Lṛṭ Lakāra) y el sufijo '-mi' denota la primera persona (Uttama) singular.",
      "The prefix 'a-' and the ending '-t' denote the past tense (Laṅg Lakāra) and third person singular.": "El prefijo 'a-' y la terminación '-t' denotan el tiempo pasado (Laṅg Lakāra) y la tercera persona singular.",
      "The relationship is possessive ('king's servant'), representing the Genitive Tatpuruṣa compound.": "La relación es posesiva ('sirviente del rey'), representando el compuesto Genitivo Tatpuruṣa.",
      "The compound refers to a third external entity ('he whose garments are yellow'), indicating Bahuvrīhi.": "El compuesto se refiere a una tercera entidad externa ('aquel cuyas vestiduras son amarillas'), lo que indica Bahuvrīhi.",
      "Start with the vocative address ('Sañjaya!'), followed by the locations, the subjects ('māmakāḥ pāṇḍavāḥ ca'), and end with the interrogative verb phrase.": "Comience con la dirección vocativa ('¡Sañjaya!'), seguida por los lugares, los sujetos ('māmakāḥ pāṇḍavāḥ ca') y termine con la frase verbal interrogativa.",
      "in the field of righteousness": "en el campo de la rectitud",
      "desiring to fight": "deseando luchar",
      "salutations": "salutaciones",
      "to you": "a ti",
      "in action": "en la acción",
      "only": "solo",
      "right": "derecho / deber",
      "right / claim": "derecho / reclamo",
      "your": "tu",
      "thy / your": "tu",
      "God": "Dios",
      "Abode/Temple": "Morada/Templo",
      "Thus": "Así",
      "In this manner": "De esta manera",
      "Noun/Adjective": "Sustantivo/Adjetivo",
      "Noun/Suffix": "Sustantivo/Sufijo",
      "Suffix/Noun": "Sufijo/Sustantivo",
      "preceding member": "miembro precedente",
      "following member": "miembro siguiente",
      "preceding stem": "raíz precedente",
      "following word": "palabra siguiente",
      "subject/agent": "sujeto/agente",
      "object/action": "objeto/acción",
      "former compound member": "primer miembro del compuesto",
      "latter compound member": "segundo miembro del compuesto",
      "conjugated form": "forma conjugada",
      "Locative Singular": "Locativo singular",
      "Nominative Plural": "Nominativo plural",
      "Noun": "Sustantivo",
      "Noun Stem": "Stem del sustantivo",
      "Verb/Noun": "Verbo/Sustantivo",
      "Verb (Tin-anta)": "Verbo (Tin-anta)",
      "Upapada/Pūrva-pada": "Upapada/Pūrva-pada",
      "Uttara-pada": "Uttara-pada",
      "Kanthya": "Kanthya",
      "Oṣṭhya": "Osthya",
      "Talavya": "Talavya",
      "Dantya": "Dantya",
      "Dantyoṣṭhya": "Dantyoṣṭhya",
      "Mūrdhanya": "Mūrdhanya"
    }
  };

  const localizedText = dict[lang]?.[text];
  if (localizedText) return localizedText;

  let newText = text;
  
  const categories: Record<string, Record<string, string>> = {
    ja: {
      "Dīrgha Sandhi": "長音化連声",
      "Yaṇ Sandhi": "半母音化連声 (ヤン)",
      "Guṇa Sandhi": "グナ連声",
      "Vṛddhi Sandhi": "ヴリッディ連声",
      "Ayādi Sandhi": "アヤーディ連声",
      "Vyañjana Sandhi": "子音連声",
      "Visarga Sandhi": "ヴィサルガ連声",
      "Kāraka": "カーラカ (格関係)",
      "Vibhakti": "ヴィバクティ (格変化)",
      "Sañjñā": "サニャニャ (定義規則)",
      "Paribhāṣā": "パリバーシャー (解釈規則)",
      "Vibhāṣā": "随意規則",
      "Apavāda": "例外規則"
    },
    hi: {
      "Dīrgha Sandhi": "दीर्घ संधि",
      "Yaṇ Sandhi": "यण् संधि",
      "Guṇa Sandhi": "गुण संधि",
      "Vṛddhi Sandhi": "वृद्धि संधि",
      "Ayādi Sandhi": "अयादि संधि",
      "Vyañjana Sandhi": "व्यंजन संधि",
      "Visarga Sandhi": "विसर्ग संधि",
      "Kāraka": "कारक",
      "Vibhakti": "विभक्ति",
      "Sañjñā": "संज्ञा",
      "Paribhāṣā": "परिभाषा",
      "Vibhāṣā": "विभाषा",
      "Apavāda": "अपवाद"
    },
    es: {
      "Dīrgha Sandhi": "Dīrgha Sandhi",
      "Yaṇ Sandhi": "Yaṇ Sandhi",
      "Guṇa Sandhi": "Guṇa Sandhi",
      "Vṛddhi Sandhi": "Vṛddhi Sandhi",
      "Ayādi Sandhi": "Ayādi Sandhi",
      "Vyañjana Sandhi": "Vyañjana Sandhi",
      "Visarga Sandhi": "Visarga Sandhi",
      "Kāraka": "Kāraka",
      "Vibhakti": "Vibhakti"
    }
  };

  const catMap = categories[lang];
  if (catMap) {
    for (const [eng, loc] of Object.entries(catMap)) {
      newText = newText.replace(new RegExp(`\\b${eng}\\b`, "g"), loc);
    }
  }

  if (lang === "ja") {
    newText = newText
      .replace("Under NCERT guidelines, which components combine to form the term \"", "NCERTのガイドラインに従って、どの構成要素が結合して次の語句を形成しますか：「")
      .replace(/"\?/g, "」")
      .replace("Identify the rule governing the phonetic transition in the split \"", "次の分割における音韻推移を支配する規則を特定してください：「")
      .replace("Analyze the grammatical formula \"", "次の文法公式を分析してください：「")
      .replace("\" and identify its correct application.", "」そしてその正しい適用を選択してください。")
      .replace("Dhatu: Paṭh, Lṛṭ Lakāra (Future), Uttama Puruṣa, Ekavacana", "語根: Paṭh, Lṛṭ Lakāra (未来), Uttama Puruṣa, 単数")
      .replace("Dhatu: Paṭh, Laṭ Lakāra (Present), Prathama Puruṣa, Dvivacana", "語根: Paṭh, Laṭ Lakāra (現在), Prathama Puruṣa, 二数")
      .replace("Dhatu: Paṭh, Laṅg Lakāra (Past), Madhyama Puruṣa, Plural", "語根: Paṭh, Laṅg Lakāra (過去), Madhyama Puruṣa, 複数")
      .replace("Dhatu: Paṭh, Loṭ Lakāra (Imperative), Uttama Puruṣa, Singular", "語根: Paṭh, Loṭ Lakāra (命令形), Uttama Puruṣa, 単数")
      .replace("Dhatu: Bhū, Laṭ Lakāra (Present), Prathama Puruṣa, Plural", "語根: Bhū, Laṭ Lakāra (現在), Prathama Puruṣa, 複数")
      .replace("Dhatu: Bhū, Laṅg Lakāra (Past), Prathama Puruṣa, Ekavacana", "語根: Bhū, Laṅg Lakāra (過去), Prathama Puruṣa, 単数")
      .replace("Dhatu: Bhū, Vidhiliṅg Lakāra (Potential), Madhyama Puruṣa, Singular", "語根: Bhū, Vidhiliṅg Lakāra (可能), Madhyama Puruṣa, 単数")
      .replace("Dhatu: Bhash, Lṛṭ Lakāra (Future), Uttama Puruṣa, Singular", "語根: Bhāṣ, Lṛṭ Lakāra (未来), Uttama Puruṣa, 単数")
      .replace("Apādāna Kāraka (Ablative / Pañcamī Vibhakti)", "アパーダーナ・カーラカ (奪格 / 第5格)")
      .replace("Karaṇa Kāraka (Instrumental / Tṛtīyā Vibhakti)", "カラーナ・カーラカ (具格 / 第3格)")
      .replace("Karma Kāraka (Accusative / Dvitīyā Vibhakti)", "カルマ・カーラカ (対格 / 第2格)")
      .replace("Adhikaraṇa Kāraka (Locative / Saptamī Vibhakti)", "アディカラナ・カーラカ (処格 / 第7格)")
      .replace("Karmaṇi Dvitīyā (Accusative Case)", "カルマニ・ドゥヴィティヤー (対格 / 第2格)")
      .replace("Kartṛ-karaṇayos Tṛtīyā (Instrumental Agent)", "カルトゥリ・カラーナヨース・トリティヤー (具格の動作者・手段)")
      .replace("Dvitīyā Śrita-atīta (Compound Accusative)", "ドゥヴィティヤー・シュリタ・アティータ (複合対格)")
      .replace("Caturthī Sampradāne (Dative Case)", "チャトゥルティー・サンプラダーネ (与格 / 第4格)")
      .replace("Ṣaṣṭhī Tatpuruṣa Samāsa (Vigraha: Rājñaḥ puruṣaḥ)", "シャシュティー・タトプルシャ・サマーサ (属格限定複合語, Vigraha: Rājñaḥ puruṣaḥ)")
      .replace("Itaretara Dvandva Samāsa (Vigraha: Rājā ca puruṣaḥ ca)", "イタレータラ・ドゥヴァンドヴァ・サマーサ (相互接続複合語, Vigraha: Rājā ca puruṣaḥ ca)")
      .replace("Bahuvrīhi Samāsa (Vigraha: Rājā puruṣaḥ yasya saḥ)", "バフヴリーヒ・サマーサ (所有複合語, Vigraha: Rājā puruṣaḥ yasya saḥ)")
      .replace("Avyayībhāva Samāsa (Vigraha: Puruṣam anu rājā)", "アヴィヤイーブハーヴァ・サマーサ (前置詞・副詞的複合語, Vigraha: Puruṣam anu rājā)")
      .replace("Dvandva Samāsa (Vigraha: Pītaṁ ca ambaraṁ ca)", "ドゥヴァンドヴァ・サマーサ (並列複合語, Vigraha: Pītaṁ ca ambaraṁ ca)")
      .replace("Tatpuruṣa Samāsa (Vigraha: Pītasya ambaraḥ)", "タトプルシャ・サマーサ (限定複合語, Vigraha: Pītasya ambaraḥ)")
      .replace("Bahuvrīhi Samāsa (Vigraha: Pītāni ambarāṇi yasya saḥ)", "バフヴリーヒ・サマーサ (所有複合語, Vigraha: Pītāni ambarāṇi yasya saḥ)")
      .replace("Karmadhāraya Samāsa (Vigraha: Pītam ambaram)", "カルマダーラヤ・サマーサ (同格限定複合語, Vigraha: Pītam ambaram)");
  } else if (lang === "hi") {
    newText = newText
      .replace("Under NCERT guidelines, which components combine to form the term \"", "एनसीईआरटी दिशानिर्देशों के तहत, कौन से घटक मिलकर इस शब्द का निर्माण करते हैं: \"")
      .replace(/"\?/g, "\"?")
      .replace("Identify the rule governing the phonetic transition in the split \"", "इस संधि विच्छेद में ध्वनि संक्रमण को नियंत्रित करने वाले नियम की पहचान करें: \"")
      .replace("Analyze the grammatical formula \"", "व्याकरण सूत्र का विश्लेषण करें: \"")
      .replace("\" and identify its correct application.", "\" और इसके सही अनुप्रयोग की पहचान करें।")
      .replace("Dhatu: Paṭh, Lṛṭ Lakāra (Future), Uttama Puruṣa, Ekavacana", "धातु: पठ्, लृट् लकार (भविष्य काल), उत्तम पुरुष, एकवचन")
      .replace("Dhatu: Paṭh, Laṭ Lakāra (Present), Prathama Puruṣa, Dvivacana", "धातु: पठ्, लट् लकार (वर्तमान काल), प्रथम पुरुष, द्विवचन")
      .replace("Dhatu: Paṭh, Laṅg Lakāra (Past), Madhyama Puruṣa, Plural", "धातु: पठ्, लङ् लकार (भूत काल), मध्यम पुरुष, बहुवचन")
      .replace("Dhatu: Paṭh, Loṭ Lakāra (Imperative), Uttama Puruṣa, Singular", "धातु: पठ्, लोट् लकार (आज्ञार्थक), उत्तम पुरुष, एकवचन")
      .replace("Dhatu: Bhū, Laṭ Lakāra (Present), Prathama Puruṣa, Plural", "धातु: भू, लट् लकार (वर्तमान काल), प्रथम पुरुष, बहुवचन")
      .replace("Dhatu: Bhū, Laṅg Lakāra (Past), Prathama Puruṣa, Ekavacana", "धातु: भू, लङ् लकार (भूत काल), प्रथम पुरुष, एकवचन")
      .replace("Dhatu: Bhū, Vidhiliṅg Lakāra (Potential), Madhyama Puruṣa, Singular", "धातु: भू, विधिलिङ् लकार, मध्यम पुरुष, एकवचन")
      .replace("Dhatu: Bhash, Lṛṭ Lakāra (Future), Uttama Puruṣa, Singular", "धातु: भाष्, लृट् लकार (भविष्य काल), उत्तम पुरुष, एकवचन")
      .replace("Apādāna Kāraka (Ablative / Pañcamī Vibhakti)", "अपादान कारक (पंचमी विभक्ति)")
      .replace("Karaṇa Kāraka (Instrumental / Tṛtīyā Vibhakti)", "करण कारक (तृतीया विभक्ति)")
      .replace("Karma Kāraka (Accusative / Dvitīyā Vibhakti)", "कर्म कारक (द्वितीया विभक्ति)")
      .replace("Adhikaraṇa Kāraka (Locative / Saptamī Vibhakti)", "अधिकरण कारक (सप्तमी विभक्ति)")
      .replace("Karmaṇi Dvitīyā (Accusative Case)", "कर्मणि द्वितीया (कर्म कारक, द्वितीय विभक्ति)")
      .replace("Kartṛ-karaṇayos Tṛtīyā (Instrumental Agent)", "कर्तृकरणयोस्तृतीया (करण कारक, तृतीय विभक्ति)")
      .replace("Dvitīyā Śrita-atīta (Compound Accusative)", "द्वितीया श्रितातीत (द्वितीया तत्पुरुष समास)")
      .replace("Caturthī Sampradāne (Dative Case)", "चतुर्थी सम्प्रदाने (सम्प्रदान कारक, चतुर्थी विभक्ति)")
      .replace("Ṣaṣṭhī Tatpuruṣa Samāsa (Vigraha: Rājñaḥ puruṣaḥ)", "षष्ठी तत्पुरुष समास (विग्रह: राज्ञः पुरुषः)")
      .replace("Itaretara Dvandva Samāsa (Vigraha: Rājā ca puruṣaḥ ca)", "इतरेतर द्वंद्व समास (विग्रह: राजा च पुरुषः च)")
      .replace("Bahuvrīhi Samāsa (Vigraha: Rājā puruṣaḥ yasya saḥ)", "बहुव्रीहि समास (विग्रह: राजा पुरुषः यस्य सः)")
      .replace("Avyayībhāva Samāsa (Vigraha: Puruṣam anu rājā)", "अव्ययीभाव समास (विग्रह: पुरुषम् अनु राजा)")
      .replace("Dvandva Samāsa (Vigraha: Pītaṁ ca ambaraṁ ca)", "द्वंद्व समास (विग्रह: पीतं च अम्बरं च)")
      .replace("Tatpuruṣa Samāsa (Vigraha: Pītasya ambaraḥ)", "तत्पुरुष समास (विग्रह: पीतस्य अम्बरः)")
      .replace("Bahuvrīhi Samāsa (Vigraha: Pītāni ambarāṇi yasya saḥ)", "बहुव्रीहि समास (विग्रह: पीतानि अम्बराणि यस्य सः)")
      .replace("Karmadhāraya Samāsa (Vigraha: Pītam ambaram)", "कर्मधारय समास (विग्रह: पीतम् अम्बरम्)");
  } else if (lang === "es") {
    newText = newText
      .replace("Under NCERT guidelines, which components combine to form the term \"", "Según las directrices de NCERT, ¿qué componentes se combinan para formar el término \"")
      .replace(/"\?/g, "\"?")
      .replace("Identify the rule governing the phonetic transition in the split \"", "Identifique la regla que rige la transición fonética en la división \"")
      .replace("Analyze the grammatical formula \"", "Analice la fórmula gramatical \"")
      .replace("\" and identify its correct application.", "\" e identifique su aplicación correcta.")
      .replace("Dhatu: Paṭh, Lṛṭ Lakāra (Future), Uttama Puruṣa, Ekavacana", "Dhatu: Paṭh, Lṛṭ Lakāra (Futuro), Uttama Puruṣa, Ekavacana")
      .replace("Dhatu: Paṭh, Laṭ Lakāra (Present), Prathama Puruṣa, Dvivacana", "Dhatu: Paṭh, Laṭ Lakāra (Presente), Prathama Puruṣa, Dvivacana")
      .replace("Dhatu: Paṭh, Laṅg Lakāra (Past), Madhyama Puruṣa, Plural", "Dhatu: Paṭh, Laṅg Lakāra (Pasado), Madhyama Puruṣa, Plural")
      .replace("Dhatu: Paṭh, Loṭ Lakāra (Imperative), Uttama Puruṣa, Singular", "Dhatu: Paṭh, Loṭ Lakāra (Imperativo), Uttama Puruṣa, Singular")
      .replace("Dhatu: Bhū, Laṭ Lakāra (Present), Prathama Puruṣa, Plural", "Dhatu: Bhū, Laṭ Lakāra (Presente), Prathama Puruṣa, Plural")
      .replace("Dhatu: Bhū, Laṅg Lakāra (Past), Prathama Puruṣa, Ekavacana", "Dhatu: Bhū, Laṅg Lakāra (Pasado), Prathama Puruṣa, Ekavacana")
      .replace("Dhatu: Bhū, Vidhiliṅg Lakāra (Potential), Madhyama Puruṣa, Singular", "Dhatu: Bhū, Vidhiliṅg Lakāra (Potencial), Madhyama Puruṣa, Singular")
      .replace("Dhatu: Bhash, Lṛṭ Lakāra (Future), Uttama Puruṣa, Singular", "Dhatu: Bhāṣ, Lṛṭ Lakāra (Futuro), Uttama Puruṣa, Singular")
      .replace("Apādāna Kāraka (Ablative / Pañcamī Vibhakti)", "Apādāna Kāraka (Ablativo / Pañcamī Vibhakti)")
      .replace("Karaṇa Kāraka (Instrumental / Tṛtīyā Vibhakti)", "Karaṇa Kāraka (Instrumental / Tṛtīyā Vibhakti)")
      .replace("Karma Kāraka (Accusative / Dvitīyā Vibhakti)", "Karma Kāraka (Acusativo / Dvitīyā Vibhakti)")
      .replace("Adhikaraṇa Kāraka (Locative / Saptamī Vibhakti)", "Adhikaraṇa Kāraka (Locativo / Saptamī Vibhakti)")
      .replace("Karmaṇi Dvitīyā (Accusative Case)", "Karmaṇi Dvitīyā (Caso Acusativo)")
      .replace("Kartṛ-karaṇayos Tṛtīyā (Instrumental Agent)", "Kartṛ-karaṇayos Tṛtīyā (Agente Instrumental)")
      .replace("Dvitīyā Śrita-atīta (Compound Accusative)", "Dvitīyā Śrita-atīta (Acusativo Compuesto)")
      .replace("Caturthī Sampradāne (Dative Case)", "Caturthī Sampradāne (Caso Dativo)")
      .replace("Ṣaṣṭhī Tatpuruṣa Samāsa (Vigraha: Rājñaḥ puruṣaḥ)", "Ṣaṣṭhī Tatpuruṣa Samāsa (Vigraha: Rājñaḥ puruṣaḥ)")
      .replace("Itaretara Dvandva Samāsa (Vigraha: Rājā ca puruṣaḥ ca)", "Itaretara Dvandva Samāsa (Vigraha: Rājā ca puruṣaḥ ca)")
      .replace("Bahuvrīhi Samāsa (Vigraha: Rājā puruṣaḥ yasya saḥ)", "Bahuvrīhi Samāsa (Vigraha: Rājā puruṣaḥ yasya saḥ)")
      .replace("Avyayībhāva Samāsa (Vigraha: Puruṣam anu rājā)", "Avyayībhāva Samāsa (Vigraha: Puruṣam anu rājā)")
      .replace("Dvandva Samāsa (Vigraha: Pītaṁ ca ambaraṁ ca)", "Dvandva Samāsa (Vigraha: Pītaṁ ca ambaraṁ ca)")
      .replace("Tatpuruṣa Samāsa (Vigraha: Pītasya ambaraḥ)", "Tatpuruṣa Samāsa (Vigraha: Pītasya ambaraḥ)")
      .replace("Bahuvrīhi Samāsa (Vigraha: Pītāni ambarāṇi yasya saḥ)", "Bahuvrīhi Samāsa (Vigraha: Pītāni ambarāṇi yasya saḥ)")
      .replace("Karmadhāraya Samāsa (Vigraha: Pītam ambaram)", "Karmadhāraya Samāsa (Vigraha: Pītam ambaram)");
  }

  // Handle pronunciation acoustics locations by splitting them
  if (text.includes(",") && (text.includes("Kanthya") || text.includes("Oṣṭhya") || text.includes("Talavya") || text.includes("Dantya") || text.includes("Mūrdhanya"))) {
    const parts = text.split(",").map(p => p.trim());
    const localizedParts = parts.map(p => localizeText(p, lang));
    const separator = lang === "ja" ? "、" : ", ";
    return localizedParts.join(separator);
  }

  return newText;
}

interface DisplayOption {
  text: string;
  originalIndex: number;
  label: string; // 'A', 'B', 'C', 'D'
}

interface PracticeCardProps {
  id: string;
  phrase: string; // Default Devanagari
  transliterations: {
    devanagari: string;
    iast: string;
    japanese: string;
    french: string;
  };
  wordByWord: { sanskrit: string; english: string; role: string }[];
  grammaticalRule: string;
  sourceAttribution: string; // e.g. Ashtadhyayi 6.1.77 or Gita 2.47
  options: string[]; // 4 options
  correctIndex: number;
  hint: string;
  
  // Concept and Telemetry Data
  chapterId?: number;
  activeLang?: string;
  onNextQuestion?: () => void;
  hasNextQuestion?: boolean;
  isCompleted?: boolean;
  
  conceptType: string;
  paninianHeritage: string;
  sourceAttributionTelemetry: string;
  pronunciationAcoustics: {
    akshara: string;
    matra: string;
    uchcharana: string;
  };
}

export default function PracticeCard({
  id,
  phrase,
  transliterations,
  wordByWord,
  grammaticalRule,
  sourceAttribution,
  options,
  correctIndex,
  hint,
  chapterId = 1,
  activeLang = "en",
  onNextQuestion,
  hasNextQuestion = false,
  isCompleted = false,
  conceptType,
  paninianHeritage,
  sourceAttributionTelemetry,
  pronunciationAcoustics
}: PracticeCardProps) {
  const t = getTranslation(activeLang);
  const [activeScript, setActiveScript] = useState("iast");
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealStep, setRevealStep] = useState(0); // 0: Question, 1: Meaning, 2: Grammar
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  
  // Shuffled display options state
  const [shuffledOptions, setShuffledOptions] = useState<DisplayOption[]>([]);

  useEffect(() => {
    // Read script on mount
    const saved = localStorage.getItem("transliteration_target");
    if (saved) setActiveScript(saved);

    // Listen to changes from LanguageSelector
    const handleScriptChange = () => {
      const current = localStorage.getItem("transliteration_target") || "iast";
      setActiveScript(current);
    };

    window.addEventListener("transliterationChange", handleScriptChange);
    return () => window.removeEventListener("transliterationChange", handleScriptChange);
  }, []);

  // Fisher-Yates Shuffle Variant upon mounting or question ID change
  useEffect(() => {
    const originalOptions = [...options];
    const mapped: DisplayOption[] = originalOptions.map((opt, idx) => ({
      text: opt,
      originalIndex: idx,
      label: ""
    }));

    // Immutable Fisher-Yates Shuffling algorithm
    const shuffleArray = (arr: DisplayOption[]) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    const shuffled = shuffleArray(mapped);
    const labels = ["A", "B", "C", "D"];
    const labeled = shuffled.map((item, idx) => ({
      ...item,
      label: labels[idx]
    }));

    setShuffledOptions(labeled);
    setSelectedOption(null);
    setFeedback(isCompleted ? "correct" : null);
    setShowHint(false);
    setRevealStep(0);
  }, [id, isCompleted, options]);

  const getActiveText = () => {
    switch (activeScript) {
      case "devanagari":
        return transliterations.devanagari;
      case "japanese":
        return transliterations.japanese;
      case "french":
        return transliterations.french;
      case "iast":
      default:
        return transliterations.iast;
    }
  };

  // Hybrid Pronunciation Engine - Pre-recorded systematic files with Web Speech Fallback
  const handlePlayAudio = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    const questionIndexId = id.split("-").pop() || "0";
    const audioUrl = `/audio/dev/ch${chapterId}_q${questionIndexId}.mp3`;
    const audio = new Audio(audioUrl);

    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      // Fallback vector: speech synthesis wrapping Indian Accent localizations (hi-IN or sa-IN)
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(phrase);
        
        // Target Indian/Sanskrit accent locales specifically
        utterance.lang = "sa-IN"; 
        utterance.rate = 0.65; // Slow deliberate pronunciation
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => {
          // Absolute fallback if synthesis fails
          setIsPlaying(true);
          setTimeout(() => setIsPlaying(false), 1500);
        };

        window.speechSynthesis.speak(utterance);
      } else {
        // Absolute fallback simulation
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 1500);
      }
    };

    audio.play().catch(() => {
      // Catch autoplay restrictions and trigger fallback chain immediately
      audio.onerror!(new Event("error"));
    });
  };

  const handleOptionSelect = (shuffledIndex: number, originalIndex: number) => {
    if (feedback === "correct" || isCompleted) return;

    setSelectedOption(shuffledIndex);

    if (originalIndex === correctIndex) {
      setFeedback("correct");
      setShowHint(false);
      fireConfetti();
      
      // Streak counter sync
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("practiceCompleted"));
      }
    } else {
      setFeedback("incorrect");
      setShowHint(true);
      
      // Auto reset shake state
      setTimeout(() => {
        setFeedback(null);
      }, 600);
    }
  };

  const isSuccessState = feedback === "correct" || isCompleted;

  return (
    <div className="w-full space-y-6">
      {/* Concept Metadata Telemetry display */}
      <div className="bg-white border border-saffron-100 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-3 text-xs font-latin">
        <span className="font-bold text-saffron-600 bg-saffron-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
          {t.practice.concept}: {localizeText(conceptType, activeLang)}
        </span>
        <span className="text-charcoal/50 font-medium">
          {t.practice.paninianHeritage}: <strong className="text-charcoal">{localizeText(paninianHeritage, activeLang)}</strong>
        </span>
      </div>

      <div
        id="tour-step-7"
        className={`bg-white border-2 rounded-3xl p-6 md:p-8 shadow-md transition-all duration-300 relative ${
          isSuccessState
            ? "border-emerald-500 shadow-lg shadow-emerald-50/50 bg-emerald-50/5 animate-success-bounce"
            : feedback === "incorrect"
            ? "border-red-500 animate-shake bg-red-50/5"
            : "border-saffron-100 hover:border-saffron-300"
        }`}
      >
        {/* Header Metadata */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-charcoal/40 font-latin">
            {t.practice.interactivePractice}
          </span>
          <span 
            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-saffron-50 text-saffron-600 font-latin border border-saffron-100"
            data-crawler-ref={sourceAttribution}
          >
            {t.practice.source}: {sourceAttribution}
          </span>
        </div>

        {/* Sanskrit Phrase Text */}
        <div className="flex flex-col items-center text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-extrabold text-saffron-600 mb-2 font-sanskrit leading-relaxed">
            {transliterations.devanagari}
          </h3>
          
          {activeScript !== "devanagari" && (
            <p className="text-sm md:text-base font-semibold text-charcoal/70 italic max-w-lg leading-relaxed font-latin">
              {getActiveText()}
            </p>
          )}

          {/* Audio Playback Panel */}
          <div className="flex flex-col items-center mt-4 w-full">
            <button
              onClick={handlePlayAudio}
              className={`flex items-center justify-center w-14 h-14 rounded-full border transition-all cursor-pointer ${
                isPlaying
                  ? "bg-saffron-500 border-saffron-600 text-white animate-pulse shadow-lg shadow-saffron-500/25 ring-4 ring-saffron-100"
                  : "bg-saffron-50 border-saffron-200 text-saffron-600 hover:bg-saffron-100 hover:border-saffron-400"
              }`}
              title="Listen to pronunciation"
              aria-label="Listen to pronunciation"
            >
              {isPlaying ? <Volume2 className="w-6 h-6" /> : <Play className="w-6 h-6 pl-0.5" />}
            </button>

            {/* Precise unshakeable articulatory location rules display block (SEO-Crawlable) */}
            <div 
              className="pronunciation-telemetry mt-4 bg-saffron-50/40 border border-saffron-100/60 rounded-2xl p-4 text-xs font-latin text-charcoal/85 max-w-md w-full text-center space-y-1.5 shadow-xs"
              data-crawler-pronunciation="true"
            >
              <p className="leading-relaxed">
                <strong>{t.practice.aksharaSyllables}:</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-charcoal/5">{pronunciationAcoustics.akshara}</code>
              </p>
              <p className="leading-relaxed">
                <strong>{t.practice.matraDuration}:</strong> <span className="font-semibold text-saffron-600">{pronunciationAcoustics.matra}</span>
              </p>
              <p className="leading-relaxed">
                <strong>{t.practice.uchcharanaLocation}:</strong> <span className="font-medium">{localizeText(pronunciationAcoustics.uchcharana, activeLang)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Shuffled Quad-Option Layout - A, B, C, D */}
        <div className="space-y-3 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2 font-latin">
            {t.practice.identifyCorrect}
          </p>
          <div className="grid grid-cols-1 gap-3">
            {shuffledOptions.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = opt.originalIndex === correctIndex;
              
              let btnClass = "border-charcoal/10 hover:border-saffron-500 hover:bg-saffron-50/30 text-charcoal";
              let Icon = null;

              if (isSuccessState && isCorrect) {
                btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold shadow-xs";
                Icon = CheckCircle2;
              } else if (isSelected && feedback === "incorrect") {
                btnClass = "border-red-500 bg-red-50 text-red-800 font-semibold";
                Icon = AlertCircle;
              } else if (isSelected) {
                btnClass = "border-saffron-500 bg-saffron-50 text-saffron-800 font-semibold";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx, opt.originalIndex)}
                  disabled={isSuccessState}
                  className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl border text-left text-sm md:text-base font-semibold transition-all duration-200 cursor-pointer min-h-[52px] ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-charcoal/5 border border-charcoal/10 text-[10px] font-bold text-charcoal/55 flex items-center justify-center">
                      {opt.label}
                    </span>
                    <span>{localizeText(opt.text, activeLang)}</span>
                  </div>
                  {Icon && <Icon className="w-5 h-5 flex-shrink-0 ml-2 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vyakaran Hint (Visible on Incorrect Choice) */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex gap-2.5 shadow-xs"
            >
              <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{t.practice.vyakaranHint}: </span>
                {localizeText(hint, activeLang)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progressive Revelation Study */}
        <div className="border-t border-saffron-100 pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-3 font-latin">
            {t.practice.progressiveRevelation}
          </p>
          
          <div className="space-y-4">
            {/* Step 1: Word-by-Word Meaning */}
            {revealStep >= 1 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cream p-4 rounded-2xl border border-charcoal/5"
              >
                <h4 className="text-xs font-bold text-saffron-600 uppercase tracking-wide mb-2.5 font-latin">
                  {t.practice.wordByWordBreakdown}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {wordByWord.map((w, idx) => (
                    <div key={idx} className="bg-white border border-charcoal/5 rounded-xl p-2 flex flex-col items-center">
                      <span className="font-bold text-sm text-saffron-600 font-sanskrit">{w.sanskrit}</span>
                      <span className="text-xs text-charcoal/70 font-latin font-medium">{localizeText(w.english, activeLang)}</span>
                      <span className="text-[9px] font-semibold text-charcoal/30 uppercase tracking-wider font-latin">{localizeText(w.role, activeLang)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <button
                onClick={() => setRevealStep(1)}
                className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-2xl border-2 border-dashed border-saffron-200 text-saffron-600 hover:border-saffron-400 hover:bg-saffron-50/30 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer min-h-[48px]"
              >
                <span>{t.practice.revealWordByWord}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            )}

            {/* Step 2: Grammatical Rules */}
            {revealStep >= 1 && (
              <>
                {revealStep >= 2 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-saffron-50/50 p-4 rounded-2xl border border-saffron-100"
                  >
                    <h4 className="text-xs font-bold text-saffron-600 uppercase tracking-wide mb-2 font-latin">
                      {t.practice.grammarRuleAnalysis}
                    </h4>
                    <p className="text-sm leading-relaxed text-charcoal/90 font-latin">
                      {localizeText(grammaticalRule, activeLang)}
                    </p>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setRevealStep(2)}
                    className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-2xl border-2 border-dashed border-saffron-300 bg-saffron-50/10 text-saffron-700 hover:bg-saffron-50 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer min-h-[48px]"
                  >
                    <span>{t.practice.revealGrammar}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </>
            )}

            {/* Collapse Option */}
            {revealStep > 0 && (
              <button
                onClick={() => setRevealStep(0)}
                className="flex items-center gap-1 text-xs font-semibold text-charcoal/40 hover:text-charcoal transition-colors mx-auto mt-2 cursor-pointer"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span>{t.practice.hideDetails}</span>
              </button>
            )}
          </div>
        </div>

        {/* Error Telemetry and Utility Footer */}
        <div className="flex justify-between items-center border-t border-saffron-100 mt-6 pt-4">
          <ErrorReportButton
            chapterId={chapterId}
            questionText={phrase}
            lang={activeLang}
            transliterationSettings={activeScript}
          />
          
          {isSuccessState && onNextQuestion && (
            <button
              onClick={onNextQuestion}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-sm shadow-md shadow-saffron-500/10 transition-all cursor-pointer"
            >
              <span>{hasNextQuestion ? t.practice.nextQuestion : t.practice.completeChapter}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Inline Banner Ad Slot */}
      <AdSenseWidget slot="inline-banner-slot" variant="inline-banner" />
    </div>
  );
}
