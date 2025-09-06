<template>
  <div class="search-recipes">
    <div class="search-recipes__header">
      <h2 class="search-recipes__title">Search Recipes</h2>
      <p class="search-recipes__description">
        Find delicious recipes for your meal planning.
      </p>
    </div>

    <div class="search-recipes__search">
      <div class="search-input">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for recipes..."
          class="search-input__field"
          @keyup.enter="handleSearch"
        />
        <button
          @click="handleSearch"
          class="search-input__button"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Searching...</span>
          <span v-else>Search</span>
        </button>
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

    <div v-else-if="hasSearched && !isLoading" class="no-results">
      <p>No recipes found. Try a different search term.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '@/stores/recipeStore'
import RecipeCard from '@/components/RecipeCard.vue'

const router = useRouter()
const recipeStore = useRecipeStore()

const searchQuery = ref('')
const isLoading = ref(false)
const error = ref('')
const hasSearched = ref(false)

const recipes = computed(() => recipeStore.recipes)

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return

  isLoading.value = true
  error.value = ''
  hasSearched.value = true

  try {
    await recipeStore.searchRecipes(searchQuery.value.trim())
  } catch (err) {
    error.value = 'Failed to search recipes. Please try again.'
    console.error('Search error:', err)
  } finally {
    isLoading.value = false
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
  }
}

.search-input {
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;

  &__field {
    flex: 1;
    padding: 1rem;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: $primary-color;
    }
  }

  &__button {
    padding: 1rem 2rem;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover:not(:disabled) {
      background-color: darken($primary-color, 10%);
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
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