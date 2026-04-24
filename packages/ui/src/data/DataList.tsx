'use client'

import React from 'react'
import { cn } from '../utils/cn'

/**
 * DataList — vertical list of rows with left/right slots.
 * Use for settings rows, notification lists, audit logs, file lists.
 * Pairs with `DataListItem` for each row.
 */

export interface DataListProps extends React.HTMLAttributes<HTMLUListElement> {
  divided?: boolean
  bordered?: boolean
}

export const DataList = React.forwardRef<HTMLUListElement, DataListProps>(
  ({ divided = true, bordered = true, className, ...props }, ref) => (
    <ul
      ref={ref}
      data-slot="data-list"
      className={cn(
        'w-full',
        bordered && 'rounded-lg border border-border bg-card overflow-hidden',
        divided && '[&>li+li]:border-t [&>li+li]:border-border',
        className
      )}
      {...props}
    />
  )
)
DataList.displayName = 'DataList'

export interface DataListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  left?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  right?: React.ReactNode
  interactive?: boolean
  onSelect?: () => void
}

export const DataListItem = React.forwardRef<HTMLLIElement, DataListItemProps>(
  ({ left, title, description, right, interactive, onSelect, className, children, ...props }, ref) => {
    const clickable = interactive || !!onSelect
    return (
      <li
        ref={ref}
        data-slot="data-list-item"
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (clickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onSelect?.()
          }
        }}
        className={cn(
          'flex items-center gap-3 px-4 py-3 text-sm',
          clickable && 'cursor-pointer hover:bg-accent focus-visible:outline-none focus-visible:bg-accent',
          className
        )}
        {...props}
      >
        {left && <span className="shrink-0 flex items-center justify-center text-muted-foreground">{left}</span>}
        {(title || description) && (
          <div className="flex-1 min-w-0">
            {title && <div className="font-medium text-foreground truncate">{title}</div>}
            {description && <div className="text-xs text-muted-foreground truncate mt-0.5">{description}</div>}
          </div>
        )}
        {children}
        {right && <span className="shrink-0 flex items-center gap-2 text-muted-foreground">{right}</span>}
      </li>
    )
  }
)
DataListItem.displayName = 'DataListItem'
