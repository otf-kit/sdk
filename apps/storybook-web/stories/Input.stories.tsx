import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@otfdashkit/ui'
import { Mail, Lock, Search, Eye } from 'lucide-react'

const meta = {
  title: 'Primitives/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Enter your email…' },
}

export const WithLabel: Story = {
  args: { label: 'Email address', placeholder: 'you@example.com' },
}

export const WithError: Story = {
  args: { label: 'Password', error: 'Password must be at least 8 characters', type: 'password' },
}

export const WithHint: Story = {
  args: { label: 'Username', hint: 'This will be your public display name', placeholder: 'johndoe' },
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input label="Email" leftIcon={<Mail className="h-4 w-4" />} placeholder="you@example.com" />
      <Input label="Password" leftIcon={<Lock className="h-4 w-4" />} rightIcon={<Eye className="h-4 w-4" />} type="password" placeholder="••••••••" />
      <Input leftIcon={<Search className="h-4 w-4" />} placeholder="Search…" />
    </div>
  ),
}
