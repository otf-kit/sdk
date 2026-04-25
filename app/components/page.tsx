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
      <div className="flex-1 w-full flex border-t border-[#1f1f1f]">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-64 border-r border-[#1f1f1f] bg-[#0a0a0a] flex-shrink-0 pt-8 pb-24 overflow-y-auto">
          <div className="px-6 mb-8">
            <h2 className="text-white font-semibold mb-4">Documentation</h2>
            <div className="space-y-1">
              <a href="#" className="block px-3 py-2 text-sm text-[#737373] hover:text-white rounded-md hover:bg-[#111111]">Getting started</a>
              <a href="#" className="block px-3 py-2 text-sm text-[#737373] hover:text-white rounded-md hover:bg-[#111111]">Frameworks</a>
            </div>
          </div>
          
          <div className="px-6 mb-8">
            <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Components</h2>
            <div className="space-y-1">
              <a href="#" className="block px-3 py-2 text-sm text-white bg-[#1a1a1a] rounded-md font-medium">Overview</a>
              <a href="#" className="block px-3 py-2 text-sm text-[#737373] hover:text-white rounded-md hover:bg-[#111111]">Concepts</a>
              <a href="#" className="block px-3 py-2 text-sm text-[#737373] hover:text-white rounded-md hover:bg-[#111111]">Layout</a>
              <a href="#" className="block px-3 py-2 text-sm text-[#737373] hover:text-white rounded-md hover:bg-[#111111]">Typography</a>
              <a href="#" className="block px-3 py-2 text-sm text-[#737373] hover:text-white rounded-md hover:bg-[#111111]">Components</a>
              <a href="#" className="block px-3 py-2 text-sm text-[#737373] hover:text-white rounded-md hover:bg-[#111111]">Utilities</a>
            </div>
          </div>
          
          <div className="px-6 mb-8">
            <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Forms</h2>
            <div className="space-y-1">
              <a href="#" className="block px-3 py-2 text-sm text-[#737373] hover:text-white rounded-md hover:bg-[#111111]">Overview</a>
              <a href="#" className="block px-3 py-2 text-sm text-[#737373] hover:text-white rounded-md hover:bg-[#111111]">Fields</a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 lg:px-12 pt-12 pb-24 max-w-7xl">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Components
            </h1>
            <p className="text-[#a3a3a3] text-lg mb-8">
              Accessible, modern and easy to style UI components.
            </p>
            <p className="text-sm text-[#737373] mb-8">
              OTF ships with {allComponents.length} React components built on top of Radix UI and Tamagui.
            </p>
            <div className="h-px w-full bg-[#1f1f1f] mb-8" />
          </div>
          <ComponentsClient />
        </div>
      </div>
      <Footer />
    </main>
  )
}
