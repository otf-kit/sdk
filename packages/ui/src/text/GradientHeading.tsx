import React from 'react'
import { cn } from '../utils/cn'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type GradientPreset =
  | 'primary'      // primary → primary/60
  | 'slate'        // indigo → violet
  | 'warm'         // violet → pink
  | 'cosmic'       // magenta → violet → blue
  | 'terminal'     // white → muted (mono)
  | 'aurora'       // cyan → indigo → violet
  | 'sunset'       // orange → rose → purple
  | 'custom'       // use `from` / `via` / `to` props

export interface GradientHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel
  preset?: GradientPreset
  /** Tailwind gradient `from-` color class e.g. "from-indigo-400" */
  from?: string
  /** Tailwind gradient `via-` color class (optional) */
  via?: string
  /** Tailwind gradient `to-` color class e.g. "to-violet-400" */
  to?: string
  /** Direction — default 'br' (bottom-right) */
  direction?: 'r' | 'br' | 'b' | 'bl' | 'l'
  /** Whether to animate the gradient position */
  animate?: boolean
}

const presetClasses: Record<GradientPreset, string> = {
  primary:  'from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.6)]',
  slate:    'from-indigo-400 to-violet-400',
  warm:     'from-violet-400 via-purple-400 to-pink-400',
  cosmic:   'from-fuchsia-400 via-violet-400 to-indigo-400',
  terminal: 'from-white to-white/60',
  aurora:   'from-cyan-400 via-indigo-400 to-violet-500',
  sunset:   'from-orange-400 via-rose-400 to-purple-500',
  custom:   '',
}

const directionClasses: Record<NonNullable<GradientHeadingProps['direction']>, string> = {
  r:  'bg-gradient-to-r',
  br: 'bg-gradient-to-br',
  b:  'bg-gradient-to-b',
  bl: 'bg-gradient-to-bl',
  l:  'bg-gradient-to-l',
}

export const GradientHeading = React.forwardRef<HTMLHeadingElement, GradientHeadingProps>(
  (
    {
      as: Tag = 'h2',
      preset = 'primary',
      from,
      via,
      to,
      direction = 'br',
      animate = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const gradientColors =
      preset === 'custom'
        ? cn(from, via, to)
        : presetClasses[preset]

    return (
      <Tag
        ref={ref}
        data-slot="gradient-heading"
        className={cn(
          directionClasses[direction],
          gradientColors,
          'bg-clip-text text-transparent',
          'font-heading font-semibold tracking-tight',
          animate && 'bg-[length:200%_200%] animate-gradient-shift',
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)
GradientHeading.displayName = 'GradientHeading'
