import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Users, Globe, Check, X, ChevronRight } from 'lucide-react'
import { getAllGames, getGameBySlug } from '@/lib/data'
import { getRelatedGames, parseDAU, formatNumber } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import GameCard from '@/components/GameCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const games = getAllGames()
  return games.map((game) => ({
    slug: game.slug!,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const game = getGameBySlug(resolvedParams.slug)
  
  if (!game) {
    return {
      title: 'Game Not Found | GameFI Catalog',
      description: 'The requested game could not be found in our catalog.',
    }
  }

  return {
    title: `${game.name} (${game.ticker}) | GameFI Catalog`,
    description: game.short_description,
    keywords: `${game.name}, ${game.ticker}, ${game.category.join(', ')}, ${game.chain}, Play-to-Earn`,
    openGraph: {
      type: 'website',
      url: `https://gamefi-catalog.pages.dev/games/${resolvedParams.slug}`,
      title: `${game.name} (${game.ticker}) | Play-to-Earn Game on ${game.chain}`,
      description: game.short_description,
      images: [
        {
          url: game.logo || '/default-game-og.png',
          width: 800,
          height: 600,
          alt: `${game.name} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.name} (${game.ticker})`,
      description: game.short_description,
      images: [game.logo || '/default-game-twitter.png'],
    },
    alternates: {
      canonical: `https://gamefi-catalog.pages.dev/games/${resolvedParams.slug}`,
    },
  }
}

export default async function GameDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const game = getGameBySlug(resolvedParams.slug)
  
  if (!game) {
    notFound()
  }

  const allGames = getAllGames()
  const relatedGames = getRelatedGames(game, allGames, 3)
  const dau = parseDAU(game.est_dau)
  const formattedDAU = formatNumber(dau)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Catalog', href: '/games' },
    { label: game.name },
  ]

  return (
    <div className="min-h-screen">
      {/* Header Background */}
      <div className="h-64 bg-gradient-to-b from-deep-space to-cosmic-void border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-bitcoin-orange/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-24">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Game Header Card */}
        <div className="card-gamefi p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-deep-space border border-white/10">
                <Image
                  src={game.logo}
                  alt={`${game.name} logo`}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-grow">
              <div className="flex flex-wrap gap-3 mb-4">
                {game.is_f2p && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-digital-gold/20 border border-digital-gold/30 rounded-full text-digital-gold text-sm font-mono font-semibold">
                    <Check className="w-4 h-4" />
                    Free-to-Play
                  </span>
                )}
                {game.category.map(cat => (
                  <span key={cat} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-white/80">
                    {cat}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-2">
                {game.name}
              </h1>
              <p className="text-xl font-mono text-white/60 mb-6">{game.ticker}</p>

              <p className="text-lg text-white/80 leading-relaxed mb-6">
                {game.short_description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <Users className="w-5 h-5 text-bitcoin-orange flex-shrink-0" />
                  <div>
                     <p className="text-xs text-white/60 font-mono">Daily Users</p>
                    <p className="text-lg font-mono font-semibold">{formattedDAU}+</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <Globe className="w-5 h-5 text-digital-gold flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/60 font-mono">Blockchain</p>
                    <p className="text-sm font-mono font-semibold">{game.chain}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 col-span-2 md:col-span-1">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {game.platforms.length > 1 ? '🎮' : '💻'}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-xs text-white/60 font-mono">Platforms</p>
                    <p className="text-sm font-mono font-semibold truncate">{game.platforms.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary text-lg"
              >
                <span>Play Game</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Long Description */}
        <div className="card-gamefi p-8 mb-12">
          <h2 className="text-2xl font-heading font-bold mb-6">About {game.name}</h2>
          <div className="prose prose-invert max-w-none">
            {game.long_description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-white/70 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Related Games */}
        {relatedGames.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-heading font-bold">
                Related <span className="gradient-text">Games</span>
              </h2>
              <Link 
                href="/games"
                className="text-sm font-mono text-bitcoin-orange hover:text-digital-gold flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGames.map((relatedGame) => (
                <GameCard key={relatedGame.slug} game={relatedGame} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
