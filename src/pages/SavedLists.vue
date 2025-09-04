<template>
  <div class="saved-lists">
    <h2 class="saved-lists__title">Saved Lists</h2>
    <p class="saved-lists__description">
      View and manage your previously saved grocery lists.
    </p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.saved-lists {
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