# 🎮 GameFI Catalog

A modern, static Next.js website showcasing the best Play-to-Earn blockchain games. Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- **50+ Curated Games** - Hand-picked Play-to-Earn blockchain games
- **Advanced Filtering** - Filter by category, blockchain, platform, and F2P status
- **Real-time Search** - Instant search with weighted relevance scoring
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Static Export** - Lightning-fast loading with Cloudflare Pages
- **SEO Optimized** - Complete meta tags, Open Graph, sitemap, and robots.txt
- **"Crypto" Aesthetic** - Custom design with Bitcoin orange and digital gold colors

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create static export
npm run build

# The static site will be in the `out/` directory
```

## 📁 Project Structure

```
gamefi/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   ├── sitemap.ts         # Dynamic sitemap
│   ├── robots.ts          # Robots.txt config
│   └── games/
│       ├── page.tsx       # Game catalog
│       └── [slug]/        # Dynamic game pages
│           └── page.tsx
├── components/             # React components
│   ├── GameCard.tsx       # Game display card
│   ├── GameGrid.tsx       # Responsive grid
│   ├── SearchBar.tsx      # Search with debounce
│   ├── FilterPanel.tsx    # Multi-filter interface
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer with links
│   ├── Breadcrumbs.tsx    # Breadcrumb navigation
│   ├── EmptyState.tsx     # Empty/error states
│   └── GameGridSkeleton.tsx # Loading skeleton
├── lib/                    # Core logic
│   ├── types.ts           # TypeScript interfaces
│   ├── constants.ts       # Categories, blockchains, stats
│   ├── data.ts            # Data loading functions
│   └── utils.ts           # Utility functions
├── public/                 # Static assets
├── games.json             # Game database
└── plan/                  # Project documentation
```

## 🎨 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages (static export)

## 🌈 Design System

- **Colors**:
  - Bitcoin Orange: `#F7931A`
  - Digital Gold: `#FFD600`
  - Cosmic Void: `#030304`
  - Deep Space: `#0F1115`

- **Typography**:
  - Headings: Space Grotesk
  - Body: Inter
  - Mono/Data: JetBrains Mono

## 📊 Game Data

Games are stored in [`games.json`](games.json) with the following structure:

```json
{
  "name": "Game Name",
  "ticker": "TOKEN",
  "category": ["RPG", "Strategy"],
  "est_dau": "100,000+",
  "chain": "Ethereum",
  "platforms": ["PC", "Mobile"],
  "is_f2p": true,
  "short_description": "Brief description...",
  "long_description": "Detailed description...",
  "url": "https://game-website.com",
  "logo": "https://logo-url.png"
}
```

## 🚢 Deployment

### Cloud fare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build configuration:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node.js version**: `20.x`
3. Deploy!

The site will be available at `https://your-project.pages.dev`

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for the Web3 Gaming Community**
