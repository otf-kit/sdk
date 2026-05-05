import type { Meta, StoryObj } from '@storybook/react'
import { Heading, Body, Caption, Code } from '@otfdashkit/ui'

const meta: Meta = { title: 'Text/Typography', tags: ['autodocs'] }
export default meta

export const HeadingScale: StoryObj = {
  name: 'Heading scale',
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Heading size="display">Display heading</Heading>
      <Heading size="xl">Extra large heading</Heading>
      <Heading size="lg">Large heading</Heading>
      <Heading size="md">Medium heading</Heading>
      <Heading size="sm">Small heading</Heading>
      <Heading size="xs">Extra small heading</Heading>
    </div>
  ),
}

export const HeadingTones: StoryObj = {
  name: 'Heading tones',
  render: () => (
    <div className="space-y-3">
      <Heading size="lg" tone="default">Default tone</Heading>
      <Heading size="lg" tone="muted">Muted tone</Heading>
      <Heading size="lg" tone="accent">Accent tone</Heading>
    </div>
  ),
}

export const BodyText: StoryObj = {
  name: 'Body',
  render: () => (
    <div className="max-w-prose space-y-4">
      <Body size="lg">
        Large body — for lead paragraphs. Every template ships with extraordinary
        design, a production-ready SDK, and AI-tool integration baked in.
      </Body>
      <Body>
        Medium body (default) — standard running text with relaxed line-height.
        Use for most prose inside cards, settings, and descriptions.
      </Body>
      <Body size="sm" tone="muted">
        Small muted body — helper text under form controls, footnotes, or metadata.
      </Body>
      <Body size="xs" tone="subtle">
        Extra-small subtle — timestamps, version strings, and other tertiary copy.
      </Body>
    </div>
  ),
}

export const CaptionStory: StoryObj = {
  name: 'Caption',
  render: () => (
    <div className="space-y-6">
      <div>
        <Caption>Section label</Caption>
        <Body className="mt-1">Captions sit above sections as uppercase eyebrows.</Body>
      </div>
      <div>
        <Caption tone="accent">Accent caption</Caption>
        <Caption tone="subtle" className="ml-4">Subtle caption</Caption>
      </div>
    </div>
  ),
}

export const CodeStory: StoryObj = {
  name: 'Code',
  render: () => (
    <div className="max-w-xl space-y-4">
      <Body>
        Install OTF with <Code>pnpm add @otfdashkit/ui</Code> or the shadcn-style CLI.
      </Body>
      <Code block>{`import { Button } from '@otfdashkit/ui'

export function MyComponent() {
  return <Button variant="gradient">Ship it</Button>
}`}</Code>
    </div>
  ),
}

export const Composition: StoryObj = {
  name: 'Composition',
  render: () => (
    <article className="max-w-2xl space-y-4">
      <Caption tone="accent">Getting started</Caption>
      <Heading size="xl">Design systems that ship themselves</Heading>
      <Body size="lg" tone="muted">
        OTF bundles primitives, blocks, and kits that snap together without the
        usual back-and-forth with design.
      </Body>
      <Body>
        Start with <Code>@otfdashkit/ui</Code> for web, <Code>@otfdashkit/ui-native</Code> for
        mobile, and <Code>@otfdashkit/tokens</Code> for the palette system. All MIT,
        all tree-shakeable, all AI-tool-ready.
      </Body>
    </article>
  ),
}
