<template>
  <div class="recipe-section">
    <div class="section-header">
      <VIcon name="fileDocument" class="section-icon" />
      <h2>About This Recipe</h2>
    </div>
    <VCard variant="elevated" class="summary-card">
      <div class="summary-content" v-html="summary"></div>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import VIcon from '@/components/ui/VIcon.vue'
import VCard from '@/components/ui/VCard.vue'

defineProps<{
  summary: string
}>()
</script>

<style scoped lang="scss">
.recipe-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  .section-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: $primary-color;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: $text-primary;
    margin: 0;
  }
}

.summary-card {
  .summary-content {
    font-size: 1.1rem;
    line-height: 1.7;
    color: $text-primary;

    :deep(p) {
      margin-bottom: 1rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(a) {
      color: $primary-color;
      text-decoration: none;
      font-weight: 500;
      border-bottom: 1px solid transparent;
      transition: all $transition-fast;

      &:hover {
        border-bottom-color: $primary-color;
      }
    }

    :deep(strong) {
      color: $text-primary;
      font-weight: 600;
    }

    :deep(em) {
      color: $text-secondary;
      font-style: italic;
    }
  }
}

@media (max-width: 768px) {
  .section-header {
    margin-bottom: 1rem;
    
    h2 {
      font-size: 1.25rem;
    }
  }
}
</style>
