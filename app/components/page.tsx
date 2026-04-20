import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { ComponentsClient } from './ComponentsClient'
import { allComponents, webCount, nativeCount } from '@/lib/components-data'

export const metadata: Metadata = {
  title: 'Components — OTF',
  description: 'Browse 182 production-ready UI components for web and native.',
}

export default function ComponentsPage() {
  return (
    <main className="min-h-dvh bg-[#0a0a0a] flex flex-col">
      <Nav />
      <div className="flex-1 max-w-7xl mx-auto px-6 pt-28 pb-24 w-full">
        <div className="mb-12">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            Components
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            UI Components
          </h1>
          <p className="text-[#737373] text-lg mb-6">
            Every component ships with TypeScript types, dark mode, and AI-friendly docs.
          </p>
          <div className="flex items-center gap-4 flex-wrap text-sm text-[#737373]">
            <span className="px-3 py-1 bg-[#111111] border border-[#1f1f1f] rounded-full">
              {allComponents.length} total components
            </span>
            <span className="px-3 py-1 bg-[#111111] border border-[#1f1f1f] rounded-full">
              {webCount} web
            </span>
            <span className="px-3 py-1 bg-[#111111] border border-[#1f1f1f] rounded-full">
              {nativeCount} native
            </span>
            <span className="px-3 py-1 bg-[#111111] border border-[#1f1f1f] rounded-full">
              5 categories
            </span>
          </div>
        </div>
        <ComponentsClient />
      </div>
      <Footer />
    </main>
  )
}
