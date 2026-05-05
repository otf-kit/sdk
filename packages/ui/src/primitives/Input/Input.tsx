import React from 'react'
import { cn } from '../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  wrapperClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, leftIcon, rightIcon, wrapperClassName, id, ...props }, ref) => {
    const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

    if (label || leftIcon || rightIcon || error || hint) {
      return (
        <div data-slot="input-wrapper" className={cn('flex flex-col gap-1.5', wrapperClassName)}>
          {label && (
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-foreground leading-none"
            >
              {label}
            </label>
          )}
          <div className="relative flex items-center">
            {leftIcon && (
              <span
                data-slot="input-left-icon"
                className="absolute left-3 flex items-center justify-center text-muted-foreground pointer-events-none"
              >
                {leftIcon}
              </span>
            )}
            <input
              id={inputId}
              type={type}
              data-slot="input"
              className={cn(
                'flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm font-sans shadow-sm transition-colors',
                'placeholder:text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                error
                  ? 'border-destructive focus-visible:ring-destructive'
                  : 'border-input',
                leftIcon && 'pl-9',
                rightIcon && 'pr-9',
                className
              )}
              ref={ref}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={
                error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
              }
              {...props}
            />
            {rightIcon && (
              <span
                data-slot="input-right-icon"
                className="absolute right-3 flex items-center justify-center text-muted-foreground pointer-events-none"
              >
                {rightIcon}
              </span>
            )}
          </div>
          {error && (
            <p
              id={`${inputId}-error`}
              className="text-xs text-destructive"
              role="alert"
            >
              {error}
            </p>
          )}
          {!error && hint && (
            <p
              id={`${inputId}-hint`}
              className="text-xs text-muted-foreground"
            >
              {hint}
            </p>
          )}
        </div>
      )
    }

    return (
      <input
        id={inputId}
        type={type}
        data-slot="input"
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm font-sans shadow-sm transition-colors',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
