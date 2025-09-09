<template>
  <div class="search-recipes" :class="{ 'search-recipes--has-results': recipes.length > 0 || hasSearched }">
    <div class="search-recipes__header">
      <h2 class="search-recipes__title">Search Recipes</h2>
      <p class="search-recipes__description">
        Find delicious recipes for your meal planning.
      </p>
    </div>

    <div class="search-recipes__search">
      <div class="search-input">
        <VShortTextField
          v-model="searchQuery"
          type="search"
          placeholder="Search for recipes..."
          size="lg"
          @enter="handleSearch"
        />
        <VButton
          @click="handleSearch"
          variant="primary"
          size="lg"
          leading-icon="magnify"
        >
          Search
        </VButton>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="recipes.length > 0" class="recipes-grid">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        @click="viewRecipeDetails"
      />
    </div>

    <div v-else-if="hasSearched" class="no-results">
      <p>No recipes found. Try a different search term.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '@/stores/recipeStore'
import { useLoadingStore } from '@/stores/loadingStore'
import RecipeCard from '@/components/recipe/RecipeCard.vue'
import VButton from '@/components/ui/VButton.vue'
import VShortTextField from '@/components/ui/VShortTextField.vue'

const router = useRouter()
const recipeStore = useRecipeStore()
const loadingStore = useLoadingStore()

const searchQuery = ref('')
const error = ref('')
const hasSearched = ref(false)

const recipes = computed(() => recipeStore.recipes)

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return

  error.value = ''
  hasSearched.value = true

  try {
    await loadingStore.loadUntilResolved(async () => {
      return await recipeStore.searchRecipes(searchQuery.value.trim())
    })
  } catch (err) {
    error.value = 'Failed to search recipes. Please try again.'
    console.error('Search error:', err)
  }
}

const viewRecipeDetails = (recipeId: number) => {
  router.push(`/recipes/${recipeId}`)
}
</script>

<style scoped lang="scss">
.search-recipes {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 15vh;

  &__header {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: $primary-color;
    font-weight: 600;
  }

  &__description {
    color: $text-secondary;
    font-size: 1.1rem;
    margin-bottom: 0;
  }

  &__search {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  }
  
  // When there are results, move content to top
  &--has-results {
    justify-content: flex-start;
    min-height: auto;
    padding-top: 2rem;
  }
}

.search-input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  max-width: 600px;
  width: 100%;
}

.error-message {
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: $text-secondary;
  font-size: 1.1rem;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
</style>