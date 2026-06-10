import { defineArrayMember, defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const committeeYear = defineType({
  name: 'committeeYear',
  title: 'Committee Year',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'year',
      title: 'Academic year',
      type: 'string',
      description: 'e.g. 2025-2026',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'One-line summary of the year',
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'committeeMember',
          fields: [
            defineField({
              name: 'member',
              title: 'Member',
              type: 'reference',
              to: [{ type: 'teamMember' }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'position',
              title: 'Position',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { name: 'member.name', surname: 'member.surname', position: 'position' },
            prepare: ({ name, surname, position }) => ({
              title: [name, surname].filter(Boolean).join(' '),
              subtitle: position as string,
            }),
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Year (newest first)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: { year: 'year', subtitle: 'subtitle' },
    prepare: ({ year, subtitle }) => ({
      title: year as string,
      subtitle: subtitle as string | undefined,
    }),
  },
})
