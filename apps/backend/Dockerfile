ARG APP_NAME=backend

#! Base
FROM node:20-slim AS base
RUN apt-get update && apt-get upgrade -y

#! Builder
FROM base AS builder
WORKDIR /app
ARG APP_NAME

# Install turbo globally
RUN npm install --ignore-scripts -g turbo@1.13.4

# Copy monorepo files and configuration
COPY apps ./apps
COPY pnpm-workspace.yaml .
COPY pnpm-lock.yaml .
COPY package.json .
COPY turbo.json .

# Prune the workspace 
RUN turbo prune --scope=${APP_NAME} --docker

#! Installer
FROM base AS installer
WORKDIR /app
ARG APP_NAME

RUN npm install -g pnpm@9.11.0

# Copy pruned package files
COPY --from=builder /app/out/json/ .

# Fetch and then install dependencies offline
RUN pnpm fetch
RUN pnpm install --ignore-scripts --offline --filter=${APP_NAME}

# Copy the full source needed for building 
COPY --from=builder /app/out/full/ .

# Build the project
RUN pnpm --filter=${APP_NAME}... run build

# Prune dev dependencies after build to reduce image size
WORKDIR /app/apps/backend
RUN pnpm prune --prod

#! Runner
FROM base AS runner
RUN groupadd -r vsgroup && useradd -m -r -g vsgroup -d /home/vs -s /bin/bash vs
USER vs

# Copy the pruned and built app into runner image
WORKDIR /home/vs
COPY --chown=vs:vsgroup --from=installer /app ./app

ARG APP_NAME
WORKDIR /home/vs/app/apps/${APP_NAME}

EXPOSE 4000
CMD ["node", "dist/main.js"]