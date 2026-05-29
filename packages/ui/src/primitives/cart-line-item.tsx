import React from 'react'
import { X } from 'lucide-react'
import { cn } from '../utils/cn'
import { Button } from './button'
import { PriceTag } from './price-tag'
import { QuantityStepper } from './quantity-stepper'

export type CartLineItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  /** Product thumbnail URL. */
  image?: string
  title: string
  /** Variant summary line, e.g. "Whole bean · 250g". */
  variant?: string
  /** Unit price in minor units (cents). */
  price: number
  /** Optional compare-at unit price in minor units. */
  compareAt?: number
  currency?: string
  quantity: number
  onQuantityChange?: (qty: number) => void
  onRemove?: () => void
  minQuantity?: number
  maxQuantity?: number
}

/** Cart row: thumbnail · title · variant · price · quantity stepper · remove. */
export const CartLineItem = React.forwardRef<HTMLDivElement, CartLineItemProps>(
  (
    {
      image,
      title,
      variant,
      price,
      compareAt,
      currency = 'USD',
      quantity,
      onQuantityChange,
      onRemove,
      minQuantity = 1,
      maxQuantity = 99,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-4 rounded-lg border border-border bg-card p-3', className)}
        {...props}
      >
        {image && <img src={image} alt="" className="h-16 w-16 flex-none rounded-md object-cover" />}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate font-medium text-card-foreground">{title}</span>
          {variant && <span className="truncate text-sm text-muted-foreground">{variant}</span>}
          <PriceTag amount={price} compareAt={compareAt} currency={currency} size="sm" />
        </div>
        <QuantityStepper
          value={quantity}
          min={minQuantity}
          max={maxQuantity}
          onValueChange={onQuantityChange}
          size="sm"
        />
        {onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
            aria-label={`Remove ${title}`}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  },
)
CartLineItem.displayName = 'CartLineItem'
