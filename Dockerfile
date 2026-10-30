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

# standalone does not include .next/static; assetPrefix /docs-static is stripped by the server.
COPY --from=builder --chown=nextjs:nodejs /src/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /src/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /src/.source ./.source

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
