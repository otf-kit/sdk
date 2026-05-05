import {
  XStack,
  YStack,
  SizableText,
  // Lucide re-exports — sample a representative slice
  Activity,
  Bell,
  Calendar,
  ChevronRight,
  CircleCheck,
  Heart,
  Home,
  MessageCircle,
  Search,
  Settings,
  Star,
  User,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const SAMPLE = [
  { name: 'Activity', Cmp: Activity },
  { name: 'Bell', Cmp: Bell },
  { name: 'Calendar', Cmp: Calendar },
  { name: 'ChevronRight', Cmp: ChevronRight },
  { name: 'CircleCheck', Cmp: CircleCheck },
  { name: 'Heart', Cmp: Heart },
  { name: 'Home', Cmp: Home },
  { name: 'MessageCircle', Cmp: MessageCircle },
  { name: 'Search', Cmp: Search },
  { name: 'Settings', Cmp: Settings },
  { name: 'Star', Cmp: Star },
  { name: 'User', Cmp: User },
] as const

export default function IconShowcase() {
  return (
    <ShowcaseFrame
      title="Icon"
      description="Lucide icon set re-exported from @otfdashkit/ui-native — same import surface on web and native."
      docPath="packages/ui-native/src/index.ts (lucide re-exports)"
    >
      <Section title="Sizes">
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          {[12, 16, 20, 24, 32, 48].map((size) => (
            <YStack key={size} gap="$1" alignItems="center">
              <Heart size={size} />
              <SizableText size="$1" color="$color10">{size}px</SizableText>
            </YStack>
          ))}
        </XStack>
      </Section>

      <Section title="Color">
        <XStack gap="$4" alignItems="center" flexWrap="wrap">
          <Heart size={24} color="$color12" />
          <Heart size={24} color="$red10" />
          <Heart size={24} color="$green10" />
          <Heart size={24} color="$blue10" />
          <Heart size={24} color="$color8" />
        </XStack>
      </Section>

      <Section title="Sample set">
        <XStack gap="$4" flexWrap="wrap">
          {SAMPLE.map(({ name, Cmp }) => (
            <YStack key={name} gap="$1" alignItems="center" minWidth={80}>
              <Cmp size={20} />
              <SizableText size="$1" color="$color10">{name}</SizableText>
            </YStack>
          ))}
        </XStack>
      </Section>
    </ShowcaseFrame>
  )
}
