import type { Meta, StoryObj } from '@storybook/react'
import { AppShell } from './AppShell'

// TODO: add all variants
const meta: Meta<typeof AppShell> = {
  title: 'Layouts/AppShell',
  component: AppShell,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppShell>

export const Default: Story = {}
