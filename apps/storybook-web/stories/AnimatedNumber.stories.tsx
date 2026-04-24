import type { Meta, StoryObj } from '@storybook/react'
import { AnimatedNumber } from '@otf/ui'

const meta = {
  title: 'Text/AnimatedNumber',
  component: AnimatedNumber,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof AnimatedNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 1234 },
}

export const WithPrefix: Story = {
  args: { value: 42500, prefix: '$', format: true },
}

export const WithSuffix: Story = {
  args: { value: 98.6, suffix: '%' },
}

export const Gallery: Story = {
  render: () => (
    <div className="flex gap-8 items-end">
      <div className="text-center">
        <AnimatedNumber value={2847} format className="text-4xl font-bold text-foreground" />
        <p className="text-sm text-muted-foreground mt-1">Users</p>
      </div>
      <div className="text-center">
        <AnimatedNumber value={99.9} suffix="%" className="text-4xl font-bold text-foreground" />
        <p className="text-sm text-muted-foreground mt-1">Uptime</p>
      </div>
      <div className="text-center">
        <AnimatedNumber value={12500} prefix="$" format className="text-4xl font-bold text-foreground" />
        <p className="text-sm text-muted-foreground mt-1">Revenue</p>
      </div>
    </div>
  ),
}
