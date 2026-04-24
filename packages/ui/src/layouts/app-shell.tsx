'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../utils/cn'

interface AppShellCtxValue {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}

const AppShellCtx = React.createContext<AppShellCtxValue>({
  collapsed: false,
  setCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
})

export const useAppShell = () => React.useContext(AppShellCtx)

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultCollapsed?: boolean
}

export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({ className, defaultCollapsed = false, children, ...props }, ref) => {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
    const [mobileOpen, setMobileOpen] = React.useState(false)

    // Close mobile sidebar on nav link clicks inside the shell
    React.useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.closest('a[href]') || target.closest('[data-mobile-close]')) {
          setMobileOpen(false)
        }
      }
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }, [])

    return (
      <AppShellCtx.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
        <div
          ref={ref}
          className={cn('flex h-screen w-full overflow-hidden bg-background', className)}
          {...props}
        >
          {/* Mobile backdrop — rendered inside AppShell so it doesn't break SSR */}
          {mobileOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}
          {children}
        </div>
      </AppShellCtx.Provider>
    )
  }
)
AppShell.displayName = 'AppShell'

/**
 * Sidebar wrapper.
 * On MOBILE  → hidden (display: none) by default; shown as a fixed overlay when mobileOpen=true.
 * On DESKTOP → always visible as a normal flex child.
 *
 * ALWAYS wrap <Sidebar> in <AppShellSidebar> — never put <Sidebar> directly in <AppShell>.
 * Without this wrapper the sidebar is visible on all screen sizes.
 */
export const AppShellSidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { mobileOpen } = useAppShell()
    return (
      <div
        ref={ref}
        className={cn(
          'shrink-0 h-full',
          // Mobile: hidden by default; shows as fixed overlay when open
          mobileOpen
            ? 'fixed inset-y-0 left-0 z-50 flex'
            : 'hidden md:flex',
          // Desktop: always visible as a normal relative element
          'md:relative',
          className
        )}
        {...props}
      />
    )
  }
)
AppShellSidebar.displayName = 'AppShellSidebar'

export const AppShellMain = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 min-w-0 flex flex-col overflow-auto', className)} {...props} />
  )
)
AppShellMain.displayName = 'AppShellMain'

/**
 * Hamburger/close button — place in your mobile header bar (md:hidden).
 * Toggles the sidebar overlay on mobile.
 */
export const MobileSidebarTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { mobileOpen, setMobileOpen } = useAppShell()
    return (
      <button
        ref={ref}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        className={cn(
          'md:hidden inline-flex items-center justify-center rounded-md p-2',
          'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className
        )}
        {...props}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    )
  }
)
MobileSidebarTrigger.displayName = 'MobileSidebarTrigger'
