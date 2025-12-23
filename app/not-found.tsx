import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[600px] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl">
        {/* 404 Text */}
        <p className="text-9xl font-heading font-bold gradient-text animate-pulse-glow">
          404
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-heading font-bold">
          Game Not Found
        </h1>

        {/* Message */}
        <p className="text white/60 text-lg max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist in our metaverse. Perhaps it was moved, deleted, or never existed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/games"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
