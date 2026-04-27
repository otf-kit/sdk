'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, X, ArrowUpRight,
  Blocks, Eye, MousePointer, Bell, LayoutDashboard,
  BarChart3, FormInput, Zap, Database } from 'lucide-react'
import { components, type ComponentMeta } from '@/data/component-registry'

// ── Category config ────────────────────────────────────────────────────────
type CategoryInfo = { label: string; icon: React.ElementType; color: string }
const CATEGORY_CONFIG: Record<string, CategoryInfo> = {
  'Input':    { label: 'Input',    icon: MousePointer,    color: 'text-orange-400'  },
  'Display':  { label: 'Display',  icon: Eye,             color: 'text-blue-400'    },
  'Feedback': { label: 'Feedback', icon: Bell,            color: 'text-green-400'   },
  'Layout':   { label: 'Layout',   icon: LayoutDashboard, color: 'text-violet-400'  },
  'Data':     { label: 'Data',     icon: BarChart3,       color: 'text-pink-400'    },
}

const ALL_CATEGORIES = ['Input', 'Display', 'Feedback', 'Layout', 'Data'] as const
type Cat = typeof ALL_CATEGORIES[number] | 'All'

// ── Card ──────────────────────────────────────────────────────────────────
function ComponentCard({ meta }: { meta: ComponentMeta }) {
  const cfg = CATEGORY_CONFIG[meta.category]
  const Icon = cfg?.icon ?? Blocks

  return (
    <Link
      href={`/components/${meta.slug}`}
      className="group relative flex flex-col gap-4 overflow-hidden bg-card p-6 transition-all duration-300 hover:bg-secondary/40"
    >
      {/* shine sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden />
      {/* arrow */}
      <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 -translate-y-1 translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" strokeWidth={1.75} />

      <div className="flex items-start justify-between">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-foreground/30 group-hover:shadow-md">
          <Icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${cfg?.color ?? 'text-muted-foreground'}`} strokeWidth={1.5} />
          <div className="absolute inset-0 rounded-lg bg-accent/0 transition-colors duration-300 group-hover:bg-accent/5" />
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors group-hover:border-foreground/40 group-hover:text-foreground">
            {meta.category}
          </span>
          {meta.hasExample && (
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(249,115,22,0.7)]" title="Live Storybook preview" />
          )}
        </div>
      </div>

      <div className="relative">
        <h3 className="font-medium transition-transform duration-300 group-hover:translate-x-0.5">{meta.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{meta.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {meta.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded border border-border bg-secondary/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/70">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

// ── Main grid ─────────────────────────────────────────────────────────────
export function ComponentsGrid() {
  const [category, setCategory] = useState<Cat>('All')
  const [search, setSearch]     = useState('')

  const visible = useMemo(() => {
    return components.filter((c) => {
      const matchCat = category === 'All' || c.category === category
      const q = search.trim().toLowerCase()
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.tags.some((t) => t.includes(q))
      return matchCat && matchSearch
    })
  }, [category, search])

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: components.length }
    ALL_CATEGORIES.forEach((cat) => { m[cat] = components.filter((c) => c.category === cat).length })
    return m
  }, [])

  return (
    <div className="flex-1">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-pattern-grid opacity-[0.12]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Component Library</p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {components.length}+ Components.
              </h1>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Production-ready components built on Radix primitives — fully typed, dark-mode native, with live Storybook previews.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(['MIT', 'TypeScript', 'Radix UI', 'Tailwind v4', 'Dark-first'] as const).map((t) => (
                  <span key={t} className="rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_hsl(140_80%_50%)]" />
              <span className="font-mono text-xs text-muted-foreground">{components.filter((c) => c.hasExample).length} live demos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + search ────────────────────────────────────────────── */}
      <div className="sticky top-[calc(theme(spacing.14)+2.5rem)] z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Category pills */}
            <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {(['All', ...ALL_CATEGORIES] as Cat[]).map((cat) => {
                const isActive = category === cat
                const cfg = cat !== 'All' ? CATEGORY_CONFIG[cat] : null
                const Icon = cfg?.icon
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(isActive && cat !== 'All' ? 'All' : cat)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                      isActive ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {Icon && <Icon className="h-3 w-3" strokeWidth={1.75} />}
                    {cat}
                    <span className="font-mono text-[10px] opacity-60">{counts[cat]}</span>
                  </button>
                )
              })}
            </div>

            {/* Search */}
            <div className="relative shrink-0">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search components…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-full rounded-md border border-border bg-secondary/40 pl-8 pr-7 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/40 sm:w-56"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 pb-24">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card">
              <Search className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="font-medium">No components found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search or category filter.</p>
            <button onClick={() => { setSearch(''); setCategory('All') }} className="mt-4 text-sm font-medium text-primary hover:opacity-80">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((meta) => <ComponentCard key={meta.slug} meta={meta} />)}
            </div>
            <p className="mt-6 text-center font-mono text-xs text-muted-foreground/60">
              Showing {visible.length} of {components.length} components
              {components.filter((c) => c.hasExample).length > 0 && (
                <> · <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  live preview available
                </span></>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
