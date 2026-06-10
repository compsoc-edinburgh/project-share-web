import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const meetup = defineType({
  name: 'meetup',
  title: 'Meetup',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Project Share',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date & time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Room / building, e.g. AT_2.07',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  orderings: [
    {
      title: 'Date (newest first)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', date: 'date', location: 'location' },
    prepare: ({ title, date, location }) => ({
      title: title as string,
      subtitle: `${date ? new Date(date as string).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : 'No date'} · ${location ?? ''}`,
    }),
  },
})
