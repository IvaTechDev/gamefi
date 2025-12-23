import Link from 'next/link'
import Image from 'next/image'
import { GameCardProps } from '@/lib/types'
import { truncateText, parseDAU, formatNumber } from '@/lib/utils'
import { Users, Globe, Check } from 'lucide-react'

export default function GameCard({ game, featured = false, priority = false }: GameCardProps) {
  const dau = parseDAU(game.est_dau)
  const formattedDAU = formatNumber(dau)

  return (
    <Link 
      href={`/games/${game.slug}`}
      className={`card-gamefi group block h-full ${featured ? 'border-glow-animation' : ''}`}
    >
      {/* Game Logo */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl bg-deep-space">
        <Image
          src={game.logo}
          alt={`${game.name} logo`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          priority={priority}
          unoptimized
        />
        
        {/* F2P Badge */}
        {game.is_f2p && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-digital-gold/90 backdrop-blur-sm rounded-full">
            <Check className="w-3 h-3 text-cosmic-void" />
            <span className="text-xs font-mono font-semibold text-cosmic-void">F2P</span>
          </div>
        )}
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-bitcoin-orange/90 backdrop-blur-sm rounded-full">
            <span className="text-xs font-mono font-semibold text-cosmic-void">FEATURED</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-3">
        {/* Name & Ticker */}
        <div className="space-y-1">
          <h3 className="text-xl font-heading font-bold line-clamp-1 group-hover:text-bitcoin-orange transition-colors">
            {game.name}
          </h3>
          <p className="text-sm font-mono text-white/60">{game.ticker}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">
          {truncateText(game.short_description, 100)}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {game.category.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="px-2 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded-lg text-white/80"
            >
              {cat}
            </span>
          ))}
          {game.category.length > 3 && (
            <span className="px-2 py-1 text-xs font-mono text-white/50">
              +{game.category.length - 3}
            </span>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          {/* DAU */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-bitcoin-orange" />
            <span className="text-sm font-mono text-white/80">{formattedDAU}+ DAU</span>
          </div>

          {/* Blockchain */}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-digital-gold" />
            <span className="text-xs font-mono text-white/60 truncate max-w-[100px]">
              {game.chain}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
