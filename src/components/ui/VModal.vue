<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="v-modal-overlay" @click="handleOverlayClick">
        <div 
          :class="modalClasses" 
          @click.stop
          role="dialog"
          :aria-labelledby="titleId"
          :aria-describedby="descriptionId"
          aria-modal="true"
        >
          <div v-if="showHeader" class="v-modal__header">
            <div class="v-modal__title-section">
              <VIcon v-if="icon" :name="icon" :class="iconClasses" />
              <h2 :id="titleId" class="v-modal__title">{{ title }}</h2>
            </div>
            <button 
              v-if="closable" 
              @click="close" 
              class="v-modal__close-button"
              aria-label="Close modal"
            >
              <VIcon name="close" />
            </button>
          </div>

          <div class="v-modal__content">
            <p v-if="message" :id="descriptionId" class="v-modal__message">{{ message }}</p>
            <slot />
          </div>

          <div v-if="showFooter" class="v-modal__footer">
            <slot name="footer">
              <div class="v-modal__default-footer">
                <VButton 
                  v-if="showCancelButton"
                  @click="handleCancel" 
                  variant="outline"
                  class="v-modal__button"
                >
                  {{ cancelText }}
                </VButton>
                <VButton 
                  v-if="showConfirmButton"
                  @click="handleConfirm" 
                  :variant="confirmVariant"
                  class="v-modal__button"
                >
                  {{ confirmText }}
                </VButton>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch, nextTick, useSlots } from 'vue'
import VButton from './VButton.vue'
import VIcon from './VIcon.vue'
import type { VModalProps } from './typings/VModalProps'

const props = withDefaults(defineProps<VModalProps>(), {
  modelValue: false,
  title: '',
  message: '',
  icon: undefined,
  type: 'info',
  size: 'default',
  closable: true,
  closeOnOverlay: true,
  closeOnEscape: true,
  showCancelButton: true,
  showConfirmButton: true,
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  confirmVariant: 'primary',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
  'cancel': []
  'confirm': []
}>()

const titleId = ref(`modal-title-${Math.random().toString(36).substring(2, 11)}`)
const descriptionId = ref(`modal-description-${Math.random().toString(36).substring(2, 11)}`)

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const slots = useSlots()

const showHeader = computed(() => props.title || props.icon || props.closable)
const showFooter = computed(() => props.showCancelButton || props.showConfirmButton || !!slots.footer)

const modalClasses = computed(() => {
  const baseClasses = 'v-modal'
  const sizeClass = `v-modal--${props.size}`
  const typeClass = `v-modal--${props.type}`
  const customClass = props.class || ''
  
  return [baseClasses, sizeClass, typeClass, customClass]
    .filter(Boolean)
    .join(' ')
})

const iconClasses = computed(() => {
  const baseClasses = 'v-modal__icon'
  const typeClass = `v-modal__icon--${props.type}`
  return [baseClasses, typeClass].join(' ')
})

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape && isOpen.value) {
    close()
  }
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close()
  }
}

const close = () => {
  isOpen.value = false
  emit('close')
}

const handleCancel = () => {
  emit('cancel')
  close()
}

const handleConfirm = () => {
  emit('confirm')
  close()
}

watch(isOpen, async (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown)
    await nextTick()
    const modal = document.querySelector('.v-modal')
    if (modal) {
      (modal as HTMLElement).focus()
    }
  } else {
    // Restore body scroll
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="scss">
.v-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: $spacing-md;
  backdrop-filter: blur(4px);
}

.v-modal {
  background: $surface;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-xl;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  outline: none;
  
  // Sizes
  &--sm {
    width: 400px;
  }
  
  &--default {
    width: 500px;
  }
  
  &--lg {
    width: 600px;
  }
  
  &--xl {
    width: 800px;
  }
  
  // Types
  &--info {
    .v-modal__icon {
      color: $primary-color;
    }
  }
  
  &--success {
    .v-modal__icon {
      color: #10b981;
    }
  }
  
  &--warning {
    .v-modal__icon {
      color: #f59e0b;
    }
  }
  
  &--error {
    .v-modal__icon {
      color: $error-color;
    }
  }
  
  &--confirm {
    .v-modal__icon {
      color: $primary-color;
    }
  }
}

.v-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-lg;
  border-bottom: 1px solid $border;
  flex-shrink: 0;
}

.v-modal__title-section {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  flex: 1;
}

.v-modal__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.v-modal__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: $text-primary;
  margin: 0;
  line-height: 1.4;
}

.v-modal__close-button {
  background: none;
  border: none;
  padding: $spacing-xs;
  border-radius: $border-radius-sm;
  cursor: pointer;
  color: $text-secondary;
  transition: all $transition-fast;
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

.v-modal__content {
  padding: $spacing-lg;
  flex: 1;
  overflow-y: auto;
}

.v-modal__message {
  color: $text-secondary;
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
}

.v-modal__footer {
  padding: $spacing-lg;
  border-top: 1px solid $border;
  flex-shrink: 0;
}

.v-modal__default-footer {
  display: flex;
  gap: $spacing-sm;
  justify-content: flex-end;
}

.v-modal__button {
  min-width: 80px;
}

.modal-enter-active,
.modal-leave-active {
  transition: all $transition-normal;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .v-modal,
.modal-leave-to .v-modal {
  transform: scale(0.95) translateY(-20px);
}

.modal-enter-to .v-modal,
.modal-leave-from .v-modal {
  transform: scale(1) translateY(0);
}

@media (max-width: 768px) {
  .v-modal-overlay {
    padding: $spacing-sm;
  }
  
  .v-modal {
    width: 100%;
    max-width: none;
    max-height: 95vh;
    
    &--sm,
    &--default,
    &--lg,
    &--xl {
      width: 100%;
    }
  }
  
  .v-modal__header,
  .v-modal__content,
  .v-modal__footer {
    padding: $spacing-md;
  }
  
  .v-modal__default-footer {
    flex-direction: column;
    
    .v-modal__button {
      width: 100%;
    }
  }
}
</style>
