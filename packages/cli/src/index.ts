import { Command } from 'commander'
import { add } from './commands/add.js'
import { init } from './commands/init.js'
import { list } from './commands/list.js'

const program = new Command()

program
  .name('otfdashkit')
  .description('Add OTF UI Native components to your project')
  .version('0.1.0')

program
  .command('init')
  .description('Initialize component.config.json in the current project')
  .action(init)

program
  .command('list')
  .alias('ls')
  .description('List all available components')
  .option('-c, --category <category>', 'Filter by category')
  .action(list)

program
  .command('add')
  .description('Add a component to your project (copies source files)')
  .argument('[component]', 'Component name to add')
  .option('-o, --overwrite', 'Overwrite existing files', false)
  .option('-d, --dir <directory>', 'Target directory (overrides component.config.json)')
  .option('-y, --yes', 'Skip confirmation prompts', false)
  .action(add)

program.parse()
