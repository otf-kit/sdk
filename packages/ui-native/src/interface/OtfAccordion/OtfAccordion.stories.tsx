import type { Meta, StoryObj } from '@storybook/react'
import { OtfAccordion } from './OtfAccordion'

// TODO: add all variants
const meta: Meta<typeof OtfAccordion> = {
  title: 'Interface/OtfAccordion',
  component: OtfAccordion,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OtfAccordion>

export const Default: Story = {}
