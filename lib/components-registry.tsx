import React from 'react'

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

// ─── Preview helpers ──────────────────────────────────────────────────────────

function PreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] p-6">
      {children}
    </div>
  )
}

// ─── Primitives ───────────────────────────────────────────────────────────────

const ButtonPreview = () => (
  <PreviewShell>
    <div className="flex flex-wrap gap-2 justify-center">
      <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-md">Primary</button>
      <button className="px-4 py-2 bg-gradient-to-b from-[#f97316] to-[#ea580c] text-white text-xs font-bold rounded-md shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset]">Gradient</button>
      <button className="px-4 py-2 border border-[#333] text-white text-xs font-medium rounded-md">Ghost</button>
      <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium rounded-md">Danger</button>
      <button className="px-4 py-2 bg-[#111] border border-[#1f1f1f] text-[#525252] text-xs rounded-md cursor-not-allowed opacity-50">Disabled</button>
      <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-md flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full border-2 border-black/30 border-t-black animate-spin" />
        Loading
      </button>
    </div>
  </PreviewShell>
)

const InputPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] space-y-2.5">
      <div className="h-9 bg-[#111] border border-[#333] rounded-md px-3 flex items-center text-xs text-white">Search components…</div>
      <div className="h-9 bg-[#111] border border-[#f97316]/40 ring-1 ring-[#f97316]/20 rounded-md px-3 flex items-center justify-between">
        <span className="text-xs text-white">dave@otf.sh</span>
        <svg className="w-3 h-3 text-[#f97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
      </div>
      <div className="h-9 bg-[#111] border border-red-500/40 ring-1 ring-red-500/20 rounded-md px-3 flex items-center">
        <span className="text-xs text-red-400">Invalid email address</span>
      </div>
    </div>
  </PreviewShell>
)

