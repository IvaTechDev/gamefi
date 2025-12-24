// lib/constants.ts

/**
 * Available game categories
 * Used for filtering and display
 */
export const CATEGORIES = [
  'Action RPG',
  'Auto-Battler',
  'Battle Royale',
  'Collectible',
  'DeFi',
  'Extraction Shooter',
  'Fantasy Sports',
  'Farming',
  'Fitness',
  'FPS',
  'Fully On-Chain',
  'Idle',
  'Lifestyle',
  'Metaverse',
  'Mining',
  'MMO',
  'MMORPG',
  'Move-to-Earn',
  'Multiplayer',
  'Open World',
  'RPG',
  'Sci-Fi',
  'Shooter',
  'Simulation',
  'Social',
  'Space Sim',
  'Strategy',
  'Tap-to-Earn',
  'TCG',
  'Turn-Based',
  'UGC',
] as const

/**
 * Supported blockchain networks
 * Sorted alphabetically for display
 */
export const BLOCKCHAINS = [
  'Avalanche',
  'Base',
  'Ethereum',
  'Ethereum (Starkware)',
  'Hive',
  'Immutable X',
  'NEAR',
  'Open Loot',
  'Polygon',
  'Proof of Play (Apex)',
  'Ronin',
  'SKALE',
  'Solana',
  'TON',
  'WAX',
] as const

/**
 * Available gaming platforms
 * Used for filtering games by accessibility
 */
export const PLATFORMS = [
  'Web',
  'PC',
  'Mac',
  'Mobile',
  'Mobile (Telegram)',
  'PS5',
  'Xbox',
] as const

/**
 * Featured game slugs for homepage
 * These games will be displayed prominently on the homepage
 * Update this list to change featured games
 */
export const FEATURED_GAME_SLUGS = [
  'hamster-kombat',    // Most popular Telegram game
  'pixels',            // Top social farming game
  'off-the-grid',      // AAA Battle Royale showcase
  'illuvium',          // Visual showcase
  'axie-infinity',     // Original P2E pioneer
  'gods-unchained',    // TCG representation
] as const

/**
 * Homepage statistics ticker data
 * Static values for visual appeal and trust building
 */
export const STATS = [
  {
    label: 'Games Listed',
    value: '50+',
    icon: 'Gamepad2',
    description: 'Curated Play-to-Earn games',
  },
  {
    label: 'Total Daily Users',
    value: '5.5M+',
    icon: 'Users',
    description: 'Active players worldwide',
  },
  {
    label: 'Blockchains',
    value: '14+',
    icon: 'Network',
    description: 'Supported networks',
  },
  {
    label: 'Free-to-Play',
    value: '85%',
    icon: 'Wallet',
    description: 'No entry cost required',
  },
] as const

/**
 * Maximum number of games to show per page in catalog
 * Used for pagination/load-more functionality
 */
export const GAMES_PER_PAGE = 12

/**
 * Number of related games to show on game detail page
 */
export const RELATED_GAMES_COUNT = 3

/**
 * Debounce delay for search input (milliseconds)
 */
export const SEARCH_DEBOUNCE_MS = 300

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/gamefi_catalog',
  discord: 'https://discord.gg/gamefi',
  telegram: 'https://t.me/gamefi_catalog',
  github: 'https://github.com/yourusername/gamefi-catalog',
} as const

/**
 * Navigation links for header
 */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/games' },
  { label: 'About', href: '/#about' },
] as const

/**
 * Footer link groups
 */
export const FOOTER_LINKS = {
  product: [
    { label: 'Game Catalog', href: '/games' },
    { label: 'Featured Games', href: '/#featured' },
    { label: 'Categories', href: '/games#categories' },
  ],
  resources: [
    { label: 'About GameFI', href: '/#about' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'FAQ', href: '/#faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
} as const

/**
 * Category icons mapping
 * Maps category names to Lucide icon names
 */
export const CATEGORY_ICONS: Record<string, string> = {
  'Action RPG': 'Swords',
  'Auto-Battler': 'Zap',
  'Battle Royale': 'Target',
  'Collectible': 'Package',
  'DeFi': 'TrendingUp',
  'Extraction Shooter': 'Crosshair',
  'Fantasy Sports': 'Trophy',
  'Farming': 'Sprout',
  'Fitness': 'Activity',
  'FPS': 'Crosshair',
  'Fully On-Chain': 'Link',
  'Idle': 'Clock',
  'Lifestyle': 'Heart',
  'Metaverse': 'Globe',
  'Mining': 'Pickaxe',
  'MMO': 'Users',
  'MMORPG': 'Users',
  'Move-to-Earn': 'Footprints',
  'Multiplayer': 'Users',
  'Open World': 'Map',
  'RPG': 'Sword',
  'Sci-Fi': 'Rocket',
  'Shooter': 'Target',
  'Simulation': 'Settings',
  'Social': 'MessageCircle',
  'Space Sim': 'Rocket',
  'Strategy': 'Brain',
  'Tap-to-Earn': 'MousePointer',
  'TCG': 'Layers',
  'Turn-Based': 'RefreshCw',
  'UGC': 'Paintbrush',
} as const
