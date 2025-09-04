<template>
  <div class="search-recipes">
    <h2 class="search-recipes__title">Search Recipes</h2>
    <p class="search-recipes__description">
      Find delicious recipes for your meal planning.
    </p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.search-recipes {
  &__title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: $primary-color;
  }

  &__description {
    color: $text-secondary;
    margin-bottom: 2rem;
  }
}
</style>