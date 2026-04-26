'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ─── Shared design tokens (match storybook exactly) ────────────────────────────
// bg:       #111111  (card surfaces)
// bg-deep:  #0d0d0d  (panel bg)
// border:   #1f1f1f  (card borders)
// muted:    #737373  (secondary text)
// dim:      #404040  (tertiary text)
// orange:   #f97316

// ─── 1. Kanban Board ──────────────────────────────────────────────────────────
function KanbanPreview() {
  const cols = [
    {
      label: 'To Do', count: 2, cards: [
        { title: 'Design login page', tag: 'UI', tagColor: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20' },
        { title: 'Write API docs', tag: 'Docs', tagColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
      ]
    },
    {
      label: 'In Progress', count: 1, cards: [
        { title: 'Implement auth flow', tag: 'Backend', tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
      ]
    },
    {
      label: 'In Review', count: 1, cards: [
        { title: 'Payment integration', tag: 'DevOps', tagColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
      ]
    },
    {
      label: 'Done', count: 2, cards: [
        { title: 'Set up CI/CD', tag: 'DevOps', tagColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
        { title: 'Database schema', tag: 'Backend', tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
      ]
    },
  ]
  return (
    <div className="w-full h-full flex flex-col bg-[#0d0d0d] rounded-2xl overflow-hidden border border-[#1f1f1f]">
      <div className="flex-1 flex gap-2.5 p-3 overflow-hidden">
        {cols.map(col => (
          <div key={col.label} className="flex-1 min-w-0 bg-[#111111] rounded-xl border border-[#1f1f1f] flex flex-col">
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#1f1f1f] shrink-0">
              <span className="text-[11px] font-semibold text-white">{col.label}</span>
              <span className="text-[10px] text-[#737373] bg-[#1a1a1a] border border-[#2a2a2a] px-1.5 py-0.5 rounded-md font-medium">{col.count}</span>
            </div>
            <div className="flex-1 p-2 space-y-2 overflow-hidden">
              {col.cards.map((card, i) => (
                <div key={i} className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg p-2.5">
                  <div className="text-[11px] font-semibold text-white leading-tight mb-2">{card.title}</div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-semibold ${card.tagColor}`}>{card.tag}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── 2. DataTable ─────────────────────────────────────────────────────────────
function DataTablePreview() {
  const rows = [
    { id: 1, name: 'Alice Johnson', status: 'Active', amount: '$1,200' },
    { id: 2, name: 'Bob Smith', status: 'Inactive', amount: '$800' },
    { id: 3, name: 'Carol White', status: 'Active', amount: '$3,400' },
  ]
  return (
    <div className="w-full h-full flex flex-col bg-[#0d0d0d] rounded-2xl overflow-hidden border border-[#1f1f1f]">
      {/* Search */}
      <div className="px-4 py-3 border-b border-[#1f1f1f] shrink-0">
        <div className="flex items-center gap-2 h-9 bg-[#111111] border border-[#1f1f1f] rounded-lg px-3">
          <svg className="w-3.5 h-3.5 text-[#737373] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span className="text-[12px] text-[#737373]">Search...</span>
        </div>
      </div>
      {/* Table */}
      <div className="flex-1 overflow-hidden">
        {/* Head */}
        <div className="grid grid-cols-4 px-4 py-2.5 border-b border-[#1f1f1f] bg-[#0d0d0d]">
          {['ID', 'Name', 'Status', 'Amount'].map((h, i) => (
            <div key={h} className="flex items-center gap-1 text-[10px] text-[#737373] font-semibold">
              {h}
              {i !== 1 && (
                <svg className="w-2.5 h-2.5 text-[#404040]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L8 8h8L12 2zm0 20 4-6H8l4 6z"/></svg>
              )}
            </div>
          ))}
        </div>
        {/* Rows */}
        {rows.map((row, i) => (
          <div key={row.id} className={`grid grid-cols-4 px-4 py-3 border-b border-[#111111] ${i === 0 ? 'bg-[#111111]/50' : ''}`}>
            <span className="text-[12px] text-[#737373] font-mono">{row.id}</span>
            <span className="text-[12px] text-white font-medium">{row.name}</span>
            <span className={`text-[11px] font-semibold w-fit px-2 py-0.5 rounded-full ${row.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-[#333] text-[#737373]'}`}>{row.status}</span>
            <span className="text-[12px] text-white font-medium">{row.amount}</span>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#1f1f1f] shrink-0">
        <span className="text-[10px] text-[#737373]">Page 1 of 2</span>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 rounded border border-[#1f1f1f] bg-[#111111] flex items-center justify-center">
            <svg className="w-3 h-3 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button className="w-6 h-6 rounded border border-[#1f1f1f] bg-[#111111] flex items-center justify-center">
            <svg className="w-3 h-3 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── 3. Stat Cards ────────────────────────────────────────────────────────────
function StatPreview() {
  const stats = [
    { label: 'Total Revenue', value: '$48,295', delta: '+12.5%', pos: true, icon: '▪' },
    { label: 'Active Users', value: '2,340', delta: '-3.2%', pos: false, icon: '◎' },
    { label: 'Avg Rating', value: '4.8', delta: '+0.3%', pos: true, icon: '☆' },
  ]
  return (
    <div className="w-full h-full flex flex-col justify-center gap-3 bg-[#0d0d0d] rounded-2xl border border-[#1f1f1f] p-4">
      <div className="text-[10px] font-bold text-[#737373] uppercase tracking-widest mb-1">Live Metrics</div>
      {stats.map(s => (
        <div key={s.label} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-3 flex items-start justify-between">
          <div>
            <div className="text-[10px] text-[#737373] font-medium mb-1">{s.label}</div>
            <div className="text-xl font-black text-white leading-none">{s.value}</div>
            <div className={`text-[10px] font-semibold mt-1.5 flex items-center gap-0.5 ${s.pos ? 'text-green-400' : 'text-red-400'}`}>
              <span>{s.pos ? '↗' : '↘'}</span>
              <span>{s.delta}</span>
              <span className="text-[#737373] font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="text-[#1f1f1f] text-lg">{s.icon}</div>
        </div>
      ))}
    </div>
  )
}

// ─── 4. BulkActions ───────────────────────────────────────────────────────────
function BulkActionsPreview() {
  const files = [
    { name: 'design-system-v2.fig', type: 'Figma', size: '4.2 MB', checked: true },
    { name: 'brand-guidelines.pdf', type: 'PDF', size: '1.8 MB', checked: true },
    { name: 'component-specs.md', type: 'Markdown', size: '42 KB', checked: true },
    { name: 'export-tokens.json', type: 'JSON', size: '12 KB', checked: false },
  ]
  return (
    <div className="w-full h-full flex flex-col bg-[#0d0d0d] rounded-2xl border border-[#1f1f1f] overflow-hidden relative">
      {/* List */}
      <div className="flex-1 overflow-hidden divide-y divide-[#111111]">
        {files.map((f, i) => (
          <div key={i} className={`flex items-center gap-3 px-4 py-3 ${f.checked ? 'bg-[#f97316]/4' : ''}`}>
            <div className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center ${f.checked ? 'bg-[#f97316] border-[#f97316]' : 'border-[#2a2a2a] bg-[#111]'}`}>
              {f.checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold text-white truncate">{f.name}</div>
              <div className="text-[9px] text-[#737373]">{f.type} · {f.size}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Floating action bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-3 py-2 shadow-2xl">
        <span className="text-[11px] font-semibold text-white px-2">3 selected</span>
        <div className="w-px h-4 bg-[#2a2a2a] mx-1" />
        {[
          { label: 'Archive', icon: '⬚' },
          { label: 'Download', icon: '↓' },
        ].map(a => (
          <button key={a.label} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] text-[#737373] hover:text-white hover:bg-[#2a2a2a] font-medium transition-colors">
            <span className="text-[11px]">{a.icon}</span>
            {a.label}
          </button>
        ))}
        <button className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] text-white bg-red-500 hover:bg-red-600 font-semibold transition-colors">
          Delete
        </button>
        <button className="w-5 h-5 flex items-center justify-center rounded-full text-[#737373] hover:text-white text-[10px] ml-1">✕</button>
      </div>
    </div>
  )
}

// ─── 5. Sidebar Dashboard (full app shell) ────────────────────────────────────
function SidebarDashboardPreview() {
  const stats = [
    { label: 'Total Revenue', value: '$48,295', delta: '+12.5%', pos: true },
    { label: 'Active Users', value: '2,847', delta: '+8.3%', pos: true },
    { label: 'New Orders', value: '384', delta: '+3.1%', pos: true },
    { label: 'Conversion', value: '3.24%', delta: '-0.4%', pos: false },
  ]
  const projects = [
    { name: 'Alpha Project', status: 'Active', team: 'Design', pct: 72 },
    { name: 'Beta Launch', status: 'Review', team: 'Engineering', pct: 38 },
    { name: 'Gamma Research', status: 'Active', team: 'Product', pct: 55 },
  ]
  return (
    <div className="w-full h-full flex bg-[#0d0d0d] rounded-2xl border border-[#1f1f1f] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[140px] shrink-0 border-r border-[#1f1f1f] flex flex-col bg-[#0d0d0d]">
        <div className="px-4 py-3.5 border-b border-[#1f1f1f] shrink-0">
          <div className="text-[12px] font-bold text-white">Acme Inc</div>
        </div>
        <div className="flex-1 py-2 px-2 space-y-0.5">
          {[
            { label: 'Dashboard', icon: '▦', active: true },
            { label: 'Projects', icon: '◫' },
            { label: 'Team', icon: '◎' },
            { label: 'Settings', icon: '⚙' },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[11px] font-medium transition-colors ${item.active ? 'bg-[#1a1a1a] text-white' : 'text-[#737373] hover:text-white'}`}>
              <span className="text-[12px]">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
        <div className="border-t border-[#1f1f1f] px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#1f1f1f] border border-[#2a2a2a] flex items-center justify-center text-[9px] font-bold text-white">JD</div>
            <span className="text-[10px] text-[#737373] truncate">Jane Doe</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f1f] shrink-0">
          <div className="text-[13px] font-bold text-white">Dashboard</div>
          <div className="w-5 h-5 rounded-full bg-[#111111] border border-[#1f1f1f] flex items-center justify-center text-[10px] text-[#737373]">🔔</div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 p-3 border-b border-[#1f1f1f] shrink-0">
          {stats.map(s => (
            <div key={s.label} className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-2.5">
              <div className="text-[9px] text-[#737373] font-medium mb-1">{s.label}</div>
              <div className="text-[15px] font-black text-white leading-none">{s.value}</div>
              <div className={`text-[9px] mt-1 font-semibold ${s.pos ? 'text-green-400' : 'text-red-400'}`}>
                {s.pos ? '↗' : '↘'} {s.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Projects mini table */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-4 px-3 py-2 border-b border-[#111111]">
            {['Project', 'Status', 'Team', 'Progress'].map(h => (
              <div key={h} className="text-[9px] text-[#737373] font-semibold uppercase tracking-wide">{h}</div>
            ))}
          </div>
          {projects.map((p, i) => (
            <div key={i} className="grid grid-cols-4 px-3 py-2 border-b border-[#0f0f0f] items-center">
              <span className="text-[10px] text-white font-medium truncate">{p.name}</span>
              <span className={`text-[9px] font-semibold w-fit px-1.5 py-0.5 rounded-full ${p.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>{p.status}</span>
              <span className="text-[9px] text-[#737373]">{p.team}</span>
              <div className="flex items-center gap-1.5">
                <div className="flex-1 h-1 bg-[#1f1f1f] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-[#f97316]" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            </div>
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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
      defaults: { ease: 'power3.out' },
    })

    tl.from('.ct-label', { opacity: 0, y: -8, duration: 0.4 })
      .from('.ct-title', { opacity: 0, y: 28, duration: 0.6, stagger: 0.07 }, '<0.1')
      .from('.ct-sub', { opacity: 0, y: 12, duration: 0.5 }, '<0.3')
      .from('.ct-stat', { opacity: 0, y: 16, duration: 0.4, stagger: 0.07 }, '<0.2')
      .from('.ct-cta', { opacity: 0, y: 8, duration: 0.4 }, '<0.2')

    gsap.utils.toArray<Element>('.bento-cell').forEach((cell, i) => {
      gsap.from(cell, {
        opacity: 0,
        y: 36,
        duration: 0.65,
        delay: i * 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cell,
          start: 'top 88%',
          once: true,
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-28 border-t border-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="max-w-2xl">
            <div className="ct-label inline-flex items-center gap-2 text-[11px] font-bold text-[#f97316] uppercase tracking-[0.18em] mb-6">
              <span className="w-4 h-px bg-[#f97316]/60" />
              Component Library
            </div>
            <h2 className="tracking-tighter leading-[1.0]">
              <span className="ct-title block text-[clamp(2.5rem,5vw,4rem)] font-black text-white uppercase">
                Every component
              </span>
              <span className="ct-title block text-[clamp(2.5rem,5vw,4rem)] font-black text-[#f97316] uppercase">
                you'll ever need.
              </span>
            </h2>
          </div>

          <div className="shrink-0 space-y-5 lg:text-right">
            <p className="ct-sub text-[#737373] text-sm leading-relaxed max-w-xs lg:ml-auto">
              Data tables, kanban boards, sidebars, charts, forms — fully typed, accessible, and dark-mode native.
            </p>

            <div className="ct-stat flex flex-wrap lg:justify-end gap-x-7 gap-y-3">
              {[
                { n: '180+', label: 'components' },
                { n: '8', label: 'categories' },
                { n: '100%', label: 'TypeScript' },
                { n: 'MIT', label: 'license' },
              ].map(s => (
                <div key={s.label} className="text-right">
                  <div className="text-[1.15rem] font-black text-white leading-none">{s.n}</div>
                  <div className="text-[9px] text-[#404040] uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <Link href="/components"
              className="ct-cta inline-flex items-center gap-2 px-5 py-2.5 bg-[#f97316] hover:bg-[#fb923c] text-white font-bold rounded-lg transition-colors uppercase tracking-widest text-xs">
              Browse all components
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* ── Bento grid ──────────────────────────────────────────────────── */}
        {/*
          Row 1: [Kanban — 2col wide, tall] [Stat cards — 1col]
          Row 2: [DataTable — 2col wide]    [BulkActions — 1col]
          Row 3: [SidebarDashboard — full 3col]
        */}
        <div className="grid grid-cols-3 gap-3">

          {/* R1C1 — Kanban (2 cols, taller) */}
          <div className="bento-cell col-span-2 h-[300px] relative">
            <CellLabel>Kanban Board</CellLabel>
            <KanbanPreview />
          </div>

          {/* R1C3 — Stat cards */}
          <div className="bento-cell col-span-1 h-[300px] relative">
            <CellLabel>Stat / Metric</CellLabel>
            <StatPreview />
          </div>

          {/* R2C1-2 — DataTable */}
          <div className="bento-cell col-span-2 h-[280px] relative">
            <CellLabel>Data Table</CellLabel>
            <DataTablePreview />
          </div>

          {/* R2C3 — BulkActions */}
          <div className="bento-cell col-span-1 h-[280px] relative">
            <CellLabel>Bulk Actions</CellLabel>
            <BulkActionsPreview />
          </div>

          {/* R3 — Sidebar Dashboard (full width) */}
          <div className="bento-cell col-span-3 h-[320px] relative">
            <CellLabel>Sidebar / Dashboard</CellLabel>
            <SidebarDashboardPreview />
          </div>
        </div>

        {/* ── Footer strip ────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[#111111]">
          <div className="flex items-center gap-5">
            {['React', 'TypeScript', 'Tailwind CSS', 'Radix UI'].map((t, i) => (
              <span key={t} className="flex items-center gap-5">
                {i > 0 && <span className="w-px h-3 bg-[#1f1f1f]" />}
                <span className="text-[10px] text-[#404040] font-semibold uppercase tracking-widest">{t}</span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#737373]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live previews · No screenshots
          </div>
        </div>
      </div>
    </section>
  )
}

// Small helper so each cell gets a consistent floating label
function CellLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-3 left-3 z-10">
      <span className="text-[9px] font-bold text-[#737373] uppercase tracking-widest bg-[#0d0d0d]/90 border border-[#1f1f1f] px-2 py-1 rounded-md backdrop-blur-sm">
        {children}
      </span>
    </div>
  )
}
