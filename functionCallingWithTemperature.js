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

  // Instead of OpenAI's native function calling, we instruct Gemini to output JSON directly
  const prompt = `
You are an AI that extracts structured parameters from a cooking request.

From the user's request, extract:
- dish_name (string)
- servings (number)

Return ONLY valid JSON in this format:
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
    const extractedParams = JSON.parse(result.response.text());

    const functionResult = get_recipe(extractedParams);

    console.log("\n--- Function Call Result ---");
    console.log(functionResult);
  } catch (error) {
    console.error("Error parsing AI output:", error);
    console.log("Raw output:\n", result.response.text());
  }
}

runFunctionCalling();
