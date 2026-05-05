'use client'

import React from 'react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Maximize,
  Minimize,
  Layers,
} from 'lucide-react'
import { Button } from '../primitives/button'
import { Slider } from '../primitives/slider'
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../primitives/tooltip'
import { cn } from '../utils/cn'

// ── Types ────────────────────────────────────────────────────────

export type VideoChapter = {
  /** Chapter start time in seconds. */
  time: number
  title: string
}

export type VideoPlayerProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  'controls'
> & {
  src: string
  poster?: string
  /** Optional chapter markers + dropdown list. */
  chapters?: VideoChapter[]
  /** Default true. False hides the bottom control bar (hero loops). */
  controls?: boolean
  onPlay?: () => void
  onPause?: () => void
  onTimeUpdate?: (time: number, duration: number) => void
  onEnded?: () => void
  className?: string
  /** Wrapper class — override the default `aspect-video`. */
  containerClassName?: string
}

// ── Helpers ──────────────────────────────────────────────────────

function formatTime(seconds: number, showHours: boolean): string {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const pad = (n: number) => n.toString().padStart(2, '0')
  if (showHours) return `${h}:${pad(m)}:${pad(s)}`
  return `${m}:${pad(s)}`
}

function isFullscreenActive(): boolean {
  return Boolean(
    document.fullscreenElement ||
      // Safari / older WebKit
      (document as unknown as { webkitFullscreenElement?: Element })
        .webkitFullscreenElement,
  )
}

async function requestFs(el: HTMLElement): Promise<void> {
  type FsEl = HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void
    webkitEnterFullscreen?: () => Promise<void> | void
  }
  const e = el as FsEl
  if (e.requestFullscreen) return void e.requestFullscreen()
  if (e.webkitRequestFullscreen) return void e.webkitRequestFullscreen()
  if (e.webkitEnterFullscreen) return void e.webkitEnterFullscreen()
}

async function exitFs(): Promise<void> {
  type FsDoc = Document & {
    webkitExitFullscreen?: () => Promise<void> | void
  }
  const d = document as FsDoc
  if (d.exitFullscreen) return void d.exitFullscreen()
  if (d.webkitExitFullscreen) return void d.webkitExitFullscreen()
}

// ── Component ────────────────────────────────────────────────────

