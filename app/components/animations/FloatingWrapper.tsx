import type { ReactNode } from 'react'

interface FloatingWrapperProps {
  children: ReactNode
  className?: string
  amount?: number
  duration?: number
  delay?: number
}

export default function FloatingWrapper({
  children,
  className = '',
}: FloatingWrapperProps) {
  return <div className={className}>{children}</div>
}
