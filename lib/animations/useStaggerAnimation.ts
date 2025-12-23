import { useEffect, RefObject } from 'react'
import { gsap } from './gsapConfig'

interface StaggerAnimationOptions {
  containerRef: RefObject<HTMLElement | null>
  selector: string
  animation: gsap.TweenVars
  stagger?: number
  scrollTriggerOptions?: Partial<ScrollTrigger.Vars>
  delay?: number
}

export const useStaggerAnimation = (options: StaggerAnimationOptions) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!options.containerRef.current) return

      const elements = options.containerRef.current.querySelectorAll(options.selector)
      if (elements.length === 0) return

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (prefersReducedMotion) {
        // Set final state immediately without animation
        gsap.set(elements, {
          y: 0,
          x: 0,
          scale: 1
        })
        return
      }

      const animation = gsap.from(elements, {
        scrollTrigger: {
          trigger: options.containerRef.current,
          start: 'top 70%',
          ...options.scrollTriggerOptions
        },
        ...options.animation,
        stagger: options.stagger || 0.1,
        delay: options.delay || 0
      })
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [options])
}
