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

// ─── Theme tokens ─────────────────────────────────────────────────────────────
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
  '--chart-1': '25 95% 58%',
  '--chart-2': '142 71% 45%',
  '--chart-3': '217 91% 60%',
  '--chart-4': '38 92% 50%',
  '--chart-5': '280 65% 60%',
} as CSSProperties

const FONT_SANS = 'var(--font-geist, var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif)'
const FONT_MONO = 'var(--font-geist-mono, "JetBrains Mono", "Fira Code", ui-monospace, monospace)'
;(THEME as Record<string, string>)['--font-mono'] = FONT_MONO
;(THEME as Record<string, string>)['--font-sans'] = FONT_SANS

// ─── Shared helpers ───────────────────────────────────────────────────────────
function PreviewShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center p-4 ${className}`}
      style={{ ...THEME, background: 'hsl(var(--background))', fontFamily: FONT_SANS, WebkitFontSmoothing: 'antialiased' }}
    >
      {children}
    </div>
  )
}

const bg   = 'hsl(var(--background))'
const card = 'hsl(var(--card))'
const sec  = 'hsl(var(--secondary))'
const muted= 'hsl(var(--muted))'
const bdr  = 'hsl(var(--border))'
const fg   = 'hsl(var(--foreground))'
const mfg  = 'hsl(var(--muted-foreground))'
const pri  = 'hsl(var(--primary))'
const err  = 'hsl(var(--destructive))'
const c2   = 'hsl(var(--chart-2))'
const c3   = 'hsl(var(--chart-3))'
const c4   = 'hsl(var(--chart-4))'
const c5   = 'hsl(var(--chart-5))'

const Card = ({ children, style = {}, className = '' }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) => (
  <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 12, overflow: 'hidden', ...style }} className={className}>
    {children}
  </div>
)

// ─── Primitives ───────────────────────────────────────────────────────────────

const ButtonPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 280 }}>
      <Card style={{ padding: '20px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
          {[
            { label: 'Primary',     bg: fg,  color: bg,   shadow: `0 0 0 1px ${fg}20` },
            { label: 'Default',     bg: pri, color: 'white', shadow: `0 4px 12px ${pri}40` },
            { label: 'Outline',     bg: 'transparent', color: fg, border: `1px solid ${bdr}` },
            { label: 'Ghost',       bg: 'transparent', color: mfg },
          ].map(b => (
            <button key={b.label} style={{ padding: '5px 12px', borderRadius: 6, background: b.bg, color: b.color, fontSize: 12, fontWeight: 500, fontFamily: FONT_SANS, border: b.border ?? 'none', boxShadow: b.shadow, cursor: 'pointer' }}>
              {b.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
          <button style={{ padding: '5px 12px', borderRadius: 6, background: `${err}15`, color: err, fontSize: 12, fontWeight: 500, fontFamily: FONT_SANS, border: `1px solid ${err}30` }}>Destructive</button>
          <button style={{ padding: '5px 12px', borderRadius: 6, background: sec, color: mfg, fontSize: 12, fontFamily: FONT_SANS, border: `1px solid ${bdr}`, opacity: 0.5, cursor: 'not-allowed' }}>Disabled</button>
          <button style={{ padding: '5px 12px', borderRadius: 6, background: pri, color: 'white', fontSize: 12, fontWeight: 500, fontFamily: FONT_SANS, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            Loading
          </button>
        </div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {['sm', 'md', 'lg'].map((s, i) => (
            <button key={s} style={{ padding: `${4 + i * 2}px ${10 + i * 4}px`, borderRadius: 6, background: sec, color: fg, fontSize: 10 + i * 1, fontFamily: FONT_SANS, border: `1px solid ${bdr}` }}>{s}</button>
          ))}
        </div>
      </Card>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  </PreviewShell>
)

const InputPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 240 }}>
      <Card style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, color: mfg, marginBottom: 5, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email</div>
          <div style={{ height: 34, background: sec, border: `1px solid ${pri}50`, borderRadius: 7, padding: '0 10px 0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', boxShadow: `0 0 0 3px ${pri}10` }}>
            <svg style={{ position: 'absolute', left: 10 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={mfg} strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span style={{ fontSize: 11.5, color: fg, fontFamily: FONT_SANS }}>dave@otf.sh</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c2} strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: mfg, marginBottom: 5, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Password</div>
          <div style={{ height: 34, background: sec, border: `1px solid ${err}50`, borderRadius: 7, padding: '0 10px 0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', boxShadow: `0 0 0 3px ${err}10` }}>
            <svg style={{ position: 'absolute', left: 10 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={err} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span style={{ fontSize: 12, color: fg, letterSpacing: 3, fontFamily: FONT_SANS }}>••••••••</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={mfg} strokeWidth="1.75"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <div style={{ fontSize: 10, color: err, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            Must be 8+ characters
          </div>
        </div>
        <button style={{ height: 34, background: pri, color: 'white', borderRadius: 7, fontSize: 12, fontWeight: 600, fontFamily: FONT_SANS, border: 'none', cursor: 'pointer', boxShadow: `0 4px 12px ${pri}40` }}>
          Sign in →
        </button>
      </Card>
    </div>
  </PreviewShell>
)

const BadgePreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 260 }}>
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 9, color: mfg, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Status Labels</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {[
            { label: 'NEW',    bg: pri,            color: 'white' },
            { label: 'BETA',   bg: `${c3}18`,      color: c3,  border: `${c3}30` },
            { label: 'DONE',   bg: `${c2}18`,      color: c2,  border: `${c2}30` },
            { label: 'URGENT', bg: `${err}18`,     color: err, border: `${err}30` },
            { label: 'DRAFT',  bg: sec,            color: mfg, border: bdr },
            { label: 'PRO',    bg: `${c5}18`,      color: c5,  border: `${c5}30` },
          ].map(b => (
            <span key={b.label} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, background: b.bg, color: b.color, fontWeight: 700, fontFamily: FONT_MONO, letterSpacing: '0.06em', border: `1px solid ${b.border ?? 'transparent'}` }}>
              {b.label}
            </span>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${bdr}`, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[
            { label: 'Active',      color: c2  },
            { label: 'In Progress', color: c4  },
            { label: 'Blocked',     color: err },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}80`, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: fg }}>{s.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: mfg, fontFamily: FONT_MONO }}>·</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </PreviewShell>
)

// DiceBear lorelei — clean illustrated portrait style, professional, loads fast as SVG
const MEMBERS = [
  { seed: 'Felix',   name: 'Dave Soni',  role: 'Admin',     status: c2,  accent: pri },
  { seed: 'Riley',   name: 'Kate Lee',   role: 'Developer', status: c4,  accent: c3  },
  { seed: 'Avery',   name: 'Alex Reed',  role: 'Designer',  status: c2,  accent: c5  },
  { seed: 'Morgan',  name: 'Jordan K.',  role: 'Product',   status: mfg, accent: c2  },
]
const avatar = (seed: string, size = 36) =>
  `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}&radius=50&size=${size}&backgroundColor=transparent`

const AvatarPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 250 }}>
      <Card style={{ padding: '14px 16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: fg }}>Team</span>
          <span style={{ fontSize: 10, color: mfg, fontFamily: FONT_MONO }}>4 members</span>
        </div>

        {/* Avatar stack + status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, padding: '8px 10px', background: sec, borderRadius: 8, border: `1px solid ${bdr}` }}>
          <div style={{ display: 'flex', flexShrink: 0 }}>
            {MEMBERS.map((m, i) => (
              <div key={m.seed} style={{ width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${bg}`, marginLeft: i > 0 ? -8 : 0, zIndex: 4 - i, background: `${m.accent}22`, flexShrink: 0 }}>
                <img src={avatar(m.seed, 30)} alt={m.name} width={30} height={30} style={{ width: '100%', height: '100%', display: 'block' }} loading="lazy" />
              </div>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: fg }}>Active now</div>
            <div style={{ fontSize: 9.5, color: mfg, marginTop: 1 }}>
              <span style={{ color: c2 }}>2</span> online · <span>2</span> away
            </div>
          </div>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: c2, flexShrink: 0, boxShadow: `0 0 6px ${c2}` }} />
        </div>

        {/* Member rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {MEMBERS.slice(0, 2).map(m => (
            <div key={m.seed} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 6px', borderRadius: 6 }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', background: `${m.accent}18`, border: `1px solid ${m.accent}35` }}>
                  <img src={avatar(m.seed, 28)} alt={m.name} width={28} height={28} style={{ width: '100%', height: '100%', display: 'block' }} loading="lazy" />
                </div>
                <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: '50%', background: m.status, border: `1.5px solid ${bg}` }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: fg, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.name}</div>
                <div style={{ fontSize: 9.5, color: mfg }}>{m.role}</div>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={mfg} strokeWidth="1.5" style={{ flexShrink: 0, opacity: 0.5 }}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </PreviewShell>
)

const DialogPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 240 }}>
      <div style={{ background: `${bg}80`, borderRadius: 12, padding: 2, border: `1px solid ${bdr}` }}>
        <div style={{ borderRadius: 10, padding: 1, background: `linear-gradient(135deg, ${sec}, ${muted})`, border: `1px solid ${bdr}50` }}>
          <div style={{ borderRadius: 9, background: card, padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${err}15`, border: `1px solid ${err}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={err} strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: fg }}>Delete workspace</div>
                <div style={{ fontSize: 10, color: mfg, marginTop: 2 }}>This cannot be undone</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: mfg, lineHeight: 1.5, marginBottom: 14, padding: '8px 10px', background: sec, borderRadius: 6, border: `1px solid ${bdr}` }}>
              All projects, members, and data will be <span style={{ color: err }}>permanently removed</span>.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, height: 30, borderRadius: 6, border: `1px solid ${bdr}`, background: 'transparent', color: mfg, fontSize: 11, fontFamily: FONT_SANS, cursor: 'pointer' }}>Cancel</button>
              <button style={{ flex: 1, height: 30, borderRadius: 6, border: 'none', background: err, color: 'white', fontSize: 11, fontWeight: 600, fontFamily: FONT_SANS, cursor: 'pointer', boxShadow: `0 4px 10px ${err}30` }}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PreviewShell>
)

const SelectPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 210 }}>
      <Card>
        <div style={{ padding: '10px 12px', borderBottom: `1px solid ${bdr}` }}>
          <div style={{ fontSize: 9, color: mfg, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Status</div>
          <div style={{ height: 32, background: sec, borderRadius: 6, border: `1px solid ${pri}50`, padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: `0 0 0 2px ${pri}15` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: c4 }} />
              <span style={{ fontSize: 11.5, color: fg }}>In Progress</span>
            </div>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={mfg} strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
        <div style={{ padding: '4px' }}>
          {[
            { label: 'Backlog',     color: mfg },
            { label: 'Todo',        color: c3 },
            { label: 'In Progress', color: c4, active: true },
            { label: 'Done',        color: c2 },
            { label: 'Cancelled',   color: err },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 5, background: s.active ? `${pri}12` : 'transparent' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: s.active ? fg : mfg, fontWeight: s.active ? 500 : 400 }}>{s.label}</span>
              {s.active && <svg style={{ marginLeft: 'auto' }} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={pri} strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  </PreviewShell>
)

const TooltipPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 240 }}>
      <Card style={{ padding: '20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 8 }}>
          {[
            { label: 'Archive', icon: '⌘A', tip: 'Archive item', placement: 'top' },
            { label: 'Delete',  icon: '⌘⌫', tip: 'Delete forever', placement: 'top', danger: true },
          ].map(t => (
            <div key={t.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ padding: '3px 8px', borderRadius: 5, background: sec, border: `1px solid ${bdr}`, fontSize: 9, fontFamily: FONT_MONO, color: mfg, whiteSpace: 'nowrap', boxShadow: `0 2px 8px ${bg}80` }}>
                {t.tip}
              </div>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: bdr, marginTop: -3 }} />
              <button style={{ height: 28, padding: '0 12px', borderRadius: 6, background: t.danger ? `${err}12` : sec, border: `1px solid ${t.danger ? `${err}30` : bdr}`, color: t.danger ? err : fg, fontSize: 11, fontFamily: FONT_SANS, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                <span>{t.label}</span>
                <kbd style={{ fontSize: 9, background: muted, borderRadius: 3, padding: '1px 4px', color: mfg, fontFamily: FONT_MONO }}>{t.icon}</kbd>
              </button>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${bdr}`, paddingTop: 12, textAlign: 'center', fontSize: 10, color: mfg }}>
          Hover to reveal tooltips with keyboard shortcuts
        </div>
      </Card>
    </div>
  </PreviewShell>
)

const CheckboxPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 220 }}>
      <Card style={{ padding: 14 }}>
        <div style={{ fontSize: 9, color: mfg, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Project features</div>
        {[
          { label: 'TypeScript strict mode', checked: true },
          { label: 'Dark mode support',      checked: true },
          { label: 'Animation system',       checked: true },
          { label: 'E2E tests',              checked: false },
          { label: 'Storybook docs',         checked: false },
        ].map((item, i) => (
          <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '5px 0', cursor: 'pointer' }}>
            <div style={{ width: 15, height: 15, borderRadius: 4, background: item.checked ? pri : 'transparent', border: `1.5px solid ${item.checked ? pri : bdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 150ms', boxShadow: item.checked ? `0 2px 6px ${pri}40` : 'none' }}>
              {item.checked && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>}
            </div>
            <span style={{ fontSize: 11.5, color: item.checked ? fg : mfg }}>{item.label}</span>
            {item.checked && <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: pri }} />}
          </label>
        ))}
      </Card>
    </div>
  </PreviewShell>
)

const TabsPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 240 }}>
      <Card style={{ overflow: 'visible' }}>
        <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${bdr}` }}>
          {[
            { label: 'Overview', active: true },
            { label: 'Issues', count: '12' },
            { label: 'Members', count: '5' },
          ].map(t => (
            <button key={t.label} style={{ padding: '9px 14px', fontSize: 11, fontWeight: t.active ? 600 : 400, color: t.active ? fg : mfg, background: 'transparent', border: 'none', borderBottom: `2px solid ${t.active ? pri : 'transparent'}`, cursor: 'pointer', fontFamily: FONT_SANS, display: 'flex', alignItems: 'center', gap: 5, marginBottom: -1 }}>
              {t.label}
              {t.count && <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 10, background: sec, color: mfg, fontFamily: FONT_MONO }}>{t.count}</span>}
            </button>
          ))}
        </div>
        <div style={{ padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            {[
              { label: 'Velocity', value: '89%', color: c2 },
              { label: 'Open issues', value: '12', color: c4 },
            ].map(s => (
              <div key={s.label} style={{ padding: '10px 12px', background: sec, borderRadius: 7, border: `1px solid ${bdr}` }}>
                <div style={{ fontSize: 9, color: mfg, marginBottom: 4, fontFamily: FONT_MONO }}>{s.label.toUpperCase()}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[55, 70, 40].map((w, i) => (
              <div key={i} style={{ height: 4, borderRadius: 2, background: sec, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${w}%`, borderRadius: 2, background: `linear-gradient(to right, ${pri}60, ${pri})` }} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  </PreviewShell>
)

const SliderPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 240 }}>
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 9, color: mfg, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Audio controls</div>
        {[
          { label: 'Volume',  val: 65, color: pri },
          { label: 'Bass',    val: 40, color: c3  },
          { label: 'Treble',  val: 80, color: c2  },
        ].map(s => (
          <div key={s.label} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: fg }}>{s.label}</span>
              <span style={{ fontSize: 10, color: s.color, fontFamily: FONT_MONO, fontWeight: 600 }}>{s.val}%</span>
            </div>
            <div style={{ position: 'relative', height: 4, background: muted, borderRadius: 2, cursor: 'pointer' }}>
              <div style={{ position: 'absolute', inset: '0 auto 0 0', width: `${s.val}%`, background: `linear-gradient(to right, ${s.color}60, ${s.color})`, borderRadius: 2 }} />
              <div style={{ position: 'absolute', top: '50%', left: `${s.val}%`, transform: 'translate(-50%, -50%)', width: 14, height: 14, borderRadius: '50%', background: 'white', border: `2px solid ${s.color}`, boxShadow: `0 2px 6px ${s.color}50` }} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  </PreviewShell>
)

// ─── Data Display ─────────────────────────────────────────────────────────────

const DataGridPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 480 }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${bdr}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: fg }}>Issues</span>
            <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 5, background: sec, color: mfg, fontFamily: FONT_MONO }}>4</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ height: 26, padding: '0 10px', borderRadius: 5, border: `1px solid ${bdr}`, background: 'transparent', color: mfg, fontSize: 10.5, fontFamily: FONT_SANS, cursor: 'pointer' }}>Filter</button>
            <button style={{ height: 26, padding: '0 10px', borderRadius: 5, border: 'none', background: pri, color: 'white', fontSize: 10.5, fontWeight: 600, fontFamily: FONT_SANS, cursor: 'pointer', boxShadow: `0 2px 8px ${pri}40` }}>+ New</button>
          </div>
        </div>
        <div style={{ padding: '0 4px 4px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px 70px', padding: '6px 12px', gap: 8 }}>
            {['ID', 'Title', 'Status', 'Priority'].map(h => (
              <span key={h} style={{ fontSize: 10, color: mfg, fontWeight: 500, fontFamily: FONT_MONO }}>{h}</span>
            ))}
          </div>
          {[
            { id: '#101', title: 'Auth guards', status: 'Done',        sColor: c2,  priority: 'High',   pColor: pri },
            { id: '#102', title: 'Build DataGrid', status: 'In Progress', sColor: c4, priority: 'Urgent', pColor: err },
            { id: '#103', title: 'Polish hero', status: 'Todo',        sColor: c3,  priority: 'Medium', pColor: c4 },
            { id: '#104', title: 'AI prompts',  status: 'Backlog',     sColor: mfg, priority: 'Low',    pColor: mfg },
          ].map((r, i) => (
            <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px 70px', padding: '8px 12px', borderRadius: 6, gap: 8, background: i === 1 ? `${pri}06` : 'transparent', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: mfg, fontFamily: FONT_MONO }}>{r.id}</span>
              <span style={{ fontSize: 11.5, color: fg, fontWeight: 500 }}>{r.title}</span>
              <span style={{ fontSize: 11, color: r.sColor, display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: r.sColor, flexShrink: 0 }} />{r.status}
              </span>
              <span style={{ fontSize: 11, color: r.pColor, fontWeight: 500 }}>{r.priority}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </PreviewShell>
)

const TimelinePreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 270 }}>
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: fg, marginBottom: 14 }}>Recent activity</div>
        {[
          { label: 'Issue #101 created',      sub: 'by Dave Soni',       time: '2m ago',  color: pri, icon: '+' },
          { label: 'Assigned to Kate Lee',    sub: 'Engineering lead',   time: '5m ago',  color: c3,  icon: '→' },
          { label: 'Status: In Progress',     sub: 'Sprint 4',           time: '12m ago', color: c4,  icon: '↻' },
          { label: 'Comment added',           sub: '"Looks great!"',     time: '1h ago',  color: mfg, icon: '·' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 3 ? 12 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${item.color}18`, border: `1px solid ${item.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: item.color, flexShrink: 0 }}>{item.icon}</div>
              {i < 3 && <div style={{ width: 1, flex: 1, background: `${item.color}18`, marginTop: 4 }} />}
            </div>
            <div style={{ paddingBottom: i < 3 ? 8 : 0 }}>
              <div style={{ fontSize: 11.5, color: fg, fontWeight: 500, lineHeight: 1.3 }}>{item.label}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                <span style={{ fontSize: 10, color: mfg }}>{item.sub}</span>
                <span style={{ fontSize: 10, color: `${mfg}70`, fontFamily: FONT_MONO }}>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  </PreviewShell>
)

const MetricCardPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { label: 'MRR',       value: '$4,820', trend: '+18%', icon: '↗', tColor: c2,  bg: `${c2}10`  },
          { label: 'Users',     value: '1,240',  trend: '+7%',  icon: '↗', tColor: pri, bg: `${pri}10` },
          { label: 'Churn',     value: '2.1%',   trend: '−0.4%',icon: '↘', tColor: c2,  bg: `${c2}10`  },
          { label: 'Open Bugs', value: '12',      trend: '+3',  icon: '↗', tColor: err, bg: `${err}10` },
        ].map(m => (
          <div key={m.label} style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 9, color: mfg, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, fontFamily: FONT_MONO }}>{m.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: fg, letterSpacing: '-0.02em', lineHeight: 1 }}>{m.value}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, marginTop: 6, padding: '2px 6px', borderRadius: 5, background: m.bg }}>
              <span style={{ fontSize: 9, color: m.tColor, fontWeight: 700 }}>{m.icon}</span>
              <span style={{ fontSize: 9.5, color: m.tColor, fontWeight: 600, fontFamily: FONT_MONO }}>{m.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </PreviewShell>
)

const ProgressPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 250 }}>
      <Card style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: fg, marginBottom: 14 }}>Sprint progress</div>
        {[
          { label: 'Sprint 4',   val: 72, color: pri,  sub: '18 of 25 tasks' },
          { label: 'Q2 Goals',   val: 45, color: c3,   sub: '9 of 20 goals'  },
          { label: 'Onboarding', val: 90, color: c2,   sub: '27 of 30 steps' },
        ].map(p => (
          <div key={p.label} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
              <div>
                <span style={{ fontSize: 11.5, color: fg, fontWeight: 500 }}>{p.label}</span>
                <span style={{ fontSize: 9.5, color: mfg, marginLeft: 6 }}>{p.sub}</span>
              </div>
              <span style={{ fontSize: 11, color: p.color, fontFamily: FONT_MONO, fontWeight: 600 }}>{p.val}%</span>
            </div>
            <div style={{ height: 5, background: muted, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${p.val}%`, background: `linear-gradient(to right, ${p.color}70, ${p.color})`, borderRadius: 3, boxShadow: `0 0 6px ${p.color}40` }} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  </PreviewShell>
)

const KanbanPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 400, display: 'flex', gap: 10 }}>
      {[
        { label: 'Todo',        color: c3,  cards: ['Design login page', 'Write API docs'] },
        { label: 'In Progress', color: c4,  cards: ['Auth flow', 'Payment integration'] },
        { label: 'Done',        color: c2,  cards: ['CI/CD setup', 'DB schema', 'Setup'] },
      ].map(col => (
        <div key={col.label} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 2px 6px', borderBottom: `2px solid ${col.color}40` }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: col.color, boxShadow: `0 0 6px ${col.color}80` }} />
            <span style={{ fontSize: 10.5, fontWeight: 600, color: fg }}>{col.label}</span>
            <span style={{ marginLeft: 'auto', fontSize: 9, color: mfg, fontFamily: FONT_MONO, background: sec, padding: '1px 5px', borderRadius: 4, border: `1px solid ${bdr}` }}>{col.cards.length}</span>
          </div>
          {col.cards.map((card, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 7, padding: '7px 9px', borderLeft: `2px solid ${col.color}50` }}>
              <div style={{ fontSize: 10.5, color: fg, fontWeight: 500, lineHeight: 1.3, marginBottom: 5 }}>{card}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: `${col.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: col.color, fontWeight: 700 }}>
                  {['MS','KL','AR'][i % 3]}
                </div>
                <div style={{ height: 3, width: 28, background: muted, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${[70, 40, 90, 55, 30][i] || 60}%`, background: col.color, borderRadius: 2 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </PreviewShell>
)

const TextureCardPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 230 }}>
      {/* 4-layer nested border — the signature texture card */}
      <div style={{ borderRadius: 14, padding: 2, background: `linear-gradient(135deg, ${sec}dd, ${muted}aa)`, border: `1px solid ${bdr}` }}>
        <div style={{ borderRadius: 12, padding: 1.5, border: `1px solid ${bdr}60` }}>
          <div style={{ borderRadius: 10.5, padding: 1, border: `1px solid ${bdr}40` }}>
            <div style={{ borderRadius: 9.5, background: card, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: `${pri}18`, border: `1px solid ${pri}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: pri }}>M</span>
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: fg }}>Dave Soni</div>
                  <div style={{ fontSize: 10, color: mfg }}>Admin · dave@otf.sh</div>
                </div>
                <div style={{ marginLeft: 'auto', padding: '2px 7px', borderRadius: 5, background: `${c2}15`, border: `1px solid ${c2}30`, fontSize: 9, color: c2, fontFamily: FONT_MONO }}>PRO</div>
              </div>
              <div style={{ display: 'flex', gap: 14, padding: '10px 0', borderTop: `1px solid ${bdr}`, borderBottom: `1px solid ${bdr}`, marginBottom: 10 }}>
                {[{ v: '23', l: 'Projects' }, { v: '142', l: 'Issues' }, { v: '4.9', l: 'Rating' }].map(s => (
                  <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: fg }}>{s.v}</div>
                    <div style={{ fontSize: 9, color: mfg, marginTop: 1 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 7 }}>
                <button style={{ flex: 1, height: 27, borderRadius: 6, border: `1px solid ${bdr}`, background: 'transparent', color: mfg, fontSize: 10.5, fontFamily: FONT_SANS }}>Message</button>
                <button style={{ flex: 1, height: 27, borderRadius: 6, border: 'none', background: pri, color: 'white', fontSize: 10.5, fontWeight: 600, fontFamily: FONT_SANS, boxShadow: `0 2px 8px ${pri}40` }}>Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PreviewShell>
)

// ─── Navigation ───────────────────────────────────────────────────────────────

const SidebarPreview = () => (
  <PreviewShell className="!p-0">
    <div style={{ width: '100%', height: '100%', display: 'flex', background: bg }}>
      <div style={{ width: 155, background: card, borderRight: `1px solid ${bdr}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '12px 12px 10px', borderBottom: `1px solid ${bdr}`, display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: pri, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: 10, fontWeight: 900 }}>O</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: fg }}>OTF</span>
          <svg style={{ marginLeft: 'auto' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={mfg} strokeWidth="1.5"><path d="m6 9 6 6 6-6"/></svg>
        </div>
        <div style={{ flex: 1, padding: '8px 6px', overflowY: 'auto' }}>
          <div style={{ fontSize: 9, color: mfg, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 6px 6px' }}>Workspace</div>
          {[
            { label: 'Dashboard', icon: '⊞', active: true, badge: null },
            { label: 'Issues',    icon: '◎', active: false, badge: '12' },
            { label: 'Projects',  icon: '⬡', active: false, badge: null },
            { label: 'Members',   icon: '◉', active: false, badge: null },
            { label: 'Settings',  icon: '⚙', active: false, badge: null },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 8px', borderRadius: 5, background: item.active ? `${pri}12` : 'transparent', marginBottom: 1, cursor: 'pointer', borderLeft: item.active ? `2px solid ${pri}` : '2px solid transparent' }}>
              <span style={{ fontSize: 11, color: item.active ? pri : mfg }}>{item.icon}</span>
              <span style={{ fontSize: 11, color: item.active ? fg : mfg, fontWeight: item.active ? 500 : 400 }}>{item.label}</span>
              {item.badge && <span style={{ marginLeft: 'auto', fontSize: 9, background: sec, color: mfg, borderRadius: 4, padding: '1px 5px', fontFamily: FONT_MONO, border: `1px solid ${bdr}` }}>{item.badge}</span>}
            </div>
          ))}
        </div>
        <div style={{ padding: '8px 10px', borderTop: `1px solid ${bdr}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: pri, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white' }}>MS</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10.5, color: fg, fontWeight: 500 }}>Dave Soni</div>
            <div style={{ fontSize: 9, color: mfg }}>Free plan</div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, padding: 14, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: fg, marginBottom: 10 }}>Dashboard</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
          {[{ l: 'Velocity', v: '89%', c: c2 }, { l: 'Open', v: '12', c: c4 }, { l: 'Closed', v: '48', c: c2 }, { l: 'Team', v: '5', c: c3 }].map(s => (
            <div key={s.l} style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 7, padding: '8px 10px' }}>
              <div style={{ fontSize: 9, color: mfg, marginBottom: 3, fontFamily: FONT_MONO }}>{s.l.toUpperCase()}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PreviewShell>
)

const CommandPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 240 }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: `0 24px 48px ${bg}80, 0 0 0 1px ${bdr}`, background: card }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderBottom: `1px solid ${bdr}` }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={mfg} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize: 12, color: mfg, flex: 1, fontFamily: FONT_SANS }}>Search or jump to…</span>
          <span style={{ fontSize: 9, border: `1px solid ${bdr}`, borderRadius: 4, padding: '1px 5px', color: mfg, fontFamily: FONT_MONO, background: muted }}>⌘K</span>
        </div>
        <div style={{ padding: 4 }}>
          <div style={{ fontSize: 9, color: mfg, padding: '5px 8px 3px', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: FONT_MONO }}>Navigate</div>
          {[
            { icon: '⌘', label: 'New Issue',        shortcut: 'C',  active: false },
            { icon: '/', label: 'Search Everything', shortcut: 'K',  active: false },
            { icon: '→', label: 'Go to Dashboard',  shortcut: '',   active: true  },
            { icon: '◎', label: 'Switch Workspace',  shortcut: '',   active: false },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 8px', borderRadius: 6, background: item.active ? `${pri}12` : 'transparent' }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: item.active ? `${pri}20` : sec, border: `1px solid ${item.active ? `${pri}30` : bdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 10, color: item.active ? pri : mfg }}>{item.icon}</span>
              </div>
              <span style={{ fontSize: 11.5, color: item.active ? fg : mfg, flex: 1 }}>{item.label}</span>
              {item.shortcut && <kbd style={{ fontSize: 9, background: muted, border: `1px solid ${bdr}`, borderRadius: 3, padding: '1px 5px', color: mfg, fontFamily: FONT_MONO }}>⌘{item.shortcut}</kbd>}
            </div>
          ))}
        </div>
        <div style={{ padding: '6px 12px', borderTop: `1px solid ${bdr}`, display: 'flex', gap: 12 }}>
          {[['↑↓','navigate'],['↵','open'],['esc','close']].map(([k,l]) => (
            <span key={k} style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 9, color: mfg }}>
              <kbd style={{ background: muted, border: `1px solid ${bdr}`, borderRadius: 3, padding: '1px 4px', fontFamily: FONT_MONO }}>{k}</kbd>{l}
            </span>
          ))}
        </div>
      </div>
    </div>
  </PreviewShell>
)

const BreadcrumbPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 260 }}>
      <Card style={{ padding: 14 }}>
        <div style={{ fontSize: 9, color: mfg, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Location</div>
        {[
          ['OTF', 'Projects', 'Dashboard', 'Issues'],
          ['Settings', 'Team', 'Billing'],
        ].map((crumbs, ri) => (
          <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: ri === 0 ? 10 : 0, padding: '7px 10px', background: sec, borderRadius: 6, border: `1px solid ${bdr}` }}>
            {crumbs.map((s, i) => (
              <React.Fragment key={s}>
                <span style={{ fontSize: 11, color: i === crumbs.length - 1 ? (ri === 1 ? pri : fg) : mfg, fontWeight: i === crumbs.length - 1 ? 600 : 400, whiteSpace: 'nowrap' } as React.CSSProperties}>
                  {s}
                </span>
                {i < crumbs.length - 1 && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={bdr} strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>}
              </React.Fragment>
            ))}
          </div>
        ))}
      </Card>
    </div>
  </PreviewShell>
)

// ─── Feedback ─────────────────────────────────────────────────────────────────

const ToastPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 260, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        { icon: '✓', title: 'Issue created',     sub: 'OTF-105 added to backlog',  color: c2,  bg: `${c2}10`,  border: `${c2}25` },
        { icon: '!', title: 'Deploy failed',      sub: 'Build error on main branch', color: err, bg: `${err}10`, border: `${err}25` },
        { icon: 'ℹ', title: 'Update available',  sub: 'OTF v2.1 is ready',         color: c3,  bg: `${c3}10`,  border: `${c3}25` },
      ].map(t => (
        <div key={t.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 9, background: t.bg, border: `1px solid ${t.border}`, boxShadow: `0 4px 12px ${bg}60` }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: `${t.color}20`, border: `1px solid ${t.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: t.color }}>
            {t.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: fg }}>{t.title}</div>
            <div style={{ fontSize: 10, color: mfg, marginTop: 1 }}>{t.sub}</div>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={mfg} strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}><path d="M18 6 6 18M6 6l12 12"/></svg>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const AlertPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 260, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        { title: 'Payment succeeded',  desc: 'Subscription renewed.',         icon: '✓', color: c2,  bg: `${c2}08`,  border: `${c2}25` },
        { title: 'Action required',    desc: 'Verify your email to continue.', icon: '⚠', color: c4,  bg: `${c4}08`,  border: `${c4}25` },
        { title: 'Feature deprecated', desc: 'Migrate to the new API soon.',   icon: 'ℹ', color: c3,  bg: `${c3}08`,  border: `${c3}25` },
      ].map(a => (
        <div key={a.title} style={{ display: 'flex', gap: 10, padding: '9px 12px', borderRadius: 8, background: a.bg, border: `1px solid ${a.border}`, borderLeft: `3px solid ${a.color}` }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: a.color, flexShrink: 0, marginTop: 1 }}>{a.icon}</span>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: fg }}>{a.title}</div>
            <div style={{ fontSize: 10, color: mfg, marginTop: 2 }}>{a.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </PreviewShell>
)

const SkeletonPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 250 }}>
      <Card style={{ padding: 14 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: sec, animation: 'pulse 1.5s ease-in-out infinite' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 11, background: sec, borderRadius: 4, width: '65%', animation: 'pulse 1.5s ease-in-out infinite' }} />
            <div style={{ height: 9, background: muted, borderRadius: 4, width: '45%', animation: 'pulse 1.5s ease-in-out 0.2s infinite' }} />
          </div>
          <div style={{ width: 50, height: 18, background: sec, borderRadius: 4, animation: 'pulse 1.5s ease-in-out infinite' }} />
        </div>
        <div style={{ height: 70, background: sec, borderRadius: 8, marginBottom: 12, animation: 'pulse 1.5s ease-in-out infinite', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', animation: 'shimmer 1.8s linear infinite' }} />
        </div>
        {[80, 65, 45].map((w, i) => (
          <div key={i} style={{ height: 8, background: muted, borderRadius: 4, width: `${w}%`, marginBottom: 6, animation: `pulse 1.5s ease-in-out ${i * 0.15}s infinite` }} />
        ))}
      </Card>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
      `}</style>
    </div>
  </PreviewShell>
)

