import type { TemplateConfig } from '@/lib/template-config'

const BASE  = 'https://www.reference site/img/reference'
const ICONS = 'https://www.reference site/img'

const BUY    = '/templates'
const BUNDLE = '/templates'

export const fitnessTemplate: TemplateConfig = {
  id: 'fitness-kit',
  name: 'Fitness Kit',
  mockupShape: 'phone',
  hero: {
    eyebrow: 'Fitness App Kit · Expo + Hono',
    title: 'reference.',
    titleAccent: 'Fitness Template.',
    description:
      'A React Native + Expo template with workout tracking, nutrition analysis, progress charts, and full onboarding. Pre-loaded for Cursor, Claude, Lovable & Bolt — describe your idea and ship.',
    primaryCta: { label: 'Get this kit — $149', href: BUY },
    badges: [
      { src: `${ICONS}/expo.svg`,       alt: 'Expo SDK' },
      { src: `${ICONS}/nativewind.svg`, alt: 'NativeWind' },
      { src: `${ICONS}/react.svg`,      alt: 'React Native' },
      { src: `${ICONS}/apple.svg`,      alt: 'iOS' },
      { src: `${ICONS}/android.svg`,    alt: 'Android' },
    ],
    media: { type: 'video', src: `${BASE}/reference.mp4`, poster: `${BASE}/main-1.jpg` },
  },
  claudeCursor: {
    title: 'Build your app in minutes with Claude and Cursor',
    description:
      'Every kit ships with CLAUDE.md, .cursorrules, and 20+ tested prompts — your AI assistant understands the codebase from the first prompt.',
    description2:
      'Open in Cursor, Claude, Lovable, or Bolt. Describe what you want to build. Ship in days, not months.',
    cta: { label: 'Get the bundle', href: BUNDLE },
    video: { src: `${BASE}/reference.mp4`, poster: `${BASE}/main-1.jpg` },
  },
  carousels: [
    {
      title: '25+ screens',
      description: 'Complete fitness experience.',
      screens: [
        { src: `${BASE}/main-1.jpg`, label: 'Dashboard' },
        { src: `${BASE}/main-2.jpg`, label: 'Meal Tracking' },
        { src: `${BASE}/main-3.jpg`, label: 'Workout Plans' },
        { src: `${BASE}/main-4.jpg`, label: 'Progress Charts' },
        { src: `${BASE}/main-5.jpg`, label: 'Exercise Library' },
        { src: `${BASE}/main-6.jpg`, label: 'Nutrition Overview' },
        { src: `${BASE}/main-7.jpg`, label: 'Goal Setting' },
        { src: `${BASE}/main-8.jpg`, label: 'Water Tracking' },
        { src: `${BASE}/main-9.jpg`, label: 'Profile Settings' },
      ],
    },
    {
      title: 'Onboarding',
      description: 'Personalised setup for preferences and measurements.',
      screens: [
        { src: `${BASE}/onboarding-1.jpg`,  label: 'Welcome Screen' },
        { src: `${BASE}/onboarding-2.jpg`,  label: 'Goal Setting' },
        { src: `${BASE}/onboarding-3.jpg`,  label: 'Activity Level' },
        { src: `${BASE}/onboarding-4.jpg`,  label: 'Personal Info' },
        { src: `${BASE}/onboarding-5.jpg`,  label: 'Body Measurements' },
        { src: `${BASE}/onboarding-6.jpg`,  label: 'Dietary Preferences' },
        { src: `${BASE}/onboarding-7.jpg`,  label: 'Fitness Goals' },
        { src: `${BASE}/onboarding-8.jpg`,  label: 'Notification Settings' },
        { src: `${BASE}/onboarding-9.jpg`,  label: 'Profile Setup' },
        { src: `${BASE}/onboarding-10.jpg`, label: 'Getting Started' },
      ],
    },
    {
      title: 'Tracking',
      description: 'Workout and meal tracking.',
      screens: [
        { src: `${BASE}/tracking-1.jpg`, label: 'Progress Dashboard' },
        { src: `${BASE}/tracking-2.jpg`, label: 'Weight Tracking' },
        { src: `${BASE}/tracking-3.jpg`, label: 'Calorie Charts' },
        { src: `${BASE}/tracking-4.jpg`, label: 'Workout Analytics' },
        { src: `${BASE}/tracking-5.jpg`, label: 'Nutrition Breakdown' },
        { src: `${BASE}/tracking-6.jpg`, label: 'Progress Photos' },
      ],
    },
  ],
  components: {
    title: 'Fully customisable components and flows',
    items: [
      'Workout tracking',
      'Meal logging',
      'Calorie counter',
      'Progress charts',
      'Exercise library',
      'Meal library',
      'Body measurements',
      'Water tracking',
      'Onboarding flow',
    ],
    cta: { label: 'Get this kit — $149', href: BUY },
    image: `${BASE}/components.png`,
  },
  expoGo: {
    sdk54: {
      title: 'Try the Fitness Kit in Expo Go',
      description: 'Scan with Expo Go (SDK 54) to open the live kit instantly — no build step needed.',
      qr: 'https://qr.expo.dev/eas-update?projectId=847f75b9-332b-4f4a-8c86-91490ba676c7&runtimeVersion=exposdk%3A54.0.0&channel=preview',
      cta: { label: 'Get the kit', href: BUY },
    },
    sdk53: {
      title: 'Try the OTF Native UI Showcase',
      description: 'Explore every component, block, and pattern from the OTF design system — all running live in Expo Go.',
      qr: 'https://qr.expo.dev/eas-update?projectId=31d0aa44-4713-44d9-91aa-c2e2c58c08ad&runtimeVersion=exposdk%3A54.0.0&channel=preview',
    },
  },
  techStack: {
    title: 'Built with a modern stack',
    description: 'Latest tools — fully typed, fully wired, and pre-loaded for every AI coding tool.',
    items: [
      { icon: `${ICONS}/expo.svg`,       title: 'Expo SDK 54',       desc: 'Compatible with SDK 54 and 53 — all the latest features and improvements.' },
      { icon: `${ICONS}/react.svg`,      title: 'React Native 0.81', desc: 'Latest React Native with improved performance and DX.' },
      { icon: `${ICONS}/nativewind.svg`, title: 'NativeWind',        desc: 'TailwindCSS-style utility classes for React Native.' },
      { icon: `${ICONS}/typescript.svg`, title: 'TypeScript 5.9',    desc: 'Fully typed codebase for better DX and fewer bugs.' },
      { icon: `${ICONS}/theme.svg`,      title: 'Light & Dark mode', desc: 'Fully customisable light and dark themes.' },
      { icon: `${ICONS}/phone.svg`,      title: 'iOS & Android',     desc: 'Thoroughly tested on both platforms for a consistent experience.' },
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
