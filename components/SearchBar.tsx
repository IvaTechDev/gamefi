'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { SearchBarProps } from '@/lib/types'
import { debounce } from '@/lib/utils'
import { SEARCH_DEBOUNCE_MS } from '@/lib/constants'

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = 'Search games by name, category, or blockchain...', 
  debounceMs = SEARCH_DEBOUNCE_MS 
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)

  // Debounced onChange
  useEffect(() => {
    const debouncedOnChange = debounce((newValue: string) => {
      onChange(newValue)
    }, debounceMs)

    debouncedOnChange(localValue)
  }, [localValue, onChange, debounceMs])

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleClear = () => {
    setLocalValue('')
    onChange('')
  }

  return (
    <div className="relative">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="w-5 h-5 text-white/40" />
      </div>

      {/* Input */}
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-4 bg-deep-space/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-bitcoin-orange/50 focus:ring-2 focus:ring-bitcoin-orange/20 transition-all duration-200"
      />

      {/* Clear Button */}
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-5 h-5 text-white/60 hover:text-white" />
        </button>
      )}
    </div>
  )
}
