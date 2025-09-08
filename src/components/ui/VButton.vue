<template>
  <button
    :class="buttonClasses"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface VButtonProps {
  variant?: 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  class?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<VButtonProps>(), {
  variant: 'primary',
  size: 'default',
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const baseClasses = 'v-button'
  const variantClass = `v-button--${props.variant}`
  const sizeClass = `v-button--${props.size}`
  const disabledClass = props.disabled ? 'v-button--disabled' : ''
  const customClass = props.class || ''
  
  return [baseClasses, variantClass, sizeClass, disabledClass, customClass]
    .filter(Boolean)
    .join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped lang="scss">
.v-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.15s ease;
  cursor: pointer;
  border: none;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  
  &:focus-visible {
    outline: 2px solid $primary-color;
    outline-offset: 2px;
  }
  
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  
  // Variants
  &--primary {
    background-color: $primary-color;
    color: white;
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    
    &:hover:not(:disabled) {
      background-color: $primary-dark;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    }
  }
  
  &--destructive {
    background-color: $error-color;
    color: white;
    
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  }
  
  &--outline {
    border: 1px solid $border;
    background-color: $background;
    color: $text-primary;
    
    &:hover:not(:disabled) {
      background-color: #f1f5f9;
      color: $text-primary;
    }
  }
  
  &--secondary {
    background-color: #f1f5f9;
    color: $text-primary;
    
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  }
  
  &--ghost {
    background-color: transparent;
    color: $text-primary;
    
    &:hover:not(:disabled) {
      background-color: #f1f5f9;
      color: $text-primary;
    }
  }
  
  &--link {
    background-color: transparent;
    color: $primary-color;
    text-decoration: underline;
    text-underline-offset: 4px;
    
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  }
  
  // Sizes
  &--default {
    height: 2.5rem;
    padding: 0.5rem 1rem;
  }
  
  &--sm {
    height: 2.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
  
  &--lg {
    height: 2.75rem;
    padding: 0.5rem 2rem;
    border-radius: 4px;
  }
  
  &--icon {
    height: 2.5rem;
    width: 2.5rem;
    padding: 0;
  }
}
</style>
