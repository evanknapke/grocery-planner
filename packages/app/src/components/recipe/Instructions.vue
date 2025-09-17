<template>
  <div class="instructions-section" v-if="instructions && instructions.length > 0">
    <div class="section-header">
      <VIcon name="chefHat" class="section-icon" />
      <h2>Cooking Instructions</h2>
      <div class="step-count">{{ totalSteps }} steps</div>
    </div>
    
    <VCard variant="elevated" class="instructions-card">
      <div class="instructions">
        <div
          v-for="instruction in instructions"
          :key="instruction.name"
          class="instruction-group"
        >
          <h3 v-if="instruction.name" class="instruction-group-title">{{ instruction.name }}</h3>
          <div class="instruction-steps">
            <div
              v-for="step in instruction.steps"
              :key="step.number"
              class="instruction-step"
            >
              <div class="step-number">{{ step.number }}</div>
              <div class="step-content">
                <div class="step-checkbox">
                  <input 
                    type="checkbox" 
                    :id="`step-${step.number}`"
                    class="checkbox"
                  />
                  <label :for="`step-${step.number}`" class="checkbox-label"></label>
                </div>
                <div class="step-text">{{ step.step }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VIcon, VCard } from '@grocery-planner/design-system'

// TODO: Figure out type for instructions
const props = defineProps<{
  instructions: any[]
}>()

const totalSteps = computed(() => props.instructions.reduce((total, instruction) => {
  return total + (instruction.steps?.length || 0)
}, 0))
</script>

<style scoped lang="scss">
.instructions-section {
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
    flex: 1;
  }

  .step-count {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    color: $text-secondary;
    padding: 0.25rem 0.75rem;
    border-radius: $border-radius-md;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid $border;
  }
}


.instructions {
  .instruction-group {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }

    .instruction-group-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: $text-primary;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid $border;
    }

    .instruction-steps {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}

.instruction-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
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

.step-number {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, $primary-color, $primary-dark);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: $shadow-sm;
}

.step-content {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-checkbox {
  flex-shrink: 0;
  margin-top: 0.25rem;

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

  .checkbox:checked + .checkbox-label + .step-text {
    text-decoration: line-through;
    opacity: 0.6;
  }
}

.step-text {
  color: $text-primary;
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 400;
  transition: all $transition-fast;
}

@media (max-width: 768px) {
  .instruction-step {
    padding: 1rem;
    gap: 0.75rem;
  }
  
  .step-number {
    width: 2rem;
    height: 2rem;
    font-size: 0.875rem;
  }
  
  .step-content {
    gap: 0.75rem;
  }
  
  .section-header {
    margin-bottom: 1rem;
    
    h2 {
      font-size: 1.25rem;
    }
    
    .step-count {
      font-size: 0.8rem;
      padding: 0.2rem 0.5rem;
    }
  }
}
</style>
