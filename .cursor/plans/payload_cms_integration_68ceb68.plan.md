---
name: Payload CMS Integration
overview: Интеграция Payload CMS в существующий Next.js-проект ebcenter для редактирования всех текстов, картинок и возможности добавлять страницы. Payload устанавливается в app, контент из i18n JSON мигрируется в коллекции/globals, фронтенд переключается на данные из Payload API.
todos: []
isProject: false
---

# Интеграция Payload CMS в ebcenter

## Текущее состояние

- **Next.js 15.2.4** (App Router), React 19, TypeScript
- **Контент:** i18n JSON (`ru.json`, `en.json`) — ~700+ строк переводимого контента
- **Изображения:** статика в `public/` (hero-bg, logo, favicon)
- **Страницы:** фиксированные маршруты (`/services`, `/training`, `/contacts` и т.д.)
- **Админ:** NocoDB для acts/clients по маршруту `[locale]/admin`

## Архитектурные решения

| Вопрос          | Решение                                                    |
| --------------- | ---------------------------------------------------------- |
| Конфликт admin  | Payload admin — `/admin`, текущий NocoDB-админ — `/office` |
| БД Payload      | **PostgreSQL** — Docker + миграции (Drizzle)               |
| Package manager | Payload не поддерживает yarn 1.x — переход на **pnpm**     |

## Структура Payload-коллекций

```mermaid
flowchart TB
    subgraph Collections
        Media[Media - изображения]
        Services[Services - услуги]
        Courses[Courses - курсы]
        Pages[Pages - кастомные страницы]
    end

    subgraph Globals
        SiteSettings[SiteSettings - hero, header, footer]
        Translations[Translations - UI-строки common]
    end

    Media --> SiteSettings
    Media --> Services
    Media --> Pages
```

- **Media** — hero-фон, логотип, иллюстрации (с поддержкой резкой, focal point)
- **Globals: SiteSettings** — hero (title, subtitle, cta), header (logo, nav), contactInfo, footer
- **Globals: Translations** — UI-строки (`common`, `validation`, `header.navigation`) или отдельная коллекция
- **Services** — title, description, slug, content, tariffs (с localized полями для ru/en)
- **Courses** — программы, разделы, темы (для training)
- **Pages** — title, slug, layout, blocks для кастомных страниц

## Этапы реализации

### 1. Установка Payload и зависимости

- Установить `payload`, `@payloadcms/next`, `sharp`, `@payloadcms/richtext-lexical`
- Добавить адаптер БД: `@payloadcms/db-postgres` (PostgreSQL)
- Перейти с yarn на pnpm (или использовать pnpm только для Payload-зависимостей)
- Добавить `payload.config.ts` в корень проекта
- Обернуть `next.config` в `withPayload`

### 2. Файлы Payload в app

Скопировать из [Blank Template](<https://github.com/payloadcms/payload/tree/main/templates/blank/src/app/(payload)>) в `src/app/(payload)/`:

- `layout.tsx`, `[[...segments]]/page.tsx` — роуты админки
- `api/[...slug]/route.ts` — REST API

В итоге Payload будет отдавать админку по `/admin`.

### 3. Конфиг Payload и локализация

- В `payload.config.ts` настроить `localization: { locales: ['ru', 'en'], defaultLocale: 'ru' }`
- Создать коллекции: `Media`, `Services`, `Courses`, `Pages`
- Создать globals: `SiteSettings`, `Translations` (или одну глобальную структуру)
- Для полей с переводами указать `localized: true`

### 4. Переименование текущего админа

- Переименовать route group `(admin)` в `(office)` и маршруты `admin` → `office`
- Обновить middleware: защита `/office`, редиректы после login
- Обновить ссылки на login/admin в UI

### 5. Миграция контента

- Скрипт миграции: читает `ru.json` и `en.json`, создаёт документы в Payload через Local API
- Загрузка hero-bg, logo и др. изображений в Media, привязка к SiteSettings

### 6. Изменения на фронтенде

- Новый модуль `src/shared/lib/payload.ts`: `getPayload()`, `getSiteContent(locale)`, `getServices(locale)` и т.п.
- Заменить `getTranslations(locale)` на `getSiteContent(locale)` в страницах и компонентах
- Использовать Payload Media URLs вместо путей вида `/images/hero-bg.png`
- Обновить Hero, Header, Footer, ServiceCard, ContactForm и остальные компоненты под CMS-данные

### 7. Динамические страницы

- Добавить route `[locale]/[...slug]/page.tsx` (catch-all) для Pages
- Условно: если slug не найден в CMS — fallback на 404 или статичные маршруты
- Обновить sitemap и middleware при необходимости

## Основные файлы для изменений

| Файл                                                             | Изменения                                                 |
| ---------------------------------------------------------------- | --------------------------------------------------------- |
| [next.config.ts](next.config.ts)                                 | `withPayload(nextConfig)`                                 |
| [tsconfig.json](tsconfig.json)                                   | path `@payload-config`                                    |
| [src/shared/i18n/utils.ts](src/shared/i18n/utils.ts)             | Заменить/дополнить вызовами Payload или оставить fallback |
| [src/features/Hero/Hero.tsx](src/features/Hero/Hero.tsx)         | Image из Media URL                                        |
| [src/features/header/Header.tsx](src/features/header/Header.tsx) | Logo из Media                                             |
| Страницы `[locale]/`\*                                           | Подключение Payload вместо getTranslations                |
| [src/middleware.ts](src/middleware.ts)                           | Пути `/admin` (Payload), `/office` (NocoDB)               |

## Docker + PostgreSQL + миграции

**Создано:**

- [docker-compose.yml](docker-compose.yml) — PostgreSQL 16, порт 5432, healthcheck
- [.env.example](.env.example) — шаблон с `DATABASE_URL` и `PAYLOAD_SECRET`

**Команды (package.json):**

| Команда                  | Описание                                              |
| ------------------------ | ----------------------------------------------------- |
| `yarn docker:up`         | Запуск PostgreSQL в Docker                            |
| `yarn docker:down`       | Остановка контейнеров                                 |
| `yarn dev:docker`        | Поднять Postgres, дождаться готовности, запустить dev |
| `yarn db:migrate`        | Применить миграции Payload (`payload migrate`)        |
| `yarn db:migrate:create` | Создать новую миграцию (`payload migrate:create`)     |

**Workflow миграций:**

1. После изменения схемы в `payload.config.ts`: `yarn db:migrate:create`
2. Применить: `yarn db:migrate`
3. В dev с `push: true` Drizzle сам синхронизирует схему; для prod — только миграции

## Переменные окружения

```
DATABASE_URL=postgresql://ebcenter:ebcenter@localhost:5432/ebcenter
PAYLOAD_SECRET=<openssl rand -base64 32>
```

## Риски и примечания

- Переход на pnpm: потребуется обновить CI/CD, `packageManager` в `package.json`
- Payload 3 — стабильная версия; уточнить совместимость с Next.js 15.2.x
- Резервный вариант: оставить i18n для критичных UI-строк и переносить в CMS только контент (services, courses, hero, footer)
