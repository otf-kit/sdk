import type { Meta, StoryObj } from '@storybook/react'
import { toast } from '@otfdashkit/ui'
import { Button } from '@otfdashkit/ui'
import { Toaster } from '@otfdashkit/ui'

const meta = {
  title: 'Feedback/Toast',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="relative min-h-[300px] w-full">
        <Story />
        <Toaster />
      </div>
    ),
  ],
} satisfies Meta

export default meta

export const AllTypes: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast('Default toast', 'This is a default toast message')}>Default</Button>
      <Button variant="outline" onClick={() => toast.success('Success', 'Operation completed')}>Success</Button>
      <Button variant="outline" onClick={() => toast.error('Error', 'Something went wrong')}>Error</Button>
      <Button variant="outline" onClick={() => toast.warning('Warning', 'Please review before continuing')}>Warning</Button>
      <Button variant="outline" onClick={() => toast.info('Info', 'New version available')}>Info</Button>
    </div>
  ),
}
