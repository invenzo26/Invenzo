'use client'

import { HeroSection } from '@/app/components/HeroSection'
import { ContactFormSection } from '@/app/components/ContactFormSection'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'

export default function Home() {
  return (
    <main className="transition-colors duration-300" style={{ background: 'var(--bg-layered)', color: 'var(--text-primary)' }}>
      <ScrollProgress />
      <HeroSection />
      <ContactFormSection />
      <Footer />
    </main>
  )
}
