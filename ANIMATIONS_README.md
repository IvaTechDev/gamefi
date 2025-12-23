# GSAP Animations Documentation

This document describes all the animations implemented in the GameFI Catalog website.

## Overview

The website features:
- **GSAP (GreenSock Animation Platform)** for smooth, professional animations
- **Particle Network Effect** in the hero section with blockchain-themed connections
- **Scroll-triggered animations** that activate as users scroll
- **Stagger animations** for grid items (game cards, stats)
- **Accessibility support** respecting `prefers-reduced-motion` settings

## Installation

All required dependencies have been installed:
```bash
npm install gsap @gsap/react
```

## File Structure

```
lib/animations/
  ├── gsapConfig.ts           # GSAP initialization and plugin registration
  ├── useScrollAnimation.ts   # Custom hook for scroll-triggered animations
  └── useStaggerAnimation.ts  # Custom hook for stagger animations

components/animations/
  └── ParticleNetwork.tsx     # Canvas-based particle effect component

app/
  ├── page.tsx                # Homepage with all animations
  └── games/page.tsx          # Games catalog with header animations
```

## Particle Network Effect

### Location
Hero section of homepage ([`app/page.tsx`](app/page.tsx))

### Features
- **60 particles** on desktop (40 on mobile for better performance)
- **Dynamic connections** between particles within 120px distance
- **Bitcoin orange color theme** (#F7931A)
- **Canvas-based rendering** using HTML5 Canvas API
- **Performance optimized** with requestAnimationFrame
- **Responsive** to screen size changes
- **Pause on tab hidden** to save resources

### Props
```typescript
<ParticleNetwork
  particleCount={60}           // Number of particles
  connectionDistance={120}     // Distance threshold for connections
  particleColor="#F7931A"      // Particle color
  lineColor="#F7931A"          // Connection line color
  speed={0.3}                  // Movement speed
/>
```

### Visual Effect
- Small glowing particles drift across the hero section
- Lines appear between nearby particles, creating a network effect
- Line opacity fades with distance (closer = more opaque)
- Particles wrap around screen edges smoothly

## Homepage Animations

### 1. Hero Section Timeline

**Trigger:** On page load
**Duration:** ~2 seconds total

**Animation Sequence:**
1. **Badge** (0-0.6s) - Fades in from above
2. **Title** (0.3-1.1s) - Slides up and fades in (overlaps with badge)
3. **Description** (0.7-1.3s) - Slides up and fades in
4. **Buttons** (1.0-1.6s) - Stagger in (0.1s delay between each)

**Code:**
```typescript
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

tl.from(badgeRef.current, { y: -20, opacity: 0, duration: 0.6 })
  .from(titleRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.3')
  .from(descRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
  .from(buttonsRef.current?.children, { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.3')
```

### 2. Stats Ticker Section

**Trigger:** When section is 70% visible
**Animation Type:** Stagger animation

**Effect:**
- Each of 4 stat cards animates sequentially
- Cards slide up, fade in, and scale from 0.9 to 1.0
- Bounce easing creates a playful effect
- Stagger delay: 0.15s between each card

**Code:**
```typescript
useStaggerAnimation({
  containerRef: statsContainerRef,
  selector: '.stat-card',
  animation: {
    y: 40,
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    ease: 'back.out(1.2)'
  },
  stagger: 0.15
})
```

### 3. Featured Games Section

**Trigger:** When section is 75% visible
**Animation Sequence:**

1. **Section Title** - Fades in and slides up
2. **Game Cards** (after 0.2s delay) - Stagger in sequentially
   - Each card: slides up, fades in, scales from 0.95
   - Stagger delay: 0.12s between cards
   - Total: 6 game cards animate
3. **View All Button** - Fades in after cards complete

### 4. CTA Section

**Trigger:** When section is 80% visible
**Effect:** 
- Card "pops in" with bounce easing
- Slides up 60px, fades in, scales from 0.95
- Creates an attention-grabbing entrance

**Code:**
```typescript
gsap.from(ctaRef.current, {
  scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
  y: 60,
  opacity: 0,
  scale: 0.95,
  duration: 0.8,
  ease: 'back.out(1.4)'
})
```

## Games Catalog Page

### Header Animation

**Trigger:** On page load
**Effect:** Title and description stagger in sequentially

**Code:**
```typescript
tl.from(headerRef.current.children, {
  y: 30,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15
})
```

### Search Bar Animation

**Trigger:** On page load (0.4s delay)
**Effect:** Slides up and fades in

## Custom Hooks

### useScrollAnimation

Creates scroll-triggered animations for individual elements.

**Usage:**
```typescript
useScrollAnimation({
  trigger: elementRef,
  start: 'top 80%',         // When element top is 80% from viewport top
  end: 'top 20%',
  animation: {
    y: 50,
    opacity: 0,
    duration: 0.8
  }
})
```

### useStaggerAnimation

Creates stagger animations for groups of elements (like grids).

**Usage:**
```typescript
useStaggerAnimation({
  containerRef: containerRef,
  selector: '.item-class',
  animation: {
    y: 40,
    opacity: 0,
    duration: 0.6
  },
  stagger: 0.12,            // Delay between each item
  scrollTriggerOptions: {
    start: 'top 70%'
  }
})
```

## Animation Easing

Different easings create different feels:

- **`power3.out`** - Default, smooth deceleration (most animations)
- **`power2.out`** - Gentler deceleration (game cards)
- **`back.out(1.2)`** - Small bounce effect (stat cards)
- **`back.out(1.4)`** - Larger bounce effect (CTA card)

## Performance Optimizations

### 1. Reduced Motion Support
All animations respect the user's `prefers-reduced-motion` setting:

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReducedMotion) {
  // Skip animations or set instant states
  gsap.set(element, { opacity: 1, y: 0 })
  return
}
```

### 2. Will-Change CSS
Added to [`app/globals.css`](app/globals.css:141-151):

```css
.will-change-transform {
  will-change: transform, opacity;
}

