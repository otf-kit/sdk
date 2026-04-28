import type { TemplateConfig } from '@/lib/template-config'
import { fitnessTemplate } from './fitness'
import { saasDashboardTemplate } from './saas-dashboard'

export const templateRegistry: Record<string, TemplateConfig> = {
  [fitnessTemplate.id]:        fitnessTemplate,
  [saasDashboardTemplate.id]:  saasDashboardTemplate,
}

export const templateIds = Object.keys(templateRegistry)

export function getTemplate(id: string): TemplateConfig | undefined {
  return templateRegistry[id]
}
