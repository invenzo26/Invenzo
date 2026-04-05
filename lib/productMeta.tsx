import {
  AlarmClock,
  BrainCircuit,
  GraduationCap,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import type { ComponentType } from 'react'

type ProductIconProps = {
  size?: number
  className?: string
}

type ProductIconComponent = ComponentType<ProductIconProps>

export const productIcons: Record<string, ProductIconComponent> = {
  focuslock: AlarmClock,
  skillsyncx: BrainCircuit,
  trivio: GraduationCap,
  strequp: Target,
  gradguard: TrendingUp,
}

export function getProductIcon(slug?: string | null) {
  if (!slug) {
    return Sparkles
  }

  return productIcons[String(slug).toLowerCase()] ?? Sparkles
}
