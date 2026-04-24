import React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../utils/cn'

interface BreadcrumbItemProps {
  href?: string
  label: string
  active?: boolean
  className?: string
}

export function BreadcrumbItem({ href, label, active, className }: BreadcrumbItemProps) {
  return (
    <li className={cn('flex items-center', className)}>
      {href && !active ? (
        <a href={href} className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">{label}</a>
      ) : (
        <span className="text-sm text-[hsl(var(--foreground))] font-medium">{label}</span>
      )}
    </li>
  )
}

export function BreadcrumbPage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li aria-current="page" className={cn('flex items-center text-sm font-medium text-[hsl(var(--foreground))]', className)}>
      {children}
    </li>
  )
}

export function BreadcrumbSeparator({ className }: { className?: string }) {
  return (
    <li role="presentation" aria-hidden="true" className={cn('flex items-center text-[hsl(var(--muted-foreground))]', className)}>
      <ChevronRight className="h-3.5 w-3.5" />
    </li>
  )
}

interface BreadcrumbProps {
  children: React.ReactNode
  className?: string
}

export function Breadcrumb({ children, className }: BreadcrumbProps) {
  const items = React.Children.toArray(children)
  const withSeparators: React.ReactNode[] = []
  items.forEach((item, i) => {
    withSeparators.push(item)
    if (i < items.length - 1) withSeparators.push(<BreadcrumbSeparator key={`sep-${i}`} />)
  })

  return (
    <nav aria-label="breadcrumb">
      <ol className={cn('flex flex-wrap items-center gap-1', className)}>{withSeparators}</ol>
    </nav>
  )
}
