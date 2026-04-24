import React from 'react'
import { cn } from '../utils/cn'

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ className, maxWidth, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col min-h-full w-full', className)}
      style={{ maxWidth, ...style }}
      {...props}
    />
  )
)
Page.displayName = 'Page'

export const PageHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-start justify-between gap-4 px-6 py-4 border-b border-[hsl(var(--border))]', className)}
      {...props}
    />
  )
)
PageHeader.displayName = 'PageHeader'

export const PageTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn('text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]', className)}
      {...props}
    />
  )
)
PageTitle.displayName = 'PageTitle'

export const PageDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-[hsl(var(--muted-foreground))] mt-1', className)} {...props} />
  )
)
PageDescription.displayName = 'PageDescription'

export const PageActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2 shrink-0', className)} {...props} />
  )
)
PageActions.displayName = 'PageActions'

export const PageBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 p-6 flex flex-col gap-6', className)} {...props} />
  )
)
PageBody.displayName = 'PageBody'
