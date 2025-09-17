import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  icon?: string
  duration?: number
  closable?: boolean
  showProgress?: boolean
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  delay?: number
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  // Default duration for all toasts
  const DEFAULT_DURATION = 5000

  // Default configurations for each toast type
  const defaultConfigs = {
    success: {
      icon: 'check',
      duration: DEFAULT_DURATION,
      closable: true,
      showProgress: true,
      position: 'bottom-left' as const
    },
    error: {
      icon: 'alertCircle',
      duration: DEFAULT_DURATION,
      closable: true,
      showProgress: true,
      position: 'bottom-left' as const
    },
    warning: {
      icon: 'alertTriangle',
      duration: DEFAULT_DURATION,
      closable: true,
      showProgress: true,
      position: 'bottom-left' as const
    },
    info: {
      icon: 'information',
      duration: DEFAULT_DURATION,
      closable: true,
      showProgress: true,
      position: 'bottom-left' as const
    }
  }

  /**
   * Add a new toast notification
   */
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
    
    // Merge with default config for the toast type
    const defaultConfig = defaultConfigs[toast.type] || defaultConfigs.info
    const newToast: Toast = {
      ...defaultConfig,
      ...toast,
      id
    }

    toasts.value.push(newToast)

    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }

  /**
   * Remove a toast by ID
   */
  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  /**
   * Clear all toasts
   */
  const clearAll = () => {
    toasts.value = []
  }

  /**
   * Convenience methods for each toast type
   * Signature: method(title, message?, duration?)
   */
  const success = (title: string, message?: string, duration?: number) => {
    return addToast({
      type: 'success',
      title,
      message: message || title,
      duration: duration || DEFAULT_DURATION
    })
  }

  const error = (title: string, message?: string, duration?: number) => {
    return addToast({
      type: 'error',
      title,
      message: message || title,
      duration: duration || DEFAULT_DURATION
    })
  }

  const warning = (title: string, message?: string, duration?: number) => {
    return addToast({
      type: 'warning',
      title,
      message: message || title,
      duration: duration || DEFAULT_DURATION
    })
  }

  const info = (title: string, message?: string, duration?: number) => {
    return addToast({
      type: 'info',
      title,
      message: message || title,
      duration: duration || DEFAULT_DURATION
    })
  }

  return {
    toasts: computed(() => toasts.value),
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info
  }
})
