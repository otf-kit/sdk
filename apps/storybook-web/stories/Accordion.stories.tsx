import type { Meta, StoryObj } from '@storybook/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@otf/ui'

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Accordion>

const FAQ_ITEMS = [
  {
    q: 'Is OTF free to use?',
    a: 'Yes. The SDK and core components ship under MIT. Paid tiers add Pro components and starter kits with full source.',
  },
  {
    q: 'Does it work with Next.js, Vite, and Remix?',
    a: 'All three. Components are framework-agnostic React. Tailwind handles styling, so any host that supports Tailwind v4 works.',
  },
  {
    q: 'How is theming handled?',
    a: 'Every component reads from the same CSS-variable token set. Drop in a theme file (e.g. @otf/ui/themes/midnight.css) and the whole tree restyles.',
  },
  {
    q: 'Can I use just one component?',
    a: 'Yes — tree-shaking ships only what you import.',
  },
]

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[420px]">
      {FAQ_ITEMS.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[420px]" defaultValue={['item-0', 'item-2']}>
      {FAQ_ITEMS.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[420px]">
      <AccordionItem value="a">
        <AccordionTrigger>Active section</AccordionTrigger>
        <AccordionContent>This one expands normally.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b" disabled>
        <AccordionTrigger>Disabled section</AccordionTrigger>
        <AccordionContent>You shouldn&apos;t see this.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Another active one</AccordionTrigger>
        <AccordionContent>This one also expands.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
