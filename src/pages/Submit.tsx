import { useState, type FormEvent } from 'react'
import PageShell from '../components/PageShell'
import { useSanityQuery } from '../lib/sanity/useSanityQuery'
import { SITE_SETTINGS_QUERY } from '../lib/sanity/queries'
import type { SiteSettings } from '../lib/sanity/types'
import { SUBMIT_ENDPOINT, submitProject } from '../lib/submit'

interface CreatorDraft {
  name: string
  contactUrl: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const MAX_CREATORS = 4

const Submit = () => {
  const { data: settings } = useSanityQuery<SiteSettings>(SITE_SETTINGS_QUERY)
  const [creators, setCreators] = useState<CreatorDraft[]>([
    { name: '', contactUrl: '' },
  ])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const updateCreator = (i: number, patch: Partial<CreatorDraft>) =>
    setCreators((cs) => cs.map((c, j) => (j === i ? { ...c, ...patch } : c)))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setStatus('sending')
    setError(null)
    try {
      await submitProject({
        title: String(form.get('title') ?? ''),
        description: String(form.get('description') ?? ''),
        projectUrl: String(form.get('projectUrl') ?? '') || undefined,
        mediaUrl: String(form.get('mediaUrl') ?? '') || undefined,
        submitterEmail: String(form.get('submitterEmail') ?? '') || undefined,
        website: String(form.get('website') ?? ''),
        creators: creators
          .filter((c) => c.name.trim())
          .map((c) => ({
            name: c.name.trim(),
            contactUrl: c.contactUrl.trim() || undefined,
          })),
      })
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <PageShell>
      <section className="page-section" data-keynav-section>
        <h1 className="pixel page-title">05 SUBMIT</h1>
        <p className="serif" style={{ maxWidth: '56ch', marginBottom: 'var(--space-5)' }}>
          Built something? Share it with the community — a committee member
          reviews every submission before it lands on the showcase.
        </p>

        {!SUBMIT_ENDPOINT ? (
          <div className="panel">
            <p>
              Online submissions aren&apos;t live yet. Ping us on{' '}
              <a
                href={settings?.discordInviteUrl ?? 'https://discord.gg/wNGukFdBgp'}
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </a>{' '}
              with your project, or open a pull request on{' '}
              <a
                href="https://github.com/compsoc-edinburgh/project-share-web"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        ) : status === 'sent' ? (
          <div className="panel" role="status">
            <p>
              Sent! A committee member will review it — once approved it shows
              up on the projects page. Thanks for sharing what you&apos;re
              building.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="sub-title">Project title *</label>
              <input
                id="sub-title"
                name="title"
                required
                minLength={2}
                maxLength={80}
                autoComplete="off"
              />
            </div>

            <div className="field">
              <label htmlFor="sub-desc">
                What is it? What did you learn building it? *
              </label>
              <textarea
                id="sub-desc"
                name="description"
                required
                minLength={10}
                maxLength={500}
                rows={5}
              />
            </div>

            <div className="field">
              <label htmlFor="sub-url">Project URL</label>
              <input
                id="sub-url"
                name="projectUrl"
                type="url"
                placeholder="https://"
                maxLength={300}
              />
            </div>

            <div className="field">
              <label htmlFor="sub-media">
                Demo media URL (hosted video/gif/screenshot)
              </label>
              <input
                id="sub-media"
                name="mediaUrl"
                type="url"
                placeholder="https://"
                maxLength={300}
              />
            </div>

            <fieldset className="creators-fieldset">
              <legend>Creators *</legend>
              {creators.map((c, i) => (
                <div className="creator-row" key={i}>
                  <div className="field">
                    <label htmlFor={`creator-name-${i}`}>Name</label>
                    <input
                      id={`creator-name-${i}`}
                      value={c.name}
                      required={i === 0}
                      maxLength={60}
                      onChange={(e) => updateCreator(i, { name: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor={`creator-link-${i}`}>
                      Link (GitHub/site)
                    </label>
                    <input
                      id={`creator-link-${i}`}
                      type="url"
                      placeholder="https://"
                      value={c.contactUrl}
                      maxLength={300}
                      onChange={(e) =>
                        updateCreator(i, { contactUrl: e.target.value })
                      }
                    />
                  </div>
                </div>
              ))}
              {creators.length < MAX_CREATORS && (
                <button
                  type="button"
                  className="button button--ghost"
                  onClick={() =>
                    setCreators((cs) => [...cs, { name: '', contactUrl: '' }])
                  }
                >
                  + add creator
                </button>
              )}
            </fieldset>

            <div className="field">
              <label htmlFor="sub-email">
                Your email (only the committee sees this)
              </label>
              <input
                id="sub-email"
                name="submitterEmail"
                type="email"
                maxLength={120}
              />
            </div>

            {/* Honeypot — hidden from humans, tempting for bots */}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="sub-website">Website</label>
              <input
                id="sub-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {status === 'error' && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}

            <button className="button" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Submit for review'}
            </button>
          </form>
        )}
      </section>
    </PageShell>
  )
}

export default Submit
