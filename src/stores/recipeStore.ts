import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RecipeSearchResult } from '@/typings/services/RecipeSearchResult'
import type { RecipeDetails } from '@/typings/services/RecipeDetails'
import RecipesService from '@/services/recipesService'

export const useRecipeStore = defineStore('recipe', () => {
  const recipesService = new RecipesService()
  
  const recipes = ref<RecipeSearchResult[]>([])
  const selectedRecipe = ref<RecipeDetails | null>(null)

  const searchRecipes = async (query: string) => {
    try {
      const response = await recipesService.searchRecipes(query)
      if (response.success && response.data) {
        recipes.value = response.data.results
      } else {
        throw new Error(response.message || 'Failed to search recipes')
      }
    } catch (error) {
      console.error('Error searching recipes:', error)
      throw error
    }
  }

  const getRecipeById = async (id: number) => {
    try {
      const response = await recipesService.getRecipeById(id)
      if (response.success && response.data) {
        selectedRecipe.value = response.data
        return response.data
      } else {
        throw new Error(response.message || 'Failed to fetch recipe')
      }
    } catch (error) {
      console.error('Error fetching recipe by ID:', error)
      throw error
    }
  }

  return {
    recipes,
    selectedRecipe,
    searchRecipes,
    getRecipeById
  }
})
