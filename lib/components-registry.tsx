import React, { type CSSProperties } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ComponentCategory =
  | 'Primitives'
  | 'Data Display'
  | 'Navigation'
  | 'Feedback'
  | 'Layout'
  | 'Forms'
  | 'Blocks'
  | 'Charts'

export interface ComponentDef {
  name: string
  description: string
  category: ComponentCategory
  tags: string[]
  preview: React.ReactNode
}

// ─── Minimal-dark HSL tokens (same as component-teaser + storybook preview) ──
const THEME: CSSProperties = {
  '--background':            '25 12% 8%',
  '--foreground':            '35 15% 90%',
  '--card':                  '25 12% 10%',
  '--card-foreground':       '35 15% 90%',
  '--secondary':             '25 12% 15%',
  '--secondary-foreground':  '35 15% 80%',
  '--muted':                 '25 12% 14%',
  '--muted-foreground':      '25 10% 55%',
  '--border':                '25 12% 18%',
  '--primary':               '25 95% 58%',
  '--primary-foreground':    '0 0% 100%',
  '--destructive':           '0 84% 60%',
  '--destructive-foreground':'0 0% 100%',
  '--radius':                '0.5rem',
  // ── Chart / semantic accent tokens ─────────────────────────────────────────
  // Matches what each theme defines; minimal-dark uses these defaults.
  // green=done/success  blue=info/todo  amber=warning/in-progress  purple=accent
  '--chart-1': '25 95% 58%',   // orange  (= primary)
  '--chart-2': '142 71% 45%',  // green   success / done
  '--chart-3': '217 91% 60%',  // blue    info / todo
  '--chart-4': '38 92% 50%',   // amber   warning / in-progress
  '--chart-5': '280 65% 60%',  // purple  accent / special
} as CSSProperties

// ─── Font references — Next.js loads these as CSS vars on <html> in layout.tsx
// layout.tsx: Inter → --font-geist, JetBrains Mono → --font-geist-mono
// --font-geist  (Inter, loaded with variable: '--font-geist')
// --font-geist-mono (JetBrains Mono, loaded with variable: '--font-geist-mono')
const FONT_SANS = 'var(--font-geist, var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif)'
const FONT_MONO = 'var(--font-geist-mono, "JetBrains Mono", "Fira Code", ui-monospace, monospace)'

// Inject font vars into the THEME so Tailwind's font-mono / font-sans utilities resolve correctly
;(THEME as Record<string, string>)['--font-mono'] = FONT_MONO
;(THEME as Record<string, string>)['--font-sans'] = FONT_SANS

