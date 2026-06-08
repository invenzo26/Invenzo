import { ReactNode } from 'react'

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
    <div
      className={`
        border rounded-lg p-6 lg:p-8
        ${hoverClass}
        ${className}
      `}
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
