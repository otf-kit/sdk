'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { COMPONENTS, type ComponentCategory } from '@/lib/components-registry'

// ── Featured showcases ────────────────────────────────────────────────────────
// Three hand-picked components get a full-width "story" block with narrative
// copy beside the preview. These are the headliners — the ones that sell the kit.
const FEATURED: Array<{ name: string; eyebrow: string; headline: string; copy: string; bullets: string[] }> = [
  {
    name: 'DataGrid',
    eyebrow: 'Data tables',
    headline: 'Tables your users actually scroll.',
    copy: 'Virtualized rows, sortable columns, bulk actions, column visibility — wired up with TanStack Table and ready for hundreds of thousands of rows.',
    bullets: ['Virtualized scroll', 'Multi-column sort', 'Filter + bulk actions'],
  },
  {
    name: 'Kanban',
    eyebrow: 'Boards',
    headline: 'Drag, drop, ship.',
    copy: 'A real Kanban board — keyboard-accessible drag-and-drop, optimistic updates, persistent column order. The same component that powers your sprint planning.',
    bullets: ['Optimistic updates', 'Keyboard-accessible DnD', 'Persistent column state'],
  },
  {
    name: 'AppShell',
    eyebrow: 'Layout',
    headline: 'A real app shell, not a demo.',
    copy: 'Sidebar with workspace switcher, mobile-responsive nav, command palette — the full app frame so you can focus on your product, not the chrome.',
    bullets: ['Collapsible sidebar', '⌘K command palette', 'Mobile-first responsive'],
  },
]

const FEATURED_NAMES = new Set(FEATURED.map((f) => f.name))

// ── Browser chrome ────────────────────────────────────────────────────────────
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

// ── Featured showcase block ───────────────────────────────────────────────────
function FeaturedShowcase({
  feature,
  index,
}: {
  feature: (typeof FEATURED)[number]
  index: number
}) {
  const def = COMPONENTS.find((c) => c.name === feature.name)
  if (!def) return null
  const slug = feature.name.toLowerCase().replace(/\s+/g, '-')
  const reversed = index % 2 === 1
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
      <div className={`order-2 ${reversed ? 'lg:order-2' : 'lg:order-1'} space-y-5`}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            {String(index + 1).padStart(2, '0')} · {feature.eyebrow}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
          {feature.headline}
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed max-w-md">{feature.copy}</p>
        <ul className="space-y-2">
          {feature.bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 text-sm">
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span className="text-foreground/80">{b}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/components/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          See it live <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <Link
        href={`/components/${slug}`}
        className={`order-1 ${reversed ? 'lg:order-1' : 'lg:order-2'} group block`}
      >
        <div
          className="relative overflow-hidden rounded-xl border border-border bg-[#080808] transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_24px_64px_-16px_hsl(var(--primary)/0.4)]"
          style={{ height: 420 }}
        >
          <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
          <div
            aria-hidden
            className="absolute -inset-x-8 -top-32 h-72 opacity-60 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.18), transparent 70%)' }}
          />
          <BrowserChrome slug={slug} />
          <div className="absolute inset-0 pt-9">{def.preview}</div>
        </div>
      </Link>
    </div>
  )
}

// ── Compact card (used in browse grid) ────────────────────────────────────────
function CompactCard({ name }: { name: string }) {
  const def = COMPONENTS.find((c) => c.name === name)
  if (!def) return null
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  return (
    <Link href={`/components/${slug}`} className="group flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-lg border border-border bg-[#080808] transition-all duration-200 group-hover:border-primary/30 group-hover:shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.25)] h-44">
        <div className="absolute inset-0 bg-dot-grid opacity-12 pointer-events-none" />
        <div
          aria-hidden
          className="absolute -inset-x-4 -top-16 h-40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.15), transparent 70%)' }}
        />
        <div className="absolute inset-0 scale-[0.78] origin-top">{def.preview}</div>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">{name}</span>
            <ArrowUpRight className="h-3 w-3 text-muted-foreground/40 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{def.description}</p>
        </div>
      </div>
    </Link>
  )
}

// ── Category filter pill ──────────────────────────────────────────────────────
const CATEGORIES: Array<{ value: 'All' | ComponentCategory; label: string }> = [
  { value: 'All',          label: 'All' },
  { value: 'Primitives',   label: 'Primitives' },
  { value: 'Data Display', label: 'Data' },
  { value: 'Charts',       label: 'Charts' },
  { value: 'Forms',        label: 'Forms' },
  { value: 'Navigation',   label: 'Navigation' },
  { value: 'Feedback',     label: 'Feedback' },
  { value: 'Layout',       label: 'Layout' },
  { value: 'Blocks',       label: 'Blocks' },
]

// ── Section ───────────────────────────────────────────────────────────────────
export function ComponentTeaser() {
  const [active, setActive] = useState<'All' | ComponentCategory>('All')
  const browseable = useMemo(
    () => COMPONENTS.filter((c) => !FEATURED_NAMES.has(c.name)),
    [],
  )
  const filtered = useMemo(() => {
    if (active === 'All') return browseable
    return browseable.filter((c) => c.category === active)
  }, [active, browseable])

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: browseable.length }
    for (const c of browseable) map[c.category] = (map[c.category] ?? 0) + 1
    return map
  }, [browseable])

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.10]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28 sm:px-6 space-y-24">

        {/* ── Editorial header ───────────────────────────────────────────── */}
        <header className="grid lg:grid-cols-[1.6fr_1fr] gap-10 items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-5">— Component Library</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
              Every UI pattern.{' '}
              <span className="italic font-light bg-gradient-to-r from-primary via-primary/70 to-primary/50 bg-clip-text text-transparent">
                crafted right.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              From data tables to drag-and-drop boards, from forms that don't suck to charts that match your theme. Every component lives in a real working app — no isolated demos.
            </p>
          </div>

          <div className="space-y-6 lg:text-right">
            <div className="grid grid-cols-4 gap-3 lg:gap-5">
              {[
                { n: `${COMPONENTS.length}+`, label: 'components' },
                { n: '8',                      label: 'categories' },
                { n: '100%',                   label: 'TypeScript' },
                { n: 'MIT',                    label: 'license' },
              ].map((s) => (
                <div key={s.label} className="space-y-0.5 lg:text-right">
                  <div className="text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums">{s.n}</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">{s.label}</div>
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
        </header>

        {/* ── Featured showcases ─────────────────────────────────────────── */}
        <div className="space-y-24 sm:space-y-28">
          {FEATURED.map((f, i) => (
            <FeaturedShowcase key={f.name} feature={f} index={i} />
          ))}
        </div>

        {/* ── Browse divider ─────────────────────────────────────────────── */}
        <div className="space-y-10">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">— And {browseable.length} more</p>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                The rest of the library
              </h3>
            </div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => {
                const count = counts[cat.value] ?? 0
                if (count === 0 && cat.value !== 'All') return null
                const isActive = active === cat.value
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActive(cat.value)}
                    className={
                      'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all border ' +
                      (isActive
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'border-border bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground')
                    }
                  >
                    {cat.label}
                    <span className={'font-mono text-[10px] tabular-nums ' + (isActive ? 'text-primary-foreground/70' : 'text-muted-foreground/60')}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Dense grid ───────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-9">
            {filtered.map((c) => (
              <CompactCard key={c.name} name={c.name} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-xl border border-border bg-secondary/20 px-6 py-16 text-center text-sm text-muted-foreground">
              No components in this category yet.
            </div>
          )}
        </div>

        {/* ── Tech footer ────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-7">
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
