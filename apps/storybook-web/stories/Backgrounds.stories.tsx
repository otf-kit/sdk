import type { Meta, StoryObj } from '@storybook/react'
import { GradientBackground, AnimatedGradient, DottedBackground, NoiseBackground, HeroShaderA } from '@otf/ui'

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

export const HeroShaderADefault: StoryObj = {
  render: () => (
    <div className="relative h-screen w-full bg-black">
      <HeroShaderA />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/60">— hero shader A</p>
        <h1 className="mt-4 text-5xl sm:text-6xl font-semibold tracking-tight text-white">
          Built for builders <span className="italic font-light text-white/70">who ship.</span>
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/70">
          A clean-room WebGL aurora — three drifting blobs lit by your theme tokens. Pauses when offscreen, falls back to a CSS gradient if WebGL is unavailable.
        </p>
      </div>
    </div>
  ),
}

export const HeroShaderASlow: StoryObj = {
  name: 'HeroShaderA — slow drift',
  render: () => (
    <div className="relative h-screen w-full bg-black">
      <HeroShaderA speed={0.4} intensity={0.55} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <span className="text-white text-2xl font-light italic">slower · subtler</span>
      </div>
    </div>
  ),
}

export const HeroShaderACustomColors: StoryObj = {
  name: 'HeroShaderA — custom palette',
  render: () => (
    <div className="relative h-screen w-full bg-black">
      <HeroShaderA
        colors={[
          [0.20, 0.85, 0.55],
          [0.10, 0.45, 0.95],
          [0.85, 0.35, 0.80],
        ]}
        background={[0.02, 0.04, 0.08]}
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <span className="text-white text-2xl font-light tracking-tight">teal · blue · magenta</span>
      </div>
    </div>
  ),
}

export const HeroShaderAFrozen: StoryObj = {
  name: 'HeroShaderA — frozen (reduced motion)',
  render: () => (
    <div className="relative h-screen w-full bg-black">
      <HeroShaderA speed={0} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <span className="text-white/80 text-xl">single static frame</span>
      </div>
    </div>
  ),
}
