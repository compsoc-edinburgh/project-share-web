import type { StructureResolver } from 'sanity/structure'
import { InboxIcon, CalendarIcon, CogIcon } from '@sanity/icons'

// Published id of the siteSettings singleton (seeded once).
const SITE_SETTINGS_ID = '8335dea9-e31a-499d-98b1-62616753ae61'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Project Share')
    .items([
      S.listItem()
        .title('Pending submissions')
        .icon(InboxIcon)
        .child(
          S.documentList()
            .title('Pending submissions')
            .filter(
              '_type == "project" && _id in path("drafts.**") && submittedVia == "public-form"'
            )
            .apiVersion('2026-06-01')
        ),
      S.divider(),
      S.listItem()
        .title('Meetups')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('meetup')
            .title('Meetups')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),
      S.documentTypeListItem('project').title('Projects'),
      S.divider(),
      S.documentTypeListItem('teamMember').title('Team members'),
      S.documentTypeListItem('committeeYear').title('Committee years'),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(
          S.document().schemaType('siteSettings').documentId(SITE_SETTINGS_ID)
        ),
    ])
