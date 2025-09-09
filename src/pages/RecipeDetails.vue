<template>
  <div class="recipe-details">
    <div v-if="error" class="error">
      <p>{{ error }}</p>
      <VButton @click="goBack" variant="outline">Go Back</VButton>
    </div>

    <div v-if="showSuccessMessage" class="success-message">
      <p>✅ Ingredients added to your grocery list!</p>
    </div>
    <div v-else-if="recipe" class="recipe-content">
      <VButton @click="goBack" variant="outline">
        ← Back to Search
      </VButton>
      <RecipeHeader :recipe="recipe" />
      <div class="recipe-body">
        <RecipeSummary :summary="recipe.summary" />
        <IngredientsList :ingredients="recipe.extendedIngredients" />
        <Instructions :instructions="recipe.analyzedInstructions" />
        <RecipeSource :source-url="recipe.sourceUrl" />
        <GroceryActions 
          :ingredients="recipe.extendedIngredients"
          :grocery-list="groceryList"
          @generate-grocery-list="generateGroceryList"
          @go-to-grocery-list="goToGroceryList"
        />
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
import RecipeHeader from '@/components/recipe/RecipeHeader.vue'
import RecipeSummary from '@/components/recipe/RecipeSummary.vue'
import IngredientsList from '@/components/recipe/IngredientsList.vue'
import Instructions from '@/components/recipe/Instructions.vue'
import RecipeSource from '@/components/recipe/RecipeSource.vue'
import VButton from '@/components/ui/VButton.vue'
import GroceryActions from '@/components/recipe/GroceryActions.vue'

const route = useRoute()
const router = useRouter()
const recipeStore = useRecipeStore()
const groceryStore = useGroceryStore()
const loadingStore = useLoadingStore()

const error = ref('')
const showSuccessMessage = ref(false)

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
    console.error('Recipe loading error:', err)
  }
}

const goBack = () => {
  router.back()
}

const generateGroceryList = () => {
  console.log('=== GENERATE GROCERY LIST CLICKED ===')
  console.log('Recipe data:', recipe.value)
  console.log('Extended ingredients:', recipe.value?.extendedIngredients)
  
  if (!recipe.value?.extendedIngredients) {
    console.log('No extended ingredients found!')
    return
  }
  
  try {
    console.log('Calling groceryStore.addIngredients with:', recipe.value.extendedIngredients.length, 'ingredients')
    groceryStore.addIngredients(recipe.value.extendedIngredients)
    showSuccessMessage.value = true
    
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  } catch (err) {
    console.error('Error adding ingredients to grocery list:', err)
    error.value = 'Failed to add ingredients to grocery list. Please try again.'
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  color: $text-secondary;
  font-size: 1.1rem;
}

.error {
  color: #c33;
}

.success-message {
  background-color: #e8f5e8;
  color: #2d5a2d;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
  border: 2px solid #4caf50;
}

.back-button {
  background: none;
  border: 2px solid $primary-color;
  color: $primary-color;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: $primary-color;
    color: white;
  }
}

</style>
