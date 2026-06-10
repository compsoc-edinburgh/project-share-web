import { useRef } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PixelFolder from '../components/PixelFolder'
import Ticket from '../components/Ticket'
import { useSanityQuery } from '../lib/sanity/useSanityQuery'
import { NEXT_MEETUP_QUERY, SITE_SETTINGS_QUERY } from '../lib/sanity/queries'
import type { Meetup, SiteSettings } from '../lib/sanity/types'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion/gsap'
import { wasKeyboardNav } from '../lib/motion/navIntent'

const Home = () => {
  const { data: meetup } = useSanityQuery<Meetup | null>(NEXT_MEETUP_QUERY)
  const { data: settings } = useSanityQuery<SiteSettings>(SITE_SETTINGS_QUERY)
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Keyboard navigation renders instantly; pointer navigation may animate.
      if (prefersReducedMotion() || wasKeyboardNav()) return
      gsap.from('.hero-copy > *', {
        autoAlpha: 0,
        y: 16,
        duration: 0.55,
        ease: 'ps-out',
        stagger: 0.06,
      })
    },
    { scope: heroRef }
  )

  return (
    <PageShell>
      <section className="hero" ref={heroRef} data-keynav-section>
        <div className="hero-copy">
          <div className="hero-mark">
            <PixelFolder width={96} className="hero-folder" />
          </div>
          <h1 className="pixel hero-word">
            <span className="line">Project</span>
            <span className="line">Share</span>
          </h1>
          <p className="pixel hero-tag">
            {settings?.heroTagline ?? 'Making Software Together'}
          </p>
          <p className="serif hero-intro">
            At Project Share we meet every other week and share updates on our
            own tech projects. Show and tell! Hear the development of other
            builders and learn from them
          </p>
        </div>

        <Ticket meetup={meetup} discordUrl={settings?.discordInviteUrl} />

        <Link className="next-section" to="/about">
          Next Section →
        </Link>
      </section>
    </PageShell>
  )
}

export default Home
