import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import react from '@vitejs/plugin-react'
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
    return mergeConfig(config, {
      plugins: [
        react({ jsxRuntime: 'automatic' }),
      ],
      resolve: {
        alias: {
          '@otf/ui/command-item': path.resolve(__dirname, '../../../packages/ui/src/components/command-item.tsx'),
          '@otf/ui/forms-form': path.resolve(__dirname, '../../../packages/ui/src/forms/form.tsx'),
          '@otf/ui/layouts-page': path.resolve(__dirname, '../../../packages/ui/src/layouts/page.tsx'),
          '@otf/ui/layouts-sidebar': path.resolve(__dirname, '../../../packages/ui/src/layouts/sidebar.tsx'),
          '@otf/ui/layouts-app-shell': path.resolve(__dirname, '../../../packages/ui/src/layouts/app-shell.tsx'),
          '@otf/ui/layouts-navbar': path.resolve(__dirname, '../../../packages/ui/src/layouts/navbar.tsx'),
          '@otf/ui/layouts-split-page': path.resolve(__dirname, '../../../packages/ui/src/layouts/split-page.tsx'),
          '@otf/ui/layouts-stack': path.resolve(__dirname, '../../../packages/ui/src/layouts/stack.tsx'),
          '@otf/ui/layouts-container': path.resolve(__dirname, '../../../packages/ui/src/layouts/container.tsx'),
          '@otf/ui/layouts-resize-box': path.resolve(__dirname, '../../../packages/ui/src/layouts/resize-box.tsx'),
          '@otf/ui': path.resolve(__dirname, '../../../packages/ui/src/index.ts'),
          '@otf/tokens': path.resolve(__dirname, '../../../packages/tokens/src/index.ts'),
        },
      },
      build: {
        rollupOptions: {
          onwarn(warning, warn) {
            if (
              warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
              warning.message.includes('"use client"')
            ) return
            warn(warning)
          },
        },
      },
    })
  },
}

export default config
