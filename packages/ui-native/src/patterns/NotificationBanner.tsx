import { type ReactNode } from 'react'
import { SizableText, XStack, YStack } from 'tamagui'

export type NotificationBannerProps = {
  title: string; message?: string; variant?: 'info' | 'success' | 'warning' | 'error'
  onPress?: () => void; onDismiss?: () => void; icon?: ReactNode
}

const variantColors = {
  info: { bg: '$blue3', text: '$blue11' }, success: { bg: '$green3', text: '$green11' },
  warning: { bg: '$yellow3', text: '$yellow11' }, error: { bg: '$red3', text: '$red11' },
}

export function NotificationBanner({ title, message, variant = 'info', onPress, onDismiss, icon }: NotificationBannerProps) {
  const colors = variantColors[variant]
  return (
    <XStack backgroundColor={colors.bg} padding="$3" borderRadius="$4" gap="$3" alignItems="flex-start"
      onPress={onPress} pressStyle={onPress ? { opacity: 0.8 } : undefined}>
      {icon && <YStack paddingTop="$0.5">{icon}</YStack>}
      <YStack flex={1} gap="$1">
        <SizableText size="$4" fontWeight="600" color={colors.text}>{title}</SizableText>
        {message && <SizableText size="$3" color={colors.text} opacity={0.8}>{message}</SizableText>}
      </YStack>
      {onDismiss && <SizableText size="$3" color={colors.text} opacity={0.6} onPress={onDismiss} padding="$1">{'\u2715'}</SizableText>}
    </XStack>
  )
}
