<template>
  <VCard
    variant="elevated"
    interactive
    @click="handleClick"
  >
    <template #image>
      <img
        :src="recipe.image"
        :alt="recipe.title"
        loading="lazy"
      />
    </template>
    
    <h3 class="recipe-card__title">{{ recipe.title }}</h3>
    <div class="recipe-card__meta">
      <span class="recipe-card__time">
        <VIcon name="clock" class="recipe-card__icon" />
        {{ recipe.readyInMinutes }} min
      </span>
      <span class="recipe-card__servings">
        <VIcon name="accountGroup" class="recipe-card__icon" />
        {{ recipe.servings }} servings
      </span>
    </div>
    <p class="recipe-card__summary" v-html="recipe.summary"></p>
    
    <template #footer>
      <VButton variant="outline" class="recipe-card__button">
        View Details
      </VButton>
    </template>
  </VCard>
</template>

<script setup lang="ts">
import type { RecipeSearchResult } from '@/typings/services/RecipeSearchResult'
import { VButton, VCard, VIcon } from '@grocery-planner/design-system'

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
  &__title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: $text-primary;
    line-height: 1.4;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      margin-bottom: 0.75rem;
    }

    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
  }

  &__meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: $text-secondary;

    @media (max-width: 768px) {
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      font-size: 0.85rem;
    }

    @media (max-width: 480px) {
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
      flex-wrap: wrap;
    }

    span {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      @media (max-width: 480px) {
        gap: 0.2rem;
      }
    }
  }

  &__summary {
    color: $text-secondary;
    line-height: 1.5;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-shrink: 0;

    @media (max-width: 768px) {
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    @media (max-width: 480px) {
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
      -webkit-line-clamp: 3;
      line-clamp: 3;
    }
  }

  &__button {
    width: 100%;

    @media (max-width: 480px) {
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
    }
  }
}

.recipe-card__icon {
  width: 1rem;
  height: 1rem;
  color: $text-secondary;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 0.9rem;
    height: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 0.8rem;
    height: 0.8rem;
  }
}
</style>
