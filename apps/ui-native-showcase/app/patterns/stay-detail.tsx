// Stay Detail — paired booking-confirmation screen for Stay Browse.
//
// Mobile-only by design: native premium preview experience. Web shows
// MobileOnlyFallback; the outer storybook-preview shell drives visitors
// onto a real device via the per-route QR.
import { Platform } from 'react-native'
import {
  YStack,
  XStack,
  StayDetailScreen,
  Paragraph,
  SizableText,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { MobileOnlyFallback } from '../../components/MobileOnlyFallback'

const HOUSE_IMAGE =
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=720&q=80&auto=format&fit=crop'

const VILLA_IMAGE =
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=720&q=80&auto=format&fit=crop'

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      width={320}
      height={620}
      borderRadius={42}
      backgroundColor="#0a0a0a"
      borderWidth={2}
      borderColor="#1a1a1a"
      padding={14}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 30 }}
      shadowOpacity={0.45}
      shadowRadius={50}
    >
      <YStack
        position="absolute"
        top={18}
        alignSelf="center"
        width={110}
        height={28}
        borderRadius={999}
        backgroundColor="#000"
        zIndex={5}
      />
      <YStack flex={1} borderRadius={30} overflow="hidden">
        {children}
      </YStack>
    </YStack>
  )
}

export default function StayDetailShowcase() {
  if (Platform.OS === 'web') {
    return (
      <MobileOnlyFallback
        title="Stay Detail"
        description="Premium booking-confirmation screen — designed as part of the OTF native preview experience. Hero image, rating chip overlay, price + owner subtitle, metric row, accent CTA. Pairs with Shockwave for the chromatic transition. Scan the QR to interact on your device."
        tags={['Marketing', 'Hospitality', 'Tamagui']}
      />
    )
  }

  return (
    <ShowcaseFrame
      title="Stay Detail"
      description="Booking-confirmation screen pairing with Stay Browse. Hero image, rating chip overlay, price + owner subtitle, metric row, and an accent-tinted Reserve CTA."
    >
      <Section title="Default — booking confirmation">
        <YStack alignItems="center">
          <PhoneFrame>
            <StayDetailScreen
              listing={{
                image: HOUSE_IMAGE,
                title: 'The Hill Guest House',
                address: '1065 AG Guillaume Briard',
                ownerName: "Harry Konigsberg's",
                rating: 4.9,
                pricePerNight: 250,
                sqft: 29,
                bed: 2,
              }}
              onReserve={() => {}}
            />
          </PhoneFrame>
        </YStack>
      </Section>

      <Section title="Side-by-side variants">
        <XStack gap={24} flexWrap="wrap" justifyContent="center">
          <PhoneFrame>
            <StayDetailScreen
              listing={{
                image: HOUSE_IMAGE,
                title: 'The Hill Guest House',
                address: '1065 AG Guillaume Briard',
                ownerName: "Harry Konigsberg's",
                rating: 4.9,
                pricePerNight: 250,
                sqft: 29,
                bed: 2,
              }}
            />
          </PhoneFrame>
          <PhoneFrame>
            <StayDetailScreen
              listing={{
                image: VILLA_IMAGE,
                title: 'Villa Aurora',
                address: 'Lake Como, Italy',
                ownerName: 'Aurora Hospitality',
                rating: 4.8,
                pricePerNight: 480,
                sqft: 86,
                bed: 4,
                bath: 3,
              }}
              ctaLabel="Reserve · 3 nights"
              ctaColor="#16a34a"
            />
          </PhoneFrame>
        </XStack>
      </Section>

      <Section title="API">
        <SizableText fontFamily="$mono" size="$2" color="$color10">
          {`<StayDetailScreen
  listing={{
    image: 'https://...',
    title: 'The Hill Guest House',
    address: '1065 AG Guillaume Briard',
    ownerName: "Harry Konigsberg's",
    rating: 4.9,
    pricePerNight: 250,
    sqft: 29,
    bed: 2,
  }}
  ctaLabel="Reserve now"
  ctaColor="#f97316"
  onReserve={() => router.push('/checkout')}
/>`}
        </SizableText>
        <Paragraph size="$2" color="$color10" marginTop="$3">
          Pairs naturally with Shockwave for a chromatic-ripple transition
          from browse → detail.
        </Paragraph>
      </Section>
    </ShowcaseFrame>
  )
}
