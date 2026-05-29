import type { Meta, StoryObj } from '@storybook/react'
import { EmptyCart } from '@otfdashkit/ui'

const meta: Meta<typeof EmptyCart> = {
  title: 'Primitives/EmptyCart',
  component: EmptyCart,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof EmptyCart>

export const Default: Story = {
  render: () => (
    <div className="w-[480px] rounded-lg border border-border">
      <EmptyCart onAction={() => {}} />
    </div>
  ),
}

export const NoAction: Story = {
  render: () => (
    <div className="w-[480px] rounded-lg border border-border">
      <EmptyCart />
    </div>
  ),
}

export const CustomCopy: Story = {
  render: () => (
    <div className="w-[480px] rounded-lg border border-border">
      <EmptyCart
        title="Nothing brewing yet"
        description="Your cart is empty — find a roast you'll love."
        actionLabel="Shop coffee"
        onAction={() => {}}
      />
    </div>
  ),
}
