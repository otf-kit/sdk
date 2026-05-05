import React from 'react'
import { cn } from '../utils/cn'

export interface DottedBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dot color (default uses --border token) */
  color?: string
  /** Dot size in px (default 1) */
  dotSize?: number
  /** Gap between dots in px (default 24) */
  gap?: number
  /** Vignette fade at edges */
  vignette?: boolean
  fixed?: boolean
}

export const DottedBackground = React.forwardRef<HTMLDivElement, DottedBackgroundProps>(
  (
    {
      color,
      dotSize = 1,
      gap = 24,
      vignette = true,
      fixed = false,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const dotColor = color ?? 'hsl(var(--border))'

    return (
      <div
        ref={ref}
        data-slot="dotted-background"
        className={cn(
          fixed ? 'fixed inset-0 z-0' : 'absolute inset-0',
          'pointer-events-none overflow-hidden',
          className
        )}
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gap}px ${gap}px`,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      >
        {vignette && (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, hsl(var(--background)) 100%)',
            }}
          />
        )}
        {children}
      </div>
    )
  }
)
DottedBackground.displayName = 'DottedBackground'
