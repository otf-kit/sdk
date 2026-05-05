import React from 'react'
import { cn } from '../utils/cn'

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean
  border?: boolean
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, sticky = false, border = true, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        'z-40 w-full h-14 flex items-center bg-[hsl(var(--background))]',
        sticky && 'sticky top-0',
        border && 'border-b border-[hsl(var(--border))]',
        className
      )}
      {...props}
    />
  )
)
Navbar.displayName = 'Navbar'

export const NavbarBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2 px-4 shrink-0', className)} {...props} />
  )
)
NavbarBrand.displayName = 'NavbarBrand'

type Align = 'start' | 'center' | 'end'

const alignMap: Record<Align, string> = {
  start: 'justify-start',
  center: 'justify-center flex-1',
  end: 'justify-end ml-auto',
}

export interface NavbarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: Align
}

export const NavbarContent = React.forwardRef<HTMLDivElement, NavbarContentProps>(
  ({ className, align = 'start', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-1 px-2', alignMap[align], className)}
      {...props}
    />
  )
)
NavbarContent.displayName = 'NavbarContent'

export const NavbarItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
  )
)
NavbarItem.displayName = 'NavbarItem'
