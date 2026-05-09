import { Image, View } from 'react-native'
import {
  YStack,
  XStack,
  H3,
  H4,
  SizableText,
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
 * Designed as a marketing-quality starter — every visible bit is
 * overridable via props, but the defaults stand alone for screenshots
 * and the storybook preview.
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
  backgroundColor = '#fafaf9',
}: StayBrowseScreenProps) {
  return (
    <YStack flex={1} backgroundColor={backgroundColor as never} padding={18} gap={14}>
      <YStack gap={4} marginTop={28}>
        <SizableText size="$2" color="#737373">
          {greeting}
        </SizableText>
        <H3 color="#0a0a0a" size="$7" lineHeight={28}>
          {headline}
        </H3>
      </YStack>

      <XStack gap={8} flexWrap="wrap">
        {categories.map((c) => (
          <View
            key={c.label}
            onTouchEnd={c.onPress}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: c.active ? '#d9f99d' : '#f4f4f5',
            }}
          >
            <SizableText
              size="$2"
              color={c.active ? '#365314' : '#52525b'}
              fontWeight="600"
            >
              {c.label}
            </SizableText>
          </View>
        ))}
      </XStack>

      <YStack
        flex={1}
        borderRadius={20}
        overflow="hidden"
        backgroundColor="#e7e5e4"
        marginTop={4}
      >
        <Image
          source={{ uri: listing.image }}
          style={{ width: '100%', height: '60%' }}
          resizeMode="cover"
        />
        <YStack flex={1} padding={14} gap={8}>
          <XStack alignItems="center" justifyContent="space-between">
            <H4 color="#0a0a0a" size="$5">
              {listing.title}
            </H4>
            <View onTouchEnd={onFavorite}>
              <Heart size={18} color="#ef4444" />
            </View>
          </XStack>
          <XStack alignItems="center" gap={4}>
            <MapPin size={12} color="#737373" />
            <SizableText size="$1" color="#737373">
              {listing.address}
            </SizableText>
          </XStack>
          <XStack gap={14} marginTop={6}>
            {typeof listing.bed === 'number' ? (
              <XStack alignItems="center" gap={4}>
                <Bed size={14} color="#737373" />
                <SizableText size="$1" color="#525252">
                  Bed: {listing.bed}
                </SizableText>
              </XStack>
            ) : null}
            {typeof listing.bath === 'number' ? (
              <XStack alignItems="center" gap={4}>
                <Bath size={14} color="#737373" />
                <SizableText size="$1" color="#525252">
                  Bath: {listing.bath}
                </SizableText>
              </XStack>
            ) : null}
            {typeof listing.rating === 'number' ? (
              <XStack alignItems="center" gap={4}>
                <Star size={14} color="#f59e0b" fill="#f59e0b" />
                <SizableText size="$1" color="#525252">
                  {listing.rating.toFixed(1)}
                </SizableText>
              </XStack>
            ) : null}
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  )
}
