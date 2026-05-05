'use client'

import { useState } from 'react'
import {
  Home, Layers, BarChart3, Inbox, FolderKanban, Users as UsersIcon,
  ClipboardList, Timer, CheckCircle2, AlertTriangle,
  Plus, Search, TrendingUp,
} from 'lucide-react'
import type { TemplateListEntry } from '@/data/templates/list'

// Tabbed live preview wrapper for a kit. Browser-chrome shell + tab strip on
// the right + the relevant Mini*Preview body for the active tab.
//
// For "available" kits, shows real screen previews (faithful re-renders of the
// actual kit screens). For "soon" kits, shows the placeholder.
//
// Source of truth for the dimensions: the kit cards on /templates list.
// Used by both the listing grid AND the future detail-page preview.

const KIT_TABS_BY_KIT: Record<string, Array<{ id: string; label: string; render: (accent: string, height: number) => React.ReactNode; path: string }>> = {
  'saas-dashboard': [
    { id: 'dashboard', label: 'Dashboard',    render: (a, h) => <MiniDashboardPreview accent={a} height={h} />, path: '/home/dashboard' },
    { id: 'board',     label: 'Issues board', render: (a, h) => <MiniKanbanPreview accent={a} height={h} />,    path: '/home/issues-board' },
  ],
  'fitness-kit': [
    { id: 'summary',   label: 'Summary',      render: (a, h) => <MiniFitnessSummaryPreview accent={a} height={h} />, path: '/summary' },
  ],
}

