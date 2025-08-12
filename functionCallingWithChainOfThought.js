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

  // Create model instance
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a helpful cooking assistant.
Follow these steps:
1. Identify the dish name.
2. Identify the servings.
3. Return the data in JSON format with fields: dish_name, servings.
User request: ${userRequest}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const parsed = JSON.parse(text);
    const recipe = get_recipe(parsed);

    console.log("\n--- Function Call Result ---");
    console.log(recipe);
  } catch (err) {
    console.log("\n--- Gemini Response ---");
    console.log(text);
  }
}

runFunctionCalling();
