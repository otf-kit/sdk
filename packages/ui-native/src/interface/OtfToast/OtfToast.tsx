import { useState, useCallback, useEffect, createContext, useContext, type ReactNode } from 'react'
import { SizableText, XStack, YStack } from 'tamagui'

export type OtfToastVariant = 'default' | 'success' | 'error' | 'warning'
export type OtfToastData = {
  id: string; title: string; message?: string
  variant?: OtfToastVariant; duration?: number
}
export type OtfToastOptions = { message?: string; variant?: OtfToastVariant; duration?: number }
export type OtfToastContextType = {
  show: (title: string, options?: OtfToastOptions) => void
}

const ToastContext = createContext<OtfToastContextType | null>(null)

const variantStyles: Record<OtfToastVariant, { bg: string; border: string; icon: string }> = {
  default: { bg: '$color3', border: '$color6', icon: 'ℹ' },
  success: { bg: '$green2', border: '$green7', icon: '✓' },
  error: { bg: '$red2', border: '$red7', icon: '✕' },
  warning: { bg: '$yellow2', border: '$yellow7', icon: '!' },
}

let globalToastShow: OtfToastContextType['show'] | null = null

export const toast = (title: string, options?: OtfToastOptions | OtfToastVariant) => {
  const opts: OtfToastOptions | undefined = typeof options === 'string' ? { variant: options } : options
  if (globalToastShow) globalToastShow(title, opts)
  else console.warn('OtfToastProvider not mounted')
}

export function OtfToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<OtfToastData[]>([])

  const show = useCallback((title: string, options?: OtfToastOptions) => {
    const id = Math.random().toString(36).slice(2, 9)
    const entry: OtfToastData = {
      id, title,
      message: options?.message,
      variant: options?.variant ?? 'default',
      duration: options?.duration ?? 3000,
    }
    setToasts(prev => [...prev, entry])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), entry.duration)
  }, [])

  useEffect(() => { globalToastShow = show; return () => { globalToastShow = null } }, [show])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <YStack
        position="absolute" top={50} left={0} right={0}
        alignItems="center" gap="$2" pointerEvents="box-none" zIndex={100000}
        paddingHorizontal="$4"
      >
        {toasts.map(t => {
          const style = variantStyles[t.variant ?? 'default']
          return (
            <XStack
              key={t.id}
              width="100%"
              maxWidth={400}
              backgroundColor={style.bg}
              borderWidth={1}
              borderColor={style.border}
              borderRadius="$4"
              paddingHorizontal="$4"
              paddingVertical="$3"
              gap="$3"
              alignItems="flex-start"
              enterStyle={{ opacity: 0, y: -20, scale: 0.95 }}
              exitStyle={{ opacity: 0, y: -20, scale: 0.95 }}
              opacity={1}
              y={0}
              scale={1}
              animation="quick"
              pointerEvents="auto"
              elevation={4}
            >
              <SizableText size="$4" fontWeight="700" marginTop="$0.5">{style.icon}</SizableText>
              <YStack flex={1} gap="$1">
                <SizableText size="$4" fontWeight="600" color="$color12">{t.title}</SizableText>
                {t.message && (
                  <SizableText size="$3" color="$color10">{t.message}</SizableText>
                )}
              </YStack>
              <SizableText
                size="$3" color="$color8" fontWeight="600"
                pressStyle={{ opacity: 0.5 }}
                onPress={() => dismiss(t.id)}
                cursor="pointer"
                marginTop="$0.5"
              >
                ✕
              </SizableText>
            </XStack>
          )
        })}
      </YStack>
    </ToastContext.Provider>
  )
}

export function useOtfToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useOtfToast must be used within OtfToastProvider')
  return ctx
}
