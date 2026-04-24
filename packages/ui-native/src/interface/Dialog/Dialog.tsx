import { useState, useEffect, type ReactNode } from 'react'
import { AlertDialog, Button, XStack, YStack } from 'tamagui'

type DialogState = {
  type: 'error' | 'confirm' | null
  title: string
  description: string
  resolve?: (value: boolean) => void
}

let globalShowDialog: ((
  state: Omit<DialogState, 'resolve'> & { resolve?: (value: boolean) => void }
) => void) | null = null

export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DialogState>({
    type: null,
    title: '',
    description: '',
  })

  useEffect(() => {
    globalShowDialog = (newState) =>
      setState({ ...newState, resolve: newState.resolve } as DialogState)
    return () => {
      globalShowDialog = null
    }
  }, [])

  const handleClose = (confirmed: boolean) => {
    if (!state.resolve) return
    const resolve = state.resolve
    setState({ type: null, title: '', description: '' })
    resolve(confirmed)
  }

  return (
    <>
      {children}
      <AlertDialog
        open={state.type !== null}
        onOpenChange={(open) => {
          if (!open && state.type !== null) handleClose(false)
        }}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            bordered
            elevate
            key="content"
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            x={0}
            scale={1}
            opacity={1}
            y={0}
            width="90%"
            maxWidth={400}
          >
            <YStack gap="$4">
              <AlertDialog.Title size="$6">{state.title}</AlertDialog.Title>
              <AlertDialog.Description size="$3" color="$color11">
                {state.description}
              </AlertDialog.Description>
              <XStack gap="$3" justifyContent="flex-end">
                {state.type === 'confirm' ? (
                  <>
                    <Button onPress={() => handleClose(false)}>Cancel</Button>
                    <Button theme="blue" onPress={() => handleClose(true)}>
                      Confirm
                    </Button>
                  </>
                ) : (
                  <Button theme="blue" onPress={() => handleClose(false)}>
                    OK
                  </Button>
                )}
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </>
  )
}

export const showError = (error: unknown, title = 'Error') => {
  let description = 'An unexpected error occurred'
  if (error instanceof Error) description = error.message
  else if (typeof error === 'string') description = error
  else if (error && typeof error === 'object' && 'message' in error)
    description = String(error.message)

  if (globalShowDialog) globalShowDialog({ type: 'error', title, description })
  else console.error(`${title}: ${description}`)
}

export const dialogConfirm = async (props: {
  title?: string
  description?: string
}): Promise<boolean> => {
  const { title = 'Confirm', description = 'Are you sure?' } = props
  if (!globalShowDialog) {
    console.error('DialogProvider not mounted')
    return false
  }
  return new Promise<boolean>((resolve) => {
    globalShowDialog!({ type: 'confirm', title, description, resolve })
  })
}
