'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './Dialog'
import { cn } from '../utils/cn'

export type DialogType = 'confirm' | 'alert' | 'custom'

export interface DialogOptions {
  type?: DialogType
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  /** Danger mode — confirm button uses destructive variant */
  destructive?: boolean
  /** Custom content overrides description */
  content?: React.ReactNode
  /** Callback resolve — imperative API sets this internally */
  resolve?: (value: boolean) => void
}

export interface DialogState extends DialogOptions {
  open: boolean
  id: string
}

/* ── Imperative singleton ─────────────────────────────────────── */
let _showDialog: (opts: DialogOptions) => Promise<boolean> = () =>
  Promise.resolve(false)

export function showDialog(opts: DialogOptions): Promise<boolean> {
  return _showDialog(opts)
}

/* ── Provider ────────────────────────────────────────────────── */
export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DialogState | null>(null)
  const resolveRef = useRef<((v: boolean) => void) | null>(null)

  useEffect(() => {
    _showDialog = (opts: DialogOptions) => {
      return new Promise<boolean>((resolve) => {
        resolveRef.current = resolve
        setState({
          ...opts,
          open: true,
          type: opts.type ?? 'confirm',
          id: String(Date.now()),
        })
      })
    }
    return () => {
      _showDialog = () => Promise.resolve(false)
    }
  }, [])

  const handleClose = useCallback((value: boolean) => {
    setState((prev) => (prev ? { ...prev, open: false } : null))
    resolveRef.current?.(value)
    resolveRef.current = null
  }, [])

  const isAlert = state?.type === 'alert'

  return (
    <>
      {children}
      {state && (
        <Dialog
          open={state.open}
          onOpenChange={(open) => {
            if (!open) handleClose(false)
          }}
        >
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>{state.title}</DialogTitle>
              {state.description && (
                <DialogDescription>{state.description}</DialogDescription>
              )}
            </DialogHeader>
            {state.content && (
              <div className="py-2">{state.content}</div>
            )}
            <DialogFooter className="gap-2 sm:gap-0">
              {!isAlert && (
                <button
                  type="button"
                  onClick={() => handleClose(false)}
                  className={cn(
                    'inline-flex items-center justify-center rounded-md text-sm font-medium',
                    'h-9 px-4 py-2 border border-border bg-transparent',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    'transition-colors'
                  )}
                >
                  {state.cancelLabel ?? 'Cancel'}
                </button>
              )}
              <button
                type="button"
                onClick={() => handleClose(true)}
                className={cn(
                  'inline-flex items-center justify-center rounded-md text-sm font-medium',
                  'h-9 px-4 py-2',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'transition-colors',
                  state.destructive
                    ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                )}
              >
                {state.confirmLabel ?? (isAlert ? 'OK' : 'Confirm')}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
