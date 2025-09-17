<template>
  <div class="recipe-source-section" v-if="sourceUrl">
    <div class="section-header">
      <VIcon name="link" class="section-icon" />
      <h2>Recipe Source</h2>
    </div>
    
    <VCard variant="elevated" class="source-card">
      <div class="source-content">
        <div class="source-info">
          <VIcon name="web" class="source-icon" />
          <div class="source-text">
            <h3>Original Recipe</h3>
            <p>View the original recipe from the source website for additional details and variations.</p>
          </div>
        </div>
        
        <VButton 
          :href="sourceUrl" 
          target="_blank" 
          variant="primary"
          class="source-button"
          leading-icon="openInNew"
        >
          Visit Original Recipe
        </VButton>
      </div>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { VButton, VIcon, VCard } from '@grocery-planner/design-system'

defineProps<{
  sourceUrl: string
}>()
</script>

<style scoped lang="scss">
.recipe-source-section {
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


.source-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.source-info {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .source-icon {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    margin-top: 0.25rem;
    color: $primary-color;
  }

  .source-text {
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: $text-primary;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: $text-secondary;
      font-size: 1rem;
      line-height: 1.6;
      margin: 0;
    }
  }
}

.source-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;

  .button-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  .external-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .source-content {
    gap: 1.5rem;
  }
  
  .source-info {
    gap: 0.75rem;
    
    .source-icon {
      font-size: 1.5rem;
    }
    
    .source-text h3 {
      font-size: 1.125rem;
    }
  }
  
  .section-header {
    margin-bottom: 1rem;
    
    h2 {
      font-size: 1.25rem;
    }
  }
}
</style>
