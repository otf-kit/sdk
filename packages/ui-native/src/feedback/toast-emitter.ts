export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastOptions {
  type?: ToastType
  duration?: number
  description?: string
}

const listeners: Array<(message: string, opts?: ToastOptions) => void> = []

export const toastEmitter = {
  emit: (message: string, opts?: ToastOptions) =>
    listeners.forEach((fn) => fn(message, opts)),
  on: (fn: (message: string, opts?: ToastOptions) => void) => {
    listeners.push(fn)
    return () => {
      const i = listeners.indexOf(fn)
      if (i > -1) listeners.splice(i, 1)
    }
  },
}

function toastFn(message: string, opts?: ToastOptions): void {
  toastEmitter.emit(message, opts)
}

toastFn.success = (msg: string, opts?: Omit<ToastOptions, 'type'>) =>
  toastFn(msg, { ...opts, type: 'success' })
toastFn.error = (msg: string, opts?: Omit<ToastOptions, 'type'>) =>
  toastFn(msg, { ...opts, type: 'error' })
toastFn.warning = (msg: string, opts?: Omit<ToastOptions, 'type'>) =>
  toastFn(msg, { ...opts, type: 'warning' })
toastFn.info = (msg: string, opts?: Omit<ToastOptions, 'type'>) =>
  toastFn(msg, { ...opts, type: 'info' })

export { toastFn as toast }
