import { ReactNode } from 'react'
import { motion } from 'framer-motion'

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
    'inline-flex cursor-pointer items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary'

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
  <motion.button
  whileHover={{
    y: -2,
    scale: 1.02,
  }}
  whileTap={{
    scale: 0.97,
  }}
  transition={{
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1],
  }}
  className={`
    relative overflow-hidden
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `}
      disabled={disabled}
      {...props}
    >
      <motion.span
  initial={{ x: '-120%' }}
  whileHover={{ x: '220%' }}
  transition={{
    duration: 0.8,
    ease: 'easeInOut',
  }}
  className="absolute inset-y-0 left-0 w-10 -skew-x-12"
  style={{
    background:
      'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
  }}
/>
      <span className="relative z-10">
  {children}
</span>
    </motion.button>
  )
}
