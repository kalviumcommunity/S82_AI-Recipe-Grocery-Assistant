import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Create a Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function fetchAPIInfo() {
  const systemPrompt = `
You are an expert API evaluator. 
Given an API, you will assess it on three criteria: Correctness, Efficiency, and Scalability.
`;

  const userPrompt = `
Evaluate the following API:

API Endpoint: https://api.example.com/products
Function: Returns a list of all products with details.
`;

  // Combine system + user prompts for Gemini
  const prompt = `${systemPrompt}\n\n${userPrompt}`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

fetchAPIInfo();
