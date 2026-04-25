'use client'

import { useState } from 'react'
import { allComponents, type ComponentEntry } from '@/lib/components-data'

const tabs = ['All', 'Primitives', 'Components', 'Blocks', 'Forms', 'Layouts', 'Native Patterns', 'Native Layouts'] as const
type Tab = (typeof tabs)[number]

function filterComponents(tab: Tab): ComponentEntry[] {
  if (tab === 'All') return allComponents
  if (tab === 'Native Patterns') return allComponents.filter((c) => c.category === 'Patterns')
  if (tab === 'Native Layouts') return allComponents.filter((c) => c.platform === 'Native' && c.category === 'Layouts')
  return allComponents.filter((c) => c.category === tab)
}

// Render a mock visual based on component name
function ComponentVisual({ name }: { name: string }) {
  if (name === 'Accordion') {
    return (
      <div className="w-24 space-y-1">
        <div className="h-2 bg-[#333333] rounded w-full"></div>
        <div className="h-6 bg-[#333333] rounded w-full"></div>
        <div className="h-2 bg-[#333333] rounded w-full"></div>
      </div>
    )
  }
  if (name === 'AppShell' || name === 'SidebarLayoutDashboard') {
    return (
      <div className="flex gap-2 w-24 h-16 border border-[#333333] rounded overflow-hidden p-1">
        <div className="w-4 h-full bg-[#333333] rounded-sm"></div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-2 bg-[#333333] rounded-sm w-full"></div>
          <div className="flex-1 bg-[#333333] rounded-sm w-full"></div>
        </div>
      </div>
    )
  }
  if (name === 'Avatar') {
    return (
      <div className="flex -space-x-2">
        <div className="w-8 h-8 rounded-full bg-[#333333] border-2 border-[#111111] flex items-center justify-center text-[10px] text-white">EA</div>
        <div className="w-8 h-8 rounded-full bg-[#f97316] border-2 border-[#111111] flex items-center justify-center text-[10px] text-white">JD</div>
      </div>
    )
  }
  if (name === 'Badge') {
    return (
      <div className="flex gap-2">
        <div className="h-4 w-12 bg-[#333333] rounded-full"></div>
        <div className="h-4 w-12 bg-[#f97316] rounded-full"></div>
      </div>
    )
  }
  if (name === 'Button') {
    return (
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-[#f97316] rounded"></div>
      </div>
    )
  }
  if (name === 'Card') {
    return (
      <div className="w-24 h-16 border border-[#333333] rounded flex flex-col p-2 gap-1">
        <div className="h-2 w-12 bg-[#333333] rounded"></div>
        <div className="h-1 w-full bg-[#333333] rounded"></div>
        <div className="h-1 w-3/4 bg-[#333333] rounded"></div>
      </div>
    )
  }
  
  // Default fallback visual
  return (
    <div className="flex gap-1 items-center justify-center text-[#333333]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15-5 5 5 5"/><path d="m17 15 5 5-5 5"/><path d="m13 4-6 22"/></svg>
    </div>
  )
}

export function ComponentsClient() {
  const [activeTab, setActiveTab] = useState<Tab>('All')
  const filtered = filterComponents(activeTab)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <div
            key={`${c.name}-${c.platform}`}
            className="group flex flex-col bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#1f1f1f] hover:border-[#f97316]/50 transition-colors cursor-pointer"
          >
            {/* Visual Preview Area */}
            <div className="h-40 bg-[#111111] flex items-center justify-center border-b border-[#1f1f1f]">
              <ComponentVisual name={c.name} />
            </div>
            
            {/* Component Info */}
            <div className="p-5 flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">{c.name}</h3>
                <span className="text-xs text-[#737373] bg-[#1a1a1a] px-2 py-1 rounded-md">{c.platform}</span>
              </div>
              <p className="text-sm text-[#737373] line-clamp-2">
                Used to display {c.name.toLowerCase()} elements in your application.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
