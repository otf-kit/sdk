import type { ReactNode } from 'react'
import { SizableText, Theme, XStack, YStack } from 'tamagui'
import { MapPin } from '@tamagui/lucide-icons'

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

// Participant avatars — initials in accent circles with stacked overlap
function ParticipantDots({ count, max }: { count: number; max?: number }) {
  const shown = Math.min(count, 5)
  return (
    <XStack alignItems="center" gap="$1.5">
      <XStack>
        {Array.from({ length: shown }, (_, i) => (
          <YStack
            key={i}
            width={24}
            height={24}
            borderRadius={12}
            backgroundColor="$color9"
            borderWidth={2}
            borderColor="$color1"
            marginLeft={i > 0 ? -10 : 0}
            alignItems="center"
            justifyContent="center"
          >
            <SizableText size="$1" color="$color1" fontWeight="800">
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
      backgroundColor="$color2"
      borderRadius="$5"
      padding="$4"
      gap="$3"
      borderWidth={1}
      borderColor="$color4"
      onPress={onPress}
      animation="quick"
      pressStyle={onPress ? { scale: 0.97, opacity: 0.9 } : undefined}
      cursor={onPress ? 'pointer' : undefined}
      shadowColor="rgba(0,0,0,0.18)"
      shadowRadius={8}
      shadowOffset={{ width: 0, height: 4 }}
    >
      <XStack justifyContent="space-between" alignItems="flex-start" gap="$2">
        <YStack flex={1} gap="$0.5">
          <SizableText size="$6" fontWeight="700" color="$color12">{title}</SizableText>
          {subtitle && <SizableText size="$3" color="$color11">{subtitle}</SizableText>}
        </YStack>
        {time && (
          <YStack
            backgroundColor="$color9"
            paddingHorizontal="$2.5"
            paddingVertical="$1.5"
            borderRadius="$4"
            flexShrink={0}
          >
            <SizableText size="$2" fontWeight="700" color="$color1">{time}</SizableText>
          </YStack>
        )}
      </XStack>

      <XStack gap="$4" alignItems="center" flexWrap="wrap">
        {location && (
          <XStack gap="$1.5" alignItems="center">
            <MapPin size={14} color="$color9" />
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
            <XStack
              backgroundColor="$color3"
              paddingHorizontal="$2.5"
              paddingVertical="$1"
              borderRadius="$10"
              borderWidth={1}
              borderColor="$color5"
            >
              <SizableText size="$2" fontWeight="600" color="$color12">{label}</SizableText>
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
