'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowUpRight,
  Home, Layers, BarChart3, Inbox, FolderKanban, Users as UsersIcon,
  ClipboardList, Timer, CheckCircle2, AlertTriangle,
  Plus, Search, TrendingUp,
} from 'lucide-react'

const templates = [
  {
    name: 'SaaS Dashboard Kit',
    subtitle: 'Your idea is already half-built. Describe the rest to Claude.',
    platform: 'Vite + Hono',
    tags: ['Cursor-ready', 'CLAUDE.md included', '11 screens', 'Stripe wired'],
    price: '$149',
    status: 'available',
    category: 'SaaS',
    kitSlug: 'saas-dashboard',
    detailSlug: 'saas-dashboard',
    demo: 'https://saas-dashboard-production-ae3f.up.railway.app',
    accent: '#f97316',
    screens: 11,
    description: 'Auth, database, payments, and a full dashboard already working. Open it in Cursor and describe what your product does — Claude already knows the codebase.',
    claudePrompt: '"Add a new project type called Marketing Campaign with a budget field"',
  },
  {
    name: 'Fitness & Wellness Kit',
    subtitle: 'Apple-Fitness-style activity rings, workout logging, awards. Reskin it for anything in 10 minutes.',
    platform: 'Expo + Hono',
    tags: ['Cursor-ready', 'CLAUDE.md included', '12 screens', 'iOS + Android + web'],
    price: '$149',
    status: 'available',
    category: 'Mobile',
    kitSlug: 'fitness-kit',
    detailSlug: 'fitness-kit',
    demo: null,
    accent: '#ff375f',
    screens: 12,
    description: 'Mobile-first fitness template — Expo SDK 54 + Hono + Drizzle + Better Auth. One codebase ships iOS, Android, and web. Activity rings widget, workout logging, weekly trends, awards, and a friend-activity feed.',
    claudePrompt: '"Reskin this for runners — swap calories for pace, add a route map placeholder"',
  },
  {
    name: 'Booking & Appointments Kit',
    subtitle: 'For coaches, tutors, salons — take appointments and get paid.',
    platform: 'Next.js + Expo',
    tags: ['Cursor-ready', 'CLAUDE.md included', '8 screens', 'Stripe wired'],
    price: '$149',
    status: 'soon',
    category: 'Services',
    kitSlug: null,
    detailSlug: null,
    demo: null,
    accent: '#3b82f6',
    screens: 8,
    description: 'Calendar booking, Stripe payments, email reminders, and client history. No more Calendly fees — own your booking system.',
    claudePrompt: '"Change this to dog grooming sessions at $60/hour, add a breed field"',
  },
  {
    name: 'Event & Ticketing Kit',
    subtitle: 'Run events. Sell tickets. Keep 100% of the revenue.',
    platform: 'Next.js + Hono',
    tags: ['Cursor-ready', 'CLAUDE.md included', '8 screens', 'Stripe wired'],
    price: '$149',
    status: 'soon',
    category: 'Events',
    kitSlug: null,
    detailSlug: null,
    demo: null,
    accent: '#f59e0b',
    screens: 8,
    description: 'Event pages, ticket tiers, QR check-in, and attendee management. Eventbrite charges 6-8% — this is $149 once.',
    claudePrompt: '"Add a VIP tier at $499 with a dinner label, limit to 20 seats"',
  },
  {
    name: 'Directory & Listings Kit',
    subtitle: 'Build the best [X] directory in your niche.',
    platform: 'Next.js + Hono',
    tags: ['Cursor-ready', 'CLAUDE.md included', '9 screens', 'Stripe wired'],
    price: '$149',
    status: 'soon',
    category: 'Directory',
    kitSlug: null,
    detailSlug: null,
    demo: null,
    accent: '#22c55e',
    screens: 9,
    description: 'Submit listings, browse and filter, featured placements, and SEO-ready pages. One kit — job boards, tool directories, local guides, resource hubs.',
    claudePrompt: '"Change this into a directory of AI tools for lawyers, add a monthly pricing filter"',
  },
  {
    name: 'Newsletter & Blog Kit',
    subtitle: 'Your own Substack. No 10% cut. Forever.',
    platform: 'Next.js + Hono',
    tags: ['Cursor-ready', 'CLAUDE.md included', '8 screens', 'Stripe wired'],
    price: '$149',
    status: 'soon',
    category: 'Creator',
    kitSlug: null,
    detailSlug: null,
    demo: null,
    accent: '#8b5cf6',
    screens: 8,
    description: 'Write, publish, and charge subscribers — free and paid tiers. Email delivery included. Own your audience, not rent it.',
    claudePrompt: '"Set up a paid tier at $9/month for premium posts, free users get 3 posts/month"',
  },
  {
    name: 'Creator Hub Kit',
    subtitle: 'Your Linktree — but you own it, and you can charge for it.',
    platform: 'Next.js',
    tags: ['Cursor-ready', 'CLAUDE.md included', '6 screens', 'Stripe wired'],
    price: '$99',
    status: 'soon',
    category: 'Creator',
    kitSlug: null,
    detailSlug: null,
    demo: null,
    accent: '#ec4899',
    screens: 6,
    description: 'Link page, click analytics, pay-to-view content, and email capture. Linktree charges $24/month — this is $99 once.',
    claudePrompt: '"Add a section where fans can pay $199 to book a 1-hour call with me"',
  },
]

