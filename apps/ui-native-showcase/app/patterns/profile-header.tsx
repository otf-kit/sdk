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

const SARAH_AVATAR =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face'
const ALEX_AVATAR =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=face'

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
      description="Avatar + name + meta + stats + actions. Used at the top of profile, settings, and account screens."
      docPath="packages/ui-native/src/patterns/ProfileHeader.tsx"
    >
      <Section title="Default — avatar + subtitle">
        <HeaderFrame>
          <ProfileHeader
            name="Sarah Chen"
            subtitle="Member since 2024"
            avatar={SARAH_AVATAR}
          />
        </HeaderFrame>
      </Section>

      <Section title="With stats">
        <HeaderFrame>
          <ProfileHeader
            name="Alex Rivera"
            subtitle="Coach — Strength &amp; Conditioning"
            avatar={ALEX_AVATAR}
            stats={[
              { value: '128', label: 'Workouts' },
              { value: '42', label: 'Plans' },
              { value: '1.2k', label: 'Followers' },
            ]}
          />
        </HeaderFrame>
      </Section>

      <Section title="With actions" hint="primary + secondary CTAs">
        <HeaderFrame>
          <ProfileHeader
            name="Jordan Kim"
            subtitle="Marathon-in-training"
            avatar={SARAH_AVATAR}
            stats={[
              { value: '24', label: 'Streak' },
              { value: '5.4k', label: 'Calories' },
              { value: '3', label: 'PRs' },
            ]}
            actions={
              <XStack gap="$2">
                <OtfButton variant="primary" icon={<UserPlus size={16} />}>
                  Follow
                </OtfButton>
                <OtfButton variant="outlined" icon={<MessageCircle size={16} />}>
                  Message
                </OtfButton>
              </XStack>
            }
          />
        </HeaderFrame>
      </Section>

      <Section title="Initials fallback" hint="no avatar URL provided">
        <HeaderFrame>
          <ProfileHeader
            name="Riley Park"
            subtitle="Pro plan"
            stats={[
              { value: '89', label: 'Sessions' },
              { value: '12', label: 'Badges' },
            ]}
          />
        </HeaderFrame>
      </Section>

      <Section title="Compact — just name + actions">
        <HeaderFrame>
          <ProfileHeader
            name="Sam Patel"
            avatar={ALEX_AVATAR}
            actions={
              <OtfButton variant="outlined" icon={<Settings size={16} />}>
                Edit profile
              </OtfButton>
            }
          />
        </HeaderFrame>
      </Section>

      <Section title="Verbose — bio + stats + actions">
        <HeaderFrame>
          <ProfileHeader
            name="Morgan Reyes"
            subtitle="Ultra runner — building toward 100mi"
            avatar={SARAH_AVATAR}
            stats={[
              { value: '312', label: 'Miles' },
              { value: '18', label: 'Weeks' },
              { value: '92%', label: 'Adherence' },
            ]}
            actions={
              <XStack gap="$2">
                <OtfButton variant="primary">Follow</OtfButton>
                <OtfButton variant="outlined">Share</OtfButton>
              </XStack>
            }
          />
          <YStack paddingHorizontal="$4" paddingBottom="$4">
            <SizableText size="$3" color="$color11" textAlign="center">
              Coach + athlete based in Boulder. Programming long-distance run blocks
              with strength accessory work. Active here every morning.
            </SizableText>
          </YStack>
        </HeaderFrame>
      </Section>
    </ShowcaseFrame>
  )
}
