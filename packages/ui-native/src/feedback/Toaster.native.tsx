import { useState, useEffect, useRef, useCallback } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { useTheme } from 'tamagui'
import { toastEmitter, type ToastOptions, type ToastType } from './toast-emitter'

interface ToastItem {
  id: string
  message: string
  opts?: ToastOptions
  anim: Animated.Value
}

const TYPE_COLORS: Record<ToastType, string> = {
  success: '$green9',
  error: '$red9',
  warning: '$orange9',
  info: '$blue9',
}

const DEFAULT_DURATION = 3000

function ToastView({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const theme = useTheme()
  const toastType: ToastType = item.opts?.type ?? 'info'

  const bgColorKey = TYPE_COLORS[toastType].replace('$', '') as keyof typeof theme
  const bgColor = (theme[bgColorKey]?.val as string | undefined) ?? '#333'

  useEffect(() => {
    Animated.timing(item.anim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start()

    const timer = setTimeout(() => {
      Animated.timing(item.anim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start(() => onDismiss(item.id))
    }, item.opts?.duration ?? DEFAULT_DURATION)

    return () => clearTimeout(timer)
  }, [item, onDismiss])

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: bgColor, opacity: item.anim },
      ]}
    >
      <Animated.Text style={styles.message}>{item.message}</Animated.Text>
      {item.opts?.description ? (
        <Animated.Text style={styles.description}>{item.opts.description}</Animated.Text>
      ) : null}
    </Animated.View>
  )
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const idRef = useRef(0)

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  useEffect(() => {
    return toastEmitter.on((message, opts) => {
      const id = `toast-${++idRef.current}`
      const anim = new Animated.Value(0)
      setToasts((prev) => [...prev, { id, message, opts, anim }])
    })
  }, [])

  return (
    <Animated.View style={styles.container} pointerEvents="box-none">
      {toasts.map((item) => (
        <ToastView key={item.id} item={item} onDismiss={dismiss} />
      ))}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    gap: 8,
  } as const,
  toast: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 8,
    maxWidth: 360,
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  message: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
})
