'use client'

import React, { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { BarChart2, Star, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ChatDetail, Kanban, SidebarLayoutDashboard, Stat, StatGroup } from '@otf/ui'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ─── Theme tokens: theme-minimal dark (matches storybook preview.tsx) ─────────
const DARK_THEME = {
  '--background': '25 12% 8%',
  '--foreground': '35 15% 90%',
  '--card': '25 12% 10%',
  '--card-foreground': '35 15% 90%',
  '--popover': '25 12% 11%',
  '--popover-foreground': '35 15% 90%',
  '--primary': '25 95% 58%',
  '--primary-foreground': '0 0% 100%',
  '--secondary': '25 12% 15%',
  '--secondary-foreground': '35 15% 80%',
  '--muted': '25 12% 14%',
  '--muted-foreground': '25 10% 55%',
  '--accent': '25 12% 15%',
  '--accent-foreground': '25 95% 58%',
  '--destructive': '0 84% 60%',
  '--destructive-foreground': '0 0% 100%',
  '--border': '25 12% 18%',
  '--input': '25 12% 18%',
  '--ring': '25 95% 58%',
  '--radius': '0.5rem',
} as React.CSSProperties

// Shared outer dark shell for every preview card
function PreviewShell({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`w-full h-full bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#1f1f1f] ${className}`}
      style={DARK_THEME}
    >
      {children}
    </div>
  )
}

