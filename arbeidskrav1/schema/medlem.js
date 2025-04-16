export default {
    name: 'medlem',
    title: 'Gruppemedlem',
    type: 'document',
    fields: [
      { name: 'navn', title: 'Navn', type: 'string' },
      { name: 'epost', title: 'E-post', type: 'string' },
      {
        name: 'bilde',
        title: 'Bilde',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'interesser',
        title: 'Interesser',
        type: 'array',
        of: [{ type: 'string' }],
      },
      { name: 'bio', title: 'Biografi', type: 'text' },
      {
        name: 'logg',
      title: 'Loggføringer',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'beskrivelse',
              title: 'Beskrivelse',
              type: 'text',
              validation: Rule => Rule.required(),
            },
            {
              name: 'dato',
              title: 'Dato ført inn',
              type: 'datetime',
              initialValue: () => new Date().toISOString(),
              validation: Rule => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};