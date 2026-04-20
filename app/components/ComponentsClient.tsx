'use client'

import { useState } from 'react'
import { allComponents, type ComponentEntry } from '@/lib/components-data'

const tabs = ['All', 'Primitives', 'Components', 'Blocks', 'Forms', 'Layouts', 'Native Patterns', 'Native Layouts'] as const
type Tab = (typeof tabs)[number]

const platformColors: Record<string, string> = {
  Web: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Native: 'bg-[#f97316]/10 text-orange-400 border-[#f97316]/20',
  Both: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

const categoryColors: Record<string, string> = {
  Primitives: 'text-[#737373]',
  Components: 'text-blue-400',
  Blocks: 'text-violet-400',
  Forms: 'text-orange-400',
  Layouts: 'text-emerald-400',
  Advanced: 'text-red-400',
  Charts: 'text-yellow-400',
  Engagement: 'text-pink-400',
  Patterns: 'text-[#f97316]',
  Interface: 'text-cyan-400',
}

function filterComponents(tab: Tab): ComponentEntry[] {
  if (tab === 'All') return allComponents
  if (tab === 'Native Patterns') return allComponents.filter((c) => c.category === 'Patterns')
  if (tab === 'Native Layouts') return allComponents.filter((c) => c.platform === 'Native' && c.category === 'Layouts')
  return allComponents.filter((c) => c.category === tab)
}

export function ComponentsClient() {
  const [activeTab, setActiveTab] = useState<Tab>('All')
  const filtered = filterComponents(activeTab)

  return (
    <>
      <div className="flex gap-2 flex-wrap mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors border ${
              activeTab === tab
                ? 'bg-[#f97316] border-[#f97316] text-white'
                : 'border-[#1f1f1f] text-[#737373] hover:border-[#333333] hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {filtered.map((c) => (
          <div
            key={`${c.name}-${c.platform}`}
            className="group relative bg-[#111111] border border-[#1f1f1f] rounded-xl p-4 flex flex-col gap-2 hover:border-[#f97316]/30 transition-all"
          >
            <span className="font-mono text-xs text-white font-medium leading-tight">{c.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded border self-start ${platformColors[c.platform]}`}>
              {c.platform}
            </span>
            <span className={`text-xs ${categoryColors[c.category]}`}>{c.category}</span>
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <code className="text-xs font-mono text-[#f97316] bg-[#0a0a0a]/95 rounded px-2 py-1 w-full text-center truncate border border-[#1f1f1f]">
                pnpm add @otf/ui
              </code>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
