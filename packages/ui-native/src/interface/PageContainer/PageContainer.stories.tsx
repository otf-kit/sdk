import type { Meta, StoryObj } from '@storybook/react'
import { PageContainer } from './PageContainer'

// TODO: add all variants
const meta: Meta<typeof PageContainer> = {
  title: 'Interface/PageContainer',
  component: PageContainer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PageContainer>

export const Default: Story = {}
