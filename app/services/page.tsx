import { ServicesSection } from '@/app/components/ServicesSection'
import { StatsSection } from '@/app/components/StatsSection'
import { VisionSection } from '@/app/components/VisionSection'

export default function ServicesPage() {
  return (
    <main style={{ background: 'var(--bg-layered)', color: 'var(--text-primary)' }}>
      <ServicesSection />
      <StatsSection />
      <VisionSection />
    </main>
  )
}
