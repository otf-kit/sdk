import { type ReactNode, useState } from 'react'
import { Separator, SizableText, XStack, YStack } from 'tamagui'

export type OtfAccordionItem = { id: string; title: string; content: ReactNode }
export type OtfAccordionProps = {
  items: OtfAccordionItem[]
  defaultOpen?: string[]
  allowMultiple?: boolean
}

export function OtfAccordion({ items, defaultOpen, allowMultiple = false }: OtfAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen ?? [])
  const toggle = (id: string) => {
    setOpenIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id)
      return allowMultiple ? [...prev, id] : [id]
    })
  }
  return (
    <YStack>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id)
        return (
          <YStack key={item.id}>
            {index > 0 && <Separator borderColor="$borderColor" />}
            <XStack
              paddingVertical="$3" paddingHorizontal="$2"
              justifyContent="space-between" alignItems="center"
              pressStyle={{ opacity: 0.7 }} onPress={() => toggle(item.id)} cursor="pointer"
            >
              <SizableText size="$4" fontWeight="600">{item.title}</SizableText>
              <SizableText size="$3" color="$color10">{isOpen ? '\u2303' : '\u2304'}</SizableText>
            </XStack>
            {isOpen && <YStack paddingHorizontal="$2" paddingBottom="$3">{item.content}</YStack>}
          </YStack>
        )
      })}
    </YStack>
  )
}
