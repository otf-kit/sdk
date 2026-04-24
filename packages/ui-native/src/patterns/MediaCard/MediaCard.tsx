import { Image, SizableText, XStack, YStack } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

export type MediaCardProps = {
  image: string; title: string; subtitle?: string
  overlay?: 'gradient' | 'dark' | 'none'; aspectRatio?: number
  onPress?: () => void; badge?: string
}

export function MediaCard({ image, title, subtitle, overlay = 'gradient', aspectRatio = 16 / 9, onPress, badge }: MediaCardProps) {
  return (
    <YStack borderRadius="$4" overflow="hidden" onPress={onPress}
      pressStyle={onPress ? { scale: 0.98, opacity: 0.9 } : undefined} animation="quick">
      <YStack aspectRatio={aspectRatio}>
        <Image source={{ uri: image }} width="100%" height="100%" objectFit="cover" />
        {overlay === 'gradient' && (
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} start={[0, 0]} end={[0, 1]}
            position="absolute" bottom={0} left={0} right={0} height="60%" />
        )}
        {overlay === 'dark' && <YStack position="absolute" fullscreen backgroundColor="rgba(0,0,0,0.4)" />}
        {badge && (
          <XStack position="absolute" top="$2" right="$2" backgroundColor="$color9"
            paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
            <SizableText size="$1" fontWeight="600" color="$color1">{badge}</SizableText>
          </XStack>
        )}
        <YStack position="absolute" bottom={0} left={0} right={0} padding="$3" gap="$1">
          <SizableText size="$5" fontWeight="600" color="white">{title}</SizableText>
          {subtitle && <SizableText size="$3" color="rgba(255,255,255,0.8)">{subtitle}</SizableText>}
        </YStack>
      </YStack>
    </YStack>
  )
}
