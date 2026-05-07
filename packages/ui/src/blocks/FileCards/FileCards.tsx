// @ts-nocheck
import React from 'react'
import { FileText, Image, FileCode, Film, Archive, File } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Card, CardContent } from '../../primitives/card'

interface FileItem { id: string; name: string; type: string; size: string; modified: string }

const FILES: FileItem[] = [
  { id: '1', name: 'design-system.fig', type: 'figma', size: '14.2 MB', modified: 'Mar 12' },
  { id: '2', name: 'hero-banner.png', type: 'image', size: '3.8 MB', modified: 'Mar 11' },
  { id: '3', name: 'api-spec.yaml', type: 'code', size: '42 KB', modified: 'Mar 10' },
  { id: '4', name: 'demo-video.mp4', type: 'video', size: '128 MB', modified: 'Mar 9' },
  { id: '5', name: 'assets.zip', type: 'archive', size: '56 MB', modified: 'Mar 8' },
  { id: '6', name: 'meeting-notes.pdf', type: 'pdf', size: '1.1 MB', modified: 'Mar 7' },
]

const TYPE_ICON: Record<string, React.ElementType> = {
  figma: FileText, image: Image, code: FileCode, video: Film, archive: Archive, pdf: FileText,
}

const TYPE_COLOR: Record<string, string> = {
  figma: 'text-purple-500', image: 'text-green-500', code: 'text-blue-500',
  video: 'text-red-500', archive: 'text-yellow-500', pdf: 'text-orange-500',
}

function FileCard({ file }: { file: FileItem }) {
  const Icon = TYPE_ICON[file.type] ?? File
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-md bg-[hsl(var(--muted))] mb-3', TYPE_COLOR[file.type])}>
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium truncate">{file.name}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{file.size}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{file.modified}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export interface FileCardsProps {
  files?: FileItem[]
  className?: string
}

export function FileCards({ files = FILES, className }: FileCardsProps) {
  return (
    <div className={cn('grid gap-3', className)} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,160px),1fr))' }}>
      {files.map(f => <FileCard key={f.id} file={f} />)}
    </div>
  )
}
