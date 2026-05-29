import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CartLineItem } from '@otfdashkit/ui'

const IMG = 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=200&auto=format&fit=crop'

const meta: Meta<typeof CartLineItem> = {
  title: 'Primitives/CartLineItem',
  component: CartLineItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof CartLineItem>

export const Default: Story = {
  render: () => {
    const [qty, setQty] = useState(2)
    return (
      <div className="w-[480px]">
        <CartLineItem
          image={IMG}
          title="Sunrise Blend"
          variant="Whole bean · 250g"
          price={1800}
          quantity={qty}
          onQuantityChange={setQty}
          onRemove={() => {}}
        />
      </div>
    )
  },
}

export const OnSale: Story = {
  render: () => (
    <div className="w-[480px]">
      <CartLineItem
        image={IMG}
        title="Ethiopia Yirgacheffe"
        variant="Filter · 250g"
        price={1800}
        compareAt={2200}
        quantity={1}
        onRemove={() => {}}
      />
    </div>
  ),
}

export const NoImageNoRemove: Story = {
  render: () => (
    <div className="w-[480px]">
      <CartLineItem title="Cold Brew Concentrate" variant="1L" price={1400} quantity={3} />
    </div>
  ),
}
