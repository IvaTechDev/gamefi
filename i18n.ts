// i18n.ts
import { notFound } from 'next/navigation'

// Supported locales
export const locales = ['en', 'ua', 'ru'] as const

// Default locale
export const defaultLocale = 'ua' as const

export type Locale = (typeof locales)[number]

export const getMessages = async (locale: string) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return (await import(`./messages/${locale}.json`)).default
}

export const getLocale = () => {
  return defaultLocale
}
