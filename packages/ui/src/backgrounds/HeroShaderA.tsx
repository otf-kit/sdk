'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '../utils/cn'

// ── HeroShaderA ──────────────────────────────────────────────────────────────
// A clean-room WebGL hero background — slowly drifting "aurora" of three
// soft gaussian blobs whose colors are read from CSS custom properties
// (--primary, --chart-2, --chart-3 / passed via `colors` prop).
//
// Single fragment shader, no external libs. Auto-pauses when offscreen
// and falls back to a CSS gradient when WebGL is unavailable or the user
// prefers reduced motion.

const VERT = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

// Three gaussian-style blobs orbiting in lazy circles + subtle grain.
// All trig folded into a single noise-free pass — cheap on mobile.
const FRAG = `
  precision mediump float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_c1;
  uniform vec3 u_c2;
  uniform vec3 u_c3;
  uniform float u_intensity;
  uniform vec3 u_bg;

  float blob(vec2 uv, vec2 center, float radius) {
    float d = length(uv - center) / radius;
    return exp(-d * d * 1.4);
  }

  void main() {
    vec2 uv = v_uv;
    // correct for aspect so blobs stay round
    uv.x *= u_resolution.x / u_resolution.y;
    float aspect = u_resolution.x / u_resolution.y;

    float t = u_time * 0.06;
    vec2 c1 = vec2(aspect * 0.30 + 0.18 * sin(t * 0.9),       0.40 + 0.14 * cos(t * 1.1));
    vec2 c2 = vec2(aspect * 0.70 + 0.20 * cos(t * 0.7 + 1.3), 0.55 + 0.12 * sin(t * 1.3 + 0.6));
    vec2 c3 = vec2(aspect * 0.50 + 0.22 * sin(t * 0.4 + 2.4), 0.30 + 0.18 * cos(t * 0.8 + 1.7));

    float r = aspect * 0.55;
    float b1 = blob(uv, c1, r);
    float b2 = blob(uv, c2, r * 0.95);
    float b3 = blob(uv, c3, r * 1.05);

    vec3 col = u_bg;
    col = mix(col, u_c1, b1 * u_intensity);
    col = mix(col, u_c2, b2 * u_intensity);
    col = mix(col, u_c3, b3 * u_intensity);

    // tiny film grain so flat regions don't band
    float grain = fract(sin(dot(v_uv * u_resolution, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.03;

    gl_FragColor = vec4(col, 1.0);
  }
`

export interface HeroShaderAProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Three blob colors in 0..1 RGB tuples. Default mixes primary + chart-2 + chart-3. */
  colors?: [readonly [number, number, number], readonly [number, number, number], readonly [number, number, number]]
  /** Background color underneath the blobs (0..1 RGB). Default very-dark. */
  background?: readonly [number, number, number]
  /** 0..1 — how strongly each blob mixes over the background. Default 0.7. */
  intensity?: number
  /** Animation speed multiplier. Default 1. Set 0 to freeze. */
  speed?: number
  /** Render quality (DPR cap). Default 1.5. */
  pixelRatio?: number
}

const DEFAULT_COLORS: HeroShaderAProps['colors'] = [
  [0.98, 0.45, 0.10] as const, // OTF primary orange
  [0.18, 0.55, 0.95] as const, // chart-2 blue
  [0.55, 0.30, 0.95] as const, // chart-3 violet
]

