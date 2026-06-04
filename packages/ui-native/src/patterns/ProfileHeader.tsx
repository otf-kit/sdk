import { Circle, Image, SizableText, XStack, YStack } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import type { ReactNode } from 'react'

export type ProfileHeaderProps = {
  name: string
  subtitle?: string
  avatar?: string
  /**
   * Optional full-bleed cover photo (R2/CDN URL). When set, the header renders
   * a hero-image band with the avatar overlapping its bottom edge — Instagram /
   * LinkedIn style. Ignored when unset; falls back to the flat centered layout.
   */
  coverImage?: string
  stats?: { label: string; value: string }[]
  actions?: ReactNode
}

export function ProfileHeader({ name, subtitle, avatar, coverImage, stats, actions }: ProfileHeaderProps) {
  if (coverImage) {
    return (
      <YStack>
        {/* Cover band */}
        <YStack height={160} overflow="hidden" borderRadius="$4" borderBottomLeftRadius={0} borderBottomRightRadius={0}>
          <Image source={{ uri: coverImage }} width="100%" height="100%" objectFit="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.55)']}
            start={[0, 0.4]}
            end={[0, 1]}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
          />
        </YStack>
        {/* Avatar overlapping the cover */}
        <YStack
          paddingHorizontal="$4"
          paddingBottom="$4"
          backgroundColor="$color1"
          borderRadius="$4"
          borderTopLeftRadius={0}
          borderTopRightRadius={0}
          borderWidth={1}
          borderTopWidth={0}
          borderColor="$color4"
          gap="$3"
        >
          <XStack justifyContent="space-between" alignItems="flex-end">
            <YStack marginTop={-40}>
              <Circle
                size={80}
                backgroundColor="$color4"
                overflow="hidden"
                borderWidth={3}
                borderColor="$color1"
                shadowColor="rgba(0,0,0,0.4)"
                shadowRadius={12}
                shadowOffset={{ width: 0, height: 6 }}
              >
                {avatar ? (
                  <Image source={{ uri: avatar }} width={80} height={80} objectFit="cover" />
                ) : (
                  <SizableText size="$9" fontWeight="700" color="$color11">
                    {name[0]?.toUpperCase() ?? '?'}
                  </SizableText>
                )}
              </Circle>
            </YStack>
            {actions && <XStack paddingBottom="$1">{actions}</XStack>}
          </XStack>
          <YStack gap="$0.5">
            <SizableText size="$7" fontWeight="700">{name}</SizableText>
            {subtitle && <SizableText size="$4" color="$color11">{subtitle}</SizableText>}
          </YStack>
          {stats && stats.length > 0 && (
            <XStack gap="$6">
              {stats.map((stat, i) => (
                <YStack key={i} alignItems="center" gap="$0.5">
                  <SizableText size="$6" fontWeight="700">{stat.value}</SizableText>
                  <SizableText size="$2" color="$color11">{stat.label}</SizableText>
                </YStack>
              ))}
            </XStack>
          )}
        </YStack>
      </YStack>
    )
  }

  // Flat centered layout (no cover photo)
  return (
    <YStack
      alignItems="center"
      gap="$4"
      paddingVertical="$6"
      paddingHorizontal="$4"
      backgroundColor="$color1"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$color4"
    >
      <Circle
        size={80}
        backgroundColor="$color4"
        overflow="hidden"
        borderWidth={2}
        borderColor="$color6"
        shadowColor="rgba(0,0,0,0.25)"
        shadowRadius={10}
        shadowOffset={{ width: 0, height: 4 }}
      >
        {avatar ? (
          <Image source={{ uri: avatar }} width={80} height={80} objectFit="cover" />
        ) : (
          <SizableText size="$9" fontWeight="700" color="$color11">
            {name[0]?.toUpperCase() ?? '?'}
          </SizableText>
        )}
      </Circle>
      <YStack alignItems="center" gap="$1">
        <SizableText size="$7" fontWeight="700">{name}</SizableText>
        {subtitle && <SizableText size="$4" color="$color11">{subtitle}</SizableText>}
      </YStack>
      {stats && stats.length > 0 && (
        <XStack gap="$6">
          {stats.map((stat, i) => (
            <YStack key={i} alignItems="center" gap="$1">
              <SizableText size="$6" fontWeight="700">{stat.value}</SizableText>
              <SizableText size="$2" color="$color11">{stat.label}</SizableText>
            </YStack>
          ))}
        </XStack>
      )}
      {actions}
    </YStack>
  )
}
