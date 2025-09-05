import { ref } from 'vue'
import { defineStore } from 'pinia'

interface GroceryItem {
  id: string
  name: string
  amount: string
  unit: string
  checked: boolean
  category?: string
}

export const useGroceryStore = defineStore('grocery', () => {
  const groceryList = ref<GroceryItem[]>([])

  const addIngredients = (ingredients: any[]) => {
    const newItems: GroceryItem[] = ingredients.map((ingredient, index) => ({
      id: `ingredient-${Date.now()}-${index}`,
      name: ingredient.name || ingredient.original || 'Unknown ingredient',
      amount: ingredient.amount?.toString() || '1',
      unit: ingredient.unit || '',
      checked: false,
      category: ingredient.category || 'Other'
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
  }

  const saveList = () => {
    try {
      const listData = {
        items: groceryList.value,
        savedAt: new Date().toISOString()
      }
      localStorage.setItem('groceryList', JSON.stringify(listData))
      console.log('Grocery list saved successfully')
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

  return {
    groceryList,
    addIngredients,
    toggleItem,
    clearList,
    saveList,
    loadList
  }
})
