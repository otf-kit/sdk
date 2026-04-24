/**
 * Native Toast — event-emitter pattern matching @otf/ui toast() API.
 * Use with a <NativeToaster /> component in the app root.
 */

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

export interface NativeToastData {
  id: number
  type: ToastType
  title: string
  description?: string
  duration?: number
}

type Listener = (toast: NativeToastData) => void

let idCounter = 0
const listeners = new Set<Listener>()

function emit(type: ToastType, title: string, description?: string, duration?: number) {
  const data: NativeToastData = { id: ++idCounter, type, title, description, duration: duration ?? 3000 }
  listeners.forEach((fn) => fn(data))
  return data.id
}

/**
 * Native toast() function — same API as web toast().
 * Fires an event that NativeToaster (or custom consumer) picks up.
 */
export function toast(title: string, description?: string) {
  return emit('default', title, description)
}

toast.success = (title: string, description?: string) => emit('success', title, description)
toast.error = (title: string, description?: string) => emit('error', title, description)
toast.warning = (title: string, description?: string) => emit('warning', title, description)
toast.info = (title: string, description?: string) => emit('info', title, description)

/** Subscribe to toast events. Returns an unsubscribe function. */
export function onToast(fn: Listener): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
