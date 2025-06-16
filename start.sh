#!/bin/sh

# Запускаем миграции
pnpm migration:run

# Запускаем сиды
pnpm seed:categories

# Запускаем приложение
node dist/src/main.js
