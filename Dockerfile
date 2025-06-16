# Используем Node.js 20 на Alpine
FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

# Копируем package.json и pnpm-lock.yaml (если есть)
COPY package.json pnpm-lock.yaml* ./

# Устанавливаем зависимости
RUN pnpm install --prod

# Копируем весь проект
COPY . .

# Компилируем проект (запускаем скрипт build из package.json)
RUN pnpm run build
RUN pnpm migration:run
RUN pnpm seed:categories

# Открываем порт 4000
EXPOSE 4000

# Запускаем приложение (согласно твоему package.json это node dist/src/main.js)
CMD ["./start.sh"]
