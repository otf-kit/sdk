'use client'

import React from 'react'
import { X } from 'lucide-react'
import { cn } from '../utils/cn'

// ── Types ────────────────────────────────────────────────────────

export interface ActionBarAction {
  id: string
  label: string
  icon?: React.ReactNode
  /** default 'default' */
  variant?: 'default' | 'destructive'
  onClick: () => void
  disabled?: boolean
}

export interface ActionBarProps {
  /** Number of selected items. Bar is hidden when count === 0 */
  count: number
  actions: ActionBarAction[]
  /** Called when the X / clear button is clicked */
  onClear: () => void
  /** Label shown beside the count. Defaults to "selected" */
  countLabel?: string
  className?: string
}

// ── ActionBar ─────────────────────────────────────────────────────

/**
 * Floating bulk-action bar anchored to the bottom-center of the viewport.
 * Renders nothing when count === 0.
 *
 * @example
 * <ActionBar
 *   count={selectedRows.length}
 *   actions={[
 *     { id: 'delete', label: 'Delete', icon: <Trash2 />, variant: 'destructive', onClick: handleDelete },
 *     { id: 'export', label: 'Export', icon: <Download />, onClick: handleExport },
 *   ]}
 *   onClear={() => setSelectedRows([])}
 * />
 */
export function ActionBar({
  count,
  actions,
  onClear,
  countLabel = 'selected',
  className,
}: ActionBarProps) {
  if (count === 0) return null

  return (
    <div
      data-slot="action-bar"
      role="toolbar"
      aria-label="Bulk actions"
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
        'inline-flex items-center gap-2',
        'rounded-full border border-border bg-card shadow-lg',
        'px-4 py-2',
        // enter animation
        'animate-in fade-in slide-in-from-bottom-2 duration-200',
        className
      )}
    >
      {/* Count badge */}
      <span className="text-sm font-medium text-foreground pr-3 border-r border-border whitespace-nowrap">
        {count} {countLabel}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            disabled={action.disabled}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:pointer-events-none disabled:opacity-50',
              action.variant === 'destructive'
                ? 'text-destructive hover:bg-destructive/10'
                : 'text-foreground hover:bg-accent'
            )}
          >
            {action.icon && (
              <span className="h-3.5 w-3.5 shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5">
                {action.icon}
              </span>
            )}
            {action.label}
          </button>
        ))}
      </div>

      {/* Clear */}
      <button
        onClick={onClear}
        aria-label="Clear selection"
        className={cn(
          'ml-1 rounded-full p-1',
          'text-muted-foreground hover:text-foreground hover:bg-accent',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
