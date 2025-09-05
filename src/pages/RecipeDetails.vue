<template>
  <div class="recipe-details">
    <div v-if="isLoading" class="loading">
      <p>Loading recipe details...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="goBack" class="back-button">Go Back</button>
    </div>

    <div v-if="showSuccessMessage" class="success-message">
      <p>✅ Ingredients added to your grocery list!</p>
    </div>

    <div v-else-if="recipe" class="recipe-content">
      <button @click="goBack" class="back-button">
        ← Back to Search
      </button>

      <div class="recipe-header">
        <div class="recipe-image">
          <img :src="recipe.image" :alt="recipe.title" />
        </div>
        <div class="recipe-info">
          <h1 class="recipe-title">{{ recipe.title }}</h1>
          <div class="recipe-meta">
            <div class="meta-item">
              <span class="meta-label">Ready in:</span>
              <span class="meta-value">{{ recipe.readyInMinutes }} minutes</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Servings:</span>
              <span class="meta-value">{{ recipe.servings }}</span>
            </div>
            <div class="meta-item" v-if="recipe.preparationMinutes">
              <span class="meta-label">Prep time:</span>
              <span class="meta-value">{{ recipe.preparationMinutes }} minutes</span>
            </div>
            <div class="meta-item" v-if="recipe.cookingMinutes">
              <span class="meta-label">Cook time:</span>
              <span class="meta-value">{{ recipe.cookingMinutes }} minutes</span>
            </div>
          </div>
          
          <div class="recipe-tags" v-if="recipe.diets.length > 0">
            <span
              v-for="diet in recipe.diets"
              :key="diet"
              class="tag diet-tag"
            >
              {{ diet }}
            </span>
          </div>

          <div class="recipe-tags" v-if="recipe.cuisines.length > 0">
            <span
              v-for="cuisine in recipe.cuisines"
              :key="cuisine"
              class="tag cuisine-tag"
            >
              {{ cuisine }}
            </span>
          </div>
        </div>
      </div>

      <div class="recipe-body">
        <div class="recipe-section">
          <h2>Summary</h2>
          <div class="summary" v-html="recipe.summary"></div>
        </div>

        <div class="recipe-section" v-if="recipe.extendedIngredients && recipe.extendedIngredients.length > 0">
          <h2>Ingredients</h2>
          <ul class="ingredients-list">
            <li
              v-for="ingredient in recipe.extendedIngredients"
              :key="ingredient.id"
              class="ingredient-item"
            >
              <span class="ingredient-amount">{{ ingredient.amount }} {{ ingredient.unit }}</span>
              <span class="ingredient-name">{{ ingredient.name }}</span>
            </li>
          </ul>
        </div>

        <div class="recipe-section" v-if="recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0">
          <h2>Instructions</h2>
          <div class="instructions">
            <div
              v-for="instruction in recipe.analyzedInstructions"
              :key="instruction.name"
              class="instruction-group"
            >
              <h3 v-if="instruction.name" class="instruction-group-title">{{ instruction.name }}</h3>
              <ol class="instruction-steps">
                <li
                  v-for="step in instruction.steps"
                  :key="step.number"
                  class="instruction-step"
                >
                  {{ step.step }}
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div class="recipe-section" v-if="recipe.sourceUrl">
          <h2>Source</h2>
          <a :href="recipe.sourceUrl" target="_blank" class="source-link">
            View Original Recipe
          </a>
        </div>

        <div class="recipe-section">
          <h2>Grocery List</h2>
          <div class="grocery-actions">
            <button 
              @click="generateGroceryList" 
              class="grocery-button"
              :disabled="!recipe.extendedIngredients || recipe.extendedIngredients.length === 0"
            >
              <span class="grocery-button__icon">🛒</span>
              Generate Grocery List
            </button>
            <button 
              @click="goToGroceryList" 
              class="grocery-button grocery-button--secondary"
              v-if="groceryList.length > 0"
            >
              <span class="grocery-button__icon">📋</span>
              View Grocery List ({{ groceryList.length }} items)
            </button>
          </div>
          <p class="grocery-help-text">
            Add all ingredients from this recipe to your grocery list for easy shopping.
          </p>
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

