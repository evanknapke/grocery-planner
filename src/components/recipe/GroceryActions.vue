<template>
  <div class="grocery-actions-section">
    <div class="section-header">
      <div class="section-icon">🛒</div>
      <h2>Grocery List</h2>
    </div>
    
    <div class="grocery-card">
      <div class="grocery-content">
        <div class="grocery-info">
          <div class="grocery-icon">📝</div>
          <div class="grocery-text">
            <h3>Add to Shopping List</h3>
            <p>Add all ingredients from this recipe to your grocery list for easy shopping.</p>
          </div>
        </div>
        
        <div class="grocery-actions">
          <VButton 
            @click="emit('generate-grocery-list')" 
            variant="primary"
            :disabled="!hasIngredients"
            class="grocery-button primary-button"
            leading-icon="cartPlus"
          >
            Add to Grocery List
          </VButton>
          
          <VButton 
            @click="emit('go-to-grocery-list')" 
            variant="secondary"
            v-if="groceryList.length > 0"
            class="grocery-button secondary-button"
            leading-icon="download"
          >
            View List ({{ groceryList.length }})
          </VButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VButton from '@/components/ui/VButton.vue'

// TODO: Figure out types for ingredients and groceryList
const props = defineProps<{
  ingredients: any[]
  groceryList: any[]
}>()

const emit = defineEmits<{
  'generate-grocery-list': []
  'go-to-grocery-list': []
}>()

const hasIngredients = computed(() => {
  return props.ingredients && props.ingredients.length > 0
})
</script>

<style scoped lang="scss">
.grocery-actions-section {
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

.grocery-card {
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

.grocery-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.grocery-info {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .grocery-icon {
    font-size: 2rem;
    flex-shrink: 0;
    margin-top: 0.25rem;
  }

  .grocery-text {
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

.grocery-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 480px) {
    flex-direction: row;
  }
}

.grocery-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: $border-radius-md;
  font-weight: 600;
  font-size: 1rem;
  transition: all $transition-fast;
  text-decoration: none;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .button-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  &.primary-button {
    background: linear-gradient(135deg, $primary-color, $primary-dark);
    color: white;
    box-shadow: $shadow-sm;

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, $primary-dark, darken($primary-dark, 10%));
      transform: translateY(-2px);
      box-shadow: $shadow-lg;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &.secondary-button {
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    color: $text-primary;
    border: 1px solid $border;

    &:hover {
      background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
      border-color: $primary-color;
      transform: translateY(-2px);
      box-shadow: $shadow-md;
    }

    &:active {
      transform: translateY(0);
    }
  }

  &:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
    box-shadow: none;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}

@media (max-width: 768px) {
  .grocery-card {
    padding: 1.5rem;
  }
  
  .grocery-content {
    gap: 1.5rem;
  }
  
  .grocery-info {
    gap: 0.75rem;
    
    .grocery-icon {
      font-size: 1.5rem;
    }
    
    .grocery-text h3 {
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
