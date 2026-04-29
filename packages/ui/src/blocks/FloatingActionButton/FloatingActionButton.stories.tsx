import type { Meta, StoryObj } from '@storybook/react'
import { Bell, Settings, Sliders } from 'lucide-react'
import { Switch } from '../../primitives/switch'
import { Slider } from '../../primitives/slider'
import { FloatingActionButton, FloatingThemePicker, DEFAULT_THEME_OPTIONS } from './FloatingActionButton'

// ── Generic FloatingActionButton stories ─────────────────────────────────────

const fabMeta: Meta<typeof FloatingActionButton> = {
  title: 'Blocks/FloatingActionButton',
  component: FloatingActionButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A generic fixed floating action button that opens a popover panel. ' +
          'Accepts any icon, title, description, and an array of `FabSection` objects — ' +
          'each section has a `label` and arbitrary `content: ReactNode`. ' +
          '`FloatingThemePicker` is a pre-wired convenience wrapper on top of this component.',
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
      description: 'Which corner the FAB is anchored to.',
    },
  },
}

export default fabMeta
type FabStory = StoryObj<typeof FloatingActionButton>

/** Minimal FAB — custom icon and a single section with arbitrary React content */
export const GenericFAB: FabStory = {
  name: 'Generic — custom icon + sections',
  args: {
    icon: <Settings className="h-[18px] w-[18px]" />,
    label: 'Open settings',
    title: 'Quick Settings',
    description: 'Adjust your preferences.',
    position: 'bottom-right',
    sections: [
      {
        label: 'Notifications',
        content: (
          <div className="space-y-2.5">
            {['Email alerts', 'Push notifications', 'Digest'].map(item => (
              <div key={item} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item}</span>
                <Switch />
              </div>
            ))}
          </div>
        ),
      },
      {
        label: 'Volume',
        content: (
          <div className="py-1">
            <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
          </div>
        ),
      },
    ],
  },
  render: args => (
    <div className="relative w-full h-[400px] bg-background flex items-center justify-center">
      <div className="text-center space-y-1">
        <p className="text-base font-semibold text-foreground">Generic FAB</p>
        <p className="text-sm text-muted-foreground">Custom icon, sections, and content</p>
      </div>
      <FloatingActionButton {...args} />
    </div>
  ),
}

/** FAB with a single section and no title/description */
export const MinimalFAB: FabStory = {
  name: 'Minimal — no header',
  args: {
    icon: <Bell className="h-[18px] w-[18px]" />,
    label: 'Notification filter',
    position: 'bottom-right',
    sections: [
      {
        label: 'Filter',
        content: (
          <div className="space-y-2">
            {['All', 'Unread', 'Mentions', 'Assigned'].map(f => (
              <button
                key={f}
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                {f}
              </button>
            ))}
          </div>
        ),
      },
    ],
  },
  render: args => (
    <div className="relative w-full h-[400px] bg-background flex items-center justify-center">
      <div className="text-center space-y-1">
        <p className="text-base font-semibold text-foreground">Minimal FAB</p>
        <p className="text-sm text-muted-foreground">No header, single section</p>
      </div>
      <FloatingActionButton {...args} />
    </div>
  ),
}

/** All four corner positions */
export const CornerPositions: FabStory = {
  name: 'All corner positions',
  render: () => {
    const positions = ['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const
    return (
      <div className="relative w-full h-[400px] bg-background flex items-center justify-center">
        <div className="text-center space-y-1">
          <p className="text-base font-semibold text-foreground">Four corners</p>
          <p className="text-sm text-muted-foreground">Each FAB anchors to a different corner</p>
        </div>
        {positions.map(pos => (
          <FloatingActionButton
            key={pos}
            icon={<Sliders className="h-[18px] w-[18px]" />}
            label={`FAB ${pos}`}
            title={pos}
            position={pos}
            sections={[{ label: 'Position', content: <p className="text-sm text-muted-foreground">{pos}</p> }]}
          />
        ))}
      </div>
    )
  },
  parameters: { layout: 'fullscreen' },
}

// ── FloatingThemePicker (pre-wired convenience) ───────────────────────────────

export const ThemePicker: FabStory = {
  name: 'FloatingThemePicker — default',
  render: () => (
    <div className="relative w-full h-[400px] bg-background flex items-center justify-center">
      <div className="text-center space-y-1">
        <p className="text-base font-semibold text-foreground">Click the palette button</p>
        <p className="text-sm text-muted-foreground">Pre-wired mode + palette sections</p>
      </div>
      <FloatingThemePicker />
    </div>
  ),
}

export const ThemePickerCustomPalette: FabStory = {
  name: 'FloatingThemePicker — custom palette',
  render: () => (
    <div className="relative w-full h-[400px] bg-background flex items-center justify-center">
      <div className="text-center space-y-1">
        <p className="text-base font-semibold text-foreground">Three palettes only</p>
        <p className="text-sm text-muted-foreground">Pass your own options array</p>
      </div>
      <FloatingThemePicker
        position="bottom-right"
        options={[
          { value: '__brand__',    label: 'Default', color: '#F97316' },
          { value: 'theme-slate',  label: 'Slate',   color: '#6366F1' },
          { value: 'theme-cosmic', label: 'Cosmic',  color: '#7C3AED' },
        ]}
      />
    </div>
  ),
}

/** Static panel preview for documentation */
export const PanelPreview: FabStory = {
  name: 'Panel preview (static layout)',
  render: () => (
    <div className="w-64 rounded-lg border border-border bg-card shadow-lg overflow-hidden">
      <div className="px-4 pt-3.5 pb-3">
        <p className="text-sm font-semibold leading-none">Appearance</p>
        <p className="text-[11px] text-muted-foreground mt-1">Customize your experience.</p>
      </div>
      <div className="h-px bg-border" />
      <div className="px-4 py-3 space-y-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Mode</p>
          <div className="inline-flex rounded-md border border-border bg-background p-0.5">
            {['Light', 'Dark', 'System'].map((m, i) => (
              <span
                key={m}
                className={`inline-flex items-center px-2.5 h-7 text-xs rounded ${
                  i === 2 ? 'bg-foreground text-background' : 'text-muted-foreground'
                }`}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">Palette</p>
          <div className="flex items-center gap-2.5">
            {DEFAULT_THEME_OPTIONS.map((opt, i) => (
              <span
                key={opt.value}
                className={`h-7 w-7 rounded-full block ${i === 0 ? 'ring-2 ring-offset-2 ring-offset-card scale-110' : 'opacity-60'}`}
                style={{ background: opt.color, ['--tw-ring-color' as string]: opt.color }}
              />
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 font-medium">Brand</p>
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'centered' },
}
