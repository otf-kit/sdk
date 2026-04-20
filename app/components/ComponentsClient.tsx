'use client'

import { useState } from 'react'
import { allComponents, type ComponentEntry } from '@/lib/components-data'

const tabs = ['All', 'Primitives', 'Components', 'Blocks', 'Forms', 'Layouts', 'Native Patterns', 'Native Layouts'] as const
type Tab = (typeof tabs)[number]

const platformColors: Record<string, string> = {
  Web: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Native: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Both: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

const categoryColors: Record<string, string> = {
  Primitives: 'text-zinc-400',
  Components: 'text-blue-400',
  Blocks: 'text-violet-400',
  Forms: 'text-orange-400',
  Layouts: 'text-emerald-400',
  Advanced: 'text-red-400',
  Charts: 'text-yellow-400',
  Engagement: 'text-pink-400',
  Patterns: 'text-teal-400',
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
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              activeTab === tab
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'border-zinc-700 text-[#a1a1aa] hover:border-zinc-500 hover:text-[#fafafa]'
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
            className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 hover:border-indigo-500/40 transition-all"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <span className="font-mono text-xs text-[#fafafa] font-medium leading-tight">{c.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded border self-start ${platformColors[c.platform]}`}>
              {c.platform}
            </span>
            <span className={`text-xs ${categoryColors[c.category]}`}>{c.category}</span>
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <code className="text-xs font-mono text-indigo-300 bg-zinc-950/90 rounded px-2 py-1 w-full text-center truncate">
                pnpm add @otf/ui
              </code>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
