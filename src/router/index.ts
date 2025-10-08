import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import TopLevelRoutes from './TopLevelRoutes'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: TopLevelRoutes
    }
  ]
})

// Route guard for authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if the route requires authentication
  const routeRequiresAuth = to.meta.requiresAuth === true
  
  console.log('Route guard:', {
    path: to.path,
    requiresAuth: routeRequiresAuth,
    isAuthenticated: authStore.isAuthenticated,
    loading: authStore.loading,
    initialized: authStore.initialized,
    meta: to.meta
  })
  
  // Wait for auth store to be initialized if it's not already
  if (!authStore.initialized) {
    console.log('Auth store not initialized, waiting...')
    await new Promise(resolve => {
      const checkInitialized = () => {
        if (authStore.initialized) {
          resolve(true)
        } else {
          setTimeout(checkInitialized, 50) // Check again in 50ms
        }
      }
      checkInitialized()
    })
    console.log('Auth store initialized, continuing...')
  }
  
  // If user is authenticated and trying to access auth page, redirect to home
  if (to.path === '/auth' && authStore.isAuthenticated) {
    console.log('Redirecting authenticated user away from auth page')
    next('/')
    return
  }
  
  // If route doesn't require auth, allow access
  if (!routeRequiresAuth) {
    console.log('Route does not require auth, allowing access')
    next()
    return
  }
  
  // If user is already authenticated, allow access
  if (authStore.isAuthenticated) {
    console.log('User is authenticated, allowing access')
    next()
    return
  }
  
  // If user is not authenticated and route requires auth, redirect to login
  console.log('User not authenticated, redirecting to login')
  next({
    path: '/auth',
    query: { redirect: to.fullPath }
  })
})

export default router
