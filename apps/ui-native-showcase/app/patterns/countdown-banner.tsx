import { useMemo } from 'react'
import {
  CountdownBanner,
  Button,
  XStack,
  YStack,
  SizableText,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function CountdownBannerShowcase() {
  const in24h = useMemo(() => new Date(Date.now() + 24 * 60 * 60 * 1000), [])
  const in7d = useMemo(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), [])
  const in15m = useMemo(() => new Date(Date.now() + 15 * 60 * 1000), [])

  return (
    <ShowcaseFrame
      title="Countdown Banner"
      description="Live ticking countdown for limited offers, expiring carts, or queue waits. Three densities — banner, compact, badge."
      docPath="packages/ui-native/src/patterns/CountdownBanner.tsx"
    >
      <Section title="Banner — 24h offer">
        <YStack gap="$3">
          <CountdownBanner endTime={in24h} label="Founders pricing ends in" />
          <XStack gap="$2" alignItems="center">
            <Button size="$3">Claim 30% off</Button>
            <SizableText size="$2" color="$color10">CTA pairs naturally beneath the banner.</SizableText>
          </XStack>
        </YStack>
      </Section>

      <Section title="Banner — 7 day launch">
        <YStack gap="$3">
          <CountdownBanner endTime={in7d} label="Launch goes live in" />
          <Button alignSelf="flex-start" size="$3" backgroundColor="$color9" color="$color1">
            Notify me
          </Button>
        </YStack>
      </Section>

      <Section title="Compact — pill variant">
        <XStack gap="$2" alignItems="center" flexWrap="wrap">
          <CountdownBanner endTime={in15m} label="Cart held for" variant="compact" />
          <Button size="$3">Check out</Button>
        </XStack>
      </Section>

      <Section title="Badge — inline tag">
        <XStack gap="$2" alignItems="center" flexWrap="wrap">
          <CountdownBanner endTime={in24h} label="Ends" variant="badge" />
          <SizableText size="$3" color="$color11">on the Pro annual plan.</SizableText>
        </XStack>
      </Section>

      <Section title="By minutes — quick session">
        <CountdownBanner minutes={5} label="Verification expires in" variant="compact" />
      </Section>
    </ShowcaseFrame>
  )
}
