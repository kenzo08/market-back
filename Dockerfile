# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml tsconfig.json ./
RUN pnpm install --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/db ./db
COPY start.sh ./
COPY .env ./

RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]
