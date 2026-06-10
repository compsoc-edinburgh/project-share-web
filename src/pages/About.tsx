import PageShell from '../components/PageShell'
import { useSanityQuery } from '../lib/sanity/useSanityQuery'
import { SITE_SETTINGS_QUERY } from '../lib/sanity/queries'
import type { SiteSettings } from '../lib/sanity/types'

const About = () => {
  const { data: settings } = useSanityQuery<SiteSettings>(SITE_SETTINGS_QUERY)
  const contactEmail = settings?.contactEmail ?? 'partners@comp-soc.com'

  return (
    <PageShell>
      <section className="page-section prose">
        <h1 className="page-title">About</h1>
        <p>
          Created by four friends on February 16, 2023, Project Share quickly
          evolved from casual discussions about personal projects into a
          vibrant community of creative minds. It is a place where students
          showcase and discuss their projects, exchange ideas, and connect
          with like-minded individuals.
        </p>
        <p>
          Project Share reached a milestone in September 2023 when we teamed
          up with <a href="https://comp-soc.com">CompSoc</a>, the Computer
          Science Society of the University of Edinburgh. This partnership
          marked the beginning of a new chapter as a Special Interest Group
          (SIG), amplifying our reach and impact. Together, we&apos;re
          building a dynamic community where enthusiastic students from every
          corner of the university bring their projects to life, share their
          unique insights, and connect with industry leaders.
        </p>

        <h2>Sponsors</h2>
        <p>
          During our fortnightly meetings we bring together developers who
          are dedicated to building remarkable projects in their spare time.
          They showcase their progress on projects and hear updates from
          others, giving members a chance to exchange valuable insights and
          lessons learned.
        </p>
        <p>
          In Project Share&apos;s first semester of operation, we created a
          community of 250 members and followed the development of more than
          40 projects — from custom-built online delivery systems, 3D
          websites and compilers to AI chess engines. Many members have
          secured part-time jobs and summer internships through contacts made
          at Project Share.
        </p>
        <p>
          Project Share is actively seeking the support of sponsors to reach
          our future goals. If you are interested, contact us through our
          parent society CompSoc at{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>

        <h2>Contact</h2>
        <p>
          Join the{' '}
          <a
            href={settings?.discordInviteUrl ?? 'https://discord.gg/wNGukFdBgp'}
            target="_blank"
            rel="noreferrer"
          >
            Discord server
          </a>
          {settings?.feedbackFormUrl && (
            <>
              {' '}
              or drop thoughts in the{' '}
              <a href={settings.feedbackFormUrl} target="_blank" rel="noreferrer">
                feedback form
              </a>
            </>
          )}
          .
        </p>
      </section>
    </PageShell>
  )
}

export default About
