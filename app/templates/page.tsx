import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { TemplatesClient } from './TemplatesClient'

export const metadata: Metadata = {
  title: 'Templates — OTF',
  description: 'Full-stack templates for Expo + Next.js. Auth, payments, and AI configs pre-wired.',
}

export default function TemplatesPage() {
  return (
    <main className="min-h-dvh bg-[#09090b] flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4">Templates</h1>
          <p className="text-[#a1a1aa] text-lg max-w-2xl">
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
