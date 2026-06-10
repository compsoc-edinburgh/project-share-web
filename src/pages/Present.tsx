import { useEffect, useRef } from 'react'
import { useSanityQuery } from '../lib/sanity/useSanityQuery'
import { NEXT_MEETUP_QUERY } from '../lib/sanity/queries'
import type { Meetup } from '../lib/sanity/types'

const QR_SRC = '/media/qr-website.png'
const QR_SIZE = 300
const SPEED = 0.6

/**
 * Projector mode for meetups: DVD-style bouncing QR code.
 * Space pauses/centers it. Shows the next meetup from the CMS if one is set.
 */
const Present = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const movingRef = useRef(true)
  const { data: meetup } = useSanityQuery<Meetup | null>(NEXT_MEETUP_QUERY)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let width = window.innerWidth
    let height = window.innerHeight

    const fit = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    fit()

    const qr = new Image()
    qr.src = QR_SRC

    let x = width / 2 - QR_SIZE / 2
    let y = height / 2 - QR_SIZE / 2
    let dx = SPEED
    let dy = SPEED
    let raf = 0

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#8a2be2')
      gradient.addColorStop(1, '#caa0ff')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(qr, x, y, QR_SIZE, QR_SIZE)

      if (movingRef.current) {
        x += dx
        y += dy
        if (x + QR_SIZE > width || x < 0) dx = -dx
        if (y + QR_SIZE > height || y < 0) dy = -dy
      }
      raf = requestAnimationFrame(tick)
    }
    qr.onload = () => {
      raf = requestAnimationFrame(tick)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return
      e.preventDefault()
      if (movingRef.current) {
        x = width / 2 - QR_SIZE / 2
        y = height / 2 - QR_SIZE / 2
      }
      movingRef.current = !movingRef.current
    }

    window.addEventListener('resize', fit)
    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', fit)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="present">
      <canvas ref={canvasRef} className="present-canvas" />
      {meetup && (
        <div className="present-banner">
          <span>{meetup.title}</span>
          <span>
            {new Date(meetup.date).toLocaleString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/London',
            })}
          </span>
          <span>{meetup.location}</span>
        </div>
      )}
    </div>
  )
}

export default Present
