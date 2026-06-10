import { useRef } from 'react'
import PageShell from '../components/PageShell'
import FolderScatter from '../components/FolderScatter'
import { useSanityQuery } from '../lib/sanity/useSanityQuery'
import { SITE_SETTINGS_QUERY } from '../lib/sanity/queries'
import type { SiteSettings } from '../lib/sanity/types'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion/gsap'
import { wasKeyboardNav } from '../lib/motion/navIntent'

const About = () => {
  const { data: settings } = useSanityQuery<SiteSettings>(SITE_SETTINGS_QUERY)
  const contactEmail = settings?.contactEmail ?? 'partners@comp-soc.com'
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      if (!wasKeyboardNav()) {
        gsap.fromTo(
          '.about-col',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: 'ps-out', stagger: 0.08 }
        )
      }
      // Folders twinkle in regardless of nav method — it's ambient decoration.
      gsap.fromTo(
        '.scatter-folder',
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.35,
          ease: 'ps-out',
          stagger: { each: 0.012, from: 'random' },
        }
      )
    },
    { scope: rootRef }
  )

  return (
    <PageShell>
      <div ref={rootRef}>
        <section className="page-section" data-keynav-section>
          <h1 className="pixel page-title">02 ABOUT</h1>
        </section>

        <div className="about-grid">
          <div className="about-col" data-keynav-section>
            <p>
              Created by four friends on February 16, 2023, Project Share
              quickly evolved from casual discussions about personal projects
              into a vibrant community of creative minds. It is a place where
              students showcase and discuss their projects, exchange ideas,
              and connect with like-minded individuals.
            </p>
            <p>
              Project Share reached a milestone in September 2023 when we
              teamed up with <a href="https://comp-soc.com">CompSoc</a>, the
              Computer Science Society of the University of Edinburgh. This
              partnership marked the beginning of a new chapter as a Special
              Interest Group (SIG), amplifying our reach and impact. Together,
              we&apos;re building a dynamic community where enthusiastic
              students from every corner of the university bring their
              projects to life, share their unique insights, and connect with
              industry leaders.
            </p>
          </div>
          <div className="about-col">
            <p>
              Project Share is formed by a subset of the most talented,
              proactive and social tech students at the University of
              Edinburgh, catering to those who already possess a solid
              foundation in tech and are actively applying their skills.
              During our fortnightly meetings we bring together developers who
              are dedicated to building remarkable projects in their spare
              time. They showcase their progress on projects and hear updates
              from others, giving members a chance to exchange valuable
              insights and lessons learned.
            </p>
            <p>
              In Project Share&apos;s first semester of operation, we created
              a community of 250 members and followed the development of more
              than 40 projects. These projects range from custom-built online
              delivery systems, 3D websites, compilers, to AI chess engines.
              Many members have secured part-time jobs and summer internships
              through contacts made at Project Share. Looking ahead, we aim to
              broaden our presence to include the talent of electrical and
              mechanical engineering students into our community, in
              combination with running more events like hackathons.
            </p>
          </div>
          <FolderScatter className="folder-scatter" />
        </div>

        <p className="about-sponsor" data-keynav-section>
          If you are interested in sponsoring Project Share, please contact us
          through our parent society CompSoc at{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          {settings?.feedbackFormUrl && (
            <>
              {' '}
              Got feedback instead? Drop it in the{' '}
              <a href={settings.feedbackFormUrl} target="_blank" rel="noreferrer">
                feedback form
              </a>
              .
            </>
          )}
        </p>
      </div>
    </PageShell>
  )
}

export default About
