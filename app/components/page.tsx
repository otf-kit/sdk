import type { Metadata } from 'next'
import { Navbar }           from '@/components/otf/Navbar'
import { Footer }           from '@/components/otf/Footer'
import { ComponentsGrid }   from './ComponentsGrid'
import { components }       from '@/data/component-registry'

export const metadata: Metadata = {
  title: 'Components — OTF',
  description: `Browse ${components.length}+ production-ready UI components with live Storybook previews. Dark-first, fully typed, MIT license.`,
}

export default function ComponentsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <ComponentsGrid />
      <Footer />
    </div>
  )
}
