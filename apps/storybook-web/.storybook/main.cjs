// Native CommonJS (.cjs) — Node loads this directly without going through
// esbuild-register's `.ts`/`.mjs` hooks. esbuild-register injects a
// `require('url')` banner at the top of every transformed file, and on
// Node 20+ that gets routed through `loadESMFromCJS` (because the file's
// containing package looks like ESM to the new ESM-detection heuristic),
// which then fails because `require` isn't defined in ESM scope.
// `.cjs` isn't in esbuild-register's FILE_LOADERS map, so the hook is
// bypassed entirely. See PR #26 history for the full debugging trail.

const { mergeConfig } = require('vite')
const react = require('@vitejs/plugin-react').default
const path = require('path')

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
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
          '@otfdashkit/ui/command-item': path.resolve(__dirname, '../../../packages/ui/src/components/CommandItem/CommandItem.tsx'),
          '@otfdashkit/ui/forms-form': path.resolve(__dirname, '../../../packages/ui/src/forms/form.tsx'),
          '@otfdashkit/ui/layouts-page': path.resolve(__dirname, '../../../packages/ui/src/layouts/page.tsx'),
          '@otfdashkit/ui/layouts-sidebar': path.resolve(__dirname, '../../../packages/ui/src/layouts/sidebar.tsx'),
          '@otfdashkit/ui/layouts-app-shell': path.resolve(__dirname, '../../../packages/ui/src/layouts/app-shell.tsx'),
          '@otfdashkit/ui/layouts-navbar': path.resolve(__dirname, '../../../packages/ui/src/layouts/navbar.tsx'),
          '@otfdashkit/ui/layouts-split-page': path.resolve(__dirname, '../../../packages/ui/src/layouts/split-page.tsx'),
          '@otfdashkit/ui/layouts-stack': path.resolve(__dirname, '../../../packages/ui/src/layouts/stack.tsx'),
          '@otfdashkit/ui/layouts-container': path.resolve(__dirname, '../../../packages/ui/src/layouts/container.tsx'),
          '@otfdashkit/ui/layouts-resize-box': path.resolve(__dirname, '../../../packages/ui/src/layouts/resize-box.tsx'),
          '@otfdashkit/ui': path.resolve(__dirname, '../../../packages/ui/src/index.ts'),
          '@otfdashkit/tokens': path.resolve(__dirname, '../../../packages/tokens/src/index.ts'),
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

module.exports = config
