<template>
  <div :class="containerClasses">
    <label v-if="label" :for="inputId" class="v-short-text-field__label">
      {{ label }}
    </label>
    <div class="v-short-text-field__wrapper">
      <input
        :id="inputId"
        ref="inputRef"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleEnter"
      />
      <div v-if="hasError" class="v-short-text-field__error-icon">
        <VIcon name="alertCircle" :size="16" />
      </div>
    </div>
    <div v-if="errorMessage" class="v-short-text-field__error-message">
      {{ errorMessage }}
    </div>
    <div v-if="helperText && !errorMessage" class="v-short-text-field__helper-text">
      {{ helperText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import VIcon from './VIcon.vue'
import type { VShortTextFieldProps } from './typings/VShortTextFieldProps'

const props = withDefaults(defineProps<VShortTextFieldProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  error: false,
  size: 'default',
  variant: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'enter': [event: KeyboardEvent]
}>()

const inputRef = ref<HTMLInputElement>()

const inputId = computed(() => `v-short-text-field-${Math.random().toString(36).substring(2, 11)}`)

const hasError = computed(() => props.error || !!props.errorMessage)

const containerClasses = computed(() => {
  const baseClasses = 'v-short-text-field'
  const sizeClass = `v-short-text-field--${props.size}`
  const variantClass = `v-short-text-field--${props.variant}`
  const errorClass = hasError.value ? 'v-short-text-field--error' : ''
  const disabledClass = props.disabled ? 'v-short-text-field--disabled' : ''
  const customClass = props.class || ''
  
  return [baseClasses, sizeClass, variantClass, errorClass, disabledClass, customClass]
    .filter(Boolean)
    .join(' ')
})

const inputClasses = computed(() => {
  const baseClasses = 'v-short-text-field__input'
  const sizeClass = `v-short-text-field__input--${props.size}`
  const variantClass = `v-short-text-field__input--${props.variant}`
  const errorClass = hasError.value ? 'v-short-text-field__input--error' : ''
  const disabledClass = props.disabled ? 'v-short-text-field__input--disabled' : ''
  
  return [baseClasses, sizeClass, variantClass, errorClass, disabledClass]
    .filter(Boolean)
    .join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleEnter = (event: KeyboardEvent) => {
  emit('enter', event)
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<style scoped lang="scss">
.v-short-text-field {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
  
  &__label {
    font-size: 0.875rem;
    font-weight: 500;
    color: $text-primary;
    margin-bottom: $spacing-xs;
  }
  
  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  &__input {
    width: 100%;
    border: 2px solid $border;
    border-radius: $border-radius-md;
    font-size: 1rem;
    font-family: inherit;
    transition: all $transition-fast;
    background-color: $surface;
    color: $text-primary;
    
    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    &::placeholder {
      color: $text-disabled;
    }
    
    &:disabled {
      background-color: #f8fafc;
      color: $text-disabled;
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    &:read-only {
      background-color: #f8fafc;
      cursor: default;
    }
    
    // Variants
    &--default {
      padding: 0.75rem 1rem;
    }
    
    &--filled {
      background-color: #f1f5f9;
      border-color: transparent;
      
      &:focus {
        background-color: $surface;
        border-color: $primary-color;
      }
    }
    
    &--outlined {
      background-color: transparent;
      border-width: 2px;
    }
    
    // Sizes
    &--sm {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      height: 2.25rem;
    }
    
    &--default {
      padding: 0.75rem 1rem;
      font-size: 1rem;
      height: 2.75rem;
    }
    
    &--lg {
      padding: 1rem 1.25rem;
      font-size: 1.125rem;
      height: 3.25rem;
    }
    
    // Error state
    &--error {
      border-color: $error-color;
      
      &:focus {
        border-color: $error-color;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }
    
    // Disabled state
    &--disabled {
      background-color: #f8fafc;
      color: $text-disabled;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
  
  &__error-icon {
    position: absolute;
    right: 0.75rem;
    color: $error-color;
    pointer-events: none;
  }
  
  &__error-message {
    font-size: 0.875rem;
    color: $error-color;
    margin-top: $spacing-xs;
  }
  
  &__helper-text {
    font-size: 0.875rem;
    color: $text-secondary;
    margin-top: $spacing-xs;
  }
  
  // Container states
  &--error {
    .v-short-text-field__label {
      color: $error-color;
    }
  }
  
  &--disabled {
    .v-short-text-field__label {
      color: $text-disabled;
    }
  }
  
  // Size variants for container
  &--sm {
    .v-short-text-field__label {
      font-size: 0.8125rem;
    }
    
    .v-short-text-field__error-message,
    .v-short-text-field__helper-text {
      font-size: 0.8125rem;
    }
  }
  
  &--lg {
    .v-short-text-field__label {
      font-size: 1rem;
    }
    
    .v-short-text-field__error-message,
    .v-short-text-field__helper-text {
      font-size: 1rem;
    }
  }
}
</style>
