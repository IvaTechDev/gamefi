'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const t = useTranslations('language')
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const locales = [
    { code: 'en', name: t('en') },
    { code: 'ua', name: t('ua') },
    { code: 'ru', name: t('ru') }
  ]

  const handleLocaleChange = (newLocale: string) => {
    // Extract current locale from pathname if present
    const pathSegments = pathname.split('/').filter(Boolean)
    const currentLocale = pathSegments[0]
    
    // Replace locale in pathname or add it
    let newPath
    if (locales.some(locale => locale.code === currentLocale)) {
      // Path has locale prefix, replace it
      newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    } else {
      // Path doesn't have locale prefix, add it
      newPath = `/${newLocale}${pathname === '/' ? '' : pathname}`
    }

    router.push(newPath)
    setIsOpen(false)
  }

  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLocale = locales.some(locale => locale.code === pathSegments[0]) ? pathSegments[0] : 'en'
  const currentLocaleName = locales.find(locale => locale.code === currentLocale)?.name || t('en')

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-mono"
        aria-label="Change language"
      >
        <span>{currentLocaleName}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-cosmic-void border border-white/10 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {locales.map((locale) => (
              <button
                key={locale.code}
                onClick={() => handleLocaleChange(locale.code)}
                className={`block w-full text-left px-4 py-2 text-sm font-mono hover:bg-white/10 transition-colors ${
                  locale.code === currentLocale ? 'text-bitcoin-orange font-semibold' : 'text-white/70'
                }`}
              >
                {locale.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}