export default function GameGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card-gamefi animate-pulse">
          {/* Image skeleton */}
          <div className="h-48 bg-white/5 rounded-t-2xl" />
          
          {/* Content skeleton */}
          <div className="p-5 space-y-3">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-6 bg-white/5 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-1/4" />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-5/6" />
            </div>
            
            {/* Categories */}
            <div className="flex gap-2">
              <div className="h-6 bg-white/5 rounded w-16" />
              <div className="h-6 bg-white/5 rounded w-20" />
              <div className="h-6 bg-white/5 rounded w-16" />
            </div>
            
            {/* Stats */}
            <div className="flex justify-between pt-3 border-t border-white/10">
              <div className="h-4 bg-white/5 rounded w-20" />
              <div className="h-4 bg-white/5 rounded w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
