# ui-native-storybook production demo image - local-build pattern.
#
# The web export (Expo) and the static server bundle (server/static.ts ->
# 1KB Bun bundle) are pre-built locally by scripts/deploy-railway.sh, then
# this Dockerfile just copies the resulting dist/ into a slim runtime.
# Mirrors kits/fitness-kit/Dockerfile.

FROM oven/bun:1.3.3-slim
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

COPY dist ./dist

EXPOSE 3001
CMD ["bun", "dist/server/static.js"]
