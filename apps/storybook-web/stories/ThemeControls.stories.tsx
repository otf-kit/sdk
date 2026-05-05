import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ThemeSwitch, ColorSchemeSelect, Heading, Body, Caption } from '@otfdashkit/ui'

const meta: Meta = { title: 'Theme/Controls', tags: ['autodocs'] }
export default meta

export const ThemeSwitchSegmented: StoryObj = {
  name: 'ThemeSwitch / Segmented',
  render: () => (
    <div className="space-y-3">
      <Caption>Segmented (default)</Caption>
      <ThemeSwitch />
      <Body size="sm" tone="muted">
        Toggles the <code>dark</code> class on <code>&lt;html&gt;</code>.
        Selection persists in localStorage under <code>otf-color-scheme</code>.
      </Body>
    </div>
  ),
}

export const ThemeSwitchButton: StoryObj = {
  name: 'ThemeSwitch / Single button',
  render: () => (
    <div className="space-y-3">
      <Caption>Cycling icon button</Caption>
      <ThemeSwitch variant="button" />
      <Body size="sm" tone="muted">
        Cycles light → dark → system on each click.
      </Body>
    </div>
  ),
}

export const ColorScheme: StoryObj = {
  name: 'ColorSchemeSelect',
  render: () => (
    <div className="space-y-3 w-72">
      <Caption>Pick a palette</Caption>
      <ColorSchemeSelect />
      <Body size="sm" tone="muted">
        Sets a <code>theme-*</code> class on <code>&lt;html&gt;</code>. Persists
        in <code>otf-theme</code>. Note: this Storybook has its own theme toolbar
        which may override the root class — see the change in an app consumer.
      </Body>
    </div>
  ),
}

export const Combined: StoryObj = {
  name: 'Theme + color scheme together',
  render: () => (
    <div className="space-y-4">
      <div>
        <Heading size="sm">Appearance</Heading>
        <Body size="sm" tone="muted">Configure mode and palette.</Body>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-6">
          <Caption>Mode</Caption>
          <ThemeSwitch />
        </div>
        <div className="flex items-center justify-between gap-6">
          <Caption>Palette</Caption>
          <div className="w-56"><ColorSchemeSelect /></div>
        </div>
      </div>
    </div>
  ),
}
