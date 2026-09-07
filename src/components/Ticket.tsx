import { useMemo, useRef } from 'react'
import ticketArt from '../assets/ticket.svg?raw'
import type { Meetup } from '../lib/sanity/types'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion/gsap'

interface TicketProps {
  meetup: Meetup | null
  discordUrl?: string
}

/**
 * Where the exported artwork's own NEXT_SESSION line sits, in the SVG's user
 * units — measured off the baked glyphs so live type lands in the same slot.
 */
const SESSION_SLOT = { x: 47.7, baseline: 288.8, size: 15, tracking: 0.4 }

const escapeXml = (value: string) =>
  value.replace(
    /[<>&]/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c] as string
  )

function sessionLine(meetup: Meetup | null): string {
  if (!meetup) return 'TBA @ DISCORD'
  const d = new Date(meetup.date)
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} @ ${meetup.location}`
}

/**
 * The artwork is the designer's export, used as-is. Only the NEXT_SESSION line
 * is swapped for live type: the committee sets the date in /admin and the
 * ticket says so.
 */
function artWith(line: string): string {
  const text =
    `<text x="${SESSION_SLOT.x}" y="${SESSION_SLOT.baseline}" fill="white"` +
    ` font-family="'Commit Mono', ui-monospace, monospace"` +
    ` font-size="${SESSION_SLOT.size}" letter-spacing="${SESSION_SLOT.tracking}">` +
    `<tspan font-weight="700">NEXT_SESSION:</tspan> ${escapeXml(line)}</text>`
  return ticketArt
    .replace(/<path id="ps-session"[^>]*\/>/, '')
    .replace('</svg>', `${text}</svg>`)
}

/** The hero Discord ticket — the whole thing is one link: claim → Discord. */
const Ticket = ({ meetup, discordUrl }: TicketProps) => {
  const zone = useRef<HTMLDivElement>(null)
  const line = sessionLine(meetup)
  const art = useMemo(() => artWith(line), [line])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // Prints out of the bottom of the page, then breathes.
      gsap.fromTo(
        '.ticket-art',
        { y: 60, rotation: -3, autoAlpha: 0 },
        { y: 0, rotation: -10, autoAlpha: 1, duration: 0.7, ease: 'ps-out' }
      )
      gsap.to('.ticket-art', {
        y: -7,
        rotation: -9.2,
        duration: 3.2,
        delay: 0.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    },
    { scope: zone }
  )

  return (
    <div className="ticket-zone" ref={zone}>
      <a
        className="ticket-wrap"
        href={discordUrl ?? 'https://discord.gg/wNGukFdBgp'}
        target="_blank"
        rel="noreferrer"
        aria-label={`Claim ticket — join the Discord. Next session: ${line}`}
      >
        <span
          className="ticket-art"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: art }}
        />
      </a>
    </div>
  )
}

export default Ticket
