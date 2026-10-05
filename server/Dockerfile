FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM deps AS builder
COPY src/ ./src
COPY tsconfig.json ./
RUN npm run build

FROM node:24-alpine AS production-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

FROM production-deps AS setup
COPY scripts/ ./scripts
COPY database/ ./database
ENV NODE_ENV=production
USER node
CMD ["node", "scripts/setup-db.cjs"]

FROM production-deps AS runner
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
USER node
CMD ["node", "dist/main.js"]
