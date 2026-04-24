// AppShell — renamed to Shell/ShellProps to avoid collision with layouts/AppShell
export { AppShell as Shell, type AppShellProps as ShellProps } from './AppShell'
// Sidebar compound — renamed AppSidebar to avoid collision with layouts/Sidebar
export {
  Sidebar as AppSidebar,
  useSidebar,
  type SidebarItemProps as AppSidebarItemProps,
} from './Sidebar'
// Sidebar resize handle
export * from './SidebarResizer'
// WorkspacesMenu — no conflicts
export * from './WorkspacesMenu'
// UserMenu — renamed AppShellUserMenu to avoid collision with blocks/UserMenu
export { AppShellUserMenu, type AppShellUserMenuProps } from './UserMenu'
// BillingStatus widget
export * from './BillingStatus'
// SortableNav — drag-to-reorder nav items
export * from './SortableNav'
