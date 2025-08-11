import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runStructuredOutputRecipe() {
  // Structured output: We request the AI to return recipe details in JSON format.
  // This ensures we can easily use it in our grocery assistant application.

  const prompt = `
You are an AI Recipe Assistant.
Given a dish name, return the details in the following JSON format:
{
  "dish_name": string,
  "ingredients": [string],
  "steps": [string],
  "estimated_time_minutes": number
}

Dish: "Pasta Alfredo"
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2 }
  });

  console.log("Structured Recipe Output:\n");

  try {
    const jsonOutput = JSON.parse(result.response.text());
    console.log(jsonOutput);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.log("Raw response:\n", result.response.text());
  }
}

runStructuredOutputRecipe();
