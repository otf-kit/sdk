import chalk from 'chalk'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'node:path'
import prompts from 'prompts'
import { getConfig, validateOrCreateOutDir } from '../utils/config.js'
import { getComponentFile, getRegistry, getRegistryUrl } from '../utils/registry.js'
import type { AddOptions, RegistryComponent } from '../typings/index.js'

export async function add(componentName: string | undefined, options: AddOptions): Promise<void> {
  // Wrap getConfig — it now throws on malformed JSON / missing `outDir`.
  // Print just the message (clean UX) instead of letting the unhandled
  // rejection bubble up as a Node stack trace.
  let config
  try {
    config = await getConfig()
  } catch (error) {
    console.error(chalk.red('\n❌ ' + (error instanceof Error ? error.message : String(error))))
    process.exit(1)
  }
  if (!config && !options.dir) {
    console.log(chalk.red('\n❌ No component.config.json found'))
    console.log(chalk.dim('\nCreate one with:'))
    console.log(chalk.cyan('  npx @otfdashkit/cli init'))
    console.log(chalk.dim('\nOr pass --dir directly:'))
    console.log(chalk.cyan(`  npx @otfdashkit/cli add ${componentName ?? '<name>'} --dir src/components`))
    process.exit(1)
  }

  // Fetch the registry
  const fetchSpinner = ora('Fetching registry...').start()
  let registry
  try {
    registry = await getRegistry(config?.registryUrl)
    fetchSpinner.stop()
  } catch (error) {
    fetchSpinner.fail(chalk.red('Failed to fetch registry'))
    console.error(error)
    process.exit(1)
  }

  // Resolve component name (interactive picker if not given)
  if (!componentName) {
    const choices = Object.values(registry.components)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => ({ title: c.name, description: c.description, value: c.name }))
    const response = await prompts({
      type: 'autocomplete',
      name: 'name',
      message: 'Select a component to add',
      choices,
    })
    if (!response.name) {
      console.log(chalk.dim('Cancelled.'))
      process.exit(0)
    }
    componentName = response.name as string
  }

  const component = registry.components[componentName]
  if (!component) {
    console.log(chalk.red(`\n❌ Component "${componentName}" not found in registry`))
    const suggestions = Object.keys(registry.components).filter((n) =>
      n.toLowerCase().includes(componentName!.toLowerCase()),
    )
    if (suggestions.length > 0) {
      console.log(chalk.yellow('\nDid you mean:'))
      suggestions.slice(0, 5).forEach((s) => console.log(`  - ${s}`))
    } else {
      console.log(chalk.dim('Run `npx @otfdashkit/cli list` to see all components.'))
    }
    process.exit(1)
  }

  // Use the resolved registry URL (env override > config > registry.json's
  // self-declared URL > built-in default). The manifest's registryUrl is
  // informational only — the CLI never blindly trusts it because that would
  // make local + staging registry testing impossible.
  const effectiveRegistryUrl = getRegistryUrl(config?.registryUrl)

  await installComponent(component, effectiveRegistryUrl, options, config?.outDir)

  // Recursively install registryDependencies
  for (const depName of component.registryDependencies || []) {
    if (registry.components[depName]) {
      console.log(chalk.dim(`\n→ Installing dependency: ${depName}`))
      await installComponent(registry.components[depName], effectiveRegistryUrl, options, config?.outDir)
    }
  }

  // Print peer-dep install hint
  if (component.dependencies.length > 0) {
    console.log(chalk.bold('\n📦 Peer dependencies you must install:\n'))
    console.log(chalk.cyan(`  npm install ${component.dependencies.join(' ')}`))
    console.log(chalk.dim('\n  (or `pnpm add`, `bun add`, `yarn add` per your package manager)'))
  }
  if (component.platform === 'native-only') {
    console.log(chalk.yellow(`\n⚠  ${component.name} is native-only — won't render on web.`))
  }
  console.log(chalk.green('\n✓ Done.'))
}

async function installComponent(
  component: RegistryComponent,
  registryUrl: string,
  options: AddOptions,
  configOutDir: string | undefined,
): Promise<void> {
  const outDir = options.dir || configOutDir!
  const componentDir = options.dir
    ? path.join(process.cwd(), outDir)
    : path.join(process.cwd(), outDir, component.category, component.name)

  await validateOrCreateOutDir(componentDir)

  // Pre-flight: warn about overwrites unless --overwrite or --yes.
  // `--overwrite` (-o): silently replace existing files.
  // `--yes` (-y):       skip confirmation, default to overwrite.
  // Combined effect of both flags is the same — both are non-interactive.
  if (!options.overwrite && !options.yes) {
    const existing: string[] = []
    for (const file of component.files) {
      const target = path.join(componentDir, file)
      if (await fs.pathExists(target)) existing.push(file)
    }
    if (existing.length > 0) {
      console.log(chalk.yellow(`\n⚠  ${existing.length} file(s) already exist in ${componentDir}:`))
      existing.forEach((f) => console.log(chalk.dim(`    ${f}`)))
      const response = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: 'Overwrite?',
        initial: false,
      })
      if (!response.overwrite) {
        console.log(chalk.dim('Cancelled.'))
        process.exit(0)
      }
    }
  }

  const spinner = ora(`Installing ${component.name}...`).start()
  for (const file of component.files) {
    try {
      const content = await getComponentFile(component.path, file, registryUrl)
      const target = path.join(componentDir, file)
      await fs.outputFile(target, content)
    } catch (error) {
      spinner.fail(chalk.red(`Failed to install ${file}`))
      console.error(error)
      process.exit(1)
    }
  }
  spinner.succeed(`${component.name} → ${path.relative(process.cwd(), componentDir)}/`)
}
