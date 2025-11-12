import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const topic = formData.get("topic") as string;
    const file = formData.get("file") as File | null;

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables");
    }

    const ai = new GoogleGenerativeAI(apiKey);

    let context = topic || "general knowledge";
    if (file) {
      try {
        console.log("Processing PDF file:", file.name);
        
        
        const pdfjsLib = await import("pdfjs-dist");
        
        
        const pdfjsVersion = pdfjsLib.version || "3.11.174";
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
        
        const arrayBuffer = await file.arrayBuffer();
        const typedArray = new Uint8Array(arrayBuffer);
        
        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument({ data: typedArray });
        const pdfDoc = await loadingTask.promise;
        
        console.log(`PDF loaded: ${pdfDoc.numPages} pages`);
        
        let extractedText = "";
        
        
        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
          const page = await pdfDoc.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          
          const pageText = textContent.items
            .map((item: any) => {
              if ('str' in item) {
                return item.str;
              }
              return '';
            })
            .join(" ");
          
          extractedText += pageText + "\n";
          
         
          if (extractedText.length > 5000) {
            console.log("Text limit reached, stopping at page", pageNum);
            break;
          }
        }
        
        const trimmedText = extractedText.trim();
        
        if (trimmedText.length > 0) {
          
          context = trimmedText.slice(0, 4000);
          console.log(`PDF extracted successfully: ${trimmedText.length} characters (using ${context.length})`);
        } else {
          console.warn("PDF text extraction returned empty, using topic");
        }
        
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        
        if (!topic) {
          return NextResponse.json(
            {
              error: "Failed to parse PDF and no topic provided",
              title: "Fallback Puzzle",
              words: ["AI", "Code", "NextJS"],
              clues: ["Artificial Intelligence", "Programming", "Framework"],
            },
            { status: 400 }
          );
        }
      }
    }

    console.log("Generating puzzle for context:", context.substring(0, 100) + "...");

    const prompt = `
You are a creative puzzle maker.
Create a small word puzzle in **pure JSON format** (no markdown, no text).
The puzzle should be based on this topic or content: "${context}"

Rules:
- Return exactly one JSON object.
- Include 3–6 topic-related words.
- Include one clue for each word.
- The clues should be simple and human-readable.
- Do NOT include explanations or any text outside JSON.
- Do NOT wrap the JSON in markdown code blocks.
- Do NOT add any text before or after the JSON.

Example output:
{
  "title": "Space Exploration",
  "words": ["Rocket", "NASA", "Moon", "Astronaut"],
  "clues": [
    "Vehicle used to travel into space",
    "US space agency",
    "Earth's satellite",
    "Person who travels in space"
  ]
}

Now create a puzzle based on the provided context.
`;

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    console.log("Gemini raw output:", text);

    let cleanText = text;
    if (text.includes("```")) {
      cleanText = text
        .replace(/```json\n?/gi, "")
        .replace(/```\n?/g, "")
        .trim();
    }

    let data;
    try {
      data = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("JSON parse failed:", parseError);
      console.error("Attempted to parse:", cleanText);
      
      // Fallback puzzle
      data = {
        title: topic || "Fallback Puzzle",
        words: ["AI", "Code", "NextJS"],
        clues: ["Artificial Intelligence", "Programming", "Framework"],
      };
    }

    if (!data.title) {
      data.title = topic || "Word Puzzle";
    }
    
    if (!Array.isArray(data.words) || data.words.length === 0) {
      data.words = ["AI", "Code", "NextJS"];
    }
    
    if (!Array.isArray(data.clues) || data.clues.length === 0) {
      data.clues = data.words.map((w: string) => `Hint related to ${w}`);
    }

    if (data.words.length !== data.clues.length) {
      const minLength = Math.min(data.words.length, data.clues.length);
      console.warn(`Word/clue mismatch: ${data.words.length} words, ${data.clues.length} clues. Trimming to ${minLength}`);
      data.words = data.words.slice(0, minLength);
      data.clues = data.clues.slice(0, minLength);
    }

    data.words = data.words.map((w: string) => String(w).trim());
    data.clues = data.clues.map((c: string) => String(c).trim());
    data.title = String(data.title).trim();

    console.log("Returning puzzle:", data.title, "with", data.words.length, "words");

    return NextResponse.json(data);
    
  } catch (error) {
    console.error("API Route Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("Error stack:", errorStack);
    
    return NextResponse.json(
      {
        error: errorMessage,
        title: "Error - Fallback Puzzle",
        words: ["AI", "Code", "Fun"],
        clues: ["Technology", "Programming", "Enjoy"],
      },
      { status: 500 }
    );
  }
}