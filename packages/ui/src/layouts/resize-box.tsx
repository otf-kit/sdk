import React from 'react'
import { cn } from '../utils/cn'

export interface ResizeBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  resize?: 'horizontal' | 'vertical' | 'both' | 'none'
  minWidth?: number
  minHeight?: number
}

export const ResizeBox = React.forwardRef<HTMLDivElement, ResizeBoxProps>(
  ({ className, resize = 'both', minWidth = 100, minHeight = 100, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('overflow-auto relative', className)}
      style={{ resize, minWidth, minHeight, ...style }}
      {...props}
    />
  )
)
ResizeBox.displayName = 'ResizeBox'

const HandleIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
    <path d="M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 5L5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 8L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const ResizeHandle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'absolute bottom-0 right-0 w-5 h-5 flex items-center justify-center',
        'cursor-se-resize text-[hsl(var(--muted-foreground))] opacity-50 hover:opacity-100 transition-opacity',
        className
      )}
      {...props}
    >
      <HandleIcon />
    </div>
  )
)
ResizeHandle.displayName = 'ResizeHandle'
