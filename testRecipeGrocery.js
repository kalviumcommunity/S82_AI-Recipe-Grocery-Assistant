import fs from 'fs'

// Load and parse the sampleRecipeGroceries.json file
const data = fs.readFileSync('./sampleRecipeGrocery.json', 'utf8');
const recipes = JSON.parse(data);

// Print each recipe in a formatted way
recipes.forEach((recipe, index) => {
  console.log(`\n📄 Recipe ${index + 1}:`);
  console.log(`📌 Name: ${recipe.name}`);
  console.log(`🍽 Type: ${recipe.type}`);
  console.log(`📝 Summary: ${recipe.summary}`);
  console.log(`🛒 Ingredients: ${recipe.ingredients.join(', ')}`);
});