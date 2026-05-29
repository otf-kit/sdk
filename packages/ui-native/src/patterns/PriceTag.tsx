import { SizableText, XStack } from 'tamagui'

export type PriceTagProps = {
  /** Price in minor units (e.g. cents). */
  amount: number
  /** Compare-at price in minor units — renders struck-through when greater than `amount`. */
  compareAt?: number
  /** ISO 4217 currency code. Default 'USD'. */
  currency?: string
  /** BCP-47 locale. Default 'en-US'. */
  locale?: string
  size?: 'sm' | 'md' | 'lg'
  /** Show the "−N%" discount pill when on sale. Default true. */
  showDiscount?: boolean
}

const PRICE_SIZE = { sm: '$4', md: '$6', lg: '$8' } as const
const COMPARE_SIZE = { sm: '$2', md: '$3', lg: '$4' } as const

function formatMoney(minor: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(minor / 100)
}

/** Formatted currency price with an optional compare-at strikethrough and discount pill. */
export function PriceTag({
  amount,
  compareAt,
  currency = 'USD',
  locale = 'en-US',
  size = 'md',
  showDiscount = true,
}: PriceTagProps) {
  const onSale = compareAt !== undefined && compareAt > amount
  const pct = onSale ? Math.round((1 - amount / compareAt) * 100) : 0
  return (
    <XStack gap="$2" alignItems="baseline">
      <SizableText size={PRICE_SIZE[size]} fontWeight="700" color="$color12">
        {formatMoney(amount, currency, locale)}
      </SizableText>
      {onSale ? (
        <>
          <SizableText size={COMPARE_SIZE[size]} color="$color8" textDecorationLine="line-through">
            {formatMoney(compareAt, currency, locale)}
          </SizableText>
          {showDiscount ? (
            <XStack backgroundColor="$red3" paddingHorizontal="$2" paddingVertical="$0.5" borderRadius="$10">
              <SizableText size="$1" fontWeight="700" color="$red10">
                −{pct}%
              </SizableText>
            </XStack>
          ) : null}
        </>
      ) : null}
    </XStack>
  )
}
