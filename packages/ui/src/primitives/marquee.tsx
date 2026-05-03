import React from 'react'
import { cn } from '../utils/cn'

// Inject keyframes once at module load. Browsers dedupe by id; SSR-safe.
if (typeof document !== 'undefined' && !document.getElementById('otf-marquee-keyframes')) {
  const style = document.createElement('style')
  style.id = 'otf-marquee-keyframes'
  style.textContent = `
    @keyframes otf-marquee-x { from { transform: translateX(0); } to { transform: translateX(-100%); } }
  `
  document.head.appendChild(style)
}

const SPEED_DURATION = {
  slow: '60s',
  normal: '40s',
  fast: '20s',
} as const

export type MarqueeProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Children rendered inside the scrolling track. Cloned once internally for a seamless loop. */
  children: React.ReactNode
  /** Animation speed. */
  speed?: keyof typeof SPEED_DURATION
  /** Scroll direction. */
  direction?: 'left' | 'right'
  /** Pause animation on hover. */
  pauseOnHover?: boolean
  /** Soft fade mask at left + right edges. */
  fade?: boolean
  /** Gap between items, e.g. 'gap-4', 'gap-8'. Default 'gap-8'. */
  gap?: string
}

/**
 * Infinite-scroll row of children. Pure CSS keyframes (no JS animation loop).
 * Honors `prefers-reduced-motion` automatically.
 */
export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      children,
      speed = 'normal',
      direction = 'left',
      pauseOnHover = true,
      fade = true,
      gap = 'gap-8',
      className,
      ...props
    },
    ref,
  ) => {
    const trackClass = cn(
      'flex shrink-0 items-center pr-8',
      gap,
      'motion-safe:[animation:otf-marquee-x_var(--otf-marquee-duration)_linear_infinite]',
      'motion-reduce:animate-none',
      direction === 'right' && 'motion-safe:[animation-direction:reverse]',
      pauseOnHover && 'motion-safe:group-hover:[animation-play-state:paused]',
    )
    const trackStyle = { ['--otf-marquee-duration' as string]: SPEED_DURATION[speed] }

    return (
      <div
        ref={ref}
        className={cn(
          'group relative flex w-full overflow-hidden',
          fade &&
            '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
          className,
        )}
        {...props}
      >
        <div className={trackClass} style={trackStyle}>
          {children}
        </div>
        <div className={trackClass} style={trackStyle} aria-hidden="true">
          {children}
        </div>
      </div>
    )
  },
)
Marquee.displayName = 'Marquee'
