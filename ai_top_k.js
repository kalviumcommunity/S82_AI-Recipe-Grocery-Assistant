// ai_top_k.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runTopKExample() {
  try {
    const prompt = "Suggest 5 creative vegetarian dinner ideas that are quick to make.";

    // Use Gemini model (flash = faster, pro = more powerful)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Call Gemini API with topK
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 200,
        topP: 1,    // same as your original
        topK: 40,   // considers only top 40 tokens
        frequencyPenalty: 0,
        presencePenalty: 0
      }
    });

    console.log("Prompt:", prompt);
    console.log("AI Response:", result.response.text());

  } catch (error) {
    console.error("Error:", error);
  }
}

runTopKExample();
