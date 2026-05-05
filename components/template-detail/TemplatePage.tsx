import type { TemplateConfig } from '@/lib/template-config'
import { Hero } from './Hero'
import { ClaudeCursor } from './ClaudeCursor'
import { ScreenCarousel } from './ScreenCarousel'
import { ComponentsSection } from './Components'
import { ExpoGo } from './ExpoGo'
import { TechStack } from './TechStack'
import { Bundle } from './Bundle'

export function TemplatePage({ config }: { config: TemplateConfig }) {
  const kitSlug = config.kitSlug
  return (
    <>
      <Hero data={config.hero} shape={config.mockupShape} kitSlug={kitSlug} />
      {config.claudeCursor && <ClaudeCursor data={config.claudeCursor} kitSlug={kitSlug} />}
      {config.carousels.map((c) => (
        <ScreenCarousel key={c.title} data={c} shape={config.mockupShape} />
      ))}
      <ComponentsSection data={config.components} kitSlug={kitSlug} />
      {config.expoGo && <ExpoGo data={config.expoGo} />}
      <TechStack data={config.techStack} />
      <Bundle data={config.bundle} kitSlug={kitSlug} />
    </>
  )
}
