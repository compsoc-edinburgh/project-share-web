import { createClient } from '@sanity/client'

// Project id + dataset are public identifiers — security comes from CORS,
// the public-read ACL, and keeping write tokens server-side only.
export const SANITY_PROJECT_ID = 'bh3s0juq'
export const SANITY_DATASET = 'production'
export const SANITY_API_VERSION = '2026-06-01'

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
  perspective: 'published',
})