[data-gsap] {
  will-change: transform, opacity;
}
```

### 3. Particle Network Optimization
- Reduced particle count on mobile (60 → 40)
- Pauses animation when tab is hidden
- Uses efficient canvas rendering
- requestAnimationFrame with proper cleanup

### 4. Animation Cleanup
All animations properly clean up when components unmount:

```typescript
useEffect(() => {
  const animation = gsap.from(...)
  
  return () => {
    animation.kill()  // Prevents memory leaks
  }
}, [])
```

### 5. ScrollTrigger Refresh
ScrollTrigger automatically refreshes on window resize, but you can manually trigger:

```typescript
import { ScrollTrigger } from '@/lib/animations/gsapConfig'
ScrollTrigger.refresh()
```

## Browser Compatibility

GSAP works in all modern browsers:
- ✅ Chrome/Edge (Chromium) 
- ✅ Firefox
- ✅ Safari (desktop & mobile)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

Canvas API support is universal in modern browsers.

## Debugging

### View ScrollTrigger Markers
During development, you can visualize ScrollTrigger points:

```typescript
gsap.from(element, {
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    markers: true  // Add this line
  },
  // ... animation props
})
```

### Check Animation Performance
In Chrome DevTools:
1. Open Performance tab
2. Record while scrolling
3. Check FPS (should stay above 60)
4. Look for dropped frames in the flame chart

### Console Logs
GSAP provides helpful warnings in development mode for common issues.

## Animation Timing Reference

| Section | Trigger Point | Duration | Stagger | Easing |
|---------|--------------|----------|---------|--------|
| Hero Badge | Page load | 0.6s | - | power3.out |
| Hero Title | Page load (+0.3s) | 0.8s | - | power3.out |
| Hero Description | Page load (+0.7s) | 0.6s | - | power3.out |
| Hero Buttons | Page load (+1.0s) | 0.6s | 0.1s | power3.out |
| Stats Cards | 70% visible | 0.6s | 0.15s | back.out(1.2) |
| Featured Title | 75% visible | 0.7s | - | power3.out |
| Featured Cards | 70% visible | 0.6s | 0.12s | power2.out |
| CTA Card | 80% visible | 0.8s | - | back.out(1.4) |
| Games Header | Page load | 0.7s | 0.15s | power3.out |
| Games Search | Page load (+0.4s) | 0.6s | - | power3.out |

## Customization

### Adjusting Animation Speed
In [`lib/animations/gsapConfig.ts`](lib/animations/gsapConfig.ts:10-13):

```typescript
gsap.defaults({
  ease: 'power3.out',
  duration: 0.6  // Decrease for faster, increase for slower
})
```

### Adjusting Particle Count
In [`app/page.tsx`](app/page.tsx:175):

```tsx
<ParticleNetwork 
  particleCount={80}          // Increase for more particles
  connectionDistance={150}    // Increase for more connections
/>
```

### Changing Scroll Trigger Points
Lower percentage = triggers earlier:

```typescript
scrollTrigger: {
  start: 'top 60%'  // Was 80%, now triggers earlier
}
```

## Troubleshooting

### Animations not playing
1. Check console for errors
2. Verify refs are attached correctly
3. Ensure GSAP is imported from `@/lib/animations/gsapConfig`
4. Check if `prefers-reduced-motion` is enabled

### Janky animations
1. Reduce particle count
2. Decrease stagger count or complexity
3. Use `will-change` CSS property
4. Check browser DevTools Performance tab

### Particles not showing
1. Verify canvas element is rendered
2. Check z-index stacking order
3. Ensure container has dimensions
4. Check console for canvas errors

## Future Enhancements

Potential improvements:
- Mouse-interactive particles (particles move away from cursor)
- Parallax scrolling effects
- More complex particle shapes (hexagons, Bitcoin symbols)
- GSAP's SplitText plugin for advanced text animations (requires license)
- Magnetic cursor effects on buttons
- Page transition animations with Next.js page router

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Easing Visualizer](https://greensock.com/docs/v3/Eases)
- [Canvas API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---

**Implementation Date:** December 2024  
**GSAP Version:** 3.12+  
**Next.js Version:** 15.1.0
