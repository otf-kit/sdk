import React, { useCallback, useEffect, useState } from 'react'
import { styled, View, SizableText } from 'tamagui'
import { onToast, type NativeToastData } from './toast-emitter'

const typeColors = {
  success: '$green9',
  error: '$red9',
  warning: '$yellow9',
  info: '$blue9',
  default: '$color9',
} as const

const ToastCard = styled(View, {
  name: 'OtfToastCard',
  backgroundColor: '$color2',
  borderRadius: '$4',
  padding: '$3',
  borderLeftWidth: 3,
  borderLeftColor: '$color9',
  shadowColor: '$shadow2',
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 8,
  animation: 'quick',
  enterStyle: { opacity: 0, y: -20 },
  exitStyle: { opacity: 0, y: -20 },
  pressStyle: { opacity: 0.8 },
})

/**
 * NativeToaster — renders toast notifications in a fixed overlay.
 * Place once in your app root:
 *
 * ```tsx
 * <NativeToaster />
 * ```
 */
export function NativeToaster() {
  const [toasts, setToasts] = useState<NativeToastData[]>([])

  useEffect(() => {
    return onToast((t) => {
      setToasts((prev) => [...prev, t])
      // Auto-dismiss
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id))
      }, t.duration ?? 3000)
    })
  }, [])

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((x) => x.id !== id))
  }, [])

  if (toasts.length === 0) return null

  return (
    <View
      position="absolute"
      top={60}
      right={16}
      left={16}
      zIndex={9999}
      gap="$2"
      pointerEvents="box-none"
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} onPress={() => dismiss(t.id)}>
          <SizableText size="$4" fontWeight="600" color="$color12">
            {t.title}
          </SizableText>
          {t.description && (
            <SizableText size="$3" color="$color8" marginTop="$1">
              {t.description}
            </SizableText>
          )}
        </ToastCard>
      ))}
    </View>
  )
}
