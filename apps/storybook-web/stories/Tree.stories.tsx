import type { Meta, StoryObj } from '@storybook/react'
import { useMemo, useState } from 'react'
import { File, FolderClosed, FolderOpen } from 'lucide-react'
import { Tree, type TreeNode, type TreeMovePosition } from '@otf/ui'

const meta: Meta<typeof Tree> = {
  title: 'Data/Tree',
  component: Tree,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}
export default meta
type Story = StoryObj<typeof Tree>

// ── Helpers ──────────────────────────────────────────────────────

function withFolderIcons(nodes: TreeNode[], expanded: Set<string>): TreeNode[] {
  return nodes.map((n) => {
    const isFolder = !!n.children
    const icon = isFolder
      ? expanded.has(n.id)
        ? <FolderOpen className="h-3.5 w-3.5" strokeWidth={1.75} />
        : <FolderClosed className="h-3.5 w-3.5" strokeWidth={1.75} />
      : <File className="h-3.5 w-3.5" strokeWidth={1.75} />
    return {
      ...n,
      icon,
      children: n.children ? withFolderIcons(n.children, expanded) : undefined,
    }
  })
}

// ── File-explorer mock ──────────────────────────────────────────

const fileExplorerData: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'src/components',
        label: 'components',
        children: [
          { id: 'src/components/Button.tsx', label: 'Button.tsx' },
          { id: 'src/components/Card.tsx', label: 'Card.tsx' },
          { id: 'src/components/Modal.tsx', label: 'Modal.tsx' },
        ],
      },
      {
        id: 'src/hooks',
        label: 'hooks',
        children: [
          { id: 'src/hooks/useDebounce.ts', label: 'useDebounce.ts' },
          { id: 'src/hooks/useMedia.ts', label: 'useMedia.ts' },
        ],
      },
      { id: 'src/index.ts', label: 'index.ts' },
      { id: 'src/app.tsx', label: 'app.tsx' },
    ],
  },
  {
    id: 'public',
    label: 'public',
    children: [
      { id: 'public/favicon.svg', label: 'favicon.svg' },
      { id: 'public/logo.png', label: 'logo.png' },
    ],
  },
  { id: 'package.json', label: 'package.json' },
  { id: 'README.md', label: 'README.md' },
  { id: 'tsconfig.json', label: 'tsconfig.json' },
]

// ── Stories ──────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<string[]>(['src', 'src/components'])
    const data = useMemo(
      () => withFolderIcons(fileExplorerData, new Set(expanded)),
      [expanded]
    )
    return (
      <div className="max-w-sm rounded-lg border border-border bg-card p-2">
        <Tree
          data={data}
          expandedIds={expanded}
          onExpandedChange={setExpanded}
        />
      </div>
    )
  },
}

export const Selectable: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<string[]>(['src', 'src/components'])
    const [selectedId, setSelectedId] = useState<string | undefined>(
      'src/components/Button.tsx'
    )
    const data = useMemo(
      () => withFolderIcons(fileExplorerData, new Set(expanded)),
      [expanded]
    )
    return (
      <div className="flex flex-col gap-3">
        <div className="max-w-sm rounded-lg border border-border bg-card p-2">
          <Tree
            data={data}
            expandedIds={expanded}
            onExpandedChange={setExpanded}
            selectedId={selectedId}
            onSelect={(node) => setSelectedId(node.id)}
          />
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          selected: {selectedId ?? 'none'}
        </p>
      </div>
    )
  },
}

// ── Drag helpers ─────────────────────────────────────────────────

type Path = number[]

function findPath(nodes: TreeNode[], id: string, path: Path = []): Path | null {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
    if (n.id === id) return [...path, i]
    if (n.children) {
      const found = findPath(n.children, id, [...path, i])
      if (found) return found
    }
  }
  return null
}

function getNodeAt(nodes: TreeNode[], path: Path): TreeNode | null {
  let arr: TreeNode[] | undefined = nodes
  let node: TreeNode | null = null
  for (const i of path) {
    if (!arr || !arr[i]) return null
    node = arr[i]
    arr = node.children
  }
  return node
}

function isAncestor(parent: Path, maybeChild: Path): boolean {
  if (parent.length >= maybeChild.length) return false
  return parent.every((v, i) => v === maybeChild[i])
}

function removeAt(nodes: TreeNode[], path: Path): { tree: TreeNode[]; node: TreeNode } {
  const next = nodes.map((n) => ({ ...n, children: n.children ? [...n.children] : undefined }))
  let arr: TreeNode[] = next
  for (let i = 0; i < path.length - 1; i++) {
    const parent = arr[path[i]]
    parent.children = parent.children ? [...parent.children] : []
    arr = parent.children
  }
  const [node] = arr.splice(path[path.length - 1], 1)
  return { tree: next, node }
}

