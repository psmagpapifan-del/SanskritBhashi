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

const RAW_DIR = path.join(__dirname, "../content/raw_text");
const OUTPUT_FILE = path.join(__dirname, "../src/lib/curriculumData.ts");

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
  
  if (!fs.existsSync(RAW_DIR)) {
    console.error(`❌ Raw text directory not found: ${RAW_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith(".txt"));
  console.log(`Found ${files.length} raw text file(s) to ingest.`);
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    console.log("🔑 Gemini API Key detected. Using LLM for schema extraction.");
  } else {
    console.log("⚠️ No Gemini API Key detected. Falling back to local regex-based parser.");
  }

  const chapters: CurriculumChapter[] = [];
  let currentId = 1;

  for (const file of files) {
    const filePath = path.join(RAW_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    
    // Extract metadata from file name e.g. class6_chapter1.txt
    const nameMatch = file.match(/class(\d+)_chapter(\d+)/i);
    let ncertClass = 6;
    let chapterNumber = 1;
    if (nameMatch) {
      ncertClass = parseInt(nameMatch[1], 10);
      chapterNumber = parseInt(nameMatch[2], 10);
    }
    
    // Parse metadata from file contents
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

    console.log(`Ingesting: ${file} -> Class ${ncertClass}, Chapter ${chapterNumber} (${tier})`);

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
