import type { Meta, StoryObj } from '@storybook/react'
import { GradientHeading } from '@otf/ui'

const meta = {
  title: 'Text/GradientHeading',
  component: GradientHeading,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof GradientHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Build faster with OTF', as: 'h1' },
}

export const AllPresets: Story = {
  render: () => (
    <div className="space-y-4">
      <GradientHeading preset="primary" as="h2">Primary gradient</GradientHeading>
      <GradientHeading preset="slate" as="h2">Slate gradient</GradientHeading>
      <GradientHeading preset="warm" as="h2">Warm gradient</GradientHeading>
      <GradientHeading preset="cosmic" as="h2">Cosmic gradient</GradientHeading>
      <GradientHeading preset="terminal" as="h2">Terminal gradient</GradientHeading>
      <GradientHeading preset="aurora" as="h2">Aurora gradient</GradientHeading>
      <GradientHeading preset="sunset" as="h2">Sunset gradient</GradientHeading>
    </div>
  ),
}

export const Animated: Story = {
  render: () => (
    <GradientHeading preset="cosmic" animated as="h1" className="text-5xl">
      Animated gradient text
    </GradientHeading>
  ),
}
