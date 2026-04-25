import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { ComponentsHero } from './ComponentsHero'
import { ComponentsClient } from './ComponentsClient'
import { TOTAL } from '@/lib/components-registry'

export const metadata: Metadata = {
  title: 'Components — OTF',
  description: `Browse ${TOTAL}+ production-ready UI components. Live previews, dark-first, fully typed.`,
}

export default function ComponentsPage() {
  return (
    <main className="min-h-dvh bg-[#0a0a0a] flex flex-col">
      <Nav />
      <ComponentsHero total={TOTAL} />
      <div className="flex-1 max-w-[1400px] mx-auto px-6 pb-24 w-full">
        <ComponentsClient />
      </div>
      <Footer />
    </main>
  )
}
