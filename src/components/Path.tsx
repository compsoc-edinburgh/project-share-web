import { useEffect, useRef, useState } from 'react'
import { ACCENT_COLOR } from '../constants'
import styled from 'styled-components'

const SVGAnimatedPath = () => {
  const pathRef = useRef<SVGPathElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!svgRef.current) return
          if (!pathRef.current) return
          if (entry.isIntersecting) {
            svgRef.current.style.opacity = '1'
            const length = pathRef.current.getTotalLength()
            pathRef.current.style.strokeDasharray = `${length} ${length}`
            pathRef.current.style.strokeDashoffset = `${length}`
            pathRef.current.getBoundingClientRect() // Trigger reflow to apply initial styles
            pathRef.current.style.transition =
              'stroke-dashoffset 2s ease-in-out'
            pathRef.current.style.strokeDashoffset = '0'
          }
        })
      },
      {
        root: null,
        rootMargin: '-100px',
        threshold: 0.5,
      }
    )

    if (svgRef.current) {
      observer.observe(svgRef.current)
    }

    return () => {
      if (svgRef.current) {
        observer.unobserve(svgRef.current)
      }
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 2110 416"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0 }}>
      <path
        ref={pathRef}
        opacity="0.5"
        d="M0 356.534C33.873 284.282 73.5334 194.539 152.173 133.771C221.686 80.0562 373.779 -14.7109 513.712 29.1033C664.354 76.27 624.523 387.304 994.233 411.65C1216.88 426.311 1390.45 285.373 1411 199.5C1430.48 118.069 1386.49 -19.3348 1182.66 5.43266C959.509 32.5481 925.378 265.622 1182.66 320.761C1439.01 375.7 1816.07 292.186 1944.55 239.764C2071.19 188.092 2095.19 105.066 2110 83.6024"
        stroke="#7816F4"
        strokeWidth="5"
      />
    </svg>
  )
}

const Container = styled.div<{ scrollY: number }>`
  transform: ${({ scrollY }) => `translateY( ${scrollY * 0.005}px)`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.1s ease-in-out;
`

const Title = styled.h1`
  font-size: 2rem;
  margin: 0.5rem 0;
  mix-blend-mode: multiply;
  color: ${ACCENT_COLOR};
`

const Subtitle = styled(Title)`
  font-size: 5rem;
  font-style: italic;
  transform: rotate(-2deg);
  color: ${ACCENT_COLOR};
`

const AnimatedText = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Container scrollY={scrollY}>
      <Title>Are you building something?</Title>
      <Subtitle>Share it</Subtitle>
    </Container>
  )
}

const Path = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AnimatedText />
      <div
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          width: '100%',
        }}>
        <SVGAnimatedPath />
      </div>
    </div>
  )
}

export default Path
