import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/otf/Navbar'
import { Footer } from '@/components/otf/Footer'
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
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Navbar />
      <div className="flex-1">
        <TemplatePage config={config} />
      </div>
      <Footer />
    </div>
  )
}
