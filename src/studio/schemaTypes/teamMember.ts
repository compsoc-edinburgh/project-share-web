import { defineArrayMember, defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'First name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'surname', title: 'Surname', type: 'string' }),
    defineField({ name: 'avatarUrl', title: 'Avatar URL', type: 'url' }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Short blurb shown on the team page',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'memberLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { name: 'name', surname: 'surname', media: 'avatarUrl' },
    prepare: ({ name, surname }) => ({
      title: [name, surname].filter(Boolean).join(' '),
    }),
  },
})
