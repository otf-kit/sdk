'use client'

import { useState } from 'react'

type Component = {
  name: string
  platform: 'Web' | 'Native' | 'Both'
  category: string
}

const allComponents: Component[] = [
  { name: 'Button', platform: 'Web', category: 'Primitives' },
  { name: 'DataTable', platform: 'Web', category: 'Components' },
  { name: 'Kanban', platform: 'Web', category: 'Advanced' },
  { name: 'PaywallScreen', platform: 'Native', category: 'Patterns' },
  { name: 'Dialog', platform: 'Web', category: 'Primitives' },
  { name: 'CommandBar', platform: 'Web', category: 'Advanced' },
  { name: 'AreaChart', platform: 'Web', category: 'Charts' },
  { name: 'LoginScreen', platform: 'Native', category: 'Patterns' },
  { name: 'Input', platform: 'Both', category: 'Primitives' },
  { name: 'Select', platform: 'Both', category: 'Forms' },
  { name: 'Avatar', platform: 'Both', category: 'Primitives' },
  { name: 'Badge', platform: 'Both', category: 'Primitives' },
  { name: 'BottomSheet', platform: 'Native', category: 'Patterns' },
  { name: 'Sidebar', platform: 'Web', category: 'Layouts' },
  { name: 'DatePicker', platform: 'Web', category: 'Forms' },
  { name: 'LineChart', platform: 'Web', category: 'Charts' },
]

const tabs = ['All', 'Primitives', 'Blocks', 'Forms', 'Native'] as const
type Tab = (typeof tabs)[number]

const platformColors: Record<string, string> = {
  Web: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Native: 'bg-[#f97316]/10 text-orange-400 border-[#f97316]/20',
  Both: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

function filterByTab(tab: Tab): Component[] {
  if (tab === 'All') return allComponents.slice(0, 8)
  if (tab === 'Primitives') return allComponents.filter(c => c.category === 'Primitives').slice(0, 8)
  if (tab === 'Blocks') return allComponents.filter(c => ['Layouts', 'Advanced'].includes(c.category)).slice(0, 8)
  if (tab === 'Forms') return allComponents.filter(c => c.category === 'Forms').slice(0, 8)
  if (tab === 'Native') return allComponents.filter(c => c.platform === 'Native').slice(0, 8)
  return allComponents.slice(0, 8)
}

export function ComponentTeaser() {
  const [activeTab, setActiveTab] = useState<Tab>('All')
  const visible = filterByTab(activeTab)

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
            182 Production-Ready Components
          </p>
          <div className="h-px w-16 bg-[#f97316]/40 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            For web and mobile. Open source. MIT licensed.
          </h2>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {tabs.map(tab => (
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
              {tab === 'All' && (
                <span className="ml-1.5 text-xs opacity-60">✓</span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {visible.map(c => (
            <div
              key={`${c.name}-${c.platform}`}
              className="group relative bg-[#111111] border border-[#1f1f1f] rounded-lg p-4 flex flex-col gap-2 hover:border-[#f97316]/30 hover:bg-[#161616] transition-all cursor-default"
            >
              <span className="font-medium text-sm text-white">{c.name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded border self-start ${platformColors[c.platform]}`}>
                {c.platform}
              </span>
              <span className="text-xs text-[#525252]">{c.category}</span>
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <code className="text-xs font-mono text-[#f97316] bg-[#0a0a0a]/95 rounded px-2 py-1 w-full text-center truncate border border-[#1f1f1f]">
                  pnpm add @otf/ui
                </code>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/components"
            className="inline-flex items-center gap-2 text-[#f97316] hover:text-[#fb923c] font-medium transition-colors text-sm"
          >
            Browse all 182 →
          </a>
        </div>
      </div>
    </section>
  )
}
