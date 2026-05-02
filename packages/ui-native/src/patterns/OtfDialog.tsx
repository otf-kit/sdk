import React from 'react'
import { Dialog, Adapt, Sheet, Button, XStack, type GetProps } from 'tamagui'

export type OtfDialogProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title?: string
  description?: string
  children?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmTheme?: GetProps<typeof Button>['theme']
}

export function OtfDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  confirmTheme = 'active',
}: OtfDialogProps) {
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <Dialog.Trigger asChild>
          {trigger}
        </Dialog.Trigger>
      )}

      <Adapt when={"maxMd" as any} platform="touch">
        <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={['quick', { opacity: { overshootClamping: true } }]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          {title && <Dialog.Title>{title}</Dialog.Title>}
          {description && (
            <Dialog.Description size="$3" color="$color10">
              {description}
            </Dialog.Description>
          )}
          {children}
          {(onConfirm || onCancel) && (
            <XStack justifyContent="flex-end" gap="$3">
              {onCancel && (
                <Dialog.Close displayWhenAdapted asChild>
                  <Button variant="outlined" onPress={onCancel}>{cancelLabel}</Button>
                </Dialog.Close>
              )}
              {onConfirm && (
                <Dialog.Close displayWhenAdapted asChild>
                  <Button theme={confirmTheme} onPress={onConfirm}>{confirmLabel}</Button>
                </Dialog.Close>
              )}
            </XStack>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
