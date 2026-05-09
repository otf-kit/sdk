import chalk from 'chalk'
import ora from 'ora'
import { getConfig } from '../utils/config.js'
import { getRegistry } from '../utils/registry.js'

interface ListOptions {
  category?: string
}

export async function list(options: ListOptions): Promise<void> {
  // Read the project config so `list` and `add` hit the same registry.
  // (Env > config > default; see registry.ts header.) `getConfig` may throw
  // on malformed JSON / missing required fields — print the message cleanly
  // instead of dumping a Node stack trace at the user.
  let config
  try {
    config = await getConfig()
  } catch (error) {
    console.error(chalk.red('\n❌ ' + (error instanceof Error ? error.message : String(error))))
    process.exit(1)
  }

  const spinner = ora('Fetching registry...').start()
  let registry
  try {
    registry = await getRegistry(config?.registryUrl)
    spinner.stop()
  } catch (error) {
    spinner.fail(chalk.red('Failed to fetch registry'))
    console.error(error)
    process.exit(1)
  }

  const components = Object.values(registry.components)
  const filtered = options.category
    ? components.filter((c) => c.category === options.category)
    : components

  if (filtered.length === 0) {
    console.log(chalk.yellow('No components found.'))
    return
  }

  const byCategory: Record<string, typeof filtered> = {}
  for (const component of filtered) {
    if (!byCategory[component.category]) byCategory[component.category] = []
    byCategory[component.category].push(component)
  }

  console.log(chalk.bold(`\n${registry.name} v${registry.version}\n`))
  for (const category of Object.keys(byCategory).sort()) {
    console.log(chalk.cyan.bold(`── ${category} ──`))
    for (const component of byCategory[category].sort((a, b) => a.name.localeCompare(b.name))) {
      const platformBadge = component.platform === 'native-only'
        ? chalk.dim(' [native-only]')
        : component.platform === 'web-only'
          ? chalk.dim(' [web-only]')
          : ''
      console.log(`  ${chalk.green(component.name)}${platformBadge}`)
      if (component.description) {
        console.log(chalk.dim(`    ${component.description}`))
      }
    }
    console.log()
  }
  console.log(chalk.dim(`Install: npx @otfdashkit/cli add <name>`))
}
