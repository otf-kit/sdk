import React from 'react'
import { cn } from '../utils/cn'

export type VariantOption = {
  value: string
  label: string
  /** Optional color swatch — a CSS color from your product data (not a design token). */
  swatch?: string
  disabled?: boolean
}

export type VariantPickerProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  /** Group label, e.g. "Grind" or "Size". */
  label?: string
  options: VariantOption[]
  /** Controlled selected value. */
  value?: string
  /** Uncontrolled initial value. */
  defaultValue?: string
  onValueChange?: (value: string) => void
}

/** Single-select product-option picker (grind, size, color) with selected + out-of-stock states. */
export const VariantPicker = React.forwardRef<HTMLDivElement, VariantPickerProps>(
  ({ label, options, value: valueProp, defaultValue, onValueChange, className, ...props }, ref) => {
    const isControlled = valueProp !== undefined
    const [internal, setInternal] = React.useState(defaultValue)
    const value = isControlled ? valueProp : internal
    const select = (v: string) => {
      if (!isControlled) setInternal(v)
      onValueChange?.(v)
    }
    return (
      <div ref={ref} role="radiogroup" aria-label={label} className={cn('flex flex-col gap-2', className)} {...props}>
        {label && (
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
        )}
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const selected = value === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={opt.disabled}
                onClick={() => select(opt.value)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  selected
                    ? 'border-primary bg-primary/10 text-[hsl(var(--primary))]'
                    : 'border-border hover:bg-accent hover:text-accent-foreground',
                  opt.disabled && 'cursor-not-allowed text-muted-foreground line-through opacity-50',
                )}
              >
                {opt.swatch && (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 rounded-full border border-border"
                    style={{ backgroundColor: opt.swatch }}
                  />
                )}
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>
    )
  },
)
VariantPicker.displayName = 'VariantPicker'
