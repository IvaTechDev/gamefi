import { getAllGames } from '@/lib/data'
import { locales } from '@/i18n/request'
import GamesPageClient from './GamesPageClient'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function GamesPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const allGames = getAllGames()
  
  return <GamesPageClient locale={locale} allGames={allGames} />
}
