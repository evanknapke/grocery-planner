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
      console.log('Attempting to sign up user:', email)

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
        console.log('User signed up successfully:', data.user.email)
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
      console.log('Attempting to sign in user:', email)

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
        console.log('User signed in successfully:', data.user.email)
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
      console.log('Attempting to sign out user')

      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Sign out error:', error)
        throw new Error(error.message)
      }

      user.value = null
      session.value = null
      console.log('User signed out successfully')

      return { success: true }
    } catch (error) {
      console.error('Sign out failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async () => {
    try {
      loading.value = true
      console.log('Fetching current user session')

      const { data: { session: currentSession }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error fetching session:', error)
        throw new Error(error.message)
      }

      if (currentSession?.user) {
        user.value = currentSession.user
        session.value = currentSession
        console.log('User session restored:', currentSession.user.email)
      } else {
        user.value = null
        session.value = null
        console.log('No active user session found')
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
      supabase.auth.onAuthStateChange((event, newSession) => {
        console.log('Auth state changed:', event, newSession?.user?.email)
        
        if (newSession?.user) {
          user.value = newSession.user
          session.value = newSession
        } else {
          user.value = null
          session.value = null
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
