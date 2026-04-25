'use client'

import React, { useState } from 'react'

const BUTTON_VARIANTS = [
  { label: 'Primary', cls: 'bg-white text-black' },
  { label: 'Ghost', cls: 'bg-transparent text-white border border-[#333333]' },
  { label: 'Gradient', cls: 'bg-gradient-to-b from-[#f97316] to-[#ea580c] text-white' },
  { label: 'Destructive', cls: 'bg-red-500/10 text-red-400 border border-red-500/20' },
]

const COMPONENT_TABS = ['DataGrid', 'Buttons', 'Cards', 'Charts', 'Forms'] as const
type Tab = typeof COMPONENT_TABS[number]

function ButtonsPreview() {
  return (
    <div className="flex flex-wrap gap-3 p-6">
      {BUTTON_VARIANTS.map(v => (
        <button key={v.label} className={`px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-80 ${v.cls}`}>
          {v.label}
        </button>
      ))}
      <button className="px-4 py-2 rounded-md text-sm font-semibold text-[#525252] cursor-not-allowed opacity-50 border border-[#1f1f1f]">
        Disabled
      </button>
      <button className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-[#f97316] flex items-center gap-2">
        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        Loading
      </button>
    </div>
  )
}

function CardsPreview() {
  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      <div className="border border-[#333]/40 rounded-lg p-[3px] bg-gradient-to-b from-[#1a1a1a] to-[#111111] col-span-2">
        <div className="border border-[#333]/20 rounded-[7px] p-[2px]">
          <div className="border border-[#333]/10 rounded-[5px] p-[1px]">
            <div className="bg-[#0d0d0d] rounded-[3px] p-4">
              <div className="text-[10px] text-[#525252] font-mono mb-2">TextureCard — 4-ring nested surface</div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f97316]/20 border border-[#f97316]/30 flex items-center justify-center">
                  <span className="text-[#f97316] text-[10px] font-bold">M</span>
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">Dave Soni</div>
                  <div className="text-[#525252] text-[10px]">dave@otf.sh</div>
                </div>
                <div className="ml-auto">
                  <div className="px-2.5 py-1 rounded-md bg-[#f97316] text-white text-[10px] font-bold">Admin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-3">
        <div className="text-[9px] text-[#525252] uppercase tracking-wider mb-1">MRR</div>
        <div className="text-lg font-black text-white">$4,820</div>
        <div className="text-[9px] text-green-500 mt-0.5 font-semibold">↑ +18%</div>
      </div>
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-3">
        <div className="text-[9px] text-[#525252] uppercase tracking-wider mb-1">Users</div>
        <div className="text-lg font-black text-white">1,240</div>
        <div className="text-[9px] text-[#f97316] mt-0.5 font-semibold">↑ +7%</div>
      </div>
    </div>
  )
}

