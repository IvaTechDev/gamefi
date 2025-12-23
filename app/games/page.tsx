'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import type { Metadata } from 'next'
import { getAllGames } from '@/lib/data'
import { filterGames } from '@/lib/utils'
import { FilterState } from '@/lib/types'
import SearchBar from '@/components/SearchBar'
import FilterPanel from '@/components/FilterPanel'
import GameGrid from '@/components/GameGrid'
import { SlidersHorizontal } from 'lucide-react'
import { gsap } from '@/lib/animations/gsapConfig'

export default function GamesPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    blockchains: [],
    platforms: [],
    isFreeToPlay: null,
    minDAU: 0,
    searchQuery: '',
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const allGames = getAllGames()
  const filteredGames = useMemo(() => filterGames(allGames, filters), [allGames, filters])

  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }))
  }

  // Header animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const timer = setTimeout(() => {
      if (!headerRef.current) return
      
      if (prefersReducedMotion) {
        gsap.set(headerRef.current.children, { y: 0 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.from(headerRef.current.children, {
        y: 30,
        duration: 0.7,
        stagger: 0.15
      })
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Search bar animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const timer = setTimeout(() => {
      if (!searchRef.current) return
      
      if (prefersReducedMotion) {
        gsap.set(searchRef.current, { y: 0 })
        return
      }

      gsap.from(searchRef.current, {
        y: 20,
        duration: 0.6,
        delay: 0.4,
        ease: 'power3.out'
      })
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-deep-space to-cosmic-void border-b border-white/10">
        <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Game <span className="gradient-text">Catalog</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Browse {allGames.length}+ Play-to-Earn blockchain games. Filter by category, blockchain, platform, and more.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div ref={searchRef} className="mb-8">
          <SearchBar 
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full btn-secondary flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters {filters.categories.length + filters.blockchains.length + filters.platforms.length > 0 && `(${filters.categories.length + filters.blockchains.length + filters.platforms.length})`}</span>
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:block ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              totalResults={filteredGames.length}
              isOpen={true}
              onClose={() => setMobileFiltersOpen(false)}
            />
          </aside>

          {/* Games Grid */}
          <div className="lg:col-span-3">
            {filteredGames.length > 0 ? (
              <GameGrid games={filteredGames} />
            ) : (
              <GameGrid 
                games={[]} 
                emptyMessage="No games match your filters. Try adjusting your criteria."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
