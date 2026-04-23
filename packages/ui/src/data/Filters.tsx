'use client'

import React, { createContext, useCallback, useContext, useState } from 'react'
import { Plus, X, Filter } from 'lucide-react'
import { cn } from '../utils/cn'

// ── Types ────────────────────────────────────────────────────────

export interface FilterDef {
  key: string
  label: string
  type: 'text' | 'select' | 'date' | 'number'
  options?: Array<{ label: string; value: string }>
}

export interface FilterValue {
  id: string
  key: string
  operator: string
  value: string
}

const TEXT_OPS = ['contains', 'equals', 'starts with', 'ends with'] as const
const NUM_OPS  = ['=', '!=', '>', '<', '>=', '<='] as const

// ── Context ──────────────────────────────────────────────────────

interface FiltersContextValue {
  filters: FilterDef[]
  activeFilters: FilterValue[]
  addFilter: (filter: Omit<FilterValue, 'id'>) => void
  removeFilter: (id: string) => void
  clearFilters: () => void
  updateFilter: (id: string, patch: Partial<Omit<FilterValue, 'id'>>) => void
}

const FiltersCtx = createContext<FiltersContextValue>({
  filters: [],
  activeFilters: [],
  addFilter: () => {},
  removeFilter: () => {},
  clearFilters: () => {},
  updateFilter: () => {},
})

export function useFilters() {
  return useContext(FiltersCtx)
}

// ── Provider ─────────────────────────────────────────────────────

export interface FiltersProviderProps {
  filters: FilterDef[]
  children: React.ReactNode
  /** Optional initial filters */
  initialFilters?: FilterValue[]
  /** Called whenever active filters change */
  onChange?: (filters: FilterValue[]) => void
}

let _filterId = 0
function nextId() { return `f-${++_filterId}` }

export function FiltersProvider({
  filters,
  children,
  initialFilters = [],
  onChange,
}: FiltersProviderProps) {
  const [activeFilters, setActiveFilters] = useState<FilterValue[]>(initialFilters)

  const set = useCallback((next: FilterValue[]) => {
    setActiveFilters(next)
    onChange?.(next)
  }, [onChange])

  const addFilter = useCallback((f: Omit<FilterValue, 'id'>) => {
    set([...activeFilters, { ...f, id: nextId() }])
  }, [activeFilters, set])

  const removeFilter = useCallback((id: string) => {
    set(activeFilters.filter((f) => f.id !== id))
  }, [activeFilters, set])

  const clearFilters = useCallback(() => set([]), [set])

  const updateFilter = useCallback(
    (id: string, patch: Partial<Omit<FilterValue, 'id'>>) => {
      set(activeFilters.map((f) => f.id === id ? { ...f, ...patch } : f))
    },
    [activeFilters, set]
  )

  return (
    <FiltersCtx.Provider value={{ filters, activeFilters, addFilter, removeFilter, clearFilters, updateFilter }}>
      {children}
    </FiltersCtx.Provider>
  )
}

// ── AddFilterButton ──────────────────────────────────────────────

export function AddFilterButton({ className }: { className?: string }) {
  const { filters, addFilter } = useFilters()
  const [open, setOpen] = useState(false)
  const [key, setKey] = useState('')
  const [op, setOp] = useState('')
  const [val, setVal] = useState('')

  const def = filters.find((f) => f.key === key)
  const ops = def?.type === 'number' ? NUM_OPS : TEXT_OPS

  const handleAdd = () => {
    if (!key || !val) return
    addFilter({ key, operator: op || ops[0]!, value: val })
    setKey(''); setOp(''); setVal('')
    setOpen(false)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd()
    if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium',
          'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors',
          className
        )}
      >
        <Plus className="h-3.5 w-3.5" />
        Add filter
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 z-20 w-72 rounded-md border border-border bg-popover shadow-lg p-3 space-y-2">
            {/* Field selector */}
            <select
              value={key}
              onChange={(e) => { setKey(e.target.value); setOp(''); setVal('') }}
              className="w-full rounded-md border border-input bg-transparent px-2.5 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select field…</option>
              {filters.map((f) => (
                <option key={f.key} value={f.key}>{f.label}</option>
              ))}
            </select>

            {/* Operator selector */}
            {key && (
              <select
                value={op || ops[0]}
                onChange={(e) => setOp(e.target.value)}
                className="w-full rounded-md border border-input bg-transparent px-2.5 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {ops.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            )}

            {/* Value input */}
            {key && def?.type === 'select' ? (
              <select
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="w-full rounded-md border border-input bg-transparent px-2.5 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select value…</option>
                {def.options?.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : key ? (
              <input
                type={def?.type === 'number' ? 'number' : def?.type === 'date' ? 'date' : 'text'}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Value…"
                className="w-full rounded-md border border-input bg-transparent px-2.5 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            ) : null}

            <button
              onClick={handleAdd}
              disabled={!key || !val}
              className={cn(
                'w-full rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                'bg-primary text-primary-foreground hover:bg-primary/90',
                'disabled:pointer-events-none disabled:opacity-50'
              )}
            >
              Apply filter
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ── ActiveFiltersList ────────────────────────────────────────────

export interface ActiveFiltersListProps {
  className?: string
}

export function ActiveFiltersList({ className }: ActiveFiltersListProps) {
  const { filters, activeFilters, removeFilter, clearFilters } = useFilters()

  if (activeFilters.length === 0) return null

  return (
    <div
      data-slot="active-filters"
      className={cn('flex flex-wrap items-center gap-1.5', className)}
    >
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <Filter className="h-3 w-3" />
        Filters:
      </span>

      {activeFilters.map((f) => {
        const def = filters.find((fd) => fd.key === f.key)
        return (
          <span
            key={f.id}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground"
          >
            <span className="text-muted-foreground">{def?.label ?? f.key}</span>
            <span className="text-muted-foreground">{f.operator}</span>
            <span className="font-semibold">{f.value}</span>
            <button
              onClick={() => removeFilter(f.id)}
              className="ml-0.5 rounded-full hover:text-destructive transition-colors"
              aria-label={`Remove ${def?.label ?? f.key} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )
      })}

      {activeFilters.length > 1 && (
        <button
          onClick={clearFilters}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  )
}

// ── FiltersBar — convenience composite ──────────────────────────

export function FiltersBar({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <AddFilterButton />
      <ActiveFiltersList />
    </div>
  )
}
