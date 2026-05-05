# Use a public ECR mirror of Node.js 20 Alpine to avoid Docker Hub rate limits.
# Pattern adapted from internal/auto-engineer (proven reliable on Railway Metal).
# Bun is installed via `npm install -g bun` — simple, single-step, no curl/unzip.
# Digest-pinned to skip metadata-lookup step that periodically wedges Metal builders.
FROM public.ecr.aws/docker/library/node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN npm install -g bun

# ── deps ─────────────────────────────────────────────────────────────────────
# vendor/ is populated by scripts/deploy-railway.sh with @otf/ui tarball.
# package.json workspace:* ref is swapped to file:./vendor/*.tgz.
FROM base AS deps
COPY package.json bun.lock* ./
COPY vendor ./vendor
RUN bun install

# ── builder ──────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/vendor ./vendor
COPY . .
RUN bun run build

# ── runner ───────────────────────────────────────────────────────────────────
# Use real Node — Next.js standalone server.js expects Node CJS resolution.
# In Docker, turbopack.root resolves to /, so standalone outputs to
# .next/standalone/app/server.js (app = the container's /app dir name).
FROM public.ecr.aws/docker/library/node:22-alpine AS runner
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
