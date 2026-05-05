/**
 * eslint-plugin-otf-design
 *
 * Local ESLint flat-config rules for OTF design system:
 * 1. no-hex-colors — bans hex/rgb/hsl literals in feature code
 * 2. no-default-tailwind-colors — bans Tailwind default blue/purple/indigo/green
 *
 * Usage in eslint.config.mjs:
 *
 * ```js
 * import otfDesign from './packages/config/eslint-plugin-otf-design.mjs'
 *
 * export default [
 *   { plugins: { 'otf-design': otfDesign }, rules: {
 *     'otf-design/no-hex-colors': 'error',
 *     'otf-design/no-default-tailwind-colors': 'warn',
 *   }},
 * ]
 * ```
 */

// ── Rule: no-hex-colors ──────────────────────────────────────────
const HEX_PATTERN = /#[0-9a-fA-F]{3,8}\b/
const RGB_HSL_PATTERN = /\b(?:rgb|hsl)a?\s*\(/

const noHexColors = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow hex/rgb/hsl color literals in feature code — use design tokens instead.',
    },
    messages: {
      noHexColor: 'Avoid hex/rgb/hsl color literals. Use design tokens (CSS variables) from @otfdashkit/tokens instead.',
    },
    schema: [],
  },
  create(context) {
    // Only enforce in apps/ and kits/ — not in packages/tokens or packages/ui
    const filename = context.getFilename()
    const isFeatureCode =
      filename.includes('/apps/') ||
      filename.includes('/kits/') ||
      filename.includes('\\apps\\') ||
      filename.includes('\\kits\\')

    if (!isFeatureCode) return {}

    return {
      Literal(node) {
        if (typeof node.value !== 'string') return
        if (HEX_PATTERN.test(node.value) || RGB_HSL_PATTERN.test(node.value)) {
          context.report({ node, messageId: 'noHexColor' })
        }
      },
      TemplateLiteral(node) {
        for (const quasi of node.quasis) {
          const raw = quasi.value.raw
          if (HEX_PATTERN.test(raw) || RGB_HSL_PATTERN.test(raw)) {
            context.report({ node: quasi, messageId: 'noHexColor' })
          }
        }
      },
    }
  },
}

// ── Rule: no-default-tailwind-colors ─────────────────────────────
const BANNED_TW_COLORS = /\b(?:blue|purple|indigo|green)-(?:\d{2,3})\b/
const BANNED_HEX_VALS = /#(?:3B82F6|8B5CF6|6366F1|22C55E)\b/i

const noDefaultTailwindColors = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow default Tailwind blue/purple/indigo/green colors — use OTF palette tokens.',
    },
    messages: {
      noDefaultColor: 'Default Tailwind colors (blue/purple/indigo/green) are banned. Use OTF palette tokens.',
    },
    schema: [],
  },
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value !== 'string') return
        if (BANNED_TW_COLORS.test(node.value) || BANNED_HEX_VALS.test(node.value)) {
          context.report({ node, messageId: 'noDefaultColor' })
        }
      },
      TemplateLiteral(node) {
        for (const quasi of node.quasis) {
          const raw = quasi.value.raw
          if (BANNED_TW_COLORS.test(raw) || BANNED_HEX_VALS.test(raw)) {
            context.report({ node: quasi, messageId: 'noDefaultColor' })
          }
        }
      },
    }
  },
}

// ── Plugin export ────────────────────────────────────────────────
const plugin = {
  rules: {
    'no-hex-colors': noHexColors,
    'no-default-tailwind-colors': noDefaultTailwindColors,
  },
}

export default plugin
