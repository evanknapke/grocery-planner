import type { RouteRecord } from '@/typings/RouteRecord'

const TopLevelRoutes: RouteRecord[] = [
  {
    path: '',
    name: 'Home',
    title: 'Home',
    hideFromNavigation: true,
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/recipes',
    name: 'Recipes',
    title: 'Recipes',
    component: () => import('@/pages/SearchRecipes.vue'),
  },
  {
    path: '/recipes/:id',
    name: 'RecipeDetails',
    title: 'Recipe Details',
    hideFromNavigation: true,
    component: () => import('@/pages/RecipeDetails.vue'),
  },
  {
    path: '/grocery-list',
    name: 'GroceryList',
    title: 'Grocery List',
    meta: { requiresAuth: true },
    component: () => import('@/pages/GroceryList.vue'),
  },
  {
    path: '/saved-lists',
    name: 'SavedLists',
    title: 'Saved Lists',
    meta: { requiresAuth: true },
    component: () => import('@/pages/SavedLists.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    title: 'Authentication',
    hideFromNavigation: true,
    component: () => import('@/pages/AuthView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    title: 'Not Found',
    hideFromNavigation: true,
    redirect: '/'
  }
]

export default TopLevelRoutes