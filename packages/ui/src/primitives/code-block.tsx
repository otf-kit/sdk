import React from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../utils/cn'

// Languages bundled with the lazy shiki import. Keep this set tight — every
// extra language adds ~10-30KB to the lazy chunk.
const LANGS = ['tsx', 'ts', 'jsx', 'js', 'bash', 'css', 'json', 'yaml', 'markdown'] as const
const THEMES = { light: 'github-light', dark: 'github-dark' } as const

export type CodeBlockProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Source code to render. */
  code: string
  /** Highlight grammar. Must be in the bundled set. Default 'tsx'. */
  language?: (typeof LANGS)[number]
  /** Theme override. 'auto' (default) follows the closest `dark`/`light` ancestor class. */
  theme?: 'light' | 'dark' | 'auto'
  /** Show 1-indexed line numbers in a gutter. Default false. */
  showLineNumbers?: boolean
  /** 1-indexed line numbers to highlight (subtle row tint). Default []. */
  highlightLines?: number[]
  /** Optional caption rendered above the code (e.g. file name). */
  filename?: string
}

// Keep one highlighter instance alive across the page — shiki is expensive to boot.
let highlighterPromise: Promise<unknown> | null = null
async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then(({ createHighlighter }) =>
      createHighlighter({
        themes: [THEMES.light, THEMES.dark],
        langs: [...LANGS],
      }),
    )
  }
  return highlighterPromise
}

function detectTheme(node: HTMLElement | null): 'light' | 'dark' {
  if (!node || typeof window === 'undefined') return 'dark'
  let cur: HTMLElement | null = node
  while (cur) {
    if (cur.classList.contains('dark')) return 'dark'
    if (cur.classList.contains('light')) return 'light'
    cur = cur.parentElement
  }
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/**
 * Syntax-highlighted code block with copy-to-clipboard.
 * Uses `shiki` lazy-loaded on mount — first paint shows raw monospace, then upgrades.
 */
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code,
      language = 'tsx',
      theme = 'auto',
      showLineNumbers = false,
      highlightLines = [],
      filename,
      className,
      ...props
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [html, setHtml] = React.useState<string | null>(null)
    const [copied, setCopied] = React.useState(false)

    React.useEffect(() => {
      let cancelled = false
      getHighlighter().then((hl) => {
        if (cancelled) return
        const resolvedTheme: 'light' | 'dark' =
          theme === 'auto' ? detectTheme(containerRef.current) : theme
        const out = (hl as {
          codeToHtml: (
            code: string,
            opts: { lang: string; theme: string },
          ) => string
        }).codeToHtml(code, {
          lang: language,
          theme: THEMES[resolvedTheme],
        })
        setHtml(out)
      })
      return () => {
        cancelled = true
      }
    }, [code, language, theme])

    const onCopy = React.useCallback(async () => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch {
        /* ignore clipboard rejection */
      }
    }, [code])

    const lines = React.useMemo(() => code.split('\n'), [code])

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        className={cn(
          'group relative overflow-hidden rounded-lg border border-border bg-card text-sm',
          className,
        )}
        {...props}
      >
        {filename && (
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2 font-mono text-xs text-muted-foreground">
            <span>{filename}</span>
          </div>
        )}
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className={cn(
            'absolute right-3 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground backdrop-blur transition-colors',
            'hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
            filename ? 'top-12' : 'top-3',
          )}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
        <div className="relative overflow-x-auto">
          {html ? (
            <div
              className={cn(
                '[&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:p-4',
                showLineNumbers && '[&_code]:[counter-reset:line]',
                showLineNumbers &&
                  '[&_.line]:before:mr-4 [&_.line]:before:inline-block [&_.line]:before:w-6 [&_.line]:before:text-right [&_.line]:before:text-muted-foreground/50 [&_.line]:before:[counter-increment:line] [&_.line]:before:[content:counter(line)]',
              )}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <pre className="m-0 p-4 font-mono text-xs leading-relaxed text-foreground">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    'whitespace-pre',
                    highlightLines.includes(i + 1) && 'bg-primary/5',
                  )}
                >
                  {showLineNumbers && (
                    <span className="mr-4 inline-block w-6 select-none text-right text-muted-foreground/50">
                      {i + 1}
                    </span>
                  )}
                  {line || ' '}
                </div>
              ))}
            </pre>
          )}
        </div>
      </div>
    )
  },
)
CodeBlock.displayName = 'CodeBlock'
