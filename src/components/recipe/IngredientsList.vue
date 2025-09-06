<template>
  <div class="recipe-section" v-if="ingredients && ingredients.length > 0">
    <h2>Ingredients</h2>
    <ul class="ingredients-list">
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="ingredient-item"
      >
        <span class="ingredient-amount">{{ ingredient.amount }} {{ ingredient.unit }}</span>
        <span class="ingredient-name">{{ ingredient.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// TODO: Figure out type for ingredients
defineProps<{
  ingredients: any[]
}>()
</script>

<style scoped lang="scss">
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
}
</style>
