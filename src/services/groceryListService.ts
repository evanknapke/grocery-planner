import { supabase } from '@/lib/supabaseClient'
import type { GroceryItem } from '@/typings/services/GroceryItem'

export interface GroceryList {
  id: string
  user_id: string
  name: string
  created_at: string
  updated_at: string
  is_active: boolean
  items?: GroceryItem[]
}

export interface GroceryItemDB {
  id: string
  list_id: string
  name: string
  amount?: string
  unit?: string
  checked: boolean
  aisle?: string
  created_at: string
  updated_at: string
  sort_order: number
}

class GroceryListService {
  /**
   * Get the user's active grocery list with items
   */
  async getActiveList(): Promise<GroceryList | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      // Get the active list
      const { data: list, error: listError } = await supabase
        .from('grocery_lists')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single()

      if (listError) {
        if (listError.code === 'PGRST116') {
          // No active list found, create one
          return await this.createActiveList()
        }
        throw listError
      }

      // Get items for this list
      const { data: items, error: itemsError } = await supabase
        .from('grocery_items')
        .select('*')
        .eq('list_id', list.id)
        .order('sort_order', { ascending: true })

      if (itemsError) throw itemsError

      return {
        ...list,
        items: items || []
      }
    } catch (error) {
      console.error('Error fetching active list:', error)
      throw error
    }
  }

  /**
   * Create a new active grocery list
   */
  async createActiveList(name: string = 'My Grocery List'): Promise<GroceryList> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Deactivate any existing active lists
      await supabase
        .from('grocery_lists')
        .update({ is_active: false })
        .eq('user_id', user.id)
        .eq('is_active', true)

      // Create new active list
      const { data: list, error } = await supabase
        .from('grocery_lists')
        .insert({
          user_id: user.id,
          name,
          is_active: true
        })
        .select()
        .single()

      if (error) throw error

      return {
        ...list,
        items: []
      }
    } catch (error) {
      console.error('Error creating active list:', error)
      throw error
    }
  }

  /**
   * Save grocery items to the active list
   */
  async saveItems(items: GroceryItem[]): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Get or create active list
      let activeList = await this.getActiveList()
      if (!activeList) {
        activeList = await this.createActiveList()
      }

      // Clear existing items
      await supabase
        .from('grocery_items')
        .delete()
        .eq('list_id', activeList.id)

      // Insert new items
      if (items.length > 0) {
        const itemsToInsert = items.map((item, index) => ({
          list_id: activeList!.id,
          name: item.name,
          amount: item.amount,
          unit: item.unit,
          checked: item.checked,
          aisle: item.aisle,
          sort_order: index
        }))

        const { error } = await supabase
          .from('grocery_items')
          .insert(itemsToInsert)

        if (error) throw error
      }
    } catch (error) {
      console.error('Error saving items:', error)
      throw error
    }
  }

  /**
   * Update a single item
   */
  async updateItem(itemId: string, updates: Partial<GroceryItem>): Promise<void> {
    try {
      const { error } = await supabase
        .from('grocery_items')
        .update({
          name: updates.name,
          amount: updates.amount,
          unit: updates.unit,
          checked: updates.checked,
          aisle: updates.aisle
        })
        .eq('id', itemId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating item:', error)
      throw error
    }
  }

  /**
   * Delete an item
   */
  async deleteItem(itemId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('grocery_items')
        .delete()
        .eq('id', itemId)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting item:', error)
      throw error
    }
  }

  /**
   * Clear all items from the active list
   */
  async clearList(): Promise<void> {
    try {
      const activeList = await this.getActiveList()
      if (!activeList) return

      const { error } = await supabase
        .from('grocery_items')
        .delete()
        .eq('list_id', activeList.id)

      if (error) throw error
    } catch (error) {
      console.error('Error clearing list:', error)
      throw error
    }
  }

  /**
   * Get saved lists (for future use)
   */
  async getSavedLists(): Promise<GroceryList[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      const { data: lists, error } = await supabase
        .from('grocery_lists')
        .select(`
          *,
          grocery_items (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return lists || []
    } catch (error) {
      console.error('Error fetching saved lists:', error)
      throw error
    }
  }
}

export const groceryListService = new GroceryListService()
