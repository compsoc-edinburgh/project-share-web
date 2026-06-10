import {
  useMemo,
  useRef,
  useState,
  useEffect,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import PageShell from '../components/PageShell'
import { useSanityQuery } from '../lib/sanity/useSanityQuery'
import { PROJECTS_QUERY } from '../lib/sanity/queries'
import type { Project } from '../lib/sanity/types'
import { groupBySemester } from '../lib/semesters'
import { useShortcut } from '../lib/keyboard/KeyboardContext'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion/gsap'

const isVideo = (src?: string) => Boolean(src && /\.(mp4|webm)(\?|$)/i.test(src))

const TileMedia = ({ project, active }: { project: Project; active: boolean }) => {
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
        className="tile-thumb"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
      />
    )
  }
  if (src) {
    return <img className="tile-thumb" src={src} alt="" loading="lazy" />
  }
  return <div className="tile-thumb" aria-hidden="true" />
}

const Showcase = () => {
  const { data: projects, loading } = useSanityQuery<Project[]>(PROJECTS_QUERY)
  const groups = useMemo(() => groupBySemester(projects ?? []), [projects])
  const [openId, setOpenId] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  // The design shows the first tile expanded — keep that as the resting state.
  const defaultOpen = groups[0]?.projects[0]?._id ?? null
  const open = openId ?? defaultOpen

  // ← → move focus between tiles when focus is already inside a row.
  const moveTileFocus = (dir: 1 | -1) => {
    const activeEl = document.activeElement
    if (!(activeEl instanceof HTMLElement) || !activeEl.classList.contains('tile'))
      return false
    const track = activeEl.closest('.tile-track')
    if (!track) return false
    const tiles = [...track.querySelectorAll<HTMLElement>('.tile')]
    const next = tiles[tiles.indexOf(activeEl) + dir]
    if (!next) return false
    next.focus()
    return true
  }
  useShortcut('ArrowRight', () => moveTileFocus(1), {
    description: 'next project',
    group: 1,
    hidden: true,
  })
  useShortcut('ArrowLeft', () => moveTileFocus(-1), {
    description: 'previous project',
    group: 1,
    hidden: true,
  })

  // A / D scroll the row that currently contains focus (or the first row).
  const scrollTrack = (dx: number) => {
    const activeEl = document.activeElement
    const track =
      (activeEl instanceof HTMLElement && activeEl.closest<HTMLElement>('.tile-track')) ||
      rootRef.current?.querySelector<HTMLElement>('.tile-track')
    if (!track) return false
    track.scrollBy({ left: dx, behavior: 'auto' })
    return true
  }
  useShortcut('a', () => scrollTrack(-220), { description: 'row left', group: 3, hidden: true })
  useShortcut('d', () => scrollTrack(220), { description: 'row right', group: 3, hidden: true })

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      rootRef.current
        ?.querySelectorAll<HTMLElement>('.tile-track')
        .forEach((track) => {
          gsap.fromTo(
            track.children,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: 'ps-out',
              stagger: 0.04,
              scrollTrigger: { trigger: track, start: 'top 88%', once: true },
            }
          )
        })
    },
    { scope: rootRef, dependencies: [groups.length] }
  )

  const onTileKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>, project: Project) => {
    if ((e.key === 'Enter' || e.key === ' ') && project.projectUrl) {
      e.preventDefault()
      window.open(project.projectUrl, '_blank', 'noopener')
    }
  }

  return (
    <PageShell>
      <div ref={rootRef}>
        <section className="page-section" data-keynav-section>
          <h1 className="pixel page-title">04 SHOWCASE</h1>
        </section>

        {loading && (
          <p className="showcase-empty" aria-busy="true">
            Loading projects…
          </p>
        )}

        {groups.map((group) => (
          <section className="semester" key={group.label} data-keynav-section>
            <h2 className="semester-label">{group.label}</h2>
            <hr className="hairline" />
            <div className="tile-track" role="list">
              {group.projects.map((project) => {
                const isOpen = open === project._id
                const creators = project.creators?.map((c) => c.name).join(', ')
                return (
                  <div
                    key={project._id}
                    role="listitem"
                    tabIndex={0}
                    className={`tile${isOpen ? ' is-open' : ''}`}
                    aria-label={`${project.title} by ${creators}`}
                    onMouseEnter={() => setOpenId(project._id)}
                    onFocus={() => setOpenId(project._id)}
                    onKeyDown={(e) => onTileKeyDown(e, project)}
                  >
                    <TileMedia project={project} active={isOpen} />
                    <div className="tile-info" aria-hidden={!isOpen}>
                      <p className="tile-title">{project.title}</p>
                      <p className="tile-creator">{creators}</p>
                      {project.projectUrl && (
                        <a
                          className="tile-view"
                          href={project.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          tabIndex={isOpen ? 0 : -1}
                          onClick={(e) => e.stopPropagation()}
                        >
                          VIEW ↗
                        </a>
                      )}
                    </div>
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
