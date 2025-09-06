<template>
  <div class="recipe-card" @click="handleClick">
    <div class="recipe-card__image">
      <img
        :src="recipe.image"
        :alt="recipe.title"
        loading="lazy"
      />
    </div>
    <div class="recipe-card__content">
      <h3 class="recipe-card__title">{{ recipe.title }}</h3>
      <div class="recipe-card__meta">
        <span class="recipe-card__time">
          <i class="icon-clock"></i>
          {{ recipe.readyInMinutes }} min
        </span>
        <span class="recipe-card__servings">
          <i class="icon-users"></i>
          {{ recipe.servings }} servings
        </span>
      </div>
      <p class="recipe-card__summary" v-html="recipe.summary"></p>
      <button class="recipe-card__button">
        View Details
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecipeSearchResult } from '@/typings/services/RecipeSearchResult'

const props = defineProps<{
  recipe: RecipeSearchResult
}>()

const emit = defineEmits<{
  (e: 'click', recipeId: number): void
}>()

const handleClick = () => {
  emit('click', props.recipe.id)
}
</script>

<style scoped lang="scss">
.recipe-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &__image {
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: $text-primary;
    line-height: 1.4;
  }

  &__meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: $text-secondary;

    span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }

  &__summary {
    color: $text-secondary;
    line-height: 1.5;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-shrink: 0;
  }

  &__button {
    width: 100%;
    padding: 0.75rem;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top: auto;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}

// Icon placeholders (you can replace with actual icons)
.icon-clock::before {
  content: "🕒";
}

.icon-users::before {
  content: "👥";
}
</style>
