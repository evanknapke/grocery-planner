interface VModalProps {
  modelValue?: boolean
  title?: string
  message?: string
  icon?: string
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirm'
  size?: 'sm' | 'default' | 'lg' | 'xl'
  closable?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  showCancelButton?: boolean
  showConfirmButton?: boolean
  cancelText?: string
  confirmText?: string
  confirmVariant?: 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  class?: string
}

export type { VModalProps }
