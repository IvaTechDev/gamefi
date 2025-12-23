import { EmptyStateType } from '@/lib/types'
import { Search, Database, AlertCircle, Frown } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  type?: EmptyStateType
  message?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
}

export default function EmptyState({ 
  type = 'no-results', 
  message,
  action 
}: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'no-games':
        return <Database className="w-16 h-16 text-white/20" />
      case 'no-results':
        return <Search className="w-16 h-16 text-white/20" />
      case 'game-not-found':
        return <AlertCircle className="w-16 h-16 text-white/20" />
      case 'no-featured':
        return <Frown className="w-16 h-16 text-white/20" />
      default:
        return <Search className="w-16 h-16 text-white/20" />
    }
  }

  const getDefaultMessage = () => {
    switch (type) {
      case 'no-games':
        return "We're currently building our catalog. Check back soon for the best Play-to-Earn games."
      case 'no-results':
        return 'No games match your filters. Try adjusting your search criteria or clearing some filters.'
      case 'game-not-found':
        return "The game you're looking for doesn't exist in our catalog."
      case 'no-featured':
        return 'No featured games available at the moment. Check out our full catalog instead.'
      default:
        return 'No results found.'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <div className="mb-6">
        {getIcon()}
      </div>

      {/* Message */}
      <p className="text-lg text-white/70 max-w-md mb-8">
        {message || getDefaultMessage()}
      </p>

      {/* Action Button */}
      {action && (
        <>
          {action.href ? (
            <Link
              href={action.href}
              className="btn-primary"
            >
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="btn-primary"
            >
              {action.label}
            </button>
          )}
        </>
      )}
    </div>
  )
}
