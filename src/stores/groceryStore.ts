import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { groceryListsService } from '@/services/groceryListsService'
import { groceryListService } from '@/services/groceryListService'
import { useAuthStore } from '@/stores/auth'
import type { SaveGroceryListRequest } from '@/typings/services/SaveGroceryListRequest'
import type { GroceryItem } from '@/typings/services/GroceryItem'
import type { SpoonacularIngredient } from '@/typings/services/SpoonacularIngredient'



export const useGroceryStore = defineStore('grocery', () => {
  const groceryList = ref<GroceryItem[]>([])
  const isLoading = ref(false)
  const isOffline = ref(false)
  const lastSyncTime = ref<Date | null>(null)
  const currentUserId = ref<string | null>(null)

  // Helper function to validate user authentication
  const validateUser = () => {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated || !authStore.user) {
      throw new Error('User not authenticated')
    }
    return authStore.user.id
  }

  // Watch for changes to groceryList and automatically save to Supabase
  watch(groceryList, async (newList) => {
    if (isLoading.value) return // Prevent infinite loops during loading
    
    try {
      // Only sync if user is authenticated
      const userId = validateUser()
      currentUserId.value = userId
      
      await saveToSupabase(newList)
    } catch (error) {
      console.error('Failed to sync to Supabase:', error)
      isOffline.value = true
      // Fallback: save to localStorage as backup (with user ID)
      saveToLocalStorage(newList)
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

  // Helper function to save to Supabase
  const saveToSupabase = async (items: GroceryItem[]) => {
    try {
      await groceryListService.saveItems(items)
      lastSyncTime.value = new Date()
      isOffline.value = false
    } catch (error) {
      throw error
    }
  }

  // Helper function to save to localStorage as fallback
  const saveToLocalStorage = (items: GroceryItem[]) => {
    try {
      const userId = currentUserId.value || 'anonymous'
      const listData = {
        items,
        userId,
        savedAt: new Date().toISOString()
      }
      localStorage.setItem(`groceryList_${userId}`, JSON.stringify(listData))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  // Helper function to load from localStorage as fallback
  const loadFromLocalStorage = (userId?: string): GroceryItem[] => {
    try {
      const targetUserId = userId || currentUserId.value || 'anonymous'
      const savedData = localStorage.getItem(`groceryList_${targetUserId}`)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        // Verify the data belongs to the current user
        if (parsedData.userId === targetUserId) {
          return parsedData.items || []
        }
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
    }
    return []
  }

  const clearList = async () => {
    try {
      // Validate user authentication
      const userId = validateUser()
      currentUserId.value = userId
      
      groceryList.value = []
      await groceryListService.clearList()
      
      // Clear user-specific localStorage fallback
      localStorage.removeItem(`groceryList_${userId}`)
    } catch (error) {
      console.error('Failed to clear list:', error)
      // Still clear locally even if Supabase fails
      groceryList.value = []
      if (currentUserId.value) {
        localStorage.removeItem(`groceryList_${currentUserId.value}`)
      }
    }
  }

  const saveList = async () => {
    try {
      const listData: SaveGroceryListRequest = {
        items: groceryList.value,
        savedAt: new Date().toISOString()
      }
      
      const response = await groceryListsService.saveGroceryList(listData)
      
      if (response.success) {
        return response.data
      } else {
        throw new Error(response.message || 'Failed to save grocery list')
      }
    } catch (error) {
      throw error
    }
  }

  const loadList = async () => {
    isLoading.value = true
    try {
      // Validate user authentication
      const userId = validateUser()
      currentUserId.value = userId
      
      // Try to load from Supabase first
      const activeList = await groceryListService.getActiveList()
      if (activeList && activeList.items) {
        groceryList.value = activeList.items
        lastSyncTime.value = new Date()
        isOffline.value = false
        return
      }
    } catch (error) {
      console.error('Failed to load from Supabase:', error)
      isOffline.value = true
    }

    // Fallback to localStorage if Supabase fails
    try {
      const fallbackItems = loadFromLocalStorage(currentUserId.value)
      if (fallbackItems.length > 0) {
        groceryList.value = fallbackItems
      }
    } catch (error) {
      console.error('Failed to load from localStorage fallback:', error)
    } finally {
      isLoading.value = false
    }
  }

  const loadSavedList = async (listId: string) => {
    try {
      const response = await groceryListsService.getGroceryList(listId)
      
      if (response.success && response.data) {
        groceryList.value = response.data.items
        return response.data
      } else {
        throw new Error(response.message || 'Failed to load saved grocery list')
      }
    } catch (error) {
      throw error
    }
  }

  // Sync function to manually sync with Supabase
  const syncWithSupabase = async () => {
    try {
      const userId = validateUser()
      currentUserId.value = userId
      await saveToSupabase(groceryList.value)
    } catch (error) {
      console.error('Failed to sync with Supabase:', error)
      throw error
    }
  }

  // Function to clear all user data (called on logout)
  const clearUserData = () => {
    groceryList.value = []
    currentUserId.value = null
    isOffline.value = false
    lastSyncTime.value = null
    
    // Clear all localStorage entries for this user
    if (currentUserId.value) {
      localStorage.removeItem(`groceryList_${currentUserId.value}`)
    }
  }

  return {
    // State
    groceryList,
    isLoading,
    isOffline,
    lastSyncTime,
    currentUserId,
    
    // Actions
    addIngredients,
    toggleItem,
    clearList,
    saveList,
    loadList,
    loadSavedList,
    syncWithSupabase,
    clearUserData
  }
})
