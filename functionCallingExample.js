import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Simulated backend function
function get_recipe({ dish_name, servings = 2 }) {
  return {
    dish_name,
    servings,
    ingredients: [
      "1 cup chopped onions",
      "2 cups diced tomatoes",
      "200g paneer cubes",
      "2 tbsp butter",
      "Spices: salt, garam masala, chili powder"
    ],
    steps: [
      "Heat butter in a pan.",
      "Add onions and sauté until golden.",
      "Add tomatoes and spices, cook until soft.",
      "Add paneer cubes, stir, and simmer for 5 minutes.",
      "Serve hot with naan or rice."
    ]
  };
}

async function runFunctionCalling() {
  const userRequest = "Give me a recipe for Paneer Butter Masala for 4 people.";

  // Instead of OpenAI's function calling, we ask Gemini to give JSON with specific keys
  const prompt = `
You are an AI Recipe Assistant.
Extract the "dish_name" and "servings" from the user's request, and return them in this JSON format:
{
  "dish_name": string,
  "servings": number
}

User request: "${userRequest}"
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0 }
  });

  try {
    // Parse extracted JSON
    const extracted = JSON.parse(result.response.text());

    // Call backend function
    const functionResult = get_recipe(extracted);

    console.log("\n--- Function Call Result ---");
    console.log(functionResult);
  } catch (error) {
    console.error("Error parsing AI output:", error);
    console.log("Raw output:\n", result.response.text());
  }
}

runFunctionCalling();
