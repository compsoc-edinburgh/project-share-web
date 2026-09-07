import { useCallback, useEffect, useRef, useState } from 'react'

/** Palette tokens the thumb is painted in — and labelled with. */
const SEGMENTS = ['--rail-1', '--rail-2', '--rail-3'] as const

const MIN_THUMB = 96
/** Below this a segment is too short to letter. */
const MIN_LABELLED_SEGMENT = 64

interface Metrics {
  track: number
  thumb: number
  offset: number
  progress: number
  scrollable: boolean
}

const EMPTY: Metrics = {
  track: 0,
  thumb: 0,
  offset: 0,
  progress: 0,
  scrollable: false,
}

/**
 * The page scrollbar, drawn as a strip of the palette in the right-hand corner
 * (from the Figma comp). Each block is labelled with the hex it is actually
 * painted in, read back from the live tokens — so it stays honest in dark and
 * high-contrast mode. Drag it or click the track like any other scrollbar.
 */
const ScrollRail = () => {
  const railRef = useRef<HTMLDivElement>(null)
  const [m, setM] = useState<Metrics>(EMPTY)
  const [hexes, setHexes] = useState<string[]>([])
  const drag = useRef<{ y: number; scroll: number } | null>(null)

  // Watch the theme attributes rather than context: the palette is only
  // actually swapped once they land on <html>.
  useEffect(() => {
    const root = document.documentElement
    const read = () => {
      const cs = getComputedStyle(root)
      setHexes(SEGMENTS.map((v) => cs.getPropertyValue(v).trim().toUpperCase()))
    }
    read()
    const observer = new MutationObserver(read)
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-contrast'],
    })
    return () => observer.disconnect()
  }, [])

  const measure = useCallback(() => {
    // The rail spans the viewport; fall back to it so the first measure works
    // even before layout has settled.
    const track = railRef.current?.clientHeight || window.innerHeight
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (track === 0 || max <= 4) {
      setM((prev) => (prev.scrollable ? EMPTY : prev))
      return
    }
    const ratio = window.innerHeight / document.documentElement.scrollHeight
    const thumb = Math.max(MIN_THUMB, Math.round(track * ratio))
    const progress = Math.min(1, Math.max(0, window.scrollY / max))
    setM({
      track,
      thumb,
      offset: Math.round((track - thumb) * progress),
      progress,
      scrollable: true,
    })
  }, [])

  useEffect(() => {
    let frame = 0
    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        measure()
      })
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
    }
  }, [measure])

  const maxScroll = () =>
    document.documentElement.scrollHeight - window.innerHeight

  const onThumbDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    ;(e.target as Element).setPointerCapture(e.pointerId)
    drag.current = { y: e.clientY, scroll: window.scrollY }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const start = drag.current
    if (!start) return
    const room = m.track - m.thumb
    if (room <= 0) return
    const delta = ((e.clientY - start.y) / room) * maxScroll()
    window.scrollTo({ top: start.scroll + delta, behavior: 'auto' })
  }

  const endDrag = () => {
    drag.current = null
  }

  // Click anywhere on the track: centre the thumb there, like a native gutter.
  const onTrackDown = (e: React.PointerEvent) => {
    const rail = railRef.current
    if (!rail) return
    const y = e.clientY - rail.getBoundingClientRect().top - m.thumb / 2
    const room = m.track - m.thumb
    if (room <= 0) return
    window.scrollTo({
      top: (Math.min(room, Math.max(0, y)) / room) * maxScroll(),
      behavior: 'auto',
    })
  }

  const labelled = m.thumb / SEGMENTS.length >= MIN_LABELLED_SEGMENT

  return (
    <div
      className="scrollrail"
      ref={railRef}
      onPointerDown={onTrackDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="scrollbar"
      aria-controls="main"
      aria-orientation="vertical"
      aria-label="Page scroll"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(m.progress * 100)}
    >
      <div
        className="scrollrail-thumb"
        hidden={!m.scrollable}
        style={{ height: m.thumb, transform: `translateY(${m.offset}px)` }}
        onPointerDown={onThumbDown}
      >
        {SEGMENTS.map((token, i) => (
          <span className="scrollrail-block" key={token}>
            {labelled && <span className="scrollrail-hex">{hexes[i]}</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ScrollRail
