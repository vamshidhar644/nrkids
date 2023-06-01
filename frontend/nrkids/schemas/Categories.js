export default {
  name: 'categories',
  title: 'All Products',
  type: 'document',
  fields: [
    {
      name: 'dropdownField',
      title: 'Select Category',
      type: 'string',
      options: {
        list: [
          {title: 'First Birthday', value: 'first-birthday'},
          {title: 'New Arrivals', value: 'new-arrivals'},
          {title: 'Ethnic Wear', value: 'ethnic-wear'},
          {title: 'Party Wear', value: 'party-wear'},
          {title: 'Gowns', value: 'gowns'},
          {title: 'Dresses', value: 'dresses'},
          {title: 'Accessories', value: 'accessories'},
        ],
        layout: 'dropdown', // Display style: dropdown
      },
    },
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
      title: 'Path',
      type: 'string',
    },
  ],
}
