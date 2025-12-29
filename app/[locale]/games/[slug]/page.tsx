import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllGames, getGameBySlug } from '@/lib/data'
import { locales } from '@/i18n/request'
import GameDetailClient from './GameDetailClient'

export function generateStaticParams() {
  const games = getAllGames()
  return locales.flatMap((locale) =>
    games.map((game) => ({
      locale,
      slug: game.slug
    }))
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const game = getGameBySlug(slug)

  if (!game) {
    return {
      title: 'Game Not Found',
    }
  }

  return {
    title: `${game.name} - GameFi Catalog`,
    description: game.short_description,
    openGraph: {
      title: game.name,
      description: game.short_description,
      images: [game.logo],
    },
  }
}

export default async function GameDetailPage({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  const game = getGameBySlug(slug)

  if (!game) {
    notFound()
  }

  return <GameDetailClient game={game} />
}
