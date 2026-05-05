import type { Metadata } from 'next'
import { Navbar }           from '@/components/otf/Navbar'
import { Footer }           from '@/components/otf/Footer'
import { ComponentsGrid }   from '../components/ComponentsGrid'
import { componentsByKind } from '@/data/component-registry'

export const metadata: Metadata = {
  title: 'Patterns — OTF',
  description: `${componentsByKind('pattern').length}+ motion, background, and engagement patterns — auroras, reveals, beacons, tours.`,
}

export default function PatternsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <ComponentsGrid kind="pattern" />
      <Footer />
    </div>
  )
}
