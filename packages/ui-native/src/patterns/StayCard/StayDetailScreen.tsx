import type { ReactNode } from 'react'
import { Image, View } from 'react-native'
import { YStack, XStack, H3, SizableText } from 'tamagui'
import { Bed, Bath, Star, Wifi } from '@tamagui/lucide-icons'
import type { StayDetailMetric, StayDetailScreenProps } from './types'

const formatPrice = (n: number) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })

const buildDefaultMetrics = (props: StayDetailScreenProps): StayDetailMetric[] => {
  const out: StayDetailMetric[] = []
  if (typeof props.listing.sqft === 'number') {
    out.push({
      label: 'Living',
      value: `${props.listing.sqft} sqft`,
    })
  } else if (typeof props.listing.bed === 'number') {
    out.push({
      label: 'Beds',
      icon: <Bed size={14} color="#fafaf9" />,
      value: props.listing.bed,
    })
  }
  if (typeof props.listing.bath === 'number') {
    out.push({
      label: 'Baths',
      icon: <Bath size={14} color="#fafaf9" />,
      value: props.listing.bath,
    })
  }
  out.push({
    label: 'Wifi',
    icon: <Wifi size={14} color="#fafaf9" />,
    value: 'Fast',
  })
  return out
}

/**
 * Premium booking-detail screen. Hero image, rating chip overlay,
 * eyebrow + price + owner subtitle, then a metrics row and a chunky
 * accent-tinted CTA pinned to the bottom.
 *
 * Pairs naturally with `<StayBrowseScreen>`.
 *
 * @example
 * ```tsx
 * <StayDetailScreen
 *   listing={{
 *     image: 'https://…',
 *     title: 'The Hill Guest House',
 *     address: '58 Hullbrook Road, Billesley',
 *     rating: 4.9,
 *     pricePerNight: 250,
 *     ownerName: "Harry Konigsberg's",
 *     sqft: 29,
 *     bed: 2,
 *   }}
 *   onReserve={() => router.push('/checkout')}
 * />
 * ```
 */
export function StayDetailScreen(props: StayDetailScreenProps) {
  const {
    listing,
    metrics,
    eyebrow = 'BOOKING DETAILS',
    ctaLabel = 'Reserve now',
    onReserve,
    backgroundColor = '#0a0a0a',
    ctaColor = '#f97316',
  } = props

  const resolvedMetrics: StayDetailMetric[] =
    metrics ?? buildDefaultMetrics(props)

  return (
    <YStack flex={1} backgroundColor={backgroundColor as never}>
      <View style={{ position: 'relative', height: '50%' }}>
        <Image
          source={{ uri: listing.image }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        {typeof listing.rating === 'number' ? (
          <View
            style={{
              position: 'absolute',
              top: 36,
              right: 18,
              backgroundColor: 'rgba(255,255,255,0.92)',
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Star size={12} color="#f59e0b" fill="#f59e0b" />
            <SizableText size="$1" color="#0a0a0a" fontWeight="700">
              {listing.rating.toFixed(1)}
            </SizableText>
          </View>
        ) : null}
      </View>

      <YStack flex={1} padding={18} gap={10}>
        <SizableText size="$2" color="#a3a3a3">
          {eyebrow}
        </SizableText>
        {typeof listing.pricePerNight === 'number' ? (
          <H3 color="#fafaf9" size="$7">
            {formatPrice(listing.pricePerNight)}/night
          </H3>
        ) : (
          <H3 color="#fafaf9" size="$7">
            {listing.title}
          </H3>
        )}
        <SizableText size="$2" color="#a3a3a3">
          {listing.ownerName ? listing.ownerName + ' · ' : ''}
          {listing.address}
        </SizableText>

        <XStack gap={20} marginTop={6}>
          {resolvedMetrics.map((m, i) => (
            <YStack key={i} gap={2}>
              <SizableText size="$1" color="#737373">
                {m.label}
              </SizableText>
              {m.icon ? (
                <XStack alignItems="center" gap={4}>
                  {m.icon as ReactNode}
                  <SizableText size="$3" color="#fafaf9" fontWeight="600">
                    {m.value as ReactNode}
                  </SizableText>
                </XStack>
              ) : (
                <SizableText size="$3" color="#fafaf9" fontWeight="600">
                  {m.value as ReactNode}
                </SizableText>
              )}
            </YStack>
          ))}
        </XStack>

        <YStack
          marginTop="auto"
          padding={14}
          borderRadius={14}
          backgroundColor={ctaColor as never}
          alignItems="center"
          onPress={onReserve}
        >
          <SizableText size="$3" color="#fff" fontWeight="700">
            {ctaLabel}
          </SizableText>
        </YStack>
      </YStack>
    </YStack>
  )
}
