# 1. Базовый образ
FROM node:20-alpine

# 2. Рабочая директория
WORKDIR /app

# 3. Установка Corepack + pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# 4. Копирование зависимостей
COPY package.json pnpm-lock.yaml ./

# 5. Установка зависимостей
RUN pnpm install --frozen-lockfile

# 6. Копирование всего проекта
COPY . .

# 7. Сборка, миграции и сиды
RUN pnpm run build \
  && pnpm run migration:run \
  && pnpm run seed:categories

# 8. Запуск прод-приложения
CMD ["pnpm", "run", "start:prod"]
