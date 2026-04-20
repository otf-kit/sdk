import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { TemplatesClient } from './TemplatesClient'

export const metadata: Metadata = {
  title: 'Templates — OTF',
  description: 'Full-stack templates for Expo + Next.js. Auth, payments, and AI configs pre-wired.',
}

export default function TemplatesPage() {
  return (
    <main className="min-h-dvh bg-[#0a0a0a] flex flex-col">
      <Nav />
      <div className="flex-1 max-w-7xl mx-auto px-6 pt-28 pb-24 w-full">
        <div className="mb-12">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Templates
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Templates</h1>
          <p className="text-[#737373] text-lg max-w-2xl">
            Full-stack apps with auth, payments, and AI configs pre-wired — drop in and ship.
            First template in development, more coming soon.
          </p>
        </div>
        <TemplatesClient />
      </div>
      <Footer />
    </main>
  )
}
