// ai_top_p.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getRecipeWithTopP(ingredients) {
  try {
    // Choose your model — gemini-1.5-flash is fast, gemini-1.5-pro is more capable
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Send request with topP parameter
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: `I have these ingredients: ${ingredients}. Suggest a recipe.` }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 200,
        topP: 0.7 // Controls diversity of responses
      }
    });

    console.log("AI Response:", result.response.text());
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}

// Example usage
getRecipeWithTopP("tomato, cheese, bread");
