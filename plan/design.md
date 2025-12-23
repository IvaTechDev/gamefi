# Design Philosophy: The "GameFi" Aesthetic

This style embodies the visual DNA of decentralized finance—a sophisticated fusion of precision engineering, cryptographic trust, and digital gold. It is **not generic dark mode**; it is a deep cosmic void where data structures glow with the warmth of orange and the brilliance of digital gold.

## Core Design Principles

1.  **Luminescent Energy**: Light emanates from interactive elements themselves. Bitcoin orange glows, golden highlights shimmer, and data points pulse with life against the true void background. Shadows are colored (orange/gold tints), not just black.

2.  **Mathematical Precision**: Everything follows strict geometric rules. Ultra-thin 1px borders define boundaries, monospace fonts display data with technical accuracy, and grids provide the underlying structure of the blockchain aesthetic.

3.  **Layered Depth**: Create three-dimensional space through transparency stacking (glass morphism), colored glow shadows, and backdrop blur effects. Elements float in Z-space without heavy skeuomorphism—it's digital depth, not physical.

4.  **Textured Void**: Backgrounds are never flat. Subtle grid patterns (representing blockchain networks), radial gradient blurs (representing energy fields), and noise textures bring the void to life. The darkness breathes.

5.  **Trust Through Design**: High contrast, clear hierarchy, and technical precision communicate security and reliability. The aesthetic says "your assets are safe here."

The vibe is **Secure, Technical, and Valuable**. This is digital gold—it should feel premium, cutting-edge, and engineered to perfection. Think Bitcoin mining rigs humming in the darkness, glowing with orange heat.

## Typography
The type system balances technical precision with modern geometric forms.

*   **Headings**: `Space Grotesk` (Google Font) - A geometric grotesque with quirky technical character
    *   Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
    *   Usage: All headings (h1-h6), section titles, card titles
    *   Apply `font-heading` class

*   **Body**: `Inter` (Google Font) - Highly legible sans-serif optimized for screens
    *   Weights: 400 (Regular), 500 (Medium), 600 (Semibold)
    *   Usage: Body copy, descriptions, buttons
    *   Apply `font-body` class

*   **Mono/Data**: `JetBrains Mono` (Google Font) - Technical monospace for precision
    *   Weights: 400 (Regular), 500 (Medium)
    *   Usage: Stats, prices, badges, technical labels, navigation links
    *   Apply `font-mono` class

*   **Scale Philosophy**: Dramatic contrast between display and body. Heroes are massive (`text-4xl` → `md:text-7xl`), body is comfortable (`text-base` or `text-lg`). Mobile-first scaling prevents overwhelming small screens.

*   **Leading & Tracking**: Tight leading on headings (`leading-tight`), relaxed on body (`leading-relaxed`). Uppercase mono text gets generous tracking (`tracking-wider`, `tracking-widest`).

## Radius & Borders
Geometric precision with soft curves for approachability.

*   **Radius Tokens**:
    *   Cards/Containers: `rounded-2xl` (16px) or `rounded-xl` (12px)
    *   Buttons: `rounded-full` (pill shape)
    *   Inputs: `rounded-lg` (8px) or bottom-border only for minimalism
    *   Small elements (badges, icons): `rounded-lg` or `rounded-full`

*   **Border Philosophy**: Ultra-thin `1px` borders create delicate boundaries without visual weight
    *   Default state: `border border-white/10` (barely visible structure)
    *   Hover state: `border-[#F7931A]/50` (orange accent, 50% opacity)
    *   Active/Focus: `border-[#F7931A]` (full intensity)

*   **Special Border Techniques**:
    *   Corner accents: Small decorative border segments at corners (see How It Works cards)
    *   Gradient borders: Simulate with inner pseudo-elements or subtle box-shadow gradients

## Shadows & Effects (The Glow)
The signature of this style is **colored luminescence**—shadows and glows in orange and gold tints.

## Textures & Patterns
Backgrounds breathe with subtle, non-distracting patterns that reinforce the blockchain/network theme.

*   **Grid Pattern** (Signature):
    *   Creates a fading grid that disappears toward edges (vignette effect)
    *   Used on hero section

*   **Radial Gradient Blurs**: Massive, soft color blobs for ambient lighting
    *   Position absolutely, use low opacity (5-10%), apply blur-[120px] or blur-[150px]
    *   Creates depth and guides eye to focal points

# Component Stylings

## Buttons
Buttons are bold, pill-shaped, and emit colored light. All use `rounded-full` for the signature crypto pill shape.
All buttons include smooth `transition-all` for responsive micro-interactions.

## Cards (The "Block" Concept)
Cards are elevated surfaces that float above the void, representing blocks in the chain.

## Inputs
Minimalist, precise input fields with bottom-border styling for a technical aesthetic.
Inputs feel like data entry terminals—clean, precise, and purposeful.

## Icons
Icons from `lucide-react` reinforce the technical, precise aesthetic.

# Non-Generic "Bold" Choices

This design MUST NOT look like default Tailwind. These bold choices create unmistakable personality:

1.  **Gradient Text on Headlines**: Apply `bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent` to final 1-2 words of hero headlines. Creates instant visual hierarchy and Bitcoin brand association.

2.  **Spinning Orbital Rings**: Hero section features animated 3D-style orb with CSS rotating rings (`animate-[spin_10s_linear_infinite]` and reverse). Floating stat cards bounce around it with staggered delays.

