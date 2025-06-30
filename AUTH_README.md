# Система аутентификации и авторизации

## Обзор

Реализована полноценная система аутентификации с использованием JWT токенов, ролей и подтверждения email.

## Роли пользователей

- **User** - обычный пользователь (по умолчанию)
- **Seller** - продавец (может создавать офферы и категории)
- **Admin** - администратор (полный доступ)

## Настройка

### 1. Переменные окружения

Создайте файл `.env` на основе `example-env`:

```bash
# База данных
DB_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=your_database

# JWT секреты (обязательно измените!)
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here

# Остальные настройки
NODE_ENV=development
PORT=4000
```

### 2. Миграции

Запустите миграции для создания таблицы пользователей:

```bash
npm run migration:run
```

### 3. Сиды

Запустите сиды для создания тестовых пользователей:

```bash
npm run seed
```

## API Endpoints

### Аутентификация

#### Регистрация
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "user", // опционально, по умолчанию "user"
  "phone": "+1234567890" // опционально
}
```

**Ответ:**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "message": "Registration successful. Please check your email to verify your account."
}
```

#### Вход
```http
POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Ответ:**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

#### Подтверждение email
```http
GET /auth/verify-email?userId=1&token=demo-token
```

#### Повторная отправка email подтверждения
```http
POST /auth/resend-verification
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Обновление токена
```http
POST /auth/refresh
Authorization: Bearer YOUR_REFRESH_TOKEN
```

#### Выход
```http
POST /auth/logout
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Защищенные эндпоинты

#### Категории
- `GET /category/get-all` - публичный
- `GET /category/get-by-id/:id` - требует аутентификации
- `POST /category/create` - требует роль Admin или Seller
- `DELETE /category/delete/:id` - требует роль Admin

#### Офферы
- `GET /offer/all` - публичный
- `GET /offer/find-by-id/:id` - публичный
- `POST /offer/create` - требует роль Seller или Admin
- `PUT /offer/update/:id` - требует роль Seller или Admin
- `DELETE /offer/delete/:id` - требует роль Seller или Admin

#### Отзывы
- `GET /review/get-offer-reviews/:id` - публичный
- `POST /review/create` - требует аутентификации

## Тестовые аккаунты

После запуска сидов будут созданы следующие тестовые аккаунты:

- **Admin**: admin@example.com / password123
- **Seller**: seller@example.com / password123
- **User**: user@example.com / password123
- **Unverified**: unverified@example.com / password123

## Использование токенов

### Access Token
- Срок действия: 15 минут
- Используется для доступа к защищенным эндпоинтам
- Передается в заголовке: `Authorization: Bearer YOUR_ACCESS_TOKEN`

### Refresh Token
- Срок действия: 7 дней
- Используется для получения нового access token
- Передается в заголовке: `Authorization: Bearer YOUR_REFRESH_TOKEN`

## Подтверждение Email

В текущей реализации подтверждение email является демо-версией:

1. При регистрации в консоли выводится ссылка для подтверждения
2. Перейдите по ссылке для подтверждения email
3. После подтверждения пользователь сможет войти в систему

**Для продакшена** необходимо интегрировать реальный email-сервис (SendGrid, Mailgun, AWS SES и т.д.).

## Безопасность

- Пароли хешируются с помощью bcrypt
- JWT токены подписываются секретными ключами
- Refresh токены хешируются перед сохранением в БД
- Все эндпоинты по умолчанию защищены (кроме помеченных `@Public()`)
- Роли проверяются с помощью `@Roles()` декоратора

## Тестирование

Используйте файл `test-auth.http` для тестирования API с помощью REST Client в VS Code или аналогичных инструментов.

## Структура базы данных

### Таблица users
- `id` - первичный ключ
- `email` - уникальный email
- `password` - хешированный пароль
- `role` - роль пользователя (user, seller, admin)
- `phone` - телефон (опционально)
- `emailVerified` - подтверждение email
- `refreshToken` - хешированный refresh token
- `createdAt` - дата создания
- `updatedAt` - дата обновления 