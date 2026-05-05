import { useState } from 'react'
import {
  ChipsTabBar,
  YStack,
  SizableText,
  Home,
  Search,
  Heart,
  User,
  Compass,
  ShoppingBag,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

function FrameBox({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      height={220}
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      overflow="hidden"
      backgroundColor="$color2"
      position="relative"
    >
      {children}
    </YStack>
  )
}

export default function ChipsTabBarShowcase() {
  const [tab, setTab] = useState('home')
  const [tab2, setTab2] = useState('shop')

  const items = [
    { key: 'home', label: 'Home', icon: <Home size={16} color="currentColor" /> },
    { key: 'discover', label: 'Discover', icon: <Compass size={16} color="currentColor" /> },
    { key: 'saved', label: 'Saved', icon: <Heart size={16} color="currentColor" /> },
    { key: 'profile', label: 'Profile', icon: <User size={16} color="currentColor" /> },
  ]

  const shopItems = [
    { key: 'shop', label: 'Shop', icon: <ShoppingBag size={16} color="currentColor" /> },
    { key: 'search', label: 'Search', icon: <Search size={16} color="currentColor" /> },
    { key: 'fav', label: 'Favorites', icon: <Heart size={16} color="currentColor" /> },
    { key: 'me', label: 'Me', icon: <User size={16} color="currentColor" /> },
  ]

  return (
    <ShowcaseFrame
      title="Chips Tab Bar"
      description="Pill-shaped bottom tab bar — active tab shows label, inactive collapse to icon. Floats over content."
      docPath="packages/ui-native/src/patterns/ChipsTabBar.tsx"
    >
      <Section title="Default — collapse inactive labels" hint={`Active: ${tab}`}>
        <FrameBox>
          <YStack flex={1} alignItems="center" justifyContent="center">
            <SizableText size="$3" color="$color9">{tab} screen</SizableText>
          </YStack>
          <ChipsTabBar
            items={items.map((item) => ({
              ...item,
              active: item.key === tab,
              onPress: () => setTab(item.key),
            }))}
          />
        </FrameBox>
      </Section>

      <Section title="Always show labels">
        <FrameBox>
          <YStack flex={1} alignItems="center" justifyContent="center">
            <SizableText size="$3" color="$color9">{tab2} screen</SizableText>
          </YStack>
          <ChipsTabBar
            collapseInactiveLabel={false}
            items={shopItems.map((item) => ({
              ...item,
              active: item.key === tab2,
              onPress: () => setTab2(item.key),
            }))}
          />
        </FrameBox>
      </Section>

      <Section title="Custom accent">
        <FrameBox>
          <YStack flex={1} alignItems="center" justifyContent="center">
            <SizableText size="$3" color="$color9">Indigo accent</SizableText>
          </YStack>
          <ChipsTabBar
            accentColor="#6366f1"
            items={items.map((item) => ({
              ...item,
              active: item.key === 'discover',
              onPress: () => {},
            }))}
          />
        </FrameBox>
      </Section>
    </ShowcaseFrame>
  )
}