// ─── Preview shell ────────────────────────────────────────────────────────────
function PreviewShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center p-5 ${className}`}
      style={{
        ...THEME,
        background: 'hsl(var(--background))',
        fontFamily: FONT_SANS,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      {children}
    </div>
  )
}

// Shorthand vars for inline styles
const bg    = 'hsl(var(--background))'
const card  = 'hsl(var(--card))'
const sec   = 'hsl(var(--secondary))'
const muted = 'hsl(var(--muted))'
const bdr   = 'hsl(var(--border))'
const fg    = 'hsl(var(--foreground))'
const mfg   = 'hsl(var(--muted-foreground))'
const pri   = 'hsl(var(--primary))'
const err   = 'hsl(var(--destructive))'
// Chart / semantic colors — come from theme, NOT hardcoded
const c1    = 'hsl(var(--chart-1))'  // orange (primary)
const c2    = 'hsl(var(--chart-2))'  // green  (success / done)
const c3    = 'hsl(var(--chart-3))'  // blue   (info / todo)
const c4    = 'hsl(var(--chart-4))'  // amber  (warning / in-progress)
const c5    = 'hsl(var(--chart-5))'  // purple (accent / special)

// ─── Primitives ───────────────────────────────────────────────────────────────

const ButtonPreview = () => (
  <PreviewShell>
    <div className="flex flex-wrap gap-2 justify-center">
      <button style={{ background: fg, color: bg }} className="px-4 py-2 text-xs font-bold rounded-md">Primary</button>
      <button style={{ background: pri, color: 'hsl(var(--primary-foreground))' }} className="px-4 py-2 text-xs font-bold rounded-md shadow-sm">Gradient</button>
      <button style={{ border: `1px solid ${bdr}`, color: fg }} className="px-4 py-2 text-xs font-medium rounded-md">Ghost</button>
      <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium rounded-md">Danger</button>
      <button style={{ background: card, border: `1px solid ${bdr}`, color: mfg }} className="px-4 py-2 text-xs rounded-md opacity-50 cursor-not-allowed">Disabled</button>
      <button style={{ background: fg, color: bg }} className="px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full border-2 border-current opacity-50 border-t-transparent animate-spin" />
        Loading
      </button>
    </div>
  </PreviewShell>
)

const InputPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] space-y-2.5">
      <div style={{ background: card, border: `1px solid ${bdr}` }} className="h-9 rounded-md px-3 flex items-center text-xs">
        <span style={{ color: mfg }}>Search components…</span>
      </div>
      <div style={{ background: card, border: `1px solid ${pri}40`, boxShadow: `0 0 0 1px ${pri}20` }} className="h-9 rounded-md px-3 flex items-center justify-between">
        <span className="text-xs" style={{ color: fg }}>dave@otf.sh</span>
        <svg className="w-3 h-3" style={{ color: pri }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
      </div>
      <div className="h-9 bg-red-500/10 border border-red-500/30 rounded-md px-3 flex items-center">
        <span className="text-xs text-red-400">Invalid email address</span>
      </div>
    </div>
  </PreviewShell>
)

const BadgePreview = () => (
  <PreviewShell>
    <div className="flex flex-wrap gap-2 justify-center">
      {[
        { label: 'New',    bg: pri,              color: 'hsl(var(--primary-foreground))' },
        { label: 'Beta',   bg: `${c3}1a`,  color: c3, border: `${c3}33` },
        { label: 'Done',   bg: `${c2}1a`,   color: c2, border: `${c2}33` },
        { label: 'Urgent', bg: `${err}1a`,   color: err, border: `${err}33` },
        { label: 'Draft',  bg: card,             color: mfg,   border: bdr },
        { label: 'Pro',    bg: `${c5}1a`, color: c5, border: 'rgba(167,139,250,0.2)' },
      ].map(b => (
        <span key={b.label} className="text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide"
          style={{ background: b.bg, color: b.color, border: `1px solid ${b.border ?? 'transparent'}` }}>
          {b.label}
        </span>
      ))}
    </div>
  </PreviewShell>
)

const AvatarPreview = () => (
  <PreviewShell>
    <div className="flex flex-col items-center gap-4">
      <div className="flex -space-x-3">
        {[
          { initials: 'MS', bg: pri },
          { initials: 'KL', bg: c3 },
          { initials: 'AR', bg: c5 },
          { initials: 'JD', bg: c2 },
          { initials: '+4', bg: sec },
        ].map((a) => (
          <div key={a.initials}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{ background: a.bg, color: 'white', border: `2px solid ${bg}` }}>
            {a.initials}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: pri, color: 'hsl(var(--primary-foreground))' }}>M</div>
        <div>
          <div className="text-xs font-semibold" style={{ color: fg }}>Dave Soni</div>
          <div className="text-[10px]" style={{ color: mfg }}>Admin · dave@otf.sh</div>
        </div>
      </div>
    </div>
  </PreviewShell>
)

const DialogPreview = () => (
  <PreviewShell>
    <div className="relative w-full max-w-[240px]">
      <div className="relative rounded-lg p-[2px]" style={{ background: `linear-gradient(to bottom, ${sec}, ${card})`, border: `1px solid ${bdr}` }}>
        <div className="rounded-[7px]" style={{ background: card, padding: '1rem' }}>
          <div className="text-xs font-bold mb-1" style={{ color: fg }}>Delete workspace</div>
          <div className="text-[10px] mb-4 leading-relaxed" style={{ color: mfg }}>This action cannot be undone. All data will be permanently removed.</div>
          <div className="flex gap-2">
            <button className="flex-1 h-7 rounded text-[10px]" style={{ border: `1px solid ${bdr}`, color: mfg }}>Cancel</button>
            <button className="flex-1 h-7 bg-red-500 rounded text-[10px] text-white font-bold">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </PreviewShell>
)

const SelectPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[200px] space-y-2">
      <div className="h-9 rounded-md px-3 flex items-center justify-between text-xs" style={{ background: card, border: `1px solid ${bdr}` }}>
        <span style={{ color: fg }}>In Progress</span>
        <svg className="w-3 h-3" style={{ color: mfg }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </div>
      <div className="rounded-md overflow-hidden" style={{ background: card, border: `1px solid ${bdr}` }}>
        {['Backlog', 'Todo', 'In Progress', 'Done', 'Cancelled'].map((s, i) => (
          <div key={s} className="px-3 py-1.5 text-xs flex items-center gap-2"
            style={{ background: i === 2 ? `${pri}15` : 'transparent', color: i === 2 ? pri : mfg }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: ['#6b7280',c3,c4,c2,err][i] }} />
            {s}
          </div>
        ))}
      </div>
    </div>
  </PreviewShell>
)

const TooltipPreview = () => (
  <PreviewShell>
    <div className="flex gap-6 items-center">
      {[
        { dir: 'top',   label: 'Top',   xCls: 'left-1/2 -translate-x-1/2', yCls: 'bottom-full mb-2' },
        { dir: 'right', label: 'Right', xCls: 'left-full ml-2',             yCls: 'top-1/2 -translate-y-1/2' },
      ].map(t => (
        <div key={t.dir} className="relative">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-xs" style={{ background: sec, border: `1px solid ${bdr}`, color: mfg }}>?</button>
          <div className={`absolute ${t.xCls} ${t.yCls} text-[10px] px-2.5 py-1.5 rounded-md whitespace-nowrap z-10 shadow-xl`}
            style={{ background: sec, border: `1px solid ${bdr}`, color: fg }}>
            {t.label} tooltip
            <div className="absolute w-1.5 h-1.5 rotate-45"
              style={{
                background: sec, borderRight: `1px solid ${bdr}`, borderBottom: `1px solid ${bdr}`,
                ...(t.dir === 'top' ? { bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' } : { left: '-4px', top: '50%', transform: 'translateY(-50%) rotate(135deg)' })
              }} />
          </div>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const CheckboxPreview = () => (
  <PreviewShell>
    <div className="space-y-3 w-full max-w-[180px]">
      {[
        { label: 'Animations', checked: true },
        { label: 'Dark mode',  checked: true },
        { label: 'TypeScript', checked: false },
        { label: 'Radix UI',   checked: false },
      ].map(item => (
        <label key={item.label} className="flex items-center gap-3 cursor-pointer">
          <div className="w-4 h-4 rounded flex items-center justify-center border flex-shrink-0"
            style={{ background: item.checked ? pri : card, borderColor: item.checked ? pri : bdr }}>
            {item.checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
          </div>
          <span className="text-xs" style={{ color: item.checked ? fg : mfg }}>{item.label}</span>
        </label>
      ))}
    </div>
  </PreviewShell>
)

const TabsPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[240px]">
      <div className="flex mb-4" style={{ borderBottom: `1px solid ${bdr}` }}>
        {['Overview', 'Issues', 'Files'].map((t, i) => (
          <button key={t} className="px-3 py-2 text-xs font-medium border-b-2 transition-colors"
            style={{ borderColor: i === 0 ? pri : 'transparent', color: i === 0 ? fg : mfg }}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-2 rounded w-3/4" style={{ background: sec }} />
        <div className="h-2 rounded w-full" style={{ background: muted }} />
        <div className="h-2 rounded w-1/2" style={{ background: muted }} />
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="h-12 rounded-md flex items-center justify-center" style={{ background: card, border: `1px solid ${bdr}` }}>
            <span className="text-sm font-black" style={{ color: fg }}>50</span>
          </div>
          <div className="h-12 rounded-md flex items-center justify-center" style={{ background: card, border: `1px solid ${bdr}` }}>
            <span className="text-sm font-black" style={{ color: pri }}>12</span>
          </div>
        </div>
      </div>
    </div>
  </PreviewShell>
)

const SliderPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] space-y-5">
      {[
        { val: 65, color: pri,       label: 'Volume' },
        { val: 40, color: c3, label: 'Bass' },
        { val: 80, color: c2, label: 'Treble' },
      ].map(s => (
        <div key={s.label}>
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px]" style={{ color: mfg }}>{s.label}</span>
            <span className="text-[10px] font-mono" style={{ color: s.color }}>{s.val}%</span>
          </div>
          <div className="relative h-1.5 rounded-full" style={{ background: muted }}>
            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${s.val}%`, background: s.color }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 shadow-md" style={{ left: `calc(${s.val}% - 7px)`, borderColor: s.color }} />
          </div>
        </div>
      ))}
    </div>
  </PreviewShell>
)

