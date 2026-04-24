import type { Meta, StoryObj } from '@storybook/react'
import { SplitPage } from './SplitPage'

// TODO: add all variants
const meta: Meta<typeof SplitPage> = {
  title: 'Layouts/SplitPage',
  component: SplitPage,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SplitPage>

export const Default: Story = {}
