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
          {title: 'Birthday', value: 'birthday'},
          {title: 'New Arrivals', value: 'new-arrivals'},
          {title: 'Ethnic Wear', value: 'ethnic-wear'},
          {title: 'Party Wear', value: 'party-wear'},
          {title: 'Casual Wear', value: 'casual-wear'},
          {title: 'Mom & me', value: 'mom-and-me'},
          {title: 'Siblings Sets', value: 'siblings-sets'},
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
    // {
    //   name: 'prices',
    //   title: 'Prices',
    //   type: 'object',
    //   fields: [
    //     {
    //       name: 'l',
    //       title: 'L',
    //       type: 'object',
    //       fields: [
    //         {name: 'stock', title: 'In Stock', type: 'boolean'},
    //         {name: 'mrp', title: 'MRP', type: 'number'},
    //         {name: 'sp', title: 'Sale price', type: 'number'},
    //       ],
    //     },
    //   ],
    // },
  ],
}
