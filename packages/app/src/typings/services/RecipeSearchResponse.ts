import type { RecipeSearchResult } from './RecipeSearchResult'

interface RecipeSearchResponse {
  results: RecipeSearchResult[];
  offset: number;
  number: number;
  totalResults: number;
}

export type { RecipeSearchResponse }