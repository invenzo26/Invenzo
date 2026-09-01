import type { ReactNode } from 'react'

interface MouseParallaxProps {
  children: ReactNode
  className?: string
  strength?: number
}

export default function MouseParallax({
  children,
  className = '',
}: MouseParallaxProps) {
  return <div className={className}>{children}</div>
}