// ─── Data Display ─────────────────────────────────────────────────────────────

const DataGridPreview = () => {
  const rows = [
    { id: '#101', title: 'Auth guards',    status: 'Done',        priority: 'High',   sc: c2, pc: pri },
    { id: '#102', title: 'Build DataGrid', status: 'In Progress', priority: 'Urgent', sc: c4, pc: err },
    { id: '#103', title: 'Polish hero',    status: 'Todo',        priority: 'Medium', sc: c3, pc: c4 },
    { id: '#104', title: 'AI prompts',     status: 'Backlog',     priority: 'Low',    sc: mfg,       pc: mfg },
  ]
  return (
    <PreviewShell>
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold" style={{ color: fg }}>Issues</span>
          <div className="flex gap-1.5">
            <span className="text-[9px] rounded px-2 py-0.5" style={{ border: `1px solid ${bdr}`, color: mfg }}>Filter</span>
            <span className="text-[9px] rounded px-2 py-0.5 font-bold" style={{ background: pri, color: 'white' }}>+ New</span>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${bdr}` }}>
          {rows.map((r, i) => (
            <div key={r.id} className="flex items-center gap-3 px-3 py-2 text-[10px]"
              style={{ borderBottom: i < rows.length - 1 ? `1px solid ${bdr}50` : 'none', background: 'transparent' }}>
              <span className="font-mono w-10 shrink-0" style={{ color: mfg }}>{r.id}</span>
              <span className="flex-1 truncate" style={{ color: fg }}>{r.title}</span>
              <span className="shrink-0" style={{ color: r.sc }}>{r.status}</span>
              <span className="shrink-0" style={{ color: r.pc }}>{r.priority}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewShell>
  )
}

const TimelinePreview = () => (
  <PreviewShell>
    <div className="space-y-3 w-full max-w-[220px]">
      {[
        { label: 'Issue created',        time: '2m ago',  color: pri },
        { label: 'Assigned to Dave',     time: '5m ago',  color: c3 },
        { label: 'Status → In Progress', time: '12m ago', color: c4 },
        { label: 'Commented on issue',   time: '1h ago',  color: mfg },
      ].map((item, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{ background: `${item.color}20`, border: `1px solid ${item.color}40`, color: item.color }}>
              {['+','→','↻','·'][i]}
            </div>
            {i < 3 && <div className="w-px flex-1 mt-1" style={{ background: `${item.color}20` }} />}
          </div>
          <div className="pb-2">
            <div className="text-[10px] font-medium" style={{ color: fg }}>{item.label}</div>
            <div className="text-[9px]" style={{ color: mfg }}>{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const MetricCardPreview = () => (
  <PreviewShell>
    <div className="grid grid-cols-2 gap-2 w-full max-w-[220px]">
      {[
        { label: 'MRR',    value: '$4,820', trend: '+18%', tc: c2 },
        { label: 'Users',  value: '1,240',  trend: '+7%',  tc: pri },
        { label: 'Churn',  value: '2.1%',   trend: '-0.4%',tc: c2 },
        { label: 'Issues', value: '50',      trend: '+12%', tc: c3 },
      ].map(m => (
        <div key={m.label} className="rounded-lg p-3" style={{ background: card, border: `1px solid ${bdr}` }}>
          <div className="text-[8px] uppercase tracking-wider mb-1" style={{ color: mfg }}>{m.label}</div>
          <div className="text-sm font-black leading-none" style={{ color: fg }}>{m.value}</div>
          <div className="text-[8px] mt-1 font-semibold" style={{ color: m.tc }}>{m.trend}</div>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const ProgressPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] space-y-4">
      {[
        { label: 'Sprint 4',   val: 72, color: pri },
        { label: 'Q2 Goals',   val: 45, color: c3 },
        { label: 'Onboarding', val: 90, color: c2 },
      ].map(p => (
        <div key={p.label}>
          <div className="flex justify-between text-[10px] mb-1.5">
            <span style={{ color: mfg }}>{p.label}</span>
            <span className="font-mono" style={{ color: p.color }}>{p.val}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: muted }}>
            <div className="h-full rounded-full" style={{ width: `${p.val}%`, background: `linear-gradient(to right, ${p.color}80, ${p.color})` }} />
          </div>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const KanbanPreview = () => {
  const cols = [
    { label: 'Todo',        color: c3, count: 3 },
    { label: 'In Progress', color: c4, count: 2 },
    { label: 'Done',        color: c2, count: 5 },
  ]
  return (
    <PreviewShell>
      <div className="flex gap-2 w-full">
        {cols.map(col => (
          <div key={col.label} className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: col.color }} />
              <span className="text-[9px] font-medium truncate" style={{ color: mfg }}>{col.label}</span>
              <span className="text-[9px] ml-auto" style={{ color: `${mfg}80` }}>{col.count}</span>
            </div>
            <div className="space-y-1.5">
              {Array.from({ length: Math.min(col.count, 3) }).map((_, i) => (
                <div key={i} className="rounded p-2" style={{ background: card, border: `1px solid ${bdr}` }}>
                  <div className="h-1 rounded w-full mb-1" style={{ background: sec }} />
                  <div className="h-1 rounded w-2/3" style={{ background: muted }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PreviewShell>
  )
}

const TextureCardPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] rounded-xl p-[2px]" style={{ background: `linear-gradient(to bottom, ${sec}, ${card})`, border: `1px solid ${bdr}` }}>
      <div className="rounded-[9px] p-[2px]" style={{ border: `1px solid ${bdr}40` }}>
        <div className="rounded-[7px] p-4" style={{ background: card }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${pri}20`, border: `1px solid ${pri}30` }}>
              <span className="text-xs font-bold" style={{ color: pri }}>M</span>
            </div>
            <div>
              <div className="text-xs font-semibold" style={{ color: fg }}>Dave Soni</div>
              <div className="text-[9px]" style={{ color: mfg }}>Admin</div>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 rounded w-full" style={{ background: sec }} />
            <div className="h-1.5 rounded w-3/4" style={{ background: muted }} />
            <div className="h-1.5 rounded w-1/2" style={{ background: muted }} />
          </div>
        </div>
      </div>
    </div>
  </PreviewShell>
)

