import { defineArrayMember, defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
    }),
    defineField({
      name: 'creators',
      title: 'Creators',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'creator',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'contactUrl', title: 'Contact URL', type: 'url' }),
            defineField({ name: 'avatarUrl', title: 'Avatar URL', type: 'url' }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'mediaUrl',
      title: 'Media URL',
      type: 'string',
      description: 'Path or URL to a demo video/image, e.g. /media/projects/demo.mp4',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Optional image upload (alternative to Media URL)',
    }),
    defineField({
      name: 'iconUrl',
      title: 'Icon URL',
      type: 'string',
      description: 'Small favicon-style icon path or URL',
    }),
    defineField({
      name: 'submittedVia',
      title: 'Submitted via',
      type: 'string',
      options: {
        list: [
          { title: 'Legacy import', value: 'legacy' },
          { title: 'Studio', value: 'studio' },
          { title: 'Public form', value: 'public-form' },
        ],
        layout: 'radio',
      },
      initialValue: 'studio',
    }),
    defineField({
      name: 'submitterEmail',
      title: 'Submitter email',
      type: 'string',
      description: 'Only visible to committee — for follow-up questions',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted at',
      type: 'datetime',
    }),
    defineField({
      name: 'legacyOrder',
      title: 'Legacy order',
      type: 'number',
      hidden: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'creators.0.name', via: 'submittedVia' },
    prepare: ({ title, subtitle, via }) => ({
      title: title as string,
      subtitle: `${subtitle ?? 'Unknown creator'}${via === 'public-form' ? ' · 📥 public submission' : ''}`,
    }),
  },
})
