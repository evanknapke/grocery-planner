<template>
  <div class="recipe-source-section" v-if="sourceUrl">
    <div class="section-header">
      <div class="section-icon">🔗</div>
      <h2>Recipe Source</h2>
    </div>
    
    <div class="source-card">
      <div class="source-content">
        <div class="source-info">
          <div class="source-icon">🌐</div>
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
          leading-icon="link"
          trailing-icon="openInNew"
        >
          Visit Original Recipe
        </VButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'

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
    font-size: 1.5rem;
    background: linear-gradient(135deg, $primary-color, $primary-dark);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: $text-primary;
    margin: 0;
  }
}

.source-card {
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
    font-size: 2rem;
    flex-shrink: 0;
    margin-top: 0.25rem;
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
  .source-card {
    padding: 1.5rem;
  }
  
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
