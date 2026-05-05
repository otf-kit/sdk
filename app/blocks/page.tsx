import type { Metadata } from 'next'
import { Navbar }           from '@/components/otf/Navbar'
import { Footer }           from '@/components/otf/Footer'
import { ComponentsGrid }   from '../components/ComponentsGrid'
import { componentsByKind } from '@/data/component-registry'

export const metadata: Metadata = {
  title: 'Blocks — OTF',
  description: `${componentsByKind('block').length}+ pre-built blocks — sidebars, metric cards, modals, full app shells. Drop into any project.`,
}

export default function BlocksPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <ComponentsGrid kind="block" />
      <Footer />
    </div>
  )
}
