import { useState, type ReactNode } from 'react'
import { Pressable, SizableText, View, XStack, YStack } from '@otf/ui-native'
import { CodeBlock } from './CodeBlock'

interface PreviewCodeTabsProps {
  /** Live preview content (existing showcase variants). */
  preview: ReactNode
  /** Code shown in the Code tab. Same string as `meta.usage`. */
  code: string
}

/**
 * Preview / Code tab toggle that wraps both panes in the same bordered
 * container. Matches shadcn/ui's docs pattern — the user toggles between
 * "see what it does" and "see what it costs in code".
 */
export function PreviewCodeTabs({ preview, code }: PreviewCodeTabsProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')

  return (
    <YStack gap="$3">
      <XStack gap="$1" borderBottomWidth={1} borderBottomColor="$borderColor">
        <Tab active={tab === 'preview'} onPress={() => setTab('preview')}>
          Preview
        </Tab>
        <Tab active={tab === 'code'} onPress={() => setTab('code')}>
          Code
        </Tab>
      </XStack>

      {tab === 'preview' ? (
        <View>{preview}</View>
      ) : (
        <CodeBlock code={code} language="tsx" />
      )}
    </YStack>
  )
}

interface TabProps {
  active: boolean
  onPress: () => void
  children: ReactNode
}

function Tab({ active, onPress, children }: TabProps) {
  return (
    <Pressable
      onPress={onPress}
      paddingHorizontal="$3"
      paddingVertical="$2.5"
      cursor="pointer"
      borderBottomWidth={2}
      borderBottomColor={active ? '$color12' : 'transparent'}
      marginBottom={-1}
      hoverStyle={{ borderBottomColor: active ? '$color12' : '$color8' }}
    >
      <SizableText
        size="$3"
        color={active ? '$color12' : '$color10'}
        fontWeight={active ? '600' : '400'}
      >
        {children}
      </SizableText>
    </Pressable>
  )
}