export const HeroShaderA = React.forwardRef<HTMLDivElement, HeroShaderAProps>(
  (
    {
      className,
      colors = DEFAULT_COLORS,
      background = [0.04, 0.03, 0.06],
      intensity = 0.7,
      speed = 1,
      pixelRatio = 1.5,
      style,
      ...props
    },
    ref,
  ) => {
    const wrapRef = useRef<HTMLDivElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const fallbackRef = useRef(false)

    React.useImperativeHandle(ref, () => wrapRef.current as HTMLDivElement)

    useEffect(() => {
      if (typeof window === 'undefined') return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const canvas = canvasRef.current
      const wrap = wrapRef.current
      if (!canvas || !wrap) return

      const gl = (canvas.getContext('webgl', { antialias: false, alpha: false }) ||
        canvas.getContext('experimental-webgl', { antialias: false })) as WebGLRenderingContext | null
      if (!gl) {
        fallbackRef.current = true
        wrap.dataset.fallback = 'true'
        return
      }

      // ── compile ──────────────────────────────────────────────────────────
      const compile = (src: string, type: number) => {
        const sh = gl.createShader(type)!
        gl.shaderSource(sh, src)
        gl.compileShader(sh)
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          gl.deleteShader(sh)
          return null
        }
        return sh
      }
      const vs = compile(VERT, gl.VERTEX_SHADER)
      const fs = compile(FRAG, gl.FRAGMENT_SHADER)
      if (!vs || !fs) { fallbackRef.current = true; wrap.dataset.fallback = 'true'; return }
      const program = gl.createProgram()!
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        fallbackRef.current = true
        wrap.dataset.fallback = 'true'
        return
      }

      const buf = gl.createBuffer()!
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
      const aPos = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

      gl.useProgram(program)
      const uRes = gl.getUniformLocation(program, 'u_resolution')
      const uTime = gl.getUniformLocation(program, 'u_time')
      const uC1 = gl.getUniformLocation(program, 'u_c1')
      const uC2 = gl.getUniformLocation(program, 'u_c2')
      const uC3 = gl.getUniformLocation(program, 'u_c3')
      const uBg = gl.getUniformLocation(program, 'u_bg')
      const uIntensity = gl.getUniformLocation(program, 'u_intensity')

      gl.uniform3f(uC1, colors[0][0], colors[0][1], colors[0][2])
      gl.uniform3f(uC2, colors[1][0], colors[1][1], colors[1][2])
      gl.uniform3f(uC3, colors[2][0], colors[2][1], colors[2][2])
      gl.uniform3f(uBg, background[0], background[1], background[2])
      gl.uniform1f(uIntensity, intensity)

      // ── resize ───────────────────────────────────────────────────────────
      const dpr = Math.min(pixelRatio, window.devicePixelRatio ?? 1)
      const resize = () => {
        const { clientWidth, clientHeight } = wrap
        const w = Math.max(1, Math.round(clientWidth * dpr))
        const h = Math.max(1, Math.round(clientHeight * dpr))
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
          gl.viewport(0, 0, w, h)
          gl.uniform2f(uRes, w, h)
        }
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(wrap)

      // ── pause when offscreen ─────────────────────────────────────────────
      let visible = true
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) visible = e.isIntersecting
      })
      io.observe(wrap)

      // ── render loop ──────────────────────────────────────────────────────
      let raf = 0
      let start = performance.now()
      const frozen = reduceMotion || speed === 0

      const draw = (now: number) => {
        if (visible) {
          const t = frozen ? 0 : ((now - start) / 1000) * speed
          gl.uniform1f(uTime, t)
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        }
        if (!frozen) raf = requestAnimationFrame(draw)
      }
      raf = requestAnimationFrame(draw)
      // single static frame for reduced motion
      if (frozen) {
        gl.uniform1f(uTime, 0)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }

      return () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        io.disconnect()
        gl.deleteProgram(program)
        gl.deleteShader(vs)
        gl.deleteShader(fs)
        gl.deleteBuffer(buf)
      }
    }, [colors, background, intensity, speed, pixelRatio])

    return (
      <div
        ref={wrapRef}
        data-slot="hero-shader-a"
        className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
        style={style}
        {...props}
      >
        {/* CSS fallback rendered behind the canvas; visible if WebGL fails (data-fallback flips on) */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 60% at 30% 40%, hsl(var(--primary) / 0.35), transparent 60%), ' +
              'radial-gradient(60% 60% at 70% 60%, hsl(var(--chart-2) / 0.30), transparent 60%), ' +
              'radial-gradient(60% 60% at 50% 30%, hsl(var(--chart-3) / 0.30), transparent 60%), ' +
              'hsl(var(--background))',
          }}
        />
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full block"
        />
      </div>
    )
  },
)
HeroShaderA.displayName = 'HeroShaderA'
