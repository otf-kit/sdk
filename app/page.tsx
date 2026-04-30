'use client'

import { useEffect } from 'react'
import { Navbar }         from '@/components/otf/Navbar'
import { Hero }           from '@/components/otf/Hero'
import { ComponentTeaser }from '@/components/component-teaser'
import { Components }     from '@/components/otf/Components'
import { Compatibility }  from '@/components/otf/Compatibility'
import { Features }       from '@/components/otf/Features'
import { PricingSection } from '@/components/pricing-section'
import { Testimonials }   from '@/components/otf/Testimonials'
import { Faq }            from '@/components/faq'
import { CTA }            from '@/components/otf/CTA'
import { Footer }         from '@/components/otf/Footer'
import { Reveal }         from '@/components/otf/Reveal'

export default function HomePage() {
  // Scroll to top on every mount so back-navigation always starts at the hero.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

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
