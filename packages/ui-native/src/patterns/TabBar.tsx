import { SizableText, XStack, YStack } from 'tamagui'

export type TabBarItem = { id: string; label: string; icon?: React.ReactNode }
export type TabBarProps = { tabs: TabBarItem[]; activeTab: string; onTabPress: (id: string) => void; showLabels?: boolean }

export function TabBar({ tabs, activeTab, onTabPress, showLabels = true }: TabBarProps) {
  return (
    <XStack height={56} borderTopWidth={1} borderTopColor="$borderColor" backgroundColor="$background" paddingBottom="$2">
      {tabs.map(tab => {
        const active = tab.id === activeTab
        return (
          <YStack key={tab.id} flex={1} alignItems="center" justifyContent="center" gap="$1"
            pressStyle={{ opacity: 0.6 }} onPress={() => onTabPress(tab.id)}>
            {tab.icon && <SizableText size="$5" color={active ? '$color9' : '$color8'}>{tab.icon}</SizableText>}
            {showLabels && <SizableText size="$1" color={active ? '$color9' : '$color8'} fontWeight={active ? '600' : '400'}>{tab.label}</SizableText>}
          </YStack>
        )
      })}
    </XStack>
  )
}
