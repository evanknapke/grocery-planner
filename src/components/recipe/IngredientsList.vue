<template>
  <div class="ingredients-section" v-if="ingredients && ingredients.length > 0">
    <div class="section-header">
      <div class="section-icon">🥘</div>
      <h2>Ingredients</h2>
      <div class="ingredient-count">{{ ingredients.length }} items</div>
    </div>
    
    <div class="ingredients-card">
      <div class="ingredients-list">
        <div
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          class="ingredient-item"
        >
          <div class="ingredient-checkbox">
            <input 
              type="checkbox" 
              :id="`ingredient-${ingredient.id}`"
              class="checkbox"
            />
            <label :for="`ingredient-${ingredient.id}`" class="checkbox-label"></label>
          </div>
          
          <div class="ingredient-content">
            <div class="ingredient-amount">
              <span class="amount">{{ ingredient.amount }}</span>
              <span class="unit">{{ ingredient.unit }}</span>
            </div>
            <div class="ingredient-name">{{ ingredient.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: Figure out type for ingredients
defineProps<{
  ingredients: any[]
}>()
</script>

<style scoped lang="scss">
.ingredients-section {
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
    flex: 1;
  }

  .ingredient-count {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    color: $text-secondary;
    padding: 0.25rem 0.75rem;
    border-radius: $border-radius-md;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid $border;
  }
}

.ingredients-card {
  background: $surface;
  border-radius: $border-radius-lg;
  padding: 1.5rem;
  box-shadow: $shadow-md;
  border: 1px solid $border;
  transition: all $transition-fast;

  &:hover {
    box-shadow: $shadow-lg;
    transform: translateY(-2px);
  }
}

.ingredients-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ingredient-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-radius: $border-radius-md;
  border: 1px solid $border;
  transition: all $transition-fast;

  &:hover {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    border-color: $primary-color;
    transform: translateX(4px);
  }
}

.ingredient-checkbox {
  flex-shrink: 0;

  .checkbox {
    display: none;
  }

  .checkbox-label {
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid $border;
    border-radius: 4px;
    background: $surface;
    cursor: pointer;
    transition: all $transition-fast;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 6px;
      top: 2px;
      width: 6px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
      transition: opacity $transition-fast;
    }
  }

  .checkbox:checked + .checkbox-label {
    background: $primary-color;
    border-color: $primary-color;

    &::after {
      opacity: 1;
    }
  }

  .checkbox:checked + .checkbox-label + .ingredient-content {
    .ingredient-name {
      text-decoration: line-through;
      opacity: 0.6;
    }
  }
}

.ingredient-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ingredient-amount {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;

  .amount {
    font-weight: 700;
    color: $primary-color;
    font-size: 1rem;
  }

  .unit {
    font-weight: 500;
    color: $text-secondary;
    font-size: 0.875rem;
    text-transform: lowercase;
  }
}

.ingredient-name {
  color: $text-primary;
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.4;
  transition: all $transition-fast;
}

@media (max-width: 768px) {
  .ingredients-card {
    padding: 1rem;
  }
  
  .ingredient-item {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .section-header {
    margin-bottom: 1rem;
    
    h2 {
      font-size: 1.25rem;
    }
    
    .ingredient-count {
      font-size: 0.8rem;
      padding: 0.2rem 0.5rem;
    }
  }
}
</style>
