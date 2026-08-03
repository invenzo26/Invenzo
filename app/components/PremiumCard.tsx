import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PremiumCardProps {
  children: ReactNode
  hover?: boolean
  className?: string
}

export function PremiumCard({
  children,
  hover = true,
  className = '',
}: PremiumCardProps) {
  const hoverClass = hover
    ? 'hover:-translate-y-1 transition-all duration-300'
    : 'transition-all duration-300'

  return (
    <motion.div
  whileHover={
    hover
      ? {
          y: -8,
          scale: 1.01,
        }
      : {}
  }
  transition={{
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1],
  }}
      className={`
  border rounded-3xl p-6 lg:p-8
  transition-all duration-300
  ${className}
`}
style={{
  background: 'var(--card-bg)',
  borderColor: 'var(--border-color)',
  boxShadow: hover
    ? '0 10px 30px rgba(0,0,0,0.08)'
    : 'var(--shadow-card)',
}}
onMouseEnter={(e) => {
  if (!hover) return

  e.currentTarget.style.borderColor = 'var(--gold-primary)'
  e.currentTarget.style.boxShadow =
    '0 20px 60px rgba(212,175,55,0.12)'
}}
onMouseLeave={(e) => {
  e.currentTarget.style.borderColor = 'var(--border-color)'
  e.currentTarget.style.boxShadow = 'var(--shadow-card)'
}}
    >
      {children}
    </motion.div>
  )
}
