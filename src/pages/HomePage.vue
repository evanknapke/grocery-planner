<template>
  <div class="home">
    <h2 class="home__title">Welcome to Grocery Planner</h2>
    <p class="home__description">
      Plan your meals, search for recipes, and manage your grocery lists all in one place.
    </p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  padding: 2rem 0;

  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: $primary-color;
  }

  &__description {
    font-size: 1.1rem;
    color: $text-secondary;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}
</style>