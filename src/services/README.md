# Services

This directory contains client-side services for communicating with the API server.

## Usage

```typescript
import { api } from '@/services/api';

// Search for recipes
const searchResults = await api.searchRecipes('pasta', {
  number: 10,
  cuisine: 'italian',
  diet: 'vegetarian'
});

// Get recipe details
const recipeDetails = await api.getRecipeDetails(123456);
```

## Environment Variables

Set the following in your `.env` file:

```
VITE_API_BASE_URL=http://localhost:3001
```

## Types

The services include TypeScript types for:
- `RecipeSearchResult` - Individual recipe in search results
- `RecipeSearchResponse` - Complete search response
- `RecipeDetails` - Detailed recipe information

## Error Handling

The services include automatic error handling and logging. Failed requests will be logged to the console and the promise will be rejected with the error details.
