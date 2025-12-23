'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Gamepad2, Users, Network, Wallet, ArrowRight, Sparkles } from 'lucide-react'
import { getAllGames } from '@/lib/data'
import { getFeaturedGames, formatNumber, parseDAU } from '@/lib/utils'
import GameCard from '@/components/GameCard'
import { STATS } from '@/lib/constants'
import ParticleNetwork from '@/components/animations/ParticleNetwork'
import { gsap } from '@/lib/animations/gsapConfig'
import { useStaggerAnimation } from '@/lib/animations/useStaggerAnimation'

export default function HomePage() {
  const allGames = getAllGames()
  const featuredGames = getFeaturedGames(allGames, 6)

  // Hero section refs
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  // Stats section refs
  const statsContainerRef = useRef<HTMLDivElement>(null)

  // Featured section refs
  const featuredSectionRef = useRef<HTMLElement>(null)
  const featuredTitleRef = useRef<HTMLDivElement>(null)
  const featuredGridRef = useRef<HTMLDivElement>(null)
  const featuredButtonRef = useRef<HTMLDivElement>(null)

  // CTA section ref
  const ctaRef = useRef<HTMLDivElement>(null)

  // Hero timeline animation
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Small delay to ensure refs are attached
    const timer = setTimeout(() => {
      if (!badgeRef.current || !titleRef.current || !descRef.current || !buttonsRef.current) return
      
      if (prefersReducedMotion) {
        // Ensure elements are visible if reduced motion
        gsap.set([badgeRef.current, titleRef.current, descRef.current, buttonsRef.current.children], {
          y: 0
        })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(badgeRef.current, {
        y: -20,
        duration: 0.6
      })
        .from(titleRef.current, {
          y: 30,
          duration: 0.8
        }, '-=0.3')
        .from(descRef.current, {
          y: 20,
          duration: 0.6
        }, '-=0.4')
        .from(buttonsRef.current.children, {
          y: 20,
          duration: 0.6,
          stagger: 0.1
        }, '-=0.3')
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Stats stagger animation
  useStaggerAnimation({
    containerRef: statsContainerRef,
    selector: '.stat-card',
    animation: {
      y: 40,
      scale: 0.9,
      duration: 0.6,
      ease: 'back.out(1.2)'
    },
    stagger: 0.15,
    scrollTriggerOptions: {
      start: 'top 70%'
    }
  })

  // Featured games animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!featuredTitleRef.current || !featuredGridRef.current || !featuredButtonRef.current) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (prefersReducedMotion) {
        gsap.set([featuredTitleRef.current, featuredGridRef.current.children, featuredButtonRef.current], {
          y: 0,
          scale: 1
        })
        return
      }

      // Title animation
      gsap.from(featuredTitleRef.current, {
        scrollTrigger: {
          trigger: featuredSectionRef.current,
          start: 'top 75%'
        },
        y: 30,
        duration: 0.7,
        ease: 'power3.out'
      })
  
      // Game cards stagger
      gsap.from(featuredGridRef.current.children, {
        scrollTrigger: {
          trigger: featuredSectionRef.current,
          start: 'top 70%'
        },
        y: 50,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.2,
        ease: 'power2.out'
      })
  
      // Button animation
      gsap.from(featuredButtonRef.current, {
        scrollTrigger: {
          trigger: featuredButtonRef.current,
          start: 'top 85%'
        },
        y: 20,
        duration: 0.6,
        ease: 'power3.out'
      })
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [featuredGames])

  // CTA animation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ctaRef.current) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (prefersReducedMotion) {
        gsap.set(ctaRef.current, { y: 0, scale: 1 })
        return
      }

      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%'
        },
        y: 60,
        scale: 0.95,
        duration: 0.8,
        ease: 'back.out(1.4)'
      })
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50" style={{ zIndex: 0 }} />
        
        {/* Particle Network */}
        <ParticleNetwork particleCount={60} connectionDistance={120} />
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-bitcoin-orange/20 rounded-full blur-[120px]" style={{ zIndex: 2 }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-digital-gold/20 rounded-full blur-[120px]" style={{ zIndex: 2 }} />

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center" style={{ zIndex: 10 }}>
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 bg-bitcoin-orange/10 border border-bitcoin-orange/20 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-bitcoin-orange" />
            <span className="text-sm font-mono text-bitcoin-orange font-semibold">
              20+ Curated Games
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold leading-tight mb-6 text-shadow-subtle"
          >
            Discover the Best<br />
            <span className="gradient-text">Play-to-Earn Games</span>
          </h1>

          <p
            ref={descRef}
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Explore the ultimate catalog of blockchain games. Compare DAU, blockchains, and platforms. 
            Your gateway to the <span className="text-digital-gold font-semibold">Web3 gaming revolution</span>.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/games" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              <span>Explore Catalog</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/#featured" className="btn-secondary text-lg px-8 py-4">
              Featured Games
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <section className="border-y border-white/10 bg-deep-space/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div ref={statsContainerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="stat-card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-bitcoin-orange/10 rounded-xl mb-4">
                  {stat.icon === 'Gamepad2' && <Gamepad2 className="w-6 h-6 text-bitcoin-orange" />}
                  {stat.icon === 'Users' && <Users className="w-6 h-6 text-bitcoin-orange" />}
                  {stat.icon === 'Network' && <Network className="w-6 h-6 text-bitcoin-orange" />}
                  {stat.icon === 'Wallet' && <Wallet className="w-6 h-6 text-bitcoin-orange" />}
                </div>
                <p className="text-3xl font-heading font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section ref={featuredSectionRef} id="featured" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={featuredTitleRef} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Featured <span className="gradient-text">Games</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Hand-picked selection of the most popular and innovative Play-to-Earn games
            </p>
          </div>

          {featuredGames.length > 0 ? (
            <>
              <div ref={featuredGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredGames.map((game, index) => (
                  <GameCard 
                    key={game.slug} 
                    game={game} 
                    featured
                    priority={index < 3}
                  />
                ))}
              </div>

              <div ref={featuredButtonRef} className="text-center">
                <Link href="/games" className="btn-secondary inline-flex items-center gap-2">
                  <span>View All Games</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60">No featured games available</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-deep-space to-cosmic-void">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={ctaRef} className="card-gamefi p-12 glow-orange">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Ready to Start Your <span className="gradient-text">Web3 Gaming Journey</span>?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Explore 20+ carefully curated Play-to-Earn games across multiple blockchains and platforms
            </p>
            <Link href="/games" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              <span>Browse Full Catalog</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
