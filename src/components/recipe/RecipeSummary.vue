<template>
  <div class="recipe-section">
    <h2>Summary</h2>
    <div class="summary" v-html="summary"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  summary: string
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

  .summary {
    font-size: 1.1rem;
    line-height: 1.6;
    color: $text-secondary;
  }
}
</style>
