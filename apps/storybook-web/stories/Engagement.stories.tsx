import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Checklist, ChecklistItem,
  IntroDisclosure,
  Tour, TourStep, useTour,
  Beacon,
  Button,
} from '@otfdashkit/ui'
import { Sparkles, Users, GitBranch, Rocket, KeyRound } from 'lucide-react'

const meta: Meta = { title: 'Engagement', tags: ['autodocs'] }
export default meta

// ── Checklist ────────────────────────────────────────────────────────────────

export const ChecklistDefault: StoryObj = {
  name: 'Checklist',
  render: () => (
    <div className="max-w-md w-full">
      <Checklist
        title="Getting started"
        description="Finish setup to unlock the full workspace."
      >
        <ChecklistItem
          id="invite"
          title="Invite your teammates"
          description="Add at least one collaborator to your workspace."
          action={<Button size="sm" variant="outline">Invite</Button>}
        />
        <ChecklistItem
          id="connect"
          title="Connect a GitHub repo"
          description="Sync issues and PRs automatically."
          action={<Button size="sm" variant="outline">Connect</Button>}
        />
        <ChecklistItem
          id="key"
          title="Add an API key"
          description="So Claude can ship code on your behalf."
          action={<Button size="sm" variant="outline">Add</Button>}
        />
        <ChecklistItem
          id="deploy"
          title="Deploy to production"
          description="Go live with a single click."
          action={<Button size="sm">Deploy</Button>}
        />
      </Checklist>
    </div>
  ),
}

export const ChecklistPartialProgress: StoryObj = {
  name: 'Checklist · partial progress',
  render: () => (
    <div className="max-w-md w-full">
      <Checklist
        title="Workspace setup"
        description="2 of 4 complete — keep going."
        completed={{ invite: true, connect: true }}
      >
        <ChecklistItem id="invite" title="Invite your teammates" />
        <ChecklistItem id="connect" title="Connect a GitHub repo" />
        <ChecklistItem id="key" title="Add an API key" action={<Button size="sm" variant="outline">Add</Button>} />
        <ChecklistItem id="deploy" title="Deploy to production" action={<Button size="sm">Deploy</Button>} />
      </Checklist>
    </div>
  ),
}

export const ChecklistAllDone: StoryObj = {
  name: 'Checklist · 100% complete',
  render: () => (
    <div className="max-w-md w-full">
      <Checklist
        title="Workspace setup"
        description="All set — you can dismiss this."
        completed={{ invite: true, connect: true, key: true, deploy: true }}
      >
        <ChecklistItem id="invite" title="Invite your teammates" />
        <ChecklistItem id="connect" title="Connect a GitHub repo" />
        <ChecklistItem id="key" title="Add an API key" />
        <ChecklistItem id="deploy" title="Deploy to production" />
      </Checklist>
    </div>
  ),
}

// ── IntroDisclosure ──────────────────────────────────────────────────────────

const INTRO_STEPS = [
  {
    title: 'Welcome to OTF',
    description: 'A typed, accessible component library + AI-ready kits. Ship faster, look premium by default.',
    media: (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
        <Sparkles className="h-16 w-16 text-primary" strokeWidth={1.25} />
      </div>
    ),
  },
  {
    title: 'Bring your team',
    description: 'Invite collaborators, assign roles, and share context across projects.',
    media: (
      <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--muted)/0.5)]">
        <Users className="h-16 w-16 text-foreground/70" strokeWidth={1.25} />
      </div>
    ),
  },
  {
    title: 'Connect your repo',
    description: 'Link a GitHub repository to sync issues and let Claude ship pull requests.',
    media: (
      <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--muted)/0.5)]">
        <GitBranch className="h-16 w-16 text-foreground/70" strokeWidth={1.25} />
      </div>
    ),
  },
  {
    title: 'Ship something',
    description: 'You\'re ready. Open the command palette (⌘K) and start a task.',
    media: (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-primary/15 to-transparent">
        <Rocket className="h-16 w-16 text-primary" strokeWidth={1.25} />
      </div>
    ),
  },
]