const filters = ['All', 'SaaS', 'Mobile', 'Services', 'Events', 'Directory', 'Creator'] as const
type Filter = typeof filters[number]

async function startCheckout(kitSlug: string): Promise<void> {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kit: kitSlug }),
  })
  const { url, error } = await res.json()
  if (error || !url) { alert(`Checkout error: ${error ?? 'Please try again'}`); return }
  window.location.href = url
}

// Faithful mini-render of kits/saas-dashboard `pages/home/dashboard.tsx`:
// real Sidebar items, greeting topbar, 4 KPI cards using `MetricCardWithIcon`
// shape, then a "Issue Trend" AreaChart + "Status Distribution" BarChart row.
function MiniDashboardPreview({ accent }: { accent: string }) {
  const navItems = [
    { Icon: Home,         label: 'Dashboard', active: true },
    { Icon: Layers,       label: 'All Issues' },
    { Icon: BarChart3,    label: 'Analytics' },
    { Icon: Inbox,        label: 'Inbox', badge: '5' },
    { Icon: FolderKanban, label: 'Projects' },
    { Icon: UsersIcon,    label: 'Teams' },
  ]
  const kpis = [
    { Icon: ClipboardList, label: 'Total',       value: '27', change: '9 open',   tint: accent    },
    { Icon: Timer,         label: 'In Progress', value: '8',  change: '30%',      tint: '#3b82f6' },
    { Icon: CheckCircle2,  label: 'Completed',   value: '18', change: '67% rate', tint: '#22c55e' },
    { Icon: AlertTriangle, label: 'Open',        value: '9',  change: '2 urgent', tint: '#ef4444' },
  ]
  // status distribution heights (proportional)
  const statusBars = [
    { label: 'Bk', h: 28, color: '#737373' },
    { label: 'Td', h: 56, color: '#a1a1aa' },
    { label: 'IP', h: 78, color: '#3b82f6' },
    { label: 'Rv', h: 38, color: '#a855f7' },
    { label: 'Dn', h: 96, color: '#22c55e' },
  ]
  return (
    <div className="h-[280px] bg-background flex overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside className="w-[118px] shrink-0 border-r border-border bg-secondary/15 flex flex-col">
        <div className="h-9 px-2.5 flex items-center gap-1.5 border-b border-border">
          <div className="h-4 w-4 rounded-[3px] flex items-center justify-center text-white text-[7px] font-black" style={{ background: accent }}>O</div>
          <span className="text-foreground text-[10px] font-bold tracking-tight">OTF</span>
        </div>
        <nav className="flex-1 p-1.5 flex flex-col gap-px">
          {navItems.map(({ Icon, label, active, badge }) => (
            <div
              key={label}
              className={`flex items-center gap-1.5 px-1.5 py-1 rounded-[4px] text-[9px] transition-colors ${
                active
                  ? 'font-semibold text-foreground'
                  : 'font-medium text-muted-foreground'
              }`}
              style={active ? { background: `${accent}18` } : {}}
            >
              <Icon className="h-2.5 w-2.5 shrink-0" style={active ? { color: accent } : {}} strokeWidth={active ? 2.25 : 2} />
              <span className="flex-1 truncate leading-none">{label}</span>
              {badge && (
                <span className="text-[7px] font-mono font-bold px-1 rounded-[3px] leading-tight" style={{ background: `${accent}25`, color: accent }}>
                  {badge}
                </span>
              )}
            </div>
          ))}
        </nav>
        <div className="border-t border-border p-1.5 flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full flex items-center justify-center text-[6.5px] font-bold text-foreground" style={{ background: `${accent}25`, color: accent }}>SC</div>
          <div className="flex-1 min-w-0 leading-none">
            <div className="text-[7.5px] font-semibold text-foreground truncate">Sarah Chen</div>
            <div className="text-[6.5px] text-muted-foreground truncate mt-0.5">sarah@acme.com</div>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* topbar — greeting + meta + new button (mirrors PageHeader) */}
        <div className="h-9 border-b border-border flex items-center px-3 gap-2">
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-[10px] font-semibold text-foreground">Good morning, Sarah</span>
            <span className="text-[7.5px] text-muted-foreground">27 issues · 67% resolved</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="h-4 px-1.5 rounded-[4px] border border-border bg-secondary/40 flex items-center gap-1 text-[7.5px] text-muted-foreground">
              <Search className="h-2 w-2" /> Search
            </div>
            <div className="h-4 px-1.5 rounded-[4px] flex items-center gap-0.5 text-[7.5px] font-semibold text-white" style={{ background: accent }}>
              <Plus className="h-2 w-2" strokeWidth={3} /> New
            </div>
          </div>
        </div>

        {/* body — KPI strip + charts row */}
        <div className="flex-1 p-2 flex flex-col gap-1.5 overflow-hidden">
          {/* KPI strip — MetricCardWithIcon shape */}
          <div className="grid grid-cols-4 gap-1.5">
            {kpis.map(({ Icon, label, value, change, tint }) => (
              <div key={label} className="rounded-md border border-border bg-card px-1.5 py-1.5 flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <div className="text-[6.5px] text-muted-foreground leading-none">{label}</div>
                  <div className="text-[13px] font-bold text-foreground tracking-tight leading-none mt-1">{value}</div>
                  <div className="text-[6.5px] text-muted-foreground leading-none mt-1.5">{change}</div>
                </div>
                <div className="h-4 w-4 rounded-[3px] flex items-center justify-center shrink-0" style={{ background: `${tint}18` }}>
                  <Icon className="h-2 w-2" style={{ color: tint }} strokeWidth={2.25} />
                </div>
              </div>
            ))}
          </div>

          {/* Charts row — Issue Trend (area) + Status Distribution (bar) */}
          <div className="flex-1 grid grid-cols-5 gap-1.5 min-h-0">
            {/* Trend — 3/5 width */}
            <div className="col-span-3 rounded-md border border-border bg-card p-2 flex flex-col gap-1 min-h-0">
              <div className="flex items-center justify-between">
                <div className="leading-none">
                  <div className="text-[8.5px] font-semibold text-foreground">Issue Trend</div>
                  <div className="text-[6.5px] text-muted-foreground mt-0.5">Total vs completed</div>
                </div>
                <div className="flex items-center gap-1 text-[7px] font-mono px-1 py-0.5 rounded-[3px] border border-border bg-secondary/40 text-muted-foreground">
                  <TrendingUp className="h-2 w-2" style={{ color: accent }} /> 67%
                </div>
              </div>
              <div className="flex-1 relative">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id={`area-${accent}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor={accent} stopOpacity="0.45" />
                      <stop offset="100%" stopColor={accent} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* horizontal grid lines */}
                  {[10, 20, 30].map(y => (
                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" className="text-border" strokeWidth="0.3" strokeDasharray="1 2" />
                  ))}
                  {/* completed area + line */}
                  <path d="M0,32 L15,30 L30,26 L45,22 L60,17 L75,11 L90,7 L100,5 L100,40 L0,40 Z" fill={`url(#area-${accent})`} />
                  <path d="M0,32 L15,30 L30,26 L45,22 L60,17 L75,11 L90,7 L100,5" fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
                  {/* total dashed line above */}
                  <path d="M0,22 L15,20 L30,17 L45,15 L60,12 L75,8 L90,5 L100,3" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
              </div>
              <div className="flex justify-between text-[6.5px] text-muted-foreground font-mono">
                {['W1','W2','W3','W4','W5','W6'].map(w => <span key={w}>{w}</span>)}
              </div>
            </div>

            {/* Status — 2/5 width */}
            <div className="col-span-2 rounded-md border border-border bg-card p-2 flex flex-col gap-1 min-h-0">
              <div className="leading-none">
                <div className="text-[8.5px] font-semibold text-foreground">Status</div>
                <div className="text-[6.5px] text-muted-foreground mt-0.5">By stage</div>
              </div>
              <div className="flex-1 flex items-end gap-1.5">
                {statusBars.map(s => (
                  <div key={s.label} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
                    <div className="w-[55%] rounded-[2px]" style={{ height: `${s.h}%`, background: s.color, opacity: 0.85 }} />
                    <span className="text-[6.5px] text-muted-foreground font-mono leading-none">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mini Kanban — mirrors the kit's `/home/issues-board` (5 status columns,
// drag-card visual) at preview density. Same Sidebar shell as MiniDashboardPreview
// so the multi-tab story reads like a single coherent app.
function MiniKanbanPreview({ accent }: { accent: string }) {
  const navItems = [
    { Icon: Home,         label: 'Dashboard' },
    { Icon: Layers,       label: 'All Issues', active: true },
    { Icon: BarChart3,    label: 'Analytics' },
    { Icon: Inbox,        label: 'Inbox', badge: '5' },
    { Icon: FolderKanban, label: 'Projects' },
    { Icon: UsersIcon,    label: 'Teams' },
  ]
  const columns: Array<{ title: string; tone: string; cards: Array<{ title: string; badge?: string }> }> = [
    {
      title: 'Backlog',
      tone: '#737373',
      cards: [
        { title: 'Add Stripe annual plans' },
        { title: 'Migrate to Drizzle 1.0' },
        { title: 'Refactor toast emitter' },
      ],
    },
    {
      title: 'Todo',
      tone: '#a1a1aa',
      cards: [
        { title: 'Wire forgot password', badge: 'P2' },
        { title: 'Onboarding tour' },
      ],
    },
    {
      title: 'In Progress',
      tone: '#3b82f6',
      cards: [
        { title: 'Auth flow refactor', badge: 'High' },
        { title: 'Payment integration' },
      ],
    },
    {
      title: 'In Review',
      tone: '#a855f7',
      cards: [
        { title: 'PR #421 — analytics' },
      ],
    },
    {
      title: 'Done',
      tone: '#22c55e',
      cards: [
        { title: 'CI/CD setup' },
        { title: 'DB schema' },
        { title: 'Onboarding flow' },
      ],
    },
  ]
  return (
    <div className="h-[280px] bg-background flex overflow-hidden">
      {/* Sidebar — identical shell to MiniDashboardPreview so tabs feel like the same app */}
      <aside className="w-[118px] shrink-0 border-r border-border bg-secondary/15 flex flex-col">
        <div className="h-9 px-2.5 flex items-center gap-1.5 border-b border-border">
          <div className="h-4 w-4 rounded-[3px] flex items-center justify-center text-white text-[7px] font-black" style={{ background: accent }}>O</div>
          <span className="text-foreground text-[10px] font-bold tracking-tight">OTF</span>
        </div>
        <nav className="flex-1 p-1.5 flex flex-col gap-px">
          {navItems.map(({ Icon, label, active, badge }) => (
            <div
              key={label}
              className={`flex items-center gap-1.5 px-1.5 py-1 rounded-[4px] text-[9px] transition-colors ${
                active ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'
              }`}
              style={active ? { background: `${accent}18` } : {}}
            >
              <Icon className="h-2.5 w-2.5 shrink-0" style={active ? { color: accent } : {}} strokeWidth={active ? 2.25 : 2} />
              <span className="flex-1 truncate leading-none">{label}</span>
              {badge && (
                <span className="text-[7px] font-mono font-bold px-1 rounded-[3px] leading-tight" style={{ background: `${accent}25`, color: accent }}>
                  {badge}
                </span>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* Topbar */}
        <div className="h-9 border-b border-border flex items-center px-3 gap-2">
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-[10px] font-semibold text-foreground">Issues board</span>
            <span className="text-[7.5px] text-muted-foreground">12 open · 3 in review</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="h-4 px-1.5 rounded-[4px] flex items-center gap-0.5 text-[7.5px] font-semibold text-white" style={{ background: accent }}>
              <Plus className="h-2 w-2" strokeWidth={3} /> New
            </div>
          </div>
        </div>

        {/* Board — 5 columns */}
        <div className="flex-1 p-2 overflow-x-auto">
          <div className="grid grid-cols-5 gap-1.5 h-full min-w-0">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-1 min-w-0 rounded-md bg-[hsl(var(--muted)/0.4)] p-1.5">
                {/* Column header */}
                <div className="flex items-center justify-between px-0.5 pb-0.5">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: col.tone }} />
                    <span className="text-[8.5px] font-semibold text-foreground truncate">{col.title}</span>
                  </div>
                  <span className="text-[7px] font-mono text-muted-foreground tabular-nums shrink-0">{col.cards.length}</span>
                </div>
                {/* Cards */}
                <div className="flex flex-col gap-1 min-h-0">
                  {col.cards.map((c, i) => (
                    <div key={i} className="rounded-[4px] border border-border bg-card px-1.5 py-1">
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[8px] font-medium text-foreground leading-tight line-clamp-2">{c.title}</span>
                        {c.badge && (
                          <span
                            className="shrink-0 text-[6.5px] font-bold px-1 rounded-full leading-tight"
                            style={{ background: `${accent}1a`, color: accent }}
                          >
                            {c.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Mini Fitness Summary — mirrors `kits/fitness-kit/app/(home)/summary.tsx`:
// Apple-Fitness-style activity rings + 2x2 metric grid in a phone frame.
function MiniFitnessSummaryPreview({ accent }: { accent: string }) {
  // 3 concentric ring values (move/exercise/stand)
  const rings = [
    { progress: 0.78, color: accent,    label: 'Move',     value: '352',  unit: 'CAL' },
    { progress: 0.92, color: '#a3ff12', label: 'Exercise', value: '28',   unit: 'MIN' },
    { progress: 0.55, color: '#00d4d4', label: 'Stand',    value: '7',    unit: 'HRS' },
  ]
  const RING_RADII = [42, 32, 22]
  const STROKE = 7

  const metrics = [
    { label: 'Steps',    value: '8,420', accent: '#00d4d4' },
    { label: 'Distance', value: '6.2',  unit: 'km', accent: '#fbbf24' },
    { label: 'Sessions', value: '3',    accent: '#a3ff12' },
    { label: 'Awards',   value: '5',    accent: '#a78bfa' },
  ]

  return (
    <div className="h-[280px] bg-background flex items-center justify-center px-6 py-3">
      {/* Phone frame */}
      <div
        className="relative h-full w-[160px] rounded-[18px] border bg-[#0a0a0a] overflow-hidden flex flex-col"
        style={{ borderColor: '#1f1f1f' }}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-3 py-1.5 text-[8px] text-white/60 font-mono">
          <span>9:41</span>
          <span>●●●</span>
        </div>

        {/* Header */}
        <div className="px-3 pb-1">
          <div className="text-[7px] tracking-wider text-white/40 font-bold">WED, MAY 1</div>
          <div className="text-[12px] text-white font-bold leading-tight">Summary</div>
        </div>

        {/* Activity ring card */}
        <div className="mx-2 mt-1 rounded-md bg-[#171717] p-2 flex items-center gap-2">
          <svg width={92} height={92} viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            {rings.map((r, i) => {
              const radius = RING_RADII[i]!
              const circ = 2 * Math.PI * radius
              return (
                <g key={i}>
                  <circle cx={50} cy={50} r={radius} stroke={r.color + '33'} strokeWidth={STROKE} fill="none" />
                  <circle
                    cx={50} cy={50} r={radius}
                    stroke={r.color}
                    strokeWidth={STROKE}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${circ * r.progress} ${circ}`}
                  />
                </g>
              )
            })}
          </svg>
          <div className="flex-1 flex flex-col gap-1">
            {rings.map((r) => (
              <div key={r.label} className="flex items-baseline gap-1">
                <div className="w-1 h-1 rounded-full" style={{ background: r.color }} />
                <div className="text-[6px] text-white/50 font-bold tracking-wide w-8">{r.label.toUpperCase()}</div>
                <div className="text-[8px] text-white font-bold">{r.value}</div>
                <div className="text-[6px] text-white/40 font-bold">{r.unit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 2x2 metric grid */}
        <div className="mx-2 mt-2 grid grid-cols-2 gap-1.5">
          {metrics.map((m) => (
            <div key={m.label} className="rounded bg-[#171717] p-1.5">
              <div className="text-[6px] tracking-wider text-white/40 font-bold uppercase">
                {m.label}
              </div>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <div className="text-[12px] font-bold leading-none" style={{ color: m.accent }}>
                  {m.value}
                </div>
                {m.unit ? <div className="text-[6px] text-white/40">{m.unit}</div> : null}
              </div>
              <div className="flex items-end gap-px h-2 mt-1">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div
                    key={j}
                    className="flex-1 rounded-sm"
                    style={{
                      background: m.accent,
                      opacity: 0.35 + (j / 9),
                      height: `${20 + ((j * 17) % 80)}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating tab pill */}
        <div
          className="absolute bottom-1.5 left-3 right-3 h-6 rounded-full flex items-center justify-around text-[7px] font-bold"
          style={{ background: '#1a1a1a' }}
        >
          <div className="px-2 py-0.5 rounded-full bg-[#0a0a0a] text-white">Summary</div>
          <div className="text-white/50">Workout</div>
          <div className="text-white/50">Sharing</div>
        </div>
      </div>
    </div>
  )
}

function ComingSoonPreview({ accent, name }: { accent: string; name: string }) {
  return (
    <div className="h-[190px] bg-background flex items-center justify-center">
      <div className="text-center">
        <div
          className="w-10 h-10 rounded-xl border flex items-center justify-center mx-auto mb-3"
          style={{ background: `${accent}10`, borderColor: `${accent}20` }}
        >
          <svg className="w-5 h-5" style={{ color: accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
        </div>
        <div className="text-muted-foreground text-xs font-medium">{name}</div>
        <div className="text-muted-foreground/40 text-[10px] mt-0.5">Coming soon</div>
      </div>
    </div>
  )
}

// ── Tabbed live preview wrapper ────────────────────────────────────────────
// For "available" kits, shows a browser-chrome shell with a small tab strip
// (Dashboard | Issues board) so visitors can flip between two real screen
// previews. Coming-soon kits show the placeholder.

type Template = (typeof templates)[number]

const KIT_TABS_BY_KIT: Record<string, Array<{ id: string; label: string; render: (accent: string) => React.ReactNode; path: string }>> = {
  'saas-dashboard': [
    { id: 'dashboard', label: 'Dashboard',    render: (a) => <MiniDashboardPreview accent={a} />, path: '/home/dashboard' },
    { id: 'board',     label: 'Issues board', render: (a) => <MiniKanbanPreview accent={a} />,    path: '/home/issues-board' },
  ],
  'fitness-kit': [
    { id: 'summary',   label: 'Summary',      render: (a) => <MiniFitnessSummaryPreview accent={a} />, path: '/summary' },
  ],
}

function KitPreview({ template: t }: { template: Template }) {
  const tabs = t.kitSlug ? KIT_TABS_BY_KIT[t.kitSlug] : undefined
  const [tabIdx, setTabIdx] = useState(0)
  const activeTab = tabs?.[tabIdx]
  const urlPath = activeTab?.path ?? ''
  const urlBase = t.demo ? t.demo.replace('https://', '') : `${t.name.toLowerCase().replace(/\s+/g, '-')}.otf.sh`
  const url = urlBase + urlPath

  return (
    <div className="border-b border-border">
      {/* Chrome — traffic lights + URL pill + tab strip on the right */}
      <div className="h-9 flex items-center px-3 gap-2 bg-secondary/40 border-b border-border">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-background border border-border rounded px-3 py-0.5 text-[10px] text-muted-foreground font-mono max-w-[260px] w-full text-center truncate">
            {url}
          </div>
        </div>
        {tabs ? (
          <div className="flex items-center gap-0.5 shrink-0 rounded-md bg-background/60 border border-border p-0.5">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={(e) => { e.preventDefault(); setTabIdx(i) }}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  i === tabIdx
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={i === tabIdx ? { color: t.accent } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="w-10 shrink-0" />
        )}
      </div>

      {/* Body */}
      {t.status === 'available' && tabs
        ? <div key={tabIdx} className="kit-preview-fade">{activeTab!.render(t.accent)}</div>
        : t.status === 'available'
          ? <MiniDashboardPreview accent={t.accent} />
          : <ComingSoonPreview accent={t.accent} name={t.name} />
      }
      <style>{`
        .kit-preview-fade { animation: kit-preview-fade 220ms ease-out; }
        @keyframes kit-preview-fade { from { opacity: 0 } to { opacity: 1 } }
        @media (prefers-reduced-motion: reduce) { .kit-preview-fade { animation: none } }
      `}</style>
    </div>
  )
}

export function TemplatesClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [purchasing, setPurchasing] = useState<string | null>(null)

  const handlePurchase = async (kitSlug: string) => {
    setPurchasing(kitSlug)
    await startCheckout(kitSlug)
    setPurchasing(null)
  }

  const filtered = templates.filter(t => activeFilter === 'All' || t.category === activeFilter)

  const counts = filters.reduce((acc, f) => {
    acc[f] = f === 'All' ? templates.length : templates.filter(t => t.category === f).length
    return acc
  }, {} as Record<Filter, number>)

  return (
    <div className="flex-1 flex flex-col">

      {/* ── Header ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-pattern-grid opacity-[0.12]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Templates</p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Your AI already knows<br />
                <span className="text-primary">this codebase.</span>
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground text-lg leading-relaxed">
                Every kit ships pre-loaded with CLAUDE.md, .cursorrules, and tested prompts. Open in Cursor, Claude, or Lovable — and just describe what to build.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['CLAUDE.md in every kit', 'One-time payment', '14-day refund', 'MIT license'].map(t => (
                  <span key={t} className="rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-8 shrink-0">
              {[{ value: String(templates.length), label: 'Templates' }, { value: String(templates.filter(t => t.status === 'available').length), label: 'Live now' }, { value: '$149', label: 'Starting at' }].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-black text-foreground">{s.value}</div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter bar ────────────────────────────────────────────────── */}
      <div className="sticky top-14 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeFilter === f
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-border/80'
                }`}
              >
                {f}
                <span className="font-mono text-[10px] opacity-60">{counts[f]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map(t => (
            <div
              key={t.name}
              className={`group flex flex-col rounded-xl border overflow-hidden transition-all duration-300 ${
                t.status === 'available'
                  ? 'border-primary/20 bg-card hover:border-primary/40 hover:shadow-[0_0_40px_rgba(249,115,22,0.07)]'
                  : 'border-border bg-card hover:border-border/80'
              }`}
            >
              {/* Browser chrome + tabbed preview */}
              <KitPreview template={t} />

              {/* Card body */}
              <div className="p-5 flex flex-col gap-3.5 flex-1">

                {/* Title row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      {t.detailSlug ? (
                        <Link href={`/templates/${t.detailSlug}`} className="font-semibold text-foreground text-base hover:text-primary transition-colors">
                          {t.name}
                        </Link>
                      ) : (
                        <span className="font-semibold text-foreground text-base">{t.name}</span>
                      )}
                      {t.status === 'available' ? (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wide">Live</span>
                      ) : (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border font-bold uppercase tracking-wide">Soon</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{t.subtitle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-black text-foreground">{t.price}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">one-time</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>

                {/* Claude prompt */}
                {t.claudePrompt && (
                  <div className="rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-primary/60 mb-1.5">Example prompt</p>
                    <p className="text-xs text-muted-foreground font-mono leading-relaxed italic">{t.claudePrompt}</p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] px-2 py-0.5 rounded border border-border bg-secondary/40 text-muted-foreground font-mono">{t.screens} screens</span>
                  <span className="text-[10px] px-2 py-0.5 rounded border border-border bg-secondary/40 text-muted-foreground font-mono">{t.platform}</span>
                  {t.tags.filter(tag => !tag.includes('screens')).slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded border border-border bg-secondary/40 text-muted-foreground font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-1">
                  {t.detailSlug ? (
                    <Link
                      href={`/templates/${t.detailSlug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 text-sm px-4 py-2.5 border border-border text-foreground hover:bg-secondary/60 hover:border-border/80 rounded-lg transition-colors font-medium"
                    >
                      View details <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : t.demo ? (
                    <a
                      href={t.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 text-sm px-4 py-2.5 border border-border text-foreground hover:bg-secondary/60 rounded-lg transition-colors font-medium"
                    >
                      Live demo <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <button disabled className="flex-1 text-sm px-4 py-2.5 border border-border/40 text-muted-foreground/40 rounded-lg cursor-not-allowed">
                      Demo soon
                    </button>
                  )}

                  {t.status === 'available' && t.kitSlug ? (
                    <button
                      onClick={() => handlePurchase(t.kitSlug!)}
                      disabled={purchasing === t.kitSlug}
                      className="flex-1 text-sm px-4 py-2.5 rounded-lg transition-all font-bold text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ background: t.accent, boxShadow: `0 4px 20px ${t.accent}35` }}
                    >
                      {purchasing === t.kitSlug ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                          Redirecting…
                        </>
                      ) : (
                        <>Get this kit — {t.price}</>
                      )}
                    </button>
                  ) : (
                    <a
                      href="/#waitlist"
                      className="flex-1 text-sm text-center px-4 py-2.5 rounded-lg border border-border bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors font-medium"
                    >
                      Join waitlist
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
