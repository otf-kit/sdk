import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { QuantityStepper } from '@otfdashkit/ui'

const meta: Meta<typeof QuantityStepper> = {
  title: 'Primitives/QuantityStepper',
  component: QuantityStepper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof QuantityStepper>

export const Default: Story = {
  render: () => {
    const [qty, setQty] = useState(1)
    return (
      <div className="flex flex-col items-center gap-3">
        <QuantityStepper value={qty} onValueChange={setQty} />
        <p className="font-mono text-xs text-muted-foreground">qty: {qty}</p>
      </div>
    )
  },
}

export const Small: Story = {
  render: () => <QuantityStepper defaultValue={2} size="sm" />,
}

export const ClampedRange: Story = {
  render: () => <QuantityStepper defaultValue={5} min={1} max={5} />,
}

export const Disabled: Story = {
  render: () => <QuantityStepper defaultValue={3} disabled />,
}
