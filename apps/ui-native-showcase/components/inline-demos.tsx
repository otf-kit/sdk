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
import {
  Button,
  Card,
  Input,
  Label,
  H4,
  Paragraph,
  SizableText,
  XStack,
  YStack,
  Heart,
  Plus,
  Activity,
  Target,
  TrendingUp,
  Badge,
  ChipGroup,
  ListItem,
  MediaCard,
  FloatingActionButton,
  AppHeader,
  OnboardingCarousel,
  type OnboardingStep,
} from '@otfdashkit/ui-native'

// ── Primitives ──────────────────────────────────────────────────────────

function ButtonDemo() {
  return (
    <XStack gap="$2" flexWrap="wrap" alignItems="center">
      <Button size="$3" theme="active">Primary</Button>
      <Button size="$3">Default</Button>
      <Button size="$3" theme="alt2">Subtle</Button>
      <Button size="$3" icon={Heart} circular accessibilityLabel="Like" />
    </XStack>
  )
}

function CardDemo() {
  return (
    <Card elevate size="$4" bordered padding="$4">
      <YStack gap="$1.5">
        <H4>Elevated card</H4>
        <Paragraph color="$color10" size="$3">
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
          image="https://picsum.photos/seed/otf-mountain/400/300"
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
          image="https://picsum.photos/seed/otf-tokyo/400/301"
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

function FabDemo() {
  // FAB is `position: absolute` — wrap in a fixed-height container with
  // overflow:hidden so the button is scoped to this section and doesn't
  // float into the rest of the page.
  return (
    <YStack
      height={180}
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$color2"
      overflow="hidden"
      position="relative"
    >
      <YStack flex={1} alignItems="center" justifyContent="center">
        <SizableText size="$3" color="$color10">Container with floating action</SizableText>
      </YStack>
      <FloatingActionButton
        icon={<Plus size={22} />}
        label="Add"
        onPress={() => {}}
      />
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
    title: 'Track your training',
    description: 'Log workouts in seconds.',
    icon: <Activity size={48} color="$color9" />,
  },
  {
    title: 'Hit your goals',
    description: 'Pick a target — strength, endurance, or recovery.',
    icon: <Target size={48} color="$color9" />,
  },
  {
    title: 'See your streak',
    description: 'Daily check-ins build the chart.',
    icon: <TrendingUp size={48} color="$color9" />,
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
        steps={ONBOARDING_STEPS}
        onSkip={() => {}}
        onComplete={() => {}}
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
