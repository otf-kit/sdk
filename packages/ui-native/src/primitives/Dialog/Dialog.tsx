import { Dialog as TamaguiDialog, Adapt, Sheet, type DialogProps } from 'tamagui'
import { YStack, Text, type YStackProps, type TextProps } from 'tamagui'
import type { ReactNode } from 'react'

export interface DialogContentProps extends YStackProps {
  children?: ReactNode
}

export interface DialogTitleProps extends TextProps {
  children?: ReactNode
}

export interface DialogDescriptionProps extends TextProps {
  children?: ReactNode
}

export function DialogTitle({ children, ...props }: DialogTitleProps) {
  return (
    <Text fontSize="$6" fontWeight="700" color="$color12" {...props}>
      {children}
    </Text>
  )
}

export function DialogDescription({ children, ...props }: DialogDescriptionProps) {
  return (
    <Text fontSize="$3" color="$color11" lineHeight="$4" {...props}>
      {children}
    </Text>
  )
}

export function DialogContent({ children, ...props }: DialogContentProps) {
  return (
    <TamaguiDialog.Portal>
      <TamaguiDialog.Overlay
        key="overlay"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <TamaguiDialog.Content
        bordered
        elevate
        key="content"
        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        x={0}
        scale={1}
        opacity={1}
        y={0}
        width="90%"
        maxWidth={420}
        borderRadius="$4"
        padding="$5"
        backgroundColor="$background"
      >
        <Adapt when="sm" platform="touch">
          <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
            <Sheet.Frame padding="$5">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>
        <YStack gap="$3" {...props}>
          {children}
        </YStack>
      </TamaguiDialog.Content>
    </TamaguiDialog.Portal>
  )
}

export { TamaguiDialog as Dialog }
export type { DialogProps }
