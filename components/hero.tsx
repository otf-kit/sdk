import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 px-6 flex flex-col items-center justify-center min-h-[70vh]">
      {/* Background Image / Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center opacity-40">
         <Image src="/hero-bg-orange.png" alt="Hero background" fill className="object-cover mix-blend-screen" priority />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          The React component<br />
          library for startups.
        </h1>

        <p className="text-lg md:text-xl text-[#a3a3a3] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          OTF is an open source React component system built on Radix UI and Tamagui.
          Designed to help you build beautiful, consistent cross-platform applications.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/components"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#f97316] hover:bg-[#fb923c] text-white font-medium rounded-md transition-colors text-sm w-full sm:w-auto"
          >
            View all components
          </a>
          <div className="inline-flex items-center justify-between px-4 py-3 border border-[#333333] bg-[#111111] text-[#a3a3a3] font-mono rounded-md text-sm w-full sm:w-auto min-w-[240px]">
            <span>&gt; pnpm add @otf/ui</span>
            <button className="text-[#737373] hover:text-white transition-colors ml-4" aria-label="Copy command">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
