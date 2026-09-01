import type { ReactNode } from 'react'

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
  return (
    <div
      className={`border rounded-2xl p-6 lg:p-8 transition-colors duration-200 ${
        hover ? 'hover:border-gold-primary' : ''
      } ${className}`}
      style={{
        background: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {children}
    </div>
  )
}
