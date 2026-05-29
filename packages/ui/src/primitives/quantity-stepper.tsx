import React from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '../utils/cn'
import { Button } from './button'

export type QuantityStepperProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  /** Controlled quantity. */
  value?: number
  /** Uncontrolled initial quantity. Default 1. */
  defaultValue?: number
  /** Fires with the clamped next quantity. */
  onValueChange?: (value: number) => void
  /** Minimum (decrement disables here). Default 1. */
  min?: number
  /** Maximum (increment disables here). Default 99. */
  max?: number
  /** Increment/decrement step. Default 1. */
  step?: number
  /** Control size. Default 'md'. */
  size?: 'sm' | 'md'
  disabled?: boolean
  'aria-label'?: string
}

/** Increment / decrement quantity control with min/max clamping. */
export const QuantityStepper = React.forwardRef<HTMLDivElement, QuantityStepperProps>(
  (
    {
      value: valueProp,
      defaultValue = 1,
      onValueChange,
      min = 1,
      max = 99,
      step = 1,
      size = 'md',
      disabled = false,
      className,
      'aria-label': ariaLabel = 'Quantity',
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internal, setInternal] = React.useState(defaultValue)
    const value = isControlled ? (valueProp as number) : internal
    const commit = (next: number) => {
      const clamped = Math.max(min, Math.min(max, next))
      if (!isControlled) setInternal(clamped)
      onValueChange?.(clamped)
    }
    const dim = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'
    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        className={cn('inline-flex items-center rounded-md border border-input', className)}
        {...props}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn('rounded-r-none', dim)}
          disabled={disabled || value <= min}
          onClick={() => commit(value - step)}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span
          aria-live="polite"
          className={cn('select-none text-center text-sm font-medium tabular-nums', size === 'sm' ? 'min-w-7' : 'min-w-8')}
        >
          {value}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn('rounded-l-none', dim)}
          disabled={disabled || value >= max}
          onClick={() => commit(value + step)}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    )
  },
)
QuantityStepper.displayName = 'QuantityStepper'
