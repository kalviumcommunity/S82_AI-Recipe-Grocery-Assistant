import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt = `
You are an AI Recipe & Grocery Assistant.
Given ingredients, suggest a recipe in JSON format.

Example:
User: "eggs, spinach, cheese"
AI: {
  "recipe_name": "Spinach Cheese Omelette",
  "ingredients": ["2 eggs", "1 cup spinach", "1/2 cup cheese"],
  "instructions": [
    "Beat the eggs.",
    "Cook spinach in a pan.",
    "Add cheese and eggs, cook until done."
  ]
}
`;

const userPrompt = `potato, peas, onion`;

async function runPrompt() {
  // Combine system + user prompts (Gemini doesn't use role-based messages)
  const prompt = `${systemPrompt}\n\nUser: "${userPrompt}"`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

runPrompt();
