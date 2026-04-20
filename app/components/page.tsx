import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { ComponentsClient } from './ComponentsClient'
import { allComponents, webCount, nativeCount } from '@/lib/components-data'

export const metadata: Metadata = {
  title: 'Components — OTF',
  description: 'Browse 182 production-ready UI components for web and native.',
}

export default function ComponentsPage() {
  return (
    <main className="min-h-dvh bg-[#09090b] flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4">
            UI Components
          </h1>
          <p className="text-[#a1a1aa] text-lg mb-6">
            Every component ships with TypeScript types, dark mode, and AI-friendly docs.
          </p>
          <div className="flex items-center gap-4 flex-wrap text-sm text-[#a1a1aa]">
            <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
              {allComponents.length} total components
            </span>
            <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
              {webCount} web
            </span>
            <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
              {nativeCount} native
            </span>
            <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
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
