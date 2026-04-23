'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '../utils/cn'
import { toastEmitter, type ToastEvent, type ToastType } from './toast-emitter'

/* ── Toast item ──────────────────────────────────────────────────── */

const iconMap: Record<ToastType, React.ReactNode> = {
  success:  <CheckCircle className="h-4 w-4 text-green-500" />,
  error:    <XCircle className="h-4 w-4 text-destructive" />,
  warning:  <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  info:     <Info className="h-4 w-4 text-blue-500" />,
  default:  null,
}

const borderMap: Record<ToastType, string> = {
  success: 'border-green-500/20',
  error:   'border-destructive/20',
  warning: 'border-yellow-500/20',
  info:    'border-blue-500/20',
  default: 'border-border',
}

interface ToastState extends ToastEvent {
  visible: boolean
}

const DEFAULT_DURATION = 4000
const MAX_TOASTS = 5

interface ToastItemProps {
  toast: ToastState
  onDismiss: (id: string) => void
}

function ToastItem({ toast: t, onDismiss }: ToastItemProps) {
  const type: ToastType = t.options.type ?? 'default'
  return (
    <div
      data-slot="toast"
      role="status"
      aria-live="polite"
      className={cn(
        'group relative flex items-start gap-3 w-[360px] max-w-[calc(100vw-2rem)]',
        'rounded-lg border bg-popover px-4 py-3 shadow-lg',
        'animate-in slide-in-from-right-full duration-300',
        !t.visible && 'animate-out fade-out-0 slide-out-to-right-full duration-200',
        borderMap[type],
      )}
    >
      {iconMap[type] && (
        <span className="mt-0.5 shrink-0">{iconMap[type]}</span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-tight">{t.message}</p>
        {t.options.description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{t.options.description}</p>
        )}
        {t.options.action && (
          <button
            onClick={t.options.action.onClick}
            className="mt-1.5 text-xs font-medium text-primary hover:underline"
          >
            {t.options.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onDismiss(t.id)}
        aria-label="Dismiss"
        className="shrink-0 opacity-40 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

/* ── Toaster ─────────────────────────────────────────────────────── */

export function Toaster() {
  const [toasts, setToasts] = useState<ToastState[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
    )
    // Remove from DOM after exit animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 250)
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  useEffect(() => {
    const unsubToast = toastEmitter.onToast((event) => {
      setToasts((prev) => {
        const next = [
          { ...event, visible: true },
          ...prev.filter((t) => t.id !== event.id),
        ].slice(0, MAX_TOASTS)
        return next
      })

      const duration = event.options.duration ?? DEFAULT_DURATION
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(event.id), duration)
        timers.current.set(event.id, timer)
      }
    })

    const unsubDismiss = toastEmitter.onDismiss((id) => dismiss(id))

    return () => {
      unsubToast()
      unsubDismiss()
      timers.current.forEach(clearTimeout)
    }
  }, [dismiss])

  return (
    <div
      aria-label="Notifications"
      aria-live="polite"
      className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onDismiss={dismiss} />
        </div>
      ))}
    </div>
  )
}
