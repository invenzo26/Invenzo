import { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface PremiumButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  disabled?: boolean
  [key: string]: any
}

export function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}: PremiumButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary'

  const variantStyles = {
    primary: `
      premium-button-primary
      focus:ring-gold-primary
    `,
    secondary: `
      premium-button-secondary
      focus:ring-gold-primary
    `,
    ghost: `
      bg-transparent text-gold-primary hover:text-gold-accent
      hover:bg-hover-overlay active:scale-95
      focus:ring-gold-primary
    `,
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm tracking-wide',
    md: 'px-6 py-3 text-base tracking-wide',
    lg: 'px-8 py-4 text-lg tracking-wider',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
