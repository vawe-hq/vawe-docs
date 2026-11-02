FROM node:22-alpine AS builder
WORKDIR /src
COPY package.json package-lock.json ./
# postinstall runs `fumadocs-mdx`, which needs source.config.ts and content/. Install deps only, so a
# prose edit does not bust this layer; .source is generated below.
RUN npm ci --ignore-scripts
COPY . .
RUN npx fumadocs-mdx && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
# The server needs only node; the npm bundled in the base image carried 10 HIGH CVEs (Trivy, 2026-11-03).
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack

# standalone does not include .next/static; assetPrefix /docs-static is stripped by the server.
COPY --from=builder --chown=nextjs:nodejs /src/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /src/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /src/.source ./.source
COPY --from=builder --chown=nextjs:nodejs /src/public ./public

USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD wget -qO /dev/null http://127.0.0.1:3000/ || exit 1
CMD ["node", "server.js"]
