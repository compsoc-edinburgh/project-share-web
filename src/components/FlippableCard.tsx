import { motion, useAnimation, useSpring } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { NextMeetup } from '../NextMeetup'

const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 40,
}

const Anchor = styled.div`
  position: absolute;
  visibility: hidden;
  user-select: none;
`

const CardSide = styled(motion.div)<{ isHovered: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;

  position: absolute;
  box-shadow: ${(props) =>
    props.isHovered
      ? '0px 8px 16px 0px rgba(0,0,0,0.6)'
      : '0px 4px 8px 0px rgba(0,0,0,0.2)'};
  transition: 0.2s box-shadow;
  outline: 5px solid #7816f4;
  background: white;
  cursor: pointer;

  padding: 1rem;
  box-sizing: border-box;
`

const Long = styled(motion.div)`
  cursor: pointer;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s box-shadow;
  border: 5px solid #7816f4;
  outline: 2px solid white;

  background: white;
  overflow: hidden;
  padding: 0.75rem 1.5rem 0.75rem 1.5rem;
  position: fixed;
  top: 2dvh;
  transform: translateX(-50px);
`

interface FlippableCardProps {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  key: string
}

const jiggleAnimation = {
  scale: [1, 1.02, 1, 0.995, 1],
  rotate: [0, 5, -2, 2, -1, 1, 0],
  transition: {
    duration: 0.75,
    ease: 'easeInOut',
    repeatType: 'loop' as const,
  },
}

const FlippableCard = ({ frontContent, backContent }: FlippableCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMerged, setIsMerged] = useState(true)

  const ref = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)

  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const dx = useSpring(0, springConfig)
  const dy = useSpring(0, springConfig)

  const controls = useAnimation()

  const zoom = useSpring(1, {
    duration: 0.1,
    damping: 7,
  })

  useEffect(() => {
    dx.set(-rotateX)
    dy.set(rotateY)
  }, [rotateX, rotateY])

  useEffect(() => {
    // Start the jiggle animation when not hovered
    setTimeout(() => controls.start(jiggleAnimation), 750)
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current

    if (element) {
      const elementRect = element.getBoundingClientRect()
      if (!isHovered) {
        setIsHovered(true)
        zoom.set(1.15)
      }
      const x = event.clientX - (elementRect.left + elementRect.width / 2)
      const y = event.clientY - (elementRect.top + elementRect.height / 2)
      setRotateX((y / elementRect.height) * 50)
      setRotateY((x / elementRect.width) * 50)
    }
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
    zoom.set(1)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsMerged(false)
        } else {
          setIsMerged(true)
          setRotateX(0)
          setRotateY(0)
          setIsHovered(false)
          zoom.set(1)
        }
      },
      {
        root: null,
        rootMargin: '-100px',
        threshold: 0.01,
      }
    )

    if (anchorRef.current) {
      observer.observe(anchorRef.current)
    }

    // Cleanup
    return () => {
      if (anchorRef.current) {
        observer.unobserve(anchorRef.current)
      }
    }
  }, [])

  return (
    <>
      {isMerged ? (
        <motion.div
          ref={ref}
          onClick={() => {
            setIsFlipped(!isFlipped)
          }}
          animate={controls}
          style={{
            width: '400px',
            height: '175px',
            perspective: 1200,
            transformStyle: 'preserve-3d',
            zIndex: 10,
          }}>
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            layoutId="uniqueid"
            style={{
              width: '100%',
              height: '100%',
              perspective: 1200,
              scale: zoom,
              rotateY: dy,
              rotateX: dx,

              transformStyle: 'preserve-3d',
            }}>
            {/* Front side */}
            <CardSide
              isHovered={isHovered}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={springConfig}>
              {frontContent}
            </CardSide>

            {/* Back side */}
            <CardSide
              style={{ zIndex: 10 }}
              isHovered={isHovered}
              initial={{ rotateY: -180 }}
              animate={{ rotateY: isFlipped ? 0 : -180 }}
              transition={springConfig}>
              {backContent}
            </CardSide>
          </motion.div>
        </motion.div>
      ) : (
        <Long
          style={{ zIndex: 10 }}
          layoutId="uniqueid"
          layout
          transition={{
            type: 'spring',
            damping: 12,
          }}
          initial={{ x: '-50%' }}
          animate={{ x: '0%' }}
          onClick={() => {
            setIsFlipped(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
          <NextMeetup />
        </Long>
      )}
      <Anchor ref={anchorRef}></Anchor>
    </>
  )
}

export default FlippableCard
