import fs from 'fs-extra'
import path from 'node:path'
import type { ComponentConfig } from '../typings/index.js'

const CONFIG_FILE = 'component.config.json'

/**
 * Read `component.config.json` from cwd.
 *   - missing file → returns `null` (caller prints "no config found, run init")
 *   - parse error or schema error → throws with a useful message
 *
 * Schema validation: the config MUST have a string `outDir` field. Without it
 * `add.ts` would later try `path.join(cwd, undefined, ...)` and emit a cryptic
 * `ERR_INVALID_ARG_TYPE` from node — much worse UX than a clean error here.
 *
 * Callers are expected to wrap this in try/catch and print `error.message`.
 */
export async function getConfig(): Promise<ComponentConfig | null> {
  const configPath = path.join(process.cwd(), CONFIG_FILE)
  if (!(await fs.pathExists(configPath))) return null
  let parsed: unknown
  try {
    parsed = await fs.readJSON(configPath)
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    throw new Error(
      `${CONFIG_FILE} exists but is not valid JSON: ${reason}\n  Path: ${configPath}\n  Fix the file or delete it and re-run \`init\`.`,
    )
  }
  if (
    !parsed ||
    typeof parsed !== 'object' ||
    typeof (parsed as Record<string, unknown>).outDir !== 'string' ||
    !(parsed as Record<string, unknown>).outDir
  ) {
    throw new Error(
      `${CONFIG_FILE} is missing the required \`outDir\` field (or it's empty).\n  Path: ${configPath}\n  Add e.g. { "outDir": "src/components" } and re-run.`,
    )
  }
  return parsed as ComponentConfig
}

export async function writeConfig(config: ComponentConfig): Promise<void> {
  const configPath = path.join(process.cwd(), CONFIG_FILE)
  await fs.writeJSON(configPath, config, { spaces: 2 })
}

export async function validateOrCreateOutDir(outDir: string): Promise<void> {
  const fullPath = path.resolve(process.cwd(), outDir)
  await fs.ensureDir(fullPath)
}
