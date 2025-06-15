#!/bin/sh

echo "🟡 Running database migrations..."
pnpm migration:run

echo "🟢 Starting NestJS app..."
node dist/src/main
