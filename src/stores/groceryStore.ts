import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { groceryListsService } from '@/services/groceryListsService'
import type { SaveGroceryListRequest } from '@/typings/services/SaveGroceryListRequest'
import type { GroceryItem } from '@/typings/services/GroceryItem'
import type { SpoonacularIngredient } from '@/typings/services/SpoonacularIngredient'



export const useGroceryStore = defineStore('grocery', () => {
  const groceryList = ref<GroceryItem[]>([])

  // Watch for changes to groceryList and automatically save to localStorage
  watch(groceryList, (newList) => {
    try {
      const listData = {
        items: newList,
        savedAt: new Date().toISOString()
      }
      localStorage.setItem('groceryList', JSON.stringify(listData))
    } catch (error) {
      console.error('Error saving grocery list to localStorage:', error)
    }
  }, { deep: true })

  const addIngredients = (ingredients: (SpoonacularIngredient | any)[]) => {    
    const newItems: GroceryItem[] = ingredients.map((ingredient, index) => ({
      id: `ingredient-${Date.now()}-${index}`,
      name: ingredient.nameClean || ingredient.name || ingredient.original || 'Unknown ingredient',
      amount: ingredient.amount?.toString() || '1',
      unit: ingredient.unit || '',
      checked: false,
      aisle: ingredient.aisle || 'Other'
    }))
    
    groceryList.value.push(...newItems)
  }

  const toggleItem = (id: string) => {
    const item = groceryList.value.find(item => item.id === id)
    if (item) {
      item.checked = !item.checked
    }
  }

  const clearList = () => {
    groceryList.value = []
    // Also clear from localStorage to persist the change
    localStorage.removeItem('groceryList')
  }

  const saveList = async () => {
    try {
      const listData: SaveGroceryListRequest = {
        items: groceryList.value,
        savedAt: new Date().toISOString()
      }
      
      const response = await groceryListsService.saveGroceryList(listData)
      
      if (response.success) {
        console.log('Grocery list saved successfully:', response.data)
        return response.data
      } else {
        throw new Error(response.message || 'Failed to save grocery list')
      }
    } catch (error) {
      console.error('Error saving grocery list:', error)
      throw error
    }
  }

  const loadList = () => {
    try {
      const savedData = localStorage.getItem('groceryList')
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        groceryList.value = parsedData.items || []
        console.log('Grocery list loaded successfully')
      }
    } catch (error) {
      console.error('Error loading grocery list:', error)
    }
  }

  const loadSavedList = async (listId: string) => {
    try {
      console.log('Loading saved list with ID:', listId)
      const response = await groceryListsService.getGroceryList(listId)
      
      if (response.success && response.data) {
        groceryList.value = response.data.items
        console.log('Saved grocery list loaded successfully:', response.data.name)
        return response.data
      } else {
        throw new Error(response.message || 'Failed to load saved grocery list')
      }
    } catch (error) {
      console.error('Error loading saved grocery list:', error)
      throw error
    }
  }

  return {
    groceryList,
    addIngredients,
    toggleItem,
    clearList,
    saveList,
    loadList,
    loadSavedList
  }
})
