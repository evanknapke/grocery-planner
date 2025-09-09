<template>
  <Teleport to="body">
    <div class="v-toast-container">
      <TransitionGroup name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="toastClasses(toast)"
          role="alert"
          :aria-live="toast.type === 'error' ? 'assertive' : 'polite'"
        >
          <div class="v-toast__content">
            <VIcon 
              v-if="toast.icon" 
              :name="toast.icon" 
              :class="iconClasses(toast.type)"
              class="v-toast__icon"
            />
            <div class="v-toast__text">
              <div v-if="toast.title" class="v-toast__title">{{ toast.title }}</div>
              <div class="v-toast__message">{{ toast.message }}</div>
            </div>
            <button
              v-if="toast.closable"
              @click="removeToast(toast.id)"
              class="v-toast__close"
              aria-label="Close notification"
            >
              <VIcon name="close" :size="16" />
            </button>
          </div>
          <div v-if="toast.showProgress" class="v-toast__progress">
            <div 
              class="v-toast__progress-bar" 
              :style="{ 
                animationDuration: `${toast.duration}ms`,
                animationDelay: `${toast.delay}ms`
              }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import VIcon from './VIcon.vue'
import type { Toast } from '@/stores/toastStore'

export interface VToastProps {
  toasts: Toast[]
}

const props = defineProps<VToastProps>()

const emit = defineEmits<{
  'remove-toast': [id: string]
}>()


const toastClasses = (toast: Toast) => {
  const baseClasses = 'v-toast'
  const typeClass = `v-toast--${toast.type}`
  const positionClass = `v-toast--${toast.position || 'bottom-left'}`
  
  return [baseClasses, typeClass, positionClass].join(' ')
}

const iconClasses = (type: string) => {
  return `v-toast__icon--${type}`
}

const removeToast = (id: string) => {
  emit('remove-toast', id)
}
</script>

<style scoped lang="scss">
.v-toast-container {
  position: fixed;
  bottom: $spacing-lg;
  left: $spacing-lg;
  z-index: 1000;
  pointer-events: none;
  display: flex;
  flex-direction: column-reverse;
  gap: $spacing-sm;
  max-width: 400px;
  
  @media (max-width: 768px) {
    bottom: $spacing-md;
    left: $spacing-md;
    right: $spacing-md;
    max-width: none;
  }
}

.v-toast {
  background: $surface;
  border-radius: $border-radius-md;
  box-shadow: $shadow-lg;
  border: 1px solid $border;
  pointer-events: auto;
  overflow: hidden;
  min-width: 300px;
  max-width: 400px;
  
  @media (max-width: 768px) {
    min-width: auto;
    max-width: none;
  }
  
  // Types
  &--success {
    border-left: 4px solid #10b981;
    
    .v-toast__icon--success {
      color: #10b981;
    }
  }
  
  &--error {
    border-left: 4px solid $error-color;
    
    .v-toast__icon--error {
      color: $error-color;
    }
  }
  
  &--warning {
    border-left: 4px solid #f59e0b;
    
    .v-toast__icon--warning {
      color: #f59e0b;
    }
  }
  
  &--info {
    border-left: 4px solid $primary-color;
    
    .v-toast__icon--info {
      color: $primary-color;
    }
  }
}

.v-toast__content {
  display: flex;
  align-items: flex-start;
  padding: $spacing-md;
  gap: $spacing-sm;
}

.v-toast__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.v-toast__text {
  flex: 1;
  min-width: 0;
}

.v-toast__title {
  font-weight: 600;
  color: $text-primary;
  font-size: 0.875rem;
  margin-bottom: 2px;
  line-height: 1.4;
}

.v-toast__message {
  color: $text-secondary;
  font-size: 0.875rem;
  line-height: 1.4;
  word-wrap: break-word;
}

.v-toast__close {
  background: none;
  border: none;
  padding: 2px;
  border-radius: $border-radius-sm;
  cursor: pointer;
  color: $text-secondary;
  transition: all $transition-fast;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #f1f5f9;
    color: $text-primary;
  }
  
  &:focus-visible {
    outline: 2px solid $primary-color;
    outline-offset: 2px;
  }
}

.v-toast__progress {
  height: 3px;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.v-toast__progress-bar {
  height: 100%;
  background-color: $primary-color;
  width: 100%;
  transform-origin: left;
  animation: toast-progress linear forwards;
}

// Toast animations
.toast-enter-active {
  transition: all $transition-normal ease-out;
}

.toast-leave-active {
  transition: all $transition-normal ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.toast-move {
  transition: transform $transition-normal;
}

// Progress bar animation
@keyframes toast-progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

// Position variants (for future use)
// .v-toast--top-left, .v-toast--top-center, .v-toast--top-right,
// .v-toast--bottom-left, .v-toast--bottom-center, .v-toast--bottom-right
// can be implemented for different positioning when needed
</style>