const EmptyStatePreview = () => (
  <PreviewShell>
    <div style={{ textAlign: 'center', width: '100%', maxWidth: 220 }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: sec, border: `1px solid ${bdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={mfg} strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: fg, marginBottom: 5 }}>No issues yet</div>
      <div style={{ fontSize: 11, color: mfg, lineHeight: 1.5, marginBottom: 14 }}>Create your first issue to start tracking work with your team.</div>
      <button style={{ height: 32, padding: '0 16px', borderRadius: 7, background: pri, color: 'white', fontSize: 11.5, fontWeight: 600, fontFamily: FONT_SANS, border: 'none', cursor: 'pointer', boxShadow: `0 4px 12px ${pri}40` }}>
        + Create issue
      </button>
      <div style={{ marginTop: 10, fontSize: 10, color: `${mfg}70` }}>or drag & drop from another board</div>
    </div>
  </PreviewShell>
)

// ─── Layout ───────────────────────────────────────────────────────────────────

const AppShellPreview = () => (
  <PreviewShell className="!p-0">
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: bg }}>
      <div style={{ height: 32, background: card, borderBottom: `1px solid ${bdr}`, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: 18, width: 100, background: sec, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: mfg, fontFamily: FONT_MONO }}>app.otf.sh</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, background: sec, border: `1px solid ${bdr}` }} />
          <div style={{ width: 18, height: 18, borderRadius: 4, background: sec, border: `1px solid ${bdr}` }} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ width: 130, background: card, borderRight: `1px solid ${bdr}`, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
          {['Dashboard','Projects','Team','Settings'].map((l, i) => (
            <div key={l} style={{ padding: '5px 8px', borderRadius: 5, background: i===0 ? `${pri}12` : 'transparent', fontSize: 11, color: i===0 ? fg : mfg, fontWeight: i===0 ? 500 : 400, borderLeft: i===0 ? `2px solid ${pri}` : '2px solid transparent' }}>
              {l}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: fg, marginBottom: 10 }}>Dashboard</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 8 }}>
            {[{l:'Revenue',v:'$48k',c:pri},{l:'Users',v:'2,847',c:c3},{l:'Orders',v:'384',c:c4},{l:'Rate',v:'3.24%',c:c2}].map(s => (
              <div key={s.l} style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 7, padding: '7px 9px' }}>
                <div style={{ fontSize: 8.5, color: mfg, marginBottom: 2, fontFamily: FONT_MONO }}>{s.l.toUpperCase()}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: s.c }}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 7, padding: '6px 8px' }}>
            {[['Alpha','Active','Design'],['Beta','Review','Eng']].map(r => (
              <div key={r[0]} style={{ display: 'flex', gap: 8, padding: '4px 0', borderBottom: `1px solid ${bdr}40`, fontSize: 10 }}>
                <span style={{ color: fg, flex: 1 }}>{r[0]}</span>
                <span style={{ color: c2, width: 45 }}>{r[1]}</span>
                <span style={{ color: mfg }}>{r[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </PreviewShell>
)

const SplitPagePreview = () => (
  <PreviewShell className="!p-0">
    <div style={{ width: '100%', height: '100%', display: 'flex', background: bg }}>
      <div style={{ width: 145, background: card, borderRight: `1px solid ${bdr}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '10px 12px 8px', borderBottom: `1px solid ${bdr}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: fg }}>Inbox</span>
          <span style={{ fontSize: 9, background: `${pri}20`, color: pri, borderRadius: 4, padding: '1px 6px', fontFamily: FONT_MONO }}>4</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {[
            { title: 'Team meeting notes',         unread: true },
            { title: 'Q4 report draft',             unread: false },
            { title: 'Design review feedback',      unread: true },
            { title: 'Onboarding docs',             unread: false },
            { title: 'Release changelog',           unread: false },
          ].map((i, idx) => (
            <div key={idx} style={{ padding: '8px 12px', borderBottom: `1px solid ${bdr}40`, background: idx === 0 ? `${pri}06` : 'transparent', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                {i.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: pri, flexShrink: 0, marginTop: 3 }} />}
                <span style={{ fontSize: 10.5, color: idx === 0 ? fg : mfg, fontWeight: i.unread ? 600 : 400, lineHeight: 1.3 }}>{i.title}</span>
              </div>
              <div style={{ fontSize: 9, color: `${mfg}60`, marginTop: 3, marginLeft: i.unread ? 12 : 0 }}>2 hours ago</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: '14px 16px', minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: fg, marginBottom: 6 }}>Team meeting notes</div>
        <div style={{ fontSize: 10, color: mfg, marginBottom: 12, display: 'flex', gap: 8 }}>
          <span>Dave Soni</span>
          <span>·</span>
          <span>2 hours ago</span>
        </div>
        <div style={{ fontSize: 11, color: mfg, lineHeight: 1.6, marginBottom: 12 }}>Discussed Q4 roadmap priorities and team velocity. Action items assigned to engineering leads. Next sync in two weeks.</div>
        <div style={{ display: 'flex', gap: 7 }}>
          <div style={{ flex: 1, height: 28, background: sec, borderRadius: 6, border: `1px solid ${bdr}`, display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
            <span style={{ fontSize: 10, color: `${mfg}60` }}>Reply…</span>
          </div>
          <button style={{ height: 28, padding: '0 12px', background: pri, borderRadius: 6, border: 'none', color: 'white', fontSize: 11, fontWeight: 600, fontFamily: FONT_SANS, boxShadow: `0 2px 8px ${pri}40` }}>Send</button>
        </div>
      </div>
    </div>
  </PreviewShell>
)

// ─── Forms ────────────────────────────────────────────────────────────────────

const FormPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 240 }}>
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: fg, marginBottom: 14 }}>Profile settings</div>
        {[
          { label: 'Display name', value: 'Dave Soni',  type: 'text',  valid: true },
          { label: 'Username',     value: '@dave',      type: 'text',  valid: true },
          { label: 'Email',        value: 'dave@otf.sh',type: 'email', valid: true },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 9.5, color: mfg, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>{f.label}</div>
            <div style={{ height: 32, background: sec, border: `1px solid ${bdr}`, borderRadius: 6, padding: '0 10px 0 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
              <svg style={{ position: 'absolute', left: 9 }} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={mfg} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span style={{ fontSize: 11, color: fg }}>{f.value}</span>
              {f.valid && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c2} strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>}
            </div>
          </div>
        ))}
        <button style={{ width: '100%', height: 32, background: pri, color: 'white', borderRadius: 7, fontSize: 12, fontWeight: 600, fontFamily: FONT_SANS, border: 'none', cursor: 'pointer', marginTop: 6, boxShadow: `0 4px 12px ${pri}40` }}>
          Save changes
        </button>
      </Card>
    </div>
  </PreviewShell>
)

const DatePickerPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 215 }}>
      <Card style={{ padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button style={{ width: 22, height: 22, borderRadius: 5, background: sec, border: `1px solid ${bdr}`, color: mfg, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: fg, textAlign: 'center' }}>April 2026</div>
          </div>
          <button style={{ width: 22, height: 22, borderRadius: 5, background: sec, border: `1px solid ${bdr}`, color: mfg, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 9, color: mfg, fontFamily: FONT_MONO, padding: '2px 0', fontWeight: 500 }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {[...Array(5).fill(null), ...Array(25).fill(null)].map((_, i) => {
            const day = i - 4
            const isSelected = day === 25
            const isToday = day === 27
            const inRange = day >= 20 && day <= 25
            return (
              <div key={i} style={{ textAlign: 'center', fontSize: 11, padding: '4px 2px', borderRadius: 5, fontFamily: FONT_SANS, cursor: day > 0 ? 'pointer' : 'default', background: isSelected ? pri : inRange ? `${pri}20` : 'transparent', color: isSelected ? 'white' : isToday ? pri : day > 0 ? fg : 'transparent', fontWeight: isSelected || isToday ? 700 : 400, border: isToday && !isSelected ? `1px solid ${pri}50` : '1px solid transparent' }}>
                {day > 0 ? day : ''}
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: 10, padding: '7px 10px', background: `${pri}10`, borderRadius: 6, border: `1px solid ${pri}25`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10.5, color: fg, fontWeight: 500 }}>Apr 20 → Apr 25, 2026</span>
          <span style={{ fontSize: 9.5, color: pri, fontFamily: FONT_MONO }}>6 days</span>
        </div>
      </Card>
    </div>
  </PreviewShell>
)

// ─── Charts ───────────────────────────────────────────────────────────────────

const BarChartPreview = () => {
  const bars = [40, 65, 45, 80, 60, 90, 75, 85, 70, 95, 82, 100]
  return (
    <PreviewShell>
      <div style={{ width: '100%', maxWidth: 320 }}>
        <Card style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: fg }}>Issue Velocity</div>
              <div style={{ fontSize: 10, color: mfg, marginTop: 2 }}>Last 12 weeks</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: pri, letterSpacing: '-0.02em' }}>+34%</div>
              <div style={{ fontSize: 9.5, color: mfg }}>vs last period</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 70, marginBottom: 8 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, borderRadius: '3px 3px 0 0', background: i >= 10 ? pri : `${pri}${Math.round((20 + i * 6) * 255 / 100).toString(16).padStart(2,'0')}`, height: `${h}%`, boxShadow: i >= 10 ? `0 -2px 8px ${pri}50` : 'none', transition: 'opacity 200ms' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 6, borderTop: `1px solid ${bdr}` }}>
            {['Jan','Mar','May','Jul','Sep','Nov'].map(m => (
              <span key={m} style={{ fontSize: 9, color: mfg, fontFamily: FONT_MONO }}>{m}</span>
            ))}
          </div>
        </Card>
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
      <div style={{ width: '100%', maxWidth: 320 }}>
        <Card style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: fg }}>MRR Growth</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: fg, letterSpacing: '-0.02em' }}>$4,820</span>
                <span style={{ fontSize: 10, color: c2, background: `${c2}15`, padding: '2px 6px', borderRadius: 5, fontWeight: 600 }}>↗ +18%</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['1M','3M','1Y'].map((t, i) => (
                <button key={t} style={{ padding: '3px 7px', borderRadius: 4, background: i===2 ? `${pri}15` : 'transparent', color: i===2 ? pri : mfg, fontSize: 9.5, fontFamily: FONT_MONO, border: `1px solid ${i===2 ? `${pri}30` : 'transparent'}` }}>{t}</button>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ width: '100%', height: 70 }}>
            <defs>
              <linearGradient id="line-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={pri} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={pri} stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[25, 50, 75].map(y => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={bdr} strokeWidth="0.4" strokeDasharray="2 2"/>
            ))}
            <polygon points={`0,100 ${svgPoints} 100,100`} fill="url(#line-grad)"/>
            <polyline points={svgPoints} fill="none" stroke={pri} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx={(11/11)*100} cy={100 - norm(points[11])} r="2.5" fill={pri} filter={`drop-shadow(0 0 3px ${pri})`}/>
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {['Jan','Mar','May','Jul','Sep','Nov'].map(m => (
              <span key={m} style={{ fontSize: 9, color: mfg, fontFamily: FONT_MONO }}>{m}</span>
            ))}
          </div>
        </Card>
      </div>
    </PreviewShell>
  )
}

const DonutChartPreview = () => {
  const segs = [
    { label: 'Done',        pct: 36, color: c2 },
    { label: 'In Progress', pct: 24, color: c4 },
    { label: 'Todo',        pct: 24, color: c3 },
    { label: 'Backlog',     pct: 16, color: mfg },
  ]
  const r = 14, C = 2 * Math.PI * r
  return (
    <PreviewShell>
      <div style={{ width: '100%', maxWidth: 250 }}>
        <Card style={{ padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: fg, marginBottom: 14 }}>Issue distribution</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: 80, height: 80 }}>
                {segs.reduce((acc, s, i) => {
                  const da = (s.pct / 100) * C
                  acc.els.push(<circle key={i} cx="18" cy="18" r={r} fill="none" stroke={s.color} strokeWidth="4.5" strokeDasharray={`${da} ${C - da}`} strokeDashoffset={-acc.off}/>)
                  acc.off += da
                  return acc
                }, { els: [] as React.ReactNode[], off: 0 }).els}
                <circle cx="18" cy="18" r="9" fill={card}/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: fg, lineHeight: 1 }}>50</div>
                <div style={{ fontSize: 8.5, color: mfg, marginTop: 1 }}>total</div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {segs.map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }}/>
                  <span style={{ fontSize: 10.5, color: mfg, flex: 1 }}>{s.label}</span>
                  <span style={{ fontSize: 11, color: s.color, fontWeight: 700, fontFamily: FONT_MONO }}>{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </PreviewShell>
  )
}

// ─── Blocks ───────────────────────────────────────────────────────────────────

const WorkspaceMembersPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 260 }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: `1px solid ${bdr}` }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: fg }}>Team members</span>
          <button style={{ height: 24, padding: '0 10px', borderRadius: 5, background: `${pri}12`, border: `1px solid ${pri}25`, color: pri, fontSize: 10.5, fontFamily: FONT_SANS }}>+ Invite</button>
        </div>
        <div style={{ padding: '6px 8px' }}>
          {[
            { name: 'Dave Soni', role: 'Admin',     init: 'MS', color: pri, status: c2,  badge: 'Owner' },
            { name: 'Sarah K.',  role: 'Developer', init: 'SK', color: c3,  status: c2 },
            { name: 'Alex R.',   role: 'Designer',  init: 'AR', color: c2,  status: c4 },
          ].map(m => (
            <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 6px', borderRadius: 7, marginBottom: 2 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${m.color}20`, border: `1px solid ${m.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: m.color, fontFamily: FONT_SANS }}>{m.init}</div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: m.status, border: `1.5px solid ${bg}` }}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5, color: fg, fontWeight: 500 }}>{m.name}</div>
                <div style={{ fontSize: 9.5, color: mfg }}>{m.role}</div>
              </div>
              {m.badge && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: `${pri}15`, border: `1px solid ${pri}25`, color: pri, fontFamily: FONT_MONO }}>{m.badge}</span>}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={mfg} strokeWidth="1.5"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </PreviewShell>
)

const FileCardsPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 260 }}>
      <Card style={{ padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: fg }}>Attachments</span>
          <span style={{ fontSize: 10, color: mfg, fontFamily: FONT_MONO }}>4 files</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
          {[
            { name: 'design.fig',  size: '4.2 MB', ext: 'FIG', color: c5, bg: `${c5}15` },
            { name: 'schema.sql',  size: '18 KB',  ext: 'SQL', color: c2, bg: `${c2}15` },
            { name: 'spec.pdf',    size: '1.1 MB', ext: 'PDF', color: c4, bg: `${c4}15` },
            { name: 'bundle.zip',  size: '9.4 MB', ext: 'ZIP', color: c3, bg: `${c3}15` },
          ].map(f => (
            <div key={f.name} style={{ background: sec, border: `1px solid ${bdr}`, borderRadius: 9, padding: '10px 11px', cursor: 'pointer' }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: f.bg, border: `1px solid ${f.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: f.color, fontFamily: FONT_MONO }}>{f.ext}</span>
              </div>
              <div style={{ fontSize: 10.5, color: fg, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
              <div style={{ fontSize: 9.5, color: mfg, marginTop: 2 }}>{f.size}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </PreviewShell>
)

const StepFormPreview = () => (
  <PreviewShell>
    <div style={{ width: '100%', maxWidth: 260 }}>
      <Card style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 18, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 11, left: 22, right: 22, height: 1, background: bdr, zIndex: 0 }} />
          {['Profile', 'Workspace', 'Invite'].map((step, i) => (
            <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, position: 'relative', zIndex: 1 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, background: i === 0 ? pri : i === 1 ? `${pri}20` : sec, border: `1.5px solid ${i === 0 ? pri : i === 1 ? `${pri}50` : bdr}`, color: i === 0 ? 'white' : i === 1 ? pri : mfg, boxShadow: i === 0 ? `0 2px 8px ${pri}50` : 'none', fontFamily: FONT_SANS }}>
                {i === 0 ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 9, color: i === 0 ? fg : i === 1 ? mfg : `${mfg}60`, fontWeight: i <= 1 ? 500 : 400 }}>{step}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: fg, marginBottom: 12 }}>Create workspace</div>
        {['Workspace name', 'Slug / URL'].map(p => (
          <div key={p} style={{ height: 32, background: sec, border: `1px solid ${bdr}`, borderRadius: 6, padding: '0 10px', display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: mfg }}>{p}</span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          <button style={{ flex: 1, height: 32, background: 'transparent', border: `1px solid ${bdr}`, borderRadius: 6, color: mfg, fontSize: 11, fontFamily: FONT_SANS }}>Back</button>
          <button style={{ flex: 2, height: 32, background: pri, border: 'none', borderRadius: 6, color: 'white', fontSize: 11.5, fontWeight: 600, fontFamily: FONT_SANS, boxShadow: `0 4px 10px ${pri}40`, cursor: 'pointer' }}>Continue →</button>
        </div>
      </Card>
    </div>
  </PreviewShell>
)

// ─── Registry export ──────────────────────────────────────────────────────────

export const COMPONENTS: ComponentDef[] = [
  { name: 'Button',       description: 'Triggers actions. 8 variants including gradient, texture, and icon-only.',                   category: 'Primitives',   tags: ['interactive', 'cva', 'a11y'],          preview: <ButtonPreview /> },
  { name: 'Input',        description: 'Text entry with left/right icons, error state, and label support.',                          category: 'Primitives',   tags: ['form', 'controlled', 'a11y'],          preview: <InputPreview /> },
  { name: 'Badge',        description: 'Status pills for labels, priority, and classification.',                                     category: 'Primitives',   tags: ['display', 'status', 'colors'],         preview: <BadgePreview /> },
  { name: 'Avatar',       description: 'User profile picture with initials fallback and group stacking.',                            category: 'Primitives',   tags: ['user', 'group', 'persona'],            preview: <AvatarPreview /> },
  { name: 'Dialog',       description: 'Modal with overlay, focus trap, and imperative API via showDialog().',                       category: 'Primitives',   tags: ['modal', 'overlay', 'radix'],           preview: <DialogPreview /> },
  { name: 'Select',       description: 'Dropdown with search, groups, and keyboard navigation.',                                     category: 'Primitives',   tags: ['form', 'dropdown', 'radix'],           preview: <SelectPreview /> },
  { name: 'Tooltip',      description: 'Hover overlays with configurable placement and delay.',                                      category: 'Primitives',   tags: ['hover', 'placement', 'radix'],         preview: <TooltipPreview /> },
  { name: 'Checkbox',     description: 'Controlled checkbox with indeterminate and disabled states.',                                category: 'Primitives',   tags: ['form', 'controlled', 'a11y'],          preview: <CheckboxPreview /> },
  { name: 'Tabs',         description: 'Segmented content areas with keyboard navigation and animations.',                           category: 'Primitives',   tags: ['navigation', 'radix', 'animated'],     preview: <TabsPreview /> },
  { name: 'Slider',       description: 'Range input with custom styling, steps, and multi-thumb support.',                           category: 'Primitives',   tags: ['form', 'range', 'radix'],              preview: <SliderPreview /> },
  { name: 'TextureCard',  description: 'Signature 4-ring nested border surface. The premium-tier card.',                            category: 'Primitives',   tags: ['surface', 'nested', 'glassmorphism'],  preview: <TextureCardPreview /> },
  { name: 'DataGrid',     description: 'Virtualized table with sort, filter, column visibility, and bulk actions.',                  category: 'Data Display', tags: ['table', 'tanstack', 'virtualized'],    preview: <DataGridPreview /> },
  { name: 'Timeline',     description: 'Activity feed with icons, timestamps, and connector lines.',                                 category: 'Data Display', tags: ['activity', 'events', 'feed'],          preview: <TimelinePreview /> },
  { name: 'MetricCard',   description: 'KPI card with animated number, trend indicator, and sparkline.',                            category: 'Data Display', tags: ['kpi', 'dashboard', 'animated'],        preview: <MetricCardPreview /> },
  { name: 'Progress',     description: 'Linear progress bars with labels, colors, and animated fill.',                              category: 'Data Display', tags: ['progress', 'animated', 'colors'],      preview: <ProgressPreview /> },
  { name: 'Kanban',       description: 'Drag-and-drop board with columns, cards, and optimistic updates.',                          category: 'Data Display', tags: ['dnd', 'board', 'optimistic'],          preview: <KanbanPreview /> },
  { name: 'Sidebar',        description: 'Collapsible app sidebar with workspaces, nav groups, and user menu.',                     category: 'Navigation',   tags: ['nav', 'collapsible', 'compound'],      preview: <SidebarPreview /> },
  { name: 'CommandPalette', description: '⌘K command palette with groups, shortcuts, and navigation.',                             category: 'Navigation',   tags: ['⌘K', 'search', 'keyboard'],           preview: <CommandPreview /> },
  { name: 'Breadcrumb',     description: 'Hierarchical path navigation with separator variants.',                                    category: 'Navigation',   tags: ['path', 'nav', 'hierarchy'],            preview: <BreadcrumbPreview /> },
  { name: 'Toast',        description: 'Notification stack with success, error, warning, and info variants.',                        category: 'Feedback',     tags: ['notifications', 'emitter', 'stack'],   preview: <ToastPreview /> },
  { name: 'Alert',        description: 'Inline feedback banners with icon, title, and description.',                                 category: 'Feedback',     tags: ['status', 'inline', 'colors'],          preview: <AlertPreview /> },
  { name: 'Skeleton',     description: 'Loading placeholders with pulse and shimmer animation variants.',                            category: 'Feedback',     tags: ['loading', 'shimmer', 'placeholder'],   preview: <SkeletonPreview /> },
  { name: 'EmptyState',   description: 'Zero-content placeholder with icon, title, description, and CTA.',                          category: 'Feedback',     tags: ['empty', 'placeholder', 'cta'],         preview: <EmptyStatePreview /> },
  { name: 'AppShell',     description: 'Full-page layout with sidebar, header, and scrollable main area.',                           category: 'Layout',       tags: ['layout', 'compound', 'responsive'],    preview: <AppShellPreview /> },
  { name: 'SplitPage',    description: 'Two-pane layout with resizable list and detail panels.',                                      category: 'Layout',       tags: ['layout', 'resizable', 'panels'],       preview: <SplitPagePreview /> },
  { name: 'AutoForm',     description: 'Schema-driven form generation with Zod validation.',                                         category: 'Forms',        tags: ['zod', 'schema', 'auto'],               preview: <FormPreview /> },
  { name: 'DatePicker',   description: 'Calendar picker with range selection and presets.',                                           category: 'Forms',        tags: ['calendar', 'range', 'presets'],        preview: <DatePickerPreview /> },
  { name: 'StepForm',     description: 'Multi-step wizard with progress indicator and validation per step.',                          category: 'Forms',        tags: ['wizard', 'steps', 'validation'],       preview: <StepFormPreview /> },
  { name: 'BarChart',     description: 'Animated bar chart with tooltips and responsive sizing.',                                     category: 'Charts',       tags: ['recharts', 'animated', 'responsive'],  preview: <BarChartPreview /> },
  { name: 'LineChart',    description: 'Smooth area/line chart with gradient fill and data points.',                                  category: 'Charts',       tags: ['recharts', 'gradient', 'area'],        preview: <LineChartPreview /> },
  { name: 'DonutChart',   description: 'SVG donut chart with legend and center stat.',                                               category: 'Charts',       tags: ['svg', 'donut', 'legend'],              preview: <DonutChartPreview /> },
  { name: 'WorkspaceMembers', description: 'Team member list with roles, avatars, and action menus.',                                category: 'Blocks',       tags: ['team', 'roles', 'actions'],            preview: <WorkspaceMembersPreview /> },
  { name: 'FileCards',        description: 'File attachment grid with type icons, sizes, and preview.',                              category: 'Blocks',       tags: ['files', 'attachments', 'grid'],        preview: <FileCardsPreview /> },
]

export const CATEGORIES = Array.from(new Set(COMPONENTS.map(c => c.category))) as ComponentCategory[]
export const TOTAL = COMPONENTS.length
