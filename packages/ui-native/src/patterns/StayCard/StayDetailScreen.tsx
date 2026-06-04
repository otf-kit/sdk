import type { ReactNode } from 'react'
import { Image, View } from 'react-native'
import { YStack, XStack, H3, SizableText } from 'tamagui'
import { Bed, Bath, Star, Wifi } from '@tamagui/lucide-icons'
import { Button } from '../../primitives/Button'
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
      icon: <Bed size={15} color="$color9" />,
      value: props.listing.bed,
    })
  }
  if (typeof props.listing.bath === 'number') {
    out.push({
      label: 'Baths',
      icon: <Bath size={15} color="$color9" />,
      value: props.listing.bath,
    })
  }
  out.push({
    label: 'Wifi',
    icon: <Wifi size={15} color="$color9" />,
    value: 'Fast',
  })
  return out
}

/**
 * Premium booking-detail screen. Hero image, rating chip overlay,
 * eyebrow + price + owner subtitle, then a metrics row and a chunky
 * accent-tinted CTA pinned to the bottom.
 *
 * Fully theme-driven — adapts to dark/light and the active accent
 * palette. Pairs naturally with `<StayBrowseScreen>`.
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
    backgroundColor = '$background',
    ctaColor,
  } = props

  const resolvedMetrics: StayDetailMetric[] =
    metrics ?? buildDefaultMetrics(props)

  return (
    <YStack flex={1} backgroundColor={backgroundColor as never}>
      <View style={{ position: 'relative', height: '46%' }}>
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
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <SizableText size="$1" color="#0a0a0a" fontWeight="700">
              {listing.rating.toFixed(1)}
            </SizableText>
          </View>
        ) : null}
      </View>

      <YStack
        flex={1}
        padding={20}
        gap={10}
        marginTop={-24}
        borderTopLeftRadius={28}
        borderTopRightRadius={28}
        backgroundColor="$background"
      >
        <SizableText size="$2" color="$color11" fontWeight="600" letterSpacing={1}>
          {eyebrow}
        </SizableText>
        {typeof listing.pricePerNight === 'number' ? (
          <XStack alignItems="baseline" gap={4}>
            <H3 color="$color12" size="$9" fontWeight="800">
              {formatPrice(listing.pricePerNight)}
            </H3>
            <SizableText size="$4" color="$color11" fontWeight="500">
              / night
            </SizableText>
          </XStack>
        ) : (
          <H3 color="$color12" size="$8" fontWeight="800">
            {listing.title}
          </H3>
        )}
        <SizableText size="$3" color="$color11">
          {listing.ownerName ? listing.ownerName + ' · ' : ''}
          {listing.address}
        </SizableText>

        <XStack gap={24} marginTop={10}>
          {resolvedMetrics.map((m, i) => (
            <YStack key={i} gap={3}>
              <SizableText size="$1" color="$color11" textTransform="uppercase" letterSpacing={0.5}>
                {m.label}
              </SizableText>
              {m.icon ? (
                <XStack alignItems="center" gap={5}>
                  {m.icon as ReactNode}
                  <SizableText size="$4" color="$color12" fontWeight="700">
                    {m.value as ReactNode}
                  </SizableText>
                </XStack>
              ) : (
                <SizableText size="$4" color="$color12" fontWeight="700">
                  {m.value as ReactNode}
                </SizableText>
              )}
            </YStack>
          ))}
        </XStack>

        <YStack marginTop="auto">
          <Button
            variant="primary"
            size="$5"
            onPress={onReserve}
            {...(ctaColor
              ? {
                  backgroundColor: ctaColor as never,
                  pressStyle: { backgroundColor: ctaColor as never, opacity: 0.85 },
                }
              : {})}
          >
            {ctaLabel}
          </Button>
        </YStack>
      </YStack>
    </YStack>
  )
}
