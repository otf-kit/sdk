'use client'

import React from 'react'
import { cn } from '../utils/cn'

/**
 * GridList — fluid responsive grid using CSS grid auto-fill + minmax.
 * Columns reflow automatically based on `minItemWidth`; no breakpoints.
 * Per OTF UX rule: never hard-code fixed-breakpoint columns.
 */

export interface GridListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Minimum width per item (px). Columns fill to that, then reflow. */
  minItemWidth?: number
  /** Gap between items in rem (default 1 = 16px) */
  gap?: number
}

export const GridList = React.forwardRef<HTMLUListElement, GridListProps>(
  ({ minItemWidth = 240, gap = 1, className, style, ...props }, ref) => (
    <ul
      ref={ref}
      data-slot="grid-list"
      className={cn('grid list-none p-0 m-0', className)}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${minItemWidth}px), 1fr))`,
        gap: `${gap}rem`,
        ...style,
      }}
      {...props}
    />
  )
)
GridList.displayName = 'GridList'

export interface GridListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  interactive?: boolean
  onSelect?: () => void
}

export const GridListItem = React.forwardRef<HTMLLIElement, GridListItemProps>(
  ({ interactive, onSelect, className, ...props }, ref) => {
    const clickable = interactive || !!onSelect
    return (
      <li
        ref={ref}
        data-slot="grid-list-item"
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
          'rounded-lg border border-border bg-card p-4 transition-colors',
          clickable && 'cursor-pointer hover:bg-accent hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className
        )}
        {...props}
      />
    )
  }
)
GridListItem.displayName = 'GridListItem'
