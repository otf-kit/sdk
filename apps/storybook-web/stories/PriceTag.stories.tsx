import type { Meta, StoryObj } from '@storybook/react'
import { PriceTag } from '@otfdashkit/ui'

const meta: Meta<typeof PriceTag> = {
  title: 'Primitives/PriceTag',
  component: PriceTag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof PriceTag>

export const Default: Story = {
  render: () => <PriceTag amount={1800} currency="USD" />,
}

export const OnSale: Story = {
  render: () => <PriceTag amount={1800} compareAt={2400} currency="USD" />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <PriceTag amount={1800} compareAt={2400} size="sm" />
      <PriceTag amount={1800} compareAt={2400} size="md" />
      <PriceTag amount={1800} compareAt={2400} size="lg" />
    </div>
  ),
}

export const NoDiscountPill: Story = {
  render: () => <PriceTag amount={5800} compareAt={6800} showDiscount={false} />,
}
