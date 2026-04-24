import { styled, SizableText, XStack, YStack, View } from 'tamagui'
import type { ReactNode } from 'react'

const ListItemFrame = styled(XStack, {
  name: 'OtfListItem',
  alignItems: 'center',
  gap: '$3',
  padding: '$3',
  borderRadius: '$3',

  variants: {
    pressable: {
      true: {
        cursor: 'pointer',
        hoverStyle: { backgroundColor: '$color2' },
        pressStyle: { backgroundColor: '$color3', opacity: 0.9 },
      },
    },
  } as const,
})

export type ListItemProps = {
  icon?: ReactNode
  title: string
  subtitle?: string
  right?: ReactNode
  onPress?: () => void
}

export function ListItem({ icon, title, subtitle, right, onPress }: ListItemProps) {
  return (
    <ListItemFrame pressable={!!onPress} onPress={onPress}>
      {icon && <View>{icon}</View>}
      <YStack flex={1} gap="$1">
        <SizableText size="$4" fontWeight="500" color="$color12">{title}</SizableText>
        {subtitle && <SizableText size="$2" color="$color9">{subtitle}</SizableText>}
      </YStack>
      {right}
    </ListItemFrame>
  )
}
