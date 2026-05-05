export type MockupShape = 'phone' | 'laptop'

export interface Screen {
  src: string
  label: string
}

export interface TechItem {
  icon: string
  title: string
  desc: string
}

export interface BadgeIcon {
  src: string
  alt: string
}

export interface Carousel {
  title: string
  description: string
  screens: Screen[]
}

export interface CtaButton {
  label: string
  href: string
}

export interface HeroSection {
  eyebrow: string
  title: string
  titleAccent?: string
  description: string
  primaryCta: CtaButton
  secondaryCta?: CtaButton
  badges: BadgeIcon[]
  /** Phone-shaped video OR laptop image */
  media:
    | { type: 'video'; src: string; poster: string }
    | { type: 'image'; src: string; alt: string }
}

export interface ClaudeCursorSection {
  title: string
  description: string
  description2?: string
  cta: CtaButton
  video: { src: string; poster: string }
}

export interface ComponentsSection {
  title: string
  items: string[]
  cta: CtaButton
  image: string
}

export interface ExpoGoSection {
  sdk54: { title: string; description: string; qr: string; cta: CtaButton }
  sdk53: { title: string; description: string; qr: string }
}

export interface TechStackSection {
  title: string
  description: string
  items: TechItem[]
}

export interface BundleSection {
  title: string
  description: string
  price: string
  oldPrice: string
  perks: string[]
  cta: CtaButton
  image: string
}

export interface TemplateConfig {
  id: string
  name: string
  /** Stripe kit slug — when set, CTA hrefs of '#checkout' trigger Stripe checkout */
  kitSlug?: string
  mockupShape: MockupShape
  hero: HeroSection
  claudeCursor?: ClaudeCursorSection
  carousels: Carousel[]
  components: ComponentsSection
  expoGo?: ExpoGoSection
  techStack: TechStackSection
  bundle: BundleSection
}
