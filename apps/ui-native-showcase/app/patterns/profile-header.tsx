import {
  ProfileHeader,
  OtfButton,
  XStack,
  YStack,
  SizableText,
  Settings,
  MessageCircle,
  UserPlus,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { avatar, SCENES } from '../../lib/fixtures'

const SARAH_AVATAR = avatar('sarah')
const ALEX_AVATAR = avatar('alex')
const JORDAN_AVATAR = avatar('jordan')
const DIEGO_AVATAR = avatar('diego')

// Scene images reused as cover photos — already self-hosted on R2
const sceneImg = (id: string) => SCENES.find((s) => s.id === id)!.image

function HeaderFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$4"
      backgroundColor="$background"
      overflow="hidden"
    >
      {children}
    </YStack>
  )
}

export default function ProfileHeaderShowcase() {
  return (
    <ShowcaseFrame
      title="Profile Header"
      description="Avatar + name + meta + stats + actions. Default (centered) and cover-photo (Instagram-style) layouts."
      docPath="packages/ui-native/src/patterns/ProfileHeader.tsx"
    >
      <Section title="Cover photo — with stats + actions" hint="Instagram / LinkedIn style">
        <HeaderFrame>
          <ProfileHeader
            name="Sarah Chen"
            subtitle="Product designer · Member since 2024"
            avatar={SARAH_AVATAR}
            coverImage={sceneImg('coast')}
            stats={[
              { value: '128', label: 'Workouts' },
              { value: '42', label: 'Plans' },
              { value: '1.2k', label: 'Followers' },
            ]}
            actions={
              <XStack gap="$2">
                <OtfButton variant="primary" size="$3" icon={<UserPlus size={14} />}>Follow</OtfButton>
                <OtfButton variant="outlined" size="$3" icon={<MessageCircle size={14} />}>Message</OtfButton>
              </XStack>
            }
          />
        </HeaderFrame>
      </Section>

      <Section title="Cover photo — coach profile" hint="outdoor cover + edit button">
        <HeaderFrame>
          <ProfileHeader
            name="Alex Rivera"
            subtitle="Coach — Strength &amp; Conditioning"
            avatar={ALEX_AVATAR}
            coverImage={sceneImg('mountains')}
            stats={[
              { value: '4.9★', label: 'Rating' },
              { value: '320', label: 'Athletes' },
              { value: '6yr', label: 'Experience' },
            ]}
            actions={
              <OtfButton variant="outlined" size="$3" icon={<Settings size={14} />}>Edit profile</OtfButton>
            }
          />
          <YStack paddingHorizontal="$4" paddingBottom="$4">
            <SizableText size="$3" color="$color11">
              Programming long-distance run blocks with strength accessory work. Active here every morning.
            </SizableText>
          </YStack>
        </HeaderFrame>
      </Section>

      <Section title="Cover photo — trail runner" hint="forest cover">
        <HeaderFrame>
          <ProfileHeader
            name="Diego Costa"
            subtitle="Ultra runner — building toward 100mi"
            avatar={DIEGO_AVATAR}
            coverImage={sceneImg('forest')}
            stats={[
              { value: '312', label: 'Miles' },
              { value: '18', label: 'Weeks' },
              { value: '92%', label: 'Adherence' },
            ]}
            actions={
              <XStack gap="$2">
                <OtfButton variant="primary" size="$3">Follow</OtfButton>
                <OtfButton variant="outlined" size="$3">Share</OtfButton>
              </XStack>
            }
          />
        </HeaderFrame>
      </Section>

      <Section title="Default — avatar + subtitle" hint="centered, no cover photo">
        <HeaderFrame>
          <ProfileHeader
            name="Jordan Kim"
            subtitle="Backend engineer · Marathon-in-training"
            avatar={JORDAN_AVATAR}
            stats={[
              { value: '24', label: 'Streak' },
              { value: '5.4k', label: 'Calories' },
              { value: '3', label: 'PRs' },
            ]}
            actions={
              <XStack gap="$2">
                <OtfButton variant="primary" icon={<UserPlus size={16} />}>Follow</OtfButton>
                <OtfButton variant="outlined" icon={<MessageCircle size={16} />}>Message</OtfButton>
              </XStack>
            }
          />
        </HeaderFrame>
      </Section>
    </ShowcaseFrame>
  )
}
