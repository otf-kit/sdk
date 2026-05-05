import React from 'react'
import { cn } from '../utils/cn'

export interface FieldProps {
  label?: string
  description?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function Field({ label, description, error, required, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      {children}
      {description && !error && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </div>
  )
}

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-sm font-medium leading-none text-[hsl(var(--foreground))]', className)}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-[hsl(var(--destructive))]">*</span>}
    </label>
  )
)
FieldLabel.displayName = 'FieldLabel'

export const FieldDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-xs text-[hsl(var(--muted-foreground))]', className)}
      {...props}
    />
  )
)
FieldDescription.displayName = 'FieldDescription'

export const FieldError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-xs text-[hsl(var(--destructive))]', className)}
      {...props}
    />
  )
)
FieldError.displayName = 'FieldError'
