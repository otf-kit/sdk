'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { COMPONENTS } from '@/lib/components-registry'

// ── Label ─────────────────────────────────────────────────────────────────────
function BentoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/60 select-none">
      {children}
    </p>
  )
}

// ── Browser chrome ────────────────────────────────────────────────────────────
// Tiny mac-style top bar to make every preview feel like a real product screenshot.
function BrowserChrome({ slug }: { slug: string }) {
  return (
    <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-2 px-3 py-2 border-b border-border/80 bg-background/40 backdrop-blur-sm">
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-red-500/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
        <span className="h-2 w-2 rounded-full bg-green-500/70" />
      </div>
      <div className="flex-1 flex justify-center">
        <span className="rounded-md bg-background/60 border border-border/60 px-2 py-0.5 font-mono text-[9px] tracking-tight text-muted-foreground/70 max-w-[60%] truncate">
          otf.sh/{slug}
        </span>
      </div>
      <span className="h-2 w-2" aria-hidden />
    </div>
  )
}

// ── Preview card ──────────────────────────────────────────────────────────────
function BentoCard({ name, height }: { name: string; height: number }) {
  const def = COMPONENTS.find((c) => c.name === name)
  if (!def) return null
  const slug = def.name.toLowerCase().replace(/\s+/g, '-')
  return (
    <Link href={`/components/${slug}`} className="flex flex-col gap-1.5 group">
      <div className="flex items-center justify-between">
        <BentoLabel>{def.name}</BentoLabel>
        <ArrowUpRight
          className="h-3 w-3 text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100"
          strokeWidth={1.75}
        />
      </div>
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-[#080808] transition-all duration-200 group-hover:border-primary/30 group-hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.25)]"
        style={{ height }}
      >
        <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
        {/* Soft top→bottom ambient glow that subtly shifts on hover */}
        <div
          aria-hidden
          className="absolute -inset-x-8 -top-32 h-72 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.18), transparent 70%)' }}
        />
        <BrowserChrome slug={slug} />
        <div className="absolute inset-0 pt-9">{def.preview}</div>
      </div>
    </Link>
  )
}

// ── Desktop bento layout (3-col grid, rows with equal height per row) ─────────
// Heights calibrated so every preview has breathing room — no clipping.
const ROWS: Array<{ items: Array<{ name: string; span?: 2 }>; height: number }> = [
  { height: 376, items: [{ name: 'DataGrid', span: 2 }, { name: 'DonutChart' }] },
  { height: 256, items: [{ name: 'Button' }, { name: 'Badge' }, { name: 'Avatar' }] },
  { height: 376, items: [{ name: 'AppShell', span: 2 }, { name: 'Sidebar' }] },
  { height: 276, items: [{ name: 'Dialog' }, { name: 'Select' }, { name: 'Input' }] },
  { height: 336, items: [{ name: 'Kanban', span: 2 }, { name: 'MetricCard' }] },
  { height: 256, items: [{ name: 'Checkbox' }, { name: 'Tabs' }, { name: 'Slider' }] },
  { height: 316, items: [{ name: 'BarChart', span: 2 }, { name: 'LineChart' }] },
  { height: 296, items: [{ name: 'TextureCard' }, { name: 'Tooltip' }, { name: 'CommandPalette' }] },
  { height: 316, items: [{ name: 'SplitPage', span: 2 }, { name: 'Timeline' }] },
  { height: 296, items: [{ name: 'Toast' }, { name: 'Alert' }, { name: 'Progress' }] },
  { height: 276, items: [{ name: 'Skeleton' }, { name: 'EmptyState' }, { name: 'Breadcrumb' }] },
  { height: 376, items: [{ name: 'AutoForm' }, { name: 'DatePicker' }, { name: 'StepForm' }] },
  { height: 296, items: [{ name: 'WorkspaceMembers' }, { name: 'FileCards', span: 2 }] },
]

// ── Mobile: top 5 featured components shown vertically ───────────────────────
const MOBILE_FEATURED = [
  'CommandPalette',
  'DataGrid',
  'DatePicker',
  'TextureCard',
  'Kanban',
]

// ── Section ───────────────────────────────────────────────────────────────────
export function ComponentTeaser() {
  const total = COMPONENTS.length
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.10]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="mb-10 sm:mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Component Library</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Every UI pattern, covered.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground text-sm sm:text-base">
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

        {/* ── Mobile: single-column top 5 + View All ────────────────────────── */}
        <div className="flex flex-col gap-3 md:hidden">
          {MOBILE_FEATURED.map((name) => (
            <BentoCard key={name} name={name} height={296} />
          ))}
          <Link
            href="/components"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/40 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:border-primary/30"
          >
            View all {total} components
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        {/* ── Desktop: 3-column bento grid ──────────────────────────────────── */}
        <div className="hidden md:flex flex-col gap-3">
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

        {/* ── Footer strip ──────────────────────────────────────────────────── */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {['React', 'TypeScript', 'Tailwind CSS', 'Radix UI'].map((t, i) => (
              <span key={t} className="flex items-center gap-4 sm:gap-6">
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
