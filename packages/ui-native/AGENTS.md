# AGENTS.md — `@otf/ui-native`

> Mobile component library for OTF kits (Expo + Tamagui-core, MIT). Every kit imports primitives, patterns, and layouts from here — feature code in kits MUST NOT reach into raw Tamagui or Radix.

## What belongs here

A component goes into `@otf/ui-native` if either:
1. It appears (or could appear) in **2 or more kits**, OR
2. It's a foundational primitive (`Button`, `Text`, `Input`, etc.) every kit needs

A component stays **kit-local** if it's truly domain-specific:
- ✅ Kit-local: `ActivityRings` (fitness), `AnatomyMap` (fitness), `MealCard` (nutrition-only flavor)
- ❌ NOT kit-local: anything that smells like a generic primitive — push to `@otf/ui-native` and let kits configure via props

## Package layout

```
src/
├── primitives/   # Button, Text, Input, Card, Avatar — atomic
├── interface/    # Pressable, Icon, Image, Badge, Headings, Separator, Tooltip — building blocks
├── layouts/      # ScreenLayout, Section, Grid, ListItem, SafeArea, Divider — structure
├── patterns/     # AppHeader, BottomSheet, Chip, EmptyState, MultiStep, Selectable, etc. — composed
└── index.ts      # barrel — exports every public API
```

## Authoring rules (follow these or PRs get rejected)

### TypeScript
- Strict, no `any`, no untyped `as`.
- Public component props live in an exported interface so kits can extend.
- Default exports are banned (named only — barrel-friendly).

### Styling
- **Tamagui tokens only** (`$color1..12`, `$background`, `$space.lg`). Never hardcode hex in feature code.
- Surface tokens (bg / text / border) reference theme, never literal.
- Domain colors (chart palettes, ring colors, brand accent) live in `@otf/tokens` — import from there, don't redefine.

### Motion
- **Reanimated 4 only.** Never `react-native/Animated` (legacy).
- Every animated component must `useReducedMotion()` and snap to its target when the OS pref is on.
- Standard durations live in the consuming kit's `lib/animations.ts` — pass them in via props, don't hardcode in the primitive.

### Reduced-motion
- Honor `useReducedMotion()` in every component that ships motion. Falling back to "instant render" is acceptable; falling back to "reduced motion" (slower easing) is also acceptable. Just don't ignore the pref.

### Accessibility
- VoiceOver / TalkBack labels on every interactive element.
- `accessibilityRole` set per WAI-ARIA.
- Focus visible on web via `focus-visible` ring.
- Touch targets ≥ 44×44pt.

### Hooks
- **Never call hooks at module top level.** No `useShadow.ts` building `shadowPresets` at import time. If you need a static derivation, write a pure function.
- Custom hooks return objects, not arrays (named props beat positional).

### Native deps
Approved (already in kits):
- `expo-router`, `react-native-reanimated` (v4 only), `react-native-svg`, `lottie-react-native`, `expo-linear-gradient`, `lucide-react-native`, `@expo/vector-icons`, `expo-secure-store`, `react-native-safe-area-context`, `react-native-gesture-handler`

Approved with ADR (see `docs/adr/2026-05-03-mobile-primitives-decisions.md`):
- `@gorhom/bottom-sheet` (the bottom-sheet standard for the SDK)
- `expo-image` (replaces `react-native` `Image` — drop-in, free perf)
- `expo-image-picker` (`patterns/AvatarUploader` only)
- `expo-haptics` (`patterns/WheelPicker`, `RulerScrubber` only)

Banned:
- `react-native-chart-kit` (unmaintained — use SVG)
- `react-native-actions-sheet` (use gorhom)
- NativeWind `styled()` HOCs in any kit code (use Tamagui tokens)
- Any lib that requires custom native modules outside the Expo managed flow

### Stories + showcase
Every primitive ships a showcase entry in `apps/ui-native-storybook/` exercising every prop variant, with light + dark + at least 2 palettes (Slate + one accent). The showcase deploys to `https://native.otf-kit.dev` (or similar). See ADR for shape.

### Naming + exports
- Component file = component name (`MultiStep.tsx` → `export function MultiStep`).
- Hooks live in `src/hooks/use*.ts` and export both the hook and any related types.
- Add the export to `src/index.ts` in the same PR — barrel-only consumption from kits.

## Clean-room rule

Every primitive in this package is a clean-room implementation. **Never copy code blocks, helpers, constants, or directory structure** from any third-party template. Re-implement in our stack with our motion vocabulary, token system, and naming.

## How to add a new primitive (checklist)

1. Confirm the component doesn't already exist in `src/{primitives,patterns,layouts,interface}/` (most "new" ideas overlap with something we already shipped — extend, don't duplicate).
2. Implement with strict TS, Tamagui tokens, Reanimated 4 only, useReducedMotion, A11y labels.
3. Add export to `src/index.ts`.
4. Add a showcase entry to `apps/ui-native-storybook/`.
5. Wire into at least one kit (fitness-kit is the test bed) — confirm typecheck clean.
6. Update `docs/lessons.md` if you learned something the next person needs to know.

## See also

- Root standards: `../../AGENTS.md`
- Engineering lessons: `../../docs/lessons.md`
- Mobile-primitives ADR: `../../docs/adr/2026-05-03-mobile-primitives-decisions.md`
