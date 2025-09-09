<template>
  <component
    :is="componentType"
    :class="buttonClasses"
    :to="to"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface VButtonProps {
  variant?: 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  class?: string
  disabled?: boolean
  to?: string | object
}

const props = withDefaults(defineProps<VButtonProps>(), {
  variant: 'primary',
  size: 'default',
  disabled: false,
  to: undefined,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const componentType = computed(() => {
  return props.to ? 'router-link' : 'button'
})

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
  border-radius: $border-radius-md;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all $transition-normal;
  cursor: pointer;
  border: none;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  box-sizing: border-box;
  
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
    background: linear-gradient(135deg, $primary-color, $primary-dark);
    color: white;
    font-weight: 600;
    box-shadow: $shadow-lg;
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: $shadow-xl;
      background: linear-gradient(135deg, $primary-dark, #1e40af);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: $shadow-lg;
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
    border: 2px solid $primary-color;
    background-color: $surface;
    color: $primary-color;
    box-shadow: $shadow-md;
    box-sizing: border-box;
    
    &:hover:not(:disabled) {
      background-color: $primary-color;
      color: white;
      transform: translateY(-2px);
      box-shadow: $shadow-lg;
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: $shadow-md;
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
    height: 3rem;
    padding: $spacing-lg $spacing-xl;
    border-radius: $border-radius-lg;
    font-size: 1.1rem;
    font-weight: 600;
    
    // Ensure outline variant has same visual height by reducing for border
    &.v-button--outline {
      height: calc(3rem - 4px); // Reduce by 4px to account for 2px border top + bottom
    }
  }
  
  &--icon {
    height: 2.5rem;
    width: 2.5rem;
    padding: 0;
  }
}
</style>
