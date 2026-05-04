# Pulls go through public.ecr.aws (Docker Hub library/* mirror, no rate limits)
# and Bun is installed straight from GitHub Releases — zero Docker Hub
# dependency. Switched 2026-05-04 after Railway Metal builders started wedging
# on `[internal] load metadata for docker.io/...`. See docs/lessons.md.

FROM public.ecr.aws/docker/library/node:20-alpine AS base
WORKDIR /app

# Install Bun straight from GitHub Releases. Alpine ships musl, so use the
# musl build of Bun. unzip + ca-certificates needed to fetch+extract.
# TARGETARCH is auto-injected by Docker BuildKit (`amd64` / `arm64`);
# Bun's release tarballs use `x64` / `aarch64`, so we map.
ARG BUN_VERSION=1.3.3
ARG TARGETARCH
RUN apk add --no-cache curl bash unzip ca-certificates \
  && case "${TARGETARCH:-amd64}" in \
       amd64) BUN_ARCH=x64 ;; \
       arm64) BUN_ARCH=aarch64 ;; \
       *) echo "Unsupported TARGETARCH=${TARGETARCH}" && exit 1 ;; \
     esac \
  && curl -fsSL "https://github.com/oven-sh/bun/releases/download/bun-v${BUN_VERSION}/bun-linux-${BUN_ARCH}-musl.zip" -o /tmp/bun.zip \
  && unzip -q /tmp/bun.zip -d /tmp \
  && mv "/tmp/bun-linux-${BUN_ARCH}-musl/bun" /usr/local/bin/bun \
  && chmod +x /usr/local/bin/bun \
  && rm -rf /tmp/bun.zip "/tmp/bun-linux-${BUN_ARCH}-musl" \
  && bun --version

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
FROM public.ecr.aws/docker/library/node:20-alpine AS runner
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
