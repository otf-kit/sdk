import type { Meta, StoryObj } from '@storybook/react'
import { CodeBlock } from '@otf/ui'

const meta: Meta<typeof CodeBlock> = {
  title: 'Primitives/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof CodeBlock>

const TSX_SAMPLE = `import { Button } from '@otf/ui'

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 py-24">
      <h1 className="text-5xl font-semibold tracking-tight">
        Build apps from a forest of templates.
      </h1>
      <Button size="lg" variant="gradient">
        Get started →
      </Button>
    </section>
  )
}`

const BASH_SAMPLE = `# Install
bun add @otf/ui

# Tailwind: scan the lib for classes
content: ['./node_modules/@otf/ui/dist/**/*.{js,mjs}']

# Import the theme tokens
@import '@otf/ui/styles';`

const JSON_SAMPLE = `{
  "name": "@otf/ui",
  "version": "0.1.0",
  "exports": {
    ".": "./dist/index.mjs",
    "./styles": "./src/styles.css",
    "./themes/*": "./src/themes/*.css"
  }
}`

export const Default: Story = {
  render: () => <div className="max-w-2xl"><CodeBlock code={TSX_SAMPLE} language="tsx" /></div>,
}

export const WithFilename: Story = {
  render: () => (
    <div className="max-w-2xl">
      <CodeBlock code={TSX_SAMPLE} language="tsx" filename="components/Hero.tsx" />
    </div>
  ),
}

export const WithLineNumbers: Story = {
  render: () => (
    <div className="max-w-2xl">
      <CodeBlock code={TSX_SAMPLE} language="tsx" showLineNumbers />
    </div>
  ),
}

export const Highlighted: Story = {
  render: () => (
    <div className="max-w-2xl">
      <CodeBlock
        code={TSX_SAMPLE}
        language="tsx"
        highlightLines={[6, 7, 8]}
        showLineNumbers
      />
    </div>
  ),
}

export const Bash: Story = {
  render: () => (
    <div className="max-w-2xl">
      <CodeBlock code={BASH_SAMPLE} language="bash" filename="install.sh" />
    </div>
  ),
}

export const Json: Story = {
  render: () => (
    <div className="max-w-2xl">
      <CodeBlock code={JSON_SAMPLE} language="json" filename="package.json" />
    </div>
  ),
}