export const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(
  (
    {
      src,
      poster,
      chapters,
      controls: controlsEnabled = true,
      onPlay,
      onPause,
      onTimeUpdate,
      onEnded,
      className,
      containerClassName,
      autoPlay,
      loop,
      muted: mutedProp,
      ...videoProps
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const hideTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const [isPlaying, setIsPlaying] = React.useState(false)
    const [hasPlayed, setHasPlayed] = React.useState(Boolean(autoPlay))
    const [currentTime, setCurrentTime] = React.useState(0)
    const [duration, setDuration] = React.useState(0)
    const [buffered, setBuffered] = React.useState(0)
    const [volume, setVolume] = React.useState(1)
    const [isMuted, setIsMuted] = React.useState(Boolean(mutedProp ?? autoPlay))
    const [isFullscreen, setIsFullscreen] = React.useState(false)
    const [showControls, setShowControls] = React.useState(true)

    // Forward inner container ref to outer ref.
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

    // Sync video element state.
    React.useEffect(() => {
      const v = videoRef.current
      if (!v) return
      v.volume = volume
      v.muted = isMuted
    }, [volume, isMuted])

    // Auto-hide controls during playback.
    const showAndScheduleHide = React.useCallback(() => {
      setShowControls(true)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      if (isPlaying) {
        hideTimerRef.current = setTimeout(() => setShowControls(false), 3000)
      }
    }, [isPlaying])

    React.useEffect(() => {
      if (!isPlaying) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        setShowControls(true)
        return
      }
      hideTimerRef.current = setTimeout(() => setShowControls(false), 3000)
      return () => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      }
    }, [isPlaying])

    // Fullscreen change listeners (Fullscreen API + WebKit prefix).
    React.useEffect(() => {
      const onFsChange = () => setIsFullscreen(isFullscreenActive())
      document.addEventListener('fullscreenchange', onFsChange)
      document.addEventListener('webkitfullscreenchange', onFsChange)
      return () => {
        document.removeEventListener('fullscreenchange', onFsChange)
        document.removeEventListener('webkitfullscreenchange', onFsChange)
      }
    }, [])

    // ── Actions ──

    const togglePlay = React.useCallback(() => {
      const v = videoRef.current
      if (!v) return
      if (v.paused) {
        void v.play()
      } else {
        v.pause()
      }
    }, [])

    const toggleMute = React.useCallback(() => {
      setIsMuted((m) => !m)
    }, [])

    const toggleFullscreen = React.useCallback(() => {
      const el = containerRef.current
      if (!el) return
      if (isFullscreenActive()) void exitFs()
      else void requestFs(el)
    }, [])

    const seekTo = React.useCallback((time: number) => {
      const v = videoRef.current
      if (!v) return
      const clamped = Math.max(0, Math.min(v.duration || 0, time))
      v.currentTime = clamped
    }, [])

    const seekBy = React.useCallback(
      (delta: number) => {
        seekTo((videoRef.current?.currentTime ?? 0) + delta)
      },
      [seekTo],
    )

    // ── Video event handlers ──

    const handlePlay = () => {
      setIsPlaying(true)
      setHasPlayed(true)
      onPlay?.()
    }
    const handlePause = () => {
      setIsPlaying(false)
      onPause?.()
    }
    const handleTimeUpdate = () => {
      const v = videoRef.current
      if (!v) return
      setCurrentTime(v.currentTime)
      onTimeUpdate?.(v.currentTime, v.duration || 0)
    }
    const handleLoadedMetadata = () => {
      const v = videoRef.current
      if (!v) return
      setDuration(v.duration || 0)
    }
    const handleProgress = () => {
      const v = videoRef.current
      if (!v || v.buffered.length === 0) return
      setBuffered(v.buffered.end(v.buffered.length - 1))
    }
    const handleEnded = () => {
      setIsPlaying(false)
      onEnded?.()
    }
    const handleVolumeChange = () => {
      const v = videoRef.current
      if (!v) return
      setVolume(v.volume)
      setIsMuted(v.muted)
    }

    // ── Keyboard ──

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      // Numbers 0-9 → seek 0%-90%.
      if (/^[0-9]$/.test(e.key)) {
        const v = videoRef.current
        if (v && v.duration) {
          seekTo((parseInt(e.key, 10) / 10) * v.duration)
          e.preventDefault()
        }
        return
      }
      switch (e.key) {
        case ' ':
        case 'Spacebar':
          togglePlay()
          e.preventDefault()
          break
        case 'ArrowLeft':
          seekBy(-5)
          e.preventDefault()
          break
        case 'ArrowRight':
          seekBy(5)
          e.preventDefault()
          break
        case 'ArrowUp':
          setVolume((vol) => Math.min(1, vol + 0.1))
          setIsMuted(false)
          e.preventDefault()
          break
        case 'ArrowDown':
          setVolume((vol) => Math.max(0, vol - 0.1))
          e.preventDefault()
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          e.preventDefault()
          break
        case 'm':
        case 'M':
          toggleMute()
          e.preventDefault()
          break
      }
    }

    // ── Derived ──

    const showHours = duration >= 3600
    const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0
    const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0
    const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

    return (
      <TooltipProvider delayDuration={150}>
        <div
          ref={containerRef}
          role="region"
          aria-label="Video player"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseMove={showAndScheduleHide}
          onFocus={showAndScheduleHide}
          className={cn(
            'group relative isolate select-none overflow-hidden rounded-lg bg-black outline-none',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'aspect-video',
            containerClassName,
          )}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            muted={isMuted}
            preload="metadata"
            onClick={togglePlay}
            onPlay={handlePlay}
            onPause={handlePause}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onDurationChange={handleLoadedMetadata}
            onCanPlay={handleLoadedMetadata}
            onProgress={handleProgress}
            onEnded={handleEnded}
            onVolumeChange={handleVolumeChange}
            playsInline
            className={cn(
              'block h-full w-full cursor-pointer object-cover',
              className,
            )}
            {...videoProps}
          />

          {/* Big center play button before first play (only when controls enabled). */}
          {controlsEnabled && !hasPlayed && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play"
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                'bg-black/20 transition-colors hover:bg-black/30',
              )}
            >
              <span
                className={cn(
                  'flex h-16 w-16 items-center justify-center rounded-full',
                  'bg-background/90 text-foreground shadow-lg backdrop-blur',
                  'transition-transform hover:scale-105',
                )}
              >
                <Play className="h-7 w-7 translate-x-0.5 fill-current" strokeWidth={0} />
              </span>
            </button>
          )}

          {/* Minimal mode: small play overlay when paused. */}
          {!controlsEnabled && !isPlaying && hasPlayed && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur">
                <Play className="h-5 w-5 translate-x-0.5 fill-current" strokeWidth={0} />
              </span>
            </div>
          )}

          {/* Bottom control bar. */}
          {controlsEnabled && (
            <div
              className={cn(
                'absolute inset-x-0 bottom-0 z-10',
                'bg-gradient-to-t from-black/70 via-black/40 to-transparent',
                'px-3 pb-2 pt-8',
                'transition-opacity duration-200',
                showControls
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
              )}
              onMouseEnter={() => {
                if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
                setShowControls(true)
              }}
            >
              {/* Scrubber row. */}
              <div className="relative mb-1 flex items-center">
                {/* Buffered range overlay. */}
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 z-0 my-auto h-1.5 rounded-full bg-white/25"
                  style={{ width: `${bufferedPct}%` }}
                  aria-hidden="true"
                />
                {/* Chapter ticks. */}
                {chapters && duration > 0 && (
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 right-0 my-auto h-1.5"
                    aria-hidden="true"
                  >
                    {chapters.map((c, i) => {
                      const left = Math.min(100, (c.time / duration) * 100)
                      return (
                        <span
                          key={i}
                          className="absolute top-0 h-full w-0.5 bg-background/80"
                          style={{ left: `${left}%` }}
                        />
                      )
                    })}
                  </div>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative z-10 w-full">
                      <Slider
                        aria-label="Seek"
                        value={[progressPct]}
                        min={0}
                        max={100}
                        step={0.1}
                        onValueChange={(v) => {
                          const pct = v[0] ?? 0
                          if (duration > 0) seekTo((pct / 100) * duration)
                        }}
                        className="cursor-pointer [&_[data-orientation=horizontal]>span]:cursor-pointer [&_[role=slider]]:cursor-pointer"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {formatTime(currentTime, showHours)}
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Bottom row: play / time / volume / chapters / fullscreen. */}
              <div className="flex items-center gap-1 text-white">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="h-8 w-8 text-white hover:bg-white/15 hover:text-white"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                <span className="ml-1 font-mono text-xs tabular-nums text-white/90">
                  {formatTime(currentTime, showHours)} / {formatTime(duration, showHours)}
                </span>

                <div className="flex-1" />

                {/* Volume — hover to reveal slider. */}
                <div className="group/vol flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="h-8 w-8 text-white hover:bg-white/15 hover:text-white"
                  >
                    <VolumeIcon className="h-4 w-4" />
                  </Button>
                  <div
                    className={cn(
                      'overflow-hidden transition-[width] duration-200',
                      'w-0 group-hover/vol:w-20 group-focus-within/vol:w-20',
                    )}
                  >
                    <div className="px-2">
                      <Slider
                        aria-label="Volume"
                        value={[isMuted ? 0 : volume * 100]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(v) => {
                          const next = v[0] ?? 0
                          setVolume(next / 100)
                          if (next > 0) setIsMuted(false)
                        }}
                        className="cursor-pointer [&_[role=slider]]:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Chapters dropdown. */}
                {chapters && chapters.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Chapters"
                        className="h-8 w-8 text-white hover:bg-white/15 hover:text-white"
                      >
                        <Layers className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      side="top"
                      className="w-64 p-1"
                    >
                      <div className="max-h-64 overflow-y-auto">
                        {chapters.map((c, i) => {
                          const next = chapters[i + 1]
                          const isCurrent =
                            currentTime >= c.time &&
                            (next === undefined || currentTime < next.time)
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => seekTo(c.time)}
                              className={cn(
                                'flex w-full items-center justify-between gap-3 rounded-sm px-2 py-1.5 text-left text-sm',
                                'hover:bg-accent hover:text-accent-foreground',
                                isCurrent && 'bg-accent text-accent-foreground',
                              )}
                            >
                              <span className="truncate">{c.title}</span>
                              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                                {formatTime(c.time, showHours)}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  className="h-8 w-8 text-white hover:bg-white/15 hover:text-white"
                >
                  {isFullscreen ? (
                    <Minimize className="h-4 w-4" />
                  ) : (
                    <Maximize className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </TooltipProvider>
    )
  },
)
VideoPlayer.displayName = 'VideoPlayer'