function insertAt(
  nodes: TreeNode[],
  parentPath: Path,
  index: number,
  node: TreeNode
): TreeNode[] {
  const next = nodes.map((n) => ({ ...n, children: n.children ? [...n.children] : undefined }))
  let arr: TreeNode[] = next
  for (const i of parentPath) {
    const parent = arr[i]
    parent.children = parent.children ? [...parent.children] : []
    arr = parent.children
  }
  arr.splice(index, 0, node)
  return next
}

function moveNode(
  tree: TreeNode[],
  sourceId: string,
  targetId: string,
  position: TreeMovePosition
): TreeNode[] {
  const sourcePath = findPath(tree, sourceId)
  const targetPath = findPath(tree, targetId)
  if (!sourcePath || !targetPath) return tree
  if (isAncestor(sourcePath, targetPath)) return tree // can't move into descendant

  // Remove source first
  const { tree: removed, node } = removeAt(tree, sourcePath)

  // Recompute target path because removal may have shifted indices
  const adjustedTargetPath = findPath(removed, targetId)
  if (!adjustedTargetPath) return tree

  if (position === 'inside') {
    const targetNode = getNodeAt(removed, adjustedTargetPath)
    if (!targetNode) return tree
    const childCount = targetNode.children?.length ?? 0
    return insertAt(removed, adjustedTargetPath, childCount, node)
  }

  const parentPath = adjustedTargetPath.slice(0, -1)
  const targetIndex = adjustedTargetPath[adjustedTargetPath.length - 1]
  const insertIndex = position === 'before' ? targetIndex : targetIndex + 1
  return insertAt(removed, parentPath, insertIndex, node)
}

export const Draggable: Story = {
  render: () => {
    const [tree, setTree] = useState<TreeNode[]>(fileExplorerData)
    const [expanded, setExpanded] = useState<string[]>(['src', 'src/components', 'public'])
    const data = useMemo(() => withFolderIcons(tree, new Set(expanded)), [tree, expanded])

    return (
      <div className="flex flex-col gap-3">
        <div className="max-w-sm rounded-lg border border-border bg-card p-2">
          <Tree
            data={data}
            expandedIds={expanded}
            onExpandedChange={setExpanded}
            onMove={(sourceId, targetId, position) => {
              setTree((current) => moveNode(current, sourceId, targetId, position))
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground max-w-sm">
          Drag a row onto another. Drop on the top edge for <em>before</em>, the bottom edge for{' '}
          <em>after</em>, or the middle for <em>inside</em>.
        </p>
      </div>
    )
  },
}

// ── Virtualized story ────────────────────────────────────────────

function buildLargeTree(): { tree: TreeNode[]; allIds: string[] } {
  // 5 levels deep, ~1000 nodes total.
  // Level fanouts: 5 → 5 → 4 → 5 → 2  =  5 + 25 + 100 + 500 + 1000 ≈ 1630, trim to ~1000.
  const allIds: string[] = []
  let count = 0
  const cap = 1000

  const make = (prefix: string, depth: number): TreeNode | null => {
    if (count >= cap) return null
    const id = prefix
    allIds.push(id)
    count++
    const fanouts = [5, 5, 4, 5, 2]
    if (depth >= 5) return { id, label: `node ${id}` }
    const fanout = fanouts[depth]
    const children: TreeNode[] = []
    for (let i = 0; i < fanout; i++) {
      const child = make(`${prefix}.${i + 1}`, depth + 1)
      if (child) children.push(child)
      if (count >= cap) break
    }
    return {
      id,
      label: `node ${id}`,
      children: children.length > 0 ? children : undefined,
    }
  }

  const tree: TreeNode[] = []
  for (let i = 0; i < 5; i++) {
    const root = make(String(i + 1), 1)
    if (root) tree.push(root)
    if (count >= cap) break
  }
  return { tree, allIds }
}

export const Virtualized: Story = {
  render: () => {
    const { tree, allIds } = useMemo(() => buildLargeTree(), [])
    // Expand everything so the flat list is large.
    const [expanded] = useState<string[]>(allIds)

    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">
          {allIds.length} nodes, all expanded, virtualized.
        </p>
        <div className="max-w-sm rounded-lg border border-border bg-card p-2">
          <Tree
            data={tree}
            expandedIds={expanded}
            virtualize
            estimatedRowHeight={28}
          />
        </div>
      </div>
    )
  },
}
