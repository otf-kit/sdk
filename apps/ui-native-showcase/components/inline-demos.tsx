// Inline demos for the new search+chips home screen.
//
// Each entry below is a TINY representative demo — a single visual that
// gives a feel for the component. The catalog (components/catalog.ts)
// defines all 76 components; entries that have a matching demo here render
// inline in the home scroll. Entries without a matching demo render as a
// link-out card to their full per-route detail page (still authored under
// app/{category}/{slug}.tsx with the original ShowcaseFrame).
//
// To add an inline demo for a new slug:
//   1. Add a new key to INLINE_DEMOS keyed by the catalog slug.
//   2. Author a minimal component (no <ShowcaseFrame>, no big titles —
//      the home screen renders its own H3 from the catalog entry).
//
// Phase A target: 10 flagships across all 4 categories. Remaining 66 will
// be inlined progressively in Phase B.

import { useState, type ComponentType } from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  Button,
  Card,
  Image,
  Input,
  Label,
  H4,
  Paragraph,
  SizableText,
  XStack,
  YStack,
  Heart,
  Plus,
  FileText,
  Camera,
  CalendarPlus,
  Badge,
  ChipGroup,
  ListItem,
  MediaCard,
  FloatingActionButton,
  AppHeader,
  OnboardingCarousel,
  type OnboardingStep,
} from '@otfdashkit/ui-native'
import { SCENES } from '../lib/fixtures'

// Real, self-hosted editorial scenes (R2) for the inline media previews.
const sceneImg = (id: string) => SCENES.find((s) => s.id === id)!.image

// ── Primitives ──────────────────────────────────────────────────────────

function ButtonDemo() {
  return (
    <XStack gap="$2" flexWrap="wrap" alignItems="center">
      <Button size="$3" variant="primary">Primary</Button>
      <Button size="$3" variant="default">Default</Button>
      <Button size="$3" variant="outlined">Outlined</Button>
      <Button size="$3" variant="default" icon={Heart} circular accessibilityLabel="Like" />
    </XStack>
  )
}

function CardDemo() {
  return (
    <Card elevate size="$4" bordered padding="$4">
      <YStack gap="$1.5">
        <H4>Elevated card</H4>
        <Paragraph color="$color11" size="$3">
          Surface container with shadow + border. Use for primary content
          groupings on a page.
        </Paragraph>
      </YStack>
    </Card>
  )
}

function InputDemo() {
  const [v, setV] = useState('')
  return (
    <YStack gap="$1.5">
      <Label htmlFor="demo-input" size="$3">Email</Label>
      <Input
        id="demo-input"
        size="$4"
        placeholder="you@example.com"
        value={v}
        onChangeText={setV}
      />
    </YStack>
  )
}

// ── Interface ───────────────────────────────────────────────────────────

function BadgeDemo() {
  return (
    <XStack gap="$2" flexWrap="wrap">
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </XStack>
  )
}

// ── Patterns ────────────────────────────────────────────────────────────

function ChipDemo() {
  const [selected, setSelected] = useState<string[]>(['react', 'tamagui'])
  return (
    <ChipGroup
      chips={[
        { id: 'react', label: 'React Native' },
        { id: 'expo', label: 'Expo' },
        { id: 'tamagui', label: 'Tamagui' },
        { id: 'typescript', label: 'TypeScript' },
      ]}
      selected={selected}
      onSelectionChange={setSelected}
      multiSelect
    />
  )
}

function ListItemDemo() {
  return (
    <YStack gap="$1">
      <ListItem
        title="Account"
        subtitle="Profile, password, sign-out"
        onPress={() => {}}
      />
      <ListItem
        title="Notifications"
        subtitle="Push & email preferences"
        onPress={() => {}}
      />
      <ListItem
        title="Privacy"
        subtitle="Data & permissions"
        onPress={() => {}}
      />
    </YStack>
  )
}

function MediaCardDemo() {
  return (
    <XStack gap="$3">
      <YStack flex={1}>
        <MediaCard
          image={sceneImg('mountains')}
          title="Mountain retreat"
          subtitle="Switzerland"
          overlay="gradient"
          aspectRatio={4 / 3}
          onPress={() => {}}
          badge="Featured"
        />
      </YStack>
      <YStack flex={1}>
        <MediaCard
          image={sceneImg('city')}
          title="City night"
          subtitle="Tokyo"
          overlay="dark"
          aspectRatio={4 / 3}
          onPress={() => {}}
        />
      </YStack>
    </XStack>
  )
}