export const IntroDisclosureDefault: StoryObj = {
  name: 'IntroDisclosure',
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(true)
      return (
        <div className="relative h-[600px] w-[800px] bg-[hsl(var(--background))] rounded-md border border-[hsl(var(--border))] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Button onClick={() => setOpen(true)}>
              <Sparkles className="h-4 w-4 mr-2" /> Show intro
            </Button>
          </div>
          <IntroDisclosure
            open={open}
            onOpenChange={setOpen}
            eyebrow="What's new"
            steps={INTRO_STEPS}
            storageKey={undefined}
          />
        </div>
      )
    }
    return <Demo />
  },
}

export const IntroDisclosureSingleStep: StoryObj = {
  name: 'IntroDisclosure · single step',
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(true)
      return (
        <div className="relative h-[600px] w-[800px] bg-[hsl(var(--background))] rounded-md border border-[hsl(var(--border))] overflow-hidden">
          <IntroDisclosure
            open={open}
            onOpenChange={setOpen}
            steps={[
              {
                title: 'New: API keys',
                description: 'You can now generate scoped API keys with custom expirations from Settings → Developer.',
                media: (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-transparent">
                    <KeyRound className="h-16 w-16 text-primary" strokeWidth={1.25} />
                  </div>
                ),
              },
            ]}
            finishLabel="Got it"
            storageKey={undefined}
          />
        </div>
      )
    }
    return <Demo />
  },
}

// ── Tour ─────────────────────────────────────────────────────────────────────

export const TourDefault: StoryObj = {
  name: 'Tour',
  render: () => {
    function Demo() {
      return (
        <Tour totalSteps={3}>
          <TourDemoBody />
        </Tour>
      )
    }
    return <Demo />
  },
}

function TourDemoBody() {
  const tour = useTour()
  return (
    <div className="w-[640px] space-y-6 p-8 bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Workspace tour</h3>
        <Button size="sm" onClick={tour.start} disabled={tour.isActive}>
          {tour.isActive ? 'Tour running' : 'Start tour'}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TourStep step={0} title="Sidebar" description="Switch between dashboards, issues, and settings." placement="bottom">
          <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)] p-4 text-sm">
            <Users className="h-4 w-4 mb-2 text-[hsl(var(--muted-foreground))]" />
            Sidebar
          </div>
        </TourStep>

        <TourStep step={1} title="Search" description="Press ⌘K to jump anywhere — issues, projects, settings." placement="bottom">
          <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)] p-4 text-sm">
            <Sparkles className="h-4 w-4 mb-2 text-[hsl(var(--muted-foreground))]" />
            Search
          </div>
        </TourStep>

        <TourStep step={2} title="Deploy" description="Ship a build with a single click. Claude can do it for you too." placement="bottom">
          <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)] p-4 text-sm">
            <Rocket className="h-4 w-4 mb-2 text-[hsl(var(--muted-foreground))]" />
            Deploy
          </div>
        </TourStep>
      </div>

      <p className="text-xs text-[hsl(var(--muted-foreground))]">
        Use ← / → arrows or Esc to control. The active step highlights its anchor with a ring + dims the rest.
      </p>
    </div>
  )
}

// ── Beacon (existing component, included for completeness) ───────────────────

export const BeaconDefault: StoryObj = {
  name: 'Beacon',
  render: () => (
    <div className="flex items-center gap-12 p-8">
      <div className="relative">
        <span className="text-sm">Default</span>
        <Beacon className="absolute -top-1 -right-3" />
      </div>
      <div className="relative">
        <span className="text-sm">Inline indicator</span>
        <Beacon className="absolute -top-1 -right-3" color="success" />
      </div>
    </div>
  ),
}
