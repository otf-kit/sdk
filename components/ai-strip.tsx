export function AiStrip() {
  return (
    <div className="border-y border-[#1f1f1f] py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[#737373] text-sm">Works seamlessly with your AI tools</span>
        <div className="flex items-center gap-6">
          {['Cursor', 'Claude Code', 'Lovable', 'Antigravity'].map(tool => (
            <span key={tool} className="text-[#525252] text-sm font-medium hover:text-white transition-colors cursor-default">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
