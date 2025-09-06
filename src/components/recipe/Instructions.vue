<template>
  <div class="recipe-section" v-if="instructions && instructions.length > 0">
    <h2>Instructions</h2>
    <div class="instructions">
      <div
        v-for="instruction in instructions"
        :key="instruction.name"
        class="instruction-group"
      >
        <h3 v-if="instruction.name" class="instruction-group-title">{{ instruction.name }}</h3>
        <ol class="instruction-steps">
          <li
            v-for="step in instruction.steps"
            :key="step.number"
            class="instruction-step"
          >
            {{ step.step }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: Figure out type for instructions
interface Props {
  instructions: any[]
}

defineProps<Props>()
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

  .instructions {
    .instruction-group {
      margin-bottom: 2rem;

      .instruction-group-title {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: $text-primary;
      }

      .instruction-steps {
        list-style: none;
        counter-reset: step-counter;
        padding: 0;

        .instruction-step {
          counter-increment: step-counter;
          position: relative;
          padding: 1rem 0 1rem 3rem;
          border-bottom: 1px solid #f0f0f0;
          line-height: 1.6;
          color: $text-primary;

          &:last-child {
            border-bottom: none;
          }

          &::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 1rem;
            background-color: $primary-color;
            color: white;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}
</style>
