import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { cn } from '../utils/cn'
import { Button } from './button'

export type EmptyCartProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
  /** CTA label — renders a button only when `onAction` is also provided. */
  actionLabel?: string
  onAction?: () => void
  /** Override the default cart icon. */
  icon?: React.ReactNode
}

/** Bespoke empty-cart state: soft icon chip, message, and a continue-shopping CTA. */
export const EmptyCart = React.forwardRef<HTMLDivElement, EmptyCartProps>(
  (
    {
      title = 'Your cart is empty',
      description = 'Browse the catalog and add something you love.',
      actionLabel = 'Continue shopping',
      onAction,
      icon,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center gap-4 px-6 py-12 text-center', className)}
        {...props}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
          {icon ?? <ShoppingCart className="h-6 w-6" strokeWidth={1.5} />}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold text-foreground">{title}</span>
          {description && <span className="max-w-xs text-sm text-muted-foreground">{description}</span>}
        </div>
        {actionLabel && onAction && (
          <Button onClick={onAction} className="mt-1">
            {actionLabel}
          </Button>
        )}
      </div>
    )
  },
)
EmptyCart.displayName = 'EmptyCart'
