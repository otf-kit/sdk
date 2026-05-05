import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ImageCrop } from '@otfdashkit/ui'

const SAMPLE =
  'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1200&h=900&fit=crop&q=80'

const meta: Meta<typeof ImageCrop> = {
  title: 'Data/ImageCrop',
  component: ImageCrop,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof ImageCrop>

export const Default: Story = {
  render: () => (
    <div className="w-[640px] max-w-full">
      <ImageCrop src={SAMPLE} alt="Mountain landscape" />
    </div>
  ),
}

export const AspectLocked: Story = {
  render: () => (
    <div className="flex w-[640px] max-w-full flex-col gap-3">
      <ImageCrop src={SAMPLE} aspect={16 / 9} alt="Mountain landscape" />
      <p className="font-mono text-xs text-muted-foreground">
        Aspect locked to 16:9 — drag handles preserve the ratio.
      </p>
    </div>
  ),
}

export const Circular: Story = {
  render: () => (
    <div className="flex w-[420px] max-w-full flex-col gap-3">
      <ImageCrop
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop&q=80"
        aspect={1}
        circular
        alt="Portrait"
      />
      <p className="font-mono text-xs text-muted-foreground">
        Circular mask — ideal for avatar uploads.
      </p>
    </div>
  ),
}

export const WithExportPreview: Story = {
  render: () => {
    const [preview, setPreview] = React.useState<string | null>(null)
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            Source
          </span>
          <ImageCrop
            src={SAMPLE}
            aspect={1}
            outputFormat="jpeg"
            onComplete={({ croppedSrc }) => setPreview(croppedSrc)}
            alt="Mountain landscape"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            Cropped output
          </span>
          <div className="flex h-[280px] w-[280px] items-center justify-center rounded-md border border-dashed border-border bg-card text-sm text-muted-foreground">
            {preview ? (
              <img
                src={preview}
                alt="Cropped preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              'Drag the crop box to preview'
            )}
          </div>
        </div>
      </div>
    )
  },
}
