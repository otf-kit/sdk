import type { Preview } from '@storybook/react'
import '../stories/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: 'hsl(222 47% 7%)' },
        { name: 'light', value: 'hsl(0 0% 100%)' },
      ],
    },
  },
}

export default preview
