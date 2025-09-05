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
    path: '/search',
    name: 'SearchRecipes',
    title: 'Search Recipes',
    component: () => import('@/pages/SearchRecipes.vue'),
  },
  {
    path: '/grocery-list',
    name: 'GroceryList',
    title: 'Grocery List',
    component: () => import('@/pages/GroceryList.vue'),
  },
  {
    path: '/saved-lists',
    name: 'SavedLists',
    title: 'Saved Lists',
    component: () => import('@/pages/SavedLists.vue')
  }
]

export default TopLevelRoutes