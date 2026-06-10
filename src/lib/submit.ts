// Public project submissions.
//
// The static site cannot hold a Sanity write token, so submissions go through
// a tiny proxy (see infra/submission-proxy/) that validates the payload and
// creates a *draft* project document. Drafts are invisible to the public API;
// committee members review them at /admin → "Pending submissions" and either
// publish (approve) or discard (reject).
//
// Configure the deployed proxy URL at build time via VITE_SUBMIT_ENDPOINT.

export interface SubmissionPayload {
  title: string
  description: string
  projectUrl?: string
  creators: { name: string; contactUrl?: string }[]
  mediaUrl?: string
  submitterEmail?: string
  /** Honeypot — must stay empty. Bots fill it, humans never see it. */
  website?: string
}

export const SUBMIT_ENDPOINT: string | undefined = import.meta.env
  .VITE_SUBMIT_ENDPOINT as string | undefined

export async function submitProject(payload: SubmissionPayload): Promise<void> {
  if (!SUBMIT_ENDPOINT) {
    throw new Error('Submissions are not configured yet')
  }
  const res = await fetch(SUBMIT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(body || `Submission failed (${res.status})`)
  }
}
