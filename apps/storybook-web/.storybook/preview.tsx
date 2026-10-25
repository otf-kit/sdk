import React from 'react'
import type { Preview, Decorator } from '@storybook/react'
import { create } from 'storybook/internal/theming'
import { Title, Description, Subtitle, Canvas, DocsContext } from '@storybook/blocks'
import '../stories/globals.css'
import '../../../packages/ui/src/styles.css'
import '../../../packages/tokens/src/brand.css'
import './otf-theme.css'

type ThemeKey =
  | 'otf-dark'
  | 'otf-light'
  | 'linear-light'
  | 'linear-dark'
  | 'glass-light'
  | 'glass-dark'
  | 'midnight'
  | 'minimal-light'
  | 'minimal-dark'

const THEME_MAP: Record<ThemeKey, { className: string; label: string }> = {
  'otf-dark':      { className: 'theme-otf dark',          label: 'OTF Dark' },
  'otf-light':     { className: 'theme-otf light',         label: 'OTF Light' },
  'linear-light':  { className: 'theme-linear',            label: 'Linear Light' },
  'linear-dark':   { className: 'theme-linear dark',       label: 'Linear Dark' },
  'glass-light':   { className: 'theme-glass',             label: 'Glass Light' },
  'glass-dark':    { className: 'theme-glass dark',        label: 'Glass Dark' },
  'midnight':      { className: 'theme-midnight dark',     label: 'Midnight' },
  'minimal-light': { className: 'theme-minimal',           label: 'Minimal Light' },
  'minimal-dark':  { className: 'theme-minimal dark',      label: 'Minimal Dark' },
}

const DARK_THEMES: ThemeKey[] = ['otf-dark', 'minimal-dark', 'linear-dark', 'glass-dark', 'midnight']
const LIGHT_THEMES: ThemeKey[] = ['otf-light', 'minimal-light', 'linear-light', 'glass-light']

function isDarkTheme(key: ThemeKey) {
  return THEME_MAP[key].className.includes('dark')
}

function ThemeCard({ themeKey, children }: { themeKey: ThemeKey; children: React.ReactNode }) {
  const { className, label } = THEME_MAP[themeKey]
  return (
    <div
      className={className}
      style={{
        borderRadius: 10,
        border: '1px solid hsl(var(--border))',
        overflow: 'hidden',
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
      }}
    >
      <div
        style={{
          padding: '6px 12px',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          background: 'hsl(var(--muted))',
          color: 'hsl(var(--muted-foreground))',
          borderBottom: '1px solid hsl(var(--border))',
        }}
      >
        {label}
      </div>
      <div style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  )
}

function applyRootTheme(themeKey: ThemeKey | null) {
  if (typeof document === 'undefined') return
  if (themeKey === null) {
    document.documentElement.className = ''
    document.body.style.background = ''
    document.body.style.color = ''
    return
  }
  document.documentElement.className = THEME_MAP[themeKey].className
  document.body.style.background = 'hsl(var(--background))'
  document.body.style.color = 'hsl(var(--foreground))'
}

const withTheme: Decorator = (Story, context) => {
  const themeKey = (context.globals?.theme as ThemeKey | undefined) ?? 'otf-dark'
  const allThemes = context.globals?.allThemes === 'on'

  React.useEffect(() => {
    applyRootTheme(allThemes ? null : themeKey)
  }, [themeKey, allThemes])

  if (allThemes) {
    // Match the lane of the current theme: dark selected → show all darks,
    // light selected → show all lights. Avoids comparing apples to oranges.
    const lane = isDarkTheme(themeKey) ? DARK_THEMES : LIGHT_THEMES
    return (
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            opacity: 0.7,
            marginBottom: 12,
          }}
        >
          All {isDarkTheme(themeKey) ? 'dark' : 'light'} themes ({lane.length})
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: 16,
          }}
        >
          {lane.map(key => (
            <ThemeCard key={key} themeKey={key}>
              <Story />
            </ThemeCard>
          ))}
        </div>
      </div>
    )
  }

  const layout = (context.parameters?.layout as string | undefined) ?? 'centered'

  // Fullscreen stories (Backgrounds, Layouts) fill the entire iframe.
  // Padded stories get padding only. Centered (default) centers content.
  if (layout === 'fullscreen') return <Story />

  return (
    <ReportHeight
      style={{
        display: layout === 'centered' ? 'flex' : 'block',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 24,
        width: '100%',
      }}
    >
      <Story />
    </ReportHeight>
  )
}

