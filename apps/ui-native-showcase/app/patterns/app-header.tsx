import {
  AppHeader,
  ScrollView,
  YStack,
  XStack,
  SizableText,
  Bell,
  Settings,
  useCollapsibleHeader,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const AVATAR =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face'

function CollapsibleDemo() {
  const { scrollHandler, headerStyle } = useCollapsibleHeader({ threshold: 40 })
  return (
    <YStack height={320} borderWidth={1} borderColor="$borderColor" borderRadius="$4" overflow="hidden">
      <AppHeader title="Today" subtitle="May 3, 2026" collapsible animatedStyle={headerStyle} />
      <ScrollView onScroll={scrollHandler} scrollEventThrottle={16} flex={1}>
        <YStack padding="$4" gap="$3">
          {Array.from({ length: 18 }, (_, i) => (
            <YStack
              key={i}
              padding="$3"
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$3"
              backgroundColor="$background"
            >
              <SizableText size="$3" fontWeight="500" color="$color12">
                Row {i + 1}
              </SizableText>
              <SizableText size="$2" color="$color10">
                Scroll down to hide the header. Scroll up to reveal it.
              </SizableText>
            </YStack>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  )
}

function HeaderFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack borderWidth={1} borderColor="$borderColor" borderRadius="$4" overflow="hidden">
      {children}
    </YStack>
  )
}

export default function AppHeaderShowcase() {
  return (
    <ShowcaseFrame
      title="AppHeader"
      description="Top navigation bar — orthogonal layout (simple/back/profile/centered) and surface (solid/transparent/blurred) variants."
      docPath="packages/ui-native/src/patterns/AppHeader.tsx"
    >
      <Section title="Layout — simple">
        <HeaderFrame>
          <AppHeader title="Inbox" />
        </HeaderFrame>
      </Section>

      <Section title="Layout — back">
        <HeaderFrame>
          <AppHeader title="Workout detail" variant="back" onBack={() => {}} />
        </HeaderFrame>
      </Section>

      <Section title="Layout — profile">
        <HeaderFrame>
          <AppHeader
            title="Sarah Chen"
            subtitle="Pro plan"
            variant="profile"
            avatar={AVATAR}
            right={<Settings size={22} color="$color11" />}
          />
        </HeaderFrame>
      </Section>

      <Section title="Layout — centered">
        <HeaderFrame>
          <AppHeader
            title="Today"
            variant="centered"
            left={<Settings size={22} color="$color11" />}
            right={<Bell size={22} color="$color11" />}
          />
        </HeaderFrame>
      </Section>

      <Section title="Surface — solid (default)">
        <HeaderFrame>
          <AppHeader title="Solid" surface="solid" />
        </HeaderFrame>
      </Section>

      <Section title="Surface — transparent" hint="over a tinted backdrop">
        <YStack borderWidth={1} borderColor="$borderColor" borderRadius="$4" overflow="hidden" backgroundColor="$blue5">
          <AppHeader title="Transparent" surface="transparent" />
          <XStack height={60} alignItems="center" paddingHorizontal="$4">
            <SizableText size="$2" color="$color12">
              Header has no background — the blue tint shows through.
            </SizableText>
          </XStack>
        </YStack>
      </Section>

      <Section title="Surface — blurred" hint="iOS BlurView; Android/Web fall back to semi-transparent">
        <YStack borderWidth={1} borderColor="$borderColor" borderRadius="$4" overflow="hidden" backgroundColor="$purple7">
          <AppHeader title="Blurred" surface="blurred" />
          <XStack height={60} alignItems="center" paddingHorizontal="$4">
            <SizableText size="$2" color="$color12">
              On iOS this uses expo-blur; elsewhere it renders a 0.85-alpha solid.
            </SizableText>
          </XStack>
        </YStack>
      </Section>

      <Section title="Collapsible" hint="scroll the inner list to hide the header">
        <CollapsibleDemo />
      </Section>
    </ShowcaseFrame>
  )
}
