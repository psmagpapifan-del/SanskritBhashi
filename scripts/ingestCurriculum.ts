import * as fs from "fs";
import * as path from "path";

// Define TypeScript interfaces to match the Question schema
interface Question {
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
  options: string[];
  correctIndex: number;
  hint: string;
  conceptType: string;
  paninianHeritage: string;
  sourceAttributionTelemetry: string;
  pronunciationAcoustics: {
    akshara: string;
    matra: string;
    uchcharana: string;
  };
}

interface CurriculumChapter {
  id: number;
  ncertClass: number;
  chapterNumber: number;
  name: string;
  tier: "beginner" | "professional" | "expert";
  questions: Question[];
}

const RAW_RTF_DIR = path.join(__dirname, "../content/raw");
const RAW_TEXT_DIR = path.join(__dirname, "../content/raw_text");
const OUTPUT_FILE = path.join(__dirname, "../src/lib/curriculumData.ts");

// Function to decode RTF format to clean plain text
function decodeRtf(rtf: string): string {
  // 1. Decode Unicode escapes e.g. \u2360 or \u2360?
  let text = rtf.replace(/\\u(\d+)\s?/g, (match, code) => {
    return String.fromCharCode(parseInt(code, 10));
  });

  // 2. Decode Hex escapes e.g. \'95
  text = text.replace(/\\'([0-9a-fA-F]{2})/g, (match, hex) => {
    const code = parseInt(hex, 16);
    if (hex === "95") return "•";
    if (hex === "96") return "–";
    if (hex === "91" || hex === "92") return "'";
    if (hex === "93" || hex === "94") return '"';
    if (code >= 32 && code <= 126) {
      return String.fromCharCode(code);
    }
    return "";
  });

  // 3. Clean up RTF formatting tags
  text = text.replace(/\\\w+\b\s?/g, "");
  text = text.replace(/[\{\}]/g, "");
  text = text.replace(/\\\n/g, "\n");
  text = text.replace(/\\\r\n/g, "\n");
  text = text.replace(/\\/g, "");

  return text;
}

// Local fallback parser to compile text files into Question structures
function parseFileLocally(content: string, ncertClass: number, chapterNumber: number, tier: "beginner" | "professional" | "expert"): Question[] {
  const questions: Question[] = [];
  
  // Split content by "Question " to isolate each question block
  const blocks = content.split(/Question \d+:/i).slice(1);
  
  blocks.forEach((block, index) => {
    const lines = block.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    
    let word = "";
    let iast = "";
    let rule = "";
    let sutra = "";
    let attribution = "";
    let options: string[] = [];
    let correctIndex = 0;
    let hint = "";
    
    let optionsSection = false;
    
    lines.forEach(line => {
      if (line.startsWith("Word:")) {
        word = line.replace("Word:", "").trim();
        optionsSection = false;
      } else if (line.startsWith("IAST:")) {
        iast = line.replace("IAST:", "").trim();
        optionsSection = false;
      } else if (line.startsWith("Rule:")) {
        rule = line.replace("Rule:", "").trim();
        optionsSection = false;
      } else if (line.startsWith("Sutra:")) {
        sutra = line.replace("Sutra:", "").trim();
        optionsSection = false;
      } else if (line.startsWith("Attribution:")) {
        attribution = line.replace("Attribution:", "").trim();
        optionsSection = false;
      } else if (line.startsWith("Options:")) {
        optionsSection = true;
      } else if (line.startsWith("Hint:")) {
        hint = line.replace("Hint:", "").trim();
        optionsSection = false;
      } else if (optionsSection && (line.startsWith("-") || line.startsWith("*"))) {
        let optText = line.substring(1).trim();
        if (optText.includes("[CORRECT]")) {
          correctIndex = options.length;
          optText = optText.replace("[CORRECT]", "").trim();
        }
        options.push(optText);
      }
    });

    const qId = `ingested-class${ncertClass}-ch${chapterNumber}-${index + 1}`;
    
    // Generate word-by-word mocks if not explicitly parsed
    const wordByWord = [
      { sanskrit: word, english: iast, role: "Sanskrit Stem" }
    ];

    questions.push({
      id: qId,
      phrase: word,
      transliterations: {
        devanagari: word,
        iast: iast,
        japanese: "サンスクリット発音",
        french: iast
      },
      wordByWord,
      grammaticalRule: `${rule} (Ashtadhyayi ${sutra})`,
      sourceAttribution: attribution,
      options,
      correctIndex,
      hint,
      conceptType: "Sandhi & Word-Junctions",
      paninianHeritage: `${rule} (${sutra})`,
      sourceAttributionTelemetry: attribution,
      pronunciationAcoustics: {
        akshara: iast.split("").join("-"),
        matra: "1-1-1",
        uchcharana: "Sanskrit Acoustics"
      }
    });
  });

  return questions;
}

