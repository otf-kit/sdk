import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  output: 'standalone',
  // @otf/ui ships no .d.ts (tsup dts disabled due to name clashes).
  // Types are verified locally via tsconfig paths; skip the Docker check.
  typescript: { ignoreBuildErrors: true },
  turbopack: { root: path.resolve(__dirname, '../..') },
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
}

export default nextConfig
