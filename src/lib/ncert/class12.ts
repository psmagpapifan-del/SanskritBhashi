/**
 * NCERT Class 12 — भास्वती द्वितीयो भागः (core) and शाश्वती द्वितीयो भागः (elective).
 * Questions are written from the chapter text in content/ncert_text/class12/
 * (converted from the legacy Kruti Dev font). Option 0 is always the answer.
 */
import { chapter, type Q } from "./build.ts";

const bh = (lesson: number, title: string, summary: string, qs: Q[]) =>
  chapter(12, lesson, "भास्वती", title, summary, qs, { key: "bhaswati", short: "भास्वती" });
const sh = (lesson: number, title: string, summary: string, qs: Q[]) =>
  chapter(12, lesson, "शाश्वती", title, summary, qs, { key: "shashvati", short: "शाश्वती" });

export const class12Bhaswati = [
  bh(1, "अनुशासनम्", "The convocation address of the Taittirīya Upaniṣad: the teacher's parting instructions to the student.", [
    {
      kind: "source",
      prompt: "From where is this lesson taken?",
      options: ["The 11th anuvāka of the Śikṣāvallī of the Taittirīya Upaniṣad", "The Kaṭha Upaniṣad", "The Īśa Upaniṣad", "The Chāndogya Upaniṣad"],
      hint: "… तैत्तिरीय उपनिषद् के ग्यारहवें अनुवाक (शिक्षावल्ली) से …",
      explanation: "It is from the eleventh anuvāka of the Śikṣāvallī, given by the teacher after the student's studies are complete.",
    },
    {
      kind: "concept",
      prompt: "What does 'उपनिषद्' mean, according to the introduction?",
      options: ["Sitting near the teacher (for knowledge)", "A secret book", "A hymn to the gods", "A rule of grammar"],
      hint: "… गुरु के समीप बैठना।",
      explanation: "Upaniṣad means sitting close to the guru to learn.",
    },
    {
      kind: "meaning",
      verse: "सत्यं वद । धर्मं चर । स्वाध्यायान्मा प्रमदः ।",
      prompt: "What are the teacher's first three instructions?",
      options: ["Speak the truth, practise dharma, do not neglect self-study", "Earn money, marry, travel", "Fast, pray, meditate", "Obey the king, pay taxes, fight"],
      hint: "सत्यं वद …",
      explanation: "Speak truth; walk in dharma; never be careless about your own study.",
    },
    {
      kind: "meaning",
      verse: "आचार्याय प्रियं धनमाहृत्य प्रजातन्तुं मा व्यवच्छेत्सीः ।",
      prompt: "What does this instruction ask of the student?",
      options: ["Offer the teacher a gift he values, and do not break the line of offspring", "Never marry", "Give all your wealth away", "Stay with the teacher forever"],
      hint: "प्रजातन्तुः = the thread of progeny.",
      explanation: "Having brought the teacher the gift he likes, do not cut off the thread of the family line.",
    },
    {
      kind: "meaning",
      verse: "मातृदेवो भव । पितृदेवो भव । आचार्यदेवो भव । अतिथिदेवो भव ।",
      prompt: "Whom should the student treat as gods?",
      options: ["Mother, father, teacher and guest", "Kings and priests", "Only the gods", "Elders and rulers"],
      hint: "मातृदेवः, पितृदेवः …",
      explanation: "Regard your mother, father, teacher and guest as divine.",
    },
    {
      kind: "meaning",
      verse: "यान्यनवद्यानि कर्माणि, तानि सेवितव्यानि, नो इतराणि ।",
      prompt: "Which deeds should be done, according to the teacher?",
      options: ["Only blameless deeds, not others", "Any deed that brings wealth", "Whatever others do", "Only religious rituals"],
      hint: "अनवद्यानि = faultless.",
      explanation: "Do only irreproachable deeds; follow only our good conduct, not the rest.",
    },
    {
      kind: "concept",
      prompt: "If the student is in doubt about a deed or conduct, what should he do?",
      options: ["Act as thoughtful, devoted, gentle and dharma-loving wise people there act", "Ask the king", "Do nothing", "Follow his own wishes"],
      hint: "… यथा ते तत्र वर्तेरन् तथा तत्र वर्तेथाः.",
      explanation: "In doubt, behave as the discerning, committed, kind and righteous wise people around you behave.",
    },
    {
      kind: "grammar",
      prompt: "What does अन्तेवासी mean, as the notes explain?",
      options: ["A student — one who lives near the teacher", "A hermit", "A neighbour", "A servant"],
      hint: "गुरोरन्ते समीपे वसतीति …",
      explanation: "अन्तेवासी = one who dwells near the guru, i.e. the pupil.",
    },
  ]),

  bh(2, "मातुराज्ञा गरीयसी", "From Bhāsa's प्रतिमानाटकम्: Rāma refuses to hear any blame of Kaikeyī and calms an angry Lakṣmaṇa.", [
    {
      kind: "source",
      prompt: "From which play is this lesson taken?",
      options: ["Bhāsa's प्रतिमानाटकम्", "Kālidāsa's रघुवंशम्", "Bhavabhūti's उत्तररामचरितम्", "Dinnāga's कुन्दमाला"],
      hint: "… महाकवि भास विरचित …",
      explanation: "It is from Bhāsa's प्रतिमा-नाटकम्, notable for Rāma's devotion to Kaikeyī.",
    },
    {
      kind: "comprehension",
      prompt: "Whom does the chamberlain (काञ्चुकीयः) ask Rāma to save?",
      options: ["The king (Daśaratha)", "Bharata", "Sītā", "The people"],
      hint: "परित्रायतां कुमारः … महाराज!",
      explanation: "He cries for help for the Mahārāja, who has fallen into distress.",
    },
    {
      kind: "meaning",
      verse: "शरीरेऽरिः प्रहरति हृदये स्वजनस्तथा ।",
      prompt: "What contrast does Rāma draw on hearing the trouble came from 'one's own people'?",
      options: ["An enemy strikes the body, but one's own people strike the heart", "Enemies are worse than friends", "Family always protects", "The body heals faster than the heart"],
      hint: "शरीरे अरिः … हृदये स्वजनः …",
      explanation: "A foe wounds the body; one's own kin wound the heart — whose 'kinship' will now shame me?",
    },
    {
      kind: "meaning",
      verse: "यस्याः शक्रसमो भर्ता मया पुत्रवती च या । फले कस्मिन् स्पृहा तस्या येनाकार्यं करिष्यति ॥",
      prompt: "Why does Rāma at first refuse to believe Kaikeyī would do wrong?",
      options: ["Her husband is like Indra and she has a son in him — what could she want that she'd do wrong?", "She is a goddess", "She is very old", "She never speaks"],
      hint: "शक्रसमो भर्ता … मया पुत्रवती …",
      explanation: "With a husband equal to Indra and Rāma himself as her son, for what gain would she do a wrong deed?",
    },
    {
      kind: "comprehension",
      prompt: "When told his coronation was stopped by Kaikeyī's words, what does Rāma say?",
      options: ["'There are only merits in it'", "'I will fight for the throne'", "'I will leave Ayodhyā in anger'", "'Bring Kaikeyī to me'"],
      hint: "आर्य! गुणाः खल्वत्र.",
      explanation: "Rāma replies that he sees only good in it: he remains dependent on his father and his brothers are not deprived.",
    },
    {
      kind: "meaning",
      verse: "शुल्के विपणितं राज्यं पुत्रार्थे यदि याच्यते । तस्या लोभोऽत्र नास्माकं भ्रातृराज्यापहारिणाम् ॥",
      prompt: "How does Rāma defend Kaikeyī's demand that Bharata be crowned?",
      options: ["The kingdom was promised as her bride-price for her son; the greed would be ours if we took it", "She had a right to rule herself", "Bharata deserved it more", "The king had no choice"],
      hint: "शुल्के विपणितं राज्यम् …",
      explanation: "If she asks for the kingdom pledged as her dowry for her son, there's no greed in her; we would be greedy to take our brother's kingdom.",
    },
    {
      kind: "comprehension",
      prompt: "What does Rāma finally tell the chamberlain about Kaikeyī?",
      options: ["'I don't want to hear any more blame of my mother'", "'Tell her to come here'", "'She must be punished'", "'I forgive her this once'"],
      hint: "अतः परं न मातुः परिवादं श्रोतुमिच्छामि.",
      explanation: "He refuses to hear any more criticism of his mother and asks instead about the king.",
    },
    {
      kind: "comprehension",
      prompt: "Who reacts angrily offstage on hearing the king fainted?",
      options: ["Lakṣmaṇa, 'an unshakeable ocean of patience'", "Bharata", "Sītā", "Daśaratha"],
      hint: "अक्षोभ्यः क्षोभितः केन … धैर्यसागरः.",
      explanation: "Lakṣmaṇa cries 'take up your bow!'; Rāma wonders who has stirred that calm ocean of fortitude.",
    },
  ]),
];

export const class12Shashvati = [];
