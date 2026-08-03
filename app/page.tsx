'use client'

import { HeroSection } from '@/app/components/HeroSection'
import { ProductsSection } from '@/app/components/ProductsSection'
import { ServicesSection } from '@/app/components/ServicesSection'
import { AboutSection } from '@/app/components/AboutSection'
import { TechStackSection } from '@/app/components/TechStackSection'
import { StatsSection } from '@/app/components/StatsSection'
import { VisionSection } from '@/app/components/VisionSection'
import { ContactFormSection } from '@/app/components/ContactFormSection'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'

export default function Home() {
  return (
    <main className="transition-colors duration-300" style={{ background: 'var(--bg-layered)', color: 'var(--text-primary)' }}>
      <ScrollProgress />
      <HeroSection />
      <ProductsSection />
      <ServicesSection />
      <AboutSection />
      <TechStackSection />
      <StatsSection />
      <VisionSection />
      <ContactFormSection />
      <Footer />
    </main>
  )
}
