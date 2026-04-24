import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Bell, Shield, CreditCard, User, FileText, Image, Folder } from 'lucide-react'
import { DataList, DataListItem, GridList, GridListItem, Heading, Body, Caption } from '@otf/ui'

const meta: Meta = { title: 'Data/Lists', tags: ['autodocs'] }
export default meta

export const SettingsList: StoryObj = {
  name: 'DataList / Settings rows',
  render: () => (
    <div className="w-[420px]">
      <DataList>
        <DataListItem
          left={<User className="h-4 w-4" />}
          title="Profile"
          description="Name, email, avatar"
          right={<span className="text-xs">›</span>}
          interactive
        />
        <DataListItem
          left={<Bell className="h-4 w-4" />}
          title="Notifications"
          description="Email, push, digests"
          right={<span className="text-xs">›</span>}
          interactive
        />
        <DataListItem
          left={<Shield className="h-4 w-4" />}
          title="Security"
          description="Password, 2FA, sessions"
          right={<span className="text-xs">›</span>}
          interactive
        />
        <DataListItem
          left={<CreditCard className="h-4 w-4" />}
          title="Billing"
          description="Plan: Pro · Renews May 1"
          right={<span className="text-xs">›</span>}
          interactive
        />
      </DataList>
    </div>
  ),
}

export const BareList: StoryObj = {
  name: 'DataList / Bare (no border, no divider)',
  render: () => (
    <div className="w-[420px]">
      <DataList bordered={false} divided={false} className="space-y-1">
        <DataListItem left={<FileText className="h-4 w-4" />} title="Quarterly report.pdf" description="2.4 MB · Updated 2h ago" />
        <DataListItem left={<FileText className="h-4 w-4" />} title="Brand guidelines.pdf" description="8.1 MB · Updated yesterday" />
        <DataListItem left={<FileText className="h-4 w-4" />} title="Release checklist.md" description="14 KB · Updated Monday" />
      </DataList>
    </div>
  ),
}

export const ProjectGrid: StoryObj = {
  name: 'GridList / Project cards',
  render: () => {
    const projects = [
      { name: 'Design System', desc: '32 components · 4 palettes' },
      { name: 'Landing Page',   desc: 'Next.js · 3 sections' },
      { name: 'Dashboard Kit',  desc: 'Expo + Next.js + Hono' },
      { name: 'Marketplace',    desc: 'Y2 scaffold' },
      { name: 'Docs Site',      desc: 'Fumadocs + MDX' },
      { name: 'CLI Tool',       desc: 'otf-cli scaffolder' },
    ]
    return (
      <div className="w-full max-w-3xl">
        <GridList minItemWidth={220} gap={1}>
          {projects.map(p => (
            <GridListItem key={p.name} interactive>
              <Caption>Project</Caption>
              <Heading size="sm" className="mt-1">{p.name}</Heading>
              <Body size="sm" tone="muted" className="mt-1">{p.desc}</Body>
            </GridListItem>
          ))}
        </GridList>
      </div>
    )
  },
}

export const MediaGrid: StoryObj = {
  name: 'GridList / Media tiles',
  render: () => (
    <div className="w-full max-w-2xl">
      <GridList minItemWidth={120} gap={0.75}>
        {Array.from({ length: 12 }).map((_, i) => (
          <GridListItem key={i} interactive className="aspect-square flex items-center justify-center">
            {i % 3 === 0 ? <Image className="h-6 w-6 text-muted-foreground" /> : <Folder className="h-6 w-6 text-muted-foreground" />}
          </GridListItem>
        ))}
      </GridList>
    </div>
  ),
}