const route = useRoute()
const router = useRouter()
const recipeStore = useRecipeStore()
const groceryStore = useGroceryStore()

const isLoading = ref(false)
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

  isLoading.value = true
  error.value = ''

  try {
    await recipeStore.getRecipeById(recipeId)
  } catch (err) {
    error.value = 'Failed to load recipe details. Please try again.'
    console.error('Recipe loading error:', err)
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.back()
}

const generateGroceryList = () => {
  if (!recipe.value?.extendedIngredients) return
  
  try {
    groceryStore.addIngredients(recipe.value.extendedIngredients)
    showSuccessMessage.value = true
    
    // Hide success message after 3 seconds
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

.recipe-content {
  .recipe-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
    align-items: start;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .recipe-image {
    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
  }

  .recipe-info {
    .recipe-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: $text-primary;
      line-height: 1.2;
    }

    .recipe-meta {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;

      .meta-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .meta-label {
          font-size: 0.9rem;
          color: $text-secondary;
          font-weight: 500;
        }

        .meta-value {
          font-size: 1.1rem;
          color: $text-primary;
          font-weight: 600;
        }
      }
    }

    .recipe-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;

      .tag {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;

        &.diet-tag {
          background-color: #e8f5e8;
          color: #2d5a2d;
        }

        &.cuisine-tag {
          background-color: #fff3e0;
          color: #e65100;
        }
      }
    }
  }
}

.recipe-body {
  .recipe-section {
    margin-bottom: 3rem;

    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: $text-primary;
      border-bottom: 2px solid $primary-color;
      padding-bottom: 0.5rem;
    }

    .summary {
      font-size: 1.1rem;
      line-height: 1.6;
      color: $text-secondary;
    }

    .ingredients-list {
      list-style: none;
      padding: 0;

      .ingredient-item {
        display: flex;
        gap: 1rem;
        padding: 0.75rem 0;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }

        .ingredient-amount {
          font-weight: 600;
          color: $primary-color;
          min-width: 100px;
        }

        .ingredient-name {
          color: $text-primary;
        }
      }
    }

    .instructions {
      .instruction-group {
        margin-bottom: 2rem;

        .instruction-group-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: $text-primary;
        }

        .instruction-steps {
          list-style: none;
          counter-reset: step-counter;
          padding: 0;

          .instruction-step {
            counter-increment: step-counter;
            position: relative;
            padding: 1rem 0 1rem 3rem;
            border-bottom: 1px solid #f0f0f0;
            line-height: 1.6;
            color: $text-primary;

            &:last-child {
              border-bottom: none;
            }

            &::before {
              content: counter(step-counter);
              position: absolute;
              left: 0;
              top: 1rem;
              background-color: $primary-color;
              color: white;
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              font-size: 0.9rem;
            }
          }
        }
      }
    }

    .source-link {
      display: inline-block;
      background-color: $primary-color;
      color: white;
      padding: 1rem 2rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }

    .grocery-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }

    .grocery-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 1rem;

      &--secondary {
        background-color: #f5f5f5;
        color: $text-primary;
        border: 2px solid #e0e0e0;

        &:hover {
          background-color: #eeeeee;
          border-color: #ccc;
        }
      }

      &:not(.grocery-button--secondary) {
        background-color: $secondary-color;
        color: white;

        &:hover:not(:disabled) {
          background-color: darken($secondary-color, 10%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
        }
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        opacity: 0.6;
      }

      &__icon {
        font-size: 1.2rem;
      }
    }

    .grocery-help-text {
      color: $text-secondary;
      font-size: 0.95rem;
      line-height: 1.5;
      margin: 0;
    }
  }
}
</style>