// Cinematic photo the FAB floats over — gives the stage real context (a FAB
// always sits ON a screen) instead of an empty card, and gives the expanding
// menu's dim backdrop a real image to darken when it opens. Same self-hosted
// R2 imagery + scrim pattern as the immersive paywall.
function FabStageBackdrop() {
  return (
    <YStack position="absolute" top={0} left={0} right={0} bottom={0}>
      <Image
        source={{ uri: sceneImg('city') }}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        width="100%"
        height="100%"
        objectFit="cover"
      />
      {/* Soft scrim — keeps the photo vivid up top while darkening the
          bottom-right so the FAB + chips stay crisp. */}
      <LinearGradient
        colors={['rgba(0,0,0,0.32)', 'rgba(0,0,0,0.12)', 'rgba(0,0,0,0.58)']}
        locations={[0, 0.42, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </YStack>
  )
}

function FabDemo() {
  const [last, setLast] = useState<string | null>(null)
  return (
    <YStack gap="$2">
      {/* Context label */}
      <SizableText size="$2" color="$color11">
        {last ? `✓ Created: ${last}` : 'Tap the button below to fan out actions'}
      </SizableText>

      {/* Fixed-height stage — tall enough that all 3 action chips fan out
          above the FAB without clipping (chips start ~104px off the bottom and
          the 3-chip stack is ~144px tall). A faux app screen sits behind the
          FAB so the stage reads as a real surface, not an empty card. */}
      <YStack
        height={300}
        borderRadius="$5"
        borderWidth={1}
        borderColor="$color4"
        backgroundColor="$color2"
        overflow="hidden"
        position="relative"
      >
        <FabStageBackdrop />
        <FloatingActionButton
          icon={<Plus size={22} color="white" />}
          label="Create"
          expandStyle="pill"
          position="bottom-right"
          actions={[
            { id: 'note',  icon: <FileText size={18} color="white" />,     label: 'New note',     onPress: () => setLast('Note')  },
            { id: 'photo', icon: <Camera size={18} color="white" />,       label: 'Photo',        onPress: () => setLast('Photo') },
            { id: 'event', icon: <CalendarPlus size={18} color="white" />, label: 'Event',        onPress: () => setLast('Event') },
          ]}
        />
      </YStack>
    </YStack>
  )
}

function AppHeaderDemo() {
  return (
    <YStack
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$color2"
      overflow="hidden"
    >
      <AppHeader title="Home" variant="simple" />
    </YStack>
  )
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    eyebrow: 'Welcome',
    title: 'Find your\nquiet place',
    description: 'Thousands of trails, stays, and escapes — curated for the way you unwind.',
    image: sceneImg('forest'),
  },
  {
    eyebrow: 'Discover',
    title: 'Go where\nthe map ends',
    description: 'Hand-picked routes from coastlines to ridgelines. Save the ones that call.',
    image: sceneImg('mountains'),
  },
  {
    eyebrow: 'Begin',
    title: 'Your next\nchapter awaits',
    description: 'Book in two taps. We handle the logistics so you can just go.',
    image: sceneImg('coast'),
  },
]

function OnboardingCarouselDemo() {
  return (
    <YStack
      height={520}
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$5"
      overflow="hidden"
      backgroundColor="$background"
    >
      <OnboardingCarousel
        variant="immersive"
        steps={ONBOARDING_STEPS}
        onSkip={() => {}}
        onComplete={() => {}}
        completeLabel="Start exploring"
      />
    </YStack>
  )
}

// ── Map ─────────────────────────────────────────────────────────────────

export const INLINE_DEMOS: Record<string, ComponentType> = {
  // Primitives
  button: ButtonDemo,
  card: CardDemo,
  input: InputDemo,

  // Interface
  badge: BadgeDemo,

  // Patterns
  chip: ChipDemo,
  'app-header': AppHeaderDemo,
  fab: FabDemo,
  'media-card': MediaCardDemo,
  'onboarding-carousel': OnboardingCarouselDemo,
}

// Layouts
;(INLINE_DEMOS as Record<string, ComponentType>)['list-item'] = ListItemDemo
