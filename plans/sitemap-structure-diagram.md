# Multilingual Sitemap Structure Visualization

## Sitemap URL Hierarchy

```mermaid
graph TB
    Root[Sitemap.xml] --> EN[English Locale]
    Root --> UA[Ukrainian Locale]
    Root --> RU[Russian Locale]
    
    EN --> EN_Home[/en<br/>Priority: 1.0<br/>Frequency: daily]
    EN --> EN_Games[/en/games<br/>Priority: 0.9<br/>Frequency: daily]
    EN --> EN_Game1[/en/games/game-1<br/>Priority: 0.8<br/>Frequency: weekly]
    EN --> EN_Game2[/en/games/game-2<br/>Priority: 0.8<br/>Frequency: weekly]
    EN --> EN_GameN[/en/games/game-n<br/>Priority: 0.8<br/>Frequency: weekly]
    
    UA --> UA_Home[/ua<br/>Priority: 1.0<br/>Frequency: daily]
    UA --> UA_Games[/ua/games<br/>Priority: 0.9<br/>Frequency: daily]
    UA --> UA_Game1[/ua/games/game-1<br/>Priority: 0.8<br/>Frequency: weekly]
    UA --> UA_Game2[/ua/games/game-2<br/>Priority: 0.8<br/>Frequency: weekly]
    UA --> UA_GameN[/ua/games/game-n<br/>Priority: 0.8<br/>Frequency: weekly]
    
    RU --> RU_Home[/ru<br/>Priority: 1.0<br/>Frequency: daily]
    RU --> RU_Games[/ru/games<br/>Priority: 0.9<br/>Frequency: daily]
    RU --> RU_Game1[/ru/games/game-1<br/>Priority: 0.8<br/>Frequency: weekly]
    RU --> RU_Game2[/ru/games/game-2<br/>Priority: 0.8<br/>Frequency: weekly]
    RU --> RU_GameN[/ru/games/game-n<br/>Priority: 0.8<br/>Frequency: weekly]
    
    style Root fill:#667eea,stroke:#333,stroke-width:3px,color:#fff
    style EN fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
    style UA fill:#ed8936,stroke:#333,stroke-width:2px,color:#fff
    style RU fill:#f56565,stroke:#333,stroke-width:2px,color:#fff
```

## URL Generation Flow

```mermaid
flowchart LR
    A[Start Sitemap Generation] --> B{For each locale}
    B --> C[Generate Home Page URL]
    C --> D[Generate Catalog Page URL]
    D --> E{For each game}
    E --> F[Generate Game Detail URL]
    F --> G{More games?}
    G -->|Yes| E
    G -->|No| H{More locales?}
    H -->|Yes| B
    H -->|No| I[Return Sitemap Array]
    
    style A fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style I fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#ed8936,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#ed8936,stroke:#333,stroke-width:2px,color:#fff
```

## Data Flow Architecture

```mermaid
graph LR
    A[i18n.ts<br/>locales array] --> B[sitemap.ts]
    C[lib/data.ts<br/>getAllGames] --> B
    D[games.json<br/>game data] --> C
    B --> E[MetadataRoute.Sitemap]
    E --> F[sitemap.xml]
    
    style A fill:#fbd38d,stroke:#333,stroke-width:2px
    style B fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#fbd38d,stroke:#333,stroke-width:2px
    style D fill:#bee3f8,stroke:#333,stroke-width:2px
    style E fill:#9ae6b4,stroke:#333,stroke-width:2px
    style F fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
```

## Priority Hierarchy

```mermaid
graph TD
    A[Page Priority Structure] --> B[Priority 1.0<br/>Home Pages]
    A --> C[Priority 0.9<br/>Catalog Pages]
    A --> D[Priority 0.8<br/>Game Detail Pages]
    
    B --> B1[/en]
    B --> B2[/ua]
    B --> B3[/ru]
    
    C --> C1[/en/games]
    C --> C2[/ua/games]
    C --> C3[/ru/games]
    
    D --> D1[All game pages<br/>in all locales]
    
    style A fill:#667eea,stroke:#333,stroke-width:3px,color:#fff
    style B fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#ed8936,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#f6ad55,stroke:#333,stroke-width:2px,color:#fff
```

## Change Frequency Strategy

```mermaid
graph LR
    A[Change Frequency] --> B[Daily Updates]
    A --> C[Weekly Updates]
    
    B --> B1[Home Pages<br/>Featured games rotate<br/>Stats update]
    B --> B2[Catalog Pages<br/>New games added<br/>Rankings change]
    
    C --> C1[Game Detail Pages<br/>DAU updates<br/>Content stable]
    
    style A fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#ed8936,stroke:#333,stroke-width:2px,color:#fff
```

## URL Count Calculation

```mermaid
graph TD
    A[Total URLs] --> B[Static Pages]
    A --> C[Dynamic Pages]
    
    B --> B1[Home Pages: 3<br/>1 per locale]
    B --> B2[Catalog Pages: 3<br/>1 per locale]
    
    C --> C1[Game Pages<br/>N games × 3 locales]
    
    B1 --> D[Total Static: 6]
    B2 --> D
    C1 --> E[Total Dynamic: N × 3]
    
    D --> F[Grand Total<br/>6 + N × 3]
    E --> F
    
    F --> G[Example with 20 games<br/>6 + 20 × 3 = 66 URLs]
    
    style A fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style F fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
    style G fill:#ed8936,stroke:#333,stroke-width:2px,color:#fff
```

