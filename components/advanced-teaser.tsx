'use client'

import React, { useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Archive, Trash2, Tag, ChevronLeft, ChevronRight,
  Bell, Shield, CreditCard, Key, User,
} from 'lucide-react'
import {
  GradientHeading as GradientHeadingBase,
  AnimatedNumber as AnimatedNumberBase,
  Breadcrumb, BreadcrumbItem,
  HotkeyBadge, Hotkeys,
  DataList as DataListBase, DataListItem as DataListItemBase,
  FileCards as FileCardsBase,
  IntegrationCard,
  SortableTaskList,
  StackedLayoutTabs,
  BulkActions,
} from '@otf/ui'

// Type shims for forwardRef components that lose prop types through JS bundling
// (dist/index.d.ts is disabled in tsup due to name-clash — see tsup.config.ts)
type GHProps = { preset?: string; as?: string; direction?: string; animate?: boolean; className?: string; children?: React.ReactNode }
const GradientHeading = GradientHeadingBase as React.ComponentType<GHProps>

type ANProps = { value: number; prefix?: string; suffix?: string; decimals?: number; format?: boolean; duration?: number; className?: string; style?: React.CSSProperties }
const AnimatedNumber = AnimatedNumberBase as React.ComponentType<ANProps>

type DLProps = { className?: string; children?: React.ReactNode; divided?: boolean; bordered?: boolean }
const DataList = DataListBase as React.ComponentType<DLProps>

type DLIProps = { left?: React.ReactNode; title?: React.ReactNode; description?: React.ReactNode; right?: React.ReactNode; className?: string; key?: string; interactive?: boolean }
const DataListItem = DataListItemBase as React.ComponentType<DLIProps>

type FCProps = { files?: unknown[]; className?: string }
const FileCards = FileCardsBase as React.ComponentType<FCProps>

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const DARK_THEME = {
  '--background': '25 12% 8%',
  '--foreground': '35 15% 90%',
  '--card': '25 12% 10%',
  '--card-foreground': '35 15% 90%',
  '--popover': '25 12% 11%',
  '--popover-foreground': '35 15% 90%',
  '--primary': '25 95% 58%',
  '--primary-foreground': '0 0% 100%',
  '--secondary': '25 12% 15%',
  '--secondary-foreground': '35 15% 80%',
  '--muted': '25 12% 14%',
  '--muted-foreground': '25 10% 55%',
  '--accent': '25 12% 15%',
  '--accent-foreground': '25 95% 58%',
  '--destructive': '0 84% 60%',
  '--destructive-foreground': '0 0% 100%',
  '--border': '25 12% 18%',
  '--input': '25 12% 18%',
  '--ring': '25 95% 58%',
  '--radius': '0.5rem',
} as React.CSSProperties

function PreviewShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`w-full h-full bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#1f1f1f] ${className}`}
      style={DARK_THEME}
    >
      {children}
    </div>
  )
}

