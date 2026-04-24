import type { Meta, StoryObj } from '@storybook/react'
import { OnboardingCarousel } from './OnboardingCarousel'

// TODO: add all variants
const meta: Meta<typeof OnboardingCarousel> = {
  title: 'Patterns/OnboardingCarousel',
  component: OnboardingCarousel,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OnboardingCarousel>

export const Default: Story = {}
