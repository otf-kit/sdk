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

// ─── Storybook 8 sanitize algorithm ──────────────────────────────────────────
// 1. toLowerCase()
// 2. Replace [ '–—―′¿'!.] → '-'   (space becomes hyphen)
// 3. Remove  [&/\#,+()`$~%.'":*?<>{}]  (slash is REMOVED, not → '-')
// 4. Collapse -+  →  -
// 5. Trim leading/trailing -
//
// Key:  'Data Display' → 'data-display'   (space → hyphen)
//       'Primitives/Button' → 'primitivesbutton'  (/ removed, no hyphen!)
//       'Charts/AreaChart'  → 'chartsareachart'
//       'Data/DataGrid'     → 'datadatagrid'
//       'Forms/Controls'    → 'formscontrols'
//
// Story name uses startCase first:  DataTableStory → 'Data Table Story' → 'data-table-story'
//                                   StepperStep1   → 'Stepper Step 1'  → 'stepper-step-1'
// ─────────────────────────────────────────────────────────────────────────────

export const components: ComponentMeta[] = [
  // ── Primitives/Button → primitivesbutton ─────────────────────────────────
  { slug: 'button',        name: 'Button',        description: 'Solid, outline, ghost, and destructive variants with icon and loading state support.',        category: 'Input',    tags: ['action', 'cta', 'form'],           hasExample: true, storybookId: 'primitivesbutton--all-variants' },
  // ── Primitives/Display → primitivesdisplay ───────────────────────────────
  { slug: 'avatar',        name: 'Avatar',        description: 'User avatar with image, fallback initials, and optional status indicator.',                   category: 'Display',  tags: ['user', 'profile', 'identity'],     hasExample: true, storybookId: 'primitivesdisplay--avatar-story' },
  { slug: 'badge',         name: 'Badge',         description: 'Status and category labels in default, secondary, destructive, and outline variants.',         category: 'Display',  tags: ['label', 'tag', 'status'],          hasExample: true, storybookId: 'primitivesdisplay--badge-story' },
  { slug: 'card',          name: 'Card',          description: 'Composable card with header, title, description, content, and footer slots.',                 category: 'Layout',   tags: ['container', 'surface', 'panel'],   hasExample: true, storybookId: 'primitivesdisplay--card-story' },
  { slug: 'progress',      name: 'Progress',      description: 'Progress bar for task completion, upload progress, and loading states.',                       category: 'Feedback', tags: ['loading', 'status'],               hasExample: true, storybookId: 'primitivesdisplay--progress-story' },
  { slug: 'separator',     name: 'Separator',     description: 'Horizontal or vertical visual divider.',                                                       category: 'Layout',   tags: ['divider', 'hr'],                   hasExample: true, storybookId: 'primitivesdisplay--separator-story' },
  // ── Primitives/Input → primitivesinput ───────────────────────────────────
  { slug: 'input',         name: 'Input',         description: 'Text input field with full HTML input attribute support and accessible labeling.',             category: 'Input',    tags: ['form', 'text', 'field'],           hasExample: true, storybookId: 'primitivesinput--with-icons' },
  // ── Primitives/Tabs → primitivestabs ─────────────────────────────────────
  { slug: 'tabs',          name: 'Tabs',          description: 'Accessible tabbed interface built on Radix UI Tabs with keyboard navigation.',                category: 'Layout',   tags: ['navigation', 'tabs', 'sections'],  hasExample: true, storybookId: 'primitivestabs--default' },
  // ── Primitives/Skeleton → primitivesskeleton ─────────────────────────────
  { slug: 'skeleton',      name: 'Skeleton',      description: 'Layout-mirroring skeleton loaders for async content — never plain spinners.',                 category: 'Feedback', tags: ['loading', 'placeholder', 'ux'],    hasExample: true, storybookId: 'primitivesskeleton--card-skeleton' },
  // ── Primitives/Dialog → primitivesdialog ─────────────────────────────────
  { slug: 'dialog',        name: 'Dialog',        description: 'Accessible modal dialog with focus trap, animation, and portal rendering.',                   category: 'Feedback', tags: ['modal', 'overlay', 'popup'],       hasExample: true, storybookId: 'primitivesdialog--form-dialog' },
  // ── Primitives/Controls → primitivescontrols ─────────────────────────────
  { slug: 'checkbox',      name: 'Checkbox',      description: 'Accessible checkbox with indeterminate state and label support.',                             category: 'Input',    tags: ['form', 'toggle'],                  hasExample: true, storybookId: 'primitivescontrols--checkbox-story' },
  { slug: 'switch',        name: 'Switch',        description: 'Toggle switch for boolean settings with smooth animation.',                                   category: 'Input',    tags: ['toggle', 'boolean', 'form'],       hasExample: true, storybookId: 'primitivescontrols--switch-story' },
  { slug: 'slider',        name: 'Slider',        description: 'Range slider with draggable handle and configurable min/max/step.',                           category: 'Input',    tags: ['range', 'form'],                   hasExample: true, storybookId: 'primitivescontrols--slider-story' },
  // ── Overlays/All → overlaysall ───────────────────────────────────────────
  { slug: 'tooltip',       name: 'Tooltip',       description: 'Hover tooltip with configurable delay, placement, and content.',                              category: 'Display',  tags: ['hint', 'helper'],                  hasExample: true, storybookId: 'overlaysall--tooltip-demo' },
  { slug: 'popover',       name: 'Popover',       description: 'Floating popover with configurable placement and focus management.',                          category: 'Display',  tags: ['overlay', 'floating'],             hasExample: true, storybookId: 'overlaysall--popover-demo' },
  { slug: 'sheet',         name: 'Sheet',         description: 'Slide-in panel from any edge with backdrop overlay.',                                          category: 'Feedback', tags: ['drawer', 'panel', 'sidebar'],      hasExample: true, storybookId: 'overlaysall--sheet-demo' },
  // ── Forms/Controls → formscontrols ───────────────────────────────────────
  { slug: 'select',        name: 'Select',        description: 'Dropdown select with options, groups, search, and full keyboard navigation.',                 category: 'Input',    tags: ['dropdown', 'form'],                hasExample: true, storybookId: 'formscontrols--select-demo' },
  // ── Forms/Combobox → formscombobox ───────────────────────────────────────
  { slug: 'combobox',      name: 'Combobox',      description: 'Autocomplete combo box with searchable options and keyboard navigation.',                     category: 'Input',    tags: ['autocomplete', 'search', 'form'],  hasExample: true, storybookId: 'formscombobox--default' },
  // ── Forms (no slash) → forms ─────────────────────────────────────────────
  { slug: 'date-picker',   name: 'Date Picker',   description: 'Calendar-based date picker with input field and range selection support.',                    category: 'Input',    tags: ['date', 'calendar', 'form'],        hasExample: true, storybookId: 'forms--date-picker-story' },
  { slug: 'form',          name: 'Form',          description: 'Form primitives integrated with React Hook Form and Zod schema validation.',                   category: 'Input',    tags: ['validation', 'react-hook-form'],   hasExample: true, storybookId: 'forms--form-story' },
  { slug: 'file-upload',   name: 'File Upload',   description: 'Drag-and-drop file upload with preview, validation, and progress.',                          category: 'Input',    tags: ['upload', 'file', 'drag-drop'],     hasExample: true, storybookId: 'forms--file-upload-story' },
  // ── AppShell/Sidebar → appshellsidebar ───────────────────────────────────
  { slug: 'sidebar',       name: 'Sidebar',       description: 'Collapsible navigation sidebar with groups, icons, badges, and responsive behavior.',         category: 'Layout',   tags: ['navigation', 'sidebar', 'nav'],    hasExample: true, storybookId: 'appshellsidebar--default' },
  // ── Data Display (space → hyphen) → data-display ─────────────────────────
  { slug: 'stat',          name: 'Stat',          description: 'KPI metric card with trend indicator, icon, and period comparison. Group with StatGroup.',    category: 'Data',     tags: ['kpi', 'metric', 'analytics'],      hasExample: true, storybookId: 'data-display--stat-story' },
  { slug: 'data-table',    name: 'Data Table',    description: 'Paginated, searchable data table with sortable columns and loading state.',                   category: 'Data',     tags: ['table', 'sort', 'filter'],         hasExample: true, storybookId: 'data-display--data-table-story' },
  { slug: 'property-list', name: 'Property List', description: 'Key-value metadata display for detail panels and settings.',                                  category: 'Display',  tags: ['metadata', 'details', 'info'],     hasExample: true, storybookId: 'data-display--property-list-story' },
  { slug: 'timeline',      name: 'Timeline',      description: 'Chronological event list with icons, connectors, and timestamps.',                            category: 'Display',  tags: ['events', 'history', 'log'],        hasExample: true, storybookId: 'data-display--timeline-story' },
  { slug: 'persona',       name: 'Persona',       description: 'User identity card combining avatar, name, role, and status.',                                category: 'Display',  tags: ['user', 'profile', 'identity'],     hasExample: true, storybookId: 'data-display--persona-story' },
  // ── Data/DataGrid → datadatagrid ─────────────────────────────────────────
  { slug: 'data-grid',     name: 'Data Grid',     description: 'Advanced data grid with row selection, column visibility, and virtual scrolling.',            category: 'Data',     tags: ['table', 'tanstack', 'virtual'],    hasExample: true, storybookId: 'datadatagrid--basic' },
  // ── Components/EmptyState → componentsemptystate ─────────────────────────
  { slug: 'empty-state',   name: 'Empty State',   description: 'Illustration + heading + call-to-action for empty data views.',                               category: 'Feedback', tags: ['empty', 'placeholder', 'zero'],    hasExample: true, storybookId: 'componentsemptystate--default' },
  // ── Charts/AreaChart → chartsareachart ───────────────────────────────────
  { slug: 'area-chart',    name: 'Area Chart',    description: 'Smooth gradient area chart built on Recharts with series, tooltip, and legend.',              category: 'Data',     tags: ['chart', 'recharts', 'analytics'],  hasExample: true, storybookId: 'chartsareachart--multi-key' },
  { slug: 'bar-chart',     name: 'Bar Chart',     description: 'Grouped and stacked bar chart built on Recharts with custom tooltip.',                        category: 'Data',     tags: ['chart', 'recharts', 'bar'],        hasExample: true, storybookId: 'chartsareachart--bar-basic' },
  { slug: 'line-chart',    name: 'Line Chart',    description: 'Multi-series line chart with dot markers, legend, and tooltip.',                              category: 'Data',     tags: ['chart', 'recharts', 'line'],       hasExample: true, storybookId: 'chartsareachart--line-basic' },
  { slug: 'sparkline',     name: 'Sparkline',     description: 'Compact inline trend chart for embedding in stat cards and tables.',                          category: 'Data',     tags: ['chart', 'mini', 'trend'],          hasExample: true, storybookId: 'chartsareachart--sparkline-line' },
  // ── Advanced (no slash) → advanced ───────────────────────────────────────
  { slug: 'kanban',        name: 'Kanban',        description: 'Drag-and-drop kanban board for task management with multi-column layout controls.',            category: 'Layout',   tags: ['board', 'dnd', 'tasks', 'pm'],     hasExample: true, storybookId: 'advanced--kanban-story' },
  { slug: 'bulk-actions',  name: 'Bulk Actions',  description: 'Floating action bar that appears when rows are selected, with configurable actions.',          category: 'Input',    tags: ['table', 'selection', 'actions'],   hasExample: true, storybookId: 'advanced--bulk-actions-story' },
  { slug: 'filters',       name: 'Filters',       description: 'Composable filter builder with text, select, and number filter types.',                        category: 'Input',    tags: ['filter', 'table', 'query'],        hasExample: true, storybookId: 'advanced--filters-story' },
  { slug: 'command-bar',   name: 'Command Bar',   description: 'Keyboard-driven command bar (⌘K) with grouped actions, search, and shortcuts.',               category: 'Input',    tags: ['keyboard', 'search', 'cmdk'],      hasExample: true, storybookId: 'advanced--command-bar-story' },
  { slug: 'toggle-button', name: 'Toggle Button', description: 'Segmented toggle button group for exclusive or multi-select mode switching.',                  category: 'Input',    tags: ['toggle', 'segment', 'select'],     hasExample: true, storybookId: 'advanced--toggle-button-story' },
  // ── Feedback/Banner,LoadingOverlay,Stepper → feedbackbanner-loadingoverlay-stepper
  { slug: 'banner',        name: 'Banner',        description: 'Alert banner with info, success, warning, error, and neutral variants plus dismiss.',          category: 'Feedback', tags: ['alert', 'notification', 'status'], hasExample: true, storybookId: 'feedbackbanner-loadingoverlay-stepper--banner-all-variants' },
  { slug: 'stepper',       name: 'Stepper',       description: 'Multi-step progress indicator for forms, onboarding, and wizards.',                           category: 'Layout',   tags: ['wizard', 'steps', 'onboarding'],   hasExample: true, storybookId: 'feedbackbanner-loadingoverlay-stepper--stepper-step-1' },
  // ── Blocks (no slash) → blocks ───────────────────────────────────────────
  { slug: 'chat-detail',             name: 'Chat Detail',        description: 'Full-featured messaging UI with thread view, reactions, and file attachments.',    category: 'Layout',   tags: ['messaging', 'chat', 'inbox'],      hasExample: true, storybookId: 'blocks--chat-detail-story' },
  { slug: 'sidebar-layout-dashboard',name: 'App Shell',          description: 'Sidebar + main layout with mobile trigger, collapse, and responsive behavior.',    category: 'Layout',   tags: ['navigation', 'sidebar', 'shell'],  hasExample: true, storybookId: 'blocks--sidebar-dashboard' },
  { slug: 'metric-card',             name: 'Metric Card',        description: 'Self-contained KPI card block with trend, icon, and comparison period.',           category: 'Data',     tags: ['kpi', 'chart', 'block'],           hasExample: true, storybookId: 'blocks--metric-cards' },
  { slug: 'task-card',               name: 'Task Card',          description: 'Rich task item with priority, assignee, due date, and labels.',                    category: 'Display',  tags: ['task', 'pm', 'jira'],              hasExample: true, storybookId: 'blocks--task-cards' },
  { slug: 'messages-card',           name: 'Messages Card',      description: 'Compact message thread preview card with avatar and unread count.',                 category: 'Display',  tags: ['chat', 'notifications'],           hasExample: true, storybookId: 'blocks--messages-card-story' },
  { slug: 'invite-modal',            name: 'Invite Modal',       description: 'Team invite modal with role selector and email input.',                             category: 'Feedback', tags: ['team', 'invite', 'modal'],         hasExample: true, storybookId: 'blocks--invite-modal-story' },
  { slug: 'workspace-members',       name: 'Workspace Members',  description: 'Team member management with roles, permissions, and invite actions.',              category: 'Layout',   tags: ['team', 'members', 'settings'],     hasExample: true, storybookId: 'blocks--members-settings' },
  { slug: 'integration-card',        name: 'Integration Card',   description: 'Third-party service integration card with connected/disconnected toggle.',          category: 'Display',  tags: ['integration', 'settings', 'api'],  hasExample: true, storybookId: 'blocks--integration-cards' },
  { slug: 'user-menu',               name: 'User Menu',          description: 'Authenticated user dropdown with profile, settings, and sign-out.',                 category: 'Layout',   tags: ['auth', 'navigation', 'user'],      hasExample: true, storybookId: 'blocks--user-menu-story' },
  { slug: 'file-cards',              name: 'File Cards',         description: 'File/document preview card grid with type icon, size, and metadata.',              category: 'Display',  tags: ['file', 'media', 'storage'],        hasExample: true, storybookId: 'blocks--file-cards-story' },
  { slug: 'sortable-task-list',      name: 'Sortable Task List', description: 'Drag-to-reorder task list with status, priority, and assignee per row.',           category: 'Layout',   tags: ['task', 'dnd', 'list', 'pm'],       hasExample: true, storybookId: 'blocks--task-list-story' },
  // ── Layouts (no slash) → layouts ─────────────────────────────────────────
  { slug: 'app-shell-layout', name: 'App Shell Layout', description: 'Full composable app shell with sidebar, navbar, page header, and body slots.',    category: 'Layout',   tags: ['navigation', 'sidebar', 'shell'],  hasExample: true, storybookId: 'layouts--app-shell-layout' },
  { slug: 'split-page',       name: 'Split Page',       description: 'Two-panel layout with list and detail panes for email/file browsers.',            category: 'Layout',   tags: ['list', 'detail', 'layout'],        hasExample: true, storybookId: 'layouts--split-page-layout' },
  { slug: 'stack',            name: 'Stack',            description: 'Flex-based HStack and VStack layout primitives with gap, align, and justify.',     category: 'Layout',   tags: ['flex', 'layout', 'spacing'],       hasExample: true, storybookId: 'layouts--stack-layouts' },
  { slug: 'page-layout',      name: 'Page Layout',      description: 'Page shell with header, actions, and body — for settings, forms, and dashboards.', category: 'Layout',   tags: ['page', 'header', 'shell'],         hasExample: true, storybookId: 'layouts--page-layout' },
  // ── Data/Lists → datalists ───────────────────────────────────────────────
  { slug: 'structured-list',  name: 'Structured List', description: 'Sectioned settings-style list with icons, descriptions, and right-side content.',  category: 'Display',  tags: ['settings', 'list', 'menu'],        hasExample: true, storybookId: 'datalists--settings-list' },
  // ── No Storybook story yet ────────────────────────────────────────────────
  { slug: 'accordion',     name: 'Accordion',     description: 'Collapsible sections with smooth spring animation and keyboard support.',                    category: 'Layout',   tags: ['collapse', 'faq', 'disclosure'] },
  { slug: 'scroll-area',   name: 'Scroll Area',   description: 'Custom scrollbar with cross-browser styling consistency.',                                   category: 'Layout',   tags: ['scroll', 'overflow'] },
  { slug: 'dropdown-menu', name: 'Dropdown Menu', description: 'Radix dropdown menu with groups, separators, shortcuts, and icons.',                        category: 'Input',    tags: ['menu', 'navigation', 'actions'] },
]

export const componentBySlug = (slug: string) => components.find((c) => c.slug === slug)

export type ExampleEntry = {
  Demo: React.ComponentType
  code: string
}
