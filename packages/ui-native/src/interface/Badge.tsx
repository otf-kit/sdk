import { SizableText, View } from 'tamagui'
import type { ReactNode } from 'react'

// Each variant carries a matched bg / text / hairline triplet so a success
// badge reads green-on-green, error red-on-red, etc. (Previously every variant
// used $color11 text regardless of background — a green badge had grey text.)
const VARIANTS = {
  default: { bg: '$color3', text: '$color11', border: '$color6' },
  success: { bg: '$green3', text: '$green11', border: '$green6' },
  warning: { bg: '$yellow3', text: '$yellow11', border: '$yellow6' },
  error: { bg: '$red3', text: '$red11', border: '$red6' },
  info: { bg: '$blue3', text: '$blue11', border: '$blue6' },
} as const

export type BadgeProps = {
  children: ReactNode
  variant?: keyof typeof VARIANTS
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const v = VARIANTS[variant]
  return (
    <View
      paddingHorizontal="$2"
      paddingVertical="$1"
      borderRadius="$10"
      backgroundColor={v.bg}
      borderWidth={1}
      borderColor={v.border}
      alignSelf="flex-start"
    >
      <SizableText size="$2" fontWeight="600" color={v.text} letterSpacing={0.2}>
        {children}
      </SizableText>
    </View>
  )
}
