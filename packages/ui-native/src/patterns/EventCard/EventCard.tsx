import type { ReactNode } from 'react'
import { SizableText, Theme, XStack, YStack } from 'tamagui'

export type EventCardProps = {
  title: string
  subtitle?: string
  time?: string
  location?: string
  label?: string
  participants?: number
  maxParticipants?: number
  theme?: 'purple' | 'green' | 'blue' | 'orange' | 'red' | 'pink'
  onPress?: () => void
  actions?: ReactNode
}

const THEME_MAP = {
  purple: 'purple',
  green: 'green',
  blue: 'blue',
  orange: 'orange',
  red: 'red',
  pink: 'pink',
} as const

function ParticipantDots({ count, max }: { count: number; max?: number }) {
  const dots = Math.min(count, 5)
  return (
    <XStack alignItems="center" gap="$1.5">
      <XStack>
        {Array.from({ length: dots }, (_, i) => (
          <YStack key={i} width={22} height={22} borderRadius={11} backgroundColor="$color7"
            borderWidth={2} borderColor="$color4" marginLeft={i > 0 ? -8 : 0}
            alignItems="center" justifyContent="center">
            <SizableText size="$1" color="$color1" fontWeight="700">
              {String.fromCharCode(65 + i)}
            </SizableText>
          </YStack>
        ))}
      </XStack>
      <SizableText size="$2" color="$color11" fontWeight="500">
        {count}{max ? `/${max}` : ''}
      </SizableText>
    </XStack>
  )
}

function CardInner({ title, subtitle, time, location, label, participants, maxParticipants, onPress, actions }: Omit<EventCardProps, 'theme'>) {
  return (
    <YStack
      backgroundColor="$color4" borderRadius="$5" padding="$4" gap="$3"
      borderWidth={1} borderColor="$color7"
      onPress={onPress} animation="quick"
      pressStyle={onPress ? { scale: 0.97, opacity: 0.9 } : undefined}
      cursor={onPress ? 'pointer' : undefined}
    >
      <XStack justifyContent="space-between" alignItems="flex-start">
        <YStack flex={1} gap="$1">
          <SizableText size="$6" fontWeight="700" color="$color12">{title}</SizableText>
          {subtitle && <SizableText size="$3" color="$color11" opacity={0.8}>{subtitle}</SizableText>}
        </YStack>
        {time && (
          <YStack backgroundColor="$color6" paddingHorizontal="$2.5" paddingVertical="$1.5" borderRadius="$3">
            <SizableText size="$2" fontWeight="600" color="$color12">{time}</SizableText>
          </YStack>
        )}
      </XStack>

      <XStack gap="$4" alignItems="center" flexWrap="wrap">
        {location && (
          <XStack gap="$1.5" alignItems="center">
            <SizableText size="$3">📍</SizableText>
            <SizableText size="$3" color="$color11">{location}</SizableText>
          </XStack>
        )}
        {participants !== undefined && (
          <ParticipantDots count={participants} max={maxParticipants} />
        )}
      </XStack>

      {(label || actions) && (
        <XStack justifyContent="space-between" alignItems="center">
          {label ? (
            <XStack backgroundColor="$color6" paddingHorizontal="$2.5" paddingVertical="$1" borderRadius="$10">
              <SizableText size="$2" fontWeight="600" color="$color11">{label}</SizableText>
            </XStack>
          ) : <YStack />}
          {actions}
        </XStack>
      )}
    </YStack>
  )
}

export function EventCard({ theme = 'purple', ...props }: EventCardProps) {
  return (
    <Theme name={THEME_MAP[theme]}>
      <CardInner {...props} />
    </Theme>
  )
}
