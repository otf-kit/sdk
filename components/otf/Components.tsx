'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, Code2, Columns3, GanttChart, Image, KanbanSquare, ListTree, Mic, Palette, QrCode, Sparkles, Star, Table2, Tag, Video, ArrowUpRight } from 'lucide-react'

const components = [
  { slug: 'gantt',       name: 'Gantt',        desc: 'Project timeline visualizer with drag handles', Icon: GanttChart,   tag: 'New'     },
  { slug: 'kanban',      name: 'Kanban',        desc: 'Sortable, accessible kanban board',             Icon: KanbanSquare, tag: 'Popular' },
  { slug: 'code-block',  name: 'Code Block',    desc: 'Syntax highlighted code with copy',             Icon: Code2,        tag: 'Live'    },
  { slug: 'color-picker',name: 'Color Picker',  desc: 'Composable color picker with eye-dropper',      Icon: Palette                    },
  { slug: 'calendar',    name: 'Calendar',       desc: 'Full-featured event calendar',                  Icon: Calendar                   },
  { slug: 'data-table',  name: 'Data Table',     desc: 'Powerful data table with sort + filter',        Icon: Table2                     },
  { slug: 'tags',        name: 'Tags',           desc: 'Multi-select tag input',                        Icon: Tag                        },
  { slug: 'tree',        name: 'Tree',           desc: 'Recursive file tree component',                 Icon: ListTree                   },
  { slug: 'qr-code',    name: 'QR Code',        desc: 'Customizable QR code generator',                Icon: QrCode                     },
  { slug: 'video-player',name: 'Video Player',   desc: 'Custom controls + chapters',                    Icon: Video                      },
  { slug: 'image-crop',  name: 'Image Crop',     desc: 'Drag-to-crop image utility',                    Icon: Image                      },
  { slug: 'rating',      name: 'Rating',         desc: 'Star rating with half steps',                   Icon: Star,         tag: 'Live'  },
  { slug: 'comparison',  name: 'Comparison',     desc: 'Before / after image slider',                   Icon: Columns3                   },
  { slug: 'rich-editor', name: 'Rich Editor',    desc: 'Rich text editor on Tiptap',                    Icon: Mic,          tag: 'New'   },
  { slug: 'marquee',     name: 'Marquee',        desc: 'Infinite scrolling row',                        Icon: Sparkles,     tag: 'Live'  },
]

export function Components() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="components" className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.18]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">— Components</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Composable, not opinionated
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              180+ production-ready components built on Radix primitives. Drop them in, restyle them, own the code.
            </p>
          </div>
          <a href="/components" className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground">
            Browse all components
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div ref={gridRef} className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {components.map(({ slug, name, desc, Icon, tag }, i) => (
            <a key={name} href={`/components/${slug}`}
              className="group relative flex flex-col gap-4 overflow-hidden bg-card p-6 transition-all duration-300 hover:bg-secondary/40"
              style={{
                opacity:    visible ? 1 : 0,
                transform:  visible ? 'translateY(0)' : 'translateY(16px)',
                filter:     visible ? 'blur(0)' : 'blur(4px)',
                transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms, filter 600ms ease ${i * 50}ms, background-color 200ms ease`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden />
              <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 -translate-y-1 translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" strokeWidth={1.75} />

              <div className="flex items-start justify-between">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-foreground/30 group-hover:shadow-md">
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                  <div className="absolute inset-0 rounded-lg bg-accent/0 transition-colors duration-300 group-hover:bg-accent/5" />
                </div>
                {tag && (
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors group-hover:border-foreground/40 group-hover:text-foreground">
                    {tag}
                  </span>
                )}
              </div>
              <div className="relative">
                <h3 className="font-medium transition-transform duration-300 group-hover:translate-x-0.5">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
