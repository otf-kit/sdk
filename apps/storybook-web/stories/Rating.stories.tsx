import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Rating } from '@otfdashkit/ui'

const meta: Meta<typeof Rating> = {
  title: 'Primitives/Rating',
  component: Rating,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Rating>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(3)
    return (
      <div className="flex flex-col gap-3">
        <Rating value={value} onValueChange={setValue} />
        <p className="font-mono text-xs text-muted-foreground">value: {value}</p>
      </div>
    )
  },
}

export const HalfSteps: Story = {
  render: () => <Rating defaultValue={3.5} readOnly />,
}

export const ReadOnlyLarge: Story = {
  render: () => <Rating defaultValue={4.5} readOnly size="lg" />,
}

export const Small: Story = {
  render: () => <Rating defaultValue={4} size="sm" />,
}

export const NoHalf: Story = {
  render: () => <Rating defaultValue={3} allowHalf={false} />,
}

export const CustomIcons: Story = {
  render: () => (
    <Rating
      defaultValue={3}
      max={5}
      emptyIcon={<Heart className="h-full w-full" strokeWidth={1.5} />}
      filledIcon={<Heart className="h-full w-full fill-current" strokeWidth={1.5} />}
    />
  ),
}

export const TenStars: Story = {
  render: () => <Rating defaultValue={7.5} max={10} readOnly size="sm" />,
}
