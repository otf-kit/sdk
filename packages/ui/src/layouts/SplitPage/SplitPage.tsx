import React from 'react'
import { cn } from '../utils/cn'

export const SplitPage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex h-full w-full overflow-hidden', className)} {...props} />
  )
)
SplitPage.displayName = 'SplitPage'

export interface SplitPageListProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string
}

export const SplitPageList = React.forwardRef<HTMLDivElement, SplitPageListProps>(
  ({ className, width = '320px', style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('shrink-0 h-full overflow-auto border-r border-[hsl(var(--border))]', className)}
      style={{ width, ...style }}
      {...props}
    />
  )
)
SplitPageList.displayName = 'SplitPageList'

export const SplitPageDetail = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 min-w-0 h-full overflow-auto', className)} {...props} />
  )
)
SplitPageDetail.displayName = 'SplitPageDetail'
