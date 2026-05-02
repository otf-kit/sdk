import { Circle, Image, SizableText, XStack, YStack } from 'tamagui'
import type { ReactNode } from 'react'

export type ProfileHeaderProps = {
  name: string
  subtitle?: string
  avatar?: string
  stats?: { label: string; value: string }[]
  actions?: ReactNode
}

export function ProfileHeader({ name, subtitle, avatar, stats, actions }: ProfileHeaderProps) {
  return (
    <YStack alignItems="center" gap="$4" paddingVertical="$6" paddingHorizontal="$4">
      <Circle size={80} backgroundColor="$color4" overflow="hidden">
        {avatar ? (
          <Image source={{ uri: avatar }} width={80} height={80} objectFit="cover" />
        ) : (
          <SizableText size="$9" fontWeight="700" color="$color11">
            {name[0]?.toUpperCase() ?? '?'}
          </SizableText>
        )}
      </Circle>
      <YStack alignItems="center" gap="$1">
        <SizableText size="$7" fontWeight="700">
          {name}
        </SizableText>
        {subtitle && (
          <SizableText size="$4" color="$color10">
            {subtitle}
          </SizableText>
        )}
      </YStack>
      {stats && stats.length > 0 && (
        <XStack gap="$6">
          {stats.map((stat, i) => (
            <YStack key={i} alignItems="center" gap="$1">
              <SizableText size="$6" fontWeight="700">
                {stat.value}
              </SizableText>
              <SizableText size="$2" color="$color9">
                {stat.label}
              </SizableText>
            </YStack>
          ))}
        </XStack>
      )}
      {actions}
    </YStack>
  )
}
