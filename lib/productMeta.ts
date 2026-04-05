import {
  AlarmClock,
  BookOpenCheck,
  Brain,
  ChartNoAxesCombined,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

export const productIcons: Record<string, LucideIcon> = {
  focuslock: AlarmClock,
  skillsyncx: BookOpenCheck,
  trivio: Brain,
  strequp: Sparkles,
  gradguard: ChartNoAxesCombined,
}

export function getProductIcon(slug?: string | null) {
  if (!slug) {
    return Sparkles
  }

  return productIcons[String(slug).toLowerCase()] ?? Sparkles
}
