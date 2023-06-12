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
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 90,
      },
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
