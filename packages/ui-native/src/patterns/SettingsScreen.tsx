import { Separator, SizableText, XStack, YStack } from 'tamagui'
import { ChevronRight } from '@tamagui/lucide-icons'
import { OtfSwitch } from '../primitives/OtfSwitch'
import type { ReactNode } from 'react'

export type SettingsItem = {
  id: string
  icon?: ReactNode
  title: string
  subtitle?: string
  right?: ReactNode
  onPress?: () => void
  type?: 'navigate' | 'toggle'
  value?: boolean
  onValueChange?: (value: boolean) => void
}

export type SettingsSection = {
  title?: string
  items: SettingsItem[]
}

export type SettingsScreenProps = {
  sections: SettingsSection[]
  header?: ReactNode
}

function SettingsItemRow({ item }: { item: SettingsItem }) {
  return (
    <XStack
      alignItems="center"
      gap="$3"
      paddingVertical="$3"
      paddingHorizontal="$4"
      hoverStyle={item.onPress ? { backgroundColor: '$color2' } : undefined}
      pressStyle={item.onPress ? { backgroundColor: '$color3' } : undefined}
      onPress={item.onPress}
      cursor={item.onPress ? 'pointer' : undefined}
    >
      {item.icon && (
        <YStack width={24} alignItems="center">
          {item.icon}
        </YStack>
      )}
      <YStack flex={1} gap="$1">
        <SizableText size="$4" fontWeight="500">
          {item.title}
        </SizableText>
        {item.subtitle && (
          <SizableText size="$2" color="$color11">
            {item.subtitle}
          </SizableText>
        )}
      </YStack>
      {item.type === 'toggle' ? (
        <OtfSwitch size="$3" checked={item.value} onCheckedChange={item.onValueChange} />
      ) : item.right ? (
        item.right
      ) : (
        item.onPress && (
          <ChevronRight size={18} color="$color8" />
        )
      )}
    </XStack>
  )
}

export function SettingsScreen({ sections, header }: SettingsScreenProps) {
  return (
    <YStack flex={1} backgroundColor="$background">
      {header}
      <YStack gap="$4" paddingVertical="$2">
        {sections.map((section, si) => (
          <YStack key={si}>
            {section.title && (
              <SizableText
                size="$2"
                fontWeight="600"
                color="$color11"
                paddingHorizontal="$4"
                paddingBottom="$2"
                textTransform="uppercase"
              >
                {section.title}
              </SizableText>
            )}
            <YStack backgroundColor="$color1" borderRadius="$4" marginHorizontal="$3" overflow="hidden">
              {section.items.map((item, ii) => (
                <YStack key={item.id}>
                  <SettingsItemRow item={item} />
                  {ii < section.items.length - 1 && (
                    <Separator borderColor="$color3" marginLeft="$12" />
                  )}
                </YStack>
              ))}
            </YStack>
          </YStack>
        ))}
      </YStack>
    </YStack>
  )
}