// Scale a component to fit inside a fixed-height card.
// scale  = cellHeight / componentNaturalHeight
// width  = 100% / scale  →  after transform the visual width == container width
// height = naturalHeight  →  layout space (clipped by overflow-hidden on PreviewShell)
function ScaledPreview({
  scale,
  naturalHeight,
  children,
}: {
  scale: number
  naturalHeight: number
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${(100 / scale).toFixed(2)}%`,
        height: `${naturalHeight}px`,
        pointerEvents: 'none',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )
}

// ─── Static data (exact same as storybook stories) ────────────────────────────

const TABLE_DATA = [
  { id: 1, name: 'Alice Johnson', status: 'Active',   amount: '$1,200' },
  { id: 2, name: 'Bob Smith',     status: 'Inactive', amount: '$800'   },
  { id: 3, name: 'Carol White',   status: 'Active',   amount: '$3,400' },
]
const TABLE_COLS = ['ID', 'Name', 'Status', 'Amount']

const KANBAN_COLS = [
  {
    id: 'todo', title: 'To Do',
    cards: [
      { id: 'c1', title: 'Design login page', description: 'Wireframes + hi-fi', badge: 'UI' },
      { id: 'c2', title: 'Write API docs', badge: 'Docs' },
    ],
  },
  {
    id: 'progress', title: 'In Progress',
    cards: [
      { id: 'c3', title: 'Implement auth flow', description: 'OAuth + JWT tokens', badge: 'Backend' },
    ],
  },
  {
    id: 'review', title: 'In Review',
    cards: [
      { id: 'c4', title: 'Payment integration', description: 'Stripe webhooks' },
    ],
  },
  {
    id: 'done', title: 'Done',
    cards: [
      { id: 'c5', title: 'Set up CI/CD', badge: 'DevOps' },
      { id: 'c6', title: 'Database schema', description: 'PostgreSQL migrations' },
    ],
  },
]

const SPLIT_EMAILS = [
  'Team meeting notes',
  'Q4 report draft',
  'Design review feedback',
  'Onboarding docs',
  'Release changelog',
]
const REACTIONS = ['😊', '😐', '😕', '😡', '🤩']

// ─── Preview components ───────────────────────────────────────────────────────

function SortIcon() {
  return (
    <svg className="w-3 h-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />
    </svg>
  )
}

function DataTablePreview() {
  return (
    <PreviewShell>
      <div className="flex flex-col h-full">
        <div className="px-4 pt-4 pb-3 shrink-0">
          <div className="flex items-center gap-2 h-10 rounded-xl px-3 border"
            style={{ background: 'hsl(25 12% 10%)', borderColor: 'hsl(25 12% 18%)' }}>
            <svg className="w-4 h-4 shrink-0" style={{ color: 'hsl(25 10% 55%)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span className="text-[13px]" style={{ color: 'hsl(25 10% 55%)' }}>Search...</span>
          </div>
        </div>
        <div className="mx-4 rounded-xl overflow-hidden shrink-0 border" style={{ borderColor: 'hsl(25 12% 18%)' }}>
          <div className="grid grid-cols-4" style={{ background: 'hsl(25 12% 14% / 0.6)' }}>
            {TABLE_COLS.map(h => (
              <div key={h} className="flex items-center gap-1 px-4 py-3 text-[12px] font-medium" style={{ color: 'hsl(25 10% 55%)' }}>
                {h}{h !== 'Status' && <SortIcon />}
              </div>
            ))}
          </div>
          {TABLE_DATA.map((row, i) => (
            <div key={row.id} className="grid grid-cols-4 border-t"
              style={{ borderColor: 'hsl(25 12% 18%)', background: i % 2 !== 0 ? 'hsl(25 12% 14% / 0.3)' : 'transparent' }}>
              <div className="px-4 py-3 text-[13px]" style={{ color: 'hsl(35 15% 90%)' }}>{row.id}</div>
              <div className="px-4 py-3 text-[13px]" style={{ color: 'hsl(35 15% 90%)' }}>{row.name}</div>
              <div className="px-4 py-3 text-[13px]" style={{ color: 'hsl(35 15% 90%)' }}>{row.status}</div>
              <div className="px-4 py-3 text-[13px]" style={{ color: 'hsl(35 15% 90%)' }}>{row.amount}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <span className="text-[13px]" style={{ color: 'hsl(25 10% 55%)' }}>Page 1 of 2</span>
          <div className="flex items-center gap-2">
            <div className="h-8 w-[70px] rounded-xl border flex items-center justify-between px-2"
              style={{ background: 'hsl(25 12% 10%)', borderColor: 'hsl(25 12% 18%)' }}>
              <span className="text-[12px]" style={{ color: 'hsl(25 10% 55%)' }}>10</span>
              <svg className="w-3 h-3" style={{ color: 'hsl(25 10% 55%)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/></svg>
            </div>
            {([
              <path key="l" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>,
              <path key="r" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>,
            ] as React.ReactElement[]).map((path, i) => (
              <button key={i} className="h-8 w-8 rounded-xl border flex items-center justify-center"
                style={{ background: 'hsl(25 12% 10%)', borderColor: 'hsl(25 12% 18%)' }}>
                <svg className="w-4 h-4" style={{ color: 'hsl(25 10% 55%)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{path}</svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PreviewShell>
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
  const pathD = pts.reduce((acc, p, i) => {
    if (i === 0) return `M${p.x},${p.y}`
    const prev = pts[i - 1]
    const cpx = (prev.x + p.x) / 2
    return acc + ` C${cpx},${prev.y} ${cpx},${p.y} ${p.x},${p.y}`
  }, '')
  const areaD = `${pathD} L${pts[pts.length-1].x},${H} L${pts[0].x},${H} Z`

  return (
    <PreviewShell className="p-4 flex flex-col">
      <div className="flex items-start justify-between mb-3 shrink-0">
        <div>
          <div className="text-[9px] text-[#737373] font-medium uppercase tracking-wider mb-1">Revenue</div>
          <div className="text-xl font-black text-white leading-none">$84.2k</div>
          <div className="text-[9px] text-green-400 font-normal mt-1">↑ +23.4% vs last year</div>
        </div>
        <div className="text-[9px] text-[#737373] bg-[#111111] border border-[#1f1f1f] px-2 py-1 rounded-lg">2025</div>
      </div>
      <div className="flex-1 min-h-0">
        <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((t, i) => (
            <line key={i} x1={pad} y1={pad + t * (H - pad * 2)} x2={W - pad} y2={pad + t * (H - pad * 2)}
              stroke="#1f1f1f" strokeWidth="0.5" />
          ))}
          <path d={areaD} fill="url(#areaGrad)" />
          <path d={pathD} fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="3" fill="#f97316" />
          <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="5" fill="#f97316" fillOpacity="0.2" />
          {months.map((m, i) => (
            <text key={i} x={pad + (i / (data.length - 1)) * (W - pad * 2)} y={H + 15}
              textAnchor="middle" fontSize="9" fill="#404040" fontFamily="Inter, sans-serif">{m}</text>
          ))}
        </svg>
      </div>
    </PreviewShell>
  )
}

// Metrics: full col-span-3 on desktop so 3 Stat cards sit side-by-side at natural size
function MetricCardsPreview() {
  return (
    <PreviewShell className="p-5 flex flex-col justify-center">
      <StatGroup className="" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <Stat label="Total Revenue" value="$48,295" trend={12.5} trendLabel="vs last month"
          icon={<BarChart2 className="h-5 w-5" />} description="" className="" />
        <Stat label="Active Users" value="2,340" trend={-3.2} trendLabel="vs last week"
          icon={<User className="h-5 w-5" />} description="" className="" />
        <Stat label="Avg Rating" value="4.8" trend={0.3} trendLabel="this quarter"
          icon={<Star className="h-5 w-5" />} description="" className="" />
      </StatGroup>
    </PreviewShell>
  )
}

// Kanban: scale to fit cell height. No fixed height in component so we wrap it.
function KanbanPreview({ cellHeight = 300 }: { cellHeight?: number }) {
  const NATURAL_H = 420
  const scale = cellHeight / NATURAL_H
  return (
    <PreviewShell>
      <ScaledPreview scale={scale} naturalHeight={NATURAL_H}>
        <div style={{ height: `${NATURAL_H}px`, display: 'flex', flexDirection: 'column' }}>
          <Kanban columns={KANBAN_COLS} onMoveCard={() => {}} className="" />
        </div>
      </ScaledPreview>
    </PreviewShell>
  )
}

// App Shell: SidebarLayoutDashboard is h-[600px]
// pad=12 gives breathing room matching DataTable's visual spacing
function SidebarAppPreview({ cellHeight = 360 }: { cellHeight?: number }) {
  const PAD = 12
  const NATURAL_H = 600
  const scale = (cellHeight - PAD * 2) / NATURAL_H
  return (
    <PreviewShell className="p-3">
      {/* inner clip so scaled component gets rounded corners + stays within padding */}
      <div className="w-full h-full rounded-xl overflow-hidden">
        <ScaledPreview scale={scale} naturalHeight={NATURAL_H}>
          <SidebarLayoutDashboard className="" />
        </ScaledPreview>
      </div>
    </PreviewShell>
  )
}

// Chat Detail: ChatDetail is h-[480px]
function ChatDetailPreview({ cellHeight = 360 }: { cellHeight?: number }) {
  const PAD = 12
  const NATURAL_H = 480
  const scale = (cellHeight - PAD * 2) / NATURAL_H
  return (
    <PreviewShell className="p-3">
      <div className="w-full h-full rounded-xl overflow-hidden">
        <ScaledPreview scale={scale} naturalHeight={NATURAL_H}>
          <ChatDetail className="" />
        </ScaledPreview>
      </div>
    </PreviewShell>
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
    <PreviewShell className="flex items-center justify-center p-4">
      <div className="w-full max-w-[300px] bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#1f1f1f]">
          <svg className="w-3 h-3 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span className="text-xs text-[#737373]">Search or jump to…</span>
          <span className="ml-auto text-[9px] text-[#737373] border border-[#1f1f1f] px-1 py-0.5 rounded">ESC</span>
        </div>
        <div className="py-1.5">
          <div className="px-3 py-1 text-[9px] text-[#737373] uppercase tracking-wider font-semibold">Quick actions</div>
          {items.map((item, i) => (
            <div key={i} className={`flex items-center gap-2.5 px-3 py-2 ${i === 0 ? 'bg-[#f97316]/10 text-white' : 'text-[#737373]'}`}>
              <span className={`text-[11px] w-4 text-center ${i === 0 ? 'text-[#f97316]' : ''}`}>{item.icon}</span>
              <span className="text-[11px] flex-1">{item.label}</span>
              {item.shortcut && (
                <kbd className="text-[9px] border border-[#1f1f1f] text-[#737373] px-1.5 py-0.5 rounded font-mono">⌘{item.shortcut}</kbd>
              )}
            </div>
          ))}
        </div>
      </div>
    </PreviewShell>
  )
}

function SplitPagePreview() {
  return (
    <PreviewShell className="flex">
      <div className="w-[45%] border-r border-[#1f1f1f] flex flex-col">
        <div className="px-3 py-2.5 border-b border-[#1f1f1f] shrink-0">
          <div className="text-[10px] font-bold text-white">Inbox</div>
        </div>
        <div className="flex-1 overflow-hidden">
          {SPLIT_EMAILS.map((email, i) => (
            <div key={email}
              className={`px-3 py-2.5 border-b border-[#111111] ${i === 0 ? 'bg-[#f97316]/8' : ''}`}>
              <div className={`text-[9px] font-medium leading-snug ${i === 0 ? 'text-white' : 'text-[#737373]'}`}>{email}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col p-3 gap-2 overflow-hidden">
        <div className="text-[10px] font-bold text-white">Team meeting notes</div>
        <div className="flex-1 bg-[#111111] border border-[#1f1f1f] rounded-xl p-3 overflow-hidden">
          <div className="text-[9px] text-[#555] leading-relaxed">
            Discussed Q4 roadmap priorities and team velocity. Action items assigned to engineering leads. Next sync in two weeks.
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <div className="flex-1 h-7 bg-[#1f1f1f] rounded-lg border border-[#2a2a2a] flex items-center px-2.5">
            <span className="text-[9px] text-[#333]">Reply…</span>
          </div>
          <div className="h-7 px-3 bg-[#f97316] rounded-lg flex items-center">
            <span className="text-[9px] font-bold text-white">Send</span>
          </div>
        </div>
      </div>
    </PreviewShell>
  )
}

function FeedbackModalPreview() {
  return (
    <PreviewShell className="flex items-center justify-center p-5">
      <div className="w-full max-w-[360px] bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-5 pt-5 pb-3">
          <div className="text-[13px] font-bold text-white">Share your feedback</div>
          <div className="text-[11px] text-[#737373] mt-1">How are you feeling about the product today?</div>
        </div>
        <div className="flex justify-between px-5 py-2.5 bg-[#0d0d0d] border-y border-[#1f1f1f]">
          {REACTIONS.map((r, i) => (
            <button key={r}
              className={`text-xl p-1.5 rounded-xl transition-all ${i === 4 ? 'bg-[#f97316]/15 ring-1 ring-[#f97316]/50 scale-110' : 'opacity-50'}`}>
              {r}
            </button>
          ))}
        </div>
        <div className="px-5 py-3">
          <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-3 h-[56px]">
            <span className="text-[10px] text-[#2a2a2a]">Tell us what&apos;s on your mind…</span>
          </div>
        </div>
        <div className="flex gap-2.5 px-5 pb-5">
          <div className="flex-1 h-9 border border-[#2a2a2a] rounded-xl flex items-center justify-center">
            <span className="text-[11px] text-[#737373]">Cancel</span>
          </div>
          <div className="flex-1 h-9 bg-[#f97316] rounded-xl flex items-center justify-center">
            <span className="text-[11px] font-bold text-white">Submit feedback</span>
          </div>
        </div>
      </div>
    </PreviewShell>
  )
}

// ─── Shared label ─────────────────────────────────────────────────────────────

function BentoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[9px] font-bold text-[#404040] uppercase tracking-[0.15em]">
      {children}
    </div>
  )
}