// Posts the story's height to an embedding page (otf-kit.dev component pages) so its stage fits the story.
function ReportHeight({ style, children }: { style: React.CSSProperties; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const node = ref.current
    if (!node || window.parent === window || typeof ResizeObserver === 'undefined') return
    const post = () => window.parent.postMessage({ type: 'otf-story-height', height: node.getBoundingClientRect().height }, '*')
    const observer = new ResizeObserver(post)
    observer.observe(node)
    post()
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} style={style}>{children}</div>
}

/**
 * Custom Docs page — renders each story as a showcase frame with an
 * "Open in new tab" link instead of source/controls. Single-story URL
 * lets users interact with controls + view source in that dedicated view.
 */
function ShowcaseDocsPage() {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <p style={{ opacity: 0.7, fontSize: 13, marginTop: 0 }}>
        Each story below is an interactive preview. Click <b>Open ↗</b> to
        inspect controls, actions, and source in a dedicated tab.
      </p>
      <StoryShowcase />
    </>
  )
}

function StoryShowcase() {
  const ctx = React.useContext(DocsContext) as any
  const stories: any[] =
    typeof ctx?.componentStories === 'function' ? ctx.componentStories() : []
  if (!stories.length) return null
  return (
    <>
      {stories.map((story) => (
        <section key={story.id} style={{ marginTop: 28 }}>
          <header
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 10,
              paddingBottom: 8,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <h3 style={{ margin: 0, fontSize: 17, fontFamily: 'var(--otf-font-display)', fontWeight: 400, letterSpacing: '-0.03em', flex: 1 }}>
              {story.name}
            </h3>
            <a
              href={`/?path=/story/${story.id}`}
              target="_top"
              style={{
                fontSize: 12,
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#f0ede9', // the Docs page stays dark in every theme
                textDecoration: 'none',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              Open ↗
            </a>
          </header>
          <Canvas of={story.moduleExport ?? story} withToolbar={false} sourceState="none" />
        </section>
      ))}
    </>
  )
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'OTF theme + dark/light',
      defaultValue: 'otf-dark',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'otf-dark',      title: 'OTF Dark' },
          { value: 'otf-light',     title: 'OTF Light' },
          { value: 'minimal-dark',  title: 'Minimal Dark' },
          { value: 'minimal-light', title: 'Minimal Light' },
          { value: 'linear-dark',   title: 'Linear Dark' },
          { value: 'linear-light',  title: 'Linear Light' },
          { value: 'glass-dark',    title: 'Glass Dark' },
          { value: 'glass-light',   title: 'Glass Light' },
          { value: 'midnight',      title: 'Midnight' },
        ],
        dynamicTitle: true,
      },
    },
    allThemes: {
      name: 'All themes',
      description: 'Render the current story in every theme side-by-side',
      defaultValue: 'off',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'off', title: 'Single theme', icon: 'circle' },
          { value: 'on',  title: 'All themes',   icon: 'grid' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    docs: {
      theme: create({
        base: 'dark',
        appBg: '#0a0a0a',
        appContentBg: '#0a0a0a',
        appBorderColor: '#1f1f1f',
        textColor: '#f0ede9',
        textMutedColor: '#9e9e9e',
        fontBase: '"Inter", ui-sans-serif, system-ui, sans-serif',
        fontCode: '"Geist Mono", ui-monospace, monospace',
      }),
      page: ShowcaseDocsPage,
      // Hide "Show code" toggle on every story canvas — Docs is a showcase,
      // not a code reference. Users click "Open ↗" to inspect source.
      canvas: { sourceState: 'none', withToolbar: false },
      source: { type: 'code', excludeDecorators: true },
    },
  },
}

export default preview
