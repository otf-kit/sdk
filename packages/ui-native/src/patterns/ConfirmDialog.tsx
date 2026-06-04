import type { ReactNode } from 'react'
import { AlertDialog, Button, SizableText, XStack, YStack } from 'tamagui'

export type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  destructive?: boolean
  icon?: ReactNode
}

export function ConfirmDialog({
  open, onOpenChange, title, description,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  onConfirm, onCancel, destructive = false, icon,
}: ConfirmDialogProps) {
  const handleCancel = () => { onCancel?.(); onOpenChange(false) }
  const handleConfirm = () => { onConfirm?.(); onOpenChange(false) }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay key="overlay" opacity={0.5}
          enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} animation="quick" />
        <AlertDialog.Content key="content" bordered elevate width="90%" maxWidth={400}
          enterStyle={{ y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ y: 10, opacity: 0, scale: 0.95 }}
          x={0} y={0} scale={1} opacity={1} animation="quick">
          <YStack gap="$4" padding="$4">
            {icon && <YStack alignItems="center">{icon}</YStack>}
            <YStack gap="$2" alignItems={icon ? 'center' : 'flex-start'}>
              <AlertDialog.Title size="$6" fontWeight="700">{title}</AlertDialog.Title>
              {description && (
                <AlertDialog.Description size="$3" color="$color11"
                  textAlign={icon ? 'center' : 'left'}>
                  {description}
                </AlertDialog.Description>
              )}
            </YStack>
            <XStack gap="$3" justifyContent="flex-end">
              <Button flex={1} size="$4" borderRadius="$4" variant="outlined"
                borderColor="$color7" onPress={handleCancel}
                pressStyle={{ opacity: 0.7 }} animation="quick">
                <SizableText fontWeight="600">{cancelLabel}</SizableText>
              </Button>
              <Button flex={1} size="$4" borderRadius="$4"
                backgroundColor={destructive ? '$red9' : '$color9'}
                onPress={handleConfirm}
                pressStyle={{ backgroundColor: destructive ? '$red8' : '$color8', scale: 0.97 }}
                animation="quick">
                <SizableText fontWeight="600" color="white">{confirmLabel}</SizableText>
              </Button>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}
