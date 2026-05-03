// Production-only static-file server for the public Railway demo.
//
// Mirrors kits/fitness-kit/server/static.ts. The web export (Expo) is
// pre-built locally by scripts/deploy-railway.sh, then this script
// serves dist/ over a tiny Bun process. There is no API surface here —
// the showcase is pure-frontend.

import { serve } from 'bun'

const port = Number(process.env.PORT ?? 3001)
const root = './dist'

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
}

function withCors(res: Response): Response {
  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    res.headers.set(k, v)
  }
  return res
}

const server = serve({
  port,
  hostname: '0.0.0.0',
  async fetch(req) {
    const url = new URL(req.url)
    let path = url.pathname

    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    if (path === '/api/health') {
      return withCors(
        Response.json({
          ok: true,
          app: 'ui-native-storybook',
          time: new Date().toISOString(),
        }),
      )
    }

    // No backend — any /api/* is a 404.
    if (path.startsWith('/api/')) {
      return withCors(
        Response.json({ error: 'showcase has no backend', path }, { status: 404 }),
      )
    }

    if (path.endsWith('/')) path += 'index.html'
    if (path === '') path = '/index.html'

    const direct = Bun.file(`${root}${path}`)
    if (await direct.exists()) {
      const headers = new Headers()
      if (path.startsWith('/_expo/static/') || path.startsWith('/assets/')) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      } else {
        headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      }
      return withCors(new Response(direct, { headers }))
    }

    // SPA fallback.
    const fallback = Bun.file(`${root}/index.html`)
    if (await fallback.exists()) {
      return withCors(
        new Response(fallback, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        }),
      )
    }

    return withCors(
      new Response('Web export missing — run `bun run build:web` first', { status: 500 }),
    )
  },
})

console.log(`[otf:ui-native-storybook] static server -> http://localhost:${server.port}`)
