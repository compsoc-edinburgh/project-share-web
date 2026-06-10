/**
 * Project Share — public submission proxy (Cloudflare Worker).
 *
 * Receives the /submit form payload and creates a DRAFT `project` document in
 * Sanity. Drafts never appear on the public site; committee members approve
 * (publish) or reject (discard) them in the /admin studio.
 *
 * Deploy:
 *   1. npm i -g wrangler && wrangler login
 *   2. wrangler deploy infra/submission-proxy/cloudflare-worker.js --name project-share-submit
 *   3. wrangler secret put SANITY_WRITE_TOKEN   (use the token from .env.local / sanity.io/manage)
 *   4. Set VITE_SUBMIT_ENDPOINT to the worker URL when building the site.
 *
 * Config (vars in wrangler or dashboard):
 *   SANITY_PROJECT_ID = bh3s0juq
 *   SANITY_DATASET    = production
 *   ALLOWED_ORIGIN    = https://projectshare.comp-soc.com
 */

const MAX_LENGTHS = {
  title: 80,
  description: 500,
  projectUrl: 300,
  mediaUrl: 300,
  submitterEmail: 120,
  creatorName: 60,
  creatorUrl: 300,
}

function corsHeaders(env, origin) {
  const allowed = (env.ALLOWED_ORIGIN || '*').split(',').map((s) => s.trim())
  const allow = allowed.includes('*')
    ? '*'
    : allowed.includes(origin)
      ? origin
      : allowed[0]
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function bad(message, status, headers) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  })
}

function cleanUrl(value, max) {
  if (typeof value !== 'string' || !value.trim()) return undefined
  const v = value.trim().slice(0, max)
  if (!/^https?:\/\//i.test(v)) return undefined
  return v
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const headers = corsHeaders(env, origin)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }
    if (request.method !== 'POST') {
      return bad('Method not allowed', 405, headers)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return bad('Invalid JSON', 400, headers)
    }

    // Honeypot: real users never fill this hidden field.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers })
    }

    const title = String(body.title ?? '').trim().slice(0, MAX_LENGTHS.title)
    const description = String(body.description ?? '')
      .trim()
      .slice(0, MAX_LENGTHS.description)
    if (!title || title.length < 2) return bad('Title is required', 422, headers)
    if (!description || description.length < 10)
      return bad('Description is too short', 422, headers)

    const creatorsRaw = Array.isArray(body.creators) ? body.creators : []
    const creators = creatorsRaw
      .slice(0, 6)
      .map((c, i) => ({
        _type: 'creator',
        _key: `c${i + 1}`,
        name: String(c?.name ?? '').trim().slice(0, MAX_LENGTHS.creatorName),
        contactUrl: cleanUrl(c?.contactUrl, MAX_LENGTHS.creatorUrl),
      }))
      .filter((c) => c.name.length > 0)
    if (creators.length === 0) return bad('At least one creator is required', 422, headers)

    const doc = {
      // Draft id ⇒ invisible to the public API until a committee member publishes it.
      _id: `drafts.${crypto.randomUUID()}`,
      _type: 'project',
      title,
      description,
      creators,
      projectUrl: cleanUrl(body.projectUrl, MAX_LENGTHS.projectUrl),
      mediaUrl: cleanUrl(body.mediaUrl, MAX_LENGTHS.mediaUrl),
      submitterEmail: String(body.submitterEmail ?? '')
        .trim()
        .slice(0, MAX_LENGTHS.submitterEmail) || undefined,
      submittedVia: 'public-form',
      submittedAt: new Date().toISOString(),
    }

    const projectId = env.SANITY_PROJECT_ID || 'bh3s0juq'
    const dataset = env.SANITY_DATASET || 'production'
    const res = await fetch(
      `https://${projectId}.api.sanity.io/v2026-06-01/data/mutate/${dataset}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.SANITY_WRITE_TOKEN}`,
        },
        body: JSON.stringify({ mutations: [{ create: doc }] }),
      }
    )

    if (!res.ok) {
      console.error('Sanity mutation failed', res.status, await res.text())
      return bad('Could not store submission', 502, headers)
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...headers },
    })
  },
}
