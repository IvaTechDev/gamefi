import { GameGridProps } from '@/lib/types'
import GameCard from './GameCard'
import EmptyState from './EmptyState'

export default function GameGrid({ games, loading = false, emptyMessage }: GameGridProps) {
  if (loading) {
    return <div className="text-center py-12">Loading games...</div>
  }

  if (games.length === 0) {
    return (
      <EmptyState
        type="no-results"
        message={emptyMessage || 'No games found matching your criteria.'}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game, index) => (
        <GameCard 
          key={game.slug} 
          game={game} 
          priority={index < 6} 
        />
      ))}
    </div>
  )
}
