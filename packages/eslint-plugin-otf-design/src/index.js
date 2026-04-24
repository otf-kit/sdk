'use strict'

// ── Rule: no-hex-colors ──────────────────────────────────────────
const noHexColors = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded hex color literals — use design tokens (C.* or Tailwind classes) instead',
      recommended: true,
      url: 'https://github.com/your-org/otf/packages/eslint-plugin-otf-design',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowFiles: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noHex: 'Hardcoded hex color "{{ value }}" found. Use a design token (C.* or a Tailwind token class) instead.',
    },
  },
  create(context) {
    const options = context.options[0] || {}
    const allowFiles = options.allowFiles || ['theme.ts', 'tokens.ts']
    const filename = context.getFilename ? context.getFilename() : (context.filename ?? '')

    // Skip allowed token definition files
    if (allowFiles.some((f) => filename.endsWith(f))) return {}

    const HEX_RE = /^#[0-9a-fA-F]{3,8}$/

    return {
      Literal(node) {
        if (typeof node.value === 'string' && HEX_RE.test(node.value)) {
          context.report({
            node,
            messageId: 'noHex',
            data: { value: node.value },
          })
        }
      },
    }
  },
}

// ── Rule: no-default-tailwind-colors ────────────────────────────
const noDefaultTailwindColors = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow default Tailwind color scale classes (blue-500, purple-600, etc.) — use OTF token classes instead',
      recommended: true,
    },
    schema: [],
    messages: {
      noDefault:
        'Default Tailwind color class "{{ value }}" found. Use OTF token classes (bg-primary, text-foreground, etc.) instead.',
    },
  },
  create(context) {
    // Ban direct palette scale classes for colors OTF replaces with tokens
    const BANNED_RE =
      /(?:^|\s)(?:bg|text|border|ring|fill|stroke)-(?:blue|purple|indigo|violet|green|emerald|red|rose|orange|amber|yellow|pink|teal|cyan)-\d{2,3}(?:\s|$)/

    return {
      Literal(node) {
        if (typeof node.value === 'string' && BANNED_RE.test(node.value)) {
          const match = node.value.match(
            /(?:bg|text|border|ring|fill|stroke)-(?:blue|purple|indigo|violet|green|emerald|red|rose|orange|amber|yellow|pink|teal|cyan)-\d{2,3}/
          )
          if (match) {
            context.report({
              node,
              messageId: 'noDefault',
              data: { value: match[0] },
            })
          }
        }
      },
    }
  },
}

// ── Plugin export ────────────────────────────────────────────────
module.exports = {
  rules: {
    'no-hex-colors': noHexColors,
    'no-default-tailwind-colors': noDefaultTailwindColors,
  },

  configs: {
    recommended: {
      plugins: { '@otf/otf-design': module.exports },
      rules: {
        '@otf/otf-design/no-hex-colors': 'error',
        '@otf/otf-design/no-default-tailwind-colors': 'warn',
      },
    },
  },
}
