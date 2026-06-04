import type { ReactNode } from 'react'
import { Button, Circle, SizableText, XStack, YStack } from 'tamagui'

export type ImmersiveMediaAction = {
  id: string
  label?: string
  value?: string
  icon?: ReactNode
  onPress?: () => void
}

export type ImmersiveMediaScreenProps = {
  variant?: 'story' | 'reel' | 'sheet'
  media: ReactNode
  title?: string
  subtitle?: string
  topLeft?: ReactNode
  topCenter?: ReactNode
  topRight?: ReactNode
  actions?: ImmersiveMediaAction[]
  bottomMeta?: ReactNode
  inputPlaceholder?: string
  onInputPress?: () => void
  sheetContent?: ReactNode
}

export function ImmersiveMediaScreen({
  variant = 'reel',
  media,
  title,
  subtitle,
  topLeft,
  topCenter,
  topRight,
  actions = [],
  bottomMeta,
  inputPlaceholder,
  onInputPress,
  sheetContent,
}: ImmersiveMediaScreenProps) {
  const showSheet = variant === 'sheet'
  return (
    <YStack flex={1} backgroundColor="$color1">
      <YStack flex={1} position="relative">
        {media}
        <XStack position="absolute" top="$5" left="$4" right="$4" justifyContent="space-between" alignItems="center">
          <XStack minWidth={56}>{topLeft}</XStack>
          <YStack alignItems="center" flex={1}>{topCenter}</YStack>
          <XStack minWidth={56} justifyContent="flex-end">{topRight}</XStack>
        </XStack>
        {actions.length > 0 ? (
          <YStack position="absolute" right="$3" bottom={showSheet ? '$20' : '$10'} gap="$3" alignItems="center">
            {actions.map((action) => (
              <YStack key={action.id} gap="$1" alignItems="center" onPress={action.onPress}>
                <YStack
                  width={44}
                  height={44}
                  borderRadius="$10"
                  backgroundColor="rgba(0,0,0,0.55)"
                  alignItems="center"
                  justifyContent="center"
                >
                  {action.icon ?? <Circle size={8} backgroundColor="white" />}
                </YStack>
                {action.value ? <SizableText size="$2" color="white">{action.value}</SizableText> : null}
                {action.label ? <SizableText size="$1" color="rgba(255,255,255,0.8)">{action.label}</SizableText> : null}
              </YStack>
            ))}
          </YStack>
        ) : null}
        <YStack position="absolute" left="$4" right="$4" bottom={showSheet ? '$20' : '$6'} gap="$2">
          {title ? <SizableText size="$6" fontWeight="800" color="white">{title}</SizableText> : null}
          {subtitle ? <SizableText size="$3" color="rgba(255,255,255,0.82)">{subtitle}</SizableText> : null}
          {bottomMeta}
          {variant === 'story' && inputPlaceholder ? (
            <XStack
              onPress={onInputPress}
              alignItems="center"
              paddingHorizontal="$4"
              paddingVertical="$3"
              borderRadius="$10"
              backgroundColor="rgba(255,255,255,0.14)"
              borderWidth={1}
              borderColor="rgba(255,255,255,0.25)"
            >
              <SizableText size="$3" color="rgba(255,255,255,0.82)">
                {inputPlaceholder}
              </SizableText>
            </XStack>
          ) : null}
        </YStack>
      </YStack>
      {showSheet ? (
        <YStack padding="$4" gap="$3" backgroundColor="$background" borderTopLeftRadius="$8" borderTopRightRadius="$8" marginTop={-18}>
          <XStack alignSelf="center" width={48} height={5} borderRadius="$10" backgroundColor="$color5" />
          {sheetContent}
          {inputPlaceholder ? (
            <Button size="$5" backgroundColor="$color9" color="$color1" onPress={onInputPress}>
              {inputPlaceholder}
            </Button>
          ) : null}
        </YStack>
      ) : null}
    </YStack>
  )
}
