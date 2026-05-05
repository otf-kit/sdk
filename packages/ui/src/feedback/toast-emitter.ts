export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface ToastOptions {
  type?: ToastType
  duration?: number
  description?: string
  id?: string
  action?: { label: string; onClick: () => void }
}

export interface ToastEvent {
  id: string
  message: string
  options: ToastOptions
}

type Listener = (event: ToastEvent) => void
type DismissListener = (id: string) => void

let _id = 0
const listeners: Listener[] = []
const dismissListeners: DismissListener[] = []

function nextId() {
  return `toast-${++_id}`
}

export const toastEmitter = {
  emit(message: string, options: ToastOptions = {}) {
    const id = options.id ?? nextId()
    const event: ToastEvent = { id, message, options }
    listeners.forEach((fn) => fn(event))
    return id
  },
  dismiss(id: string) {
    dismissListeners.forEach((fn) => fn(id))
  },
  onToast(fn: Listener) {
    listeners.push(fn)
    return () => {
      const i = listeners.indexOf(fn)
      if (i !== -1) listeners.splice(i, 1)
    }
  },
  onDismiss(fn: DismissListener) {
    dismissListeners.push(fn)
    return () => {
      const i = dismissListeners.indexOf(fn)
      if (i !== -1) dismissListeners.splice(i, 1)
    }
  },
}

/* ── Imperative toast() helper ────────────────────────────────── */

function toastFn(message: string, opts?: ToastOptions): string {
  return toastEmitter.emit(message, opts)
}

toastFn.success = (message: string, opts?: Omit<ToastOptions, 'type'>) =>
  toastEmitter.emit(message, { ...opts, type: 'success' })

toastFn.error = (message: string, opts?: Omit<ToastOptions, 'type'>) =>
  toastEmitter.emit(message, { ...opts, type: 'error' })

toastFn.warning = (message: string, opts?: Omit<ToastOptions, 'type'>) =>
  toastEmitter.emit(message, { ...opts, type: 'warning' })

toastFn.info = (message: string, opts?: Omit<ToastOptions, 'type'>) =>
  toastEmitter.emit(message, { ...opts, type: 'info' })

toastFn.dismiss = (id: string) => toastEmitter.dismiss(id)

export { toastFn as toast }
