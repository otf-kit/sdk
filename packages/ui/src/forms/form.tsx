import React, { useId } from 'react'
import { FormProvider, Controller, useFormContext, type FieldValues, type ControllerProps, type FieldPath } from 'react-hook-form'
import { cn } from '../utils/cn'

export { FormProvider as Form }

export function FormField<T extends FieldValues, N extends FieldPath<T>>(
  props: ControllerProps<T, N>
) {
  return <Controller {...props} />
}

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5', className)} {...props} />
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, error, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none',
        error ? 'text-[hsl(var(--destructive))]' : 'text-[hsl(var(--foreground))]',
        className
      )}
      {...props}
    />
  )
)
FormLabel.displayName = 'FormLabel'

export const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => {
    const id = useId()
    return <div ref={ref} id={id} {...props} />
  }
)
FormControl.displayName = 'FormControl'

export function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-xs text-[hsl(var(--muted-foreground))]', className)} {...props} />
}

export function FormMessage({ className, children, name }: React.HTMLAttributes<HTMLParagraphElement> & { name?: string }) {
  const { formState } = useFormContext()
  const error = name ? formState.errors[name] : undefined
  const message = error?.message ? String(error.message) : children

  if (!message) return null
  return (
    <p className={cn('text-xs text-[hsl(var(--destructive))]', className)}>{message}</p>
  )
}
