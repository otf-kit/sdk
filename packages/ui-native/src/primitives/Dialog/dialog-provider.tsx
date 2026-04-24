import { useState, useEffect, type ReactNode } from 'react'
import { Dialog, DialogTitle, DialogDescription, DialogContent } from './Dialog'
import { Button } from '../Button'
import { XStack } from 'tamagui'

export interface DialogOptions {
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
}

let _show: (opts: DialogOptions) => Promise<boolean> = async () => false

export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<
    (DialogOptions & { open: boolean; resolve: (v: boolean) => void }) | null
  >(null)

  useEffect(() => {
    _show = (opts) =>
      new Promise((resolve) => {
        setState({ ...opts, open: true, resolve })
      })
    return () => {
      _show = async () => false
    }
  }, [])

  function handleOpenChange(open: boolean) {
    if (!open) {
      state?.resolve(false)
      setState(null)
    }
  }

  return (
    <>
      {children}
      {state && (
        <Dialog open={state.open} onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogTitle>{state.title}</DialogTitle>
            {state.description && (
              <DialogDescription>{state.description}</DialogDescription>
            )}
            <XStack gap="$3" justifyContent="flex-end" marginTop="$4">
              <Button
                variant="outlined"
                onPress={() => {
                  state.resolve(false)
                  setState(null)
                }}
              >
                {state.cancelLabel ?? 'Cancel'}
              </Button>
              <Button
                variant={state.destructive ? ('destructive' as const) : 'primary'}
                onPress={() => {
                  state.resolve(true)
                  setState(null)
                }}
              >
                {state.confirmLabel ?? 'Confirm'}
              </Button>
            </XStack>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export function showDialog(opts: DialogOptions): Promise<boolean> {
  return _show(opts)
}
