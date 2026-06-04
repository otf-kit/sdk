import {
  ImmersiveMediaScreen,
  Image,
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
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { SCENES, PEOPLE } from '../../lib/fixtures'

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

// Real R2 images — full-bleed via Tamagui Image (same pattern as MediaCard/LoginScreen)
function PhotoMedia({ uri }: { uri: string }) {
  return <Image source={{ uri }} width="100%" height="100%" objectFit="cover" />
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
      <Section title="Reel variant" hint="real photo — actions on right rail">
        <FrameBox>
          <ImmersiveMediaScreen
            variant="reel"
            media={<PhotoMedia uri={SCENES.find(s => s.id === 'coast')!.image} />}
            title={PEOPLE.find(p => p.id === 'sarah')!.name}
            subtitle="Big Sur — handheld run, no edits."
            topLeft={<ArrowLeft size={22} color="white" />}
            topRight={<MoreHorizontal size={22} color="white" />}
            actions={REEL_ACTIONS}
          />
        </FrameBox>
      </Section>

      <Section title="Story variant" hint="progress bar + reply input">
        <FrameBox>
          <ImmersiveMediaScreen
            variant="story"
            media={<PhotoMedia uri={SCENES.find(s => s.id === 'mountains')!.image} />}
            title={PEOPLE.find(p => p.id === 'alex')!.name}
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
            media={<PhotoMedia uri={SCENES.find(s => s.id === 'forest')!.image} />}
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
