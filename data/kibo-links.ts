// OTF-adapted navigation links for footer, search, and mobile nav

export const docsLinks = [
  { label: 'Introduction', href: '/docs' },
  { label: 'Getting Started', href: '/docs/getting-started' },
  { label: 'Components', href: '/components' },
  { label: 'Templates', href: '/templates' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'AI Configs', href: '/docs/ai-configs' },
  { label: 'Contributing', href: '/docs/contributing' },
  { label: 'Changelog', href: '/docs/changelog' },
]

export const componentLinks = [
  'Button', 'Avatar', 'Badge', 'Card', 'Checkbox', 'Command', 'Dialog', 'Dropdown Menu',
  'Form', 'Input', 'Label', 'Popover', 'Select', 'Sheet', 'Skeleton', 'Switch',
  'Table', 'Tabs', 'Toast', 'Tooltip', 'Kanban', 'Data Grid', 'Chart', 'Sidebar',
  'App Shell', 'Stat', 'Chat', 'Calendar', 'Date Picker', 'Color Picker',
  'Rich Editor', 'File Upload', 'Command Palette', 'Navigation Menu',
  'Breadcrumb', 'Progress', 'Radio Group', 'Scroll Area', 'Separator',
  'Slider', 'Textarea', 'Toggle',
].map((label) => ({
  label,
  href: `/components/${label.toLowerCase().replace(/\s+/g, '-')}`,
}))

export const blockLinks = [
  'Hero', 'Pricing', 'FAQ', 'Features', 'Testimonials', 'CTA', 'Footer',
  'Header', 'Stats', 'Team', 'Blog', 'Contact', 'Auth Login', 'Auth Register',
  'Dashboard', 'Settings', 'Profile', 'Billing', 'Onboarding', 'Empty State',
  'Error Page', 'Loading', 'Data Table', 'Kanban Board',
].map((label) => ({
  label,
  href: `/blocks/${label.toLowerCase().replace(/\s+/g, '-')}`,
}))

export const patternLinks = [
  'SaaS Dashboard', 'Mobile App Shell', 'AI Chat Interface', 'Marketplace Listing',
  'Admin Panel', 'Analytics Dashboard', 'Project Management', 'CRM Layout',
  'E-commerce Checkout', 'Onboarding Flow', 'Settings Page', 'Invoice Generator',
  'Notification Center', 'Calendar Scheduling', 'File Manager',
].map((label) => ({
  label,
  href: `/patterns/${label.toLowerCase().replace(/\s+/g, '-')}`,
}))

export const communityLinks = [
  { label: 'GitHub', href: 'https://github.com/open-template-forest' },
  { label: 'Twitter / X', href: 'https://x.com/opentemplatefst' },
  { label: 'Discord', href: '/#waitlist' },
  { label: 'Contributing', href: '/docs/contributing' },
]
