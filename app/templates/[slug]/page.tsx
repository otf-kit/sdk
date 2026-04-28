import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { TemplatePage } from '@/components/template-detail/TemplatePage'
import { getTemplate, templateIds } from '@/data/templates'

export function generateStaticParams() {
  return templateIds.map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const config = getTemplate(slug)
  if (!config) return { title: 'Template — OTF' }
  return {
    title: `${config.name} Kit — OTF`,
    description: config.hero.description,
  }
}

export default async function TemplateDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const config = getTemplate(slug)
  if (!config) notFound()

  return (
    <main className="min-h-dvh bg-background text-foreground flex flex-col">
      <Nav />
      <div className="flex-1">
        <TemplatePage config={config} />
      </div>
      <Footer />
    </main>
  )
}
