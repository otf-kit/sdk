FROM oven/bun:1.3.3-slim AS base
WORKDIR /app

# ── deps ─────────────────────────────────────────────────────────────────────
# vendor/ is populated by scripts/deploy-railway.sh with @otf/ui tarball.
# package.json workspace:* ref is swapped to file:./vendor/*.tgz.
FROM base AS deps
COPY package.json bun.lock* ./
COPY vendor ./vendor
RUN bun install

# ── builder ──────────────────────────────────────────────────────────────────
FROM deps AS builder
ARG BUILD_BUST=1
ENV NEXT_TELEMETRY_DISABLED=1
COPY . .
RUN bun run build

# ── runner ───────────────────────────────────────────────────────────────────
# Use real Node — Next.js standalone server.js expects Node CJS resolution.
# In Docker, turbopack.root resolves to /, so standalone outputs to
# .next/standalone/app/server.js (app = the container's /app dir name).
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./app/.next/static
COPY --from=builder /app/public ./app/public

EXPOSE 3000
WORKDIR /app/app
CMD ["node", "server.js"]
