import React from 'react'
import { cn } from '../utils/cn'

export type GradientBackgroundPreset =
  | 'slate'    // deep indigo mesh
  | 'warm'     // warm purple/pink
  | 'cosmic'   // deep violet/magenta
  | 'terminal' // near-black mono
  | 'aurora'   // cyan/indigo/violet
  | 'subtle'   // barely-there tint for light mode
  | 'custom'

export interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Full-screen fixed backdrop */
  fixed?: boolean
  preset?: GradientBackgroundPreset
  /** Custom gradient CSS string e.g. "radial-gradient(...)" — only when preset='custom' */
  gradient?: string
  /** Additional noise/texture overlay (subtle grain) */
  noise?: boolean
  /** Radial spot blend on top */
  radial?: boolean
}

const presetStyles: Record<GradientBackgroundPreset, React.CSSProperties> = {
  slate: {
    background:
      'radial-gradient(ellipse 80% 60% at 50% -10%, hsl(239 84% 67% / 0.2) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, hsl(217 33% 17% / 0.6) 0%, transparent 60%), hsl(222 47% 7%)',
  },
  warm: {
    background:
      'radial-gradient(ellipse 80% 60% at 50% -10%, hsl(262 83% 68% / 0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, hsl(20 14% 14% / 0.8) 0%, transparent 60%), hsl(20 14% 7%)',
  },
  cosmic: {
    background:
      'radial-gradient(ellipse 70% 50% at 50% -10%, hsl(280 100% 70% / 0.3) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 80% 80%, hsl(260 60% 12% / 0.9) 0%, transparent 60%), hsl(270 50% 4%)',
  },
  terminal: {
    background:
      'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(0 0% 15% / 0.8) 0%, transparent 60%), hsl(0 0% 4%)',
  },
  aurora: {
    background:
      'radial-gradient(ellipse 60% 40% at 20% 20%, hsl(193 100% 50% / 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 80%, hsl(265 89% 66% / 0.2) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 50% 50%, hsl(226 71% 40% / 0.1) 0%, transparent 70%), hsl(222 47% 5%)',
  },
  subtle: {
    background:
      'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--primary) / 0.06) 0%, transparent 60%), hsl(var(--background))',
  },
  custom: {},
}

export const GradientBackground = React.forwardRef<HTMLDivElement, GradientBackgroundProps>(
  (
    {
      fixed = false,
      preset = 'slate',
      gradient,
      noise = false,
      radial = false,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const bgStyle: React.CSSProperties =
      preset === 'custom' && gradient
        ? { background: gradient }
        : presetStyles[preset]

    return (
      <div
        ref={ref}
        data-slot="gradient-background"
        className={cn(
          fixed ? 'fixed inset-0 z-0' : 'absolute inset-0',
          'pointer-events-none overflow-hidden',
          className
        )}
        style={{ ...bgStyle, ...style }}
        aria-hidden="true"
        {...props}
      >
        {/* Noise texture overlay */}
        {noise && (
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
            }}
          />
        )}
        {/* Radial center glow */}
        {radial && (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 30% at 50% 0%, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
            }}
          />
        )}
        {children}
      </div>
    )
  }
)
GradientBackground.displayName = 'GradientBackground'
