import {
  ImmersiveMediaScreen,
  YStack,
  XStack,
  SizableText,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ArrowLeft,
  MoreHorizontal,
  type ImmersiveMediaAction,
} from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

function FrameBox({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      height={500}
      overflow="hidden"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
    >
      {children}
    </YStack>
  )
}

function GradientMedia({ from, to }: { from: string; to: string }) {
  return (
    <YStack
      flex={1}
      style={{
        background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
      }}
    />
  )
}

const REEL_ACTIONS: ImmersiveMediaAction[] = [
  { id: 'like', icon: <Heart size={22} color="white" />, value: '12.4k', label: 'Like' },
  { id: 'comment', icon: <MessageCircle size={22} color="white" />, value: '342', label: 'Comments' },
  { id: 'share', icon: <Share2 size={22} color="white" />, value: '88', label: 'Share' },
  { id: 'save', icon: <Bookmark size={22} color="white" />, label: 'Save' },
]

export default function ImmersiveMediaScreenShowcase() {
  return (
    <ShowcaseFrame
      title="Immersive Media Screen"
      description="Full-bleed media with floating overlay actions — reels, stories, lookbooks."
      docPath="packages/ui-native/src/patterns/ImmersiveMediaScreen.tsx"
    >
      <Section title="Reel variant" hint="default — actions on right rail">
        <FrameBox>
          <ImmersiveMediaScreen
            variant="reel"
            media={<GradientMedia from="#0f172a" to="#7c3aed" />}
            title="Sarah Chen"
            subtitle="Sunset over the Pacific — handheld run, no edits."
            topLeft={<ArrowLeft size={22} color="white" />}
            topRight={<MoreHorizontal size={22} color="white" />}
            actions={REEL_ACTIONS}
          />
        </FrameBox>
      </Section>

      <Section title="Story variant" hint="with reply input at bottom">
        <FrameBox>
          <ImmersiveMediaScreen
            variant="story"
            media={<GradientMedia from="#f97316" to="#ec4899" />}
            title="Alex Rivera"
            subtitle="2h ago"
            topLeft={<ArrowLeft size={22} color="white" />}
            topCenter={
              <XStack gap="$1">
                <YStack width={28} height={3} backgroundColor="white" borderRadius={2} />
                <YStack width={28} height={3} backgroundColor="rgba(255,255,255,0.4)" borderRadius={2} />
                <YStack width={28} height={3} backgroundColor="rgba(255,255,255,0.4)" borderRadius={2} />
              </XStack>
            }
            inputPlaceholder="Send a message..."
            onInputPress={() => {}}
          />
        </FrameBox>
      </Section>

      <Section title="Sheet variant" hint="bottom sheet docked under media">
        <FrameBox>
          <ImmersiveMediaScreen
            variant="sheet"
            media={<GradientMedia from="#10b981" to="#0891b2" />}
            title="Pottery Workshop"
            subtitle="Maker Lab · Sun 1:00 PM"
            topLeft={<ArrowLeft size={22} color="white" />}
            topRight={<MoreHorizontal size={22} color="white" />}
            inputPlaceholder="Reserve a spot — $30"
            onInputPress={() => {}}
            sheetContent={
              <YStack gap="$2">
                <SizableText size="$3" color="$color11">
                  Beginner-friendly two-hour intro to wheel throwing. All clay and tools included.
                </SizableText>
                <XStack gap="$2">
                  <SizableText size="$2" color="$color9">4 / 8 spots</SizableText>
                </XStack>
              </YStack>
            }
          />
        </FrameBox>
      </Section>
    </ShowcaseFrame>
  )
}
