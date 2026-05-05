'use client'

import React from 'react'
import { Toaster as SonnerToaster, toast } from 'sonner'
import { useOtfUI } from '../../provider/otf-ui-provider'

export interface ToasterProps extends React.ComponentProps<typeof SonnerToaster> {}

export function Toaster(props: ToasterProps) {
  const ctx = useOtfUI?.()
  const dark = ctx?.darkMode === 'dark'

  return (
    <SonnerToaster
      theme={dark ? 'dark' : 'light'}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: [
            'group flex items-start gap-3 rounded-lg border px-4 py-3.5 text-sm shadow-md',
            'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]',
          ].join(' '),
          title: 'font-semibold text-sm leading-snug',
          description: 'text-xs text-[hsl(var(--muted-foreground))] mt-0.5 leading-snug',
          actionButton: [
            'mt-2 inline-flex items-center gap-1 text-xs font-medium',
            'text-[hsl(var(--primary))] underline-offset-2 hover:underline',
          ].join(' '),
          cancelButton: 'mt-2 text-xs text-[hsl(var(--muted-foreground))] hover:opacity-80',
          closeButton: 'text-[hsl(var(--muted-foreground))] opacity-60 hover:opacity-100 transition-opacity',
          error: 'border-red-200/80 bg-red-50/60 dark:border-red-800/60 dark:bg-red-950/30',
          success: 'border-green-200/80 bg-green-50/60 dark:border-green-800/60 dark:bg-green-950/30',
          warning: 'border-yellow-200/80 bg-yellow-50/60 dark:border-yellow-800/60 dark:bg-yellow-950/30',
          info: 'border-blue-200/80 bg-blue-50/60 dark:border-blue-800/60 dark:bg-blue-950/30',
        },
      }}
      {...props}
    />
  )
}

export { toast }
