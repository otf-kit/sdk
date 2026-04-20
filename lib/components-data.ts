export type Platform = 'Web' | 'Native' | 'Both'
export type Category =
  | 'Primitives'
  | 'Components'
  | 'Blocks'
  | 'Forms'
  | 'Layouts'
  | 'Advanced'
  | 'Charts'
  | 'Engagement'
  | 'Patterns'
  | 'Interface'

export interface ComponentEntry {
  name: string
  platform: Platform
  category: Category
}

const webPrimitives: ComponentEntry[] = [
  'Accordion','AlertDialog','Alert','AspectRatio','Avatar','Badge','Button','Calendar','Card',
  'Carousel','Chart','Checkbox','Collapsible','Command','ContextMenu','Dialog','Drawer',
  'DropdownMenu','Form','HoverCard','InputOtp','Input','Label','Menubar','NavigationMenu',
  'Pagination','Popover','Progress','Radio','Resizable','ScrollArea','Select','Separator',
  'Sheet','Skeleton','Slider','Sonner','Spinner','Switch','Table','Tabs','Textarea',
  'ToggleGroup','Toggle','Tooltip',
].map((name) => ({ name, platform: 'Web', category: 'Primitives' }))

const webComponents: ComponentEntry[] = [
  'Banner','Breadcrumb','CommandItem','DataGrid','DataTable','EmptyState','Hotkeys','IconBadge',
  'LoadingOverlay','Persona','PropertyList','Stat','Stepper','StructuredList','Timeline','Toaster',
].map((name) => ({ name, platform: 'Web', category: 'Components' }))

const webBlocks: ComponentEntry[] = [
  'ChatDetail','FeedbackModal','FileCards','FilesList','IntegrationCard','InviteModal',
  'ManageTagsModal','MessagesCard','MetricCard','NotificationSettings','OrganizationMenu',
  'RolesMenu','SelectUsersModal','SidebarLayoutDashboard','SidebarLayoutGroups',
  'SidebarLayoutMinimal','SidebarLayoutSearch','SidebarLayoutUser','SortableTaskList',
  'StackedLayoutBranded','StackedLayoutTabs','TaskCard','UserMenu','WorkspaceMembers',
].map((name) => ({ name, platform: 'Web', category: 'Blocks' }))

const webForms: ComponentEntry[] = [
  'ArrayField','AutoForm','DatePicker','Field','FileUpload','Form','ObjectField','PasswordInput',
  'SearchInput','StepForm',
].map((name) => ({ name, platform: 'Web', category: 'Forms' }))

const webLayouts: ComponentEntry[] = [
  'AppShell','Container','Navbar','Page','ResizeBox','Sidebar','SplitPage','Stack',
].map((name) => ({ name, platform: 'Web', category: 'Layouts' }))

const webAdvanced: ComponentEntry[] = [
  'BulkActions','CommandBar','Filters','Kanban','ToggleButton',
].map((name) => ({ name, platform: 'Web', category: 'Advanced' }))

const webCharts: ComponentEntry[] = [
  'AreaChart','BarChart','LineChart','Sparkline',
].map((name) => ({ name, platform: 'Web', category: 'Charts' }))

const webEngagement: ComponentEntry[] = [
  'Beacon','Tour',
].map((name) => ({ name, platform: 'Web', category: 'Engagement' }))

const nativePrimitives: ComponentEntry[] = [
  'Avatar','Button','Card','Input','Text',
].map((name) => ({ name, platform: 'Native', category: 'Primitives' }))

const nativePatterns: ComponentEntry[] = [
  'ActionSheet','AppHeader','AvatarGroup','OtfDialog','OtfPopover','OtfSelect','BottomSheet',
  'Carousel','ChatBubble','Chip','ConfirmDialog','CountdownBanner','DataTable','DatePicker',
  'EmptyState','EventCard','FinanceDashboard','FloatingActionButton','GlassCard',
  'ImmersiveMediaScreen','LoginScreen','MediaCard','NotificationBanner','OTPInput',
  'OnboardingCarousel','PasswordInput','PaywallScreen','PricingTable','ProductCard',
  'ProfileHeader','ProgressSteps','PullToRefresh','SearchBar','SettingsScreen','Skeleton',
  'SwipeCards','SwipeableRow','TabBar','TestimonialCard','UserPreferences',
].map((name) => ({ name, platform: 'Native', category: 'Patterns' }))

const nativeLayouts: ComponentEntry[] = [
  'Divider','Grid','KeyboardStickyFooter','ListItem','SafeArea','ScreenLayout','Section',
  'StepPageLayout',
].map((name) => ({ name, platform: 'Native', category: 'Layouts' }))

const nativeInterface: ComponentEntry[] = [
  'Badge','OtfAccordion','OtfTabs','OtfToast','OtfToggleGroup','BrandIcons','Dialog',
  'FormField','Headings','Icon','Image','PageContainer','Pressable','Separator','Tooltip',
].map((name) => ({ name, platform: 'Native', category: 'Interface' }))

export const allComponents: ComponentEntry[] = [
  ...webPrimitives,
  ...webComponents,
  ...webBlocks,
  ...webForms,
  ...webLayouts,
  ...webAdvanced,
  ...webCharts,
  ...webEngagement,
  ...nativePrimitives,
  ...nativePatterns,
  ...nativeLayouts,
  ...nativeInterface,
]

export const webCount = allComponents.filter((c) => c.platform === 'Web').length
export const nativeCount = allComponents.filter((c) => c.platform === 'Native').length