3.  **Corner Border Accents**: "How It Works" cards use decorative corner borders (`border-t border-l` on top-left, `border-r border-b` on bottom-right) in Bitcoin orange, creating a "selected node" effect.

4.  **Glowing Animated Badges**: Pulsing dot badges (`animate-ping`) on trust indicators and status markers. Suggests live network activity.

5.  **Background Icon Watermarks**: Large, rotated, low-opacity icons in feature card backgrounds that reveal on hover (`opacity-20 group-hover:opacity-100`).

6.  **Timeline as Blockchain**: "How It Works" uses a vertical gradient line (orange to transparent) with numbered circular nodes, mimicking a blockchain ledger.

7.  **Asymmetric Pricing Scale**: The popular pricing tier is `scale-105` and elevated, while others are `opacity-80`, creating intentional hierarchy through scale manipulation.

8.  **Glass Morphism with Grid Patterns**: Combine `backdrop-blur` with background grid patterns visible through transparency, creating layered depth.

9.  **Colored Shadows Replace Black**: ALL shadows use orange/gold tints. No pure black shadows exist in this design system.

# Layout & Spacing

*   **Container Width**: `max-w-7xl` (1280px) - Wide and expansive to showcase data and content without cramping
*   **Section Padding**: Generous vertical `py-24` (96px) creates breathing room between major sections
*   **Density**: Spacious approach with `gap-8` (32px) or `gap-12` (48px) between grid items
*   **Section Dividers**: NO hard lines or `<hr>` elements. Sections separate through:
    *   Vertical spacing (`py-24`)
    *   Alternating backgrounds (`bg-[#030304]` → `bg-[#0F1115]` → `bg-[#030304]`)
    *   Subtle top/bottom borders on specific sections (e.g., stats ticker has `border-y`)

*   **Responsive Grids**:
    *   Mobile-first: Single column by default
    *   Tablet: `md:grid-cols-2` or `md:grid-cols-3`
    *   Desktop: Keep `md:grid-cols-3` or `lg:grid-cols-4` for features
    *   Pricing: Always `md:grid-cols-3` for tier comparison

# Animation & Motion

Motion should feel **precise, snappy, and purposeful**—like a high-performance trading terminal.

*   **Custom Float Animation**:
    *   Applied to hero 3D orb graphic
    *   Slow, smooth, endless float creates ethereal quality

*   **Spinning Orbitals**:
    *   Creates mesmerizing 3D depth illusion

*   **Bouncing Cards**: Floating stat cards use `animate-bounce` with custom durations (`3s`, `4s`) and delays (`delay-1s`) for staggered motion

*   **Pulsing Indicators**: Status badges use `animate-ping` for "live" feel

*   **Interaction Speed**: Fast and responsive (`duration-200` or `duration-300`)
    *   Button hover: `transition-all duration-300`
    *   Card lift: `transition-all duration-300`
    *   Input focus: Instant (`duration-200`)

*   **Hover Effects**:
    *   Cards: Lift (`-translate-y-1`), border color shift, glow intensification
    *   Buttons: Scale (`scale-105`), glow spread
    *   Images: Scale (`scale-110`), contrast boost (`contrast-125`)

The motion design communicates **speed, precision, and responsiveness**—critical values in crypto/finance.

# Responsive Strategy

The design must maintain its bold personality across all screen sizes while adapting gracefully.

*   **Mobile-First Philosophy**: Start with single-column layouts, scale up for larger screens

*   **Typography Scaling**: All headings use responsive classes
    *   Keep mobile readable, don't overwhelm small screens

*   **Touch Targets**: All interactive elements minimum 44px (`min-w-[44px]`, `h-10+`)

*   **Mobile Adaptations**:
    *   Navigation: Show only essential CTA on mobile, hide secondary nav
    *   Hero 3D graphic: Smaller size on mobile (`h-[300px] md:h-[450px]`)
    *   Grids: Single column → 2-3 columns at `md`
    *   Pricing cards: Stack vertically, remove scale effect on mobile
    *   How It Works timeline: Left-aligned on mobile with simpler layout

*   **Maintain Core Aesthetic**: Grid patterns, glows, and gradients persist on mobile—don't strip personality for smaller screens

# Accessibility & Best Practices

*   **Color Contrast**: White text on `#030304` exceeds WCAG AAA (21:1 ratio). Orange `#F7931A` on dark backgrounds meets AA for large text.
*   **Focus States**: All interactive elements have visible focus rings using `focus-visible:ring-2 focus-visible:ring-[#F7931A]`
*   **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3), `<nav>`, `<section>`, `<button>` elements
*   **Alt Text**: All images require descriptive alt attributes
*   **Keyboard Navigation**: All interactive elements accessible via Tab, buttons activate on Enter/Space
*   **Motion Preferences**: Consider `prefers-reduced-motion` for users sensitive to animation (disable float/spin animations)

# Implementation Notes

*   **Font Loading**: Use `fontImport()` helper to load Google Fonts
*   **Custom Classes**: Define `.font-heading`, `.font-body`, `.font-mono` in style block
*   **Grid Pattern**: Define `.bg-grid-pattern` with CSS-in-JS in style block
*   **Glass Morphism**: Define `.holographic-gradient` helper class
*   **Components**: Build Button, Card, and Input components using `cva` (class-variance-authority) following Shadcn patterns but with Crypto-specific styling
*   **Icons**: Import specific icons from `lucide-react` as needed (Zap, Lock, Layers, Globe, Check, etc.)
