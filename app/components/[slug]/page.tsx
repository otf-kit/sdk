import type { Metadata } from 'next'
import { Navbar }          from '@/components/otf/Navbar'
import { Footer }          from '@/components/otf/Footer'
import { ComponentDetail } from '@/components/otf/ComponentDetail'
import { componentBySlug } from '@/data/component-registry'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const meta = componentBySlug(slug)
  if (!meta) return { title: `${slug} — OTF Components` }
  return {
    title: `${meta.name} — OTF Components`,
    description: meta.description,
  }
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params
  // Don't 404 — ComponentDetail renders a "coming soon" state for unknown slugs
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <div className="flex-1">
        <ComponentDetail slug={slug} />
      </div>
      <Footer />
    </div>
  )
}
