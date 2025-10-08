import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'
import type { User, Session, AuthError } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const loading = ref<boolean>(false)
  const session = ref<Session | null>(null)
  const initialized = ref<boolean>(false)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email || null)
  const userId = computed(() => user.value?.id || null)

  // Actions
  const signUp = async (email: string, password: string) => {
    try {
      loading.value = true

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        console.error('Sign up error:', error)
        throw new Error(error.message)
      }

      if (data.user) {
        user.value = data.user
        session.value = data.session || null
      }

      return { success: true, user: data.user, session: data.session }
    } catch (error) {
      console.error('Sign up failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      loading.value = true

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Sign in error:', error)
        throw new Error(error.message)
      }

      if (data.user) {
        user.value = data.user
        session.value = data.session || null
      }

      return { success: true, user: data.user, session: data.session }
    } catch (error) {
      console.error('Sign in failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    try {
      loading.value = true

      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Sign out error:', error)
        throw new Error(error.message)
      }

      // Clear user data
      user.value = null
      session.value = null
      
      // Clear all user-specific data from other stores
      await clearUserData()

      return { success: true }
    } catch (error) {
      console.error('Sign out failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  // Helper function to clear all user-specific data
  const clearUserData = async () => {
    try {
      // Import and clear grocery store data
      const { useGroceryStore } = await import('@/stores/groceryStore')
      const groceryStore = useGroceryStore()
      
      // Use the grocery store's clearUserData function
      groceryStore.clearUserData()
    } catch (error) {
      console.error('Failed to clear user data:', error)
    }
  }

  // Helper function to load user-specific data
  const loadUserData = async () => {
    try {
      // Import and load grocery store data
      const { useGroceryStore } = await import('@/stores/groceryStore')
      const groceryStore = useGroceryStore()
      
      // Load grocery list data
      await groceryStore.loadList()
    } catch (error) {
      console.error('Failed to load user data:', error)
    }
  }

  const fetchUser = async () => {
    try {
      loading.value = true

      const { data: { session: currentSession }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error fetching session:', error)
        throw new Error(error.message)
      }

      if (currentSession?.user) {
        user.value = currentSession.user
        session.value = currentSession
      } else {
        user.value = null
        session.value = null
      }

      return { success: true, user: currentSession?.user, session: currentSession }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  // Initialize auth state and set up session listener
  const initializeAuth = async () => {
    try {
      // Fetch initial session
      await fetchUser()

      // Listen for auth state changes
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        
        if (newSession?.user) {
          user.value = newSession.user
          session.value = newSession
          
          // Load user data when they sign in
          if (event === 'SIGNED_IN') {
            await loadUserData()
          }
        } else {
          user.value = null
          session.value = null
          
          // Clear user data when they sign out
          if (event === 'SIGNED_OUT') {
            await clearUserData()
          }
        }
      })
    } finally {
      // Mark as initialized regardless of success/failure
      initialized.value = true
    }
  }

  return {
    // State
    user,
    loading,
    session,
    initialized,
    
    // Getters
    isAuthenticated,
    userEmail,
    userId,
    
    // Actions
    signUp,
    signIn,
    signOut,
    fetchUser,
    initializeAuth
  }
})
