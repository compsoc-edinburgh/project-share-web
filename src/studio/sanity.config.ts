import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from '../lib/sanity/client'

// Committee members = members of the Sanity project. Approving a public
// submission = publishing its draft; rejecting = discarding the draft.
export const studioConfig = defineConfig({
  name: 'project-share',
  title: 'Project Share Admin',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: '/admin',
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: SANITY_API_VERSION }),
  ],
  schema: { types: schemaTypes },
})
