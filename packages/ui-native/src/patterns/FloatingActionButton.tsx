import { type ReactNode } from 'react'
import { SizableText, XStack } from 'tamagui'

export type FABProps = {
  icon?: ReactNode; label?: string; onPress: () => void
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left'; size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 44, md: 56, lg: 68 }
const positionStyles = {
  'bottom-right': { right: 20 },
  'bottom-center': { left: '50%', marginLeft: -28 },
  'bottom-left': { left: 20 },
}

export function FloatingActionButton({ icon, label, onPress, position = 'bottom-right', size = 'md' }: FABProps) {
  const dim = sizes[size]
  return (
    <XStack position="absolute" bottom={32} {...positionStyles[position] as any}
      height={dim} minWidth={dim} borderRadius={label ? '$6' : '$10'}
      backgroundColor="$color9" alignItems="center" justifyContent="center" gap="$2"
      paddingHorizontal={label ? '$4' : 0} elevation={4}
      pressStyle={{ scale: 0.95, opacity: 0.9 }} onPress={onPress}>
      {icon && <SizableText color="$color1">{icon}</SizableText>}
      {label && <SizableText color="$color1" size="$4" fontWeight="600">{label}</SizableText>}
    </XStack>
  )
}
