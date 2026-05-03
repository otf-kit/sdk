// Shared types for the docs-site showcase. Each route file exports a
// `meta: ComponentMeta` that drives the new <DocsPage> shell — installation
// command, usage code, props table, variants gallery.

export type ComponentCategory =
  | 'Primitives'
  | 'Interface'
  | 'Layouts'
  | 'Patterns'

export interface PropDef {
  /** Prop name as written in code. */
  name: string
  /** TypeScript type signature (kept as a string — rendered verbatim in the table). */
  type: string
  /** Default value rendered as text. Omit if no default. */
  default?: string
  /** Whether the prop is required. */
  required: boolean
  /** One-sentence summary of what the prop does. */
  description: string
}

export interface ComponentMeta {
  /** Display name (e.g. "Onboarding Carousel"). */
  name: string
  /** Slug used by routing (e.g. "onboarding-carousel"). */
  slug: string
  /** Top-level category for breadcrumb. */
  category: ComponentCategory
  /** One-sentence summary rendered under the H1. */
  description: string
  /** Tag chips rendered next to the description. Lowercase keywords. */
  tags: string[]
  /** Names of `@otf/ui-native` exports the component surfaces. Drives the import statement in Usage. */
  exports: string[]
  /** Hand-authored, compileable example code. Shown in the Usage section + copy-able. */
  usage: string
  /** Hand-authored prop catalog. Order = display order. */
  props: PropDef[]
  /** Optional path back to the SDK source file. Default behavior derives this from slug + category. */
  docPath?: string
}