// ─── Navigation ───────────────────────────────────────────────────────────────

const SidebarPreview = () => (
  <PreviewShell>
    <div className="flex h-40 w-full max-w-[220px] rounded-xl overflow-hidden" style={{ border: `1px solid ${bdr}` }}>
      <div className="w-[120px] shrink-0 flex flex-col" style={{ background: card, borderRight: `1px solid ${bdr}` }}>
        <div className="h-10 flex items-center px-2.5 gap-2" style={{ borderBottom: `1px solid ${bdr}` }}>
          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: pri }}>
            <span className="text-white text-[8px] font-black">O</span>
          </div>
          <span className="text-[10px] font-bold" style={{ color: fg }}>OTF</span>
        </div>
        <div className="flex-1 p-1.5 space-y-0.5">
          {[{ l: 'Dashboard', a: true }, { l: 'Issues' }, { l: 'Projects' }, { l: 'Teams' }].map(item => (
            <div key={item.l} className="flex items-center gap-1.5 px-2 py-1.5 rounded text-[9px]"
              style={{ background: item.a ? `${pri}15` : 'transparent', color: item.a ? pri : mfg, borderLeft: item.a ? `1.5px solid ${pri}` : '1.5px solid transparent' }}>
              <div className="w-1 h-1 rounded-full" style={{ background: item.a ? pri : bdr }} />
              {item.l}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-2.5" style={{ background: bg }}>
        <div className="text-[9px] font-bold mb-2" style={{ color: fg }}>Dashboard</div>
        <div className="grid grid-cols-2 gap-1.5">
          {[1,2,3,4].map(i => <div key={i} className="h-8 rounded" style={{ background: card, border: `1px solid ${bdr}` }} />)}
        </div>
      </div>
    </div>
  </PreviewShell>
)

const CommandPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] rounded-xl overflow-hidden shadow-2xl" style={{ background: card, border: `1px solid ${bdr}` }}>
      <div className="flex items-center gap-2 px-3 py-2.5" style={{ borderBottom: `1px solid ${bdr}` }}>
        <svg className="w-3 h-3" style={{ color: mfg }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <span className="text-[10px]" style={{ color: mfg }}>Search or jump to…</span>
        <span className="ml-auto text-[9px] rounded px-1" style={{ border: `1px solid ${bdr}`, color: mfg }}>⌘K</span>
      </div>
      <div className="p-1">
        <div className="text-[9px] px-2 py-1 uppercase tracking-wider" style={{ color: mfg }}>Navigate</div>
        {[
          { icon: '⌂', label: 'Go to Dashboard', shortcut: 'GD', active: false },
          { icon: '◈', label: 'All Issues',       shortcut: 'GI', active: true  },
          { icon: '+', label: 'New Issue',         shortcut: 'C',  active: false },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 px-2 py-1.5 rounded text-[10px]"
            style={{ background: item.active ? `${pri}15` : 'transparent', color: item.active ? fg : mfg }}>
            <span className="text-[9px]" style={{ color: item.active ? pri : mfg }}>{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            <span className="text-[9px] rounded px-1" style={{ border: `1px solid ${bdr}`, color: mfg }}>{item.shortcut}</span>
          </div>
        ))}
      </div>
    </div>
  </PreviewShell>
)

const BreadcrumbPreview = () => (
  <PreviewShell>
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5 text-[10px]">
        {['Home', 'Projects', 'OTF Dashboard', 'Issues'].map((s, i, arr) => (
          <React.Fragment key={s}>
            <span style={{ color: i === arr.length - 1 ? fg : mfg }}>{s}</span>
            {i < arr.length - 1 && <span style={{ color: bdr }}>/</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-[10px]">
        {['Dashboard', 'Settings', 'Billing'].map((s, i, arr) => (
          <React.Fragment key={s}>
            <span style={{ color: i === arr.length - 1 ? pri : mfg }}>{s}</span>
            {i < arr.length - 1 && <svg className="w-2.5 h-2.5" style={{ color: bdr }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>}
          </React.Fragment>
        ))}
      </div>
    </div>
  </PreviewShell>
)

// ─── Feedback ─────────────────────────────────────────────────────────────────

const ToastPreview = () => (
  <PreviewShell>
    <div className="space-y-2 w-full max-w-[240px]">
      {[
        { icon: '✓', label: 'Issue created',    desc: 'OTF-105 was added to the backlog', color: c2, bg: `${c2}14`,  border: `${c2}33` },
        { icon: '!', label: 'Deploy failed',     desc: 'Build error on production branch', color: err, bg: `${err}14`,  border: `${err}33` },
        { icon: 'ℹ', label: 'Update available', desc: 'OTF v2.1 is ready to install',     color: c3, bg: `${c3}14`, border: `${c3}33` },
      ].map(t => (
        <div key={t.label} className="flex items-start gap-3 rounded-lg p-3"
          style={{ background: t.bg, border: `1px solid ${t.border}` }}>
          <span className="text-xs font-bold mt-0.5" style={{ color: t.color }}>{t.icon}</span>
          <div>
            <div className="text-[10px] font-semibold" style={{ color: fg }}>{t.label}</div>
            <div className="text-[9px] mt-0.5" style={{ color: mfg }}>{t.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const AlertPreview = () => (
  <PreviewShell>
    <div className="space-y-2.5 w-full max-w-[240px]">
      {[
        { label: 'Payment succeeded', desc: 'Your subscription has been renewed.',  icon: '✓', color: c2, border: `${c2}40`,  bg: `${c2}0f` },
        { label: 'Action required',   desc: 'Verify your email to continue.',       icon: '⚠', color: c4, border: `${c4}40`, bg: `${c4}0f` },
        { label: 'Feature deprecated',desc: 'Migrate to the new API by June.',      icon: 'ℹ', color: c3, border: `${c3}40`, bg: `${c3}0f` },
      ].map(a => (
        <div key={a.label} className="flex gap-2.5 rounded-lg px-3 py-2" style={{ background: a.bg, border: `1px solid ${a.border}` }}>
          <span className="text-xs font-bold mt-0.5 shrink-0" style={{ color: a.color }}>{a.icon}</span>
          <div>
            <div className="text-[10px] font-semibold" style={{ color: fg }}>{a.label}</div>
            <div className="text-[9px]" style={{ color: mfg }}>{a.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const SkeletonPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full animate-pulse" style={{ background: sec }} />
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 rounded animate-pulse w-3/4" style={{ background: sec }} />
          <div className="h-2 rounded animate-pulse w-1/2" style={{ background: muted }} />
        </div>
      </div>
      <div className="h-20 rounded-lg animate-pulse" style={{ background: sec }} />
      <div className="space-y-1.5">
        <div className="h-2 rounded animate-pulse w-full" style={{ background: muted }} />
        <div className="h-2 rounded animate-pulse w-5/6" style={{ background: muted }} />
        <div className="h-2 rounded animate-pulse w-2/3" style={{ background: muted }} />
      </div>
      <div className="h-8 rounded-lg overflow-hidden relative" style={{ background: sec }}>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>
    </div>
  </PreviewShell>
)

const EmptyStatePreview = () => (
  <PreviewShell>
    <div className="flex flex-col items-center text-center p-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: card, border: `1px solid ${bdr}` }}>
        <svg className="w-5 h-5" style={{ color: mfg }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <div className="text-xs font-semibold mb-1" style={{ color: fg }}>No issues found</div>
      <div className="text-[10px] mb-3 leading-relaxed" style={{ color: mfg }}>Create your first issue to start tracking work</div>
      <button className="h-7 px-3 rounded-md text-[10px] font-bold text-white" style={{ background: pri }}>+ New Issue</button>
    </div>
  </PreviewShell>
)

// ─── Layout ───────────────────────────────────────────────────────────────────

const AppShellPreview = () => (
  <PreviewShell>
    <div className="w-full h-36 rounded-xl overflow-hidden flex flex-col" style={{ border: `1px solid ${bdr}` }}>
      <div className="h-7 flex items-center px-3 gap-2" style={{ background: card, borderBottom: `1px solid ${bdr}` }}>
        <div className="flex gap-1">
          {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
        </div>
        <div className="flex-1 flex justify-center">
          <div className="h-3 w-20 rounded text-[8px] flex items-center justify-center font-mono" style={{ background: sec, border: `1px solid ${bdr}`, color: mfg }}>app.otf.sh</div>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="w-16 flex flex-col gap-1 p-1.5" style={{ background: card, borderRight: `1px solid ${bdr}` }}>
          {[1,2,3,4].map(i => <div key={i} className="h-4 rounded" style={{ background: i===1 ? `${pri}20` : muted, border: i===1 ? `1px solid ${pri}30` : 'none' }} />)}
        </div>
        <div className="flex-1 p-2 grid grid-cols-2 gap-1.5" style={{ background: bg }}>
          {[1,2,3,4].map(i => <div key={i} className="rounded" style={{ background: card, border: `1px solid ${bdr}` }} />)}
        </div>
      </div>
    </div>
  </PreviewShell>
)

const SplitPagePreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[240px] h-32 rounded-xl overflow-hidden flex" style={{ border: `1px solid ${bdr}` }}>
      <div className="w-28 flex flex-col" style={{ borderRight: `1px solid ${bdr}` }}>
        <div className="h-7 flex items-center px-2" style={{ borderBottom: `1px solid ${bdr}` }}>
          <span className="text-[9px] font-semibold" style={{ color: fg }}>Inbox</span>
          <span className="ml-auto text-[8px] rounded px-1" style={{ background: `${pri}20`, color: pri }}>4</span>
        </div>
        <div className="flex-1">
          {[{ t: 'Issue #101', r: true }, { t: 'Issue #102', r: false }, { t: 'Issue #103', r: false }].map(i => (
            <div key={i.t} className="px-2 py-1.5" style={{ background: i.r ? `${pri}08` : 'transparent', borderBottom: `1px solid ${bdr}40` }}>
              <div className="flex items-center gap-1">
                {i.r && <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: pri }} />}
                <span className="text-[9px] truncate" style={{ color: mfg }}>{i.t}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-2 space-y-1.5" style={{ background: bg }}>
        <div className="h-2 rounded w-2/3" style={{ background: sec }} />
        <div className="h-1.5 rounded w-full" style={{ background: muted }} />
        <div className="h-1.5 rounded w-3/4" style={{ background: muted }} />
        <div className="h-1.5 rounded w-1/2" style={{ background: muted }} />
      </div>
    </div>
  </PreviewShell>
)

// ─── Forms ────────────────────────────────────────────────────────────────────

const FormPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] space-y-3">
      {[{ label: 'Name', value: 'Dave Soni', active: false }, { label: 'Role', value: 'Admin', active: false }, { label: 'Password', value: '••••••••', active: true }].map(f => (
        <div key={f.label}>
          <div className="text-[9px] mb-1 uppercase tracking-wider font-medium" style={{ color: mfg }}>{f.label}</div>
          <div className="h-8 rounded-md px-3 flex items-center justify-between"
            style={{ background: card, border: `1px solid ${f.active ? `${pri}50` : bdr}`, boxShadow: f.active ? `0 0 0 1px ${pri}20` : 'none' }}>
            <span className="text-[10px]" style={{ color: fg }}>{f.value}</span>
            {f.active && (
              <div className="flex gap-0.5">
                {[1,2,3,4].map(i => <div key={i} className="h-1 w-3 rounded-full" style={{ background: i<=3 ? pri : muted }} />)}
              </div>
            )}
          </div>
        </div>
      ))}
      <button className="w-full h-8 rounded-md text-[10px] font-bold text-white" style={{ background: pri }}>Save changes</button>
    </div>
  </PreviewShell>
)

const DatePickerPreview = () => (
  <PreviewShell>
    <div className="rounded-xl p-3 w-full max-w-[200px]" style={{ background: card, border: `1px solid ${bdr}` }}>
      <div className="flex items-center justify-between mb-3">
        <button className="w-5 h-5 flex items-center justify-center rounded" style={{ color: mfg }}>‹</button>
        <span className="text-[10px] font-semibold" style={{ color: fg }}>April 2026</span>
        <button className="w-5 h-5 flex items-center justify-center rounded" style={{ color: mfg }}>›</button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} className="text-[8px] text-center py-0.5" style={{ color: mfg }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {[...Array(5).fill(null), ...Array(25).fill(null)].map((_, i) => {
          const day = i - 4
          return (
            <div key={i} className="text-[8px] text-center py-1 rounded"
              style={{ background: day === 25 ? pri : 'transparent', color: day === 25 ? 'white' : day > 0 ? mfg : 'transparent', fontWeight: day === 25 ? 700 : 400 }}>
              {day > 0 ? day : ''}
            </div>
          )
        })}
      </div>
    </div>
  </PreviewShell>
)

// ─── Charts ───────────────────────────────────────────────────────────────────

const BarChartPreview = () => {
  const bars = [40, 65, 45, 80, 60, 90, 75, 85, 70, 95, 82, 100]
  return (
    <PreviewShell>
      <div className="w-full max-w-[220px]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs font-bold" style={{ color: fg }}>Issue Velocity</div>
            <div className="text-[9px]" style={{ color: mfg }}>Last 12 weeks</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-black" style={{ color: pri }}>+34%</div>
            <div className="text-[9px]" style={{ color: mfg }}>vs last period</div>
          </div>
        </div>
        <div className="flex items-end gap-1 h-16">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: i >= 10 ? pri : `${pri}${Math.round((0.2 + i * 0.06) * 255).toString(16).padStart(2,'0')}` }} />
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {['Jan', 'Mar', 'May', 'Apr'].map(m => (
            <span key={m} className="text-[8px]" style={{ color: `${mfg}60` }}>{m}</span>
          ))}
        </div>
      </div>
    </PreviewShell>
  )
}

const LineChartPreview = () => {
  const points = [20, 35, 28, 55, 42, 68, 58, 75, 65, 82, 78, 92]
  const max = Math.max(...points), min = Math.min(...points)
  const norm = (v: number) => ((v - min) / (max - min)) * 100
  const svgPoints = points.map((p, i) => `${(i / (points.length - 1)) * 100},${100 - norm(p)}`).join(' ')
  return (
    <PreviewShell>
      <div className="w-full max-w-[220px]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs font-bold" style={{ color: fg }}>MRR Growth</div>
            <div className="text-[9px]" style={{ color: mfg }}>12 month trend</div>
          </div>
          <div className="text-sm font-black" style={{ color: pri }}>$4,820</div>
        </div>
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-16">
          <defs>
            <linearGradient id="lg-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={pri} stopOpacity={0.3} />
              <stop offset="100%" stopColor={pri} stopOpacity={0} />
            </linearGradient>
          </defs>
          <polygon points={`0,100 ${svgPoints} 100,100`} fill="url(#lg-fill)" />
          <polyline points={svgPoints} fill="none" stroke={pri} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => i === points.length - 1 ? (
            <circle key={i} cx={(i / (points.length - 1)) * 100} cy={100 - norm(p)} r="2.5" fill={pri} />
          ) : null)}
        </svg>
      </div>
    </PreviewShell>
  )
}

const DonutChartPreview = () => {
  const segments = [
    { label: 'Done',        pct: 36, color: c2 },
    { label: 'In Progress', pct: 24, color: c4 },
    { label: 'Todo',        pct: 24, color: c3 },
    { label: 'Backlog',     pct: 16, color: mfg },
  ]
  return (
    <PreviewShell>
      <div className="flex items-center gap-5">
        <div className="relative w-20 h-20 shrink-0">
          <svg viewBox="0 0 36 36" className="rotate-[-90deg]" width="80" height="80">
            {segments.reduce((acc, seg, i) => {
              const circumference = 2 * Math.PI * 14
              const dashArray = (seg.pct / 100) * circumference
              const dashOffset = -acc.offset
              acc.elements.push(
                <circle key={i} cx="18" cy="18" r="14" fill="none" stroke={seg.color}
                  strokeWidth="4" strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                  strokeDashoffset={dashOffset} />
              )
              acc.offset += dashArray
              return acc
            }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-black leading-none" style={{ color: fg }}>50</div>
              <div className="text-[7px]" style={{ color: mfg }}>total</div>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          {segments.map(s => (
            <div key={s.label} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="text-[9px]" style={{ color: mfg }}>{s.label}</span>
              <span className="text-[9px] font-bold ml-auto" style={{ color: s.color }}>{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewShell>
  )
}

// ─── Blocks ───────────────────────────────────────────────────────────────────

const WorkspaceMembersPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] space-y-2">
      {[
        { name: 'Dave Soni', role: 'Admin',     initials: 'MS', color: pri },
        { name: 'Sarah K.',  role: 'Developer', initials: 'SK', color: c3 },
        { name: 'Alex R.',   role: 'Designer',  initials: 'AR', color: c2 },
      ].map(m => (
        <div key={m.name} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: card, border: `1px solid ${bdr}` }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
            style={{ background: `${m.color}20`, border: `1px solid ${m.color}30`, color: m.color }}>
            {m.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-medium" style={{ color: fg }}>{m.name}</div>
            <div className="text-[9px]" style={{ color: mfg }}>{m.role}</div>
          </div>
          <svg className="w-3 h-3" style={{ color: bdr }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01"/></svg>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const FileCardsPreview = () => (
  <PreviewShell>
    <div className="grid grid-cols-2 gap-2 w-full max-w-[220px]">
      {[
        { name: 'design.fig',  size: '4.2 MB', icon: '🎨', color: c5 },
        { name: 'schema.sql',  size: '18 KB',  icon: '🗄', color: c2 },
        { name: 'spec.pdf',    size: '1.1 MB', icon: '📄', color: c4 },
        { name: 'app.zip',     size: '9.4 MB', icon: '📦', color: c3 },
      ].map(f => (
        <div key={f.name} className="rounded-lg p-2.5 transition-colors" style={{ background: card, border: `1px solid ${bdr}` }}>
          <div className="text-lg mb-1.5">{f.icon}</div>
          <div className="text-[9px] font-medium truncate" style={{ color: fg }}>{f.name}</div>
          <div className="text-[8px]" style={{ color: mfg }}>{f.size}</div>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const StepFormPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px]">
      <div className="flex items-center gap-2 mb-4">
        {['Profile', 'Workspace', 'Invite'].map((step, i) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{
                  background: i === 0 ? pri : 'transparent',
                  border: `1px solid ${i === 0 ? pri : i === 1 ? `${pri}50` : bdr}`,
                  color: i === 0 ? 'white' : i === 1 ? pri : mfg
                }}>
                {i === 0 ? '✓' : i + 1}
              </div>
              <span className="text-[8px]" style={{ color: i <= 1 ? mfg : `${mfg}60` }}>{step}</span>
            </div>
            {i < 2 && <div className="flex-1 h-px mt-[-10px]" style={{ background: i === 0 ? `${pri}40` : bdr }} />}
          </React.Fragment>
        ))}
      </div>
      <div className="space-y-2">
        {['Workspace name', 'Slug'].map(p => (
          <div key={p} className="h-7 rounded-md px-2 flex items-center text-[10px]" style={{ background: card, border: `1px solid ${bdr}`, color: mfg }}>{p}</div>
        ))}
        <button className="w-full h-7 rounded-md text-[10px] font-bold text-white" style={{ background: pri }}>Continue →</button>
      </div>
    </div>
  </PreviewShell>
)

// ─── Registry export ──────────────────────────────────────────────────────────

export const COMPONENTS: ComponentDef[] = [
  // Primitives
  { name: 'Button',       description: 'Triggers actions. 8 variants including gradient, texture, and icon-only.',                  category: 'Primitives',   tags: ['interactive', 'cva', 'a11y'],           preview: <ButtonPreview /> },
  { name: 'Input',        description: 'Text entry with left/right icons, error state, and label support.',                         category: 'Primitives',   tags: ['form', 'controlled', 'a11y'],           preview: <InputPreview /> },
  { name: 'Badge',        description: 'Status pills for labels, priority, and classification.',                                    category: 'Primitives',   tags: ['display', 'status', 'colors'],          preview: <BadgePreview /> },
  { name: 'Avatar',       description: 'User profile picture with initials fallback and group stacking.',                           category: 'Primitives',   tags: ['user', 'group', 'persona'],             preview: <AvatarPreview /> },
  { name: 'Dialog',       description: 'Modal with overlay, focus trap, and imperative API via showDialog().',                      category: 'Primitives',   tags: ['modal', 'overlay', 'radix'],            preview: <DialogPreview /> },
  { name: 'Select',       description: 'Dropdown with search, groups, and keyboard navigation.',                                    category: 'Primitives',   tags: ['form', 'dropdown', 'radix'],            preview: <SelectPreview /> },
  { name: 'Tooltip',      description: 'Hover overlays with configurable placement and delay.',                                     category: 'Primitives',   tags: ['hover', 'placement', 'radix'],          preview: <TooltipPreview /> },
  { name: 'Checkbox',     description: 'Controlled checkbox with indeterminate and disabled states.',                               category: 'Primitives',   tags: ['form', 'controlled', 'a11y'],           preview: <CheckboxPreview /> },
  { name: 'Tabs',         description: 'Segmented content areas with keyboard navigation and animations.',                          category: 'Primitives',   tags: ['navigation', 'radix', 'animated'],      preview: <TabsPreview /> },
  { name: 'Slider',       description: 'Range input with custom styling, steps, and multi-thumb support.',                          category: 'Primitives',   tags: ['form', 'range', 'radix'],               preview: <SliderPreview /> },
  { name: 'TextureCard',  description: 'Signature 4-ring nested border surface. The premium-tier card.',                           category: 'Primitives',   tags: ['surface', 'nested', 'glassmorphism'],   preview: <TextureCardPreview /> },
  // Data Display
  { name: 'DataGrid',     description: 'Virtualized table with sort, filter, column visibility, and bulk actions.',                 category: 'Data Display', tags: ['table', 'tanstack', 'virtualized'],     preview: <DataGridPreview /> },
  { name: 'Timeline',     description: 'Activity feed with icons, timestamps, and connector lines.',                                category: 'Data Display', tags: ['activity', 'events', 'feed'],           preview: <TimelinePreview /> },
  { name: 'MetricCard',   description: 'KPI card with animated number, trend indicator, and sparkline.',                           category: 'Data Display', tags: ['kpi', 'dashboard', 'animated'],         preview: <MetricCardPreview /> },
  { name: 'Progress',     description: 'Linear progress bars with labels, colors, and animated fill.',                             category: 'Data Display', tags: ['progress', 'animated', 'colors'],       preview: <ProgressPreview /> },
  { name: 'Kanban',       description: 'Drag-and-drop board with columns, cards, and optimistic updates.',                         category: 'Data Display', tags: ['dnd', 'board', 'optimistic'],           preview: <KanbanPreview /> },
  // Navigation
  { name: 'Sidebar',        description: 'Collapsible app sidebar with workspaces, nav groups, and user menu.',                    category: 'Navigation',   tags: ['nav', 'collapsible', 'compound'],       preview: <SidebarPreview /> },
  { name: 'CommandPalette', description: '⌘K command palette with groups, shortcuts, and navigation.',                            category: 'Navigation',   tags: ['⌘K', 'search', 'keyboard'],            preview: <CommandPreview /> },
  { name: 'Breadcrumb',     description: 'Hierarchical path navigation with separator variants.',                                   category: 'Navigation',   tags: ['path', 'nav', 'hierarchy'],             preview: <BreadcrumbPreview /> },
  // Feedback
  { name: 'Toast',        description: 'Notification stack with success, error, warning, and info variants.',                       category: 'Feedback',     tags: ['notifications', 'emitter', 'stack'],    preview: <ToastPreview /> },
  { name: 'Alert',        description: 'Inline feedback banners with icon, title, and description.',                                category: 'Feedback',     tags: ['status', 'inline', 'colors'],           preview: <AlertPreview /> },
  { name: 'Skeleton',     description: 'Loading placeholders with pulse and shimmer animation variants.',                           category: 'Feedback',     tags: ['loading', 'shimmer', 'placeholder'],    preview: <SkeletonPreview /> },
  { name: 'EmptyState',   description: 'Zero-content placeholder with icon, title, description, and CTA.',                         category: 'Feedback',     tags: ['empty', 'placeholder', 'cta'],          preview: <EmptyStatePreview /> },
  // Layout
  { name: 'AppShell',     description: 'Full-page layout with sidebar, header, and scrollable main area.',                          category: 'Layout',       tags: ['layout', 'compound', 'responsive'],     preview: <AppShellPreview /> },
  { name: 'SplitPage',    description: 'Two-pane layout with resizable list and detail panels.',                                     category: 'Layout',       tags: ['layout', 'resizable', 'panels'],        preview: <SplitPagePreview /> },
  // Forms
  { name: 'AutoForm',     description: 'Schema-driven form generation with Zod validation.',                                        category: 'Forms',        tags: ['zod', 'schema', 'auto'],                preview: <FormPreview /> },
  { name: 'DatePicker',   description: 'Calendar picker with range selection and presets.',                                          category: 'Forms',        tags: ['calendar', 'range', 'presets'],         preview: <DatePickerPreview /> },
  { name: 'StepForm',     description: 'Multi-step wizard with progress indicator and validation per step.',                         category: 'Forms',        tags: ['wizard', 'steps', 'validation'],        preview: <StepFormPreview /> },
  // Charts
  { name: 'BarChart',     description: 'Animated bar chart with tooltips and responsive sizing.',                                    category: 'Charts',       tags: ['recharts', 'animated', 'responsive'],   preview: <BarChartPreview /> },
  { name: 'LineChart',    description: 'Smooth area/line chart with gradient fill and data points.',                                 category: 'Charts',       tags: ['recharts', 'gradient', 'area'],         preview: <LineChartPreview /> },
  { name: 'DonutChart',   description: 'SVG donut chart with legend and center stat.',                                              category: 'Charts',       tags: ['svg', 'donut', 'legend'],               preview: <DonutChartPreview /> },
  // Blocks
  { name: 'WorkspaceMembers', description: 'Team member list with roles, avatars, and action menus.',                               category: 'Blocks',       tags: ['team', 'roles', 'actions'],             preview: <WorkspaceMembersPreview /> },
  { name: 'FileCards',        description: 'File attachment grid with type icons, sizes, and preview.',                             category: 'Blocks',       tags: ['files', 'attachments', 'grid'],         preview: <FileCardsPreview /> },
]

export const CATEGORIES = Array.from(new Set(COMPONENTS.map(c => c.category))) as ComponentCategory[]
export const TOTAL = COMPONENTS.length
