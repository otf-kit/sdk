import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

// Manager chrome on the OTF brand lock (neutrals, Geist 400 brand, Inter UI).
addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'OTF UI',
    appBg: '#0a0a0a',
    appContentBg: '#0a0a0a',
    appPreviewBg: '#0a0a0a',
    appBorderColor: '#1f1f1f',
    barBg: '#0a0a0a',
    barTextColor: '#9e9e9e',
    barSelectedColor: '#f0ede9',
    textColor: '#f0ede9',
    textMutedColor: '#9e9e9e',
    colorPrimary: '#f0ede9',
    colorSecondary: '#c2410c',
    inputBg: '#111111',
    inputBorder: '#1f1f1f',
    inputTextColor: '#f0ede9',
    fontBase: '"Inter", ui-sans-serif, system-ui, sans-serif',
    fontCode: '"Geist Mono", ui-monospace, monospace',
  }),
})
