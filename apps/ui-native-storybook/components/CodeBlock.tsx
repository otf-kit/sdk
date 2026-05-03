import { useState } from 'react'
import { Highlight, themes, type PrismTheme } from 'prism-react-renderer'
import { Check, Copy } from '@tamagui/lucide-icons'
import { Pressable, View, XStack, YStack } from '@otf/ui-native'

interface CodeBlockProps {
  code: string
  /** prism-react-renderer language id. Default 'tsx'. */
  language?: string
  /** Optional caption rendered above the code (e.g. file name). */
  filename?: string
  /** Hide the copy button. Default false. */
  hideCopy?: boolean
}

/**
 * Syntax-highlighted code block with a copy-to-clipboard button.
 *
 * Uses `prism-react-renderer` (pure JS, RN-Web compatible) with a custom
 * theme tuned for OTF's dark palette. The button toggles to a checkmark
 * for 1.5s after a successful copy.
 */
export function CodeBlock({ code, language = 'tsx', filename, hideCopy = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch {
        /* ignore */
      }
    }
  }

  return (
    <YStack
      borderRadius={12}
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$backgroundStrong"
      overflow="hidden"
    >
      {filename ? (
        <XStack
          paddingHorizontal="$3"
          paddingVertical="$2"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
          backgroundColor="$background"
        >
          <View style={{ fontFamily: MONO, fontSize: 12, color: COLORS.muted }}>
            {filename}
          </View>
        </XStack>
      ) : null}
      <YStack position="relative">
        {!hideCopy ? (
          <Pressable
            onPress={onCopy}
            position="absolute"
            top={8}
            right={8}
            zIndex={2}
            width={28}
            height={28}
            borderRadius={6}
            borderWidth={1}
            borderColor="$borderColor"
            backgroundColor="$background"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            pressStyle={{ opacity: 0.7 }}
            hoverStyle={{ borderColor: '$color8' }}
          >
            {copied ? <Check size={14} color="$green10" /> : <Copy size={14} color="$color10" />}
          </Pressable>
        ) : null}
        <Highlight code={code.trim()} language={language} theme={OTF_PRISM_THEME}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                margin: 0,
                padding: '14px 16px',
                fontFamily: MONO,
                fontSize: 13,
                lineHeight: 1.55,
                overflow: 'auto',
                whiteSpace: 'pre',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, j) => (
                    <span key={j} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </YStack>
    </YStack>
  )
}

// ─── Constants ──────────────────────────────────────────────────────────────

const MONO =
  'ui-monospace, "SF Mono", "Menlo", "Monaco", "JetBrains Mono", "Fira Code", monospace'

const COLORS = {
  bg: 'transparent',
  text: '#e5e5e5',
  muted: '#888',
  comment: '#6a737d',
  keyword: '#ff79c6',
  string: '#a3e635',
  number: '#facc15',
  function: '#60a5fa',
  variable: '#e5e5e5',
  punctuation: '#888',
  tag: '#fb923c',
  attr: '#a78bfa',
  prop: '#a78bfa',
}

// Adapted from prism-react-renderer's "vsDark" / "github-dark" with hues
// rebalanced toward OTF's warm-orange accent. Prism token classifiers are
// surprisingly inconsistent across grammars — we cover the common ones.
const OTF_PRISM_THEME: PrismTheme = {
  ...themes.vsDark,
  plain: {
    color: COLORS.text,
    backgroundColor: COLORS.bg,
  },
  styles: [
    { types: ['comment', 'prolog', 'cdata'], style: { color: COLORS.comment, fontStyle: 'italic' } },
    { types: ['punctuation'], style: { color: COLORS.punctuation } },
    { types: ['namespace'], style: { opacity: 0.7 } },
    { types: ['property', 'tag', 'symbol', 'deleted'], style: { color: COLORS.tag } },
    { types: ['boolean', 'number', 'constant'], style: { color: COLORS.number } },
    { types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'], style: { color: COLORS.string } },
    { types: ['operator', 'entity', 'url'], style: { color: COLORS.text } },
    { types: ['atrule', 'attr-value', 'keyword'], style: { color: COLORS.keyword } },
    { types: ['function', 'class-name'], style: { color: COLORS.function } },
    { types: ['regex', 'important', 'variable'], style: { color: COLORS.variable } },
    { types: ['important', 'bold'], style: { fontWeight: 'bold' } },
    { types: ['italic'], style: { fontStyle: 'italic' } },
  ],
}
