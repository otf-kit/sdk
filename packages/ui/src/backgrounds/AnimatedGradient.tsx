'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '../utils/cn'

export interface AnimatedGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gradient color stops — at least 2 required */
  colors?: string[]
  /** Speed multiplier (default 1) */
  speed?: number
  /** Animation style */
  variant?: 'mesh' | 'shift' | 'pulse'
  /** Whether to blur the gradient blobs (mesh only) */
  blur?: boolean
}

const DEFAULT_COLORS = [
  'hsl(239 84% 67% / 0.35)',
  'hsl(280 100% 70% / 0.25)',
  'hsl(217 33% 17% / 0.4)',
]

/**
 * AnimatedGradient — CSS-animation-based ambient background.
 * Three variants:
 *  - mesh: 3 drifting radial blobs (most visual impact)
 *  - shift: linear-gradient that shifts position
 *  - pulse: radial that breathes in/out
 *
 * No JS animation loop — all CSS, zero RAF overhead.
 */
export const AnimatedGradient = React.forwardRef<HTMLDivElement, AnimatedGradientProps>(
  (
    {
      colors = DEFAULT_COLORS,
      speed = 1,
      variant = 'mesh',
      blur = true,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const idRef = useRef(`ag-${Math.random().toString(36).slice(2, 7)}`)
    const id = idRef.current

    const [c0 = DEFAULT_COLORS[0], c1 = DEFAULT_COLORS[1], c2 = DEFAULT_COLORS[2]] = colors

    const duration0 = (12 / speed).toFixed(1)
    const duration1 = (18 / speed).toFixed(1)
    const duration2 = (24 / speed).toFixed(1)

    if (variant === 'shift') {
      return (
        <div
          ref={ref}
          data-slot="animated-gradient"
          className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
          style={{
            background: `linear-gradient(135deg, ${colors.join(', ')})`,
            backgroundSize: '300% 300%',
            animation: `gradient-shift ${(8 / speed).toFixed(1)}s ease infinite`,
            ...style,
          }}
          aria-hidden="true"
          {...props}
        >
          {children}
        </div>
      )
    }

    if (variant === 'pulse') {
      return (
        <div
          ref={ref}
          data-slot="animated-gradient"
          className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${c0} 0%, transparent 70%)`,
            animation: `gradient-pulse ${(6 / speed).toFixed(1)}s ease-in-out infinite`,
            ...style,
          }}
          aria-hidden="true"
          {...props}
        >
          {children}
        </div>
      )
    }

    // variant === 'mesh'
    return (
      <div
        ref={ref}
        data-slot="animated-gradient"
        className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
        style={style}
        aria-hidden="true"
        {...props}
      >
        {/* Blob 0 */}
        <div
          style={{
            position: 'absolute',
            width: '60%',
            height: '60%',
            top: '-10%',
            left: '20%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${c0} 0%, transparent 70%)`,
            filter: blur ? 'blur(40px)' : 'none',
            animation: `blob-float-0 ${duration0}s ease-in-out infinite`,
          }}
        />
        {/* Blob 1 */}
        <div
          style={{
            position: 'absolute',
            width: '50%',
            height: '50%',
            bottom: '-5%',
            right: '-5%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${c1} 0%, transparent 70%)`,
            filter: blur ? 'blur(50px)' : 'none',
            animation: `blob-float-1 ${duration1}s ease-in-out infinite`,
          }}
        />
        {/* Blob 2 */}
        <div
          style={{
            position: 'absolute',
            width: '40%',
            height: '40%',
            bottom: '10%',
            left: '-5%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${c2} 0%, transparent 70%)`,
            filter: blur ? 'blur(40px)' : 'none',
            animation: `blob-float-2 ${duration2}s ease-in-out infinite`,
          }}
        />
        {children}
      </div>
    )
  }
)
AnimatedGradient.displayName = 'AnimatedGradient'
