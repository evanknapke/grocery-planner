<template>
  <div :class="spinnerClasses" role="status" aria-label="Loading">
    <div class="v-loading-spinner__circle"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VLoadingSpinnerProps } from './typings/VLoadingSpinnerProps'

const props = withDefaults(defineProps<VLoadingSpinnerProps>(), {
  size: 'default',
  color: 'primary',
})

const spinnerClasses = computed(() => {
  const baseClasses = 'v-loading-spinner'
  const sizeClass = `v-loading-spinner--${props.size}`
  const colorClass = `v-loading-spinner--${props.color}`
  const customClass = props.class || ''
  
  return [baseClasses, sizeClass, colorClass, customClass]
    .filter(Boolean)
    .join(' ')
})

</script>

<style scoped lang="scss">
.v-loading-spinner {
  display: inline-block;
  position: relative;
  
  &__circle {
    width: 100%;
    height: 100%;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: v-loading-spinner-rotate 1s linear infinite;
  }
  
  // Colors
  &--primary {
    color: $primary-color;
  }
  
  &--secondary {
    color: $text-secondary;
  }
  
  &--white {
    color: white;
  }
  
  &--muted {
    color: $text-disabled;
  }
  
  // Sizes
  &--sm {
    width: 16px;
    height: 16px;
    
    .v-loading-spinner__circle {
      border-width: 1.5px;
    }
  }
  
  &--default {
    width: 24px;
    height: 24px;
    
    .v-loading-spinner__circle {
      border-width: 2px;
    }
  }
  
  &--lg {
    width: 32px;
    height: 32px;
    
    .v-loading-spinner__circle {
      border-width: 3px;
    }
  }
  
  &--xl {
    width: 48px;
    height: 48px;
    
    .v-loading-spinner__circle {
      border-width: 4px;
    }
  }
}

@keyframes v-loading-spinner-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
