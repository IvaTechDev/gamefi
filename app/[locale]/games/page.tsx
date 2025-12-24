'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Filter } from 'lucide-react'
import { getAllGames } from '@/lib/data'
import { parseDAU } from '@/lib/utils'
import GameGrid from '@/components/GameGrid'
import FilterPanel from '@/components/FilterPanel'
import SearchBar from '@/components/SearchBar'
import EmptyState from '@/components/EmptyState'
import { FilterState } from '@/lib/types'

export default function GamesPage() {
  const t = useTranslations('games')
  const allGames = getAllGames()
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    blockchains: [],
    platforms: [],
    isFreeToPlay: null,
    minDAU: 0,
    searchQuery: ''
  })
  const [sortBy, setSortBy] = useState<'dau' | 'name' | 'newest'>('dau')
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let filtered = allGames.filter(game => {
      const matchesSearch = filters.searchQuery === '' || 
        game.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        game.ticker.toLowerCase().includes(filters.searchQuery.toLowerCase())
      
      const matchesCategory = filters.categories.length === 0 || 
        game.category.some(cat => filters.categories.includes(cat))
      
      const matchesBlockchain = filters.blockchains.length === 0 || 
        filters.blockchains.includes(game.chain)
      
      const matchesPlatform = filters.platforms.length === 0 || 
        game.platforms.some(plat => filters.platforms.includes(plat))
      
      const matchesF2P = filters.isFreeToPlay === null || 
        game.is_f2p === filters.isFreeToPlay
      
      const dau = parseDAU(game.est_dau)
      const matchesDAU = dau >= filters.minDAU
      
      return matchesSearch && matchesCategory && matchesBlockchain && matchesPlatform && matchesF2P && matchesDAU
    })

    // Sort
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'newest') {
      // Sort by slug (assuming newer games have higher slugs or use reverse order)
      filtered.sort((a, b) => (b.slug || '').localeCompare(a.slug || ''))
    } else {
      // DAU sorting
      filtered.sort((a, b) => {
        const dauA = parseDAU(a.est_dau)
        const dauB = parseDAU(b.est_dau)
        return dauB - dauA
      })
    }

    return filtered
  }, [allGames, filters, sortBy])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }))
  }

  return (
    <div className="min-h-screen">
      {/* Header Background */}
      <div className="h-64 bg-gradient-to-b from-deep-space to-cosmic-void border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-bitcoin-orange/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-24">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-white/70">
            {t('description')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder={t('search_placeholder')}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-mono">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              totalResults={filteredGames.length}
              isOpen={true}
            />
          </div>

          {/* Games Content */}
          <div className="lg:col-span-3">
            {/* Sort */}
            <div className="mb-6 flex items-center gap-2">
              <span className="text-sm font-mono text-white/60">{t('sort.label')}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'dau' | 'name' | 'newest')}
                className="px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-sm font-mono text-white hover:bg-white/20 transition-colors"
              >
                <option value="dau">{t('sort.dau')}</option>
                <option value="name">{t('sort.name')}</option>
                <option value="newest">{t('sort.newest')}</option>
              </select>
            </div>

            {/* Mobile Filter Panel */}
            {showFilters && (
              <div className="lg:hidden mb-8 card-gamefi p-6">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  totalResults={filteredGames.length}
                  isOpen={true}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            )}

            {/* Results */}
            {filteredGames.length > 0 ? (
              <div>
                <p className="text-sm text-white/60 mb-6 font-mono">
                  {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} found
                </p>
                <GameGrid games={filteredGames} />
              </div>
            ) : (
              <EmptyState
                type="no-results"
                message={t('no_results')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
