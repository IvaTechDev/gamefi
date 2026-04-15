import { Metadata } from 'next'
import { getAllGames } from '@/lib/data'
import { locales } from '@/i18n/request'
import GamesPageClient from './GamesPageClient'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    alternates: {
      canonical: `https://gamefi.ua/${locale}/games/`,
    },
    openGraph: {
      type: 'website',
      url: `https://gamefi.ua/${locale}/games/`,
      title: 'Games - GameFI Catalog',
      images: ['/og-image.png'],
    },
  }
}

export default async function GamesPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const allGames = getAllGames()
  
  return <GamesPageClient locale={locale} allGames={allGames} />
}
