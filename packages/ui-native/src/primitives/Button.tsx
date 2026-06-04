import { Button as TamaguiButton, styled, type GetProps } from 'tamagui'

// OtfButton — a thin styled extension of Tamagui's Button that layers OTF's
// opinionated `variant` fills on top. We deliberately do NOT use `unstyled`:
// keeping the full Tamagui Button machinery preserves size-token scaling
// (size="$2".."$5"), automatic string→Button.Text composition, icon sizing,
// and the press/focus/disabled + a11y behaviour.
//
// Design standard: native-premium bar (pill shape, bold weight, colored glow
// on primary/destructive, accent-tinted outlined border). All fills are solid
// per AGENTS.md (no gradient CTAs). The pill borderRadius is $10 by default —
// callers can always override with borderRadius="$4" for a square-er style.
//
// Exported as both `Button` (canonical import) and `OtfButton` (alias).
export const Button = styled(TamaguiButton, {
  name: 'OtfButton',

  // ─── Pill shape — the native-premium standard ────────────────────────────
  borderRadius: '$10',

  // ─── Bold text — every variant is a call-to-action ───────────────────────
  fontWeight: '700',

  // ─── Reset border so variants control it explicitly ──────────────────────
  borderWidth: 0,
  borderColor: 'transparent',

  // ─── Satisfying press feedback shared across all variants ────────────────
  animation: 'quick',

  variants: {
    variant: {
      // ── Primary ──────────────────────────────────────────────────────────
      // Filled accent — the headline CTA. Color-matched glow shadow makes it
      // pop off any surface; clear step-down on hover/press.
      primary: {
        backgroundColor: '$color9',
        color: '$color1',
        fontWeight: '700',
        shadowColor: '$color9',
        shadowOpacity: 0.45,
        shadowRadius: 16,
        shadowOffset: { height: 4, width: 0 },
        hoverStyle: {
          backgroundColor: '$color10',
          shadowOpacity: 0.65,
        },
        pressStyle: {
          backgroundColor: '$color8',
          shadowOpacity: 0.2,
          scale: 0.97,
        },
      },

      // ── Default (Secondary) ───────────────────────────────────────────────
      // Elevated dark surface — the neutral action. Hairline border separates
      // it from the page bg without shouting.
      default: {
        backgroundColor: '$color3',
        borderWidth: 1,
        borderColor: '$color6',
        color: '$color12',
        fontWeight: '600',
        hoverStyle: {
          backgroundColor: '$color4',
          borderColor: '$color7',
        },
        pressStyle: {
          backgroundColor: '$color2',
          scale: 0.97,
          opacity: 0.9,
        },
      },

      // ── Outlined ──────────────────────────────────────────────────────────
      // Transparent fill, accent-tinted border — clear "secondary CTA" signal
      // without competing with primary. Border picks up the palette accent so
      // it reads premium across all themes.
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '$color9',
        color: '$color12',
        fontWeight: '600',
        hoverStyle: {
          backgroundColor: '$color2',
          borderColor: '$color10',
        },
        pressStyle: {
          backgroundColor: '$color2',
          borderColor: '$color8',
          scale: 0.97,
          opacity: 0.85,
        },
      },

      // ── Ghost ─────────────────────────────────────────────────────────────
      // Text-only until hovered — for inline / toolbar actions that should
      // recede until the user needs them.
      transparent: {
        backgroundColor: 'transparent',
        color: '$color11',
        fontWeight: '500',
        hoverStyle: { backgroundColor: '$color3' },
        pressStyle: {
          backgroundColor: '$color2',
          scale: 0.97,
          opacity: 0.85,
        },
      },

      // ── Floating ──────────────────────────────────────────────────────────
      // Elevated neutral surface for toolbars / FAB-adjacent / sticky footers.
      floating: {
        backgroundColor: '$color3',
        borderWidth: 1,
        borderColor: '$color5',
        color: '$color12',
        fontWeight: '600',
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowRadius: 12,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.35,
        hoverStyle: {
          backgroundColor: '$color4',
          shadowOpacity: 0.5,
        },
        pressStyle: {
          backgroundColor: '$color2',
          scale: 0.97,
          shadowOpacity: 0.15,
        },
      },

      // ── Destructive ───────────────────────────────────────────────────────
      // Red fill for irreversible actions. Color-matched shadow mirrors
      // the primary treatment to signal "this matters."
      destructive: {
        backgroundColor: '$red9',
        color: '#ffffff',
        fontWeight: '700',
        shadowColor: '$red9',
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { height: 3, width: 0 },
        hoverStyle: {
          backgroundColor: '$red10',
          shadowOpacity: 0.55,
        },
        pressStyle: {
          backgroundColor: '$red8',
          scale: 0.97,
          shadowOpacity: 0.15,
        },
      },

      // ── Shimmer ───────────────────────────────────────────────────────────
      // Premium "hero" CTA variant — accent fill + stronger 360° glow +
      // subtle inner-ring border. Used for paywall / onboarding / landing CTAs
      // where the button IS the primary conversion surface.
      shimmer: {
        backgroundColor: '$color9',
        color: '$color1',
        fontWeight: '700',
        borderWidth: 1,
        borderColor: '$color8',
        shadowColor: '$color9',
        shadowRadius: 24,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.7,
        hoverStyle: {
          backgroundColor: '$color10',
          shadowOpacity: 0.9,
          shadowRadius: 32,
        },
        pressStyle: {
          backgroundColor: '$color8',
          shadowOpacity: 0.3,
          scale: 0.97,
        },
      },
    },

    fullWidth: {
      true: { width: '100%' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
})

export type ButtonProps = GetProps<typeof Button>
