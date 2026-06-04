import { Image } from 'react-native'
import {
  YStack,
  XStack,
  H3,
  H4,
  SizableText,
  Circle,
} from 'tamagui'
import { Bed, Bath, Heart, MapPin, Star } from '@tamagui/lucide-icons'
import type { StayBrowseScreenProps } from './types'

const DEFAULT_CATEGORIES = [
  { label: 'Villa' },
  { label: 'Hotel', active: true },
  { label: 'Apartment' },
  { label: 'Campsite' },
]

/**
 * Premium-feel "find a stay" search screen. Greeting, multi-line
 * headline, horizontal category-chip strip, then a featured listing
 * card with image + meta + favourite icon.
 *
 * Fully theme-driven — adapts to dark/light and the active accent
 * palette automatically. Every visible bit is still overridable via
 * props, but the token defaults stand alone for screenshots and the
 * storybook preview.
 *
 * @example
 * ```tsx
 * <StayBrowseScreen
 *   listing={{
 *     image: 'https://…',
 *     title: 'The Hill Guest House',
 *     address: '58 Hullbrook Road, Billesley',
 *     rating: 4.9,
 *     bed: 2,
 *     bath: 1,
 *   }}
 * />
 * ```
 */
export function StayBrowseScreen({
  greeting = 'Good morning',
  headline = 'Unlock Your\nPerfect Stay Today!',
  categories = DEFAULT_CATEGORIES,
  listing,
  onFavorite,
  backgroundColor = '$background',
}: StayBrowseScreenProps) {
  return (
    <YStack flex={1} backgroundColor={backgroundColor as never} padding={18} gap={16}>
      <YStack gap={4} marginTop={28}>
        <SizableText size="$3" color="$color11" fontWeight="500">
          {greeting}
        </SizableText>
        <H3 color="$color12" size="$8" lineHeight={32} fontWeight="800">
          {headline}
        </H3>
      </YStack>

      <XStack gap={8} flexWrap="wrap">
        {categories.map((c) => (
          <XStack
            key={c.label}
            onPress={c.onPress}
            paddingHorizontal={14}
            paddingVertical={8}
            borderRadius={999}
            borderWidth={1}
            backgroundColor={c.active ? '$color9' : '$color3'}
            borderColor={c.active ? '$color9' : '$color5'}
            animation="quick"
            cursor="pointer"
            pressStyle={{ opacity: 0.85, scale: 0.97 }}
            {...(c.active
              ? {
                  shadowColor: '$color9',
                  shadowOpacity: 0.35,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 2 },
                }
              : {})}
          >
            <SizableText
              size="$2"
              color={c.active ? '$color1' : '$color11'}
              fontWeight="600"
            >
              {c.label}
            </SizableText>
          </XStack>
        ))}
      </XStack>

      <YStack
        flex={1}
        borderRadius={22}
        overflow="hidden"
        backgroundColor="$color2"
        borderWidth={1}
        borderColor="$color4"
        marginTop={4}
        shadowColor="rgba(0,0,0,0.35)"
        shadowOpacity={1}
        shadowRadius={20}
        shadowOffset={{ width: 0, height: 10 }}
      >
        <YStack position="relative">
          <Image
            source={{ uri: listing.image }}
            style={{ width: '100%', height: 230 }}
            resizeMode="cover"
          />
          <Circle
            position="absolute"
            top={12}
            right={12}
            size={40}
            backgroundColor="rgba(0,0,0,0.4)"
            onPress={onFavorite}
            animation="quick"
            cursor="pointer"
            pressStyle={{ scale: 0.9 }}
            alignItems="center"
            justifyContent="center"
          >
            <Heart size={18} color="#ffffff" />
          </Circle>
        </YStack>
        <YStack flex={1} padding={16} gap={8}>
          <XStack alignItems="center" justifyContent="space-between">
            <H4 color="$color12" size="$6" fontWeight="700">
              {listing.title}
            </H4>
            {typeof listing.rating === 'number' ? (
              <XStack alignItems="center" gap={4}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <SizableText size="$2" color="$color12" fontWeight="700">
                  {listing.rating.toFixed(1)}
                </SizableText>
              </XStack>
            ) : null}
          </XStack>
          <XStack alignItems="center" gap={5}>
            <MapPin size={13} color="$color11" />
            <SizableText size="$2" color="$color11">
              {listing.address}
            </SizableText>
          </XStack>
          <XStack gap={16} marginTop={6}>
            {typeof listing.bed === 'number' ? (
              <XStack alignItems="center" gap={5}>
                <Bed size={15} color="$color9" />
                <SizableText size="$2" color="$color11" fontWeight="500">
                  {listing.bed} Bed
                </SizableText>
              </XStack>
            ) : null}
            {typeof listing.bath === 'number' ? (
              <XStack alignItems="center" gap={5}>
                <Bath size={15} color="$color9" />
                <SizableText size="$2" color="$color11" fontWeight="500">
                  {listing.bath} Bath
                </SizableText>
              </XStack>
            ) : null}
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  )
}
