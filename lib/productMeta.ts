import {
  AlarmClock,
  BrainCircuit,
  GraduationCap,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

export const productIcons: Record<string, LucideIcon> = {
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
