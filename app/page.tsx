import { Navbar }         from '@/components/kibo/Navbar'
import { Hero }           from '@/components/kibo/Hero'
import { ComponentTeaser }from '@/components/component-teaser'
import { Components }     from '@/components/kibo/Components'
import { Compatibility }  from '@/components/kibo/Compatibility'
import { Features }       from '@/components/kibo/Features'
import { PricingSection } from '@/components/pricing-section'
import { Testimonials }   from '@/components/kibo/Testimonials'
import { Faq }            from '@/components/faq'
import { CTA }            from '@/components/kibo/CTA'
import { Footer }         from '@/components/kibo/Footer'
import { Reveal }         from '@/components/kibo/Reveal'

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <Hero />
      <Reveal direction="up" distance={32}><ComponentTeaser /></Reveal>
      <Reveal direction="up" distance={32}><Components /></Reveal>
      <Reveal direction="up" distance={32}><Compatibility /></Reveal>
      <Reveal direction="up" distance={32} delay={60}><Features /></Reveal>
      <Reveal direction="up" distance={32}><PricingSection /></Reveal>
      <Reveal direction="up" distance={32}><Testimonials /></Reveal>
      <Reveal direction="up" distance={32}><Faq /></Reveal>
      <Reveal direction="up" distance={28}><CTA /></Reveal>
      <Reveal direction="up" distance={20}><Footer /></Reveal>
    </main>
  )
}
