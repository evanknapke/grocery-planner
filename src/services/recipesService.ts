import { RequestBase } from './requestBase';
import type { RecipeSearchResponse } from '@/typings/services/RecipeSearchResponse';
import type { RecipeDetails } from '@/typings/services/RecipeDetails';
import type { RecipeSearchOptions } from '@/typings/services/RecipeSearchOptions';

export class RecipesService extends RequestBase {
  /**
   * Search for recipes by query
   * @param query - Search term
   * @param options - Additional search options
   */
  async searchRecipes(
    query: string,
    options?: RecipeSearchOptions
  ): Promise<RecipeSearchResponse> {
    const params = new URLSearchParams({
      query,
      ...(options?.number && { number: options.number.toString() }),
      ...(options?.offset && { offset: options.offset.toString() }),
      ...(options?.cuisine && { cuisine: options.cuisine }),
      ...(options?.diet && { diet: options.diet }),
      ...(options?.type && { type: options.type }),
      ...(options?.maxReadyTime && { maxReadyTime: options.maxReadyTime.toString() }),
    });

    return this.get<RecipeSearchResponse>(
      `/recipes/search?${params.toString()}`
    );
  }

  /**
   * Get detailed information about a specific recipe
   * @param id - Recipe ID
   */
  async getRecipeDetails(id: number): Promise<RecipeDetails> {
    return this.get<RecipeDetails>(`/recipes/${id}`);
  }
}