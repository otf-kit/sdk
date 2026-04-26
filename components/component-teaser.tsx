'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ─── Inline Bento Previews (full-fidelity, no registry dependency) ─────────────

// Exact same data & columns as DataDisplay.stories.tsx in storybook-web
const TABLE_DATA = [
  { id: 1, name: 'Alice Johnson', status: 'Active',   amount: '$1,200' },
  { id: 2, name: 'Bob Smith',     status: 'Inactive', amount: '$800'   },
  { id: 3, name: 'Carol White',   status: 'Active',   amount: '$3,400' },
]
const TABLE_COLS = ['ID', 'Name', 'Status', 'Amount']

function SortIcon() {
  return (
    <svg className="w-3 h-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />
    </svg>
  )
}

// theme-minimal dark tokens (hsl computed):
// --background: hsl(25 12% 8%)  = #161412
// --card:       hsl(25 12% 10%) = #1a1714
// --border:     hsl(25 12% 18%) = #2e2a26
// --muted:      hsl(25 12% 14%) = #231f1d
// --muted-foreground: hsl(25 10% 55%) = #9e9389
// --foreground: hsl(35 15% 90%) = #e8e4df

function DataTablePreview() {
  return (
    <div className="w-full h-full flex flex-col bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#1f1f1f]">
      {/* Search bar */}
      <div className="px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-center gap-2 h-10 rounded-xl px-3 border" style={{ background: 'hsl(25 12% 10%)', borderColor: 'hsl(25 12% 18%)' }}>
          <svg className="w-4 h-4 shrink-0" style={{ color: 'hsl(25 10% 55%)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span className="text-[13px]" style={{ color: 'hsl(25 10% 55%)' }}>Search...</span>
        </div>
      </div>

      {/* Table */}
      <div className="mx-4 rounded-xl overflow-hidden shrink-0 border" style={{ borderColor: 'hsl(25 12% 18%)' }}>
        {/* Head */}
        <div className="grid grid-cols-4" style={{ background: 'hsl(25 12% 14% / 0.6)' }}>
          {TABLE_COLS.map(h => (
            <div key={h} className="flex items-center gap-1 px-4 py-3 text-[12px] font-medium" style={{ color: 'hsl(25 10% 55%)' }}>
              {h}
              {h !== 'Status' && <SortIcon />}
            </div>
          ))}
        </div>
        {/* Rows */}
        {TABLE_DATA.map((row, i) => (
          <div key={row.id} className="grid grid-cols-4 border-t" style={{ borderColor: 'hsl(25 12% 18%)', background: i % 2 !== 0 ? 'hsl(25 12% 14% / 0.3)' : 'transparent' }}>
            <div className="px-4 py-3 text-[13px]" style={{ color: 'hsl(35 15% 90%)' }}>{row.id}</div>
            <div className="px-4 py-3 text-[13px]" style={{ color: 'hsl(35 15% 90%)' }}>{row.name}</div>
            <div className="px-4 py-3 text-[13px]" style={{ color: 'hsl(35 15% 90%)' }}>{row.status}</div>
            <div className="px-4 py-3 text-[13px]" style={{ color: 'hsl(35 15% 90%)' }}>{row.amount}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <span className="text-[13px]" style={{ color: 'hsl(25 10% 55%)' }}>Page 1 of 2</span>
        <div className="flex items-center gap-2">
          <div className="h-8 w-[70px] rounded-xl border flex items-center justify-between px-2" style={{ background: 'hsl(25 12% 10%)', borderColor: 'hsl(25 12% 18%)' }}>
            <span className="text-[12px]" style={{ color: 'hsl(25 10% 55%)' }}>10</span>
            <svg className="w-3 h-3" style={{ color: 'hsl(25 10% 55%)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/></svg>
          </div>
          {[
            <path key="l" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>,
            <path key="r" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>,
          ].map((path, i) => (
            <button key={i} className="h-8 w-8 rounded-xl border flex items-center justify-center" style={{ background: 'hsl(25 12% 10%)', borderColor: 'hsl(25 12% 18%)' }}>
              <svg className="w-4 h-4" style={{ color: 'hsl(25 10% 55%)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{path}</svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Exact same data as Advanced.stories.tsx kanbanCols
const KANBAN_COLS = [
  { id: 'todo', title: 'To Do', color: '#525252', cards: [
    { id: 'c1', title: 'Design login page', description: 'Wireframes + hi-fi', badge: 'UI' },
    { id: 'c2', title: 'Write API docs', badge: 'Docs' },
  ]},
  { id: 'progress', title: 'In Progress', color: '#f59e0b', cards: [
    { id: 'c3', title: 'Implement auth flow', description: 'OAuth + JWT tokens', badge: 'Backend' },
  ]},
  { id: 'review', title: 'In Review', color: '#3b82f6', cards: [
    { id: 'c4', title: 'Payment integration', description: 'Stripe webhooks' },
  ]},
  { id: 'done', title: 'Done', color: '#22c55e', cards: [
    { id: 'c5', title: 'Set up CI/CD', badge: 'DevOps' },
    { id: 'c6', title: 'Database schema', description: 'PostgreSQL migrations' },
  ]},
]

function KanbanPreview() {
  return (
    <div className="w-full h-full flex flex-col bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#1f1f1f]">
      <div className="flex gap-2.5 p-3 overflow-hidden h-full">
        {KANBAN_COLS.map(col => (
          <div key={col.id} className="flex-1 min-w-0 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 shrink-0 mb-0.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: col.color }} />
              <span className="text-[9px] font-semibold text-[#737373] truncate">{col.title}</span>
              <span className="ml-auto text-[8px] bg-[#111111] border border-[#1f1f1f] px-1 rounded text-[#555] shrink-0">{col.cards.length}</span>
            </div>
            {col.cards.map(card => (
              <div key={card.id} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-2 space-y-1">
                <div className="text-[9.5px] text-white font-medium leading-tight">{card.title}</div>
                {card.description && <div className="text-[8px] text-[#555] leading-tight">{card.description}</div>}
                {card.badge && (
                  <span className="inline-block text-[7.5px] bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] px-1.5 py-0.5 rounded-md">{card.badge}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function ChartPreview() {
  const data = [38, 55, 42, 70, 58, 82, 68, 90, 72, 88, 80, 100]
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D']
  const W = 300, H = 120, pad = 4
  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (W - pad * 2),
    y: pad + (1 - v / 100) * (H - pad * 2),
  }))
  // smooth curve using cubic bezier
  const pathD = pts.reduce((acc, p, i) => {
    if (i === 0) return `M${p.x},${p.y}`
    const prev = pts[i - 1]
    const cpx = (prev.x + p.x) / 2
    return acc + ` C${cpx},${prev.y} ${cpx},${p.y} ${p.x},${p.y}`
  }, '')
  const areaD = `${pathD} L${pts[pts.length-1].x},${H} L${pts[0].x},${H} Z`

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#1f1f1f] p-4">
      <div className="flex items-start justify-between mb-3 shrink-0">
        <div>
          <div className="text-[9px] text-[#737373] font-medium uppercase tracking-wider mb-1">Revenue</div>
          <div className="text-xl font-black text-white leading-none">$84.2k</div>
          <div className="text-[9px] text-green-400 font-normal mt-1">↑ +23.4% vs last year</div>
        </div>
        <div className="text-[9px] text-[#737373] bg-[#111111] border border-[#1f1f1f] px-2 py-1 rounded-lg">2025</div>
      </div>

      {/* SVG area chart */}
      <div className="flex-1 relative min-h-0">
        <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((t, i) => (
            <line key={i} x1={pad} y1={pad + t * (H - pad * 2)} x2={W - pad} y2={pad + t * (H - pad * 2)}
              stroke="#1f1f1f" strokeWidth="0.5" />
          ))}
          {/* Area fill */}
          <path d={areaD} fill="url(#areaGrad)" />
          {/* Line */}
          <path d={pathD} fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Last point dot */}
          <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="3" fill="#f97316" />
          <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="5" fill="#f97316" fillOpacity="0.2" />
          {/* Month labels */}
          {months.map((m, i) => (
            <text key={i}
              x={pad + (i / (data.length - 1)) * (W - pad * 2)}
              y={H + 15}
              textAnchor="middle"
              fontSize="9"
              fill="#404040"
              fontFamily="Inter, sans-serif">
              {m}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}

// Exact same data as DataDisplay.stories.tsx StatStory
// <Stat label="Total Revenue" value="$48,295" trend={12.5} trendLabel="vs last month" icon={<BarChart2 />} />
// <Stat label="Active Users" value="2,340" trend={-3.2} trendLabel="vs last week" icon={<User />} />
// <Stat label="Avg Rating" value="4.8" trend={0.3} trendLabel="this quarter" icon={<Star />} />
const STAT_DATA = [
  { label: 'Total Revenue', value: '$48,295', trend: 12.5, trendLabel: 'vs last month', pos: true, icon: 'barchart' },
  { label: 'Active Users', value: '2,340', trend: 3.2, trendLabel: 'vs last week', pos: false, icon: 'user' },
  { label: 'Avg Rating', value: '4.8', trend: 0.3, trendLabel: 'this quarter', pos: true, icon: 'star' },
]

function StatIcon({ type }: { type: string }) {
  if (type === 'barchart') return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5h4v7H3v-7zm7-6h4v13h-4V7.5zm7-4h4v17h-4V3.5z"/>
    </svg>
  )
  if (type === 'user') return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
    </svg>
  )
  // star
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
    </svg>
  )
}

function MetricCardsPreview() {
  return (
    <div className="w-full h-full flex gap-3 p-3 bg-[#0a0a0a] rounded-2xl border border-[#1f1f1f]">
      {STAT_DATA.map(s => (
        <div key={s.label} className="flex-1 bg-[#111111] border border-[#1f1f1f] rounded-xl p-4 flex flex-col justify-between min-w-0">
          {/* Label + icon row */}
          <div className="flex items-start justify-between gap-2">
            <div className="text-[11px] font-medium text-[#737373] leading-tight">{s.label}</div>
            <div className="text-[#555] shrink-0"><StatIcon type={s.icon} /></div>
          </div>
          {/* Value */}
          <div className="text-2xl font-bold text-white mt-2 leading-none">{s.value}</div>
          {/* Trend */}
          <div className="flex items-center gap-1 mt-2">
            <span className={`flex items-center gap-0.5 text-[11px] font-medium ${s.pos ? 'text-green-500' : 'text-red-500'}`}>
              {s.pos ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/></svg>
              ) : (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.306-4.306a11.95 11.95 0 015.814 5.518l2.74 1.22m0 0-5.94 2.281m5.94-2.28-2.28-5.941"/></svg>
              )}
              {s.trend}%
            </span>
            <span className="text-[11px] text-[#555]">{s.trendLabel}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function CommandPalettePreview() {
  const items = [
    { icon: '⌘', label: 'New Issue', shortcut: 'C' },
    { icon: '/', label: 'Search Everything', shortcut: 'K' },
    { icon: '→', label: 'Go to Dashboard', shortcut: '' },
    { icon: '◎', label: 'Switch Workspace', shortcut: '' },
  ]
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] rounded-2xl border border-[#1f1f1f] p-4">
      <div className="w-full max-w-[280px] bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#1f1f1f]">
          <svg className="w-3 h-3 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span className="text-xs text-[#737373]">Search or jump to…</span>
          <span className="ml-auto text-[9px] text-[#737373] border border-[#1f1f1f] px-1 py-0.5 rounded">ESC</span>
        </div>
        <div className="py-1.5">
          <div className="px-3 py-1 text-[9px] text-[#737373] uppercase tracking-wider font-semibold">Quick actions</div>
          {items.map((item, i) => (
            <div key={i} className={`flex items-center gap-2.5 px-3 py-1.5 ${i === 0 ? 'bg-[#f97316]/10 text-white' : 'text-[#737373]'}`}>
              <span className={`text-[11px] w-4 text-center ${i === 0 ? 'text-[#f97316]' : ''}`}>{item.icon}</span>
              <span className="text-[10px] flex-1">{item.label}</span>
              {item.shortcut && <kbd className="text-[8px] border border-[#1f1f1f] text-[#737373] px-1 py-0.5 rounded font-mono">⌘{item.shortcut}</kbd>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Exact same data as SidebarLayoutDashboard.tsx
const SIDEBAR_NAV = ['Dashboard', 'Projects', 'Team', 'Settings']
const SIDEBAR_KPIS = [
  { label: 'Revenue', value: '$48,295' },
  { label: 'MRR', value: '$2,847' },
  { label: 'Users', value: '384' },
  { label: 'Churn', value: '3.24%' },
]
const SIDEBAR_ROWS = [
  { name: 'Alpha Project', progress: 72, status: 'Active' },
  { name: 'Beta Launch', progress: 45, status: 'Review' },
  { name: 'Gamma Research', progress: 90, status: 'Done' },
]

function SidebarAppPreview() {
  return (
    <div className="w-full h-full flex bg-[#0a0a0a] rounded-2xl border border-[#1f1f1f] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[100px] shrink-0 border-r border-[#1f1f1f] flex flex-col">
        {/* Logo / workspace */}
        <div className="h-9 border-b border-[#1f1f1f] flex items-center px-2.5 gap-1.5 shrink-0">
          <div className="w-4 h-4 rounded bg-[#f97316] flex items-center justify-center text-[7px] font-black text-white shrink-0">A</div>
          <span className="text-white text-[9px] font-semibold truncate">Acme Inc</span>
        </div>
        {/* Nav */}
        <div className="flex-1 p-1.5 space-y-0.5 overflow-hidden">
          {SIDEBAR_NAV.map((item, i) => (
            <div key={item} className={`flex items-center gap-1.5 px-2 py-1 rounded text-[9px] ${i === 0 ? 'bg-[#f97316]/10 text-[#f97316] font-medium' : 'text-[#555]'}`}>
              <div className={`w-1 h-1 rounded-full shrink-0 ${i === 0 ? 'bg-[#f97316]' : 'bg-[#333]'}`} />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
        {/* User */}
        <div className="border-t border-[#1f1f1f] p-2 shrink-0">
          <div className="w-5 h-5 rounded-full bg-[#1f1f1f] border border-[#2f2f2f] flex items-center justify-center text-[7px] font-bold text-[#737373]">U</div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <div className="h-9 border-b border-[#1f1f1f] flex items-center px-2.5 gap-2 shrink-0">
          <span className="text-white text-[9px] font-bold flex-1">Dashboard</span>
        </div>
        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-1.5 p-2 shrink-0">
          {SIDEBAR_KPIS.map(k => (
            <div key={k.label} className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-1.5">
              <div className="text-[7px] text-[#555] mb-0.5 truncate">{k.label}</div>
              <div className="text-[10px] font-black text-white leading-none">{k.value}</div>
            </div>
          ))}
        </div>
        {/* Table */}
        <div className="flex-1 px-2 pb-2 overflow-hidden">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg overflow-hidden h-full">
            {SIDEBAR_ROWS.map((row, i) => (
              <div key={row.name} className={`flex items-center gap-2 px-2 py-1.5 ${i > 0 ? 'border-t border-[#1a1a1a]' : ''}`}>
                <div className="flex-1 min-w-0">
                  <div className="text-[8.5px] text-white font-medium truncate">{row.name}</div>
                  <div className="mt-0.5 h-1 bg-[#1f1f1f] rounded-full overflow-hidden">
                    <div className="h-full bg-[#f97316] rounded-full" style={{ width: `${row.progress}%` }} />
                  </div>
                </div>
                <div className="text-[7px] text-[#555] shrink-0">{row.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Exact same data as Layouts.stories.tsx SplitPageLayout
const SPLIT_EMAILS = ['Team meeting notes', 'Q4 report draft', 'Design review feedback', 'Onboarding docs', 'Release changelog']

function FormPreview() {
  return (
    <div className="w-full h-full flex bg-[#0a0a0a] rounded-2xl border border-[#1f1f1f] overflow-hidden">
      {/* Left list */}
      <div className="w-[48%] border-r border-[#1f1f1f] flex flex-col">
        <div className="px-2.5 py-2 border-b border-[#1f1f1f] shrink-0">
          <div className="text-[9px] font-bold text-white">Inbox</div>
        </div>
        <div className="flex-1 overflow-hidden">
          {SPLIT_EMAILS.map((email, i) => (
            <div key={email} className={`px-2.5 py-2 border-b border-[#111111] cursor-default ${i === 0 ? 'bg-[#f97316]/8' : ''}`}>
              <div className={`text-[8.5px] font-medium leading-tight ${i === 0 ? 'text-white' : 'text-[#737373]'}`}>{email}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Right detail */}
      <div className="flex-1 flex flex-col p-2.5 overflow-hidden">
        <div className="text-[9px] font-bold text-white mb-1.5">Team meeting notes</div>
        <div className="flex-1 bg-[#111111] border border-[#1f1f1f] rounded-lg p-2 overflow-hidden">
          <div className="text-[7.5px] text-[#555] leading-relaxed">
            Discussed Q4 roadmap priorities and team velocity. Action items assigned to engineering leads. Next sync in two weeks.
          </div>
        </div>
        <div className="mt-2 flex gap-1.5">
          <div className="flex-1 h-6 bg-[#1f1f1f] rounded-lg border border-[#2a2a2a] flex items-center px-2">
            <span className="text-[7.5px] text-[#333]">Reply…</span>
          </div>
          <div className="h-6 px-2 bg-[#f97316] rounded-lg flex items-center">
            <span className="text-[7.5px] font-bold text-white">Send</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Exact same as Blocks.stories.tsx FeedbackModalStory
const REACTIONS = ['😊', '😐', '😕', '😡', '🤩']

function FeedbackModalPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] rounded-2xl border border-[#1f1f1f] p-3">
      <div className="w-full max-w-[240px] bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-2">
          <div className="text-[11px] font-bold text-white">Share your feedback</div>
          <div className="text-[8.5px] text-[#737373] mt-0.5">How are you feeling today?</div>
        </div>
        {/* Reactions */}
        <div className="flex justify-between px-4 py-2">
          {REACTIONS.map((r, i) => (
            <button key={r} className={`text-base p-1 rounded-lg transition-all ${i === 4 ? 'bg-[#f97316]/15 ring-1 ring-[#f97316]/40 scale-110' : 'opacity-60'}`}>
              {r}
            </button>
          ))}
        </div>
        {/* Textarea */}
        <div className="px-4 pb-3">
          <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-2 h-14">
            <span className="text-[8px] text-[#333]">Tell us more…</span>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-2 px-4 pb-4">
          <div className="flex-1 h-7 border border-[#2a2a2a] rounded-lg flex items-center justify-center">
            <span className="text-[8.5px] text-[#737373]">Cancel</span>
          </div>
          <div className="flex-1 h-7 bg-[#f97316] rounded-lg flex items-center justify-center">
            <span className="text-[8.5px] font-bold text-white">Submit</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export function ComponentTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Header animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
      defaults: { ease: 'power3.out' },
    })

    tl.from('.ct-label', { opacity: 0, y: -8, duration: 0.4 })
      .from('.ct-title', { opacity: 0, y: 24, duration: 0.6, stagger: 0.06 }, '<0.1')
      .from('.ct-sub', { opacity: 0, y: 12, duration: 0.5 }, '<0.3')
      .from('.ct-stat', { opacity: 0, y: 16, duration: 0.4, stagger: 0.08 }, '<0.2')
      .from('.ct-cta', { opacity: 0, y: 8, duration: 0.4 }, '<0.2')

    // Bento cell stagger
    gsap.utils.toArray<Element>('.bento-cell').forEach((cell, i) => {
      gsap.from(cell, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: i * 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cell,
          start: 'top 85%',
          once: true,
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-28 border-t border-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="ct-label inline-flex items-center gap-2 text-[11px] font-bold text-[#f97316] uppercase tracking-[0.18em] mb-5">
              <span className="w-4 h-px bg-[#f97316]/60" />
              Component Library
            </div>

            <h2 className="tracking-tighter leading-[1.0]">
              <span className="ct-title block text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase">
                180+ components.
              </span>
              <span className="ct-title block text-4xl sm:text-5xl lg:text-6xl font-black text-[#404040] uppercase">
                Every UI pattern,
              </span>
              <span className="ct-title block text-4xl sm:text-5xl lg:text-6xl font-black text-[#404040] uppercase">
                covered.
              </span>
            </h2>
          </div>

          <div className="lg:text-right space-y-5 shrink-0">
            <p className="ct-sub text-[#737373] text-sm leading-relaxed max-w-xs lg:ml-auto">
              Buttons, data tables, charts, kanban boards, sidebars — fully typed, accessible, dark-mode native.
            </p>

            <div className="ct-stat flex flex-wrap lg:justify-end gap-x-6 gap-y-3">
              {[
                { n: '180+', label: 'components' },
                { n: '8', label: 'categories' },
                { n: '100%', label: 'TypeScript' },
                { n: 'MIT', label: 'license' },
              ].map(s => (
                <div key={s.label} className="text-center lg:text-right">
                  <div className="text-lg font-black text-white leading-none">{s.n}</div>
                  <div className="text-[9px] text-[#333] uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <Link href="/components"
              className="ct-cta inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-[#f5f5f5] font-bold rounded-lg transition-colors uppercase tracking-widest text-xs">
              Browse all
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* ── Bento grid ─────────────────────────────────────────────────── */}
        {/*
          Layout (4 rows):
          Row 1: [DataTable — 2 cols] [Chart — 1 col]
          Row 2: [Sidebar App — 1 col] [Kanban — 2 cols]
          Row 3: [Metrics — full 3 cols, 3 cards side-by-side]
          Row 4: [Command — 1 col] [Split Page — 1 col] [Feedback — 1 col]
        */}
        <div className="grid grid-cols-3 gap-3">

          {/* Row 1 — DataTable (spans 2 cols) */}
          <div className="bento-cell col-span-2 flex flex-col gap-2">
            <BentoLabel>Data Table</BentoLabel>
            <div className="flex-1 h-[260px]"><DataTablePreview /></div>
          </div>

          {/* Row 1 — Chart (1 col) */}
          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Area Chart</BentoLabel>
            <div className="flex-1 h-[260px]"><ChartPreview /></div>
          </div>

          {/* Row 2 — Sidebar App (1 col) */}
          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>App Shell</BentoLabel>
            <div className="flex-1 h-[240px]"><SidebarAppPreview /></div>
          </div>

          {/* Row 2 — Kanban (spans 2 cols) */}
          <div className="bento-cell col-span-2 flex flex-col gap-2">
            <BentoLabel>Kanban Board</BentoLabel>
            <div className="flex-1 h-[240px]"><KanbanPreview /></div>
          </div>

          {/* Row 3 — Metrics (full 3 cols so 3 cards sit side by side nicely) */}
          <div className="bento-cell col-span-3 flex flex-col gap-2">
            <BentoLabel>Metrics</BentoLabel>
            <div className="flex-1 h-[180px]"><MetricCardsPreview /></div>
          </div>

          {/* Row 4 — Command (1 col) + Split Page (1 col) + Feedback Modal (1 col) */}
          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Command Palette</BentoLabel>
            <div className="flex-1 h-[240px]"><CommandPalettePreview /></div>
          </div>

          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Split Page Layout</BentoLabel>
            <div className="flex-1 h-[240px]"><FormPreview /></div>
          </div>

          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Feedback Modal</BentoLabel>
            <div className="flex-1 h-[240px]"><FeedbackModalPreview /></div>
          </div>
        </div>

        {/* ── Footer strip ───────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[#0f0f0f]">
          <div className="flex items-center gap-6">
            {['React', 'TypeScript', 'Tailwind CSS', 'Radix UI'].map((t, i) => (
              <span key={t} className="flex items-center gap-6">
                {i > 0 && <span className="w-0.5 h-0.5 rounded-full bg-[#1f1f1f]" />}
                <span className="text-[10px] text-[#333] font-semibold uppercase tracking-widest">{t}</span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#737373]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live previews · No screenshots
          </div>
        </div>
      </div>
    </section>
  )
}

function BentoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[9px] font-bold text-[#404040] uppercase tracking-[0.15em]">
      {children}
    </div>
  )
}
