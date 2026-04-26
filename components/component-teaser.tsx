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
    <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden" style={{ background: 'hsl(25 12% 8%)' }}>
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

function KanbanPreview() {
  const cols = [
    {
      label: 'Backlog', color: '#525252', count: 3,
      cards: [
        { title: 'Dark mode tokens', tag: 'Design', priority: 'low' },
        { title: 'API rate limiting', tag: 'Backend', priority: 'med' },
      ]
    },
    {
      label: 'In Progress', color: '#f59e0b', count: 4,
      cards: [
        { title: 'Component registry', tag: 'Frontend', priority: 'high' },
        { title: 'Auth middleware', tag: 'Backend', priority: 'high' },
      ]
    },
    {
      label: 'Review', color: '#3b82f6', count: 2,
      cards: [
        { title: 'Pricing page', tag: 'Design', priority: 'med' },
      ]
    },
    {
      label: 'Done', color: '#22c55e', count: 8,
      cards: [
        { title: 'Navigation rebuild', tag: 'Frontend', priority: 'low' },
      ]
    },
  ]

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#1f1f1f]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f1f] shrink-0">
        <div className="text-white text-xs font-bold">Sprint Board</div>
        <div className="flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-[#f97316]/20 border border-[#1f1f1f] flex items-center justify-center text-[7px] text-[#f97316] font-bold">{String.fromCharCode(65 + i)}</div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex gap-3 p-3 overflow-hidden">
        {cols.map(col => (
          <div key={col.label} className="flex-1 min-w-0 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: col.color }} />
              <span className="text-[9px] font-semibold text-[#737373] uppercase tracking-wider">{col.label}</span>
              <span className="ml-auto text-[8px] bg-[#111111] border border-[#1f1f1f] px-1 rounded text-[#737373]">{col.count}</span>
            </div>
            {col.cards.map((card, i) => (
              <div key={i} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-2.5 space-y-1.5">
                <div className="text-[10px] text-white font-medium leading-tight">{card.title}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[8px] bg-[#1a1a1a] border border-[#1f1f1f] text-[#737373] px-1.5 py-0.5 rounded">{card.tag}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${card.priority === 'high' ? 'bg-red-500' : card.priority === 'med' ? 'bg-amber-500' : 'bg-[#333]'}`} />
                </div>
              </div>
            ))}
            <div className="border border-dashed border-[#1f1f1f] rounded-xl p-2 text-center">
              <span className="text-[8px] text-[#404040]">+ Add card</span>
            </div>
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

function MetricCardsPreview() {
  const metrics = [
    { label: 'Active Users', value: '24.8k', delta: '+12%', pos: true },
    { label: 'Conversion', value: '3.6%', delta: '+0.4%', pos: true },
    { label: 'Churn Rate', value: '1.2%', delta: '-0.3%', pos: true },
    { label: 'ARR', value: '$1.04M', delta: '+$84k', pos: true },
  ]
  return (
    <div className="w-full h-full grid grid-cols-2 gap-2 p-3 bg-[#0a0a0a] rounded-2xl border border-[#1f1f1f]">
      {metrics.map(m => (
        <div key={m.label} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-3 flex flex-col justify-between">
          <div className="text-[9px] text-[#737373] font-medium uppercase tracking-wider">{m.label}</div>
          <div>
            <div className="text-base font-black text-white leading-none">{m.value}</div>
            <div className={`text-[9px] mt-1 font-semibold ${m.pos ? 'text-green-400' : 'text-red-400'}`}>{m.delta}</div>
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

function SidebarAppPreview() {
  return (
    <div className="w-full h-full flex bg-[#0a0a0a] rounded-2xl border border-[#1f1f1f] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[140px] shrink-0 border-r border-[#1f1f1f] flex flex-col">
        <div className="h-10 border-b border-[#1f1f1f] flex items-center px-3 gap-2">
          <img src="/logo.svg" alt="OTF" className="w-4 h-4" />
          <span className="text-white text-[10px] font-semibold truncate">OTF</span>
        </div>
        <div className="flex-1 p-1.5 space-y-0.5">
          {[
            { label: 'Dashboard', active: true },
            { label: 'Issues' },
            { label: 'Projects' },
            { label: 'Members' },
            { label: 'Settings' },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-1.5 px-2 py-1 rounded text-[9px] ${item.active ? 'bg-[#f97316]/10 text-[#f97316] font-medium' : 'text-[#737373]'}`}>
              <div className={`w-1 h-1 rounded-full ${item.active ? 'bg-[#f97316]' : 'bg-[#333]'}`} />
              {item.label}
            </div>
          ))}
        </div>
        <div className="border-t border-[#1f1f1f] p-2">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-[#f97316]/20 flex items-center justify-center">
              <span className="text-[#f97316] text-[7px] font-bold">M</span>
            </div>
            <div className="text-[8px] text-[#737373] truncate">dave@otf.sh</div>
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-10 border-b border-[#1f1f1f] flex items-center px-3">
          <span className="text-white text-[10px] font-bold">Dashboard</span>
          <div className="ml-auto h-5 px-2 rounded bg-[#f97316] text-white text-[8px] font-bold flex items-center">+ New</div>
        </div>
        <div className="flex-1 p-2 grid grid-cols-2 gap-2 overflow-hidden">
          {[
            { label: 'Issues', v: '24' },
            { label: 'Done', v: '18' },
            { label: 'Team', v: '6' },
            { label: 'MRR', v: '$12k' },
          ].map(s => (
            <div key={s.label} className="bg-[#111111] border border-[#1f1f1f] rounded p-2">
              <div className="text-[7px] text-[#737373] uppercase tracking-wider">{s.label}</div>
              <div className="text-sm font-black text-white leading-none mt-0.5">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FormPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] rounded-2xl border border-[#1f1f1f] p-4">
      <div className="w-full max-w-[240px] space-y-3">
        <div className="text-xs font-bold text-white">Create project</div>
        <div className="space-y-2">
          <div>
            <div className="text-[9px] text-[#737373] mb-1">Project name</div>
            <div className="h-8 bg-[#111] border border-[#333] rounded-lg px-2.5 flex items-center">
              <span className="text-[10px] text-white">otf-design-system</span>
              <span className="ml-0.5 w-0.5 h-3 bg-[#f97316] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="text-[9px] text-[#737373] mb-1">Template</div>
            <div className="h-8 bg-[#111] border border-[#1f1f1f] rounded-lg px-2.5 flex items-center justify-between">
              <span className="text-[10px] text-[#737373]">SaaS Dashboard Kit</span>
              <svg className="w-2.5 h-2.5 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          <div className="h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[10px] font-bold text-black">Create project →</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-[#111111]" />
          <span className="text-[8px] text-[#333]">3-step wizard</span>
          <div className="flex-1 h-px bg-[#111111]" />
        </div>
        <div className="flex justify-center gap-1.5">
          {[true, true, false].map((active, i) => (
            <div key={i} className={`h-1 rounded-full ${active ? 'w-4 bg-[#f97316]' : 'w-2 bg-[#111111]'}`} />
          ))}
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
          Layout (3 rows):
          Row 1: [DataTable — wide] [Chart — narrow]
          Row 2: [Sidebar+App — medium] [Kanban — medium]
          Row 3: [Metrics — narrow] [Command — narrow] [Form — narrow]
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

          {/* Row 3 — Metrics (1 col) */}
          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Metrics</BentoLabel>
            <div className="flex-1 h-[200px]"><MetricCardsPreview /></div>
          </div>

          {/* Row 3 — Command (1 col) */}
          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Command Palette</BentoLabel>
            <div className="flex-1 h-[200px]"><CommandPalettePreview /></div>
          </div>

          {/* Row 3 — Form (1 col) */}
          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Form</BentoLabel>
            <div className="flex-1 h-[200px]"><FormPreview /></div>
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