function ScaledPreview({
  scale,
  naturalHeight,
  children,
}: {
  scale: number
  naturalHeight: number
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${(100 / scale).toFixed(2)}%`,
        height: `${naturalHeight}px`,
        pointerEvents: 'none',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )
}

// ─── Slack / GitHub / Zapier brand icons ─────────────────────────────────────
function SlackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z"/>
      <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.527 2.527 0 012.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312z"/>
      <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.527 2.527 0 01-2.522 2.521h-2.522V8.834zm-1.27 0a2.527 2.527 0 01-2.522 2.521 2.527 2.527 0 01-2.521-2.521V2.522A2.528 2.528 0 0115.164 0a2.528 2.528 0 012.522 2.522v6.312z"/>
      <path fill="#ECB22E" d="M15.164 18.956a2.528 2.528 0 012.522 2.522A2.528 2.528 0 0115.164 24a2.527 2.527 0 01-2.521-2.522v-2.522h2.521zm0-1.27a2.527 2.527 0 01-2.521-2.521 2.527 2.527 0 012.521-2.521h6.312A2.528 2.528 0 0124 15.165a2.528 2.528 0 01-2.522 2.521h-6.314z"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white" width="100%" height="100%">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function ZapierIcon() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <circle cx="12" cy="12" r="12" fill="#FF4A00"/>
      <path
        d="M7.5 7.5 L16.5 7.5 L7.5 16.5 L16.5 16.5"
        stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Preview components ───────────────────────────────────────────────────────

function BentoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[9px] font-bold text-[#404040] uppercase tracking-[0.15em]">{children}</div>
  )
}

function GradientHeadingsPreview() {
  const PRESETS = [
    { preset: 'aurora' as const,  text: 'Beautiful by design.' },
    { preset: 'sunset' as const,  text: 'Ship faster than ever.' },
    { preset: 'cosmic' as const,  text: 'Built for teams.' },
    { preset: 'warm'   as const,  text: 'Dark mode native.' },
  ]
  return (
    <PreviewShell className="p-6">
      <div className="flex flex-col gap-3 justify-center h-full">
        {PRESETS.map(({ preset, text }) => (
          <GradientHeading
            key={preset}
            preset={preset}
            as="h3"
            direction="r"
            className="text-xl font-black leading-tight"
          >
            {text}
          </GradientHeading>
        ))}
      </div>
    </PreviewShell>
  )
}

function HotkeysPreview() {
  const shortcuts = [
    { label: 'Command palette', keys: ['⌘', 'K'] },
    { label: 'New document',    keys: ['⌘', 'N'] },
    { label: 'Toggle sidebar',  keys: ['⌘', 'B'] },
    { label: 'Quick search',    keys: ['⌘', '/'] },
    { label: 'Help',            keys: ['?']       },
    { label: 'Close',           keys: ['Esc']     },
  ]
  return (
    <PreviewShell className="p-5">
      <div className="flex flex-col h-full">
        <Breadcrumb className="mb-4">
          <BreadcrumbItem href="#" label="Dashboard" active={false} className="" />
          <BreadcrumbItem href="#" label="Settings" active={false} className="" />
          <BreadcrumbItem href="" label="Shortcuts" active className="" />
        </Breadcrumb>
        <div className="space-y-2.5">
          {shortcuts.map(({ label, keys }) => (
            <div key={label} className="flex items-center justify-between gap-4">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{label}</span>
              <Hotkeys keys={keys} className="" />
            </div>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-[hsl(var(--border))]">
          <div className="flex flex-wrap gap-1.5">
            {['ctrl', 'alt', 'shift', 'meta'].map(mod => (
              <HotkeyBadge key={mod} className="">{mod}</HotkeyBadge>
            ))}
          </div>
        </div>
      </div>
    </PreviewShell>
  )
}

function StackedTabsPreview({ cellHeight = 340 }: { cellHeight?: number }) {
  const PAD = 12
  const NATURAL_H = 600
  const scale = (cellHeight - PAD * 2) / NATURAL_H
  return (
    <PreviewShell className="p-3">
      <div className="w-full h-full rounded-xl overflow-hidden">
        <ScaledPreview scale={scale} naturalHeight={NATURAL_H}>
          <StackedLayoutTabs className="" children={undefined} />
        </ScaledPreview>
      </div>
    </PreviewShell>
  )
}

function IntegrationCardsPreview() {
  return (
    <PreviewShell className="p-4">
      <div className="flex flex-col gap-3 h-full overflow-hidden">
        <IntegrationCard
          icon={<div className="w-7 h-7"><SlackIcon /></div>}
          name="Slack"
          description="Send notifications to channels"
          connected
          className=""
        />
        <IntegrationCard
          icon={<div className="w-7 h-7 bg-[#24292e] rounded-full p-1"><GitHubIcon /></div>}
          name="GitHub"
          description="Sync issues and pull requests"
          connected={false}
          className=""
        />
        <IntegrationCard
          icon={<div className="w-7 h-7"><ZapierIcon /></div>}
          name="Zapier"
          description="Connect to 5,000+ apps"
          connected={false}
          className=""
        />
      </div>
    </PreviewShell>
  )
}

function SortableTaskListPreview({ cellHeight = 360 }: { cellHeight?: number }) {
  const PAD = 12
  const NATURAL_H = 380
  const scale = (cellHeight - PAD * 2) / NATURAL_H
  return (
    <PreviewShell className="p-3">
      <div className="w-full h-full rounded-xl overflow-hidden">
        <ScaledPreview scale={scale} naturalHeight={NATURAL_H}>
          <SortableTaskList className="rounded-none border-0" />
        </ScaledPreview>
      </div>
    </PreviewShell>
  )
}

function DataListPreview() {
  const rows = [
    { icon: <User className="h-4 w-4" />,    title: 'Profile',       description: 'Name, avatar, bio',     right: 'Edit' },
    { icon: <Bell className="h-4 w-4" />,    title: 'Notifications', description: 'Email & push alerts',   right: 'On'   },
    { icon: <Shield className="h-4 w-4" />,  title: 'Privacy',       description: 'Data & permissions',    right: 'Manage' },
    { icon: <Key className="h-4 w-4" />,     title: 'API Access',    description: 'Tokens & webhooks',     right: <span className="text-[10px] px-1.5 py-0.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">Pro</span> },
    { icon: <CreditCard className="h-4 w-4" />, title: 'Billing',    description: 'Subscription & usage',  right: 'Free' },
  ]
  return (
    <PreviewShell className="p-4">
      <div className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">
        Account settings
      </div>
      <DataList>
        {rows.map(r => (
          <DataListItem
            key={r.title}
            left={r.icon}
            title={r.title}
            description={r.description}
            right={<span className="text-xs text-[hsl(var(--muted-foreground))]">{r.right}</span>}
          />
        ))}
      </DataList>
    </PreviewShell>
  )
}

function AnimatedNumbersPreview() {
  const stats = [
    { value: 2400000, prefix: '$', suffix: '',  decimals: 0, format: true,  label: 'ARR', color: '#f97316' },
    { value: 18420,   prefix: '',  suffix: '',  decimals: 0, format: true,  label: 'Users', color: '#22d3ee' },
    { value: 94,      prefix: '',  suffix: '%', decimals: 0, format: false, label: 'Retention', color: '#a78bfa' },
    { value: 72,      prefix: '',  suffix: '',  decimals: 0, format: false, label: 'NPS', color: '#4ade80' },
  ]
  return (
    <PreviewShell>
      <div className="flex items-center justify-around h-full px-6">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-black tabular-nums leading-none" style={{ color: s.color }}>
              <AnimatedNumber
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
                format={s.format}
                duration={1800}
                className="text-3xl font-black"
                style={{ color: s.color }}
              />
            </div>
            <div className="text-[10px] font-bold text-[#404040] uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </PreviewShell>
  )
}

function FileCardsPreview({ cellHeight = 280 }: { cellHeight?: number }) {
  const PAD = 12
  const NATURAL_H = 360
  const scale = (cellHeight - PAD * 2) / NATURAL_H
  return (
    <PreviewShell className="p-3">
      <div className="w-full h-full rounded-xl overflow-hidden">
        <ScaledPreview scale={scale} naturalHeight={NATURAL_H}>
          <FileCards className="p-2" />
        </ScaledPreview>
      </div>
    </PreviewShell>
  )
}

function BulkActionsPreview({ cellHeight = 280 }: { cellHeight?: number }) {
  const PAD = 12
  const NATURAL_H = 320
  const scale = (cellHeight - PAD * 2) / NATURAL_H
  const mockRows = [
    { title: 'Redesign onboarding flow', selected: true  },
    { title: 'Fix authentication bug',   selected: true  },
    { title: 'Write API documentation',  selected: true  },
    { title: 'Add dark mode support',    selected: false },
    { title: 'Setup CI/CD pipeline',     selected: false },
  ]
  return (
    <PreviewShell className="p-3">
      <div className="w-full h-full rounded-xl overflow-hidden">
        <ScaledPreview scale={scale} naturalHeight={NATURAL_H}>
          {/* transform: scale creates a new fixed-position containing block */}
          <div className="relative bg-[hsl(var(--background))]" style={{ height: `${NATURAL_H}px` }}>
            <div className="p-4 space-y-1.5">
              <p className="text-[11px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">
                Tasks · 5 items
              </p>
              {mockRows.map((row, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-sm ${
                    row.selected
                      ? 'border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.07)]'
                      : 'border-[hsl(var(--border))]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                      row.selected
                        ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))]'
                        : 'border-[hsl(var(--border))]'
                    }`}
                  >
                    {row.selected && (
                      <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
                        <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <span className={`text-xs ${row.selected ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'}`}>
                    {row.title}
                  </span>
                </div>
              ))}
            </div>
            {/* Fixed within the transform context */}
            <BulkActions
              count={3}
              actions={[
                { label: 'Archive', icon: <Archive className="h-3 w-3" />, onClick: () => {} },
                { label: 'Delete',  icon: <Trash2 className="h-3 w-3" />,  onClick: () => {}, variant: 'destructive' },
                { label: 'Tag',     icon: <Tag className="h-3 w-3" />,     onClick: () => {} },
              ]}
              onClear={() => {}}
              className=""
            />
          </div>
        </ScaledPreview>
      </div>
    </PreviewShell>
  )
}

