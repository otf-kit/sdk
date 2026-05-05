import type { Meta, StoryObj } from '@storybook/react'
import { Typewriter, TextReveal } from '@otfdashkit/ui'

const meta = {
  title: 'Text/TextAnimations',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const TypewriterDemo: StoryObj = {
  render: () => (
    <div className="text-2xl font-semibold text-foreground">
      Build with{' '}
      <Typewriter words={['speed', 'quality', 'design', 'confidence']} className="text-primary" />
    </div>
  ),
}

export const TextRevealWords: StoryObj = {
  render: () => (
    <TextReveal
      mode="words"
      text="Every template ships with extraordinary design, production-ready SDK, and AI-tool integration baked in."
      className="text-xl text-foreground max-w-md"
    />
  ),
}

export const TextRevealChars: StoryObj = {
  render: () => (
    <TextReveal
      mode="chars"
      text="Design System"
      className="text-3xl font-bold text-foreground"
    />
  ),
}
