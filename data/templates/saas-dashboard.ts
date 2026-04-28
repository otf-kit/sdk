import type { TemplateConfig } from '@/lib/template-config'

const BASE  = 'https://www.reference site/img/dash'
const ICONS = 'https://www.reference site/img'

const DEMO   = 'https://saas-dashboard-production-ae3f.up.railway.app'
const BUNDLE = '/templates'

export const saasDashboardTemplate: TemplateConfig = {
  id: 'saas-dashboard',
  name: 'SaaS Dashboard',
  mockupShape: 'laptop',
  hero: {
    eyebrow: 'SaaS Dashboard Kit · Vite + Hono',
    title: 'Dash.',
    titleAccent: 'SaaS Dashboard Template.',
    description:
      'A modern, fully-featured Vite + Hono dashboard with Postgres, charts, data tables, user management, analytics, and more. Pre-loaded with CLAUDE.md and .cursorrules — your AI assistant ships features in minutes.',
    primaryCta: { label: 'Get this kit — $149', href: '#buy' },
    secondaryCta: { label: 'View demo', href: DEMO },
    badges: [
      { src: `${ICONS}/next.svg`,       alt: 'Vite' },
      { src: `${ICONS}/tailwind.svg`,   alt: 'Tailwind CSS' },
      { src: `${ICONS}/typescript.svg`, alt: 'TypeScript' },
      { src: `${ICONS}/theme.svg`,      alt: 'Dark Mode' },
      { src: `${ICONS}/motion.svg`,     alt: 'Motion' },
    ],
    media: { type: 'image', src: `${BASE}/landing-hero.png`, alt: 'Dashboard Admin Panel' },
  },
  claudeCursor: {
    title: 'Build your SaaS in minutes with Claude and Cursor',
    description:
      'Every kit ships with CLAUDE.md, .cursorrules, and 20+ tested prompts — your AI assistant understands the codebase from the first prompt.',
    description2:
      'Open in Cursor, Claude, Lovable, or Bolt. Describe what you want to build. Ship in days, not months.',
    cta: { label: 'Get the bundle', href: BUNDLE },
    video: { src: `${BASE}/landing-hero.png`, poster: `${BASE}/landing-hero.png` },
  },
  carousels: [
    {
      title: 'Dark mode support',
      description: 'Beautiful dark mode for every dashboard page and component.',
      screens: [
        { src: `${BASE}/dark-1.png`, label: 'Dashboard Dark Mode' },
        { src: `${BASE}/dark-2.png`, label: 'Analytics Dark Mode' },
        { src: `${BASE}/dark-3.png`, label: 'Tables Dark Mode' },
        { src: `${BASE}/dark-4.png`, label: 'Users Dark Mode' },
        { src: `${BASE}/dark-5.png`, label: 'Products Dark Mode' },
        { src: `${BASE}/dark-6.png`, label: 'Settings Dark Mode' },
        { src: `${BASE}/dark-7.png`, label: 'Charts Dark Mode' },
      ],
    },
    {
      title: 'Light mode',
      description: 'Light mode dashboard with charts, tables, user management, and more.',
      screens: [
        { src: `${BASE}/light-1.png`, label: 'Dashboard Overview' },
        { src: `${BASE}/light-2.png`, label: 'Analytics Charts' },
        { src: `${BASE}/light-3.png`, label: 'User Management' },
        { src: `${BASE}/light-4.png`, label: 'Products Table' },
        { src: `${BASE}/light-5.png`, label: 'Marketing Stats' },
        { src: `${BASE}/light-6.png`, label: 'Data Tables' },
        { src: `${BASE}/light-7.png`, label: 'Settings' },
      ],
    },
  ],
  components: {
    title: 'Everything you need for your dashboard',
    items: [
      'Interactive charts',
      'Data tables',
      'User management',
      'Product catalog',
      'Marketing analytics',
      'Dashboard cards',
      'Settings panel',
      'Search functionality',
      'Login & auth pages',
      'Dark mode',
      'Responsive design',
      'Fully customisable',
    ],
    cta: { label: 'Get this kit — $149', href: '#buy' },
    image: `${BASE}/components.png`,
  },
  techStack: {
    title: 'Built with a modern stack',
    description: 'Latest tools — fully typed, fully wired, and pre-loaded for every AI coding tool.',
    items: [
      { icon: `${ICONS}/next.svg`,       title: 'Vite + React 19',  desc: 'Fast Vite + React 19 client with file-based routing.' },
      { icon: `${ICONS}/tailwind.svg`,   title: 'Tailwind CSS v4',  desc: 'Utility-first styling with theme variables and dark mode.' },
      { icon: `${ICONS}/typescript.svg`, title: 'TypeScript',       desc: 'Fully typed codebase for better DX and fewer bugs.' },
      { icon: `${ICONS}/theme.svg`,      title: 'Light & Dark mode', desc: 'Fully customisable light and dark themes.' },
      { icon: `${ICONS}/phone.svg`,      title: 'Fully responsive', desc: 'Tested across desktop, tablet, and mobile for a consistent experience.' },
      { icon: `${ICONS}/motion.svg`,     title: 'Motion + Hono',    desc: 'Smooth animations and a Hono API server with Postgres.' },
    ],
  },
  bundle: {
    title: 'All kits bundle',
    description: 'Lifetime access to every OTF kit. New kits drop monthly.',
    price: '$399',
    oldPrice: '$799',
    perks: [
      'Lifetime access to every kit',
      'All future kits included',
      'New kits every month',
      'All future updates',
      'Priority support',
      'Slack channel access',
    ],
    cta: { label: 'Get the bundle', href: BUNDLE },
    image: 'https://www.reference site/img/bundle.png',
  },
}
