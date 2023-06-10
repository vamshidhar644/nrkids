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
      name: 'prices',
      title: 'Prices',
      type: 'object',
      fields: [
        {name: 'xs', title: 'XS', type: 'number'},
        {name: 's', title: 'S', type: 'number'},
        {name: 'm', title: 'M', type: 'number'},
        {name: 'l', title: 'L', type: 'number'},
        {name: 'xl', title: 'XL', type: 'number'},
        {name: 'xxl', title: 'XXL', type: 'number'},
        {name: 'xxxl', title: 'XXXL', type: 'number'},
      ],
    },
    {
      name: 'path',
      title: 'Path',
      type: 'string',
    },
  ],
}
