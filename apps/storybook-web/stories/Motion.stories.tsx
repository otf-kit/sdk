import type { Meta, StoryObj } from '@storybook/react'
import { FadeIn, SlideIn, ScaleIn, Stagger, Ripple, Parallax, Reveal, Morph, Transition } from '@otfdashkit/ui'
import React, { useState } from 'react'

const meta = {
  title: 'Motion/Primitives',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const FadeInDemo: StoryObj = {
  render: () => (
    <FadeIn>
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-foreground">This content fades in on mount</p>
      </div>
    </FadeIn>
  ),
}

export const SlideInDemo: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <SlideIn direction="up"><div className="rounded-md border border-border bg-card p-4 text-foreground">Slide up</div></SlideIn>
      <SlideIn direction="down" delay={0.1}><div className="rounded-md border border-border bg-card p-4 text-foreground">Slide down</div></SlideIn>
      <SlideIn direction="left" delay={0.2}><div className="rounded-md border border-border bg-card p-4 text-foreground">Slide left</div></SlideIn>
      <SlideIn direction="right" delay={0.3}><div className="rounded-md border border-border bg-card p-4 text-foreground">Slide right</div></SlideIn>
    </div>
  ),
}

export const ScaleInDemo: StoryObj = {
  render: () => (
    <ScaleIn>
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-foreground">This content scales in</p>
      </div>
    </ScaleIn>
  ),
}

export const StaggerDemo: StoryObj = {
  render: () => (
    <Stagger preset="slideUp" staggerDelay={0.08}>
      {['Item one', 'Item two', 'Item three', 'Item four', 'Item five'].map((item) => (
        <div key={item} className="rounded-md border border-border bg-card px-4 py-3 mb-2 text-foreground">
          {item}
        </div>
      ))}
    </Stagger>
  ),
}

export const RippleDemo: StoryObj = {
  render: () => (
    <Ripple className="inline-block rounded-lg border border-border bg-card px-8 py-4 cursor-pointer select-none">
      <span className="text-foreground font-medium">Click me for ripple</span>
    </Ripple>
  ),
}

export const RevealDemo: StoryObj = {
  render: () => (
    <Reveal>
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-foreground">Revealed on scroll into view</p>
      </div>
    </Reveal>
  ),
}

export const TransitionDemo: StoryObj = {
  render: () => {
    const [show, setShow] = React.useState(true)
    return (
      <div className="space-y-4">
        <button
          onClick={() => setShow(!show)}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {show ? 'Hide' : 'Show'}
        </button>
        <Transition show={show}>
          <FadeIn>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-foreground">Toggled content with enter/exit</p>
            </div>
          </FadeIn>
        </Transition>
      </div>
    )
  },
}
