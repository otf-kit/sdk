import { useState } from 'react'
import { OtfTabs, SizableText, YStack } from '@otfdashkit/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

const PROFILE_TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'activity', label: 'Activity' },
  { key: 'settings', label: 'Settings' },
] as const

const PANEL_COPY: Record<string, string> = {
  overview: 'Member since 2024 · 142 sessions logged · 3 active goals.',
  activity: 'Latest run: 5.2km at a 5:14 / km pace. 12 day streak.',
  settings: 'Notifications, units, and connected apps live in this panel.',
}

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'mentions', label: 'Mentions' },
  { key: 'archived', label: 'Archived' },
] as const

export default function TabsShowcase() {
  const [profileTab, setProfileTab] = useState<string>('overview')
  const [filterTab, setFilterTab] = useState<string>('all')

  return (
    <ShowcaseFrame
      title="Tabs"
      description="Switch between content panels with a header strip. Underline by default; pill variant for compact filter bars."
      docPath="packages/ui-native/src/interface/OtfTabs.tsx"
    >
      <Section title="Underline variant" hint={`Active: ${profileTab}`}>
        <YStack gap="$3">
          <OtfTabs
            tabs={[...PROFILE_TABS]}
            activeTab={profileTab}
            onTabChange={setProfileTab}
          />
          <YStack
            padding="$3"
            borderRadius="$3"
            backgroundColor="$color2"
            borderWidth={1}
            borderColor="$borderColor"
          >
            <SizableText size="$3" color="$color12">
              {PANEL_COPY[profileTab]}
            </SizableText>
          </YStack>
        </YStack>
      </Section>

      <Section title="Pill variant" hint={`Active: ${filterTab}`}>
        <OtfTabs
          tabs={[...FILTER_TABS]}
          activeTab={filterTab}
          onTabChange={setFilterTab}
          variant="pill"
        />
      </Section>

      <Section title="Uncontrolled" hint="No activeTab passed — internal state">
        <OtfTabs tabs={[...PROFILE_TABS]} />
      </Section>

      <Section title="Many tabs — horizontal scroll">
        <OtfTabs
          tabs={[
            { key: 'a', label: 'Inbox' },
            { key: 'b', label: 'Snoozed' },
            { key: 'c', label: 'Sent' },
            { key: 'd', label: 'Drafts' },
            { key: 'e', label: 'Spam' },
            { key: 'f', label: 'Trash' },
            { key: 'g', label: 'All mail' },
          ]}
          variant="pill"
        />
      </Section>
    </ShowcaseFrame>
  )
}
