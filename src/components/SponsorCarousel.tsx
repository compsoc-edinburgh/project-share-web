import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const images = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
  'https://via.placeholder.com/250',
  'https://via.placeholder.com/350',
  'https://via.placeholder.com/450',
]

const duplicatedImages = [...images, ...images]

const SponsorCarousel = () => {
  const controls = useAnimation()
  const containerRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    const animateTicker = async () => {
      if (isMounted) {
        await controls.start({ x: '-50%' })
        controls.set({ x: '0%' })
        animateTicker()
      }
    }

    if (containerRef.current) {
      animateTicker()
    }

    return () => {
      isMounted = false
    }
  }, [controls])

  const duration = images.length * 5

  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '100px' }}>
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          background:
            'linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 25%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          zIndex: 10,

          left: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          background:
            'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 25%)',
        }}
      />
      <motion.div
        ref={containerRef}
        initial={{ x: '0%' }}
        animate={controls}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: duration,
        }}
        style={{
          display: 'flex',
          gap: '5rem',
          width: `500%`,
          height: '100px',
          position: 'absolute',
        }}>
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            style={{
              width: `${50 / duplicatedImages.length}%`,
              backgroundImage: `url(${image})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderLeft:
                index === 0 ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
              borderRight:
                index === duplicatedImages.length - 1
                  ? 'none'
                  : '1px solid rgba(255, 255, 255, 0.2)',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default SponsorCarousel
