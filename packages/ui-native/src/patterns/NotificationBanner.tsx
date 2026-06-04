import { type ReactNode } from 'react'
import { SizableText, View, XStack, YStack } from 'tamagui'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from '@tamagui/lucide-icons'

export type NotificationBannerProps = {
  title: string
  message?: string
  variant?: 'info' | 'success' | 'warning' | 'error'
  onPress?: () => void
  onDismiss?: () => void
  /** Override the default per-variant Lucide icon. Pass `null` to hide it. */
  icon?: ReactNode
}

const VARIANTS = {
  info: { bg: '$blue3', text: '$blue11', bar: '$blue9', Icon: Info },
  success: { bg: '$green3', text: '$green11', bar: '$green9', Icon: CheckCircle2 },
  warning: { bg: '$yellow3', text: '$yellow11', bar: '$yellow9', Icon: AlertTriangle },
  error: { bg: '$red3', text: '$red11', bar: '$red9', Icon: XCircle },
} as const

/**
 * Inline banner with a leading accent bar, a default per-variant Lucide icon
 * (overridable, or `null` to hide), title/message, and a Lucide-X dismiss.
 * (Previously had no accent bar, no default icon, and a unicode ✕ dismiss.)
 */
export function NotificationBanner({
  title,
  message,
  variant = 'info',
  onPress,
  onDismiss,
  icon,
}: NotificationBannerProps) {
  const v = VARIANTS[variant]
  const DefaultIcon = v.Icon
  const leading = icon === undefined ? <DefaultIcon size={18} color={v.bar} /> : icon

  return (
    <XStack
      backgroundColor={v.bg}
      paddingVertical="$3"
      paddingRight="$3"
      borderRadius="$4"
      gap="$3"
      alignItems="flex-start"
      overflow="hidden"
      onPress={onPress}
      pressStyle={onPress ? { opacity: 0.85 } : undefined}
    >
      {/* Leading accent bar — the premium banner signal. */}
      <View position="absolute" top={0} bottom={0} left={0} width={3} backgroundColor={v.bar} />

      {leading ? <YStack paddingLeft="$3" paddingTop="$0.5">{leading}</YStack> : <View paddingLeft="$3" />}
      <YStack flex={1} gap="$1">
        <SizableText size="$4" fontWeight="600" color={v.text}>
          {title}
        </SizableText>
        {message && (
          <SizableText size="$3" color={v.text} opacity={0.8}>
            {message}
          </SizableText>
        )}
      </YStack>
      {onDismiss && (
        <View
          onPress={onDismiss}
          pressStyle={{ opacity: 0.6 }}
          cursor="pointer"
          padding="$1"
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={8}
        >
          <X size={16} color={v.text} />
        </View>
      )}
    </XStack>
  )
}
