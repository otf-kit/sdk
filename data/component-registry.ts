// OTF component registry — metadata for search, navigation, and detail pages

export type ComponentMeta = {
  slug: string
  name: string
  description: string
  category: 'Display' | 'Input' | 'Feedback' | 'Layout' | 'Data'
  tags: string[]
  hasExample?: boolean
}

export const components: ComponentMeta[] = [
  // ── Primitives (with examples) ──────────────────────────────────────────────
  { slug: 'button',    name: 'Button',   description: 'Solid, outline, ghost, and destructive button variants with loading state support.',        category: 'Input',    tags: ['action', 'cta', 'form'],           hasExample: true },
  { slug: 'avatar',    name: 'Avatar',   description: 'User avatar with image, fallback initials, and optional status indicator.',                  category: 'Display',  tags: ['user', 'profile', 'identity'],     hasExample: true },
  { slug: 'badge',     name: 'Badge',    description: 'Status and category labels in default, secondary, destructive, and outline variants.',        category: 'Display',  tags: ['label', 'tag', 'status'],          hasExample: true },
  { slug: 'card',      name: 'Card',     description: 'Composable card with header, title, description, content, and footer composition slots.',     category: 'Layout',   tags: ['container', 'surface', 'panel'],   hasExample: true },
  { slug: 'input',     name: 'Input',    description: 'Text input field with full HTML input attribute support and accessible labeling.',            category: 'Input',    tags: ['form', 'text', 'field'],           hasExample: true },
  { slug: 'tabs',      name: 'Tabs',     description: 'Accessible tabbed interface built on Radix UI Tabs with keyboard navigation.',               category: 'Layout',   tags: ['navigation', 'tabs', 'sections'],  hasExample: true },
  { slug: 'skeleton',  name: 'Skeleton', description: 'Layout-mirroring skeleton loaders for async content — mirrors real UI, never spinners.',     category: 'Feedback', tags: ['loading', 'placeholder', 'ux'],    hasExample: true },
  { slug: 'dialog',    name: 'Dialog',   description: 'Accessible modal dialog with focus trap, animation, and portal rendering.',                  category: 'Feedback', tags: ['modal', 'overlay', 'popup'],       hasExample: true },
  // ── Components (with examples) ──────────────────────────────────────────────
  { slug: 'banner',    name: 'Banner',   description: 'Alert banner with info, success, warning, error, and neutral variants plus dismiss action.',  category: 'Feedback', tags: ['alert', 'notification', 'status'], hasExample: true },
  { slug: 'stat',      name: 'Stat',     description: 'KPI metric card with trend indicator, icon, and period comparison. Group with StatGroup.',   category: 'Data',     tags: ['kpi', 'metric', 'analytics'],      hasExample: true },
  // ── Advanced (with examples) ────────────────────────────────────────────────
  { slug: 'kanban',    name: 'Kanban',   description: 'Drag-and-drop kanban board for task management with multi-column layout controls.',           category: 'Layout',   tags: ['board', 'dnd', 'tasks', 'pm'],     hasExample: true },
  // ── Charts (with examples) ──────────────────────────────────────────────────
  { slug: 'area-chart',name: 'Area Chart',description: 'Smooth gradient area chart built on Recharts with configurable series, tooltip, and legend.',category: 'Data',     tags: ['chart', 'recharts', 'analytics'],  hasExample: true },
  // ── Blocks (with examples) ──────────────────────────────────────────────────
  { slug: 'chat-detail',            name: 'Chat Detail',  description: 'Full-featured messaging UI with thread view, reactions, file attachments, and reply.', category: 'Layout', tags: ['messaging', 'chat', 'inbox'],      hasExample: true },
  { slug: 'sidebar-layout-dashboard',name: 'App Shell',   description: 'Sidebar + main layout with mobile trigger, collapse, and responsive behavior.',         category: 'Layout', tags: ['navigation', 'sidebar', 'shell'],  hasExample: true },

  // ── Primitives (no live demo yet) ───────────────────────────────────────────
  { slug: 'select',        name: 'Select',          description: 'Dropdown select with options, groups, search, and full keyboard navigation.',                category: 'Input',    tags: ['dropdown', 'form'] },
  { slug: 'checkbox',      name: 'Checkbox',        description: 'Accessible checkbox with indeterminate state and label support.',                            category: 'Input',    tags: ['form', 'toggle'] },
  { slug: 'switch',        name: 'Switch',          description: 'Toggle switch for boolean settings with smooth animation.',                                  category: 'Input',    tags: ['toggle', 'boolean', 'form'] },
  { slug: 'slider',        name: 'Slider',          description: 'Range slider with draggable handle and configurable min/max/step.',                          category: 'Input',    tags: ['range', 'form'] },
  { slug: 'tooltip',       name: 'Tooltip',         description: 'Hover tooltip with configurable delay, placement, and content.',                             category: 'Display',  tags: ['hint', 'helper'] },
  { slug: 'popover',       name: 'Popover',         description: 'Floating popover with configurable placement and focus management.',                         category: 'Display',  tags: ['overlay', 'floating'] },
  { slug: 'dropdown-menu', name: 'Dropdown Menu',   description: 'Radix dropdown menu with groups, separators, shortcuts, and icons.',                         category: 'Input',    tags: ['menu', 'navigation', 'actions'] },
  { slug: 'command',       name: 'Command',         description: 'Fast fuzzy-search command palette with grouped results and keyboard navigation.',             category: 'Input',    tags: ['search', 'keyboard', 'cmdk'] },
  { slug: 'table',         name: 'Table',           description: 'Table primitive for building custom sortable table layouts.',                                  category: 'Data',     tags: ['table', 'primitive'] },
  { slug: 'data-grid',     name: 'Data Grid',       description: 'Sortable, filterable, paginated data table built on TanStack Table v8.',                     category: 'Data',     tags: ['table', 'tanstack', 'filter'] },
  { slug: 'calendar',      name: 'Calendar',        description: 'Full-featured date calendar with single and range selection modes.',                          category: 'Input',    tags: ['date', 'picker', 'time'] },
  { slug: 'form',          name: 'Form',            description: 'Form primitives integrated with React Hook Form and Zod schema validation.',                  category: 'Input',    tags: ['validation', 'react-hook-form'] },
  { slug: 'progress',      name: 'Progress',        description: 'Progress bar for showing task completion, upload, or loading state.',                         category: 'Feedback', tags: ['loading', 'status'] },
  { slug: 'scroll-area',   name: 'Scroll Area',     description: 'Custom scrollbar with cross-browser styling consistency.',                                    category: 'Layout',   tags: ['scroll', 'overflow'] },
  { slug: 'separator',     name: 'Separator',       description: 'Horizontal or vertical visual divider.',                                                      category: 'Layout',   tags: ['divider', 'hr'] },
  { slug: 'sheet',         name: 'Sheet',           description: 'Slide-in panel from any edge with backdrop overlay.',                                         category: 'Feedback', tags: ['drawer', 'panel', 'sidebar'] },
  { slug: 'accordion',     name: 'Accordion',       description: 'Collapsible sections with smooth spring animation and keyboard support.',                     category: 'Layout',   tags: ['collapse', 'faq', 'disclosure'] },
  // ── Components (no live demo yet) ────────────────────────────────────────────
  { slug: 'empty-state',   name: 'Empty State',     description: 'Illustration + heading + call-to-action for empty data views.',                              category: 'Feedback', tags: ['empty', 'placeholder', 'zero'] },
  { slug: 'stepper',       name: 'Stepper',         description: 'Multi-step progress indicator for forms, onboarding, and wizards.',                          category: 'Layout',   tags: ['wizard', 'steps', 'onboarding'] },
  { slug: 'timeline',      name: 'Timeline',        description: 'Chronological event list with icons, connectors, and timestamps.',                           category: 'Display',  tags: ['events', 'history', 'log'] },
  { slug: 'persona',       name: 'Persona',         description: 'User identity card combining avatar, name, role, and status.',                               category: 'Display',  tags: ['user', 'profile', 'identity'] },
  { slug: 'property-list', name: 'Property List',   description: 'Key-value metadata display for detail panels and settings.',                                 category: 'Display',  tags: ['metadata', 'details', 'info'] },
  // ── Charts (no live demo yet) ────────────────────────────────────────────────
  { slug: 'bar-chart',     name: 'Bar Chart',       description: 'Grouped and stacked bar chart built on Recharts with custom tooltip.',                       category: 'Data',     tags: ['chart', 'recharts', 'bar'] },
  { slug: 'line-chart',    name: 'Line Chart',      description: 'Multi-series line chart with dot markers, legend, and tooltip.',                             category: 'Data',     tags: ['chart', 'recharts', 'line'] },
  { slug: 'sparkline',     name: 'Sparkline',       description: 'Compact inline trend chart for embedding in stat cards and tables.',                         category: 'Data',     tags: ['chart', 'mini', 'trend'] },
  // ── Blocks (no live demo yet) ────────────────────────────────────────────────
  { slug: 'metric-card',   name: 'Metric Card',     description: 'Self-contained KPI card block with chart, trend, and comparison period.',                    category: 'Data',     tags: ['kpi', 'chart', 'block'] },
  { slug: 'messages-card', name: 'Messages Card',   description: 'Compact message thread preview card with avatar and unread count.',                          category: 'Display',  tags: ['chat', 'notifications'] },
  { slug: 'task-card',     name: 'Task Card',       description: 'Rich task item with priority, assignee, due date, and labels.',                              category: 'Display',  tags: ['task', 'pm', 'jira'] },
  { slug: 'file-cards',    name: 'File Cards',      description: 'File/document preview card grid with type icon and metadata.',                               category: 'Display',  tags: ['file', 'media', 'storage'] },
  { slug: 'invite-modal',  name: 'Invite Modal',    description: 'Team invite modal with role selector and email input.',                                      category: 'Feedback', tags: ['team', 'invite', 'modal'] },
  { slug: 'user-menu',     name: 'User Menu',       description: 'Authenticated user dropdown with profile, settings, and sign-out.',                          category: 'Layout',   tags: ['auth', 'navigation', 'user'] },
]

export const componentBySlug = (slug: string) => components.find((c) => c.slug === slug)

export type ExampleEntry = {
  Demo: React.ComponentType
  code: string
}
