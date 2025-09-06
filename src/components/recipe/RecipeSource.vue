<template>
  <div class="recipe-section" v-if="sourceUrl">
    <h2>Source</h2>
    <a :href="sourceUrl" target="_blank" class="source-link">
      View Original Recipe
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sourceUrl: string
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

  .source-link {
    display: inline-block;
    background-color: $primary-color;
    color: white;
    padding: 1rem 2rem;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}
</style>
