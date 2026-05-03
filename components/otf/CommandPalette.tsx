'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, ArrowRight, Component, Blocks, FileText, Layers, X, Sparkles } from 'lucide-react'
import { componentLinks, blockLinks, patternLinks, docsLinks } from '@/data/otf-links'
import { components as componentRegistry } from '@/data/component-registry'
import { examples } from '@/data/component-examples'

type Item = {
  label: string
  href: string
  group: 'Components' | 'Blocks' | 'Patterns' | 'Docs'
  icon: typeof Component
  hint?: string
  hasLive?: boolean
}

const componentItems: Item[] = componentRegistry.map((c) => ({
  label: c.name,
  href: `/components/${c.slug}`,
  group: 'Components',
  icon: Component,
  hint: c.description,
  // "Live" = any working preview path (in-process React demo, Storybook
  // iframe, or mobile-showcase iframe). The registry's `hasExample` flag
  // is the single source of truth for this — every entry that's wired to
  // render gets the orange dot.
  hasLive: c.hasExample === true || !!examples[c.slug],
}))

const allItems: Item[] = [
  ...docsLinks.map((l) => ({ ...l, group: 'Docs' as const, icon: FileText })),
  ...componentItems,
  ...blockLinks.map((l) => ({ ...l, group: 'Blocks' as const, icon: Blocks })),
  ...patternLinks.map((l) => ({ ...l, group: 'Patterns' as const, icon: Layers })),
]

type Scope = 'all' | 'components' | 'blocks' | 'patterns' | 'docs'

// Filter scopes whose underlying link source is empty so we don't show a
// tab with `0` count. Blocks / Patterns ship empty until those route trees
// land — see otf-links.ts.
const allScopes: { id: Scope; label: string; group?: Item['group'] }[] = [
  { id: 'all',        label: 'All' },
  { id: 'components', label: 'Components', group: 'Components' },
  { id: 'blocks',     label: 'Blocks',     group: 'Blocks' },
  { id: 'patterns',   label: 'Patterns',   group: 'Patterns' },
  { id: 'docs',       label: 'Docs',       group: 'Docs' },
]

const scopes = allScopes.filter(
  (s) => !s.group || allItems.some((i) => i.group === s.group)
)

type Props = {
  open: boolean
  onClose: () => void
  initialScope?: Scope
}

export function CommandPalette({ open, onClose, initialScope = 'all' }: Props) {
  const [q, setQ]         = useState('')
  const [active, setActive] = useState(0)
  const [scope, setScope]   = useState<Scope>(initialScope)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setQ(''); setActive(0); setScope(initialScope)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open, initialScope])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    const scopeGroup = scopes.find((s) => s.id === scope)?.group
    const pool = scopeGroup ? allItems.filter((i) => i.group === scopeGroup) : allItems
    // Cap raised from 60 → 300 to fit the full 212-component pool plus
    // docs/blocks/patterns. Originally 60 was a safe-default for a small
    // catalog; with 212 components, it silently truncated 70%+ of results.
    const CAP = 300
    if (!term) return pool.slice(0, CAP)
    return pool
      .map((item) => {
        const labelL = item.label.toLowerCase()
        const hintL  = (item.hint || '').toLowerCase()
        const labelIdx = labelL.indexOf(term)
        const hintIdx  = hintL.indexOf(term)
        let score = -1
        if (labelL === term)               score = 0
        else if (labelL.startsWith(term))  score = 1
        else if (labelIdx >= 0)            score = 10 + labelIdx
        else if (hintIdx >= 0)             score = 1000 + hintIdx
        return { item, score }
      })
      .filter((r) => r.score >= 0)
      .sort((a, b) => a.score - b.score || a.item.label.localeCompare(b.item.label))
      .slice(0, CAP)
      .map((r) => r.item)
  }, [q, scope])

  const grouped = useMemo(() => {
    const groups: Record<string, Item[]> = {}
    results.forEach((item) => {
      groups[item.group] = groups[item.group] || []
      groups[item.group].push(item)
    })
    return groups
  }, [results])

  const orderedGroups = (['Components', 'Blocks', 'Patterns', 'Docs'] as const).filter((g) => grouped[g]?.length)
  const flat = results

  useEffect(() => { setActive(0) }, [scope, q])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(flat.length - 1, i + 1)) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(0, i - 1)) }
      else if (e.key === 'Tab') {
        e.preventDefault()
        const idx  = scopes.findIndex((s) => s.id === scope)
        const next = scopes[(idx + (e.shiftKey ? -1 + scopes.length : 1)) % scopes.length]
        setScope(next.id)
      } else if (e.key === 'Enter') {
        const item = flat[active]
        if (item) { onClose(); window.location.href = item.href }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, active, flat, scope, onClose])

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`) as HTMLElement | null
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!open) return null

  let runningIdx = -1

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh] sm:pt-[12vh]">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} aria-hidden />
      <div
        role="dialog" aria-modal="true" aria-label="Search"
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl shadow-primary/10 backdrop-blur-xl"
        style={{ animation: 'cmdIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search components, blocks, patterns, docs…"
            className="flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden h-6 items-center rounded border border-border bg-secondary/60 px-1.5 font-mono text-[10px] text-muted-foreground sm:flex">ESC</kbd>
          <button onClick={onClose} aria-label="Close search" className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-secondary hover:text-foreground sm:hidden">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto border-b border-border px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {scopes.map((s) => {
            const isActive = s.id === scope
            const count = s.group ? allItems.filter((i) => i.group === s.group).length : allItems.length
            return (
              <button key={s.id} onClick={() => setScope(s.id)}
                className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${isActive ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground'}`}>
                {s.label}
                <span className={`ml-1.5 font-mono text-[10px] ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground/60'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        <div ref={listRef} className="max-h-[55vh] overflow-y-auto p-2">
          {flat.length === 0 ? (
            <div className="px-3 py-12 text-center text-sm text-muted-foreground">
              No {scope === 'all' ? 'results' : scope} matching &ldquo;<span className="text-foreground">{q}</span>&rdquo;
            </div>
          ) : (
            orderedGroups.map((group) => (
              <div key={group} className="mb-2">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{group}</div>
                  <div className="font-mono text-[10px] text-muted-foreground/60">{grouped[group].length}</div>
                </div>
                {grouped[group].map((item) => {
                  runningIdx += 1
                  const idx = runningIdx
                  const isAct = idx === active
                  const Icon = item.icon
                  return (
                    <a key={item.href} data-idx={idx} href={item.href}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => onClose()}
                      className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors ${isAct ? 'bg-secondary text-foreground' : 'text-foreground/80 hover:bg-secondary/60'}`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${isAct ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={1.75} />
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <span className="truncate">{item.label}</span>
                        {item.hasLive && <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_6px_rgba(249,115,22,0.7)]" title="Live demo available" />}
                        {item.hint && <span className="hidden truncate text-xs text-muted-foreground/70 sm:inline">— {item.hint}</span>}
                      </div>
                      {isAct && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary" />}
                    </a>
                  )
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-4 py-2 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-background px-1 font-mono">↑↓</kbd> navigate</span>
            <span className="hidden items-center gap-1 sm:flex"><kbd className="rounded border border-border bg-background px-1 font-mono">Tab</kbd> scope</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-background px-1 font-mono">↵</kbd> open</span>
          </div>
          <span className="flex items-center gap-1.5 font-mono">
            <Sparkles className="h-3 w-3 text-primary" />
            {flat.length} {flat.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes cmdIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
