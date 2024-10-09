import React, { useEffect, useRef, useState } from 'react'
import qrCodeImage from '/media/qr-website.png'

const Present: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMoving, setIsMoving] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set up high DPI canvas
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    ctx.scale(dpr, dpr)

    const qrCode = new Image()
    qrCode.src = qrCodeImage

    let x = rect.width / 2 - 150
    let y = rect.height / 2 - 150
    let dx = 0.5
    let dy = 0.5
    const size = 300

    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, rect.width, rect.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height)
      gradient.addColorStop(0, '#8A2BE2') // Purple
      gradient.addColorStop(1, '#CAA0FF') // White
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Draw QR code
      ctx.drawImage(qrCode, x, y, size, size)

      if (isMoving) {
        // Update position
        x += dx
        y += dy

        // Bounce off walls
        if (x + size > rect.width || x < 0) dx = -dx
        if (y + size > rect.height || y < 0) dy = -dy
      }

      requestAnimationFrame(animate)
    }

    qrCode.onload = animate

    // Resize canvas on window resize
    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect()
      canvas.width = newRect.width * dpr
      canvas.height = newRect.height * dpr
      canvas.style.width = `${newRect.width}px`
      canvas.style.height = `${newRect.height}px`
      ctx.scale(dpr, dpr)
      x = newRect.width / 2 - 150
      y = newRect.height / 2 - 150
    }

    window.addEventListener('resize', handleResize)

    // Handle spacebar press
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        if (isMoving) {
          x = rect.width / 2 - 150
          y = rect.height / 2 - 150
        }
        setIsMoving(!isMoving)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isMoving])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}

export default Present
