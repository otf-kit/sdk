// OTF component registry — metadata for search and navigation

export type ComponentMeta = {
  slug: string
  name: string
  description: string
  category: 'Display' | 'Input' | 'Feedback' | 'Layout' | 'Media' | 'Data'
  tags: string[]
  hasExample?: boolean
}

export const components: ComponentMeta[] = [
  { slug: 'button', name: 'Button', description: 'Solid, outline, ghost, and destructive button variants with loading state.', category: 'Input', tags: ['action', 'cta'], hasExample: true },
  { slug: 'avatar', name: 'Avatar', description: 'User avatar with image fallback and status indicator.', category: 'Display', tags: ['user', 'profile'], hasExample: true },
  { slug: 'badge', name: 'Badge', description: 'Status and category labels with color variants.', category: 'Display', tags: ['label', 'tag'], hasExample: true },
  { slug: 'card', name: 'Card', description: 'Composable card with header, content, and footer slots.', category: 'Layout', tags: ['container', 'surface'], hasExample: true },
  { slug: 'command', name: 'Command Palette', description: 'Fast fuzzy-search command palette with keyboard navigation.', category: 'Input', tags: ['search', 'keyboard'], hasExample: true },
  { slug: 'data-grid', name: 'Data Grid', description: 'Sortable, filterable, paginated data table built on TanStack Table.', category: 'Data', tags: ['table', 'tanstack'], hasExample: true },
  { slug: 'kanban', name: 'Kanban', description: 'Drag-and-drop kanban board for task management with column controls.', category: 'Layout', tags: ['board', 'dnd', 'tasks'], hasExample: true },
  { slug: 'chart', name: 'Charts', description: 'Area, bar, line, and pie charts with Recharts.', category: 'Data', tags: ['graph', 'recharts', 'analytics'], hasExample: true },
  { slug: 'app-shell', name: 'App Shell', description: 'Sidebar + main layout with mobile trigger and responsive collapse.', category: 'Layout', tags: ['navigation', 'sidebar'], hasExample: true },
  { slug: 'stat', name: 'Stat Card', description: 'KPI card with trend indicator and period comparison.', category: 'Data', tags: ['metric', 'kpi'], hasExample: true },
  { slug: 'chat', name: 'Chat Detail', description: 'Messaging UI with thread, reactions, and file attachments.', category: 'Layout', tags: ['messaging', 'chat'], hasExample: true },
  { slug: 'skeleton', name: 'Skeleton', description: 'Layout-mirroring skeleton loaders for every component.', category: 'Feedback', tags: ['loading', 'placeholder'], hasExample: true },
  { slug: 'dialog', name: 'Dialog', description: 'Accessible modal dialog with focus trap and animation.', category: 'Feedback', tags: ['modal', 'overlay'], hasExample: true },
  { slug: 'form', name: 'Form', description: 'Form primitives with React Hook Form and Zod validation.', category: 'Input', tags: ['validation', 'react-hook-form'], hasExample: true },
  { slug: 'color-picker', name: 'Color Picker', description: 'HSL color picker with hex input and saved palette.', category: 'Input', tags: ['color', 'figma'] },
]

export const componentBySlug = (slug: string) => components.find((c) => c.slug === slug)

export type ExampleEntry = {
  Demo: React.ComponentType
  code: string
}
