'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '../utils/cn'

export interface SidebarResizerProps {
  /** Min width in px */
  min?: number
  /** Max width in px */
  max?: number
  /** Default width in px */
  defaultWidth?: number
  /** localStorage key for persisting width */
  storageKey?: string
  /** Called when width changes */
  onWidthChange?: (width: number) => void
  /** CSS class for the resize handle */
  className?: string
}

/**
 * Sidebar drag-to-resize handle. Place as a sibling or absolute child on the trailing edge of the sidebar.
 * Uses pointer capture for smooth dragging.
 */
export function SidebarResizer({
  min = 180,
  max = 400,
  defaultWidth = 220,
  storageKey = 'sidebar-width',
  onWidthChange,
  className,
}: SidebarResizerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const startWidth = useRef(defaultWidth)

  // Read persisted width on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const w = Math.min(max, Math.max(min, Number(stored)))
        onWidthChange?.(w)
        startWidth.current = w
      }
    } catch { /* noop */ }
  }, [storageKey, min, max, onWidthChange])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      setIsDragging(true)
      startX.current = e.clientX
      // Read current sidebar width from the parent
      const sidebar = e.currentTarget.closest('[data-slot="sidebar"]')
      if (sidebar) {
        startWidth.current = sidebar.getBoundingClientRect().width
      }
    },
    []
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return
      const delta = e.clientX - startX.current
      const newWidth = Math.min(max, Math.max(min, startWidth.current + delta))
      const sidebar = e.currentTarget.closest('[data-slot="sidebar"]') as HTMLElement | null
      if (sidebar) {
        sidebar.style.width = `${newWidth}px`
      }
      onWidthChange?.(newWidth)
    },
    [isDragging, min, max, onWidthChange]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return
      setIsDragging(false)
      e.currentTarget.releasePointerCapture(e.pointerId)
      // Persist final width
      const sidebar = e.currentTarget.closest('[data-slot="sidebar"]') as HTMLElement | null
      if (sidebar) {
        const finalWidth = sidebar.getBoundingClientRect().width
        try { localStorage.setItem(storageKey, String(Math.round(finalWidth))) } catch { /* noop */ }
      }
    },
    [isDragging, storageKey]
  )

  return (
    <div
      data-slot="sidebar-resizer"
      data-dragging={isDragging || undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={cn(
        'absolute top-0 right-0 z-20 h-full w-1 cursor-col-resize',
        'hover:bg-primary/20 transition-colors',
        isDragging && 'bg-primary/30',
        className
      )}
    />
  )
}