## Implementation Sequence

```mermaid
sequenceDiagram
    participant Build as Build Process
    participant Sitemap as sitemap.ts
    participant i18n as i18n.ts
    participant Data as lib/data.ts
    participant Games as games.json
    
    Build->>Sitemap: Generate sitemap
    Sitemap->>i18n: Get locales array
    i18n-->>Sitemap: ['en', 'ua', 'ru']
    Sitemap->>Data: getAllGames()
    Data->>Games: Read game data
    Games-->>Data: Return games array
    Data-->>Sitemap: Return all games
    
    loop For each locale
        Sitemap->>Sitemap: Add home page URL
        Sitemap->>Sitemap: Add catalog page URL
        loop For each game
            Sitemap->>Sitemap: Add game detail URL
        end
    end
    
    Sitemap-->>Build: Return sitemap array
    Build->>Build: Generate sitemap.xml
```

## SEO Impact Visualization

```mermaid
graph TD
    A[Multilingual Sitemap] --> B[Search Engine Benefits]
    
    B --> C[Complete Indexing]
    B --> D[Regional Optimization]
    B --> E[Crawl Efficiency]
    
    C --> C1[All pages discoverable]
    C --> C2[No missing content]
    C --> C3[100% coverage]
    
    D --> D1[Locale-specific rankings]
    D --> D2[Regional search visibility]
    D --> D3[Language-appropriate results]
    
    E --> E1[Priority-based crawling]
    E --> E2[Frequency-guided updates]
    E --> E3[Optimized crawl budget]
    
    style A fill:#667eea,stroke:#333,stroke-width:3px,color:#fff
    style B fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#ed8936,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#ed8936,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#ed8936,stroke:#333,stroke-width:2px,color:#fff
```

## Before vs After Comparison

### Before Update
```
sitemap.xml
├── / (no locale)
├── /games (no locale)
├── /games/hamster-kombat (no locale)
├── /games/pixels (no locale)
└── ... (other games, no locale)
```

### After Update
```
sitemap.xml
├── /en (Home - English)
├── /en/games (Catalog - English)
├── /en/games/hamster-kombat (Game - English)
├── /en/games/pixels (Game - English)
├── ...
├── /ua (Home - Ukrainian)
├── /ua/games (Catalog - Ukrainian)
├── /ua/games/hamster-kombat (Game - Ukrainian)
├── /ua/games/pixels (Game - Ukrainian)
├── ...
├── /ru (Home - Russian)
├── /ru/games (Catalog - Russian)
├── /ru/games/hamster-kombat (Game - Russian)
├── /ru/games/pixels (Game - Russian)
└── ...
```

## Integration with Existing Systems

```mermaid
graph TB
    A[Sitemap.xml] --> B[robots.txt]
    A --> C[Metadata Alternates]
    A --> D[Middleware]
    A --> E[Static Generation]
    
    B --> B1[Tells crawlers<br/>where sitemap is]
    C --> C1[Defines language<br/>relationships]
    D --> D1[Routes requests<br/>to correct locale]
    E --> E1[Generates all<br/>locale pages]
    
    style A fill:#667eea,stroke:#333,stroke-width:3px,color:#fff
    style B fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
```

## Example URLs with Real Data

### Home Pages
```
✅ https://gamefi.ua/en
✅ https://gamefi.ua/ua  (default)
✅ https://gamefi.ua/ru
```

### Catalog Pages
```
✅ https://gamefi.ua/en/games
✅ https://gamefi.ua/ua/games
✅ https://gamefi.ua/ru/games
```

### Game Detail Pages Sample
```
✅ https://gamefi.ua/en/games/hamster-kombat
✅ https://gamefi.ua/ua/games/hamster-kombat
✅ https://gamefi.ua/ru/games/hamster-kombat

✅ https://gamefi.ua/en/games/pixels
✅ https://gamefi.ua/ua/games/pixels
✅ https://gamefi.ua/ru/games/pixels

✅ https://gamefi.ua/en/games/axie-infinity
✅ https://gamefi.ua/ua/games/axie-infinity
✅ https://gamefi.ua/ru/games/axie-infinity
```

## Monitoring & Validation Flow

```mermaid
graph TD
    A[Deploy Updated Sitemap] --> B[Immediate Checks]
    B --> C[Google Search Console]
    
    B --> B1[Sitemap accessible?]
    B --> B2[Valid XML?]
    B --> B3[Correct URL count?]
    
    C --> C1[Submit sitemap]
    C1 --> C2[Monitor crawl status]
    C2 --> C3[Check index coverage]
    
    C3 --> D{Coverage > 95%?}
    D -->|Yes| E[Success!]
    D -->|No| F[Investigate issues]
    F --> G[Fix and resubmit]
    G --> C2
    
    style A fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#48bb78,stroke:#333,stroke-width:2px,color:#fff
    style F fill:#f56565,stroke:#333,stroke-width:2px,color:#fff
```
