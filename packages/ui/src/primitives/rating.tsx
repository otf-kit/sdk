import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '../utils/cn'

const SIZE = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
} as const

export type RatingProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  /** Controlled value (0..max, supports halves like 3.5). */
  value?: number
  /** Uncontrolled initial value. */
  defaultValue?: number
  /** Fires on user change. */
  onValueChange?: (value: number) => void
  /** Maximum stars. Default 5. */
  max?: number
  /** Star size. Default 'md'. */
  size?: keyof typeof SIZE
  /** Disable interaction (display-only). */
  readOnly?: boolean
  /** Allow 0.5 increments. Default true. */
  allowHalf?: boolean
  /** Override empty-state icon. */
  emptyIcon?: React.ReactNode
  /** Override filled-state icon. */
  filledIcon?: React.ReactNode
  /** Accessible label. Default "Rating". */
  'aria-label'?: string
}

/**
 * Interactive 0..N star rating with half-step support.
 * Keyboard: Arrow Left/Right ±0.5 (±1 if allowHalf=false), Home/End jump to 0/max.
 */
export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value: valueProp,
      defaultValue = 0,
      onValueChange,
      max = 5,
      size = 'md',
      readOnly = false,
      allowHalf = true,
      emptyIcon,
      filledIcon,
      className,
      'aria-label': ariaLabel = 'Rating',
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internal, setInternal] = React.useState(defaultValue)
    const value = isControlled ? (valueProp as number) : internal
    const step = allowHalf ? 0.5 : 1

    const commit = React.useCallback(
      (next: number) => {
        const clamped = Math.max(0, Math.min(max, next))
        if (!isControlled) setInternal(clamped)
        onValueChange?.(clamped)
      },
      [isControlled, max, onValueChange],
    )

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
      if (readOnly) return
      const rect = e.currentTarget.getBoundingClientRect()
      const isLeftHalf = e.clientX - rect.left < rect.width / 2
      const next = allowHalf && isLeftHalf ? index + 0.5 : index + 1
      commit(next)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (readOnly) return
      let next = value
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = value + step
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = value - step
      else if (e.key === 'Home') next = 0
      else if (e.key === 'End') next = max
      else return
      e.preventDefault()
      commit(next)
    }

    return (
      <div
        ref={ref}
        role="slider"
        tabIndex={readOnly ? -1 : 0}
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-readonly={readOnly}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center gap-1 rounded-md outline-none',
          !readOnly &&
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className,
        )}
        {...props}
      >
        {Array.from({ length: max }).map((_, i) => {
          const fillPercent = Math.max(0, Math.min(1, value - i)) * 100
          const Icon = (
            <span className="relative inline-block leading-none">
              <span className={cn('block text-muted-foreground/40', SIZE[size])}>
                {emptyIcon ?? <Star className="h-full w-full" strokeWidth={1.5} />}
              </span>
              <span
                className={cn(
                  'absolute inset-0 overflow-hidden text-[hsl(var(--primary))]',
                  SIZE[size],
                )}
                style={{ width: `${fillPercent}%` }}
                aria-hidden="true"
              >
                {filledIcon ?? (
                  <Star className="h-full w-full fill-current" strokeWidth={1.5} />
                )}
              </span>
            </span>
          )
          if (readOnly) {
            return (
              <span key={i} className={cn('inline-flex')}>
                {Icon}
              </span>
            )
          }
          return (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={(e) => handleClick(e, i)}
              className={cn(
                'inline-flex cursor-pointer rounded-sm transition-transform',
                'hover:scale-110 active:scale-95',
              )}
              aria-label={`Rate ${i + 1} out of ${max}`}
            >
              {Icon}
            </button>
          )
        })}
      </div>
    )
  },
)
Rating.displayName = 'Rating'
