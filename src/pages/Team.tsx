import PageShell from '../components/PageShell'
import { useSanityQuery } from '../lib/sanity/useSanityQuery'
import { COMMITTEE_QUERY } from '../lib/sanity/queries'
import type { CommitteeYear } from '../lib/sanity/types'

const Team = () => {
  const { data: years, loading } =
    useSanityQuery<CommitteeYear[]>(COMMITTEE_QUERY)

  return (
    <PageShell>
      <section className="page-section">
        <h1 className="page-title">Team</h1>
        {loading && <p aria-busy="true">Loading…</p>}
        {years?.map((year) => (
          <article className="committee-year" key={year._id}>
            <h2>{year.year}</h2>
            {year.subtitle && <p className="committee-subtitle">{year.subtitle}</p>}
            <ul className="committee-members">
              {year.members?.map((m) => (
                <li key={m._key} className="committee-member">
                  {m.avatarUrl && (
                    <img
                      src={m.avatarUrl}
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                  )}
                  <div>
                    <strong>
                      {[m.name, m.surname].filter(Boolean).join(' ')}
                    </strong>
                    <span className="committee-position">{m.position}</span>
                    {m.links && m.links.length > 0 && (
                      <span className="committee-links">
                        {m.links.map((l) => (
                          <a
                            key={l._key}
                            href={l.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {l.label}
                          </a>
                        ))}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </PageShell>
  )
}

export default Team
