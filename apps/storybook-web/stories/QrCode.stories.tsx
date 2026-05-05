import type { Meta, StoryObj } from '@storybook/react'
import { QrCode } from '@otfdashkit/ui'

const meta: Meta<typeof QrCode> = {
  title: 'Primitives/QrCode',
  component: QrCode,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof QrCode>

export const Default: Story = {
  render: () => <QrCode value="https://otf.sh" />,
}

export const Small: Story = {
  render: () => <QrCode value="https://otf.sh" size={128} />,
}

export const Large: Story = {
  render: () => <QrCode value="https://otf.sh" size={256} includeMargin />,
}

export const HighErrorCorrection: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <QrCode value="https://otf.sh" level="H" />
      <p className="font-mono text-xs text-muted-foreground">
        Level H — recoverable up to 30% damage
      </p>
    </div>
  ),
}

export const LongUrl: Story = {
  render: () => (
    <QrCode
      value="https://otf.sh/components/qr-code?utm_source=storybook&utm_campaign=demo"
      size={224}
    />
  ),
}

export const Empty: Story = {
  render: () => <QrCode value="" />,
}
