import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...(config.resolve?.alias as Record<string, string> | undefined),
          '@otf/ui': path.resolve(__dirname, '../../../packages/ui/src/index.ts'),
          '@otf/tokens': path.resolve(__dirname, '../../../packages/tokens/src/index.ts'),
        },
      },
      build: {
        ...config.build,
        rollupOptions: {
          ...config.build?.rollupOptions,
          onwarn(warning, warn) {
            // Suppress "use client" directive warnings from node_modules
            if (
              warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
              warning.message.includes('"use client"')
            ) return
            warn(warning)
          },
        },
      },
    }
  },
}

export default config
