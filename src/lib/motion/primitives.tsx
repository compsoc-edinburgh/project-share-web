import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from './gsap'

interface RevealProps {
  children: ReactNode
  /** Stagger between child elements, seconds. Keep 0.03–0.08. */
  stagger?: number
  /** Start offset in px (translateY). */
  y?: number
  delay?: number
  className?: string
  /** Reveal when scrolled into view instead of on mount. */
  onScroll?: boolean
}

/**
 * Scroll/mount reveal: opacity + small translate, strong ease-out.
 * Performance: transform/opacity only. Honors prefers-reduced-motion
 * (opacity-only, near-instant).
 */
export const Reveal = ({
  children,
  stagger = 0.05,
  y = 14,
  delay = 0,
  className,
  onScroll = false,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const targets = el.children.length > 0 ? Array.from(el.children) : [el]
      const reduced = prefersReducedMotion()

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: reduced ? 0 : y },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduced ? 0.01 : 0.55,
          ease: 'ps-out',
          stagger: reduced ? 0 : stagger,
          delay,
          ...(onScroll
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  once: true,
                },
              }
            : {}),
        }
      )
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface MarqueeProps {
  children: ReactNode
  /** Pixels per second. */
  speed?: number
  className?: string
}

/** Infinite marquee. Constant motion ⇒ linear easing. Paused for reduced motion. */
export const Marquee = ({ children, speed = 60, className }: MarqueeProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      const track = el.querySelector<HTMLElement>('.marquee-track')
      if (!track) return
      const width = track.scrollWidth / 2
      gsap.to(track, {
        x: -width,
        duration: width / speed,
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={`marquee ${className ?? ''}`} aria-hidden="true">
      <div className="marquee-track">
        <span className="marquee-content">{children}</span>
        <span className="marquee-content">{children}</span>
      </div>
    </div>
  )
}
