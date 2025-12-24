import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Set default GSAP config only on client side
if (typeof window !== 'undefined') {
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.6
  })
}

// Export GSAP and ScrollTrigger for use in components
export { gsap, ScrollTrigger }
