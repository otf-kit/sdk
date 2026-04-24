import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage, Hotkeys, HotkeyBadge } from '@otf/ui'

const meta: Meta = { title: 'Navigation', tags: ['autodocs'] }
export default meta

export const BreadcrumbStory: StoryObj = {
  name: 'Breadcrumb',
  render: () => (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbItem href="/" label="Home" />
        <BreadcrumbItem href="/projects" label="Projects" />
        <BreadcrumbPage>My App</BreadcrumbPage>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbItem href="/" label="Dashboard" />
        <BreadcrumbItem href="/settings" label="Settings" />
        <BreadcrumbPage>Billing</BreadcrumbPage>
      </Breadcrumb>
    </div>
  ),
}

export const HotkeyBadgeStory: StoryObj = {
  name: 'HotkeyBadge',
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <HotkeyBadge>⌘</HotkeyBadge>
      <HotkeyBadge>K</HotkeyBadge>
      <HotkeyBadge>Enter</HotkeyBadge>
      <HotkeyBadge>Esc</HotkeyBadge>
      <HotkeyBadge>⇧</HotkeyBadge>
      <HotkeyBadge>⌥</HotkeyBadge>
    </div>
  ),
}

export const HotkeysStory: StoryObj = {
  name: 'Hotkeys',
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <span className="text-sm w-32">Open palette</span>
        <Hotkeys keys={['⌘', 'K']} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-32">Save</span>
        <Hotkeys keys={['⌘', 'S']} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-32">Search</span>
        <Hotkeys keys={['⌘', '⇧', 'F']} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-32">Close</span>
        <Hotkeys keys={['Esc']} />
      </div>
    </div>
  ),
}
