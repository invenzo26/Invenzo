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
      bg-gold-primary text-bg-primary shadow-lg shadow-gold-primary/20
      hover:-translate-y-0.5 active:scale-95
      focus:ring-gold-primary
    `,
    secondary: `
      bg-transparent border-2 border-gold-primary text-gold-primary
      hover:bg-hover-overlay hover:-translate-y-0.5 active:scale-95
      focus:ring-gold-primary
    `,
    ghost: `
      bg-transparent text-gold-primary hover:text-gold-accent
      hover:bg-hover-overlay active:scale-95
      focus:ring-gold-primary
    `,
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
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
