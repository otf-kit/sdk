import { useState } from 'react'
import { ScrollView } from 'react-native'
import { SizableText, XStack, YStack } from 'tamagui'

export type OtfTabItem = { key: string; label: string }
export type OtfTabsProps = {
  tabs: OtfTabItem[]
  activeTab?: string
  onTabChange?: (key: string) => void
  variant?: 'underline' | 'pill'
}

export function OtfTabs({ tabs, activeTab, onTabChange, variant = 'underline' }: OtfTabsProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.key ?? '')
  const current = activeTab ?? internalActive
  const handlePress = (key: string) => {
    if (!activeTab) setInternalActive(key)
    onTabChange?.(key)
  }
  return (
    <YStack>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$2" paddingHorizontal="$2" paddingBottom="$2">
          {tabs.map(tab => {
            const isActive = tab.key === current
            return (
              <YStack
                key={tab.key}
                paddingVertical="$2" paddingHorizontal="$3"
                borderRadius={variant === 'pill' ? '$4' : '$0'}
                backgroundColor={variant === 'pill' && isActive ? '$color9' : 'transparent'}
                borderBottomWidth={variant === 'underline' ? 2 : 0}
                borderBottomColor={variant === 'underline' && isActive ? '$color9' : 'transparent'}
                pressStyle={{ opacity: 0.7 }} onPress={() => handlePress(tab.key)} cursor="pointer"
              >
                <SizableText
                  size="$3" fontWeight={isActive ? '600' : '400'}
                  color={variant === 'pill' && isActive ? '$color1' : isActive ? '$color12' : '$color10'}
                >
                  {tab.label}
                </SizableText>
              </YStack>
            )
          })}
        </XStack>
      </ScrollView>
    </YStack>
  )
}
