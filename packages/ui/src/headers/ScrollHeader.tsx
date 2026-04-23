'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../utils/cn'

export interface ScrollHeaderProps {
  /** Title shown large when at top, shrinks on scroll */
  title: React.ReactNode
  /** Optional subtitle / description */
  subtitle?: React.ReactNode
  /** Actions slot (right side) — always visible */
  actions?: React.ReactNode
  /** Left slot (e.g. back button) */
  left?: React.ReactNode
  /**
   * Scroll container to watch — defaults to window.
   * Pass a ref to an overflow-auto div for in-page scroll.
   */
  scrollRef?: React.RefObject<HTMLElement>
  /** Scroll offset that triggers the shrink (default 40px) */
  threshold?: number
  /** Whether to show a bottom border when scrolled */
  bordered?: boolean
  /** Sticky positioning (default true) */
  sticky?: boolean
  className?: string
}

/**
 * ScrollHeader — title shrinks + header gains backdrop on scroll.
 * Mirrors reference's `ScrollHeader.tsx` pattern.
 */
export const ScrollHeader = React.forwardRef<HTMLDivElement, ScrollHeaderProps>(
  (
    {
      title,
      subtitle,
      actions,
      left,
      scrollRef,
      threshold = 40,
      bordered = true,
      sticky = true,
      className,
    },
    ref
  ) => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
      const container = scrollRef?.current ?? window

      const handleScroll = () => {
        const scrollY =
          container === window
            ? window.scrollY
            : (container as HTMLElement).scrollTop
        setScrolled(scrollY > threshold)
      }

      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }, [scrollRef, threshold])

    return (
      <div
        ref={ref}
        data-slot="scroll-header"
        data-scrolled={scrolled ? 'true' : 'false'}
        className={cn(
          'z-20 w-full',
          sticky && 'sticky top-0',
          'transition-all duration-200',
          scrolled && 'bg-background/80 backdrop-blur-md',
          bordered && scrolled && 'border-b border-border',
          className
        )}
      >
        <div
          className={cn(
            'flex items-center gap-3 px-4 transition-all duration-200',
            scrolled ? 'h-12' : 'h-16'
          )}
        >
          {left && <div className="shrink-0">{left}</div>}

          <div className="flex-1 min-w-0">
            <div
              className={cn(
                'font-semibold text-foreground truncate transition-all duration-200 leading-tight',
                scrolled ? 'text-sm' : 'text-lg'
              )}
            >
              {title}
            </div>
            {subtitle && !scrolled && (
              <div className="text-xs text-muted-foreground truncate mt-0.5">
                {subtitle}
              </div>
            )}
          </div>

          {actions && (
            <div className="flex items-center gap-2 shrink-0">{actions}</div>
          )}
        </div>
      </div>
    )
  }
)
ScrollHeader.displayName = 'ScrollHeader'
