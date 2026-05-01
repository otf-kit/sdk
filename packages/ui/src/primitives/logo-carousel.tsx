'use client'

import React from 'react'
import { cn } from '../utils/cn'

// ── LogoCarousel ─────────────────────────────────────────────────────────────
// Infinite horizontally-scrolling logo strip used on landing pages
// ("trusted by …"). Pure CSS marquee — no IntersectionObserver, no JS rAF —
// so it stays cheap and SSR-safe. Two duplicated tracks animate from 0% to
// -50% to produce a seamless loop.

export interface LogoCarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Logo nodes (text, <img>, <svg>, or any React element). */
  logos: React.ReactNode[]
  /** Travel duration in seconds. Lower = faster. Default 30. */
  duration?: number
  /** Direction of travel. Default 'left'. */
  direction?: 'left' | 'right'
  /** Pause the marquee when hovering. Default true. */
  pauseOnHover?: boolean
  /** Gap between logos (any valid CSS length). Default '3rem'. */
  gap?: string | number
  /** Faded edges so logos enter/exit smoothly. Default true. */
  fadeEdges?: boolean
}

export const LogoCarousel = React.forwardRef<HTMLDivElement, LogoCarouselProps>(
  (
    {
      className,
      logos,
      duration = 30,
      direction = 'left',
      pauseOnHover = true,
      gap = '3rem',
      fadeEdges = true,
      style,
      ...props
    },
    ref,
  ) => {
    const gapValue = typeof gap === 'number' ? `${gap}px` : gap
    const animationName = direction === 'left' ? 'otf-logo-carousel-left' : 'otf-logo-carousel-right'

    return (
      <div
        ref={ref}
        data-slot="logo-carousel"
        className={cn('group relative w-full overflow-hidden', className)}
        style={
          {
            ...(fadeEdges && {
              maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
            }),
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          data-slot="logo-carousel-track"
          className={cn('flex w-max items-center', pauseOnHover && 'group-hover:[animation-play-state:paused]')}
          style={{
            gap: gapValue,
            paddingRight: gapValue,
            animation: `${animationName} ${duration}s linear infinite`,
          }}
        >
          {/* Track 1 */}
          {logos.map((logo, i) => (
            <div
              key={`a-${i}`}
              className="shrink-0 text-[hsl(var(--muted-foreground))] flex items-center"
              data-slot="logo-carousel-item"
            >
              {logo}
            </div>
          ))}
          {/* Track 2 — duplicated for the seamless loop */}
          {logos.map((logo, i) => (
            <div
              key={`b-${i}`}
              className="shrink-0 text-[hsl(var(--muted-foreground))] flex items-center"
              data-slot="logo-carousel-item"
              aria-hidden
            >
              {logo}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes otf-logo-carousel-left {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes otf-logo-carousel-right {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            [data-slot="logo-carousel-track"] { animation: none !important; }
          }
        `}</style>
      </div>
    )
  },
)
LogoCarousel.displayName = 'LogoCarousel'
