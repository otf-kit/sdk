import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../utils/cn'

interface LoadingOverlayProps {
  loading: boolean
  text?: string
  fullPage?: boolean
  children?: React.ReactNode
  className?: string
}

export function LoadingOverlay({ loading, text, fullPage, children, className }: LoadingOverlayProps) {
  if (fullPage) {
    return loading ? (
      <div className={cn('fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm', className)}>
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--primary))]" />
          {text && <p className="text-sm text-[hsl(var(--muted-foreground))]">{text}</p>}
        </div>
      </div>
    ) : null
  }

  return (
    <div className={cn('relative', className)}>
      {children}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-[hsl(var(--background)/0.8)] backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-[hsl(var(--primary))]" />
            {text && <p className="text-xs text-[hsl(var(--muted-foreground))]">{text}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
