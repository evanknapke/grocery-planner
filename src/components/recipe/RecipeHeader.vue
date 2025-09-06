<template>
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
      
      <div class="recipe-tags" v-if="recipe.diets && recipe.diets.length > 0">
        <span
          v-for="diet in recipe.diets"
          :key="diet"
          class="tag diet-tag"
        >
          {{ diet }}
        </span>
      </div>

      <div class="recipe-tags" v-if="recipe.cuisines && recipe.cuisines.length > 0">
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
</template>

<script setup lang="ts">
import type { RecipeDetails } from '@/typings/services/RecipeDetails'

defineProps<{
  recipe: RecipeDetails
}>()
</script>

<style scoped lang="scss">
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
</style>
