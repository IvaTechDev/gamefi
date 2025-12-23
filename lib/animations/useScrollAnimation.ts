import { useEffect, RefObject } from 'react'
import { gsap } from './gsapConfig'

interface ScrollAnimationOptions {
  trigger: RefObject<HTMLElement | null>
  start?: string
  end?: string
  animation: gsap.TweenVars
  scrollTrigger?: Partial<ScrollTrigger.Vars>
}

export const useScrollAnimation = (options: ScrollAnimationOptions) => {
  useEffect(() => {
    if (!options.trigger.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Set final state immediately without animation
      gsap.set(options.trigger.current, {
        y: 0,
        x: 0,
        scale: 1
      })
      return
    }

    const animation = gsap.from(options.trigger.current, {
      scrollTrigger: {
        trigger: options.trigger.current,
        start: options.start || 'top 80%',
        end: options.end || 'top 20%',
        toggleActions: 'play none none reverse',
        ...options.scrollTrigger
      },
      ...options.animation
    })

    return () => {
      animation.kill()
    }
  }, [options])
}
