import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar }          from '@/components/kibo/Navbar'
import { Footer }          from '@/components/kibo/Footer'
import { ComponentDetail } from '@/components/kibo/ComponentDetail'
import { componentBySlug } from '@/data/component-registry'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const meta = componentBySlug(slug)
  if (!meta) return { title: 'Component not found — OTF' }
  return {
    title: `${meta.name} — OTF Components`,
    description: meta.description,
  }
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params
  const meta = componentBySlug(slug)
  if (!meta) notFound()

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
