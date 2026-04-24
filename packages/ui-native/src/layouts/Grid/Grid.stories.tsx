import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from './Grid'

// TODO: add all variants
const meta: Meta<typeof Grid> = {
  title: 'Layouts/Grid',
  component: Grid,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {}
