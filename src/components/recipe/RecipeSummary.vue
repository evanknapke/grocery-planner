<template>
  <div class="recipe-section">
    <div class="section-header">
      <VIcon name="fileDocument" class="section-icon" />
      <h2>About This Recipe</h2>
    </div>
    <div class="summary-card">
      <div class="summary-content" v-html="summary"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VIcon from '@/components/ui/VIcon.vue'

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
  background: $surface;
  border-radius: $border-radius-lg;
  padding: 2rem;
  box-shadow: $shadow-md;
  border: 1px solid $border;
  transition: all $transition-fast;

  &:hover {
    box-shadow: $shadow-lg;
    transform: translateY(-2px);
  }

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
  .summary-card {
    padding: 1.5rem;
  }
  
  .section-header {
    margin-bottom: 1rem;
    
    h2 {
      font-size: 1.25rem;
    }
  }
}
</style>
