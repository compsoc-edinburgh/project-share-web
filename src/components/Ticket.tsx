import { useRef } from 'react'
import TicketShape from './TicketShape'
import PixelFolder from './PixelFolder'
import type { Meetup } from '../lib/sanity/types'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion/gsap'

interface TicketProps {
  meetup: Meetup | null
  discordUrl?: string
}

function formatSession(meetup: Meetup | null): { date: string; location: string } {
  if (!meetup) return { date: 'TBA', location: 'DISCORD' }
  const d = new Date(meetup.date)
  return {
    date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
    location: meetup.location,
  }
}

function ticketNumber(meetup: Meetup | null): string {
  if (!meetup) return '000'
  const d = new Date(meetup.date)
  const start = new Date(d.getFullYear(), 0, 0)
  const day = Math.floor((d.getTime() - start.getTime()) / 86_400_000)
  return String(day).padStart(3, '0')
}

/**
 * The hero Discord ticket. The whole ticket is one link (claim → Discord);
 * NEXT_SESSION renders live from the CMS, so the committee sets the date in
 * /admin and the ticket updates.
 */
const Ticket = ({ meetup, discordUrl }: TicketProps) => {
  const zone = useRef<HTMLDivElement>(null)
  const session = formatSession(meetup)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // Entrance: slide in with the print-out feel, then a slow idle float.
      gsap.fromTo(
        '.ticket--front',
        { y: 60, rotation: -4, autoAlpha: 0 },
        { y: 0, rotation: -11.5, autoAlpha: 1, duration: 0.7, ease: 'ps-out' }
      )
      gsap.fromTo(
        '.ticket--back',
        { y: 80, rotation: -8, autoAlpha: 0 },
        { y: 0, rotation: -15.08, autoAlpha: 1, duration: 0.7, delay: 0.06, ease: 'ps-out' }
      )
      gsap.to('.ticket--front', {
        y: -7,
        rotation: -10.4,
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
    <div className="ticket-zone" ref={zone} data-keynav-section>
      <a
        className="ticket-wrap"
        href={discordUrl ?? 'https://discord.gg/wNGukFdBgp'}
        target="_blank"
        rel="noreferrer"
        aria-label={`Claim ticket — join the Discord. Next session ${session.date} at ${session.location}`}
      >
        <div className="ticket ticket--back" aria-hidden="true">
          <TicketShape fill="var(--color-ticket-back)" />
        </div>
        <div className="ticket ticket--front">
          <TicketShape fill="var(--color-ticket-front)" className="ticket-bg" />
          <div className="ticket-content" aria-hidden="true">
            <div className="ticket-main">
              <div className="ticket-row-top">
                <div>
                  <p className="pixel ticket-title">Project SHARE</p>
                  <div className="ticket-sub">
                    <span>DISCORD_TICKET</span>
                    <span>MAKING SOFTWARE TOGETHER</span>
                  </div>
                </div>
                <PixelFolder width={64} className="ticket-folder" />
              </div>
              <hr className="ticket-hr" />
              <div className="ticket-meta">
                <span>
                  <span className="label">LEVEL:</span>
                  <span className="value">BETA BUILDER</span>
                </span>
                <span>
                  <span className="label">STATUS:</span>
                  <span className="value">PROJECT_IN_PROGRESS</span>
                </span>
              </div>
              <hr className="ticket-hr" />
              <p className="ticket-snacks">
                <span className="dashes">----</span>FREE SNACKS
                <span className="dashes">----</span>
              </p>
              <p className="ticket-learn">LEARN. BUILD. SHARE.</p>
              <p className="ticket-session">
                NEXT_SESSION: <span className="value">{session.date}</span> @{' '}
                <span className="value">{session.location}</span>
              </p>
            </div>
            <div className="ticket-stub">
              <span className="ticket-no">
                TICKET NO. <span className="num">{ticketNumber(meetup)}</span>
              </span>
              <span className="ticket-meta ticket-rank">
                <span>
                  <span className="label">LEADERBOARD RANK:</span>
                  <span className="value">#09</span>
                </span>
              </span>
              <span className="ticket-claim">CLAIM TICKET TO DISCORD</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default Ticket