function DataGridPreview() {
  const rows = [
    { id: '#OTF-101', title: 'Add auth guards', status: 'Done', priority: 'High', assignee: 'M' },
    { id: '#OTF-102', title: 'Build DataGrid', status: 'In Progress', priority: 'Urgent', assignee: 'S' },
    { id: '#OTF-103', title: 'Polish hero section', status: 'Todo', priority: 'Medium', assignee: 'K' },
    { id: '#OTF-104', title: 'Write AI prompts', status: 'Backlog', priority: 'Low', assignee: 'M' },
  ]
  const statusColor: Record<string, string> = {
    Done: 'text-green-400 bg-green-500/10 border-green-500/20',
    'In Progress': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    Todo: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    Backlog: 'text-[#525252] bg-[#1f1f1f] border-[#333333]',
  }
  const priorityColor: Record<string, string> = {
    Urgent: 'text-red-400', High: 'text-[#f97316]', Medium: 'text-yellow-400', Low: 'text-[#525252]',
  }
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-xs text-white font-semibold">Issues</div>
        <div className="text-[10px] text-[#525252] bg-[#1f1f1f] border border-[#333333] rounded px-2 py-0.5">4 open</div>
        <div className="ml-auto flex gap-1">
          <div className="h-6 px-2 border border-[#333333] rounded text-[10px] text-[#525252] flex items-center">Filter</div>
          <div className="h-6 px-2 bg-[#f97316] rounded text-[10px] text-white flex items-center font-bold">+ New</div>
        </div>
      </div>
      <div className="border border-[#1f1f1f] rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr,2fr,auto,auto,auto] gap-2 px-3 py-1.5 bg-[#111111] border-b border-[#1f1f1f]">
          {['ID', 'Title', 'Status', 'Priority', ''].map(h => (
            <div key={h} className="text-[9px] text-[#525252] uppercase tracking-wider">{h}</div>
          ))}
        </div>
        {rows.map((row, i) => (
          <div key={row.id} className={`grid grid-cols-[1fr,2fr,auto,auto,auto] gap-2 items-center px-3 py-2 ${i < rows.length - 1 ? 'border-b border-[#1a1a1a]' : ''} hover:bg-[#111111] transition-colors`}>
            <div className="text-[9px] font-mono text-[#525252]">{row.id}</div>
            <div className="text-[10px] text-white truncate">{row.title}</div>
            <div className={`text-[9px] px-1.5 py-0.5 rounded border font-medium whitespace-nowrap ${statusColor[row.status]}`}>{row.status}</div>
            <div className={`text-[9px] font-semibold ${priorityColor[row.priority]}`}>{row.priority}</div>
            <div className="w-5 h-5 rounded-full bg-[#f97316]/20 flex items-center justify-center">
              <span className="text-[#f97316] text-[8px] font-bold">{row.assignee}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChartsPreview() {
  const bars = [28, 42, 35, 58, 50, 72, 65, 80, 70, 85, 78, 92]
  return (
    <div className="p-4 space-y-4">
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-3">
        <div className="text-[10px] text-[#525252] mb-2">Issue Trend (12 weeks)</div>
        <div className="flex items-end gap-1 h-16">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: `rgba(249,115,22,${i === 11 ? 0.9 : 0.25 + i * 0.055})` }} />
          ))}
        </div>
      </div>
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-3">
        <div className="text-[10px] text-[#525252] mb-2">Status Distribution</div>
        <div className="space-y-1.5">
          {[
            { label: 'Done', pct: 36, color: '#22c55e' },
            { label: 'In Progress', pct: 24, color: '#f59e0b' },
            { label: 'Todo', pct: 24, color: '#3b82f6' },
            { label: 'Backlog', pct: 16, color: '#525252' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.color }} />
              <div className="flex-1 h-1 bg-[#1f1f1f] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
              </div>
              <span className="text-[9px] text-[#525252] w-6 text-right">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FormsPreview() {
  return (
    <div className="p-6 space-y-3">
      <div>
        <div className="text-[10px] text-[#737373] mb-1.5 font-medium">Full name</div>
        <div className="h-8 bg-[#111111] border border-[#333333] rounded-md px-3 flex items-center text-[11px] text-white">Dave Soni</div>
      </div>
      <div>
        <div className="text-[10px] text-[#737373] mb-1.5 font-medium">Email address</div>
        <div className="h-8 bg-[#111111] border border-[#f97316]/40 rounded-md px-3 flex items-center text-[11px] text-white ring-1 ring-[#f97316]/30">dave@otf.sh</div>
      </div>
      <div>
        <div className="text-[10px] text-[#737373] mb-1.5 font-medium">Password</div>
        <div className="h-8 bg-[#111111] border border-[#333333] rounded-md px-3 flex items-center justify-between">
          <span className="text-[11px] tracking-widest text-white">••••••••</span>
          <svg className="w-3.5 h-3.5 text-[#525252]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        </div>
        <div className="flex gap-0.5 mt-1.5">
          {[1,2,3,4].map(i => (
            <div key={i} className={`h-0.5 flex-1 rounded-full ${i <= 3 ? 'bg-[#f97316]' : 'bg-[#1f1f1f]'}`} />
          ))}
        </div>
        <div className="text-[9px] text-[#f97316] mt-1">Strong password</div>
      </div>
      <button className="w-full h-8 bg-gradient-to-b from-[#f97316] to-[#ea580c] rounded-md text-white text-xs font-bold">
        Create account
      </button>
    </div>
  )
}

const PREVIEWS: Record<Tab, () => React.ReactElement> = {
  Buttons: ButtonsPreview,
  Cards: CardsPreview,
  DataGrid: DataGridPreview,
  Charts: ChartsPreview,
  Forms: FormsPreview,
}

const COUNTS: Record<Tab, string> = {
  Buttons: '12 variants',
  Cards: '8 variants',
  DataGrid: 'Virtualized',
  Charts: '6 types',
  Forms: 'AutoForm',
}

export function ComponentTeaser() {
  const [activeTab, setActiveTab] = useState<Tab>('DataGrid')
  const Preview = PREVIEWS[activeTab]

  return (
    <section className="py-24 px-6 border-t border-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left copy */}
          <div className="lg:w-[360px] shrink-0">
            <p className="text-xs font-semibold text-[#f97316] uppercase tracking-widest mb-3">
              Component Library
            </p>
            <div className="h-px w-16 bg-[#f97316]/40 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-[1.1]">
              180+ components.<br />
              <span className="text-[#737373]">Every category covered.</span>
            </h2>
            <p className="text-[#737373] text-base mb-8 leading-relaxed">
              Buttons, data tables, charts, forms, navigation, feedback — fully typed, accessible, and built for dark UIs.
            </p>

            <div className="space-y-2">
              {[
                { label: 'Primitives', count: '42', desc: 'Button, Input, Select, Dialog...' },
                { label: 'Data Display', count: '28', desc: 'Table, Chart, Timeline, Card...' },
                { label: 'Navigation', count: '18', desc: 'Sidebar, Command, Tabs, Breadcrumb...' },
                { label: 'Feedback', count: '16', desc: 'Toast, Badge, Alert, Skeleton...' },
                { label: 'Layout', count: '24', desc: 'AppShell, PageContainer, Grid...' },
                { label: 'Forms', count: '22', desc: 'AutoForm, Field, DatePicker, Upload...' },
              ].map(cat => (
                <div key={cat.label} className="flex items-center gap-3 py-2.5 border-b border-[#111111] last:border-0">
                  <div className="w-8 h-8 rounded-md bg-[#111111] border border-[#1f1f1f] flex items-center justify-center shrink-0">
                    <span className="text-[#f97316] text-[10px] font-black">{cat.count}</span>
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">{cat.label}</div>
                    <div className="text-[#525252] text-[10px]">{cat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — live preview */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-4 flex-wrap">
              {COMPONENT_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20'
                      : 'text-[#525252] hover:text-white border border-transparent hover:border-[#1f1f1f]'
                  }`}
                >
                  {tab}
                  <span className={`text-[9px] ${activeTab === tab ? 'text-[#f97316]/70' : 'text-[#333333]'}`}>
                    {COUNTS[tab]}
                  </span>
                </button>
              ))}
            </div>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
              <div className="h-9 bg-[#111111] border-b border-[#1f1f1f] flex items-center px-4 gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="text-[10px] text-[#525252] font-mono">{activeTab}.tsx — @otf/ui</div>
                <div className="ml-auto text-[10px] text-green-500 font-mono">● live</div>
              </div>
              <Preview />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-[#525252] text-xs">Free, open source, MIT licensed</p>
              <a href="/components" className="text-xs text-[#f97316] hover:text-[#fb923c] font-semibold flex items-center gap-1 transition-colors">
                Browse all 180+ →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
