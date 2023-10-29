import { motion, useSpring } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 40,
}

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
  border: 5px solid #7816f4;
  background: white;
`

const Long = styled(motion.div)`
  width: 100%;
  height: 50%;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s box-shadow;
  border: 5px solid #7816f4;
  background: white;
`

interface FlippableCardProps {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  key: string
}

const FlippableCard = ({
  frontContent,
  backContent,
  key,
}: FlippableCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMerged, setIsMerged] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const dx = useSpring(0, springConfig)
  const dy = useSpring(0, springConfig)

  const zoom = useSpring(1, {
    duration: 0.1,
    damping: 7,
  })

  useEffect(() => {
    dx.set(-rotateX)
    dy.set(rotateY)
  }, [rotateX, rotateY])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current

    if (element) {
      const elementRect = element.getBoundingClientRect()
      setIsHovered(true)
      zoom.set(1.1)
      const x = event.clientX - (elementRect.left + elementRect.width / 2)
      const y = event.clientY - (elementRect.top + elementRect.height / 2)
      setRotateX((y / elementRect.height) * 20)
      setRotateY((x / elementRect.width) * 20)
    }
  }

  const toggleMerge = () => {
    setTimeout(() => setIsMerged(!isMerged), 100)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
    zoom.set(1)
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (isFlipped) return
  //     setIsFlipped(!isFlipped)
  //   }, 3000)
  // }, [])

  return (
    <>
      <button onClick={toggleMerge}>Toggle Merge</button>

      <br />
      <br />
      <br />
      <p>Spacing</p>
      <br />
      <br />
      <br />

      {isMerged ? (
        <motion.div
          ref={ref}
          onClick={() => {
            setIsFlipped(!isFlipped)
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            width: 500,
            height: 200,
            perspective: 1200,
            transformStyle: 'preserve-3d',
            scale: zoom,
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: '0.2s',
          }}>
          <br />
          <br />
          <br />

          <motion.div
            // key={key}
            // layout
            // layoutId={`${key}`}
            style={{
              width: '100%',
              height: '100%',
              rotateX: dx,
              rotateY: dy,
              perspective: 1200,
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
        <Long key={key} layout layoutId={`${key}`} transition={springConfig}>
          This should only be shown after clicking button
        </Long>
      )}
    </>
  )
}

export default FlippableCard
