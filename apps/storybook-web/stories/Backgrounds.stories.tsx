import type { Meta, StoryObj } from '@storybook/react'
import { GradientBackground, AnimatedGradient, DottedBackground, NoiseBackground } from '@otf/ui'

const meta = {
  title: 'Backgrounds/All',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const GradientBackgroundPresets: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-0 h-screen">
      {(['slate', 'warm', 'cosmic', 'terminal'] as const).map((preset) => (
        <div key={preset} className="relative h-full min-h-[300px]">
          <GradientBackground preset={preset} />
          <div className="relative z-10 flex items-center justify-center h-full">
            <span className="text-white/90 text-lg font-semibold capitalize">{preset}</span>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AnimatedGradientVariants: StoryObj = {
  render: () => (
    <div className="space-y-0">
      {(['mesh', 'shift', 'pulse'] as const).map((variant) => (
        <div key={variant} className="relative h-[250px]">
          <AnimatedGradient variant={variant} />
          <div className="relative z-10 flex items-center justify-center h-full">
            <span className="text-white/80 text-lg font-semibold capitalize">{variant}</span>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const DottedBackgroundDemo: StoryObj = {
  render: () => (
    <div className="relative h-[400px]">
      <DottedBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <span className="text-foreground text-lg">Dotted pattern</span>
      </div>
    </div>
  ),
}

export const NoiseBackgroundDemo: StoryObj = {
  render: () => (
    <div className="relative h-[400px] bg-card">
      <NoiseBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <span className="text-foreground text-lg">Noise overlay</span>
      </div>
    </div>
  ),
}
