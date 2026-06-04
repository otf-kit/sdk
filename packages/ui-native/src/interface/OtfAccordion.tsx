import { type ReactNode, useState } from 'react'
import { Separator, YStack } from 'tamagui'
import { Expandable } from '../patterns/Expandable'

export type OtfAccordionItem = { id: string; title: string; content: ReactNode }
export type OtfAccordionProps = {
  items: OtfAccordionItem[]
  defaultOpen?: string[]
  allowMultiple?: boolean
}

/**
 * List-of-items disclosure container. Owns the single-open / multi-open map and
 * the separators; delegates each row's header layout, rotating Lucide chevron,
 * and smooth measured-height + opacity reveal to the `Expandable` primitive — so
 * the motion lives in exactly one place. (Previously this rendered unicode
 * ⌃/⌄ glyphs and toggled the body with no animation.)
 */
export function OtfAccordion({ items, defaultOpen, allowMultiple = false }: OtfAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen ?? [])
  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id)
      return allowMultiple ? [...prev, id] : [id]
    })
  }
  return (
    <YStack>
      {items.map((item, index) => (
        <YStack key={item.id}>
          {index > 0 && <Separator borderColor="$borderColor" />}
          <Expandable
            title={item.title}
            expanded={openIds.includes(item.id)}
            onToggle={() => toggle(item.id)}
          >
            {item.content}
          </Expandable>
        </YStack>
      ))}
    </YStack>
  )
}
