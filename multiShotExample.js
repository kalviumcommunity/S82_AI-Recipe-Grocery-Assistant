import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runMultiShotPrompt() {
  // Multi-shot prompting: Providing multiple examples to help the model understand
  // the pattern and context before answering the actual query.

  const prompt = `
You are an intelligent assistant that answers city population questions concisely.

Example 1:
Q: What is the population of Tokyo?
A: Tokyo has a population of about 37 million people in its metropolitan area.

Example 2:
Q: What is the population of New York City?
A: New York City has a population of about 8.5 million people.

Example 3:
Q: What is the population of Sydney?
A:
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2 }
  });

  console.log("Multi-shot Prompting Output:\n");
  console.log(result.response.text());
}

runMultiShotPrompt();
