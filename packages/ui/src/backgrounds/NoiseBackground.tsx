import React from 'react'
import { cn } from '../utils/cn'

export interface NoiseBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Noise opacity 0–1 (default 0.04) */
  opacity?: number
  /** Noise grain size — maps to SVG baseFrequency (default 0.65) */
  frequency?: number
  fixed?: boolean
}

export const NoiseBackground = React.forwardRef<HTMLDivElement, NoiseBackgroundProps>(
  (
    {
      opacity = 0.04,
      frequency = 0.65,
      fixed = false,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const svgNoise = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${frequency}' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

    return (
      <div
        ref={ref}
        data-slot="noise-background"
        className={cn(
          fixed ? 'fixed inset-0 z-0' : 'absolute inset-0',
          'pointer-events-none overflow-hidden',
          className
        )}
        style={{
          backgroundImage: svgNoise,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      >
        {children}
      </div>
    )
  }
)
NoiseBackground.displayName = 'NoiseBackground'
