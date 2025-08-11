import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runDynamicPrompting() {
  // Simulating dynamic input — in a real app this could come from a form or API
  const userDish = "Paneer Butter Masala";
  const dietaryPreference = "vegetarian";
  const servings = 4;
  const cookingSkill = "beginner";

  // Dynamic Prompt — build prompt from user variables
  const dynamicPrompt = `
You are an AI Recipe Assistant.
Generate a recipe for: ${userDish}
Dietary preference: ${dietaryPreference}
Servings: ${servings}
Skill level: ${cookingSkill}

Format the output in JSON:
{
  "dish_name": string,
  "ingredients": [string],
  "steps": [string],
  "estimated_time_minutes": number
}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: dynamicPrompt }] }],
    generationConfig: { temperature: 0.3 }
  });

  console.log("Dynamic Prompt Recipe Output:\n");

  try {
    const jsonOutput = JSON.parse(result.response.text());
    console.log(jsonOutput);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.log("Raw response:\n", result.response.text());
  }
}

runDynamicPrompting();
