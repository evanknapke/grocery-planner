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
      recipes.value = response.results
    } catch (error) {
      console.error('Error searching recipes:', error)
      throw error
    }
  }

  const getRecipeById = async (id: number) => {
    try {
      const recipe = await recipesService.getRecipeById(id)
      selectedRecipe.value = recipe
      return recipe
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
