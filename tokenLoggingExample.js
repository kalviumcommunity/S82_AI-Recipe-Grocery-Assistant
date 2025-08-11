import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runTokenLogging() {
  const userDish = "Paneer Butter Masala";

  const prompt = `
You are an AI Recipe Assistant.
Generate a short recipe for: ${userDish}

Format the output in JSON:
{
  "dish_name": string,
  "ingredients": [string],
  "steps": [string],
  "estimated_time_minutes": number
}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Generate response
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.3 }
  });

  // Print AI output
  console.log("AI Output:\n");
  console.log(result.response.text());

  // Log token usage (Gemini equivalent)
  if (result.response.usageMetadata) {
    console.log("\n--- Token Usage ---");
    console.log(`Prompt Tokens: ${result.response.usageMetadata.promptTokenCount}`);
    console.log(`Completion Tokens: ${result.response.usageMetadata.candidatesTokenCount}`);
    console.log(`Total Tokens: ${result.response.usageMetadata.totalTokenCount}`);
  } else {
    console.log("\nToken usage metadata not available for this response.");
  }
}

runTokenLogging();
