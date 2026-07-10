# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# The system chromium (apk) is used at runtime via PUPPETEER_EXECUTABLE_PATH,
# so skip downloading puppeteer's bundled browser during install.
ENV PUPPETEER_SKIP_DOWNLOAD=true

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ─── Stage 2: Production ─────────────────────────────────────────────────────
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Chromium + runtime libs for Puppeteer PDF generation (surat permohonan &
# kertas kerja). Alpine's musl libc cannot run the browser bundled with
# puppeteer, so we use the system chromium package and point puppeteer at it
# via PUPPETEER_EXECUTABLE_PATH (see puppeteer use_cases launch args).
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled application (includes dist/migrations/*)
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]
