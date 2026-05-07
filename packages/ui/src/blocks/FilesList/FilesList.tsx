// @ts-nocheck
import React from 'react'
import { FileText, Image, FileCode, Film, Archive, MoreHorizontal, Download, Trash2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from '../../primitives/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '../../primitives/dropdown-menu'

interface FileItem { id: string; name: string; type: string; size: string; modified: string }

const FILES: FileItem[] = [
  { id: '1', name: 'design-system.fig', type: 'Figma', size: '14.2 MB', modified: 'Mar 12, 2024' },
  { id: '2', name: 'hero-banner.png', type: 'PNG Image', size: '3.8 MB', modified: 'Mar 11, 2024' },
  { id: '3', name: 'api-spec.yaml', type: 'YAML', size: '42 KB', modified: 'Mar 10, 2024' },
  { id: '4', name: 'demo-video.mp4', type: 'MP4 Video', size: '128 MB', modified: 'Mar 9, 2024' },
  { id: '5', name: 'assets.zip', type: 'ZIP Archive', size: '56 MB', modified: 'Mar 8, 2024' },
]

const TYPE_ICON: Record<string, React.ElementType> = {
  Figma: FileText, 'PNG Image': Image, YAML: FileCode, 'MP4 Video': Film, 'ZIP Archive': Archive,
}

function FileRow({ file, onDelete }: { file: FileItem; onDelete: () => void }) {
  const Icon = TYPE_ICON[file.type] ?? FileText
  return (
    <tr className="border-b border-[hsl(var(--border))] last:border-0 hover:bg-[hsl(var(--accent)/0.5)] transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Icon className="h-4 w-4 shrink-0 text-[hsl(var(--muted-foreground))]" />
          <span className="text-sm font-medium">{file.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">{file.type}</td>
      <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">{file.size}</td>
      <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">{file.modified}</td>
      <td className="px-4 py-3 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Download className="h-4 w-4" />Download</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-[hsl(var(--destructive))]">
              <Trash2 className="h-4 w-4" />Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}

export interface FilesListProps { className?: string }

export function FilesList({ className }: FilesListProps) {
  const [files, setFiles] = React.useState(FILES)
  return (
    <div className={cn('rounded-md border border-[hsl(var(--border))] overflow-hidden', className)}>
      <table className="w-full">
        <thead className="bg-[hsl(var(--muted)/0.5)]">
          <tr>{['Name', 'Type', 'Size', 'Modified', ''].map(h => (
            <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]">{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {files.map(f => <FileRow key={f.id} file={f} onDelete={() => setFiles(fs => fs.filter(x => x.id !== f.id))} />)}
        </tbody>
      </table>
    </div>
  )
}
