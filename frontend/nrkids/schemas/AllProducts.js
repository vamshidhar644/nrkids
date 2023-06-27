import Prices from './Prices'

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
    {
      name: 'isData',
      title: 'Show Prices?',
      type: 'boolean',
      defaultValue: false,
    },
    Prices,
  ],

  fieldsets: [
    {
      name: 'prices',
      title: 'Prices',
      options: {
        collapsible: true,
        collapsed: true, // Set to false if you want the fieldset to be expanded by default
      },
    },
  ],
}
