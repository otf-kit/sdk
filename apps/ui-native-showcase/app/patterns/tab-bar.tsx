import { useState } from 'react'
import {
  TabBar,
  YStack,
  XStack,
  SizableText,
  Home,
  Search,
  Bell,
  User,
  Activity,
  Compass,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

function TabBarFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$4"
      overflow="hidden"
      backgroundColor="$background"
    >
      {children}
    </YStack>
  )
}

export default function TabBarShowcase() {
  const [primary, setPrimary] = useState('home')
  const [withBadges, setWithBadges] = useState('inbox')
  const [iconsOnly, setIconsOnly] = useState('home')

  return (
    <ShowcaseFrame
      title="Tab Bar"
      description="Floating bottom navigator. Three to four tabs, active state, optional badges, label-on / icon-only modes."
      docPath="packages/ui-native/src/patterns/TabBar.tsx"
    >
      <Section title="Default — 4 tabs" hint={`Active: ${primary}`}>
        <TabBarFrame>
          <YStack height={120} alignItems="center" justifyContent="center">
            <SizableText size="$3" color="$color11">
              Body content for {primary}
            </SizableText>
          </YStack>
          <TabBar
            tabs={[
              { id: 'home', label: 'Home', icon: <Home size={20} /> },
              { id: 'discover', label: 'Discover', icon: <Compass size={20} /> },
              { id: 'activity', label: 'Activity', icon: <Activity size={20} /> },
              { id: 'profile', label: 'Profile', icon: <User size={20} /> },
            ]}
            activeTab={primary}
            onTabPress={setPrimary}
          />
        </TabBarFrame>
      </Section>

      <Section title="With badges" hint={`Active: ${withBadges}`}>
        <TabBarFrame>
          <YStack height={120} alignItems="center" justifyContent="center">
            <SizableText size="$3" color="$color11">
              Inbox + alerts surface unread counts via the icon badge.
            </SizableText>
          </YStack>
          <TabBar
            tabs={[
              { id: 'home', label: 'Home', icon: <Home size={20} /> },
              {
                id: 'inbox',
                label: 'Inbox',
                icon: (
                  <YStack>
                    <Bell size={20} />
                    <YStack
                      position="absolute"
                      top={-4}
                      right={-6}
                      minWidth={16}
                      height={16}
                      borderRadius={8}
                      backgroundColor="$red9"
                      paddingHorizontal={4}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <SizableText size="$1" color="white" fontWeight="700">
                        3
                      </SizableText>
                    </YStack>
                  </YStack>
                ),
              },
              {
                id: 'activity',
                label: 'Activity',
                icon: (
                  <YStack>
                    <Activity size={20} />
                    <YStack
                      position="absolute"
                      top={-3}
                      right={-3}
                      width={8}
                      height={8}
                      borderRadius={4}
                      backgroundColor="$red9"
                    />
                  </YStack>
                ),
              },
              { id: 'profile', label: 'Profile', icon: <User size={20} /> },
            ]}
            activeTab={withBadges}
            onTabPress={setWithBadges}
          />
        </TabBarFrame>
      </Section>

      <Section title="3 tabs" hint="minimal nav">
        <TabBarFrame>
          <YStack height={80} />
          <TabBar
            tabs={[
              { id: 'feed', label: 'Feed', icon: <Home size={20} /> },
              { id: 'search', label: 'Search', icon: <Search size={20} /> },
              { id: 'me', label: 'Me', icon: <User size={20} /> },
            ]}
            activeTab="feed"
            onTabPress={() => {}}
          />
        </TabBarFrame>
      </Section>

      <Section title="Icons only" hint={`Active: ${iconsOnly}`}>
        <TabBarFrame>
          <YStack height={80} />
          <TabBar
            tabs={[
              { id: 'home', label: 'Home', icon: <Home size={22} /> },
              { id: 'discover', label: 'Discover', icon: <Compass size={22} /> },
              { id: 'activity', label: 'Activity', icon: <Activity size={22} /> },
              { id: 'profile', label: 'Profile', icon: <User size={22} /> },
            ]}
            activeTab={iconsOnly}
            onTabPress={setIconsOnly}
            showLabels={false}
          />
        </TabBarFrame>
      </Section>

      <Section title="Stacked content + active tab">
        <TabBarFrame>
          <XStack
            paddingHorizontal="$4"
            paddingVertical="$3"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
          >
            <SizableText size="$5" fontWeight="700">
              {primary === 'home'
                ? 'Today'
                : primary === 'discover'
                  ? 'Discover'
                  : primary === 'activity'
                    ? 'Activity'
                    : 'Profile'}
            </SizableText>
          </XStack>
          <YStack height={140} padding="$4" gap="$2">
            <SizableText size="$3" color="$color12">
              Tab content swaps with the bar selection.
            </SizableText>
            <SizableText size="$2" color="$color11">
              Tap the icons below to update both the title bar and this body.
            </SizableText>
          </YStack>
          <TabBar
            tabs={[
              { id: 'home', label: 'Home', icon: <Home size={20} /> },
              { id: 'discover', label: 'Discover', icon: <Compass size={20} /> },
              { id: 'activity', label: 'Activity', icon: <Activity size={20} /> },
              { id: 'profile', label: 'Profile', icon: <User size={20} /> },
            ]}
            activeTab={primary}
            onTabPress={setPrimary}
          />
        </TabBarFrame>
      </Section>
    </ShowcaseFrame>
  )
}
