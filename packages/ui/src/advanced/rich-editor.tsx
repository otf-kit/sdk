'use client'

import React from 'react'
import {
  Bold,
  Italic,
  Underline,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Table as TableIcon,
  Undo2,
  Redo2,
  Plus,
  Trash2,
  ArrowDownToLine,
  ArrowUpToLine,
  ArrowLeftToLine,
  ArrowRightToLine,
} from 'lucide-react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'

import { Button } from '../primitives/button'
import { Input } from '../primitives/input'
import { Separator } from '../primitives/separator'
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../primitives/tooltip'
import { cn } from '../utils/cn'

// ── Types ────────────────────────────────────────────────────────

export type RichEditorToolbarVariant = 'full' | 'minimal' | 'bubble'

export type RichEditorProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  /** Controlled HTML content. */
  value?: string
  /** Initial uncontrolled HTML content. */
  defaultValue?: string
  /** Fired (debounced 100ms) when the editor's HTML changes. */
  onChange?: (html: string) => void
  /** Placeholder shown when the document is empty. */
  placeholder?: string
  /** Default true. When false the toolbar is visually disabled and content read-only. */
  editable?: boolean
  /** Toolbar layout. Default 'full'. */
  toolbar?: RichEditorToolbarVariant
  /** Optional character cap. Shows a counter and clamps content via onUpdate. */
  maxLength?: number
}

// ── Toolbar button ───────────────────────────────────────────────

type ToolbarButtonProps = {
  onClick: () => void
  icon: React.ReactNode
  label: string
  shortcut?: string
  active?: boolean
  disabled?: boolean
  size?: 'icon' | 'sm'
}

function ToolbarButton({
  onClick,
  icon,
  label,
  shortcut,
  active,
  disabled,
  size = 'icon',
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size={size}
          onClick={onClick}
          disabled={disabled}
          aria-label={label}
          aria-pressed={active}
          className={cn(
            'shrink-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]',
            active &&
              'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]'
          )}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {label}
        {shortcut ? (
          <span className="ml-2 opacity-70">{shortcut}</span>
        ) : null}
      </TooltipContent>
    </Tooltip>
  )
}

// ── Link popover ─────────────────────────────────────────────────

function LinkPopover({ editor }: { editor: Editor }) {
  const [open, setOpen] = React.useState(false)
  const [url, setUrl] = React.useState('')
  const isActive = editor.isActive('link')

  React.useEffect(() => {
    if (!open) return
    const current = editor.getAttributes('link')?.href as string | undefined
    setUrl(current ?? '')
  }, [open, editor])

  const apply = () => {
    const href = url.trim()
    if (!href) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
    }
    setOpen(false)
  }

  const remove = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setUrl('')
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Link (⌘K)"
          aria-pressed={isActive}
          className={cn(
            'shrink-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]',
            isActive &&
              'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]'
          )}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 space-y-3" align="start">
        <div className="space-y-1.5">
          <label
            htmlFor="rich-editor-link-url"
            className="text-xs font-medium text-[hsl(var(--muted-foreground))]"
          >
            URL
          </label>
          <Input
            id="rich-editor-link-url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                apply()
              }
            }}
            autoFocus
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={remove}
            disabled={!isActive}
          >
            Remove link
          </Button>
          <Button type="button" size="sm" onClick={apply}>
            Add link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ── Table popover ────────────────────────────────────────────────

function TablePopover({ editor }: { editor: Editor }) {
  const inTable = editor.isActive('table')
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Table"
          className={cn(
            'shrink-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]',
            inTable &&
              'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]'
          )}
        >
          <TableIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1" align="start">
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
        >
          <Plus className="h-4 w-4" />
          Insert 3×3 table
        </button>
        <Separator className="my-1" />
        <button
          type="button"
          disabled={!inTable}
          onClick={() => editor.chain().focus().addRowBefore().run()}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] disabled:opacity-40"
        >
          <ArrowUpToLine className="h-4 w-4" />
          Add row above
        </button>
        <button
          type="button"
          disabled={!inTable}
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] disabled:opacity-40"
        >
          <ArrowDownToLine className="h-4 w-4" />
          Add row below
        </button>
        <button
          type="button"
          disabled={!inTable}
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] disabled:opacity-40"
        >
          <ArrowLeftToLine className="h-4 w-4" />
          Add column left
        </button>
        <button
          type="button"
          disabled={!inTable}
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] disabled:opacity-40"
        >
          <ArrowRightToLine className="h-4 w-4" />
          Add column right
        </button>
        <Separator className="my-1" />
        <button
          type="button"
          disabled={!inTable}
          onClick={() => editor.chain().focus().deleteRow().run()}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" />
          Delete row
        </button>
        <button
          type="button"
          disabled={!inTable}
          onClick={() => editor.chain().focus().deleteColumn().run()}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" />
          Delete column
        </button>
        <button
          type="button"
          disabled={!inTable}
          onClick={() => editor.chain().focus().deleteTable().run()}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive-foreground))] disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" />
          Delete table
        </button>
      </PopoverContent>
    </Popover>
  )
}

