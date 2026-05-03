import type { Meta, StoryObj } from '@storybook/react'
import { Marquee } from '@otf/ui'

const meta: Meta<typeof Marquee> = {
  title: 'Primitives/Marquee',
  component: Marquee,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Marquee>

const LOGOS = ['Acme', 'Globex', 'Initech', 'Umbrella', 'Hooli', 'Wonka', 'Stark Industries', 'Cyberdyne']

const LogoChip = ({ name }: { name: string }) => (
  <div className="flex h-12 min-w-[140px] items-center justify-center rounded-md border border-border bg-card px-6 font-mono text-sm uppercase tracking-widest text-muted-foreground">
    {name}
  </div>
)

export const Default: Story = {
  render: () => (
    <Marquee>
      {LOGOS.map((n) => (
        <LogoChip key={n} name={n} />
      ))}
    </Marquee>
  ),
}

export const Reverse: Story = {
  render: () => (
    <Marquee direction="right" speed="slow">
      {LOGOS.map((n) => (
        <LogoChip key={n} name={n} />
      ))}
    </Marquee>
  ),
}

export const Fast: Story = {
  render: () => (
    <Marquee speed="fast">
      {LOGOS.map((n) => (
        <LogoChip key={n} name={n} />
      ))}
    </Marquee>
  ),
}

export const NoFade: Story = {
  render: () => (
    <Marquee fade={false}>
      {LOGOS.map((n) => (
        <LogoChip key={n} name={n} />
      ))}
    </Marquee>
  ),
}

export const Testimonials: Story = {
  render: () => (
    <Marquee speed="slow" gap="gap-6">
      {[
        { quote: '"Saved us months of design work."', author: 'Jamie · CTO, Lattice' },
        { quote: '"Best component library I\'ve shipped with."', author: 'Priya · Eng, Linear' },
        { quote: '"AI-native UX, finally."', author: 'Alex · Founder, Maven' },
        { quote: '"The dark mode is exquisite."', author: 'Sam · Designer, Cron' },
      ].map(({ quote, author }, i) => (
        <div
          key={i}
          className="flex w-[320px] flex-col gap-2 rounded-lg border border-border bg-card p-4"
        >
          <p className="text-sm leading-relaxed text-foreground">{quote}</p>
          <p className="font-mono text-xs text-muted-foreground">{author}</p>
        </div>
      ))}
    </Marquee>
  ),
}
