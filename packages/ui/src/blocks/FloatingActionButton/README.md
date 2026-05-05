# FloatingActionButton

A generic fixed floating action button (FAB) that opens a popover panel. Accepts any icon, title, description, and an array of sections — each with a label and arbitrary React content.

`FloatingThemePicker` is a pre-wired convenience wrapper that ships mode switching and palette selection out of the box.

## Usage — Generic FAB

```tsx
import { FloatingActionButton } from '@otfdashkit/ui'
import { Settings } from 'lucide-react'

export default function App() {
  return (
    <>
      {/* your app */}
      <FloatingActionButton
        icon={<Settings className="h-[18px] w-[18px]" />}
        label="Open settings"
        title="Quick Settings"
        description="Adjust your preferences."
        position="bottom-right"
        sections={[
          {
            label: 'Notifications',
            content: <MyNotificationToggles />,
          },
        ]}
      />
    </>
  )
}
```

## Usage — FloatingThemePicker (pre-wired)

```tsx
import { FloatingThemePicker } from '@otfdashkit/ui'

export default function App() {
  return (
    <>
      {/* your app */}
      <FloatingThemePicker />
    </>
  )
}
```

## FloatingActionButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | Palette icon | Icon rendered inside the FAB |
| `label` | `string` | `'Open panel'` | Tooltip / aria-label |
| `title` | `string` | — | Panel heading |
| `description` | `string` | — | Panel subheading |
| `sections` | `FabSection[]` | `[]` | Content sections rendered in the panel |
| `position` | `FabPosition` | `'bottom-right'` | Which corner to anchor the FAB |
| `className` | `string` | — | Extra className on the root wrapper |

## FabSection

```ts
interface FabSection {
  label: string         // Section heading shown in small-caps
  content: ReactNode    // Any React content to render inside the section
}
```

## FabPosition

```ts
type FabPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
```

## FloatingThemePicker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `ThemePickerOption[]` | Five OTF palettes | Palette swatches to display |
| `position` | `FabPosition` | `'bottom-right'` | Which corner to anchor the FAB |
| `className` | `string` | — | Extra className on the root wrapper |

## Default palette options

```ts
import { DEFAULT_THEME_OPTIONS } from '@otfdashkit/ui'
// [
//   { value: '__brand__',      label: 'Brand',    color: '#F97316' },
//   { value: 'theme-slate',    label: 'Slate',    color: '#6366F1' },
//   { value: 'theme-warm',     label: 'Warm',     color: '#D97706' },
//   { value: 'theme-cosmic',   label: 'Cosmic',   color: '#7C3AED' },
//   { value: 'theme-terminal', label: 'Terminal', color: '#16A34A' },
// ]
```
