'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { COMPONENTS } from '@/lib/components-registry'

// ── Which slugs get col-span-2 in the bento ──────────────────────────────────
const WIDE = new Set(['DataGrid', 'AppShell', 'Kanban', 'BarChart', 'SplitPage'])

// ── Ordered bento layout (4-col grid on lg) ──────────────────────────────────
// Row 1: DataGrid(2) + BarChart(1) + Kanban(1)
// Row 2: Button(1) + Input(1) + Badge(1) + Avatar(1)
// Row 3: AppShell(2) + Sidebar(1) + CommandPalette(1)
// Row 4: Dialog(1) + Select(1) + Tooltip(1) + Checkbox(1)
// Row 5: LineChart(1) + DonutChart(1) + MetricCard(1) + Progress(1)
// Row 6: Tabs(1) + Slider(1) + TextureCard(1) + Timeline(1)
// Row 7: Toast(1) + Alert(1) + Skeleton(1) + EmptyState(1)
// Row 8: SplitPage(2) + Form(1) + DatePicker(1)
// Row 9: Breadcrumb(1) + StepForm(1) + WorkspaceMembers(1) + FileCards(1)
const BENTO_ORDER = [
  'DataGrid', 'BarChart', 'Kanban',
  'Button', 'Input', 'Badge', 'Avatar',
  'AppShell', 'Sidebar', 'CommandPalette',
  'Dialog', 'Select', 'Tooltip', 'Checkbox',
  'LineChart', 'DonutChart', 'MetricCard', 'Progress',
  'Tabs', 'Slider', 'TextureCard', 'Timeline',
  'Toast', 'Alert', 'Skeleton', 'EmptyState',
  'SplitPage', 'AutoForm', 'DatePicker',
  'Breadcrumb', 'StepForm', 'WorkspaceMembers', 'FileCards',
]

const ORDERED = BENTO_ORDER
  .map((name) => COMPONENTS.find((c) => c.name === name))
  .filter(Boolean) as typeof COMPONENTS

// Append any that weren't in the explicit order list
const REMAINING = COMPONENTS.filter((c) => !BENTO_ORDER.includes(c.name))
const ALL_BENTO = [...ORDERED, ...REMAINING]

// ── Category colors ───────────────────────────────────────────────────────────
const CAT_COLOR: Record<string, string> = {
  Primitives:    'text-orange-400 border-orange-400/20 bg-orange-400/5',
  'Data Display':'text-blue-400 border-blue-400/20 bg-blue-400/5',
  Navigation:    'text-violet-400 border-violet-400/20 bg-violet-400/5',
  Feedback:      'text-green-400 border-green-400/20 bg-green-400/5',
  Layout:        'text-amber-400 border-amber-400/20 bg-amber-400/5',
  Forms:         'text-pink-400 border-pink-400/20 bg-pink-400/5',
  Blocks:        'text-cyan-400 border-cyan-400/20 bg-cyan-400/5',
  Charts:        'text-rose-400 border-rose-400/20 bg-rose-400/5',
}

// ── Component card ────────────────────────────────────────────────────────────
function BentoCard({ def, wide }: { def: typeof COMPONENTS[number]; wide: boolean }) {
  const catCls = CAT_COLOR[def.category] ?? 'text-muted-foreground border-border bg-secondary/40'
  return (
    <Link
      href={`/components/${def.name.toLowerCase().replace(/\s+/g, '-')}`}
      className={`group relative flex flex-col overflow-hidden bg-card transition-all duration-300 hover:bg-secondary/40 ${wide ? 'col-span-2' : 'col-span-1'}`}
    >
      {/* shine sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden />
      {/* arrow */}
      <ArrowUpRight className="absolute right-3 top-3 h-3.5 w-3.5 -translate-y-0.5 translate-x-0.5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" strokeWidth={1.75} />

      {/* Preview area */}
      <div className="relative h-[160px] overflow-hidden border-b border-border bg-[#080808]">
        <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
        <div className="absolute inset-0">
          {def.preview}
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{def.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{def.description.split('.')[0]}.</p>
        </div>
        <span className={`shrink-0 rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide ${catCls}`}>
          {def.category.split(' ')[0]}
        </span>
      </div>
    </Link>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export function ComponentTeaser() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.10]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Component Library</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {COMPONENTS.length}+ components.{' '}
              <span className="text-muted-foreground/50">Every UI pattern, covered.</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Buttons, data tables, charts, kanban boards, sidebars — fully typed, accessible, dark-mode native.
            </p>
          </div>

          <div className="shrink-0 space-y-4 md:text-right">
            <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {[
                { n: `${COMPONENTS.length}+`, label: 'components' },
                { n: '8',    label: 'categories' },
                { n: '100%', label: 'TypeScript' },
                { n: 'MIT',  label: 'license' },
              ].map((s) => (
                <div key={s.label} className="text-center md:text-right">
                  <div className="text-lg font-bold text-foreground leading-none">{s.n}</div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">{s.label}</div>
                </div>
              ))}
            </div>
            <Link
              href="/components"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Browse all components
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* ── Bento grid ────────────────────────────────────────────────────── */}
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {ALL_BENTO.map((def) => (
            <BentoCard key={def.name} def={def} wide={WIDE.has(def.name)} />
          ))}
        </div>

        {/* ── Footer strip ──────────────────────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            {['React', 'TypeScript', 'Tailwind CSS', 'Radix UI'].map((t, i) => (
              <span key={t} className="flex items-center gap-6">
                {i > 0 && <span className="w-px h-3 bg-border" />}
                <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">{t}</span>
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
