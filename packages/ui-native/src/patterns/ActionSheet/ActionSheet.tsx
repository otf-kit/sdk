import { type ReactNode } from 'react'
import { Sheet, SizableText, XStack, YStack } from 'tamagui'

export type ActionSheetItem = { id: string; label: string; icon?: ReactNode; destructive?: boolean }
export type ActionSheetProps = {
  open: boolean; onOpenChange: (open: boolean) => void; title?: string
  items: ActionSheetItem[]; onSelect: (id: string) => void; cancelLabel?: string
  zIndex?: number
}

export function ActionSheet({ open, onOpenChange, title, items, onSelect, cancelLabel = 'Cancel', zIndex = 100_000 }: ActionSheetProps) {
  return (
    <Sheet
      modal
      forceRemoveScrollEnabled={open}
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[50]}
      dismissOnSnapToBottom
      zIndex={zIndex}
      animation="medium"
    >
      <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
      <Sheet.Handle />
      <Sheet.Frame>
        {title && <SizableText size="$3" color="$color8" textAlign="center" paddingTop="$3" paddingBottom="$1">{title}</SizableText>}
        <YStack paddingHorizontal="$3" paddingTop="$2">
          {items.map(item => (
            <XStack key={item.id} height={52} alignItems="center" gap="$3" paddingHorizontal="$3" borderRadius="$4"
              pressStyle={{ backgroundColor: '$color3' }} onPress={() => { onSelect(item.id); onOpenChange(false) }}>
              {item.icon && <SizableText size="$5">{item.icon}</SizableText>}
              <SizableText size="$5" flex={1} color={item.destructive ? '$red9' : '$color12'}
                fontWeight={item.destructive ? '600' : '400'}>{item.label}</SizableText>
            </XStack>
          ))}
        </YStack>
        <YStack paddingHorizontal="$3" paddingVertical="$3" borderTopWidth={1} borderTopColor="$borderColor" marginTop="$2">
          <XStack height={48} alignItems="center" justifyContent="center" borderRadius="$4"
            pressStyle={{ backgroundColor: '$color3' }} onPress={() => onOpenChange(false)}>
            <SizableText size="$5" fontWeight="600" color="$color9">{cancelLabel}</SizableText>
          </XStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}
