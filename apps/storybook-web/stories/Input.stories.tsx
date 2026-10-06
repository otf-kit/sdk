import type { Meta, StoryObj } from '@storybook/react'
import { Field, FieldLabel, FieldDescription, FieldError, Input } from '@otfdashkit/ui'
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
  args: { id: 'input-email', placeholder: 'you@example.com' },
  render: (args) => (
    <Field className="w-80">
      <FieldLabel htmlFor={args.id}>Email address</FieldLabel>
      <Input {...args} />
    </Field>
  ),
}

export const WithError: Story = {
  args: { id: 'input-password', type: 'password', 'aria-invalid': true },
  render: (args) => (
    <Field className="w-80">
      <FieldLabel htmlFor={args.id}>Password</FieldLabel>
      <Input {...args} />
      <FieldError>Password must be at least 8 characters</FieldError>
    </Field>
  ),
}

export const WithHint: Story = {
  args: { id: 'input-username', placeholder: 'johndoe' },
  render: (args) => (
    <Field className="w-80">
      <FieldLabel htmlFor={args.id}>Username</FieldLabel>
      <Input {...args} />
      <FieldDescription>This will be your public display name</FieldDescription>
    </Field>
  ),
}

const iconClass = 'pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Field>
        <FieldLabel htmlFor="icon-email">Email</FieldLabel>
        <div className="relative">
          <Mail className={`${iconClass} left-3`} />
          <Input id="icon-email" className="pl-9" placeholder="you@example.com" />
        </div>
      </Field>
      <Field>
        <FieldLabel htmlFor="icon-password">Password</FieldLabel>
        <div className="relative">
          <Lock className={`${iconClass} left-3`} />
          <Input id="icon-password" className="px-9" type="password" placeholder="••••••••" />
          <Eye className={`${iconClass} right-3`} />
        </div>
      </Field>
      <div className="relative">
        <Search className={`${iconClass} left-3`} />
        <Input className="pl-9" placeholder="Search…" aria-label="Search" />
      </div>
    </div>
  ),
}
