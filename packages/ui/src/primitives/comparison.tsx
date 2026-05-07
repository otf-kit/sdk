import React from 'react'
import { GripVertical } from 'lucide-react'
import { cn } from '../utils/cn'

export type ComparisonProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Image URL shown on the LEFT (or TOP for vertical). */
  before: string
  /** Image URL shown on the RIGHT (or BOTTOM). */
  after: string
  beforeAlt?: string
  afterAlt?: string
  /** Initial split position 0..100. Default 50. */
  defaultValue?: number
  /** Controlled split position. */
  value?: number
  onValueChange?: (value: number) => void
  /** Slider orientation. Default 'horizontal'. */
  orientation?: 'horizontal' | 'vertical'
  /** Optional captions rendered as small badges in the corners. */
  beforeLabel?: string
  afterLabel?: string
}

/**
 * Before / after image slider. Drag the handle to reveal one image over the other.
 * Pure CSS clip-path — no re-render on drag (just a CSS variable update).
 */
export const Comparison = React.forwardRef<HTMLDivElement, ComparisonProps>(
  (
    {
      before,
      after,
      beforeAlt = 'Before',
      afterAlt = 'After',
      defaultValue = 50,
      value: valueProp,
      onValueChange,
      orientation = 'horizontal',
      beforeLabel,
      afterLabel,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internal, setInternal] = React.useState(defaultValue)
    const value = Math.max(0, Math.min(100, isControlled ? (valueProp as number) : internal))
    const containerRef = React.useRef<HTMLDivElement>(null)

    const commit = React.useCallback(
      (next: number) => {
        const clamped = Math.max(0, Math.min(100, next))
        if (!isControlled) setInternal(clamped)
        onValueChange?.(clamped)
      },
      [isControlled, onValueChange],
    )

    const updateFromPointer = React.useCallback(
      (clientX: number, clientY: number) => {
        const el = containerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const pct =
          orientation === 'horizontal'
            ? ((clientX - rect.left) / rect.width) * 100
            : ((clientY - rect.top) / rect.height) * 100
        commit(pct)
      },
      [orientation, commit],
    )

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      const target = e.currentTarget
      target.setPointerCapture(e.pointerId)
      updateFromPointer(e.clientX, e.clientY)
    }
    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons !== 1) return
      updateFromPointer(e.clientX, e.clientY)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const step = e.shiftKey ? 10 : 1
      if (orientation === 'horizontal') {
        if (e.key === 'ArrowLeft') commit(value - step)
        else if (e.key === 'ArrowRight') commit(value + step)
        else return
      } else {
        if (e.key === 'ArrowUp') commit(value - step)
        else if (e.key === 'ArrowDown') commit(value + step)
        else return
      }
      e.preventDefault()
    }

    const horizontal = orientation === 'horizontal'

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        role="slider"
        aria-orientation={orientation}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        aria-label="Before / after comparison"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
        className={cn(
          'relative isolate select-none overflow-hidden rounded-lg border border-border bg-card outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'cursor-ew-resize',
          !horizontal && 'cursor-ns-resize',
          className,
        )}
        {...props}
      >
        <img
          src={before}
          alt={beforeAlt}
          className="block h-full w-full object-cover"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            clipPath: horizontal
              ? `inset(0 0 0 ${value}%)`
              : `inset(${value}% 0 0 0)`,
          }}
        >
          <img
            src={after}
            alt={afterAlt}
            className="block h-full w-full object-cover"
            draggable={false}
          />
        </div>
        {/* Divider line + handle */}
        <div
          className={cn(
            'pointer-events-none absolute bg-background shadow-[0_0_0_1px_hsl(var(--border))]',
            horizontal ? 'top-0 h-full w-0.5' : 'left-0 h-0.5 w-full',
          )}
          style={
            horizontal
              ? { left: `calc(${value}% - 1px)` }
              : { top: `calc(${value}% - 1px)` }
          }
        >
          <div
            className={cn(
              'absolute flex items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md',
              horizontal
                ? 'left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2'
                : 'left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rotate-90',
            )}
          >
            <GripVertical className="h-4 w-4" strokeWidth={2} />
          </div>
        </div>
        {beforeLabel && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-md border border-border bg-background/80 px-2 py-1 font-mono text-xs uppercase tracking-wide text-foreground backdrop-blur">
            {beforeLabel}
          </span>
        )}
        {afterLabel && (
          <span className="pointer-events-none absolute right-3 top-3 rounded-md border border-border bg-background/80 px-2 py-1 font-mono text-xs uppercase tracking-wide text-foreground backdrop-blur">
            {afterLabel}
          </span>
        )}
      </div>
    )
  },
)
Comparison.displayName = 'Comparison'
