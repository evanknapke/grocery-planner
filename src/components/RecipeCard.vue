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
        <i class="icon-clock"></i>
        {{ recipe.readyInMinutes }} min
      </span>
      <span class="recipe-card__servings">
        <i class="icon-users"></i>
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
import VButton from '@/components/ui/VButton.vue'
import VCard from '@/components/ui/VCard.vue'

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
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-shrink: 0;
  }

  &__button {
    width: 100%;
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
