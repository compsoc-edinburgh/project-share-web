import { useRef } from 'react'
import PageShell from '../components/PageShell'
import Loading from '../components/Loading'
import { useSanityQuery } from '../lib/sanity/useSanityQuery'
import { COMMITTEE_QUERY } from '../lib/sanity/queries'
import type { CommitteeMember, CommitteeYear } from '../lib/sanity/types'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion/gsap'
import { wasKeyboardNav } from '../lib/motion/navIntent'

const fullName = (m: CommitteeMember) =>
  [m.name, m.surname].filter(Boolean).join(' ')

const MemberCard = ({ member, badge }: { member: CommitteeMember; badge: string }) => (
  <article className="member">
    {member.avatarUrl ? (
      <img
        className="member-photo"
        src={member.avatarUrl}
        alt={fullName(member)}
        loading="lazy"
      />
    ) : (
      <div className="member-photo member-photo--fallback" aria-hidden="true">
        ?
      </div>
    )}
    <div>
      <div className="member-head">
        <h3 className="member-name">{fullName(member)}</h3>
        <span className="member-year">{badge}</span>
      </div>
      <p className="member-position">{member.position}</p>
      {member.bio && <p className="member-bio">{member.bio}</p>}
      {member.links && member.links.length > 0 && (
        <p className="member-links">
          {member.links.map((l, i) => (
            <span key={l._key}>
              {i > 0 && <span className="sep">|</span>}
              <a href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </span>
          ))}
        </p>
      )}
    </div>
  </article>
)

const Team = () => {
  const { data: years, loading } =
    useSanityQuery<CommitteeYear[]>(COMMITTEE_QUERY)
  const rootRef = useRef<HTMLDivElement>(null)

  const [current, ...history] = years ?? []
  const badge = current?.year.slice(0, 4) ?? ''

  useGSAP(
    () => {
      if (prefersReducedMotion() || wasKeyboardNav()) return
      gsap.fromTo(
        '.member',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'ps-out', stagger: 0.07 }
      )
    },
    { scope: rootRef, dependencies: [Boolean(current)] }
  )

  return (
    <PageShell>
      <div ref={rootRef}>
        <section className="page-section">
          <h1 className="pixel page-title">03 TEAM</h1>
        </section>

        {loading && <Loading />}

        {current && (
          <div className="team-layout">
            <div>
              {current.subtitle && (
                <p className="serif" style={{ maxWidth: '60ch', marginBottom: 'var(--space-5)' }}>
                  {current.subtitle}
                </p>
              )}
              <div className="team-grid">
                {current.members.map((m) => (
                  <MemberCard key={m._key} member={m} badge={badge} />
                ))}
              </div>

              {history.length > 0 && (
                <>
                  <hr className="team-divider" />
                  <div className="team-history">
                    {history.map((year) => (
                      <section className="history-year" key={year._id}>
                        <h3>{year.year}</h3>
                        <div>
                          <p className="history-members">
                            {year.members.map((m, i) => (
                              <span key={m._key}>
                                {i > 0 && ' · '}
                                {fullName(m)}{' '}
                                <span className="pos">({m.position})</span>
                              </span>
                            ))}
                          </p>
                          {year.subtitle && (
                            <p className="history-members pos">{year.subtitle}</p>
                          )}
                        </div>
                      </section>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </PageShell>
  )
}

export default Team
