interface VShortTextFieldProps {
  modelValue?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  errorMessage?: string
  helperText?: string
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'filled' | 'outlined'
  class?: string
}

export type { VShortTextFieldProps }
