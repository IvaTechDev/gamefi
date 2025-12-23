# Multilingual Support Plan for GameFI Catalog

## Overview
Implement internationalization (i18n) for English (en), Ukrainian (ua), and Russian (ru) using next-intl library. The site uses Next.js 15 app router with static export, so locales will be handled via URL paths (/en, /ua, /ru).

## Architecture

```mermaid
graph TD
    A[User visits URL] --> B{Middleware detects locale}
    B --> C{Valid locale?}
    C -->|Yes| D[Route to /[locale]/page]
    C -->|No| E[Redirect to /en or default]
    D --> F[Load translations from messages/[locale].json]
    F --> G[Render page with t() functions]
    G --> H[Static export generates /en/, /ua/, /ru/ folders]

    I[Language Switcher] --> J[Update URL with new locale]
    J --> K[Reload page with new locale]
```

## Folder Structure After Implementation

```
app/
├── [locale]/
│   ├── layout.tsx          # Locale-aware layout
│   ├── page.tsx           # Homepage
│   ├── globals.css
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── games/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── favicon.ico
└── ...

i18n/
├── request.ts             # Server-side i18n config
└── messages/
    ├── en.json
    ├── ua.json
    └── ru.json

middleware.ts              # Locale detection middleware

components/
├── LanguageSwitcher.tsx   # New component
└── ... (updated to use translations)
```

## Key Components

### 1. i18n Configuration
- `i18n/request.ts`: Server-side config with locale list and default
- `middleware.ts`: Detects locale from URL path or accept-language header

### 2. Translation Files
- `messages/en.json`: English translations
- `messages/ua.json`: Ukrainian translations
- `messages/ru.json`: Russian translations

### 3. Updated Components
- All text content moved to translation keys
- Use `useTranslations()` hook from next-intl
- Metadata updated per locale

### 4. Language Switcher
- Component to switch between en/ua/ru
- Updates URL path and reloads page

### 5. Multilingual Game Data
- `games.json`: Modified to include locale-specific fields:
  - `short_description_en`, `short_description_ua`, `short_description_ru`
  - `long_description_en`, `long_description_ua`, `long_description_ru`
- Game components will use the appropriate description based on current locale

## Implementation Steps

1. **Install Dependencies**
   - Add `next-intl` to package.json

2. **Create i18n Infrastructure**
   - i18n/request.ts
   - middleware.ts
   - messages/*.json files

3. **Update Next.js Config**
   - Add i18n routing to next.config.js

4. **Restructure App Directory**
   - Move all pages under [locale] folder
   - Update imports and routing

5. **Update Components**
   - Replace hardcoded strings with t() calls
   - Update metadata generation

6. **Add Language Switcher**
   - Create component
   - Integrate into header

7. **Modify Game Data**
   - Add multilingual description fields to games.json
   - Update game components to use locale-specific fields

8. **Testing & Export**
   - Test locale switching
   - Verify static export works
   - Update sitemap for all locales

## Challenges

- Static export compatibility with dynamic routes
- Maintaining existing animations and styling
- SEO optimization for multiple locales
- Translation quality and consistency
- Managing larger games.json file with multiple languages

## Benefits

- Reach Ukrainian and Russian-speaking GameFi communities
- Improved SEO for regional searches
- Better user experience for non-English speakers
- Foundation for future language additions
- Localized game descriptions for better engagement