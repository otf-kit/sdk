// OTF component registry — metadata for search, navigation, and detail pages

export const STORYBOOK_URL = 'https://otf-storybook.pages.dev'

export type ComponentMeta = {
  slug: string
  name: string
  description: string
  category: 'Display' | 'Input' | 'Feedback' | 'Layout' | 'Data'
  tags: string[]
  hasExample?: boolean
  /** Storybook story ID — if set, preview embeds the live Storybook iframe */
  storybookId?: string
}

export const components: ComponentMeta[] = [
  // ── Primitives ───────────────────────────────────────────────────────────────
  { slug: 'button',        name: 'Button',        description: 'Solid, outline, ghost, and destructive button variants with loading state support.',        category: 'Input',    tags: ['action', 'cta', 'form'],           hasExample: true, storybookId: 'primitives-button--all-variants' },
  { slug: 'avatar',        name: 'Avatar',        description: 'User avatar with image, fallback initials, and optional status indicator.',                  category: 'Display',  tags: ['user', 'profile', 'identity'],     hasExample: true, storybookId: 'primitives-display--avatar-story' },
  { slug: 'badge',         name: 'Badge',         description: 'Status and category labels in default, secondary, destructive, and outline variants.',        category: 'Display',  tags: ['label', 'tag', 'status'],          hasExample: true, storybookId: 'primitives-display--badge-story' },
  { slug: 'card',          name: 'Card',          description: 'Composable card with header, title, description, content, and footer composition slots.',     category: 'Layout',   tags: ['container', 'surface', 'panel'],   hasExample: true, storybookId: 'primitives-display--card-story' },
  { slug: 'input',         name: 'Input',         description: 'Text input field with full HTML input attribute support and accessible labeling.',            category: 'Input',    tags: ['form', 'text', 'field'],           hasExample: true, storybookId: 'primitives-input--with-icons' },
  { slug: 'tabs',          name: 'Tabs',          description: 'Accessible tabbed interface built on Radix UI Tabs with keyboard navigation.',               category: 'Layout',   tags: ['navigation', 'tabs', 'sections'],  hasExample: true, storybookId: 'primitives-tabs--default' },
  { slug: 'skeleton',      name: 'Skeleton',      description: 'Layout-mirroring skeleton loaders for async content — mirrors real UI, never spinners.',     category: 'Feedback', tags: ['loading', 'placeholder', 'ux'],    hasExample: true, storybookId: 'primitives-skeleton--card-skeleton' },
  { slug: 'dialog',        name: 'Dialog',        description: 'Accessible modal dialog with focus trap, animation, and portal rendering.',                  category: 'Feedback', tags: ['modal', 'overlay', 'popup'],       hasExample: true, storybookId: 'primitives-dialog--form-dialog' },
  { slug: 'select',        name: 'Select',        description: 'Dropdown select with options, groups, search, and full keyboard navigation.',                category: 'Input',    tags: ['dropdown', 'form'],                hasExample: true, storybookId: 'forms-controls--select-demo' },
  { slug: 'checkbox',      name: 'Checkbox',      description: 'Accessible checkbox with indeterminate state and label support.',                            category: 'Input',    tags: ['form', 'toggle'],                  hasExample: true, storybookId: 'primitives-controls--checkbox-story' },
  { slug: 'switch',        name: 'Switch',        description: 'Toggle switch for boolean settings with smooth animation.',                                  category: 'Input',    tags: ['toggle', 'boolean', 'form'],       hasExample: true, storybookId: 'primitives-controls--switch-story' },
  { slug: 'slider',        name: 'Slider',        description: 'Range slider with draggable handle and configurable min/max/step.',                          category: 'Input',    tags: ['range', 'form'],                   hasExample: true, storybookId: 'primitives-controls--slider-story' },
  { slug: 'progress',      name: 'Progress',      description: 'Progress bar for showing task completion, upload, or loading state.',                         category: 'Feedback', tags: ['loading', 'status'],               hasExample: true, storybookId: 'primitives-display--progress-story' },
  { slug: 'separator',     name: 'Separator',     description: 'Horizontal or vertical visual divider.',                                                      category: 'Layout',   tags: ['divider', 'hr'],                   hasExample: true, storybookId: 'primitives-display--separator-story' },
  { slug: 'tooltip',       name: 'Tooltip',       description: 'Hover tooltip with configurable delay, placement, and content.',                             category: 'Display',  tags: ['hint', 'helper'] },
  { slug: 'popover',       name: 'Popover',       description: 'Floating popover with configurable placement and focus management.',                         category: 'Display',  tags: ['overlay', 'floating'] },
  { slug: 'dropdown-menu', name: 'Dropdown Menu', description: 'Radix dropdown menu with groups, separators, shortcuts, and icons.',                         category: 'Input',    tags: ['menu', 'navigation', 'actions'] },
  { slug: 'command',       name: 'Command',       description: 'Fast fuzzy-search command palette with grouped results and keyboard navigation.',             category: 'Input',    tags: ['search', 'keyboard', 'cmdk'] },
  { slug: 'accordion',     name: 'Accordion',     description: 'Collapsible sections with smooth spring animation and keyboard support.',                     category: 'Layout',   tags: ['collapse', 'faq', 'disclosure'] },
  { slug: 'scroll-area',   name: 'Scroll Area',   description: 'Custom scrollbar with cross-browser styling consistency.',                                    category: 'Layout',   tags: ['scroll', 'overflow'] },
  { slug: 'sheet',         name: 'Sheet',         description: 'Slide-in panel from any edge with backdrop overlay.',                                         category: 'Feedback', tags: ['drawer', 'panel', 'sidebar'] },
  { slug: 'calendar',      name: 'Calendar',      description: 'Full-featured date calendar with single and range selection modes.',                          category: 'Input',    tags: ['date', 'picker', 'time'] },
  { slug: 'form',          name: 'Form',          description: 'Form primitives integrated with React Hook Form and Zod schema validation.',                  category: 'Input',    tags: ['validation', 'react-hook-form'] },
  // ── Data Display ─────────────────────────────────────────────────────────────
  { slug: 'stat',          name: 'Stat',          description: 'KPI metric card with trend indicator, icon, and period comparison. Group with StatGroup.',   category: 'Data',     tags: ['kpi', 'metric', 'analytics'],      hasExample: true, storybookId: 'data-display--stat-story' },
  { slug: 'data-table',    name: 'Data Table',    description: 'Paginated, searchable data table with sortable columns and loading state.',                  category: 'Data',     tags: ['table', 'sort', 'filter'],         hasExample: true, storybookId: 'data-display--data-table-story' },
  { slug: 'data-grid',     name: 'Data Grid',     description: 'Advanced data grid with row selection, column visibility, and virtual scrolling.',           category: 'Data',     tags: ['table', 'tanstack', 'virtual'],    hasExample: true, storybookId: 'data-data-grid--basic' },
  { slug: 'empty-state',   name: 'Empty State',   description: 'Illustration + heading + call-to-action for empty data views.',                              category: 'Feedback', tags: ['empty', 'placeholder', 'zero'],    hasExample: true, storybookId: 'data-display--empty-state-story' },
  { slug: 'property-list', name: 'Property List', description: 'Key-value metadata display for detail panels and settings.',                                 category: 'Display',  tags: ['metadata', 'details', 'info'],     hasExample: true, storybookId: 'data-display--property-list-story' },
  { slug: 'timeline',      name: 'Timeline',      description: 'Chronological event list with icons, connectors, and timestamps.',                           category: 'Display',  tags: ['events', 'history', 'log'],        hasExample: true, storybookId: 'data-display--timeline-story' },
  { slug: 'persona',       name: 'Persona',       description: 'User identity card combining avatar, name, role, and status.',                               category: 'Display',  tags: ['user', 'profile', 'identity'],     hasExample: true, storybookId: 'data-display--persona-story' },
  // ── Charts ────────────────────────────────────────────────────────────────────
  { slug: 'area-chart',    name: 'Area Chart',    description: 'Smooth gradient area chart built on Recharts with configurable series, tooltip, and legend.',category: 'Data',     tags: ['chart', 'recharts', 'analytics'],  hasExample: true, storybookId: 'charts-area-chart--multi-key' },
  { slug: 'bar-chart',     name: 'Bar Chart',     description: 'Grouped and stacked bar chart built on Recharts with custom tooltip.',                       category: 'Data',     tags: ['chart', 'recharts', 'bar'],        hasExample: true, storybookId: 'charts-area-chart--bar-basic' },
  { slug: 'line-chart',    name: 'Line Chart',    description: 'Multi-series line chart with dot markers, legend, and tooltip.',                             category: 'Data',     tags: ['chart', 'recharts', 'line'],       hasExample: true, storybookId: 'charts-area-chart--line-basic' },
  { slug: 'sparkline',     name: 'Sparkline',     description: 'Compact inline trend chart for embedding in stat cards and tables.',                         category: 'Data',     tags: ['chart', 'mini', 'trend'],          hasExample: true, storybookId: 'charts-area-chart--sparkline-line' },
  // ── Blocks ────────────────────────────────────────────────────────────────────
  { slug: 'chat-detail',             name: 'Chat Detail',   description: 'Full-featured messaging UI with thread view, reactions, and file attachments.',  category: 'Layout', tags: ['messaging', 'chat', 'inbox'],      hasExample: true, storybookId: 'blocks--chat-detail-story' },
  { slug: 'sidebar-layout-dashboard',name: 'App Shell',     description: 'Sidebar + main layout with mobile trigger, collapse, and responsive behavior.',   category: 'Layout', tags: ['navigation', 'sidebar', 'shell'],  hasExample: true, storybookId: 'blocks--sidebar-dashboard' },
  { slug: 'metric-card',             name: 'Metric Card',   description: 'Self-contained KPI card block with trend, icon, and comparison period.',          category: 'Data',   tags: ['kpi', 'chart', 'block'],           hasExample: true, storybookId: 'blocks--metric-cards' },
  { slug: 'task-card',               name: 'Task Card',     description: 'Rich task item with priority, assignee, due date, and labels.',                   category: 'Display',tags: ['task', 'pm', 'jira'],              hasExample: true, storybookId: 'blocks--task-cards' },
  { slug: 'messages-card',           name: 'Messages Card', description: 'Compact message thread preview card with avatar and unread count.',                category: 'Display',tags: ['chat', 'notifications'],           hasExample: true, storybookId: 'blocks--messages-card-story' },
  { slug: 'invite-modal',            name: 'Invite Modal',  description: 'Team invite modal with role selector and email input.',                            category: 'Feedback',tags: ['team', 'invite', 'modal'],         hasExample: true, storybookId: 'blocks--invite-modal-story' },
  { slug: 'user-menu',               name: 'User Menu',     description: 'Authenticated user dropdown with profile, settings, and sign-out.',                category: 'Layout', tags: ['auth', 'navigation', 'user'],      hasExample: true, storybookId: 'blocks--user-menu-story' },
  // ── Advanced ──────────────────────────────────────────────────────────────────
  { slug: 'kanban',        name: 'Kanban',        description: 'Drag-and-drop kanban board for task management with multi-column layout controls.',           category: 'Layout', tags: ['board', 'dnd', 'tasks', 'pm'],     hasExample: true, storybookId: 'advanced--kanban-story' },
  { slug: 'banner',        name: 'Banner',        description: 'Alert banner with info, success, warning, error, and neutral variants plus dismiss action.',  category: 'Feedback',tags: ['alert', 'notification', 'status'], hasExample: true, storybookId: 'feedback-banner-loadingoverlay-stepper--banner-all-variants' },
  { slug: 'stepper',       name: 'Stepper',       description: 'Multi-step progress indicator for forms, onboarding, and wizards.',                          category: 'Layout', tags: ['wizard', 'steps', 'onboarding'],   hasExample: true, storybookId: 'feedback-banner-loadingoverlay-stepper--stepper-step1' },
  // ── Layouts ───────────────────────────────────────────────────────────────────
  { slug: 'app-shell-layout', name: 'App Shell Layout', description: 'Full app shell with sidebar, navbar, and page layout in a composable system.',        category: 'Layout', tags: ['navigation', 'sidebar', 'shell'],  hasExample: true, storybookId: 'layouts--app-shell-layout' },
  { slug: 'split-page',       name: 'Split Page',       description: 'Two-panel layout with resizable list and detail panes.',                               category: 'Layout', tags: ['list', 'detail', 'layout'],        hasExample: true, storybookId: 'layouts--split-page-layout' },
]

export const componentBySlug = (slug: string) => components.find((c) => c.slug === slug)

export type ExampleEntry = {
  Demo: React.ComponentType
  code: string
}
