import React, { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { cn } from '../utils/cn'

export interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number
  onFiles?: (files: File[]) => void
  className?: string
  disabled?: boolean
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function filterBySize(files: File[], maxSize?: number) {
  return maxSize ? files.filter(f => f.size <= maxSize) : files
}

export function FileUpload({ accept, multiple, maxSize, onFiles, className, disabled }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function handleFiles(raw: FileList | null) {
    if (!raw) return
    const files = filterBySize(Array.from(raw), maxSize)
    onFiles?.(files)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    if (!disabled) handleFiles(e.dataTransfer.files)
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={e => e.key === 'Enter' && !disabled && inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); if (!disabled) setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-[hsl(var(--border))] p-8 text-center transition-colors cursor-pointer',
        dragging && 'border-[hsl(var(--primary))] bg-[hsl(var(--accent))]',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <Upload className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
      <div>
        <p className="text-sm font-medium">Drag files here or click to upload</p>
        {maxSize && <p className="text-xs text-[hsl(var(--muted-foreground))]">Max size: {formatBytes(maxSize)}</p>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
        disabled={disabled}
      />
    </div>
  )
}

export interface FileUploadPreviewProps {
  files: File[]
  onRemove: (index: number) => void
  className?: string
}

export function FileUploadPreview({ files, onRemove, className }: FileUploadPreviewProps) {
  if (!files.length) return null
  return (
    <ul className={cn('flex flex-col gap-1', className)}>
      {files.map((file, i) => (
        <li key={i} className="flex items-center justify-between rounded-md border border-[hsl(var(--border))] px-3 py-2 text-sm">
          <span className="min-w-0 truncate text-[hsl(var(--foreground))]">{file.name}</span>
          <div className="ml-2 flex shrink-0 items-center gap-2">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{formatBytes(file.size)}</span>
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
