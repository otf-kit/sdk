import type { Meta, StoryObj } from '@storybook/react'
import { FloatingLabelInput } from '@otfdashkit/ui'

const meta = {
  title: 'Forms/FloatingLabelInput',
  component: FloatingLabelInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FloatingLabelInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
  },
  render: (args) => (
    <div className="w-[360px]">
      <FloatingLabelInput {...args} />
    </div>
  ),
}

export const Filled: Story = {
  args: {
    label: 'Email',
    defaultValue: 'dave@otf-kit.dev',
  },
  render: (args) => (
    <div className="w-[360px]">
      <FloatingLabelInput {...args} />
    </div>
  ),
}

export const WithHint: Story = {
  args: {
    label: 'Workspace name',
    hint: 'Lowercase letters, numbers, and dashes only.',
  },
  render: (args) => (
    <div className="w-[360px]">
      <FloatingLabelInput {...args} />
    </div>
  ),
}

export const WithError: Story = {
  args: {
    label: 'Workspace name',
    defaultValue: 'Has Spaces',
    error: 'Spaces are not allowed.',
  },
  render: (args) => (
    <div className="w-[360px]">
      <FloatingLabelInput {...args} />
    </div>
  ),
}

export const Stacked: Story = {
  render: () => (
    <div className="flex w-[360px] flex-col gap-4">
      <FloatingLabelInput label="Full name" />
      <FloatingLabelInput label="Email" type="email" defaultValue="dave@otf-kit.dev" />
      <FloatingLabelInput label="Workspace" hint="You can rename this later." />
    </div>
  ),
}
