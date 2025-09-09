<template>
  <component
    :is="componentType"
    :class="cardClasses"
    :to="to"
    v-bind="$attrs"
    @click="handleClick"
  >
    <div v-if="$slots.image" class="v-card__image">
      <slot name="image" />
    </div>
    
    <div v-if="$slots.header" class="v-card__header">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.default" class="v-card__content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="v-card__footer">
      <slot name="footer" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface VCardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  size?: 'sm' | 'default' | 'lg'
  interactive?: boolean
  to?: string | object
  class?: string
}

const props = withDefaults(defineProps<VCardProps>(), {
  variant: 'default',
  size: 'default',
  interactive: false,
  to: undefined,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const componentType = computed(() => {
  return props.to ? 'router-link' : 'div'
})

const cardClasses = computed(() => {
  const baseClasses = 'v-card'
  const variantClass = `v-card--${props.variant}`
  const sizeClass = `v-card--${props.size}`
  const interactiveClass = props.interactive ? 'v-card--interactive' : ''
  const customClass = props.class || ''
  
  return [baseClasses, variantClass, sizeClass, interactiveClass, customClass]
    .filter(Boolean)
    .join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (props.interactive || props.to) {
    emit('click', event)
  }
}
</script>

<style scoped lang="scss">
.v-card {
  background: $surface;
  border-radius: $border-radius-lg;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all $transition-normal;
  width: 100%;
  
  // Variants
  &--default {
    box-shadow: $shadow-sm;
    border: 1px solid $border;
  }
  
  &--elevated {
    box-shadow: $shadow-lg;
    border: none;
  }
  
  &--outlined {
    border: 2px solid $border;
    box-shadow: none;
  }
  
  &--filled {
    background-color: #f8fafc;
    border: none;
    box-shadow: none;
  }
  
  // Sizes
  &--sm {
    .v-card__content,
    .v-card__header,
    .v-card__footer {
      padding: $spacing-md;
    }
    
    .v-card__image {
      height: 120px;
    }
  }
  
  &--default {
    .v-card__content,
    .v-card__header,
    .v-card__footer {
      padding: $spacing-lg;
    }
    
    .v-card__image {
      height: 200px;
    }
  }
  
  &--lg {
    .v-card__content,
    .v-card__header,
    .v-card__footer {
      padding: $spacing-xl;
    }
    
    .v-card__image {
      height: 240px;
    }
  }
  
  // Interactive state
  &--interactive {
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: $shadow-xl;
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: $shadow-lg;
    }
    
    &:focus-visible {
      outline: 2px solid $primary-color;
      outline-offset: 2px;
    }
  }
  
  // Card sections
  &__image {
    width: 100%;
    overflow: hidden;
    flex-shrink: 0;
    
    :deep(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
  
  &__header {
    flex-shrink: 0;
    border-bottom: 1px solid $border;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  &__footer {
    flex-shrink: 0;
    border-top: 1px solid $border;
    margin-top: auto;
    
    &:first-child {
      border-top: none;
    }
  }
  
  // Responsive adjustments
  @media (max-width: 768px) {
    &--sm {
      .v-card__content,
      .v-card__header,
      .v-card__footer {
        padding: $spacing-sm;
      }
    }
    
    &--default {
      .v-card__content,
      .v-card__header,
      .v-card__footer {
        padding: $spacing-md;
      }
    }
    
    &--lg {
      .v-card__content,
      .v-card__header,
      .v-card__footer {
        padding: $spacing-lg;
      }
    }
  }
}
</style>
