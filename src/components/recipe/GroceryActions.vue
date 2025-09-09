<template>
  <div class="grocery-actions-section">
    <div class="section-header">
      <VIcon name="cart" class="section-icon" />
      <h2>Grocery List</h2>
    </div>
    
    <div class="grocery-card">
      <div class="grocery-content">
        <div class="grocery-info">
          <VIcon name="fileDocument" class="grocery-icon" />
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
            class="grocery-button"
            leading-icon="cartPlus"
          >
            Add to Grocery List
          </VButton>
          
          <VButton 
            @click="emit('go-to-grocery-list')" 
            variant="secondary"
            v-if="groceryList.length > 0"
            class="grocery-button"
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
import VIcon from '@/components/ui/VIcon.vue'

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
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    margin-top: 0.25rem;
    color: $primary-color;
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
}

.grocery-button {
  width: 100%;
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
      width: 1.5rem;
      height: 1.5rem;
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
  
  .grocery-actions {
    gap: 0.75rem;
  }
}
</style>
