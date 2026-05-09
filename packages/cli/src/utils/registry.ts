import type { Registry } from '../typings/index.js'

/**
 * Default registry host. Cloudflare Pages project `otf-ui-native-registry`,
 * deployed on every push to main that touches `packages/ui-native/registry/`.
 *
 * Precedence (env wins, on purpose):
 *   `OTF_REGISTRY_URL` env  >  `config.registryUrl` (component.config.json)  >  default
 *
 * Env wins so a developer can override on-the-fly for local / staging tests
 * without editing a checked-in config file. Project config still works for
 * pinning a custom enterprise registry — but if you've also set the env var,
 * you're explicitly opting out of whatever's in config.
 */
const DEFAULT_REGISTRY_URL = 'https://r.otf-kit.dev'
const FETCH_TIMEOUT_MS = 10_000

function stripTrailingSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export function getRegistryUrl(configOverride?: string): string {
  const raw = process.env.OTF_REGISTRY_URL || configOverride || DEFAULT_REGISTRY_URL
  return stripTrailingSlash(raw)
}

async function fetchWithTimeout(url: string): Promise<Response> {
  return fetch(url, {
    headers: { 'User-Agent': '@otfdashkit/cli' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  })
}

export async function getRegistry(registryUrl?: string): Promise<Registry> {
  const url = `${getRegistryUrl(registryUrl)}/registry.json`
  const response = await fetchWithTimeout(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch registry from ${url} (${response.status} ${response.statusText})`)
  }
  return response.json() as Promise<Registry>
}

export async function getComponentFile(
  componentPath: string,
  fileName: string,
  registryUrl?: string,
): Promise<string> {
  const url = `${getRegistryUrl(registryUrl)}/${componentPath}/${fileName}`
  const response = await fetchWithTimeout(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${fileName} from ${url} (${response.status})`)
  }
  return response.text()
}
