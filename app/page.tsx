import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { AiStrip } from '@/components/ai-strip'
import { ComponentTeaser } from '@/components/component-teaser'
import { AdvancedTeaser } from '@/components/advanced-teaser'
import { TemplateCatalog } from '@/components/template-catalog'
import { CrossPlatform } from '@/components/cross-platform'
import { TechStack } from '@/components/tech-stack'
import { PricingSection } from '@/components/pricing-section'
import { Waitlist } from '@/components/waitlist'
import { Faq } from '@/components/faq'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-dvh bg-[#0a0a0a]">
      <Nav />
      <Hero />
      <AiStrip />
      <ComponentTeaser />
      <AdvancedTeaser />
      <TemplateCatalog />
      <CrossPlatform />
      <TechStack />
      <PricingSection />
      <Waitlist />
      <Faq />
      <Footer />
    </main>
  )
}
