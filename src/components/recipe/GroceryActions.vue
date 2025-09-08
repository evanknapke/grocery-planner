<template>
  <div class="recipe-section">
    <h2>Grocery List</h2>
    <div class="grocery-actions">
      <VButton 
        @click="emit('generate-grocery-list')" 
        variant="primary"
        :disabled="!hasIngredients"
      >
        <span class="grocery-button__icon">🛒</span>
        Generate Grocery List
      </VButton>
      <VButton 
        @click="emit('go-to-grocery-list')" 
        variant="secondary"
        v-if="groceryList.length > 0"
      >
        <span class="grocery-button__icon">📋</span>
        View Grocery List ({{ groceryList.length }} items)
      </VButton>
    </div>
    <p class="grocery-help-text">
      Add all ingredients from this recipe to your grocery list for easy shopping.
    </p>
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

  .grocery-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .grocery-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1rem;

    &--secondary {
      background-color: #f5f5f5;
      color: $text-primary;
      border: 2px solid #e0e0e0;

      &:hover {
        background-color: #eeeeee;
        border-color: #ccc;
      }
    }

    &:not(.grocery-button--secondary) {
      background-color: $secondary-color;
      color: white;

      &:hover:not(:disabled) {
        background-color: darken($secondary-color, 10%);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
      }
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      opacity: 0.6;
    }

    &__icon {
      font-size: 1.2rem;
    }
  }

  .grocery-help-text {
    color: $text-secondary;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }
}
</style>
