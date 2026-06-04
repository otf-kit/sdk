import { Separator, SizableText, Slider, XStack, YStack } from 'tamagui'
import { ChevronRight } from '@tamagui/lucide-icons'
import { OtfSwitch } from '../primitives/OtfSwitch'

export type PreferenceItem =
  | { type: 'toggle'; id: string; title: string; description?: string; value: boolean; onValueChange: (v: boolean) => void }
  | { type: 'select'; id: string; title: string; description?: string; value: string; options: { label: string; value: string }[]; onValueChange: (v: string) => void }
  | { type: 'slider'; id: string; title: string; description?: string; value: number; min?: number; max?: number; onValueChange: (v: number) => void }
  | { type: 'action'; id: string; title: string; description?: string; onPress: () => void; destructive?: boolean }

export type PreferenceSection = {
  title: string
  description?: string
  items: PreferenceItem[]
}

export type UserPreferencesProps = {
  sections: PreferenceSection[]
}

function ItemLabel({ title, description, color }: { title: string; description?: string; color?: string }) {
  return (
    <YStack flex={1} gap="$1">
      <SizableText size="$4" fontWeight="500" color={color ?? '$color12'}>{title}</SizableText>
      {description && <SizableText size="$2" color="$color11">{description}</SizableText>}
    </YStack>
  )
}

function ToggleRow({ item }: { item: Extract<PreferenceItem, { type: 'toggle' }> }) {
  return (
    <XStack alignItems="center" gap="$3" paddingVertical="$3" paddingHorizontal="$4">
      <ItemLabel title={item.title} description={item.description} />
      <OtfSwitch size="$3" checked={item.value} onCheckedChange={item.onValueChange} />
    </XStack>
  )
}

function SelectRow({ item }: { item: Extract<PreferenceItem, { type: 'select' }> }) {
  const current = item.options.find(o => o.value === item.value)
  return (
    <XStack alignItems="center" gap="$3" paddingVertical="$3" paddingHorizontal="$4"
      pressStyle={{ backgroundColor: '$color3' }} animation="quick" cursor="pointer"
      onPress={() => {
        const idx = item.options.findIndex(o => o.value === item.value)
        const next = item.options[(idx + 1) % item.options.length]
        if (next) item.onValueChange(next.value)
      }}>
      <ItemLabel title={item.title} description={item.description} />
      <SizableText size="$3" color="$color11" fontWeight="500">{current?.label ?? item.value}</SizableText>
      <ChevronRight size={18} color="$color8" />
    </XStack>
  )
}

function SliderRow({ item }: { item: Extract<PreferenceItem, { type: 'slider' }> }) {
  const min = item.min ?? 0
  const max = item.max ?? 100
  return (
    <YStack gap="$2" paddingVertical="$3" paddingHorizontal="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <ItemLabel title={item.title} description={item.description} />
        <SizableText size="$3" fontWeight="600" color="$color11">{item.value}</SizableText>
      </XStack>
      <Slider value={[item.value]} min={min} max={max} step={1}
        onValueChange={([v]) => { if (v !== undefined) item.onValueChange(v) }}>
        <Slider.Track backgroundColor="$color4" height={4}>
          <Slider.TrackActive backgroundColor="$color9" />
        </Slider.Track>
        <Slider.Thumb index={0} size="$1.5" backgroundColor="$color9" borderWidth={0} circular />
      </Slider>
    </YStack>
  )
}

function ActionRow({ item }: { item: Extract<PreferenceItem, { type: 'action' }> }) {
  return (
    <XStack alignItems="center" gap="$3" paddingVertical="$3" paddingHorizontal="$4"
      pressStyle={{ backgroundColor: '$color3' }} animation="quick" cursor="pointer"
      onPress={item.onPress}>
      <ItemLabel title={item.title} description={item.description}
        color={item.destructive ? '$red10' : undefined} />
      <ChevronRight size={18} color="$color8" />
    </XStack>
  )
}

function PreferenceRow({ item }: { item: PreferenceItem }) {
  switch (item.type) {
    case 'toggle': return <ToggleRow item={item} />
    case 'select': return <SelectRow item={item} />
    case 'slider': return <SliderRow item={item} />
    case 'action': return <ActionRow item={item} />
  }
}

export function UserPreferences({ sections }: UserPreferencesProps) {
  return (
    <YStack gap="$5">
      {sections.map((section, si) => (
        <YStack key={si} gap="$2">
          <YStack paddingHorizontal="$1" gap="$0.5">
            <SizableText size="$2" fontWeight="600" color="$color11" textTransform="uppercase">
              {section.title}
            </SizableText>
            {section.description && (
              <SizableText size="$2" color="$color8">{section.description}</SizableText>
            )}
          </YStack>
          <YStack backgroundColor="$color2" borderRadius="$4" overflow="hidden"
            borderWidth={1} borderColor="$color4">
            {section.items.map((item, ii) => (
              <YStack key={item.id}>
                <PreferenceRow item={item} />
                {ii < section.items.length - 1 && <Separator borderColor="$color4" />}
              </YStack>
            ))}
          </YStack>
        </YStack>
      ))}
    </YStack>
  )
}