// ─── Mobile carousel slides ───────────────────────────────────────────────────

const MOBILE_SLIDES = [
  { label: 'Gradient Headings',  height: 280, node: <GradientHeadingsPreview /> },
  { label: 'Keyboard Shortcuts', height: 300, node: <HotkeysPreview /> },
  { label: 'Stacked Layout',     height: 360, node: <StackedTabsPreview cellHeight={360} /> },
  { label: 'Integrations',       height: 380, node: <IntegrationCardsPreview /> },
  { label: 'Task List',          height: 380, node: <SortableTaskListPreview cellHeight={380} /> },
  { label: 'Settings',           height: 360, node: <DataListPreview /> },
  { label: 'Live Stats',         height: 200, node: <AnimatedNumbersPreview /> },
  { label: 'File Cards',         height: 300, node: <FileCardsPreview cellHeight={300} /> },
  { label: 'Bulk Actions',       height: 300, node: <BulkActionsPreview cellHeight={300} /> },
]
const TOTAL_SLIDES = MOBILE_SLIDES.length

// ─── Section ──────────────────────────────────────────────────────────────────

export function AdvancedTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const goToSlide = useCallback((raw: number) => {
    const idx = Math.max(0, Math.min(TOTAL_SLIDES - 1, raw))
    if (!trackRef.current || !carouselRef.current) return
    gsap.to(trackRef.current, {
      x: -idx * carouselRef.current.offsetWidth,
      duration: 0.48,
      ease: 'power3.out',
    })
    setActiveSlide(idx)
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
    })
    tl.fromTo('.at-label',  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo('.at-title',  { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, '-=0.2')
      .fromTo('.at-sub',    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
      .fromTo('.at-stat',   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, '-=0.3')
      .fromTo('.at-cell',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5,  stagger: 0.07 }, '-=0.2')
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-28 border-t border-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="at-label inline-flex items-center gap-2 text-[11px] font-bold text-[#f97316] uppercase tracking-[0.18em] mb-5">
              <span className="w-4 h-px bg-[#f97316]/60" />
              Advanced Components
            </div>
            <h2 className="tracking-tighter leading-[1.0]">
              <span className="at-title block text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase">
                Every interaction,
              </span>
              <span className="at-title block text-4xl sm:text-5xl lg:text-6xl font-black text-[#404040] uppercase">
                crafted to delight.
              </span>
            </h2>
          </div>

          <div className="lg:text-right space-y-5 shrink-0">
            <p className="at-sub text-[#737373] text-sm leading-relaxed max-w-xs lg:ml-auto">
              Task lists, file managers, integrations, animated stats — production-ready, fully typed, zero config.
            </p>
            <div className="flex flex-wrap lg:justify-end gap-x-6 gap-y-3">
              {[
                { n: '40+', label: 'patterns' },
                { n: 'A11Y', label: 'accessible' },
                { n: '0',   label: 'config' },
                { n: 'GSAP', label: 'animated' },
              ].map(s => (
                <div key={s.label} className="at-stat text-center lg:text-right">
                  <div className="text-lg font-black text-white leading-none">{s.n}</div>
                  <div className="text-[9px] text-[#333] uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Desktop bento grid ──────────────────────────────────────────── */}
        <div className="hidden lg:grid grid-cols-3 gap-3">

          {/* Row 1: Gradient Headings (2col) + Hotkeys (1col) h-240 */}
          <div className="at-cell col-span-2 rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-1.5 h-full">
              <BentoLabel>Gradient Headings</BentoLabel>
              <div className="h-[240px]"><GradientHeadingsPreview /></div>
            </div>
          </div>
          <div className="at-cell col-span-1 rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-1.5 h-full">
              <BentoLabel>Breadcrumb + Hotkeys</BentoLabel>
              <div className="h-[240px]"><HotkeysPreview /></div>
            </div>
          </div>

          {/* Row 2: Stacked Layout Tabs (2col) + Integration Cards (1col) h-340 */}
          <div className="at-cell col-span-2 rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-1.5 h-full">
              <BentoLabel>Stacked Layout · Tabs</BentoLabel>
              <div className="h-[340px]"><StackedTabsPreview cellHeight={340} /></div>
            </div>
          </div>
          <div className="at-cell col-span-1 rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-1.5 h-full">
              <BentoLabel>Integration Cards</BentoLabel>
              <div className="h-[340px]"><IntegrationCardsPreview /></div>
            </div>
          </div>

          {/* Row 3: Task List (2col) + Data List settings (1col) h-360 */}
          <div className="at-cell col-span-2 rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-1.5 h-full">
              <BentoLabel>Sortable Task List</BentoLabel>
              <div className="h-[360px]"><SortableTaskListPreview cellHeight={360} /></div>
            </div>
          </div>
          <div className="at-cell col-span-1 rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-1.5 h-full">
              <BentoLabel>Data List · Settings</BentoLabel>
              <div className="h-[360px]"><DataListPreview /></div>
            </div>
          </div>

          {/* Row 4: Animated Numbers — full width h-180 */}
          <div className="at-cell col-span-3 rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-1.5 h-full">
              <BentoLabel>Animated Numbers</BentoLabel>
              <div className="h-[180px]"><AnimatedNumbersPreview /></div>
            </div>
          </div>

          {/* Row 5: File Cards (2col) + Bulk Actions (1col) h-280 */}
          <div className="at-cell col-span-2 rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-1.5 h-full">
              <BentoLabel>File Cards</BentoLabel>
              <div className="h-[280px]"><FileCardsPreview cellHeight={280} /></div>
            </div>
          </div>
          <div className="at-cell col-span-1 rounded-2xl overflow-hidden">
            <div className="flex flex-col gap-1.5 h-full">
              <BentoLabel>Bulk Actions</BentoLabel>
              <div className="h-[280px]"><BulkActionsPreview cellHeight={280} /></div>
            </div>
          </div>

        </div>

        {/* ── Mobile carousel ─────────────────────────────────────────────── */}
        <div className="lg:hidden">
          <div ref={carouselRef} className="relative overflow-hidden">
            <div
              ref={trackRef}
              className="flex"
              style={{ width: `${TOTAL_SLIDES * 100}%` }}
            >
              {MOBILE_SLIDES.map((slide, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2"
                  style={{ width: `${100 / TOTAL_SLIDES}%`, paddingRight: '0px' }}
                >
                  <BentoLabel>{slide.label}</BentoLabel>
                  <div style={{ height: `${slide.height}px` }}>{slide.node}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              {MOBILE_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeSlide ? 'w-6 bg-white' : 'w-1.5 bg-[#333]'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                ref={prevBtnRef}
                onClick={() => goToSlide(activeSlide - 1)}
                disabled={activeSlide === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a2a] text-[#737373] hover:text-white hover:border-[#404040] disabled:opacity-30 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                ref={nextBtnRef}
                onClick={() => goToSlide(activeSlide + 1)}
                disabled={activeSlide === TOTAL_SLIDES - 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a2a] text-[#737373] hover:text-white hover:border-[#404040] disabled:opacity-30 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
