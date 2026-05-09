import chalk from 'chalk'
import prompts from 'prompts'
import { getConfig, writeConfig } from '../utils/config.js'

export async function init(): Promise<void> {
  const existing = await getConfig()
  if (existing) {
    console.log(chalk.yellow('component.config.json already exists.'))
    console.log(chalk.dim(`  outDir: ${existing.outDir}`))
    return
  }

  const response = await prompts([
    {
      type: 'text',
      name: 'outDir',
      message: 'Where should components be installed?',
      initial: 'src/components',
    },
    {
      type: 'text',
      name: 'registryUrl',
      message: 'Registry URL (leave blank for default)?',
      initial: '',
    },
  ])

  if (!response.outDir) {
    console.log(chalk.dim('Cancelled.'))
    process.exit(0)
  }

  const config = response.registryUrl
    ? { outDir: response.outDir, registryUrl: response.registryUrl }
    : { outDir: response.outDir }

  await writeConfig(config)
  console.log(chalk.green('\n✓ Created component.config.json'))
  console.log(chalk.dim(`  outDir: ${config.outDir}`))
  console.log(chalk.dim('\nNext: npx @otfdashkit/cli add <component-name>'))
}
