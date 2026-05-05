import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RichEditor } from '@otfdashkit/ui'

const meta: Meta<typeof RichEditor> = {
  title: 'Advanced/RichEditor',
  component: RichEditor,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof RichEditor>

// ── Sample content ───────────────────────────────────────────────

const PREFILLED_HTML = `
<h1>Release notes — May 2026</h1>
<p>This week we shipped <strong>three improvements</strong> and one <em>experimental</em> feature. Read the full thread on
<a href="https://example.com/changelog">our changelog</a>.</p>
<h2>What's new</h2>
<ol>
  <li>Faster cold starts on the edge runtime.</li>
  <li>Support for <code>structuredClone</code> in workers.</li>
  <li>Inline previews for shared documents.</li>
</ol>
<h3>Benchmarks</h3>
<table>
  <thead>
    <tr><th>Region</th><th>p50 (ms)</th><th>p99 (ms)</th></tr>
  </thead>
  <tbody>
    <tr><td>iad1</td><td>42</td><td>118</td></tr>
    <tr><td>fra1</td><td>51</td><td>134</td></tr>
    <tr><td>syd1</td><td>67</td><td>189</td></tr>
  </tbody>
</table>
<blockquote>“The team has been heads-down on performance for six weeks straight.”</blockquote>
<pre><code>const editor = createEditor({ content: '&lt;p&gt;Hello&lt;/p&gt;' })</code></pre>
`.trim()

const SHORT_BUBBLE_HTML = `
<p>Select any of <strong>this text</strong> to see the floating <em>bubble menu</em> appear with quick formatting controls.</p>
<p>The bubble menu only shows when you have an active text selection — it stays out of your way the rest of the time.</p>
`.trim()

// ── Stories ──────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [html, setHtml] = useState('')
    return (
      <div className="mx-auto w-full max-w-2xl space-y-3">
        <RichEditor onChange={setHtml} />
        <details className="text-xs text-[hsl(var(--muted-foreground))]">
          <summary className="cursor-pointer select-none">View HTML output</summary>
          <pre className="mt-2 overflow-x-auto rounded-md bg-[hsl(var(--muted))] p-3 font-mono text-[11px]">
            {html || '<empty>'}
          </pre>
        </details>
      </div>
    )
  },
}

export const Minimal: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-xl">
      <RichEditor
        toolbar="minimal"
        defaultValue="<p>A <strong>minimal</strong> toolbar with just <em>bold</em>, <em>italic</em>, and link.</p>"
        placeholder="Add a quick note..."
      />
    </div>
  ),
}

export const Bubble: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl space-y-3">
      <p className="text-xs text-[hsl(var(--muted-foreground))]">
        Highlight any text to reveal the floating menu.
      </p>
      <RichEditor toolbar="bubble" defaultValue={SHORT_BUBBLE_HTML} />
    </div>
  ),
}

export const Prefilled: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-3xl">
      <RichEditor defaultValue={PREFILLED_HTML} />
    </div>
  ),
}

export const ReadOnly: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-3xl">
      <RichEditor editable={false} defaultValue={PREFILLED_HTML} />
    </div>
  ),
}

export const WithMaxLength: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-xl">
      <RichEditor
        toolbar="minimal"
        maxLength={300}
        placeholder="Up to 300 characters..."
        defaultValue="<p>This editor enforces a 300-character soft cap. The counter below highlights as you approach the limit and turns red when you hit it.</p>"
      />
    </div>
  ),
}
