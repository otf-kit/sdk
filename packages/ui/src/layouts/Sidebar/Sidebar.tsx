import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../utils/cn'

const SidebarCtx = React.createContext<{ collapsed: boolean }>({ collapsed: false })
const useSidebarCtx = () => React.useContext(SidebarCtx)

const makeSlot = (name: string, cls: string) => {
  const C = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...p }, ref) => <div ref={ref} className={cn(cls, className)} {...p} />
  )
  C.displayName = name
  return C
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
  onCollapse?: () => void
  width?: string
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsed = false, onCollapse, width = '240px', style, children, ...props }, ref) => (
    <SidebarCtx.Provider value={{ collapsed }}>
      <div
        ref={ref}
        className={cn('flex flex-col h-full bg-[hsl(var(--card))] border-r border-[hsl(var(--border))] transition-all duration-200 overflow-hidden', className)}
        style={{ width: collapsed ? '48px' : width, ...style }}
        {...props}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden">{children}</div>
        {onCollapse && (
          <button
            onClick={onCollapse}
            className="flex items-center justify-center h-10 w-full border-t border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors shrink-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        )}
      </div>
    </SidebarCtx.Provider>
  )
)
Sidebar.displayName = 'Sidebar'

export const SidebarHeader = makeSlot('SidebarHeader', 'px-3 py-4 border-b border-[hsl(var(--border))] shrink-0')
export const SidebarContent = makeSlot('SidebarContent', 'flex-1 overflow-y-auto py-2')
export const SidebarFooter = makeSlot('SidebarFooter', 'px-3 py-3 border-t border-[hsl(var(--border))] shrink-0')
export const SidebarGroup = makeSlot('SidebarGroup', 'mb-2')
export const SidebarSeparator = makeSlot('SidebarSeparator', 'h-px bg-[hsl(var(--border))] mx-3 my-2')

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { collapsed } = useSidebarCtx()
    return (
      <div
        ref={ref}
        className={cn('px-3 py-1 text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider', collapsed && 'sr-only', className)}
        {...props}
      />
    )
  }
)
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

export interface SidebarItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  icon?: React.ReactNode
  label: string
  active?: boolean
  href?: string
  badge?: string | number
  onClick?: React.MouseEventHandler<HTMLElement>
}

export const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ className, icon, label, active, href, badge, onClick, ...props }, ref) => {
    const { collapsed } = useSidebarCtx()
    const cls = cn(
      'flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors mx-1 text-sm',
      active
        ? 'bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] font-medium'
        : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]',
      collapsed && 'justify-center px-0 mx-2',
      className
    )
    const inner = (
      <>
        {icon && <span className="shrink-0 flex items-center justify-center w-4 h-4">{icon}</span>}
        {!collapsed && <span className="flex-1 min-w-0 truncate">{label}</span>}
        {!collapsed && badge !== undefined && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[hsl(var(--primary))] bg-opacity-10 text-[hsl(var(--primary))] shrink-0 font-medium">{badge}</span>
        )}
      </>
    )
    if (href) return <a href={href} className={cls} onClick={onClick}>{inner}</a>
    return <div ref={ref} role="button" tabIndex={0} className={cls} onClick={onClick} {...props}>{inner}</div>
  }
)
SidebarItem.displayName = 'SidebarItem'
