import { useState } from 'react'
import { Check, Copy } from '@tamagui/lucide-icons'
import { Pressable, SizableText, View, XStack, YStack } from '@otf/ui-native'

interface InstallBlockProps {
  /** Single command (no leading $), e.g. "bun add @otf/ui-native". */
  command: string
  /** Optional alternate package managers — adds tab switcher. Default omitted. */
  alternatives?: { label: string; command: string }[]
}

/**
 * Terminal-style install command + copy button. Mirrors shadcn/ui's pattern.
 * On hover the copy button surfaces; click → checkmark for 1.5s.
 *
 * If `alternatives` is provided, renders a small tab bar with [bun | pnpm |
 * npm | yarn]. Default tab is the primary `command`.
 */
export function InstallBlock({ command, alternatives }: InstallBlockProps) {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const tabs = [{ label: 'bun', command }, ...(alternatives ?? [])]
  const current = tabs[active] ?? tabs[0]!
  const cmd = current.command

  const onCopy = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(cmd)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch {
        /* ignore */
      }
    }
  }

  return (
    <YStack
      borderRadius={12}
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$backgroundStrong"
      overflow="hidden"
    >
      {tabs.length > 1 ? (
        <XStack
          paddingHorizontal="$2"
          paddingVertical="$2"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
          gap="$1"
        >
          {tabs.map((t, i) => (
            <Pressable
              key={t.label}
              onPress={() => {
                setActive(i)
                setCopied(false)
              }}
              paddingHorizontal="$3"
              paddingVertical="$1.5"
              borderRadius={8}
              cursor="pointer"
              backgroundColor={i === active ? '$color5' : 'transparent'}
              hoverStyle={{ backgroundColor: i === active ? '$color5' : '$color3' }}
            >
              <SizableText
                size="$2"
                color={i === active ? '$color12' : '$color10'}
                fontFamily="$mono"
              >
                {t.label}
              </SizableText>
            </Pressable>
          ))}
        </XStack>
      ) : null}
      <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        gap="$3"
        alignItems="center"
        position="relative"
      >
        <SizableText size="$3" color="$color10" fontFamily="$mono" userSelect="none">
          $
        </SizableText>
        <View flex={1}>
          <SizableText size="$3" color="$color12" fontFamily="$mono">
            {cmd}
          </SizableText>
        </View>
        <Pressable
          onPress={onCopy}
          width={28}
          height={28}
          borderRadius={6}
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          pressStyle={{ opacity: 0.7 }}
          hoverStyle={{ borderColor: '$color8' }}
        >
          {copied ? <Check size={14} color="$green10" /> : <Copy size={14} color="$color10" />}
        </Pressable>
      </XStack>
    </YStack>
  )
}
