import { useEffect, useMemo, useRef, useState } from 'react'
import PageShell from '../components/PageShell'
import Loading from '../components/Loading'
import { useSanityQuery } from '../lib/sanity/useSanityQuery'
import { PROJECTS_QUERY } from '../lib/sanity/queries'
import type { Project } from '../lib/sanity/types'
import { groupBySemester } from '../lib/semesters'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion/gsap'

const isVideo = (src?: string) => Boolean(src && /\.(mp4|webm)(\?|$)/i.test(src))

/** Video only rolls for the card you are actually looking at. */
const CardMedia = ({ project, active }: { project: Project; active: boolean }) => {
  const src = project.mediaUrl ?? project.imageUrl
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (active) void v.play().catch(() => undefined)
    else v.pause()
  }, [active])

  if (isVideo(src)) {
    return (
      <video
        ref={videoRef}
        className="film-media"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
      />
    )
  }
  if (src) {
    return <img className="film-media" src={src} alt="" loading="lazy" />
  }
  return <div className="film-media" aria-hidden="true" />
}

const Showcase = () => {
  const { data: projects, loading } = useSanityQuery<Project[]>(PROJECTS_QUERY)
  const groups = useMemo(() => groupBySemester(projects ?? []), [projects])
  const [activeId, setActiveId] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      rootRef.current
        ?.querySelectorAll<HTMLElement>('.film-grid')
        .forEach((grid) => {
          gsap.fromTo(
            grid.children,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: 'ps-out',
              stagger: 0.04,
              scrollTrigger: { trigger: grid, start: 'top 88%', once: true },
            }
          )
        })
    },
    { scope: rootRef, dependencies: [groups.length] }
  )

  // Numbering runs across the whole page, not per semester.
  let index = 0

  return (
    <PageShell>
      <div ref={rootRef}>
        <section className="page-section">
          <h1 className="pixel page-title">04 SHOWCASE</h1>
        </section>

        {loading && <Loading />}

        {groups.map((group) => (
          <section className="semester" key={group.label}>
            <h2 className="semester-label">{group.label}</h2>
            <hr className="hairline" />
            <div className="film-grid">
              {group.projects.map((project) => {
                index += 1
                const active = activeId === project._id
                const creators = project.creators?.map((c) => c.name).join(', ')
                const label = String(index).padStart(2, '0')
                const shared = {
                  className: 'film-card',
                  onMouseEnter: () => setActiveId(project._id),
                  onMouseLeave: () =>
                    setActiveId((id) => (id === project._id ? null : id)),
                  onFocus: () => setActiveId(project._id),
                  onBlur: () =>
                    setActiveId((id) => (id === project._id ? null : id)),
                }
                const body = (
                  <>
                    <span className="film-visuals">
                      <CardMedia project={project} active={active} />
                    </span>
                    <span className="film-info">
                      <span className="film-index">[ {label} ]</span>
                      <span className="film-meta">
                        <span className="film-title">{project.title}</span>
                        <span className="film-sub">
                          {creators || '—'}
                          {project.projectUrl && (
                            <span className="film-go"> ↗</span>
                          )}
                        </span>
                      </span>
                    </span>
                  </>
                )

                return project.projectUrl ? (
                  <a
                    key={project._id}
                    {...shared}
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {body}
                  </a>
                ) : (
                  <div key={project._id} {...shared} tabIndex={0}>
                    {body}
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        {!loading && groups.length === 0 && (
          <p className="showcase-empty">
            Nothing here yet — be the first to submit a project!
          </p>
        )}
      </div>
    </PageShell>
  )
}

export default Showcase
