<template>
  <div class="grocery-list">
    <h2 class="grocery-list__title">Grocery List</h2>
    <p class="grocery-list__description">
      Manage your current grocery list and track your shopping.
    </p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.grocery-list {
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