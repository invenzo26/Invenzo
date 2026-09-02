import { ProductsSection } from '@/app/components/ProductsSection'
import { TechStackSection } from '@/app/components/TechStackSection'

export default function ProductsPage() {
  return (
    <main style={{ background: 'var(--bg-layered)', color: 'var(--text-primary)' }}>
      <ProductsSection />
      <TechStackSection />
    </main>
  )
}
