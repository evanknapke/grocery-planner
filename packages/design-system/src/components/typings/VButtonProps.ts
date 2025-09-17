interface VButtonProps {
  variant?: 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  class?: string
  disabled?: boolean
  to?: string | object
  leadingIcon?: string
  trailingIcon?: string
}

export type { VButtonProps }