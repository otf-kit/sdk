import {
  Skeleton,
  YStack,
  XStack,
  SizableText,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function SkeletonShowcase() {
  return (
    <ShowcaseFrame
      title="Skeleton"
      description="Shimmer placeholder mirroring layout. Three primitives — text, circular, rectangular — composed into loading states."
      docPath="packages/ui-native/src/patterns/Skeleton.tsx"
    >
      <Section title="Variants">
        <YStack gap="$3">
          <YStack gap="$1.5">
            <SizableText size="$2" color="$color11">Text — three lines</SizableText>
            <YStack gap="$1.5">
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="92%" />
              <Skeleton variant="text" width="60%" />
            </YStack>
          </YStack>

          <YStack gap="$1.5">
            <SizableText size="$2" color="$color11">Circular — avatar</SizableText>
            <Skeleton variant="circular" height={48} />
          </YStack>

          <YStack gap="$1.5">
            <SizableText size="$2" color="$color11">Rectangular — media tile</SizableText>
            <Skeleton variant="rectangular" width="100%" height={140} />
          </YStack>
        </YStack>
      </Section>

      <Section title="Sizes" hint="text variant scales by height">
        <YStack gap="$2">
          <Skeleton variant="text" width="80%" height={12} />
          <Skeleton variant="text" width="80%" height={16} />
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="80%" height={28} />
        </YStack>
      </Section>

      <Section title="List row composition" hint="avatar + 2 text rows">
        <YStack gap="$3">
          {Array.from({ length: 3 }, (_, i) => (
            <XStack key={i} gap="$3" alignItems="center">
              <Skeleton variant="circular" height={44} />
              <YStack flex={1} gap="$1.5">
                <Skeleton variant="text" width="55%" height={14} />
                <Skeleton variant="text" width="80%" height={11} />
              </YStack>
            </XStack>
          ))}
        </YStack>
      </Section>

      <Section title="Card composition" hint="cover + title + meta">
        <YStack
          padding="$3"
          gap="$3"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
        >
          <Skeleton variant="rectangular" width="100%" height={160} borderRadius={12} />
          <YStack gap="$2">
            <Skeleton variant="text" width="70%" height={18} />
            <Skeleton variant="text" width="40%" height={12} />
          </YStack>
          <XStack gap="$2">
            <Skeleton variant="rectangular" width={64} height={28} borderRadius={14} />
            <Skeleton variant="rectangular" width={64} height={28} borderRadius={14} />
          </XStack>
        </YStack>
      </Section>

      <Section title="Profile screen composition">
        <YStack alignItems="center" gap="$3" paddingVertical="$3">
          <Skeleton variant="circular" height={80} />
          <Skeleton variant="text" width={140} height={20} />
          <Skeleton variant="text" width={100} height={12} />
          <XStack gap="$5" paddingTop="$2">
            {Array.from({ length: 3 }, (_, i) => (
              <YStack key={i} alignItems="center" gap="$1.5">
                <Skeleton variant="text" width={36} height={20} />
                <Skeleton variant="text" width={48} height={10} />
              </YStack>
            ))}
          </XStack>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
