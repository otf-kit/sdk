'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { COMPONENTS } from '@/lib/components-registry'

// ── Label (like old bento design) ────────────────────────────────────────────
function BentoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/60 select-none">
      {children}
    </p>
  )
}

// ── Preview card ──────────────────────────────────────────────────────────────
function BentoCard({ name, height }: { name: string; height: number }) {
  const def = COMPONENTS.find((c) => c.name === name)
  if (!def) return null
  const slug = def.name.toLowerCase().replace(/\s+/g, '-')
  return (
    <Link href={`/components/${slug}`} className="flex flex-col gap-1.5 group">
      <BentoLabel>{def.category}</BentoLabel>
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-[#080808] transition-colors duration-200 group-hover:border-primary/30"
        style={{ height }}
      >
        {/* grid bg */}
        <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
        {/* preview */}
        <div className="absolute inset-0">
          {def.preview}
        </div>
        {/* name badge */}
        <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-3 py-2.5 bg-gradient-to-t from-[#080808]/95 via-[#080808]/60 to-transparent">
          <span className="font-medium text-[11px] text-foreground/90">{def.name}</span>
          <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.75} />
        </div>
      </div>
    </Link>
  )
}

// ── Bento grid ────────────────────────────────────────────────────────────────
// 3-column grid, rows with explicit equal heights per row.
// Heights are chosen to let each component breathe — no squeezing.
const ROWS: Array<{ items: Array<{ name: string; span?: 2 }>; height: number }> = [
  // Row 1 — large data blocks
  { height: 300, items: [{ name: 'DataGrid', span: 2 }, { name: 'DonutChart' }] },
  // Row 2 — basic primitives (small, need little height)
  { height: 180, items: [{ name: 'Button' }, { name: 'Badge' }, { name: 'Avatar' }] },
  // Row 3 — app layout block + sidebar
  { height: 280, items: [{ name: 'AppShell', span: 2 }, { name: 'Sidebar' }] },
  // Row 4 — form primitives
  { height: 200, items: [{ name: 'Dialog' }, { name: 'Select' }, { name: 'Input' }] },
  // Row 5 — board + kpi
  { height: 260, items: [{ name: 'Kanban', span: 2 }, { name: 'MetricCard' }] },
  // Row 6 — controls
  { height: 190, items: [{ name: 'Checkbox' }, { name: 'Tabs' }, { name: 'Slider' }] },
  // Row 7 — charts
  { height: 240, items: [{ name: 'BarChart', span: 2 }, { name: 'LineChart' }] },
  // Row 8 — content + tooltip
  { height: 200, items: [{ name: 'TextureCard' }, { name: 'Tooltip' }, { name: 'CommandPalette' }] },
  // Row 9 — 2-pane + timeline
  { height: 240, items: [{ name: 'SplitPage', span: 2 }, { name: 'Timeline' }] },
  // Row 10 — notifications
  { height: 220, items: [{ name: 'Toast' }, { name: 'Alert' }, { name: 'Progress' }] },
  // Row 11 — states
  { height: 200, items: [{ name: 'Skeleton' }, { name: 'EmptyState' }, { name: 'Breadcrumb' }] },
  // Row 12 — forms
  { height: 240, items: [{ name: 'AutoForm' }, { name: 'DatePicker' }, { name: 'StepForm' }] },
  // Row 13 — blocks
  { height: 200, items: [{ name: 'WorkspaceMembers' }, { name: 'FileCards', span: 2 }] },
]

// ── Section ───────────────────────────────────────────────────────────────────
export function ComponentTeaser() {
  const total = COMPONENTS.length
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.10]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Component Library</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {total}+ components.{' '}
              <span className="text-muted-foreground/40">Every UI pattern, covered.</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Buttons, data tables, charts, kanban boards, sidebars — fully typed, accessible, dark-mode native.
            </p>
          </div>

          <div className="shrink-0 space-y-4 md:text-right">
            <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {[
                { n: `${total}+`, label: 'components' },
                { n: '8',         label: 'categories' },
                { n: '100%',      label: 'TypeScript'  },
                { n: 'MIT',       label: 'license'     },
              ].map((s) => (
                <div key={s.label} className="text-center md:text-right">
                  <div className="text-lg font-bold leading-none">{s.n}</div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">{s.label}</div>
                </div>
              ))}
            </div>
            <Link
              href="/components"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Browse all <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* ── Bento grid ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {ROWS.map((row, ri) => (
            <div key={ri} className="grid grid-cols-3 gap-3">
              {row.items.map((item) => (
                <div key={item.name} className={item.span === 2 ? 'col-span-2' : 'col-span-1'}>
                  <BentoCard name={item.name} height={row.height} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Footer strip ────────────────────────────────────────────────── */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <div className="flex items-center gap-6">
            {['React', 'TypeScript', 'Tailwind CSS', 'Radix UI'].map((t, i) => (
              <span key={t} className="flex items-center gap-6">
                {i > 0 && <span className="h-3 w-px bg-border" />}
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">{t}</span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live previews · No screenshots
          </div>
        </div>
      </div>
    </section>
  )
}
