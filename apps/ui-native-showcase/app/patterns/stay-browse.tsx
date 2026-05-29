// Stay Browse — premium hospitality / real-estate search screen.
//
// Mobile-only by design: this is part of the native preview experience.
// Web visitors see the MobileOnlyFallback, which (combined with the
// outer storybook-preview shell's per-route QR) drives them onto the
// real device to interact with the polished iPhone-frame demo.
import { Platform } from 'react-native'
import {
  YStack,
  XStack,
  StayBrowseScreen,
  Paragraph,
  SizableText,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { MobileOnlyFallback } from '../../components/MobileOnlyFallback'
import { STAYS } from '../../lib/fixtures'

// Real, self-hosted lodging photos (R2).
const stay = (id: string) => STAYS.find((s) => s.id === id)!.image
const HOUSE_IMAGE = stay('cabin')
const VILLA_IMAGE = stay('villa')

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

export default function StayBrowseShowcase() {
  if (Platform.OS === 'web') {
    return (
      <MobileOnlyFallback
        title="Stay Browse"
        description="Premium hospitality / real-estate search screen — designed as part of the OTF native preview experience. Greeting, multi-line headline, category chips, and a featured listing card. Scan the QR to interact on your device."
        tags={['Marketing', 'Hospitality', 'Tamagui']}
      />
    )
  }

  return (
    <ShowcaseFrame
      title="Stay Browse"
      description="Premium-feel real-estate / hospitality search screen. Greeting, multi-line headline, category-chip strip, and a featured listing card with rating, beds, bath."
    >
      <Section title="Default — Hill Guest House">
        <YStack alignItems="center">
          <PhoneFrame>
            <StayBrowseScreen
              listing={{
                image: HOUSE_IMAGE,
                title: 'The Hill Guest House',
                address: '58 Hullbrook Road, Billesley',
                rating: 4.9,
                bed: 2,
                bath: 1,
              }}
            />
          </PhoneFrame>
        </YStack>
      </Section>

      <Section title="Custom greeting + categories">
        <Paragraph size="$2" color="$color10" marginBottom="$3">
          Override `greeting`, `headline`, and `categories` to repurpose the
          screen for villas, weekend rentals, etc.
        </Paragraph>
        <YStack alignItems="center">
          <PhoneFrame>
            <StayBrowseScreen
              greeting="Welcome back, Mani"
              headline={'Plan your\nweekend getaway'}
              categories={[
                { label: 'Villa', active: true },
                { label: 'Apartment' },
                { label: 'Cabin' },
                { label: 'Lake house' },
              ]}
              listing={{
                image: VILLA_IMAGE,
                title: 'Villa Aurora',
                address: 'Lake Como, Italy',
                rating: 4.8,
                bed: 4,
                bath: 3,
              }}
            />
          </PhoneFrame>
        </YStack>
      </Section>

      <Section title="Side-by-side variants">
        <XStack gap={24} flexWrap="wrap" justifyContent="center">
          <PhoneFrame>
            <StayBrowseScreen
              listing={{
                image: HOUSE_IMAGE,
                title: 'The Hill Guest House',
                address: 'Billesley, B13 0LA',
                rating: 4.9,
                bed: 2,
                bath: 1,
              }}
            />
          </PhoneFrame>
          <PhoneFrame>
            <StayBrowseScreen
              greeting="Good evening"
              headline={'Find tonight\'s\nstay'}
              categories={[
                { label: 'Hotel' },
                { label: 'Hostel', active: true },
                { label: 'Bnb' },
              ]}
              listing={{
                image: VILLA_IMAGE,
                title: 'Aurora Villa',
                address: 'Como, Italy',
                rating: 4.8,
                bed: 4,
              }}
            />
          </PhoneFrame>
        </XStack>
      </Section>

      <Section title="API">
        <SizableText fontFamily="$mono" size="$2" color="$color10">
          {`<StayBrowseScreen
  greeting="Good morning"
  headline={"Unlock Your\\nPerfect Stay Today!"}
  categories={[{ label: 'Hotel', active: true }, ...]}
  listing={{
    image: 'https://...',
    title: 'The Hill Guest House',
    address: '58 Hullbrook Road',
    rating: 4.9,
    bed: 2,
    bath: 1,
  }}
  onFavorite={() => {}}
/>`}
        </SizableText>
      </Section>
    </ShowcaseFrame>
  )
}
