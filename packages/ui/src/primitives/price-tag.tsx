import React from 'react'
import { cn } from '../utils/cn'

const SIZE = {
  sm: { price: 'text-sm', compare: 'text-xs' },
  md: { price: 'text-lg', compare: 'text-sm' },
  lg: { price: 'text-2xl', compare: 'text-base' },
} as const

export type PriceTagProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Price in minor units (e.g. cents). */
  amount: number
  /** Original/compare-at price in minor units — renders struck-through when greater than `amount`. */
  compareAt?: number
  /** ISO 4217 currency code. Default 'USD'. */
  currency?: string
  /** BCP-47 locale for formatting. Default 'en-US'. */
  locale?: string
  /** Size scale. Default 'md'. */
  size?: keyof typeof SIZE
  /** Show the "−N%" discount pill when on sale. Default true. */
  showDiscount?: boolean
}

function formatMoney(minor: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(minor / 100)
}

/**
 * Formatted currency price with an optional compare-at strikethrough and discount pill.
 * Amounts are minor units (cents) so there's no float drift.
 */
export const PriceTag = React.forwardRef<HTMLSpanElement, PriceTagProps>(
  (
    { amount, compareAt, currency = 'USD', locale = 'en-US', size = 'md', showDiscount = true, className, ...props },
    ref,
  ) => {
    const onSale = compareAt !== undefined && compareAt > amount
    const pct = onSale ? Math.round((1 - amount / compareAt) * 100) : 0
    const s = SIZE[size]
    return (
      <span ref={ref} className={cn('inline-flex items-baseline gap-2 font-sans tabular-nums', className)} {...props}>
        <span className={cn('font-semibold tracking-tight text-foreground', s.price)}>
          {formatMoney(amount, currency, locale)}
        </span>
        {onSale && (
          <>
            <span className={cn('text-muted-foreground line-through', s.compare)}>
              {formatMoney(compareAt, currency, locale)}
            </span>
            {showDiscount && (
              <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                −{pct}%
              </span>
            )}
          </>
        )}
      </span>
    )
  },
)
PriceTag.displayName = 'PriceTag'
