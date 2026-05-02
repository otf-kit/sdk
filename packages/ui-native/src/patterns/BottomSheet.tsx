import { type ReactNode } from 'react'
import { Sheet, SizableText, XStack, YStack } from 'tamagui'
import { ScrollView } from 'react-native'

export type BottomSheetProps = {
  open: boolean; onOpenChange: (open: boolean) => void; title?: string; children: ReactNode
  snapPoints?: number[]; dismissOnSnapToBottom?: boolean; showHandle?: boolean; showClose?: boolean
  zIndex?: number
}

export function BottomSheet({ open, onOpenChange, title, children, snapPoints = [85], dismissOnSnapToBottom = true, showHandle = true, showClose = false, zIndex = 100_000 }: BottomSheetProps) {
  return (
    <Sheet
      modal
      forceRemoveScrollEnabled={open}
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      dismissOnSnapToBottom={dismissOnSnapToBottom}
      zIndex={zIndex}
      animation="medium"
    >
      <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
      {showHandle && <Sheet.Handle />}
      <Sheet.Frame>
        {(title || showClose) && (
          <XStack paddingHorizontal="$4" paddingTop="$3" paddingBottom="$2" alignItems="center" justifyContent="space-between">
            <SizableText size="$6" fontWeight="600" flexShrink={1}>{title}</SizableText>
            {showClose && (
              <XStack width={28} height={28} borderRadius="$10" backgroundColor="$color4" alignItems="center" justifyContent="center"
                pressStyle={{ opacity: 0.7 }} onPress={() => onOpenChange(false)}>
                <SizableText size="$3" color="$color10" fontWeight="600">{'\u2715'}</SizableText>
              </XStack>
            )}
          </XStack>
        )}
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <YStack padding="$4">{children}</YStack>
        </ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}
