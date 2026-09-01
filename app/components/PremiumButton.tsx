import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
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
    'group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg font-semibold transition-transform duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]'

  const variantStyles = {
    primary: 'premium-button-primary focus:ring-gold-primary',
    secondary: 'premium-button-secondary focus:ring-gold-primary',
    ghost: 'bg-transparent text-gold-primary hover:text-gold-accent hover:bg-hover-overlay focus:ring-gold-primary',
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
      <span className="relative z-10">{children}</span>
      {variant !== 'ghost' && (
        <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </button>
  )
}
