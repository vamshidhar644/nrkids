export default {
  name: 'new-arrivals',
  title: 'New Arrivals',
  type: 'document',
  fields: [
    {
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Enable image hotspot functionality
          },
        },
      ],
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'path',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 90,
      },
    },
  ],
}
