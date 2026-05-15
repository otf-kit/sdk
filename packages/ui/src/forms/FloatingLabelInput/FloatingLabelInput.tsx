'use client'

import React, { useState, useId } from 'react'
import { cn } from '../../utils/cn'

/**
 * FloatingLabelInput — input where the label sits inside the field at rest
 * and floats up + shrinks when the field is focused OR contains text. Cross-
 * platform parity with @otfdashkit/ui-native's FloatingLabelInput.
 *
 * Reference (visual spec): https://www.grepped.ai/animations/components-ui/floating-label
 *
 * Forms pattern, not a primitive — pairs with Form, Field, AutoForm helpers.
 */

export interface FloatingLabelInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  /** Label that floats up when focused or filled. */
  label:    string
  /** Inline error text shown below the input. */
  error?:   string
  /** Helper text shown below the input when there's no error. */
  hint?:    string
  /** Wrap the field + label + helper text in this className for layout. */
  wrapperClassName?: string
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, error, hint, wrapperClassName, className, id, value, defaultValue, onFocus, onBlur, onChange, ...props }, ref) => {
    const autoId   = useId()
    const inputId  = id ?? autoId
    const errorId  = error ? `${inputId}-error` : undefined
    const hintId   = hint  ? `${inputId}-hint`  : undefined
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

    // "Filled" tracks whether the field has any user-visible content. We
    // compute it from the initial defaultValue / value, then update on every
    // change so the label floats correctly even before focus.
    const [focused, setFocused] = useState(false)
    const [filled,  setFilled]  = useState(() => {
      if (value !== undefined && value !== null && value !== '') return true
      if (defaultValue !== undefined && defaultValue !== null && defaultValue !== '') return true
      return false
    })

    const isFloated = focused || filled

    return (
      <div data-slot="floating-label-input" className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            value={value}
            defaultValue={defaultValue}
            data-slot="input"
            data-state={isFloated ? 'floated' : 'rest'}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={describedBy}
            onFocus={(e) => { setFocused(true);  onFocus?.(e) }}
            onBlur ={(e) => { setFocused(false); onBlur?.(e)  }}
            onChange={(e) => { setFilled(e.target.value.length > 0); onChange?.(e) }}
            className={cn(
              // Reset + structure
              'peer w-full appearance-none bg-transparent',
              'h-14 rounded-md border px-3 pt-5 pb-1.5',
              'text-base text-foreground leading-tight',
              // Border / focus ring colors
              'border-input focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/30',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'placeholder:text-transparent', // hide native placeholder; label takes its job
              className,
            )}
            {...props}
          />

          <label
            htmlFor={inputId}
            className={cn(
              'pointer-events-none absolute left-3',
              'origin-[0_50%] transition-all duration-150 ease-out',
              'text-muted-foreground',
              // Rest: centered vertically inside the field, full size
              !isFloated && 'top-1/2 -translate-y-1/2 text-base',
              // Floated: tucked into the top with a small subtle background
              isFloated  && 'top-1.5 text-[11px] uppercase tracking-wider text-foreground/85',
              error && 'text-destructive',
            )}
          >
            {label}
          </label>
        </div>

        {error ? (
          <p id={errorId} className="text-xs text-destructive">{error}</p>
        ) : hint ? (
          <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    )
  },
)
FloatingLabelInput.displayName = 'FloatingLabelInput'
