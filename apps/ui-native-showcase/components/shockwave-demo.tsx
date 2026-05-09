// Shockwave demo — phone-frame mockup containing two interchangeable
// "app screens" (Stay Browse → Stay Detail). Auto-cycles between the
// two with a ~1s pause between waves so visitors see the effect
// without having to tap anything — reads like a marketing loop.
//
// This file only renders on NATIVE (iOS / Android). On web, the route
// at app/patterns/shockwave.tsx routes to <MobileOnlyFallback> instead
// — Skia's view-to-image API is native-only and we don't approximate
// the wave on web. Visitors are pointed at the QR in the outer
// storybook-preview shell.
//
// The screen content (StayBrowseScreen + StayDetailScreen) lives in
// the SDK as standalone marketing patterns — see /patterns/stay-browse
// and /patterns/stay-detail in the showcase. Single source of truth.
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
  YStack,
  XStack,
  SizableText,
  Paragraph,
  Shockwave,
  StayBrowseScreen,
  StayDetailScreen,
  type ShockwaveValue,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from './ShowcaseFrame'

const PHONE_W = 320
const PHONE_H = 640
const SCREEN_PAD = 14
const SURFACE_W = PHONE_W - SCREEN_PAD * 2
const SURFACE_H = PHONE_H - SCREEN_PAD * 2

const HOUSE_IMAGE =
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=720&q=80&auto=format&fit=crop'

const LISTING = {
  image: HOUSE_IMAGE,
  title: 'The Hill Guest House',
  address: '58 Hullbrook Road, Billesley',
  ownerName: "Harry Konigsberg's",
  rating: 4.9,
  pricePerNight: 250,
  sqft: 29,
  bed: 2,
  bath: 1,
}

// Phone-frame mockup. Wraps the children in a rounded dark bezel with
// a fake dynamic-island stripe so the demo reads as "app screen" rather
// than a free-floating card.
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      width={PHONE_W}
      height={PHONE_H}
      borderRadius={42}
      backgroundColor="#0a0a0a"
      borderWidth={2}
      borderColor="#1a1a1a"
      padding={SCREEN_PAD}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 30 }}
      shadowOpacity={0.45}
      shadowRadius={50}
    >
      {/* Dynamic-island stripe (purely cosmetic) */}
      <View
        style={{
          position: 'absolute',
          top: 18,
          alignSelf: 'center',
          width: 110,
          height: 28,
          borderRadius: 999,
          backgroundColor: '#000',
          zIndex: 5,
        }}
      />
      <View
        style={{
          flex: 1,
          borderRadius: 30,
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
        {children}
      </View>
    </YStack>
  )
}

// Shared wave duration. Picked tight so the auto-cycle reads as a
// marketing loop rather than a slideshow.
const WAVE_DURATION_MS = 950
// Time between the wave SETTLING and the next wave STARTING (~1s pause).
// Cycle period = WAVE_DURATION_MS + AUTO_CYCLE_PAUSE_MS.
const AUTO_CYCLE_PAUSE_MS = 1000

/**
 * Toggles `value` from/to with `WAVE_DURATION_MS + AUTO_CYCLE_PAUSE_MS`
 * between toggles, so the wave plays, the user sees the destination
 * settled for ~1s, then the wave plays in reverse, and so on.
 *
 * Stagger first tick by `offsetMs` so multiple demos on one screen
 * don't fire in lockstep — reads more alive.
 */
function useAutoCycle(initial: ShockwaveValue, offsetMs: number = 0) {
  const [value, setValue] = useState<ShockwaveValue>(initial)
  useEffect(() => {
    const period = WAVE_DURATION_MS + AUTO_CYCLE_PAUSE_MS
    const tick = () => {
      setValue((v) => (v === 'from' ? 'to' : 'from'))
    }
    // setTimeout / setInterval return a `number` in RN — closures, not
    // property attachment, are the only reliable way to hold onto both
    // handles across the cleanup boundary.
    let interval: ReturnType<typeof setInterval> | null = null
    const start = setTimeout(() => {
      tick()
      interval = setInterval(tick, period)
    }, period + offsetMs)
    return () => {
      clearTimeout(start)
      if (interval !== null) clearInterval(interval)
    }
  }, [offsetMs])
  return value
}

function StrengthDemo({
  strength,
  label,
  offsetMs,
}: {
  strength: number
  label: string
  offsetMs: number
}) {
  const v = useAutoCycle('from', offsetMs)
  return (
    <YStack gap={8} alignItems="center">
      <SizableText size="$2" color="$color10">
        {label}
      </SizableText>
      <Shockwave
        value={v}
        width={200}
        height={360}
        duration={WAVE_DURATION_MS}
        shockStrength={strength}
        style={{ borderRadius: 24, overflow: 'hidden' }}
      >
        <Shockwave.Transition.From>
          <StayBrowseScreen listing={LISTING} />
        </Shockwave.Transition.From>
        <Shockwave.Transition.To>
          <StayDetailScreen listing={LISTING} />
        </Shockwave.Transition.To>
      </Shockwave>
    </YStack>
  )
}

export default function ShockwaveDemo() {
  const value = useAutoCycle('from')

  return (
    <ShowcaseFrame
      title="Shockwave"
      description="Skia-shader transition that auto-cycles between Stay Browse and Stay Detail every ~2s — chromatic ripple from origin to edge. Reads like a marketing loop, no taps needed."
    >
      <Section title="Phone-frame demo">
        <YStack gap={20} alignItems="center">
          <PhoneFrame>
            <Shockwave
              value={value}
              width={SURFACE_W}
              height={SURFACE_H}
              duration={WAVE_DURATION_MS}
              shockStrength={0.16}
              lensingSpread={0.22}
              style={{ flex: 1 }}
            >
              <Shockwave.Transition.From>
                <StayBrowseScreen listing={LISTING} />
              </Shockwave.Transition.From>
              <Shockwave.Transition.To>
                <StayDetailScreen listing={LISTING} />
              </Shockwave.Transition.To>
            </Shockwave>
          </PhoneFrame>

          <Paragraph size="$2" color="$color10" textAlign="center" maxWidth={420}>
            Native (iOS / Android) uses Skia's view-to-image API to
            snapshot both screens and run the shader between them, on
            a ~2s loop. No interaction required.
          </Paragraph>
        </YStack>
      </Section>

      <Section title="Strength variants">
        <Paragraph size="$2" color="$color10">
          shockStrength controls peak displacement. 0 = no displacement,
          0.3 = aggressive. Default 0.12. All three loop with staggered
          phase so they don't fire in lockstep.
        </Paragraph>
        <XStack
          gap={28}
          flexWrap="wrap"
          justifyContent="center"
          marginTop={14}
        >
          <StrengthDemo strength={0.05} label="strength = 0.05 (subtle)" offsetMs={0} />
          <StrengthDemo strength={0.16} label="strength = 0.16 (default)" offsetMs={650} />
          <StrengthDemo strength={0.28} label="strength = 0.28 (intense)" offsetMs={1300} />
        </XStack>
      </Section>
    </ShowcaseFrame>
  )
}
