import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

export const locales = ['en', 'ua', 'ru'] as const
export const defaultLocale = 'en'

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!locale || !locales.includes(locale as any)) {
    //notFound()
    locale = defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