// ─── Mobile carousel cells list ───────────────────────────────────────────────

const MOBILE_SLIDES = [
  { label: 'Data Table',       height: 320, node: <DataTablePreview /> },
  { label: 'Area Chart',       height: 280, node: <ChartPreview /> },
  { label: 'App Shell',        height: 400, node: <SidebarAppPreview cellHeight={400} /> },
  { label: 'Chat Detail',      height: 360, node: <ChatDetailPreview cellHeight={360} /> },
  { label: 'Command Palette',  height: 300, node: <CommandPalettePreview /> },
  { label: 'Split Page',       height: 320, node: <SplitPagePreview /> },
  { label: 'Feedback Modal',   height: 380, node: <FeedbackModalPreview /> },
]
const TOTAL_SLIDES = MOBILE_SLIDES.length // 7 after removing Metrics + Kanban

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ComponentTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const goToSlide = useCallback((raw: number) => {
    const idx = Math.max(0, Math.min(TOTAL_SLIDES - 1, raw))
    if (!trackRef.current || !carouselRef.current) return
    gsap.to(trackRef.current, {
      x: -idx * carouselRef.current.offsetWidth,
      duration: 0.48,
      ease: 'power3.out',
    })
    setActiveSlide(idx)
  }, [])

  useGSAP(() => {
    // Header entrance
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      defaults: { ease: 'power3.out' },
    })
    tl.from('.ct-label', { opacity: 0, y: -8, duration: 0.4 })
      .from('.ct-title', { opacity: 0, y: 24, duration: 0.6, stagger: 0.06 }, '<0.1')
      .from('.ct-sub',   { opacity: 0, y: 12, duration: 0.5 }, '<0.3')
      .from('.ct-stat',  { opacity: 0, y: 16, duration: 0.4, stagger: 0.08 }, '<0.2')
      .from('.ct-cta',   { opacity: 0, y:  8, duration: 0.4 }, '<0.2')

    // Desktop bento cell stagger
    gsap.utils.toArray<Element>('.bento-cell').forEach((cell, i) => {
      gsap.from(cell, {
        opacity: 0, y: 40, duration: 0.7, delay: i * 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: cell, start: 'top 88%', once: true },
      })
    })

    // Mobile nav buttons entrance
    const mobileNavEls = [prevBtnRef.current, nextBtnRef.current].filter(Boolean)
    if (mobileNavEls.length) {
      gsap.from(mobileNavEls, {
        opacity: 0, scale: 0.85, duration: 0.4, stagger: 0.08, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: carouselRef.current, start: 'top 85%', once: true },
      })
    }
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
                { n: '8',    label: 'categories' },
                { n: '100%', label: 'TypeScript' },
                { n: 'MIT',  label: 'license' },
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
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Desktop bento grid (lg+) ────────────────────────────────────── */}
        <div className="hidden lg:grid grid-cols-3 gap-3">

          {/* Row 1: DataTable (2 cols) + Chart (1 col) */}
          <div className="bento-cell col-span-2 flex flex-col gap-2">
            <BentoLabel>Data Table</BentoLabel>
            <div className="h-[260px]"><DataTablePreview /></div>
          </div>
          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Area Chart</BentoLabel>
            <div className="h-[260px]"><ChartPreview /></div>
          </div>

          {/* Row 2: App Shell (2 cols) + Chat Detail (1 col) */}
          <div className="bento-cell col-span-2 flex flex-col gap-2">
            <BentoLabel>App Shell</BentoLabel>
            <div className="h-[360px]"><SidebarAppPreview cellHeight={360} /></div>
          </div>
          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Chat Detail</BentoLabel>
            <div className="h-[360px]"><ChatDetailPreview cellHeight={360} /></div>
          </div>

          {/* Row 4: Command + SplitPage + Feedback */}
          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Command Palette</BentoLabel>
            <div className="h-[320px]"><CommandPalettePreview /></div>
          </div>
          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Split Page Layout</BentoLabel>
            <div className="h-[320px]"><SplitPagePreview /></div>
          </div>
          <div className="bento-cell col-span-1 flex flex-col gap-2">
            <BentoLabel>Feedback Modal</BentoLabel>
            <div className="h-[320px]"><FeedbackModalPreview /></div>
          </div>
        </div>

        {/* ── Mobile carousel (< lg) ──────────────────────────────────────── */}
        <div className="lg:hidden">
          {/* Slide track */}
          <div ref={carouselRef} className="overflow-hidden relative">
            <div
              ref={trackRef}
              className="flex"
              style={{ width: `${TOTAL_SLIDES * 100}%` }}
            >
              {MOBILE_SLIDES.map((slide, i) => (
                <div
                  key={i}
                  style={{ width: `${100 / TOTAL_SLIDES}%` }}
                  className="flex flex-col gap-2 pr-1"
                >
                  <BentoLabel>{slide.label}</BentoLabel>
                  <div style={{ height: `${slide.height}px` }}>{slide.node}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav row */}
          <div className="flex items-center justify-between mt-6">
            {/* Prev */}
            <button
              ref={prevBtnRef}
              onClick={() => goToSlide(activeSlide - 1)}
              disabled={activeSlide === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-[#2a2a2a] rounded-xl text-[#737373]
                         disabled:opacity-25 transition-all hover:border-[#f97316]/50 hover:text-[#f97316]
                         active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-semibold">Prev</span>
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeSlide
                      ? 'w-5 h-1.5 bg-[#f97316]'
                      : 'w-1.5 h-1.5 bg-[#2a2a2a] hover:bg-[#404040]'
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              ref={nextBtnRef}
              onClick={() => goToSlide(activeSlide + 1)}
              disabled={activeSlide === TOTAL_SLIDES - 1}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-[#2a2a2a] rounded-xl text-[#737373]
                         disabled:opacity-25 transition-all hover:border-[#f97316]/50 hover:text-[#f97316]
                         active:scale-95"
            >
              <span className="text-xs font-semibold">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide counter + browse CTA */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-[10px] text-[#333]">{activeSlide + 1} / {TOTAL_SLIDES}</span>
            <Link
              href="/components"
              className="flex items-center gap-1.5 text-[10px] font-bold text-[#f97316] uppercase tracking-widest hover:text-[#fb923c] transition-colors"
            >
              Browse all components
              <ChevronRight className="w-3 h-3" />
            </Link>
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
