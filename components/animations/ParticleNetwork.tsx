'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface ParticleNetworkProps {
  particleCount?: number
  connectionDistance?: number
  particleColor?: string
  lineColor?: string
  speed?: number
}

export default function ParticleNetwork({
  particleCount = 60,
  connectionDistance = 120,
  particleColor = '#F7931A',
  lineColor = '#F7931A',
  speed = 0.3
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationIdRef = useRef<number | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = container.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      ctx.scale(dpr, dpr)
      
      return { width: rect.width, height: rect.height }
    }

    const { width, height } = setCanvasSize()

    // Adjust particle count for mobile
    const isMobile = width < 768
    const adjustedParticleCount = isMobile ? Math.floor(particleCount * 0.6) : particleCount

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < adjustedParticleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: Math.random() * 2 + 1
        })
      }
    }

    initParticles()

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return

      const rect = container.getBoundingClientRect()
      const currentWidth = rect.width
      const currentHeight = rect.height

      // Clear canvas
      ctx.clearRect(0, 0, currentWidth, currentHeight)

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = currentWidth
        if (particle.x > currentWidth) particle.x = 0
        if (particle.y < 0) particle.y = currentHeight
        if (particle.y > currentHeight) particle.y = 0

        // Draw connections to nearby particles
        particlesRef.current.forEach((otherParticle, j) => {
          if (i === j) return

          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3
            ctx.strokeStyle = `${lineColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 3
        )
        gradient.addColorStop(0, `${particleColor}ff`)
        gradient.addColorStop(0.5, `${particleColor}88`)
        gradient.addColorStop(1, `${particleColor}00`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw solid particle center
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationIdRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Handle resize
    const handleResize = () => {
      setCanvasSize()
      initParticles()
    }

    window.addEventListener('resize', handleResize)

    // Pause animation when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
        }
      } else {
        animate()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [particleCount, connectionDistance, particleColor, lineColor, speed])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.6 }}
      />
    </div>
  )
}
