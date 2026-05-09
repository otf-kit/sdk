export interface RegistryComponent {
  name: string
  category: string
  description?: string
  /** Path RELATIVE to the registry root, e.g. `components/shockwave`. */
  path: string
  /** Sub-folders under `path/` that need to be created (rare; usually empty). */
  folders: string[]
  /** Files under `path/` to fetch + write. */
  files: string[]
  /** npm packages the consumer must install for this component to bundle. */
  dependencies: string[]
  /** Other registry component names this depends on (chained installs). */
  registryDependencies: string[]
  /** "native-only" | "web-only" | "universal" (default). */
  platform?: 'native-only' | 'web-only' | 'universal'
  /** Live preview URL for the docs site. */
  preview?: string
}

export interface Registry {
  $schema?: string
  version: string
  name: string
  description?: string
  registryUrl: string
  categories: string[]
  components: Record<string, RegistryComponent>
}

export interface ComponentConfig {
  /** Where copied components land in the user's project. */
  outDir: string
  /** Optional override for the registry URL (e.g. for staging). */
  registryUrl?: string
}

export interface AddOptions {
  overwrite?: boolean
  dir?: string
  yes?: boolean
}
