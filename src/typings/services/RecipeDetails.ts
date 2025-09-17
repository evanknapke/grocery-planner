import type { RecipeSearchResult } from './RecipeSearchResult'

interface RecipeDetails extends RecipeSearchResult {
  instructions: string;
  sourceName: string;
  creditsText: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  pricePerServing: number;
  cheap: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  ketogenic: boolean;
  whole30: boolean;
  vegan: boolean;
  vegetarian: boolean;
  pescetarian: boolean;
  paleo: boolean;
  primal: boolean;
  veryPopular: boolean;
  gaps: string;
  weightWatcherSmartPoints: number;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
}

export type { RecipeDetails }