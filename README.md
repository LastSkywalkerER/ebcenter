# EBCenter Website

Веб-сайт компании EBCenter, предоставляющей услуги по проектно-сметным работам и обучению сметному делу.

## Технологии

- Next.js 14
- TypeScript
- Tailwind CSS
- Feature Sliced Architecture

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/ebcenter.git
cd ebcenter
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` в корневой директории проекта и добавьте необходимые переменные окружения:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Запустите проект в режиме разработки:
```bash
npm run dev
```

5. Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере.

## Структура проекта

Проект следует архитектуре Feature Sliced:

```
src/
├── app/                    # Страницы приложения
├── features/              # Функциональные компоненты
│   ├── header/           # Компонент шапки
│   ├── footer/           # Компонент подвала
│   ├── contact-form/     # Форма обратной связи
│   └── training-form/    # Форма записи на обучение
├── entities/             # Бизнес-сущности
│   ├── service/         # Сущность услуги
│   └── training/        # Сущность обучения
└── shared/              # Общие компоненты и утилиты
    ├── ui/              # UI компоненты
    ├── lib/             # Библиотеки и утилиты
    └── config/          # Конфигурации
```

## Сборка для продакшена

Для сборки проекта для продакшена выполните:

```bash
npm run build
```

Запуск собранного проекта:

```bash
npm start
```

## Лицензия

MIT