export function KitPreview({ template, height = 280 }: { template: TemplateListEntry; height?: number }) {
  const tabs = template.detailSlug ? KIT_TABS_BY_KIT[template.detailSlug] : undefined
  const [tabIdx, setTabIdx] = useState(0)
  const activeTab = tabs?.[tabIdx]
  const urlPath = activeTab?.path ?? ''
  const urlBase = template.demoUrl ? template.demoUrl.replace('https://', '') : `${template.name.toLowerCase().replace(/\s+/g, '-')}.otf-kit.dev`
  const url = urlBase + urlPath

  return (
    <div className="border-b border-border">
      {/* Browser chrome */}
      <div className="flex h-9 items-center gap-2 border-b border-border bg-secondary/40 px-3">
        <div className="flex shrink-0 gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-[260px] truncate rounded border border-border bg-background px-3 py-0.5 text-center font-mono text-[10px] text-muted-foreground">
            {url}
          </div>
        </div>
        {tabs ? (
          <div className="flex shrink-0 items-center gap-0.5 rounded-md border border-border bg-background/60 p-0.5">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={(e) => { e.preventDefault(); setTabIdx(i) }}
                className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
                  i === tabIdx
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={i === tabIdx ? { color: template.accent } : {}}
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
      {template.status === 'available' && tabs ? (
        <div key={tabIdx} className="kit-preview-fade">{activeTab!.render(template.accent, height)}</div>
      ) : (
        <ComingSoonPreview accent={template.accent} name={template.name} height={height} />
      )}

      <style>{`
        .kit-preview-fade { animation: kit-preview-fade 220ms ease-out; }
        @keyframes kit-preview-fade { from { opacity: 0 } to { opacity: 1 } }
        @media (prefers-reduced-motion: reduce) { .kit-preview-fade { animation: none } }
      `}</style>
    </div>
  )
}

// ─── Faithful mini renders ──────────────────────────────────────────────────
// Same renderings used on the homepage. Kept inline here so the templates
// page can import them as one cohesive bundle.

export function MiniDashboardPreview({ accent, height = 280 }: { accent: string; height?: number }) {
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
  const statusBars = [
    { label: 'Bk', h: 28, color: '#737373' },
    { label: 'Td', h: 56, color: '#a1a1aa' },
    { label: 'IP', h: 78, color: '#3b82f6' },
    { label: 'Rv', h: 38, color: '#a855f7' },
    { label: 'Dn', h: 96, color: '#22c55e' },
  ]
  return (
    <div className="flex overflow-hidden bg-background" style={{ height }}>
      <aside className="flex w-[118px] shrink-0 flex-col border-r border-border bg-secondary/15">
        <div className="flex h-9 items-center gap-1.5 border-b border-border px-2.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-[3px] text-[7px] font-black text-white" style={{ background: accent }}>O</div>
          <span className="text-[10px] font-bold tracking-tight text-foreground">OTF</span>
        </div>
        <nav className="flex flex-1 flex-col gap-px p-1.5">
          {navItems.map(({ Icon, label, active, badge }) => (
            <div
              key={label}
              className={`flex items-center gap-1.5 rounded-[4px] px-1.5 py-1 text-[9px] transition-colors ${
                active ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'
              }`}
              style={active ? { background: `${accent}18` } : {}}
            >
              <Icon className="h-2.5 w-2.5 shrink-0" style={active ? { color: accent } : {}} strokeWidth={active ? 2.25 : 2} />
              <span className="flex-1 truncate leading-none">{label}</span>
              {badge && (
                <span className="rounded-[3px] px-1 font-mono text-[7px] font-bold leading-tight" style={{ background: `${accent}25`, color: accent }}>
                  {badge}
                </span>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 border-t border-border p-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full text-[6.5px] font-bold text-foreground" style={{ background: `${accent}25`, color: accent }}>SC</div>
          <div className="min-w-0 flex-1 leading-none">
            <div className="truncate text-[7.5px] font-semibold text-foreground">Sarah Chen</div>
            <div className="mt-0.5 truncate text-[6.5px] text-muted-foreground">sarah@acme.com</div>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden bg-background">
        <div className="flex h-9 items-center gap-2 border-b border-border px-3">
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-[10px] font-semibold text-foreground">Good morning, Sarah</span>
            <span className="text-[7.5px] text-muted-foreground">27 issues · 67% resolved</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="flex h-4 items-center gap-1 rounded-[4px] border border-border bg-secondary/40 px-1.5 text-[7.5px] text-muted-foreground">
              <Search className="h-2 w-2" /> Search
            </div>
            <div className="flex h-4 items-center gap-0.5 rounded-[4px] px-1.5 text-[7.5px] font-semibold text-white" style={{ background: accent }}>
              <Plus className="h-2 w-2" strokeWidth={3} /> New
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 overflow-hidden p-2">
          <div className="grid grid-cols-4 gap-1.5">
            {kpis.map(({ Icon, label, value, change, tint }) => (
              <div key={label} className="flex items-start justify-between gap-1 rounded-md border border-border bg-card px-1.5 py-1.5">
                <div className="min-w-0">
                  <div className="text-[6.5px] leading-none text-muted-foreground">{label}</div>
                  <div className="mt-1 text-[13px] font-bold leading-none tracking-tight text-foreground">{value}</div>
                  <div className="mt-1.5 text-[6.5px] leading-none text-muted-foreground">{change}</div>
                </div>
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px]" style={{ background: `${tint}18` }}>
                  <Icon className="h-2 w-2" style={{ color: tint }} strokeWidth={2.25} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-5 gap-1.5">
            <div className="col-span-3 flex min-h-0 flex-col gap-1 rounded-md border border-border bg-card p-2">
              <div className="flex items-center justify-between">
                <div className="leading-none">
                  <div className="text-[8.5px] font-semibold text-foreground">Issue Trend</div>
                  <div className="mt-0.5 text-[6.5px] text-muted-foreground">Total vs completed</div>
                </div>
                <div className="flex items-center gap-1 rounded-[3px] border border-border bg-secondary/40 px-1 py-0.5 font-mono text-[7px] text-muted-foreground">
                  <TrendingUp className="h-2 w-2" style={{ color: accent }} /> 67%
                </div>
              </div>
              <div className="relative flex-1">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <defs>
                    <linearGradient id={`area-${accent}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor={accent} stopOpacity="0.45" />
                      <stop offset="100%" stopColor={accent} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[10, 20, 30].map(y => (
                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" className="text-border" strokeWidth="0.3" strokeDasharray="1 2" />
                  ))}
                  <path d="M0,32 L15,30 L30,26 L45,22 L60,17 L75,11 L90,7 L100,5 L100,40 L0,40 Z" fill={`url(#area-${accent})`} />
                  <path d="M0,32 L15,30 L30,26 L45,22 L60,17 L75,11 L90,7 L100,5" fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M0,22 L15,20 L30,17 L45,15 L60,12 L75,8 L90,5 L100,3" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
              </div>
              <div className="flex justify-between font-mono text-[6.5px] text-muted-foreground">
                {['W1','W2','W3','W4','W5','W6'].map(w => <span key={w}>{w}</span>)}
              </div>
            </div>
            <div className="col-span-2 flex min-h-0 flex-col gap-1 rounded-md border border-border bg-card p-2">
              <div className="leading-none">
                <div className="text-[8.5px] font-semibold text-foreground">Status</div>
                <div className="mt-0.5 text-[6.5px] text-muted-foreground">By stage</div>
              </div>
              <div className="flex flex-1 items-end gap-1.5">
                {statusBars.map(s => (
                  <div key={s.label} className="flex h-full flex-1 flex-col items-center justify-end gap-0.5">
                    <div className="w-[55%] rounded-[2px]" style={{ height: `${s.h}%`, background: s.color, opacity: 0.85 }} />
                    <span className="font-mono text-[6.5px] leading-none text-muted-foreground">{s.label}</span>
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

export function MiniKanbanPreview({ accent, height = 280 }: { accent: string; height?: number }) {
  const navItems = [
    { Icon: Home,         label: 'Dashboard' },
    { Icon: Layers,       label: 'All Issues', active: true },
    { Icon: BarChart3,    label: 'Analytics' },
    { Icon: Inbox,        label: 'Inbox', badge: '5' },
    { Icon: FolderKanban, label: 'Projects' },
    { Icon: UsersIcon,    label: 'Teams' },
  ]
  const columns: Array<{ title: string; tone: string; cards: Array<{ title: string; badge?: string }> }> = [
    { title: 'Backlog',    tone: '#737373', cards: [{ title: 'Add Stripe annual plans' }, { title: 'Migrate to Drizzle 1.0' }, { title: 'Refactor toast emitter' }] },
    { title: 'Todo',       tone: '#a1a1aa', cards: [{ title: 'Wire forgot password', badge: 'P2' }, { title: 'Onboarding tour' }] },
    { title: 'In Progress',tone: '#3b82f6', cards: [{ title: 'Auth flow refactor', badge: 'High' }, { title: 'Payment integration' }] },
    { title: 'In Review',  tone: '#a855f7', cards: [{ title: 'PR #421 — analytics' }] },
    { title: 'Done',       tone: '#22c55e', cards: [{ title: 'CI/CD setup' }, { title: 'DB schema' }, { title: 'Onboarding flow' }] },
  ]
  return (
    <div className="flex overflow-hidden bg-background" style={{ height }}>
      <aside className="flex w-[118px] shrink-0 flex-col border-r border-border bg-secondary/15">
        <div className="flex h-9 items-center gap-1.5 border-b border-border px-2.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-[3px] text-[7px] font-black text-white" style={{ background: accent }}>O</div>
          <span className="text-[10px] font-bold tracking-tight text-foreground">OTF</span>
        </div>
        <nav className="flex flex-1 flex-col gap-px p-1.5">
          {navItems.map(({ Icon, label, active, badge }) => (
            <div key={label} className={`flex items-center gap-1.5 rounded-[4px] px-1.5 py-1 text-[9px] transition-colors ${active ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'}`} style={active ? { background: `${accent}18` } : {}}>
              <Icon className="h-2.5 w-2.5 shrink-0" style={active ? { color: accent } : {}} strokeWidth={active ? 2.25 : 2} />
              <span className="flex-1 truncate leading-none">{label}</span>
              {badge && (<span className="rounded-[3px] px-1 font-mono text-[7px] font-bold leading-tight" style={{ background: `${accent}25`, color: accent }}>{badge}</span>)}
            </div>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden bg-background">
        <div className="flex h-9 items-center gap-2 border-b border-border px-3">
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-[10px] font-semibold text-foreground">Issues board</span>
            <span className="text-[7.5px] text-muted-foreground">12 open · 3 in review</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="flex h-4 items-center gap-0.5 rounded-[4px] px-1.5 text-[7.5px] font-semibold text-white" style={{ background: accent }}>
              <Plus className="h-2 w-2" strokeWidth={3} /> New
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-x-auto p-2">
          <div className="grid h-full min-w-0 grid-cols-5 gap-1.5">
            {columns.map((col) => (
              <div key={col.title} className="flex min-w-0 flex-col gap-1 rounded-md bg-[hsl(var(--muted)/0.4)] p-1.5">
                <div className="flex items-center justify-between px-0.5 pb-0.5">
                  <div className="flex min-w-0 items-center gap-1">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: col.tone }} />
                    <span className="truncate text-[8.5px] font-semibold text-foreground">{col.title}</span>
                  </div>
                  <span className="shrink-0 font-mono text-[7px] tabular-nums text-muted-foreground">{col.cards.length}</span>
                </div>
                <div className="flex min-h-0 flex-col gap-1">
                  {col.cards.map((c, i) => (
                    <div key={i} className="rounded-[4px] border border-border bg-card px-1.5 py-1">
                      <div className="flex items-start justify-between gap-1">
                        <span className="line-clamp-2 text-[8px] font-medium leading-tight text-foreground">{c.title}</span>
                        {c.badge && (<span className="shrink-0 rounded-full px-1 text-[6.5px] font-bold leading-tight" style={{ background: `${accent}1a`, color: accent }}>{c.badge}</span>)}
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

export function MiniFitnessSummaryPreview({ accent, height = 280 }: { accent: string; height?: number }) {
  const rings = [
    { progress: 0.78, color: accent,    label: 'Move',     value: '352',  unit: 'CAL' },
    { progress: 0.92, color: '#a3ff12', label: 'Exercise', value: '28',   unit: 'MIN' },
    { progress: 0.55, color: '#00d4d4', label: 'Stand',    value: '7',    unit: 'HRS' },
  ]
  const RING_RADII = [42, 32, 22]
  const STROKE = 7
  const metrics = [
    { label: 'Steps',    value: '8,420', accent: '#00d4d4' },
    { label: 'Distance', value: '6.2',   unit: 'km',  accent: '#fbbf24' },
    { label: 'Sessions', value: '3',     accent: '#a3ff12' },
    { label: 'Awards',   value: '5',     accent: '#a78bfa' },
  ]
  return (
    <div className="flex items-center justify-center bg-background px-6 py-3" style={{ height }}>
      <div className="relative flex h-full w-[160px] flex-col overflow-hidden rounded-[18px] border bg-[#0a0a0a]" style={{ borderColor: '#1f1f1f' }}>
        <div className="flex items-center justify-between px-3 py-1.5 font-mono text-[8px] text-white/60">
          <span>9:41</span>
          <span>●●●</span>
        </div>
        <div className="px-3 pb-1">
          <div className="text-[7px] font-bold tracking-wider text-white/40">WED, MAY 1</div>
          <div className="text-[12px] font-bold leading-tight text-white">Summary</div>
        </div>
        <div className="mx-2 mt-1 flex items-center gap-2 rounded-md bg-[#171717] p-2">
          <svg width={92} height={92} viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            {rings.map((r, i) => {
              const radius = RING_RADII[i]!
              const circ = 2 * Math.PI * radius
              return (
                <g key={i}>
                  <circle cx={50} cy={50} r={radius} stroke={r.color + '33'} strokeWidth={STROKE} fill="none" />
                  <circle cx={50} cy={50} r={radius} stroke={r.color} strokeWidth={STROKE} fill="none" strokeLinecap="round" strokeDasharray={`${circ * r.progress} ${circ}`} />
                </g>
              )
            })}
          </svg>
          <div className="flex flex-1 flex-col gap-1">
            {rings.map((r) => (
              <div key={r.label} className="flex items-baseline gap-1">
                <div className="h-1 w-1 rounded-full" style={{ background: r.color }} />
                <div className="w-8 text-[6px] font-bold tracking-wide text-white/50">{r.label.toUpperCase()}</div>
                <div className="text-[8px] font-bold text-white">{r.value}</div>
                <div className="text-[6px] font-bold text-white/40">{r.unit}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-2 mt-2 grid grid-cols-2 gap-1.5">
          {metrics.map((m) => (
            <div key={m.label} className="rounded bg-[#171717] p-1.5">
              <div className="text-[6px] font-bold uppercase tracking-wider text-white/40">{m.label}</div>
              <div className="mt-0.5 flex items-baseline gap-0.5">
                <div className="text-[12px] font-bold leading-none" style={{ color: m.accent }}>{m.value}</div>
                {m.unit ? <div className="text-[6px] text-white/40">{m.unit}</div> : null}
              </div>
              <div className="mt-1 flex h-2 items-end gap-px">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div key={j} className="flex-1 rounded-sm" style={{ background: m.accent, opacity: 0.35 + (j / 9), height: `${20 + ((j * 17) % 80)}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-1.5 left-3 right-3 flex h-6 items-center justify-around rounded-full text-[7px] font-bold" style={{ background: '#1a1a1a' }}>
          <div className="rounded-full bg-[#0a0a0a] px-2 py-0.5 text-white">Summary</div>
          <div className="text-white/50">Workout</div>
          <div className="text-white/50">Sharing</div>
        </div>
      </div>
    </div>
  )
}

function ComingSoonPreview({ accent, name, height = 190 }: { accent: string; name: string; height?: number }) {
  return (
    <div className="flex items-center justify-center bg-background" style={{ height }}>
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border" style={{ background: `${accent}10`, borderColor: `${accent}20` }}>
          <svg className="h-5 w-5" style={{ color: accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
        </div>
        <div className="text-xs font-medium text-muted-foreground">{name}</div>
        <div className="mt-0.5 text-[10px] text-muted-foreground/40">Coming soon</div>
      </div>
    </div>
  )
}
