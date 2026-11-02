# Switch

The OTF toggle on web. Same look as the native `OtfSwitch` in `@otfdashkit/ui-native`: iOS proportions,
a 1.5px muted ring and a smaller white knob when off, the accent fill and a full-size knob when on, and a
springy knob that stretches while pressed (reduced motion jumps). Built on Radix `Switch`, so it is a real
`role="switch"` with `aria-checked`, Space to toggle, and a focus ring on keyboard focus only.

## Usage

```tsx
import { Switch } from '@otfdashkit/ui'

export function Example() {
  const [on, setOn] = useState(false)
  return <Switch aria-label="Dark mode" checked={on} onCheckedChange={setOn} />
}
```

## Props

Everything Radix `Switch.Root` accepts, plus:

| Prop | Default | Notes |
| --- | --- | --- |
| `size` | `sm` | `sm` 40x24 for rows and settings lists; `md` 51x31 matches the native default |
| `className` | | Merged last. To brand the on state, override `data-[state=checked]:bg-*` and `data-[state=checked]:border-*` together (the ring is the same colour as the fill when on) |

Always pass an accessible name: `aria-label`, or wrap it in a `<label>`.

## Examples

```tsx
// Settings row
<div className="flex items-center justify-between">
  <Label htmlFor="push">Push notifications</Label>
  <Switch id="push" checked={push} onCheckedChange={setPush} />
</div>

// Phone-sized toggle with a brand colour
<Switch size="md" aria-label="Dark mode" className="data-[state=checked]:border-brand data-[state=checked]:bg-brand" />

// Disabled
<Switch disabled aria-label="Sync with watch" />
```