const BadgePreview = () => (
  <PreviewShell>
    <div className="flex flex-wrap gap-2 justify-center">
      {[
        { label: 'New', cls: 'bg-[#f97316] text-white' },
        { label: 'Beta', cls: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' },
        { label: 'Done', cls: 'bg-green-500/10 text-green-400 border border-green-500/20' },
        { label: 'Urgent', cls: 'bg-red-500/10 text-red-400 border border-red-500/20' },
        { label: 'Draft', cls: 'bg-[#111] text-[#737373] border border-[#333]' },
        { label: 'Pro', cls: 'bg-violet-500/10 text-violet-400 border border-violet-500/20' },
      ].map(b => (
        <span key={b.label} className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide ${b.cls}`}>{b.label}</span>
      ))}
    </div>
  </PreviewShell>
)

const AvatarPreview = () => (
  <PreviewShell>
    <div className="flex flex-col items-center gap-4">
      <div className="flex -space-x-3">
        {[
          { initials: 'MS', bg: 'bg-[#f97316]' },
          { initials: 'KL', bg: 'bg-blue-500' },
          { initials: 'AR', bg: 'bg-violet-500' },
          { initials: 'JD', bg: 'bg-green-500' },
          { initials: '+4', bg: 'bg-[#333]' },
        ].map((a) => (
          <div key={a.initials} className={`w-9 h-9 rounded-full ${a.bg} border-2 border-[#0a0a0a] flex items-center justify-center text-white text-[10px] font-bold`}>
            {a.initials}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white text-sm font-bold">M</div>
        <div>
          <div className="text-white text-xs font-semibold">Dave Soni</div>
          <div className="text-[#525252] text-[10px]">Admin · dave@otf.sh</div>
        </div>
      </div>
    </div>
  </PreviewShell>
)

const DialogPreview = () => (
  <PreviewShell>
    <div className="relative w-full max-w-[240px]">
      <div className="absolute -inset-4 bg-[#0a0a0a]/60 rounded-lg" />
      <div className="relative border border-[#333]/40 rounded-lg p-[3px] bg-gradient-to-b from-[#1a1a1a] to-[#111]">
        <div className="border border-[#333]/20 rounded-[7px] p-[2px]">
          <div className="border border-[#333]/10 rounded-[5px] p-[1px]">
            <div className="bg-[#0d0d0d] rounded-[3px] p-4">
              <div className="text-white text-xs font-bold mb-1">Delete workspace</div>
              <div className="text-[#525252] text-[10px] mb-4 leading-relaxed">This action cannot be undone. All data will be permanently removed.</div>
              <div className="flex gap-2">
                <button className="flex-1 h-7 border border-[#333] rounded text-[10px] text-[#737373]">Cancel</button>
                <button className="flex-1 h-7 bg-red-500 rounded text-[10px] text-white font-bold">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PreviewShell>
)

const SelectPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[200px] space-y-2">
      <div className="h-9 bg-[#111] border border-[#333] rounded-md px-3 flex items-center justify-between text-xs">
        <span className="text-white">In Progress</span>
        <svg className="w-3 h-3 text-[#525252]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </div>
      <div className="bg-[#111] border border-[#333] rounded-md overflow-hidden">
        {['Backlog', 'Todo', 'In Progress', 'Done', 'Cancelled'].map((s, i) => (
          <div key={s} className={`px-3 py-1.5 text-xs flex items-center gap-2 ${i === 2 ? 'bg-[#f97316]/10 text-[#f97316]' : 'text-[#737373]'}`}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: ['#525252','#3b82f6','#f59e0b','#22c55e','#ef4444'][i] }} />
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
        { dir: 'top', label: 'Top', x: 'left-1/2 -translate-x-1/2', y: 'bottom-full mb-2' },
        { dir: 'right', label: 'Right', x: 'left-full ml-2', y: 'top-1/2 -translate-y-1/2' },
      ].map(t => (
        <div key={t.dir} className="relative">
          <button className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-[#737373] hover:text-white text-xs">?</button>
          <div className={`absolute ${t.x} ${t.y} bg-[#1a1a1a] border border-[#333] text-white text-[10px] px-2.5 py-1.5 rounded-md whitespace-nowrap z-10 shadow-xl`}>
            {t.label} tooltip
            <div className="absolute w-1.5 h-1.5 bg-[#1a1a1a] border-r border-b border-[#333] rotate-45" style={t.dir === 'top' ? { bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' } : { left: '-4px', top: '50%', transform: 'translateY(-50%) rotate(135deg)' }} />
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
        { label: 'Dark mode', checked: true },
        { label: 'TypeScript', checked: false },
        { label: 'Radix UI', checked: false },
      ].map(item => (
        <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 transition-colors ${item.checked ? 'bg-[#f97316] border-[#f97316]' : 'border-[#333] bg-[#111]'}`}>
            {item.checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
          </div>
          <span className={`text-xs ${item.checked ? 'text-white' : 'text-[#737373]'}`}>{item.label}</span>
        </label>
      ))}
    </div>
  </PreviewShell>
)

const TabsPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[240px]">
      <div className="flex border-b border-[#1f1f1f] mb-4">
        {['Overview', 'Issues', 'Files'].map((t, i) => (
          <button key={t} className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${i === 0 ? 'border-[#f97316] text-white' : 'border-transparent text-[#525252]'}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-2 bg-[#1a1a1a] rounded w-3/4" />
        <div className="h-2 bg-[#1a1a1a] rounded w-full" />
        <div className="h-2 bg-[#1a1a1a] rounded w-1/2" />
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="h-12 bg-[#111] border border-[#1f1f1f] rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-black">50</span>
          </div>
          <div className="h-12 bg-[#111] border border-[#1f1f1f] rounded-md flex items-center justify-center">
            <span className="text-[#f97316] text-sm font-black">12</span>
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
        { val: 65, color: '#f97316', label: 'Volume' },
        { val: 40, color: '#3b82f6', label: 'Bass' },
        { val: 80, color: '#22c55e', label: 'Treble' },
      ].map(s => (
        <div key={s.label}>
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px] text-[#525252]">{s.label}</span>
            <span className="text-[10px] font-mono" style={{ color: s.color }}>{s.val}%</span>
          </div>
          <div className="relative h-1.5 bg-[#1f1f1f] rounded-full">
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
    { id: '#101', title: 'Auth guards', status: 'Done', priority: 'High' },
    { id: '#102', title: 'Build DataGrid', status: 'In Progress', priority: 'Urgent' },
    { id: '#103', title: 'Polish hero', status: 'Todo', priority: 'Medium' },
    { id: '#104', title: 'AI prompts', status: 'Backlog', priority: 'Low' },
  ]
  const sc: Record<string, string> = { Done: 'text-green-400', 'In Progress': 'text-amber-400', Todo: 'text-blue-400', Backlog: 'text-[#525252]' }
  const pc: Record<string, string> = { Urgent: 'text-red-400', High: 'text-[#f97316]', Medium: 'text-yellow-400', Low: 'text-[#525252]' }
  return (
    <PreviewShell>
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white font-semibold">Issues</span>
          <div className="flex gap-1.5">
            <span className="text-[9px] border border-[#333] rounded px-2 py-0.5 text-[#525252]">Filter</span>
            <span className="text-[9px] bg-[#f97316] rounded px-2 py-0.5 text-white font-bold">+ New</span>
          </div>
        </div>
        <div className="border border-[#1f1f1f] rounded-lg overflow-hidden">
          {rows.map((r, i) => (
            <div key={r.id} className={`flex items-center gap-3 px-3 py-2 text-[10px] ${i < rows.length-1 ? 'border-b border-[#111]' : ''} hover:bg-[#0f0f0f]`}>
              <span className="text-[#525252] font-mono w-10 shrink-0">{r.id}</span>
              <span className="text-white flex-1 truncate">{r.title}</span>
              <span className={`shrink-0 ${sc[r.status]}`}>{r.status}</span>
              <span className={`shrink-0 ${pc[r.priority]}`}>{r.priority}</span>
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
        { label: 'Issue created', time: '2m ago', color: '#f97316', icon: '+' },
        { label: 'Assigned to Dave', time: '5m ago', color: '#3b82f6', icon: '→' },
        { label: 'Status → In Progress', time: '12m ago', color: '#f59e0b', icon: '↻' },
        { label: 'Commented on issue', time: '1h ago', color: '#525252', icon: '·' },
      ].map((item, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: `${item.color}20`, border: `1px solid ${item.color}40`, color: item.color }}>
              {item.icon}
            </div>
            {i < 3 && <div className="w-px flex-1 mt-1" style={{ background: `${item.color}20` }} />}
          </div>
          <div className="pb-2">
            <div className="text-white text-[10px] font-medium">{item.label}</div>
            <div className="text-[#525252] text-[9px]">{item.time}</div>
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
        { label: 'MRR', value: '$4,820', trend: '+18%', trendColor: 'text-green-400' },
        { label: 'Users', value: '1,240', trend: '+7%', trendColor: 'text-[#f97316]' },
        { label: 'Churn', value: '2.1%', trend: '-0.4%', trendColor: 'text-green-400' },
        { label: 'Issues', value: '50', trend: '+12%', trendColor: 'text-blue-400' },
      ].map(m => (
        <div key={m.label} className="bg-[#111] border border-[#1f1f1f] rounded-lg p-3">
          <div className="text-[8px] text-[#525252] uppercase tracking-wider mb-1">{m.label}</div>
          <div className="text-sm font-black text-white leading-none">{m.value}</div>
          <div className={`text-[8px] mt-1 font-semibold ${m.trendColor}`}>{m.trend}</div>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const ProgressPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] space-y-4">
      {[
        { label: 'Sprint 4', val: 72, color: '#f97316' },
        { label: 'Q2 Goals', val: 45, color: '#3b82f6' },
        { label: 'Onboarding', val: 90, color: '#22c55e' },
      ].map(p => (
        <div key={p.label}>
          <div className="flex justify-between text-[10px] mb-1.5">
            <span className="text-[#737373]">{p.label}</span>
            <span className="font-mono" style={{ color: p.color }}>{p.val}%</span>
          </div>
          <div className="h-1.5 bg-[#1f1f1f] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${p.val}%`, background: `linear-gradient(to right, ${p.color}80, ${p.color})` }} />
          </div>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const KanbanPreview = () => {
  const cols = [
    { label: 'Todo', color: '#3b82f6', count: 3 },
    { label: 'In Progress', color: '#f59e0b', count: 2 },
    { label: 'Done', color: '#22c55e', count: 5 },
  ]
  return (
    <PreviewShell>
      <div className="flex gap-2 w-full">
        {cols.map(col => (
          <div key={col.label} className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: col.color }} />
              <span className="text-[9px] text-[#525252] font-medium truncate">{col.label}</span>
              <span className="text-[9px] text-[#333] ml-auto">{col.count}</span>
            </div>
            <div className="space-y-1.5">
              {Array.from({ length: col.count > 3 ? 3 : col.count }).map((_, i) => (
                <div key={i} className="bg-[#111] border border-[#1f1f1f] rounded p-2">
                  <div className="h-1 bg-[#1f1f1f] rounded w-full mb-1" />
                  <div className="h-1 bg-[#1f1f1f] rounded w-2/3" />
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
    <div className="w-full max-w-[220px] border border-[#333]/40 rounded-xl p-[3px] bg-gradient-to-b from-[#1a1a1a] to-[#111]">
      <div className="border border-[#333]/20 rounded-[9px] p-[2px]">
        <div className="border border-[#333]/10 rounded-[7px] p-[1px]">
          <div className="bg-[#0d0d0d] rounded-[5px] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#f97316]/20 border border-[#f97316]/30 flex items-center justify-center">
                <span className="text-[#f97316] text-xs font-bold">M</span>
              </div>
              <div>
                <div className="text-white text-xs font-semibold">Dave Soni</div>
                <div className="text-[#525252] text-[9px]">Admin</div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 bg-[#1f1f1f] rounded w-full" />
              <div className="h-1.5 bg-[#1f1f1f] rounded w-3/4" />
              <div className="h-1.5 bg-[#1f1f1f] rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </PreviewShell>
)

// ─── Navigation ───────────────────────────────────────────────────────────────

const SidebarPreview = () => (
  <PreviewShell>
    <div className="flex h-40 w-full max-w-[220px] border border-[#1f1f1f] rounded-xl overflow-hidden">
      <div className="w-[120px] shrink-0 bg-[#0d0d0d] border-r border-[#1f1f1f] flex flex-col">
        <div className="h-10 border-b border-[#1f1f1f] flex items-center px-2.5 gap-2">
          <div className="w-5 h-5 rounded-md bg-[#f97316] flex items-center justify-center"><span className="text-white text-[8px] font-black">O</span></div>
          <span className="text-white text-[10px] font-bold">OTF</span>
        </div>
        <div className="flex-1 p-1.5 space-y-0.5">
          {[{ l: 'Dashboard', a: true }, { l: 'Issues' }, { l: 'Projects' }, { l: 'Teams' }].map(item => (
            <div key={item.l} className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[9px] ${item.a ? 'bg-[#f97316]/10 text-[#f97316] border-l-[1.5px] border-[#f97316]' : 'text-[#525252]'}`}>
              <div className="w-1 h-1 rounded-full" style={{ background: item.a ? '#f97316' : '#333' }} />
              {item.l}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-[#0a0a0a] p-2.5">
        <div className="text-[9px] text-white font-bold mb-2">Dashboard</div>
        <div className="grid grid-cols-2 gap-1.5">
          {[1,2,3,4].map(i => <div key={i} className="h-8 bg-[#111] border border-[#1f1f1f] rounded" />)}
        </div>
      </div>
    </div>
  </PreviewShell>
)

const CommandPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] bg-[#111] border border-[#333] rounded-xl overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#1f1f1f]">
        <svg className="w-3 h-3 text-[#525252]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <span className="text-[10px] text-[#525252]">Search commands…</span>
        <span className="ml-auto text-[9px] border border-[#333] rounded px-1 text-[#525252]">⌘K</span>
      </div>
      <div className="p-1">
        <div className="text-[9px] text-[#525252] px-2 py-1 uppercase tracking-wider">Navigate</div>
        {[
          { icon: '⌂', label: 'Go to Dashboard', shortcut: 'GD' },
          { icon: '◈', label: 'All Issues', shortcut: 'GI' },
          { icon: '+', label: 'New Issue', shortcut: 'C' },
        ].map(item => (
          <div key={item.label} className={`flex items-center gap-2 px-2 py-1.5 rounded text-[10px] ${item.label === 'All Issues' ? 'bg-[#f97316]/10 text-white' : 'text-[#737373]'}`}>
            <span className="text-[#525252] text-[9px]">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            <span className="text-[9px] border border-[#333] rounded px-1 text-[#525252]">{item.shortcut}</span>
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
            <span className={i === arr.length - 1 ? 'text-white font-medium' : 'text-[#525252]'}>{s}</span>
            {i < arr.length - 1 && <span className="text-[#333]">/</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-[10px]">
        {['Dashboard', 'Settings', 'Billing'].map((s, i, arr) => (
          <React.Fragment key={s}>
            <span className={i === arr.length - 1 ? 'text-[#f97316] font-medium' : 'text-[#525252] hover:text-white cursor-pointer'}>{s}</span>
            {i < arr.length - 1 && <svg className="w-2.5 h-2.5 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>}
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
        { icon: '✓', label: 'Issue created', desc: 'OTF-105 was added to the backlog', color: '#22c55e', bg: '#22c55e10', border: '#22c55e20' },
        { icon: '!', label: 'Deploy failed', desc: 'Build error on production branch', color: '#ef4444', bg: '#ef444410', border: '#ef444420' },
        { icon: 'ℹ', label: 'Update available', desc: 'OTF v2.1 is ready to install', color: '#3b82f6', bg: '#3b82f610', border: '#3b82f620' },
      ].map(t => (
        <div key={t.label} className="flex items-start gap-3 rounded-lg p-3 border" style={{ background: t.bg, borderColor: t.border }}>
          <span className="text-xs font-bold mt-0.5" style={{ color: t.color }}>{t.icon}</span>
          <div>
            <div className="text-white text-[10px] font-semibold">{t.label}</div>
            <div className="text-[#737373] text-[9px] mt-0.5">{t.desc}</div>
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
        { label: 'Payment succeeded', desc: 'Your subscription has been renewed.', icon: '✓', color: '#22c55e', border: '#22c55e30', bg: '#22c55e0a' },
        { label: 'Action required', desc: 'Verify your email to continue.', icon: '⚠', color: '#f59e0b', border: '#f59e0b30', bg: '#f59e0b0a' },
        { label: 'Feature deprecated', desc: 'Migrate to the new API by June.', icon: 'ℹ', color: '#3b82f6', border: '#3b82f630', bg: '#3b82f60a' },
      ].map(a => (
        <div key={a.label} className="flex gap-2.5 rounded-lg px-3 py-2 border" style={{ background: a.bg, borderColor: a.border }}>
          <span className="text-xs font-bold mt-0.5 shrink-0" style={{ color: a.color }}>{a.icon}</span>
          <div>
            <div className="text-white text-[10px] font-semibold">{a.label}</div>
            <div className="text-[#737373] text-[9px]">{a.desc}</div>
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
        <div className="w-8 h-8 rounded-full bg-[#1f1f1f] animate-pulse" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 bg-[#1f1f1f] rounded animate-pulse w-3/4" />
          <div className="h-2 bg-[#1f1f1f] rounded animate-pulse w-1/2" />
        </div>
      </div>
      <div className="h-20 bg-[#1f1f1f] rounded-lg animate-pulse" />
      <div className="space-y-1.5">
        <div className="h-2 bg-[#1f1f1f] rounded animate-pulse w-full" />
        <div className="h-2 bg-[#1f1f1f] rounded animate-pulse w-5/6" />
        <div className="h-2 bg-[#1f1f1f] rounded animate-pulse w-2/3" />
      </div>
      {/* Shimmer variant */}
      <div className="h-8 rounded-lg overflow-hidden relative bg-[#1f1f1f]">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  </PreviewShell>
)

const EmptyStatePreview = () => (
  <PreviewShell>
    <div className="flex flex-col items-center text-center p-4">
      <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1f1f1f] flex items-center justify-center mb-3">
        <svg className="w-5 h-5 text-[#525252]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <div className="text-white text-xs font-semibold mb-1">No issues found</div>
      <div className="text-[#525252] text-[10px] mb-3 leading-relaxed">Create your first issue to start tracking work</div>
      <button className="h-7 px-3 bg-[#f97316] rounded-md text-white text-[10px] font-bold">+ New Issue</button>
    </div>
  </PreviewShell>
)

// ─── Layout ───────────────────────────────────────────────────────────────────

const AppShellPreview = () => (
  <PreviewShell>
    <div className="w-full h-36 border border-[#1f1f1f] rounded-xl overflow-hidden flex flex-col">
      <div className="h-7 bg-[#0a0a0a] border-b border-[#111] flex items-center px-3 gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="h-3 w-20 bg-[#111] border border-[#1f1f1f] rounded text-[8px] text-[#525252] flex items-center justify-center font-mono">app.otf.sh</div>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="w-16 bg-[#0d0d0d] border-r border-[#111] flex flex-col gap-1 p-1.5">
          {[1,2,3,4].map(i => <div key={i} className={`h-4 rounded ${i===1 ? 'bg-[#f97316]/20 border border-[#f97316]/30' : 'bg-[#111]'}`} />)}
        </div>
        <div className="flex-1 p-2 grid grid-cols-2 gap-1.5">
          {[1,2,3,4].map(i => <div key={i} className="bg-[#111] border border-[#111] rounded" />)}
        </div>
      </div>
    </div>
  </PreviewShell>
)

const SplitPagePreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[240px] h-32 border border-[#1f1f1f] rounded-xl overflow-hidden flex">
      <div className="w-28 border-r border-[#1f1f1f] flex flex-col">
        <div className="h-7 border-b border-[#1f1f1f] flex items-center px-2">
          <span className="text-[9px] text-white font-semibold">Inbox</span>
          <span className="ml-auto text-[8px] bg-[#f97316]/20 text-[#f97316] rounded px-1">4</span>
        </div>
        <div className="flex-1 divide-y divide-[#111]">
          {[{ t: 'Issue #101', r: true }, { t: 'Issue #102', r: false }, { t: 'Issue #103', r: false }].map(i => (
            <div key={i.t} className={`px-2 py-1.5 ${i.r ? 'bg-[#f97316]/5' : ''}`}>
              <div className="flex items-center gap-1">
                {i.r && <div className="w-1.5 h-1.5 rounded-full bg-[#f97316] shrink-0" />}
                <span className="text-[9px] text-[#737373] truncate">{i.t}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-2 space-y-1.5">
        <div className="h-2 bg-[#1f1f1f] rounded w-2/3" />
        <div className="h-1.5 bg-[#111] rounded w-full" />
        <div className="h-1.5 bg-[#111] rounded w-3/4" />
        <div className="h-1.5 bg-[#111] rounded w-1/2" />
      </div>
    </div>
  </PreviewShell>
)

// ─── Forms ────────────────────────────────────────────────────────────────────

const FormPreview = () => (
  <PreviewShell>
    <div className="w-full max-w-[220px] space-y-3">
      <div>
        <div className="text-[9px] text-[#737373] mb-1 uppercase tracking-wider font-medium">Name</div>
        <div className="h-8 bg-[#111] border border-[#333] rounded-md px-3 flex items-center text-[10px] text-white">Dave Soni</div>
      </div>
      <div>
        <div className="text-[9px] text-[#737373] mb-1 uppercase tracking-wider font-medium">Role</div>
        <div className="h-8 bg-[#111] border border-[#333] rounded-md px-3 flex items-center justify-between">
          <span className="text-[10px] text-white">Admin</span>
          <svg className="w-2.5 h-2.5 text-[#525252]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </div>
      </div>
      <div>
        <div className="text-[9px] text-[#737373] mb-1 uppercase tracking-wider font-medium">Password</div>
        <div className="h-8 bg-[#111] border border-[#f97316]/40 ring-1 ring-[#f97316]/20 rounded-md px-3 flex items-center justify-between">
          <span className="text-[10px] tracking-widest text-white">••••••••</span>
          <div className="flex gap-0.5">
            {[1,2,3,4].map(i => <div key={i} className={`h-1 w-3 rounded-full ${i<=3?'bg-[#f97316]':'bg-[#1f1f1f]'}`} />)}
          </div>
        </div>
      </div>
      <button className="w-full h-8 bg-gradient-to-b from-[#f97316] to-[#ea580c] rounded-md text-white text-[10px] font-bold">Save changes</button>
    </div>
  </PreviewShell>
)

const DatePickerPreview = () => (
  <PreviewShell>
    <div className="bg-[#111] border border-[#333] rounded-xl p-3 w-full max-w-[200px]">
      <div className="flex items-center justify-between mb-3">
        <button className="w-5 h-5 flex items-center justify-center text-[#525252] hover:text-white rounded">‹</button>
        <span className="text-white text-[10px] font-semibold">April 2026</span>
        <button className="w-5 h-5 flex items-center justify-center text-[#525252] hover:text-white rounded">›</button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} className="text-[8px] text-[#525252] text-center py-0.5">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {[...Array(5).fill(null), ...Array(25).fill(null)].map((_, i) => {
          const day = i - 4
          return (
            <div key={i} className={`text-[8px] text-center py-1 rounded ${day === 25 ? 'bg-[#f97316] text-white font-bold' : day > 0 ? 'text-[#737373] hover:bg-[#1a1a1a]' : ''}`}>
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
            <div className="text-white text-xs font-bold">Issue Velocity</div>
            <div className="text-[#525252] text-[9px]">Last 12 weeks</div>
          </div>
          <div className="text-right">
            <div className="text-[#f97316] text-sm font-black">+34%</div>
            <div className="text-[#525252] text-[9px]">vs last period</div>
          </div>
        </div>
        <div className="flex items-end gap-1 h-16">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm transition-all duration-300"
              style={{ height: `${h}%`, background: i >= 10 ? '#f97316' : `rgba(249,115,22,${0.2 + i * 0.06})` }} />
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {['Jan', 'Mar', 'May', 'Apr'].map(m => (
            <span key={m} className="text-[8px] text-[#333]">{m}</span>
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
            <div className="text-white text-xs font-bold">MRR Growth</div>
            <div className="text-[#525252] text-[9px]">12 month trend</div>
          </div>
          <div className="text-[#f97316] text-sm font-black">$4,820</div>
        </div>
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-16">
          <defs>
            <linearGradient id="line-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <polygon points={`0,100 ${svgPoints} 100,100`} fill="url(#line-fill)" />
          <polyline points={svgPoints} fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => i === points.length - 1 ? (
            <circle key={i} cx={(i / (points.length - 1)) * 100} cy={100 - norm(p)} r="2.5" fill="#f97316" />
          ) : null)}
        </svg>
      </div>
    </PreviewShell>
  )
}

const DonutChartPreview = () => {
  const segments = [
    { label: 'Done', pct: 36, color: '#22c55e' },
    { label: 'In Progress', pct: 24, color: '#f59e0b' },
    { label: 'Todo', pct: 24, color: '#3b82f6' },
    { label: 'Backlog', pct: 16, color: '#525252' },
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
              <div className="text-white text-sm font-black leading-none">50</div>
              <div className="text-[#525252] text-[7px]">total</div>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          {segments.map(s => (
            <div key={s.label} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="text-[9px] text-[#737373]">{s.label}</span>
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
        { name: 'Dave Soni', role: 'Admin', initials: 'MS', color: '#f97316' },
        { name: 'Sarah K.', role: 'Developer', initials: 'SK', color: '#3b82f6' },
        { name: 'Alex R.', role: 'Designer', initials: 'AR', color: '#22c55e' },
      ].map(m => (
        <div key={m.name} className="flex items-center gap-2.5 px-3 py-2 bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{ background: `${m.color}20`, border: `1px solid ${m.color}30`, color: m.color }}>
            {m.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[10px] font-medium">{m.name}</div>
            <div className="text-[#525252] text-[9px]">{m.role}</div>
          </div>
          <svg className="w-3 h-3 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01"/></svg>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const FileCardsPreview = () => (
  <PreviewShell>
    <div className="grid grid-cols-2 gap-2 w-full max-w-[220px]">
      {[
        { name: 'design.fig', size: '4.2 MB', icon: '🎨', color: '#a78bfa' },
        { name: 'schema.sql', size: '18 KB', icon: '🗄', color: '#22c55e' },
        { name: 'spec.pdf', size: '1.1 MB', icon: '📄', color: '#f59e0b' },
        { name: 'app.zip', size: '9.4 MB', icon: '📦', color: '#3b82f6' },
      ].map(f => (
        <div key={f.name} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-2.5 hover:border-[#2a2a2a] transition-colors">
          <div className="text-lg mb-1.5">{f.icon}</div>
          <div className="text-white text-[9px] font-medium truncate">{f.name}</div>
          <div className="text-[#525252] text-[8px]">{f.size}</div>
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
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border ${i === 0 ? 'bg-[#f97316] border-[#f97316] text-white' : i === 1 ? 'border-[#f97316]/40 text-[#f97316]' : 'border-[#333] text-[#525252]'}`}>
                {i === 0 ? '✓' : i + 1}
              </div>
              <span className={`text-[8px] ${i <= 1 ? 'text-[#737373]' : 'text-[#333]'}`}>{step}</span>
            </div>
            {i < 2 && <div className={`flex-1 h-px mt-[-10px] ${i === 0 ? 'bg-[#f97316]/40' : 'bg-[#1f1f1f]'}`} />}
          </React.Fragment>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-7 bg-[#111] border border-[#333] rounded-md px-2 flex items-center text-[10px] text-[#525252]">Workspace name</div>
        <div className="h-7 bg-[#111] border border-[#333] rounded-md px-2 flex items-center text-[10px] text-[#525252]">Slug</div>
        <button className="w-full h-7 bg-[#f97316] rounded-md text-white text-[10px] font-bold">Continue →</button>
      </div>
    </div>
  </PreviewShell>
)

// ─── Registry export ──────────────────────────────────────────────────────────

export const COMPONENTS: ComponentDef[] = [
  // Primitives
  { name: 'Button', description: 'Triggers actions. 8 variants including gradient, texture, and icon-only.', category: 'Primitives', tags: ['interactive', 'cva', 'a11y'], preview: <ButtonPreview /> },
  { name: 'Input', description: 'Text entry with left/right icons, error state, and label support.', category: 'Primitives', tags: ['form', 'controlled', 'a11y'], preview: <InputPreview /> },
  { name: 'Badge', description: 'Status pills for labels, priority, and classification.', category: 'Primitives', tags: ['display', 'status', 'colors'], preview: <BadgePreview /> },
  { name: 'Avatar', description: 'User profile picture with initials fallback and group stacking.', category: 'Primitives', tags: ['user', 'group', 'persona'], preview: <AvatarPreview /> },
  { name: 'Dialog', description: 'Modal with overlay, focus trap, and imperative API via showDialog().', category: 'Primitives', tags: ['modal', 'overlay', 'radix'], preview: <DialogPreview /> },
  { name: 'Select', description: 'Dropdown with search, groups, and keyboard navigation.', category: 'Primitives', tags: ['form', 'dropdown', 'radix'], preview: <SelectPreview /> },
  { name: 'Tooltip', description: 'Hover overlays with configurable placement and delay.', category: 'Primitives', tags: ['hover', 'placement', 'radix'], preview: <TooltipPreview /> },
  { name: 'Checkbox', description: 'Controlled checkbox with indeterminate and disabled states.', category: 'Primitives', tags: ['form', 'controlled', 'a11y'], preview: <CheckboxPreview /> },
  { name: 'Tabs', description: 'Segmented content areas with keyboard navigation and animations.', category: 'Primitives', tags: ['navigation', 'radix', 'animated'], preview: <TabsPreview /> },
  { name: 'Slider', description: 'Range input with custom styling, steps, and multi-thumb support.', category: 'Primitives', tags: ['form', 'range', 'radix'], preview: <SliderPreview /> },
  { name: 'TextureCard', description: 'Signature 4-ring nested border surface. The premium-tier card.', category: 'Primitives', tags: ['surface', 'nested', 'glassmorphism'], preview: <TextureCardPreview /> },
  // Data Display
  { name: 'DataGrid', description: 'Virtualized table with sort, filter, column visibility, and bulk actions.', category: 'Data Display', tags: ['table', 'tanstack', 'virtualized'], preview: <DataGridPreview /> },
  { name: 'Timeline', description: 'Activity feed with icons, timestamps, and connector lines.', category: 'Data Display', tags: ['activity', 'events', 'feed'], preview: <TimelinePreview /> },
  { name: 'MetricCard', description: 'KPI card with animated number, trend indicator, and sparkline.', category: 'Data Display', tags: ['kpi', 'dashboard', 'animated'], preview: <MetricCardPreview /> },
  { name: 'Progress', description: 'Linear progress bars with labels, colors, and animated fill.', category: 'Data Display', tags: ['progress', 'animated', 'colors'], preview: <ProgressPreview /> },
  { name: 'Kanban', description: 'Drag-and-drop board with columns, cards, and optimistic updates.', category: 'Data Display', tags: ['dnd', 'board', 'optimistic'], preview: <KanbanPreview /> },
  // Navigation
  { name: 'Sidebar', description: 'Collapsible app sidebar with workspaces, nav groups, and user menu.', category: 'Navigation', tags: ['nav', 'collapsible', 'compound'], preview: <SidebarPreview /> },
  { name: 'CommandPalette', description: '⌘K command palette with groups, shortcuts, and navigation.', category: 'Navigation', tags: ['⌘K', 'search', 'keyboard'], preview: <CommandPreview /> },
  { name: 'Breadcrumb', description: 'Hierarchical path navigation with separator variants.', category: 'Navigation', tags: ['path', 'nav', 'hierarchy'], preview: <BreadcrumbPreview /> },
  // Feedback
  { name: 'Toast', description: 'Notification stack with success, error, warning, and info variants.', category: 'Feedback', tags: ['notifications', 'emitter', 'stack'], preview: <ToastPreview /> },
  { name: 'Alert', description: 'Inline feedback banners with icon, title, and description.', category: 'Feedback', tags: ['status', 'inline', 'colors'], preview: <AlertPreview /> },
  { name: 'Skeleton', description: 'Loading placeholders with pulse and shimmer animation variants.', category: 'Feedback', tags: ['loading', 'shimmer', 'placeholder'], preview: <SkeletonPreview /> },
  { name: 'EmptyState', description: 'Zero-content placeholder with icon, title, description, and CTA.', category: 'Feedback', tags: ['empty', 'placeholder', 'cta'], preview: <EmptyStatePreview /> },
  // Layout
  { name: 'AppShell', description: 'Full-page layout with sidebar, header, and scrollable main area.', category: 'Layout', tags: ['layout', 'compound', 'responsive'], preview: <AppShellPreview /> },
  { name: 'SplitPage', description: 'Two-pane layout with resizable list and detail panels.', category: 'Layout', tags: ['layout', 'resizable', 'panels'], preview: <SplitPagePreview /> },
  // Forms
  { name: 'AutoForm', description: 'Schema-driven form generation with Zod validation.', category: 'Forms', tags: ['zod', 'schema', 'auto'], preview: <FormPreview /> },
  { name: 'DatePicker', description: 'Calendar picker with range selection and presets.', category: 'Forms', tags: ['calendar', 'range', 'presets'], preview: <DatePickerPreview /> },
  { name: 'StepForm', description: 'Multi-step wizard with progress indicator and validation per step.', category: 'Forms', tags: ['wizard', 'steps', 'validation'], preview: <StepFormPreview /> },
  // Charts
  { name: 'BarChart', description: 'Animated bar chart with tooltips and responsive sizing.', category: 'Charts', tags: ['recharts', 'animated', 'responsive'], preview: <BarChartPreview /> },
  { name: 'LineChart', description: 'Smooth area/line chart with gradient fill and data points.', category: 'Charts', tags: ['recharts', 'gradient', 'area'], preview: <LineChartPreview /> },
  { name: 'DonutChart', description: 'SVG donut chart with legend and center stat.', category: 'Charts', tags: ['svg', 'donut', 'legend'], preview: <DonutChartPreview /> },
  // Blocks
  { name: 'WorkspaceMembers', description: 'Team member list with roles, avatars, and action menus.', category: 'Blocks', tags: ['team', 'roles', 'actions'], preview: <WorkspaceMembersPreview /> },
  { name: 'FileCards', description: 'File attachment grid with type icons, sizes, and preview.', category: 'Blocks', tags: ['files', 'attachments', 'grid'], preview: <FileCardsPreview /> },
]

export const CATEGORIES = Array.from(new Set(COMPONENTS.map(c => c.category))) as ComponentCategory[]
export const TOTAL = COMPONENTS.length
