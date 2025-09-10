<template>
  <div class="recipe-details">
    <div v-if="error" class="error-container">
      <div class="error-card">
        <VIcon name="alert" class="error-icon" />
        <h2>Oops! Something went wrong</h2>
        <p>{{ error }}</p>
        <VButton @click="goBack" variant="outline" class="error-button">
          Go Back
        </VButton>
      </div>
    </div>

    <div v-else-if="recipe" class="recipe-content">
      <div class="recipe-navigation">
        <VButton @click="goBack" variant="ghost" class="back-button" leading-icon="arrowLeft">
          Back to Search
        </VButton>
      </div>

      <RecipeHeader :recipe="recipe" />

      <div class="recipe-grid">
        <div class="recipe-main">
          <RecipeSummary :summary="recipe.summary" />
          <Instructions :instructions="recipe.analyzedInstructions" />
          <RecipeSource :source-url="recipe.sourceUrl" />
        </div>

        <div class="recipe-sidebar">
          <IngredientsList :ingredients="recipe.extendedIngredients" />
          <GroceryActions 
            :ingredients="recipe.extendedIngredients"
            :grocery-list="groceryList"
            @generate-grocery-list="generateGroceryList"
            @go-to-grocery-list="goToGroceryList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRecipeStore } from '@/stores/recipeStore'
import { useGroceryStore } from '@/stores/groceryStore'
import { useLoadingStore } from '@/stores/loadingStore'
import { useToastStore } from '@/stores/toastStore'
import RecipeHeader from '@/components/recipe/RecipeHeader.vue'
import RecipeSummary from '@/components/recipe/RecipeSummary.vue'
import IngredientsList from '@/components/recipe/IngredientsList.vue'
import Instructions from '@/components/recipe/Instructions.vue'
import RecipeSource from '@/components/recipe/RecipeSource.vue'
import VButton from '@/components/ui/VButton.vue'
import VIcon from '@/components/ui/VIcon.vue'
import GroceryActions from '@/components/recipe/GroceryActions.vue'

const route = useRoute()
const router = useRouter()
const recipeStore = useRecipeStore()
const groceryStore = useGroceryStore()
const loadingStore = useLoadingStore()
const toastStore = useToastStore()

const error = ref('')

const recipe = computed(() => recipeStore.selectedRecipe)
const groceryList = computed(() => groceryStore.groceryList)

const loadRecipe = async () => {
  const recipeId = parseInt(route.params.id as string)
  
  if (isNaN(recipeId)) {
    error.value = 'Invalid recipe ID'
    return
  }

  error.value = ''

  try {
    await loadingStore.loadUntilResolved(async () => {
      return await recipeStore.getRecipeById(recipeId)
    })
  } catch (err) {
    error.value = 'Failed to load recipe details. Please try again.'
    toastStore.error('Error', 'Failed to load recipe details. Please try again.', 6000)
  }
}

const goBack = () => {
  router.back()
}

const generateGroceryList = () => {
  if (!recipe.value?.extendedIngredients) {
    return
  }
  
  try {
    groceryStore.addIngredients(recipe.value.extendedIngredients)
    
    toastStore.success('Success!', 'Ingredients added to your grocery list!', 4000)
  } catch (err) {
    toastStore.error('Error', 'Failed to add ingredients to grocery list. Please try again.', 6000)
  }
}

const goToGroceryList = () => {
  router.push('/grocery-list')
}

onMounted(() => {
  loadRecipe()
})
</script>

<style scoped lang="scss">
.recipe-details {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

// Error State
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

.error-card {
  background: $surface;
  border-radius: $border-radius-lg;
  padding: 3rem;
  text-align: center;
  box-shadow: $shadow-xl;
  max-width: 500px;
  width: 100%;

  .error-icon {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
    color: #ef4444;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: $text-primary;
    margin-bottom: 1rem;
  }

  p {
    color: $text-secondary;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .error-button {
    margin-top: 1rem;
  }
}

// Success Toast
.success-toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  animation: slideInRight 0.3s ease-out;

  .success-content {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: $border-radius-md;
    box-shadow: $shadow-lg;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;

    .success-icon {
      width: 1.25rem;
      height: 1.25rem;
      color: white;
    }
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

// Main Content
.recipe-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 2rem;
  }
}

// Navigation
.recipe-navigation {
  padding: 2rem 0 1rem;
  
  .back-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: $text-secondary;
    font-weight: 500;
    transition: all $transition-fast;

    &:hover {
      color: $primary-color;
      transform: translateX(-2px);
    }

    .back-icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}

// Recipe Grid Layout
.recipe-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
}

.recipe-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.recipe-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 2rem;
  height: fit-content;

  @media (max-width: 1024px) {
    position: static;
  }
}

@media (max-width: 768px) {
  .recipe-content {
    padding: 0 1rem 2rem;
  }
  
  .recipe-navigation {
    padding: 1rem 0 0.5rem;
  }
  
  .recipe-grid {
    margin-top: 1rem;
  }
}
</style>
