import axios, { type AxiosResponse } from 'axios';
import type { RecipeSearchResponse } from '@/typings/services/RecipeSearchResponse';
import type { RecipeDetails } from '@/typings/services/RecipeDetails';

// Base URL for the Express API server
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const api = {
  /**
   * Search for recipes by query
   * @param query - Search term
   * @param options - Additional search options
   */
  searchRecipes: async (
    query: string,
    options?: {
      number?: number;
      offset?: number;
      cuisine?: string;
      diet?: string;
      type?: string;
      maxReadyTime?: number;
    }
  ): Promise<RecipeSearchResponse> => {
    const params = new URLSearchParams({
      query,
      ...(options?.number && { number: options.number.toString() }),
      ...(options?.offset && { offset: options.offset.toString() }),
      ...(options?.cuisine && { cuisine: options.cuisine }),
      ...(options?.diet && { diet: options.diet }),
      ...(options?.type && { type: options.type }),
      ...(options?.maxReadyTime && { maxReadyTime: options.maxReadyTime.toString() }),
    });

    const response: AxiosResponse<RecipeSearchResponse> = await apiClient.get(
      `/recipes/search?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Get detailed information about a specific recipe
   * @param id - Recipe ID
   */
  getRecipeDetails: async (id: number): Promise<RecipeDetails> => {
    const response: AxiosResponse<RecipeDetails> = await apiClient.get(
      `/recipes/${id}`
    );
    return response.data;
  },
};

// Error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
