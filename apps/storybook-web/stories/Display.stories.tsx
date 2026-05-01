import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Badge,
  Avatar, AvatarFallback, AvatarImage, AvatarGroup,
  LogoCarousel,
  Separator,
  Progress,
  Button,
} from '@otf/ui'

const meta: Meta = { title: 'Primitives/Display', tags: ['autodocs'] }
export default meta

export const CardStory: StoryObj = {
  name: 'Card',
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Requires a connected GitHub repository.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
}

export const BadgeStory: StoryObj = {
  name: 'Badge',
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge className="bg-green-500 text-white border-transparent">Success</Badge>
    </div>
  ),
}

export const AvatarStory: StoryObj = {
  name: 'Avatar',
  render: () => (
    <div className="flex gap-3 items-center">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14">
        <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
        <AvatarFallback>V</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const SeparatorStory: StoryObj = {
  name: 'Separator',
  render: () => (
    <div className="w-64 space-y-4">
      <div>
        <h4 className="text-sm font-medium">Horizontal</h4>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Below me is a separator</p>
        <Separator className="my-2" />
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Above me is a separator</p>
      </div>
      <div className="flex items-center h-8 gap-2 text-sm">
        <span>Left</span>
        <Separator orientation="vertical" />
        <span>Center</span>
        <Separator orientation="vertical" />
        <span>Right</span>
      </div>
    </div>
  ),
}

export const ProgressStory: StoryObj = {
  name: 'Progress',
  render: () => (
    <div className="w-64 space-y-4">
      <Progress value={33} />
      <Progress value={66} className="h-3" />
      <Progress value={100} />
      <Progress value={0} />
    </div>
  ),
}

// ── AvatarGroup ──────────────────────────────────────────────────────────────
const TEAM = [
  { initials: 'SC', src: 'https://i.pravatar.cc/64?img=47' },
  { initials: 'AR', src: 'https://i.pravatar.cc/64?img=12' },
  { initials: 'KL', src: 'https://i.pravatar.cc/64?img=22' },
  { initials: 'JD', src: 'https://i.pravatar.cc/64?img=33' },
  { initials: 'MP', src: 'https://i.pravatar.cc/64?img=51' },
  { initials: 'TS', src: 'https://i.pravatar.cc/64?img=58' },
  { initials: 'VR', src: 'https://i.pravatar.cc/64?img=64' },
] as const

export const AvatarGroupStory: StoryObj = {
  name: 'AvatarGroup',
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <p className="text-xs font-mono uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Default · max 4</p>
        <AvatarGroup max={4}>
          {TEAM.map((m) => (
            <Avatar key={m.initials}>
              <AvatarImage src={m.src} alt={m.initials} />
              <AvatarFallback>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-mono uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Compact · 24px / -10px overlap</p>
        <AvatarGroup max={5} size={24} spacing={10}>
          {TEAM.slice(0, 7).map((m) => (
            <Avatar key={m.initials}>
              <AvatarImage src={m.src} alt={m.initials} />
              <AvatarFallback className="text-[8px]">{m.initials}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-mono uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Large · custom overflow</p>
        <AvatarGroup
          max={3}
          size={48}
          renderOverflow={(n) => `${n}+ more`}
        >
          {TEAM.map((m) => (
            <Avatar key={m.initials}>
              <AvatarImage src={m.src} alt={m.initials} />
              <AvatarFallback>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-mono uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Fallback only · no images</p>
        <AvatarGroup max={5}>
          {TEAM.map((m) => (
            <Avatar key={m.initials}>
              <AvatarFallback>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
    </div>
  ),
}

// ── LogoCarousel ─────────────────────────────────────────────────────────────
const LOGO_LABELS = ['Acme', 'Globex', 'Initech', 'Umbrella', 'Massive Dynamic', 'Stark Industries', 'Wayne Enterprises', 'Hooli'] as const

export const LogoCarouselStory: StoryObj = {
  name: 'LogoCarousel',
  render: () => (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Default · 30s · pause on hover</p>
        <LogoCarousel
          logos={LOGO_LABELS.map((l) => (
            <span key={l} className="text-base font-semibold tracking-tight whitespace-nowrap">
              {l}
            </span>
          ))}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Reverse · faster · no fade</p>
        <LogoCarousel
          duration={20}
          direction="right"
          fadeEdges={false}
          gap="2.5rem"
          logos={LOGO_LABELS.map((l) => (
            <span key={l} className="text-sm font-medium uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] whitespace-nowrap">
              {l}
            </span>
          ))}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-[hsl(var(--muted-foreground))]">SVG marks · slow drift</p>
        <LogoCarousel
          duration={45}
          gap="4rem"
          logos={[
            <svg key="a" width="80" height="20" viewBox="0 0 80 20" className="text-[hsl(var(--muted-foreground))]">
              <text x="0" y="15" fontFamily="monospace" fontSize="14" fontWeight="700" fill="currentColor">{'<acme/>'}</text>
            </svg>,
            <svg key="b" width="60" height="20" viewBox="0 0 60 20" className="text-[hsl(var(--muted-foreground))]">
              <circle cx="10" cy="10" r="6" fill="currentColor" />
              <text x="22" y="15" fontSize="13" fontWeight="600" fill="currentColor">Orbit</text>
            </svg>,
            <svg key="c" width="80" height="20" viewBox="0 0 80 20" className="text-[hsl(var(--muted-foreground))]">
              <text x="0" y="15" fontFamily="serif" fontSize="15" fontStyle="italic" fill="currentColor">Lumen.</text>
            </svg>,
            <svg key="d" width="80" height="20" viewBox="0 0 80 20" className="text-[hsl(var(--muted-foreground))]">
              <rect x="0" y="3" width="14" height="14" fill="currentColor" />
              <text x="20" y="15" fontSize="13" fontWeight="700" fill="currentColor">CUBIT</text>
            </svg>,
            <svg key="e" width="70" height="20" viewBox="0 0 70 20" className="text-[hsl(var(--muted-foreground))]">
              <text x="0" y="15" fontFamily="sans-serif" fontSize="14" fontWeight="800" letterSpacing="2" fill="currentColor">PRISM</text>
            </svg>,
            <svg key="f" width="90" height="20" viewBox="0 0 90 20" className="text-[hsl(var(--muted-foreground))]">
              <path d="M0 10 L10 0 L20 10 L10 20 Z" fill="currentColor" />
              <text x="26" y="15" fontSize="13" fontWeight="600" fill="currentColor">Vertex</text>
            </svg>,
          ]}
        />
      </div>
    </div>
  ),
}
