import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, SplitText)

// Strong curves (built-in CSS/GSAP easings are too weak for UI polish).
// Referenced by name: ease: 'ps-out' / 'ps-in-out'.
CustomEase.create('ps-out', '0.23, 1, 0.32, 1')
CustomEase.create('ps-in-out', '0.77, 0, 0.175, 1')

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, useGSAP, ScrollTrigger, SplitText }