// Local parser for RTF plain text to extract vocabulary questions
function parseRtfTextLocally(content: string, ncertClass: number, startChapterId: number): CurriculumChapter[] {
  const vocabularyList: { sanskrit: string; english: string }[] = [];

  // 1. Try to parse markdown table rows
  const tableRegex = /\|\s*([^|\n]+?)\s*\|\s*([^|\n]+?)\s*\|\s*([^|\n]+?)\s*\|/g;
  let match;
  while ((match = tableRegex.exec(content)) !== null) {
    const s = match[1].trim();
    const e = match[3].trim();
    if (s && e && s !== "Sanskrit" && !s.includes("---") && !s.includes("=") && s.length < 50 && e.length < 100) {
      vocabularyList.push({ sanskrit: s, english: e });
    }
  }

  // 2. Try to parse bullet lists
  const bulletRegex = /•\s*([^:\n]+?)\s*:\s*([^•\n\\\}]+)/g;
  while ((match = bulletRegex.exec(content)) !== null) {
    const s = match[1].trim();
    const e = match[2].trim();
    if (s && e && s.length < 50 && e.length < 100) {
      vocabularyList.push({ sanskrit: s, english: e });
    }
  }

  // Deduplicate list
  const uniqueList = vocabularyList.filter((v, i, self) => 
    self.findIndex(t => t.sanskrit === v.sanskrit) === i
  );

  const questionsPerChapter = 5;
  const totalChapters = Math.ceil(uniqueList.length / questionsPerChapter);
  const chapters: CurriculumChapter[] = [];

  for (let ch = 0; ch < totalChapters; ch++) {
    const chapterItems = uniqueList.slice(ch * questionsPerChapter, (ch + 1) * questionsPerChapter);
    const questions: Question[] = [];

    chapterItems.forEach((item, index) => {
      // Collect distractors from same glossary
      const distractors = uniqueList
        .filter(v => v.sanskrit !== item.sanskrit)
        .map(v => v.english);

      const options = [item.english];
      while (options.length < 4 && distractors.length > 0) {
        const idx = Math.floor(Math.random() * distractors.length);
        const dist = distractors.splice(idx, 1)[0];
        if (!options.includes(dist)) {
          options.push(dist);
        }
      }

      const fallbackDistractors = ["To study", "To write", "Sage", "Forest", "Water", "Sky", "Diamond"];
      while (options.length < 4) {
        const dist = fallbackDistractors[Math.floor(Math.random() * fallbackDistractors.length)];
        if (!options.includes(dist)) {
          options.push(dist);
        }
      }

      // Shuffle options
      const shuffledOptions = [...options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      const correctIndex = shuffledOptions.indexOf(item.english);

      const qId = `ingested-rtf-class${ncertClass}-ch${ch + 1}-${index + 1}`;
      
      questions.push({
        id: qId,
        phrase: item.sanskrit,
        transliterations: {
          devanagari: item.sanskrit,
          iast: item.sanskrit,
          japanese: "サンスクリット発音",
          french: item.sanskrit
        },
        wordByWord: [
          { sanskrit: item.sanskrit, english: item.english, role: "Vocabulary Stem" }
        ],
        grammaticalRule: `Vocabulary translation from NCERT Class ${ncertClass} syllabus glossary.`,
        sourceAttribution: `NCERT Class ${ncertClass} Glossary`,
        options: shuffledOptions,
        correctIndex,
        hint: `The Sanskrit word "${item.sanskrit}" translates to "${item.english}".`,
        conceptType: "Vocabulary & Glossary",
        paninianHeritage: "Glossary translation",
        sourceAttributionTelemetry: `NCERT Class ${ncertClass} Chapter ${ch + 1}`,
        pronunciationAcoustics: {
          akshara: item.sanskrit,
          matra: "1",
          uchcharana: "Acoustics"
        }
      });
    });

    const tier = ncertClass <= 8 ? "beginner" : ncertClass <= 10 ? "professional" : "expert";
    const chNum = startChapterId + ch;

    chapters.push({
      id: chNum,
      ncertClass,
      chapterNumber: ch + 1,
      name: `Class ${ncertClass} Chapter ${ch + 1}: Vocabulary Practice Part ${ch + 1}`,
      tier,
      questions
    });
  }

  return chapters;
}

