<template>
  <div class="empty-container">
    <VCard variant="elevated" class="empty-card">
      <VIcon name="fileDocument" class="empty-icon" />
      <h2>No Saved Lists Yet</h2>
      <p>Create your first grocery list to get started! Your saved lists will appear here.</p>
      <VButton @click="$emit('create-list')" variant="primary" class="empty-button">
        Create New List
      </VButton>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { VButton, VIcon, VCard } from '@grocery-planner/design-system'

defineEmits<{
  'create-list': []
}>()
</script>

<style scoped lang="scss">
// Empty State
.empty-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  max-width: 1400px;
  margin: 0 auto;
}

.empty-card {
  text-align: center;
  max-width: 500px;
  width: 100%;

  .empty-icon {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
    color: $primary-color;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: $text-primary;
    margin-bottom: 1rem;
  }

  p {
    color: $text-secondary;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .empty-button {
    margin-top: 1rem;
  }
}
</style>