// ── Toolbars ─────────────────────────────────────────────────────

function FullToolbar({ editor }: { editor: Editor }) {
  return (
    <div
      className="flex flex-wrap items-center gap-0.5 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 p-1"
      role="toolbar"
      aria-label="Editor toolbar"
    >
      <ToolbarButton
        icon={<Heading1 className="h-4 w-4" />}
        label="Heading 1"
        shortcut="⌘⌥1"
        active={editor.isActive('heading', { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />
      <ToolbarButton
        icon={<Heading2 className="h-4 w-4" />}
        label="Heading 2"
        shortcut="⌘⌥2"
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <ToolbarButton
        icon={<Heading3 className="h-4 w-4" />}
        label="Heading 3"
        shortcut="⌘⌥3"
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <ToolbarButton
        icon={<Bold className="h-4 w-4" />}
        label="Bold"
        shortcut="⌘B"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        icon={<Italic className="h-4 w-4" />}
        label="Italic"
        shortcut="⌘I"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        icon={<Underline className="h-4 w-4" />}
        label="Underline"
        shortcut="⌘U"
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />
      <ToolbarButton
        icon={<Code className="h-4 w-4" />}
        label="Inline code"
        shortcut="⌘E"
        active={editor.isActive('code')}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <LinkPopover editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <ToolbarButton
        icon={<List className="h-4 w-4" />}
        label="Bullet list"
        shortcut="⌘⇧8"
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        icon={<ListOrdered className="h-4 w-4" />}
        label="Ordered list"
        shortcut="⌘⇧7"
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolbarButton
        icon={<Quote className="h-4 w-4" />}
        label="Blockquote"
        shortcut="⌘⇧B"
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <ToolbarButton
        icon={<Code2 className="h-4 w-4" />}
        label="Code block"
        shortcut="⌘⌥C"
        active={editor.isActive('codeBlock')}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />
      <TablePopover editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <ToolbarButton
        icon={<Undo2 className="h-4 w-4" />}
        label="Undo"
        shortcut="⌘Z"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      />
      <ToolbarButton
        icon={<Redo2 className="h-4 w-4" />}
        label="Redo"
        shortcut="⌘⇧Z"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      />
    </div>
  )
}

function MinimalToolbar({ editor }: { editor: Editor }) {
  return (
    <div
      className="flex items-center gap-0.5 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 p-1"
      role="toolbar"
      aria-label="Editor toolbar"
    >
      <ToolbarButton
        icon={<Bold className="h-4 w-4" />}
        label="Bold"
        shortcut="⌘B"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        icon={<Italic className="h-4 w-4" />}
        label="Italic"
        shortcut="⌘I"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <Separator orientation="vertical" className="mx-1 h-6" />
      <LinkPopover editor={editor} />
    </div>
  )
}

function BubbleToolbar({ editor }: { editor: Editor }) {
  return (
    <BubbleMenu
      editor={editor}
      options={{ placement: 'top' }}
      className="flex items-center gap-0.5 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--popover))] p-1 text-[hsl(var(--popover-foreground))] shadow-md"
    >
      <ToolbarButton
        icon={<Bold className="h-4 w-4" />}
        label="Bold"
        shortcut="⌘B"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        icon={<Italic className="h-4 w-4" />}
        label="Italic"
        shortcut="⌘I"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <LinkPopover editor={editor} />
      <ToolbarButton
        icon={<Code className="h-4 w-4" />}
        label="Inline code"
        shortcut="⌘E"
        active={editor.isActive('code')}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />
    </BubbleMenu>
  )
}

// ── Editor content styles ────────────────────────────────────────

const proseClasses = cn(
  'min-h-[200px] max-w-none p-4 text-sm leading-7 text-[hsl(var(--foreground))]',
  'focus:outline-none',
  // Headings
  '[&_h1]:mb-3 [&_h1]:mt-4 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight',
  '[&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight',
  '[&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold',
  // Paragraphs and inline
  '[&_p]:my-2 [&_p:first-child]:mt-0',
  '[&_strong]:font-semibold',
  '[&_em]:italic',
  '[&_u]:underline [&_u]:underline-offset-2',
  '[&_a]:text-[hsl(var(--primary))] [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:opacity-80',
  // Inline code
  '[&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:bg-[hsl(var(--muted))] [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-[0.85em]',
  // Lists
  '[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6',
  '[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6',
  '[&_li]:my-1 [&_li_p]:my-0',
  // Blockquote
  '[&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-[hsl(var(--border))] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[hsl(var(--muted-foreground))]',
  // Code block
  '[&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-[hsl(var(--muted))] [&_pre]:p-3',
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-mono [&_pre_code]:text-xs',
  // Tables
  '[&_table]:my-3 [&_table]:w-full [&_table]:table-fixed [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-md [&_table]:border [&_table]:border-[hsl(var(--border))]',
  '[&_th]:border [&_th]:border-[hsl(var(--border))] [&_th]:bg-[hsl(var(--muted))] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold',
  '[&_td]:border [&_td]:border-[hsl(var(--border))] [&_td]:px-3 [&_td]:py-2 [&_td]:align-top',
  // Tiptap placeholder (extension-placeholder emits is-editor-empty)
  '[&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:float-left [&_p.is-editor-empty:first-child]:before:h-0 [&_p.is-editor-empty:first-child]:before:text-[hsl(var(--muted-foreground))] [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]',
  // Selected cells in tables
  '[&_.selectedCell]:bg-[hsl(var(--accent))]/40',
)

// ── Component ────────────────────────────────────────────────────

export const RichEditor = React.forwardRef<HTMLDivElement, RichEditorProps>(
  function RichEditor(
    {
      value,
      defaultValue,
      onChange,
      placeholder = 'Write something...',
      editable = true,
      toolbar = 'full',
      maxLength,
      className,
      ...rest
    },
    ref
  ) {
    const isControlled = value !== undefined
    const initialContent = isControlled ? value ?? '' : defaultValue ?? ''

    const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const onChangeRef = React.useRef(onChange)
    React.useEffect(() => {
      onChangeRef.current = onChange
    }, [onChange])

    const [charCount, setCharCount] = React.useState(0)

    const editor = useEditor({
      editable,
      content: initialContent,
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: proseClasses,
          spellcheck: 'true',
        },
      },
      extensions: [
        StarterKit.configure({
          // StarterKit ships with all of these in v3 incl. underline.
          link: false,
        }),
        Link.configure({
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
        }),
        Placeholder.configure({ placeholder }),
        Typography,
        Table.configure({ resizable: false }),
        TableRow,
        TableHeader,
        TableCell,
      ],
      onUpdate: ({ editor: ed }) => {
        const size = ed.state.doc.textContent.length
        setCharCount(size)

        // Soft cap: trim trailing characters if we exceed maxLength.
        if (maxLength != null && size > maxLength) {
          const overflow = size - maxLength
          const end = ed.state.doc.content.size
          ed.commands.deleteRange({ from: end - overflow, to: end })
          return
        }

        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
          onChangeRef.current?.(ed.getHTML())
        }, 100)
      },
    })

    // Keep controlled value in sync.
    React.useEffect(() => {
      if (!editor || !isControlled) return
      const current = editor.getHTML()
      if ((value ?? '') !== current) {
        editor.commands.setContent(value ?? '', { emitUpdate: false })
      }
    }, [editor, isControlled, value])

    // Toggle editable state.
    React.useEffect(() => {
      if (!editor) return
      if (editor.isEditable !== editable) editor.setEditable(editable)
    }, [editor, editable])

    React.useEffect(() => {
      return () => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
      }
    }, [])

    if (!editor) {
      return (
        <div
          ref={ref}
          className={cn(
            'overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))]',
            className
          )}
          {...rest}
        >
          <div className="min-h-[200px] p-4 text-sm text-[hsl(var(--muted-foreground))]">
            {placeholder}
          </div>
        </div>
      )
    }

    const overLimit = maxLength != null && charCount >= maxLength
    const nearLimit =
      maxLength != null && charCount >= Math.floor(maxLength * 0.9)

    return (
      <TooltipProvider delayDuration={250}>
        <div
          ref={ref}
          className={cn(
            'overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]',
            'focus-within:ring-2 focus-within:ring-[hsl(var(--ring))]',
            !editable && 'opacity-90',
            className
          )}
          {...rest}
        >
          <div
            className={cn(
              !editable && 'pointer-events-none select-none opacity-60'
            )}
            aria-hidden={!editable || undefined}
          >
            {toolbar === 'full' ? <FullToolbar editor={editor} /> : null}
            {toolbar === 'minimal' ? <MinimalToolbar editor={editor} /> : null}
          </div>

          <EditorContent editor={editor} />

          {toolbar === 'bubble' && editable ? (
            <BubbleToolbar editor={editor} />
          ) : null}

          {maxLength != null ? (
            <div className="flex items-center justify-end border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-3 py-1.5">
              <span
                className={cn(
                  'font-mono text-xs tabular-nums text-[hsl(var(--muted-foreground))]',
                  nearLimit && 'text-[hsl(var(--foreground))]',
                  overLimit && 'text-[hsl(var(--destructive))]'
                )}
              >
                {charCount} / {maxLength}
              </span>
            </div>
          ) : null}
        </div>
      </TooltipProvider>
    )
  }
)

RichEditor.displayName = 'RichEditor'
