'use client'

import { FilterPanelProps } from '@/lib/types'
import { CATEGORIES, BLOCKCHAINS, PLATFORMS } from '@/lib/constants'
import { X, Filter, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function FilterPanel({ 
  filters, 
  onFilterChange, 
  totalResults,
  isOpen = true,
  onClose 
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    blockchains: false,
    platforms: false,
    other: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    
    onFilterChange({ ...filters, categories: newCategories })
  }

  const toggleBlockchain = (blockchain: string) => {
    const newBlockchains = filters.blockchains.includes(blockchain)
      ? filters.blockchains.filter(b => b !== blockchain)
      : [...filters.blockchains, blockchain]
    
    onFilterChange({ ...filters, blockchains: newBlockchains })
  }

  const togglePlatform = (platform: string) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter(p => p !== platform)
      : [...filters.platforms, platform]
    
    onFilterChange({ ...filters, platforms: newPlatforms })
  }

  const toggleF2P = (value: boolean | null) => {
    onFilterChange({ ...filters, isFreeToPlay: value })
  }

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      blockchains: [],
      platforms: [],
      isFreeToPlay: null,
      minDAU: 0,
      searchQuery: filters.searchQuery, // Keep search query
    })
  }

  const activeFilterCount = 
    filters.categories.length + 
    filters.blockchains.length + 
    filters.platforms.length + 
    (filters.isFreeToPlay !== null ? 1 : 0) + 
    (filters.minDAU > 0 ? 1 : 0)

  if (!isOpen) return null

  return (
    <div className="glass-morphism rounded-2xl p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-custom">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-bitcoin-orange" />
          <h2 className="text-lg font-heading font-bold">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-bitcoin-orange/20 text-bitcoin-orange text-xs font-mono rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 p-3 bg-white/5 rounded-lg border border-white/10">
        <p className="text-sm text-white/70">
          <span className="font-mono text-bitcoin-orange font-semibold">{totalResults}</span> games found
        </p>
      </div>

      {/* Clear All */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="w-full mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-white/70 hover:bg-white/10 hover:text-white transition-all"
        >
          Clear All Filters
        </button>
      )}

      {/* Filter Sections */}
      <div className="space-y-4">
        {/* Categories */}
        <div className="border-b border-white/10 pb-4">
          <button
            onClick={() => toggleSection('categories')}
            className="w-full flex items-center justify-between mb-3 text-left"
          >
            <span className="font-mono text-sm font-semibold text-white/90">Categories</span>
            <ChevronDown 
              className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {expandedSections.categories && (
            <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-custom">
              {CATEGORIES.map(category => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer group py-1"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-bitcoin-orange focus:ring-bitcoin-orange/50 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Blockchains */}
        <div className="border-b border-white/10 pb-4">
          <button
            onClick={() => toggleSection('blockchains')}
            className="w-full flex items-center justify-between mb-3 text-left"
          >
            <span className="font-mono text-sm font-semibold text-white/90">Blockchains</span>
            <ChevronDown 
              className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.blockchains ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {expandedSections.blockchains && (
            <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-custom">
              {BLOCKCHAINS.map(blockchain => (
                <label
                  key={blockchain}
                  className="flex items-center gap-2 cursor-pointer group py-1"
                >
                  <input
                    type="checkbox"
                    checked={filters.blockchains.includes(blockchain)}
                    onChange={() => toggleBlockchain(blockchain)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-bitcoin-orange focus:ring-bitcoin-orange/50 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                    {blockchain}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Platforms */}
        <div className="border-b border-white/10 pb-4">
          <button
            onClick={() => toggleSection('platforms')}
            className="w-full flex items-center justify-between mb-3 text-left"
          >
            <span className="font-mono text-sm font-semibold text-white/90">Platforms</span>
            <ChevronDown 
              className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.platforms ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {expandedSections.platforms && (
            <div className="space-y-2">
              {PLATFORMS.map(platform => (
                <label
                  key={platform}
                  className="flex items-center gap-2 cursor-pointer group py-1"
                >
                  <input
                    type="checkbox"
                    checked={filters.platforms.includes(platform)}
                    onChange={() => togglePlatform(platform)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-bitcoin-orange focus:ring-bitcoin-orange/50 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                    {platform}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Other Filters */}
        <div className="pb-4">
          <button
            onClick={() => toggleSection('other')}
            className="w-full flex items-center justify-between mb-3 text-left"
          >
            <span className="font-mono text-sm font-semibold text-white/90">Other</span>
            <ChevronDown 
              className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.other ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {expandedSections.other && (
            <div className="space-y-4">
              {/* Free-to-Play */}
              <div>
                <label className="block text-sm font-mono text-white/70 mb-2">Free-to-Play</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleF2P(null)}
                    className={`flex-1 px-3 py-2 text-xs font-mono rounded-lg border transition-all ${
                      filters.isFreeToPlay === null
                        ? 'bg-bitcoin-orange/20 border-bitcoin-orange text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => toggleF2P(true)}
                    className={`flex-1 px-3 py-2 text-xs font-mono rounded-lg border transition-all ${
                      filters.isFreeToPlay === true
                        ? 'bg-bitcoin-orange/20 border-bitcoin-orange text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    F2P
                  </button>
                  <button
                    onClick={() => toggleF2P(false)}
                    className={`flex-1 px-3 py-2 text-xs font-mono rounded-lg border transition-all ${
                      filters.isFreeToPlay === false
                        ? 'bg-bitcoin-orange/20 border-bitcoin-orange text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    Paid
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
