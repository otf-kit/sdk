import type { Meta, StoryObj } from '@storybook/react'
import { Page } from './Page'

// TODO: add all variants
const meta: Meta<typeof Page> = {
  title: 'Layouts/Page',
  component: Page,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Page>

export const Default: Story = {}
