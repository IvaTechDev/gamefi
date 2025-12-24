import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from '@/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  
  // Load translations for metadata
  let translations
  try {
    translations = await getMessages(locale)
  } catch (error) {
    notFound()
  }

  const t = translations.site

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'GameFI Catalog' }],
    creator: 'GameFI Catalog',
    publisher: 'GameFI Catalog',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'ua' ? 'uk_UA' : 'ru_RU',
      url: 'https://gamefi.ua',
      siteName: 'GameFI Catalog',
      title: t.title,
      description: t.description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'GameFI Catalog - Play-to-Earn Games',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: ['/twitter-image.png'],
      creator: '@gamefi_catalog',
    },
    alternates: {
      canonical: 'https://gamefi.ua',
      languages: {
        'en': 'https://gamefi.ua/en',
        'uk': 'https://gamefi.ua/ua',
        'ru': 'https://gamefi.ua/ru'
      }
    },
  }
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ua' },
    { locale: 'ru' }
  ]
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  
  const messages = await getMessages(locale)

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  )
}
