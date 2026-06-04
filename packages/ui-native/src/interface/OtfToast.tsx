import { useState, useCallback, useEffect, createContext, useContext, type ReactNode, type ComponentType } from 'react'
import { SizableText, XStack, YStack } from 'tamagui'
import { Check, X, Info, AlertTriangle } from '@tamagui/lucide-icons'

type LucideIcon = ComponentType<{ size?: number; color?: string }>

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

const variantStyles: Record<OtfToastVariant, { bg: string; border: string; icon: LucideIcon; iconColor: string }> = {
  default: { bg: '$color3', border: '$color6', icon: Info, iconColor: '$color11' },
  success: { bg: '$green2', border: '$green7', icon: Check, iconColor: '$green10' },
  error: { bg: '$red2', border: '$red7', icon: X, iconColor: '$red10' },
  warning: { bg: '$yellow2', border: '$yellow7', icon: AlertTriangle, iconColor: '$yellow10' },
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
          const Icon = style.icon
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
              <XStack marginTop="$0.5">
                <Icon size={16} color={style.iconColor} />
              </XStack>
              <YStack flex={1} gap="$1">
                <SizableText size="$4" fontWeight="600" color="$color12">{t.title}</SizableText>
                {t.message && (
                  <SizableText size="$3" color="$color11">{t.message}</SizableText>
                )}
              </YStack>
              <XStack
                pressStyle={{ opacity: 0.5 }}
                onPress={() => dismiss(t.id)}
                cursor="pointer"
                marginTop="$0.5"
              >
                <X size={16} color="$color11" />
              </XStack>
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
