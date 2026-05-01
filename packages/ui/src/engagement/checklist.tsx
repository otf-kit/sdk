'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../utils/cn'

// ── Checklist ────────────────────────────────────────────────────────────────
// Linear/Vercel/Stripe-style onboarding checklist. Compound API:
//
//   <Checklist title="Getting started" onComplete={() => setOpen(false)}>
//     <ChecklistItem id="invite"  title="Invite teammates" />
//     <ChecklistItem id="connect" title="Connect your repo" />
//     <ChecklistItem id="deploy"  title="Deploy to production" action={<Button>Deploy</Button>} />
//   </Checklist>
//
// Items can be controlled (pass `completed`) or uncontrolled (use the context's
// `setCompleted`). The header shows "{done} of {total}" + a progress bar that
// snaps to 100% when every item is done. Collapsible by default.

interface ChecklistContextValue {
  completed: Record<string, boolean>
  setCompleted: (id: string, value: boolean) => void
  total: number
  doneCount: number
}

const ChecklistContext = createContext<ChecklistContextValue | null>(null)

function useChecklist() {
  const ctx = useContext(ChecklistContext)
  if (!ctx) throw new Error('<ChecklistItem> must be used inside <Checklist>')
  return ctx
}

export interface ChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header title. */
  title?: string
  /** Optional subtitle / description. */
  description?: string
  /** Controlled map of itemId → completed. If omitted, state is internal. */
  completed?: Record<string, boolean>
  /** Called when an item's completion changes. */
  onItemChange?: (id: string, completed: boolean) => void
  /** Fired the first time every item flips to completed. */
  onComplete?: () => void
  /** Whether the body is collapsible. Default true. */
  collapsible?: boolean
  /** Initial open state (uncontrolled). Default true. */
  defaultOpen?: boolean
  /** Hide the progress bar. Default false. */
  hideProgress?: boolean
}

export const Checklist = React.forwardRef<HTMLDivElement, ChecklistProps>(
  (
    {
      title = 'Getting started',
      description,
      completed: controlledCompleted,
      onItemChange,
      onComplete,
      collapsible = true,
      defaultOpen = true,
      hideProgress = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalCompleted, setInternalCompleted] = useState<Record<string, boolean>>({})
    const [open, setOpen] = useState(defaultOpen)
    const completedFiredRef = React.useRef(false)

    const isControlled = controlledCompleted !== undefined
    const completed = isControlled ? controlledCompleted! : internalCompleted

    const setCompleted = useCallback(
      (id: string, value: boolean) => {
        if (!isControlled) setInternalCompleted((prev) => ({ ...prev, [id]: value }))
        onItemChange?.(id, value)
      },
      [isControlled, onItemChange],
    )

    // Count items by walking children once
    const total = useMemo(() => {
      let n = 0
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && (child.type as React.ComponentType).displayName === 'ChecklistItem') {
          n++
        }
      })
      return n
    }, [children])

    const doneCount = useMemo(
      () => Object.values(completed).filter(Boolean).length,
      [completed],
    )

    React.useEffect(() => {
      if (!completedFiredRef.current && total > 0 && doneCount >= total) {
        completedFiredRef.current = true
        onComplete?.()
      }
      if (doneCount < total) completedFiredRef.current = false
    }, [doneCount, total, onComplete])

    const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100)
    const ctx: ChecklistContextValue = { completed, setCompleted, total, doneCount }

    return (
      <ChecklistContext.Provider value={ctx}>
        <div
          ref={ref}
          data-slot="checklist"
          data-state={open ? 'open' : 'closed'}
          className={cn(
            'rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] overflow-hidden',
            className,
          )}
          {...props}
        >
          {/* Header */}
          <div
            className={cn(
              'flex items-start gap-3 p-4',
              collapsible && 'cursor-pointer select-none',
            )}
            onClick={collapsible ? () => setOpen((o) => !o) : undefined}
            role={collapsible ? 'button' : undefined}
            aria-expanded={collapsible ? open : undefined}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
                <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono shrink-0 tabular-nums">
                  {doneCount} of {total}
                </span>
              </div>
              {description && (
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">{description}</p>
              )}
              {!hideProgress && (
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[hsl(var(--muted))]">
                  <div
                    className="h-full bg-[hsl(var(--primary))] transition-[width] duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              )}
            </div>
            {collapsible && (
              <span className="shrink-0 text-[hsl(var(--muted-foreground))] mt-0.5">
                {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </span>
            )}
          </div>

          {/* Body */}
          {open && (
            <div className="border-t border-[hsl(var(--border))] divide-y divide-[hsl(var(--border))]">
              {children}
            </div>
          )}
        </div>
      </ChecklistContext.Provider>
    )
  },
)
Checklist.displayName = 'Checklist'

export interface ChecklistItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onClick'> {
  /** Stable id used to track completion. */
  id: string
  /** Item title (required). */
  title: string
  /** Optional description shown under the title. */
  description?: string
  /** Render a CTA on the right (e.g. <Button>Connect</Button>). */
  action?: React.ReactNode
  /** Click handler for the entire row (excluding the action slot). */
  onActivate?: () => void
}

export const ChecklistItem = React.forwardRef<HTMLDivElement, ChecklistItemProps>(
  ({ id, title, description, action, onActivate, className, ...props }, ref) => {
    const { completed, setCompleted } = useChecklist()
    const done = !!completed[id]

    const toggle = useCallback(() => {
      setCompleted(id, !done)
    }, [id, done, setCompleted])

    return (
      <div
        ref={ref}
        data-slot="checklist-item"
        data-state={done ? 'completed' : 'pending'}
        className={cn(
          'flex items-start gap-3 px-4 py-3 transition-colors',
          done && 'bg-[hsl(var(--muted)/0.4)]',
          (onActivate || action) && 'group',
          className,
        )}
        {...props}
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={done ? `Mark ${title} as not done` : `Mark ${title} as done`}
          aria-pressed={done}
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]',
            done
              ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
              : 'border-[hsl(var(--border))] bg-[hsl(var(--background))] hover:border-[hsl(var(--primary)/0.5)]',
          )}
        >
          {done && <Check className="h-3 w-3" strokeWidth={3} />}
        </button>

        <div
          className={cn('flex-1 min-w-0', onActivate && !done && 'cursor-pointer')}
          onClick={onActivate && !done ? onActivate : undefined}
          role={onActivate && !done ? 'button' : undefined}
        >
          <p
            className={cn(
              'text-sm font-medium leading-tight transition-colors',
              done ? 'text-[hsl(var(--muted-foreground))] line-through' : 'text-[hsl(var(--foreground))]',
            )}
          >
            {title}
          </p>
          {description && (
            <p
              className={cn(
                'text-xs mt-1 leading-relaxed',
                done ? 'text-[hsl(var(--muted-foreground)/0.7)]' : 'text-[hsl(var(--muted-foreground))]',
              )}
            >
              {description}
            </p>
          )}
        </div>

        {action && !done && (
          <div className="shrink-0 self-center" onClick={(e) => e.stopPropagation()}>
            {action}
          </div>
        )}
      </div>
    )
  },
)
ChecklistItem.displayName = 'ChecklistItem'
