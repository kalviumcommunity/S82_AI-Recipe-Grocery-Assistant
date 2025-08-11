## Sample User Prompts

1. I have tomatoes, onions, and eggs. What can I cook?
2. Generate a grocery list for a vegetarian dinner for 4 people.
3. Give me a low-calorie recipe using broccoli and paneer.
4. I want a South Indian breakfast under 20 minutes.
5. I’m allergic to peanuts. Suggest a peanut-free snack.

### Expected Output Format:
- {
    "recipe_name": "",
    "ingredients": [],
    "instructions": [],
    "missing_ingredients": [],
    "nutrition_info": {}
  }

- Output must always follow this schema.
- Missing ingredients field must be empty if recipe is possible.