// Function to call LLM API (Gemini) using fetch
async function parseFileWithGemini(content: string, apiKey: string): Promise<Question[]> {
  const prompt = `
  You are an expert Sanskrit grammarian and data engineer. 
  Convert the following curriculum notes into a JSON array of questions matching this TypeScript schema:
  
  interface Question {
    id: string; // Unique question id string
    phrase: string; // Native Sanskrit Devanagari phrase
    transliterations: {
      devanagari: string;
      iast: string;
      japanese: string;
      french: string;
    };
    wordByWord: { sanskrit: string; english: string; role: string }[];
    grammaticalRule: string; // The rule explaining the grammar
    sourceAttribution: string; // The sutra number or book attribution
    options: string[]; // Strict 4-option array
    correctIndex: number; // 0-3 index
    hint: string; // Vyakaran Hint
    conceptType: string; // Concept e.g. "Sandhi & Word-Junctions"
    paninianHeritage: string; // Sutra rule
    sourceAttributionTelemetry: string;
    pronunciationAcoustics: {
      akshara: string;
      matra: string;
      uchcharana: string;
    };
  }

  Notes:
  ${content}

  Output ONLY a valid JSON array of questions, with no markdown code block fences. Do not output anything else.
  `;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText} (${response.status})`);
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from Gemini API");
  }

  return JSON.parse(text) as Question[];
}

async function run() {
  console.log("🚀 Initializing Curriculum Ingestion Pipeline...");
  
  // 1. Process RTF files and convert them to txt first
  if (fs.existsSync(RAW_RTF_DIR)) {
    const rtfFiles = fs.readdirSync(RAW_RTF_DIR).filter(f => f.endsWith(".rtf"));
    console.log(`Found ${rtfFiles.length} RTF files to decode and preprocess.`);
    
    if (!fs.existsSync(RAW_TEXT_DIR)) {
      fs.mkdirSync(RAW_TEXT_DIR, { recursive: true });
    }

    rtfFiles.forEach(file => {
      const filePath = path.join(RAW_RTF_DIR, file);
      const rtfContent = fs.readFileSync(filePath, "utf8");
      const plainText = decodeRtf(rtfContent);
      
      // Extract class number e.g., 6th.rtf -> 6, 10thA.rtf -> 10
      const match = file.match(/(\d+)/);
      const classNum = match ? match[1] : "6";
      
      const textPath = path.join(RAW_TEXT_DIR, `class${classNum}_rtf_converted.txt`);
      fs.writeFileSync(textPath, plainText, "utf8");
      console.log(`Decoded: ${file} -> ${textPath}`);
    });
  }

  if (!fs.existsSync(RAW_TEXT_DIR)) {
    console.error(`❌ Raw text directory not found: ${RAW_TEXT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(RAW_TEXT_DIR).filter(f => f.endsWith(".txt"));
  console.log(`Found ${files.length} text file(s) to ingest.`);
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    console.log("🔑 Gemini API Key detected. Using LLM for schema extraction.");
  } else {
    console.log("⚠️ No Gemini API Key detected. Falling back to local regex-based parser.");
  }

  const chapters: CurriculumChapter[] = [];
  let currentId = 1;

  for (const file of files) {
    const filePath = path.join(RAW_TEXT_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    
    if (file.includes("rtf_converted")) {
      // Parse converted RTF glossary files
      const match = file.match(/class(\d+)/i);
      const ncertClass = match ? parseInt(match[1], 10) : 6;
      
      console.log(`Parsing RTF plain text: ${file} -> Class ${ncertClass}`);
      const rtfChapters = parseRtfTextLocally(content, ncertClass, currentId);
      chapters.push(...rtfChapters);
      currentId += rtfChapters.length;
      console.log(`✅ Extracted ${rtfChapters.length} glossary chapters.`);
    } else {
      // Parse custom structured text files
      const nameMatch = file.match(/class(\d+)_chapter(\d+)/i);
      let ncertClass = 6;
      let chapterNumber = 1;
      if (nameMatch) {
        ncertClass = parseInt(nameMatch[1], 10);
        chapterNumber = parseInt(nameMatch[2], 10);
      }
      
      const lines = content.split("\n");
      let title = `Class ${ncertClass} Chapter ${chapterNumber}`;
      let tier: "beginner" | "professional" | "expert" = "beginner";
      
      lines.forEach(line => {
        if (line.startsWith("Title:")) {
          title = line.replace("Title:", "").trim();
        } else if (line.startsWith("Tier:")) {
          const val = line.replace("Tier:", "").trim().toLowerCase();
          if (val === "professional" || val === "expert") {
            tier = val;
          }
        }
      });

      console.log(`Parsing custom text: ${file} -> Class ${ncertClass}, Chapter ${chapterNumber} (${tier})`);

      let questions: Question[] = [];
      if (apiKey) {
        try {
          questions = await parseFileWithGemini(content, apiKey);
          console.log(`✅ Extracted ${questions.length} questions using Gemini.`);
        } catch (err) {
          console.error(`❌ Gemini extraction failed: ${err}. Falling back to local parser.`);
          questions = parseFileLocally(content, ncertClass, chapterNumber, tier);
        }
      } else {
        questions = parseFileLocally(content, ncertClass, chapterNumber, tier);
        console.log(`✅ Extracted ${questions.length} questions using local parser.`);
      }

      chapters.push({
        id: currentId++,
        ncertClass,
        chapterNumber,
        name: `Class ${ncertClass} Chapter ${chapterNumber}: ${title}`,
        tier,
        questions
      });
    }
  }

  // Sort chapters by class then chapter number
  chapters.sort((a, b) => {
    if (a.ncertClass !== b.ncertClass) {
      return a.ncertClass - b.ncertClass;
    }
    return a.chapterNumber - b.chapterNumber;
  });

  // Re-index IDs to be sequential
  chapters.forEach((ch, idx) => {
    ch.id = idx + 1;
  });

  // Generate output TypeScript file
  const fileContent = `// This file is auto-generated by scripts/ingestCurriculum.ts. Do not edit manually.
import { Question } from "./levelsEngine";

export interface CurriculumChapter {
  id: number;
  ncertClass: number;
  chapterNumber: number;
  name: string;
  tier: "beginner" | "professional" | "expert";
  questions: Question[];
}

export const curriculumChapters: CurriculumChapter[] = ${JSON.stringify(chapters, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent, "utf-8");
  console.log(`🎉 Ingestion completed successfully! Saved ${chapters.length} chapters to ${OUTPUT_FILE}`);
}

run().catch(err => {
  console.error("❌ Fatal ingestion error:", err);
  process.exit(1);
});
