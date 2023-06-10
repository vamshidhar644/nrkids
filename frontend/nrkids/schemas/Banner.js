export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
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
      name: 'productId',
      title: 'Product ID',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'path',
      title: 'Path',
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
  ],
}
