export default {
  name: 'shopbycategory',
  title: 'Shop by Category',
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
      name: 'title',
      title: 'Title',
      type: 'string',
      options: {
        list: [
          {title: 'Birthday', value: 'Birthday'},
          {title: 'New Arrivals', value: 'New Arrivals'},
          {title: 'Ethnic Wear', value: 'Ethnic Wear'},
          {title: 'Party Wear', value: 'Party Wear'},
          {title: 'Casual Wear', value: 'Casual Wear'},
          {title: 'Mom & me', value: 'Mom & me'},
          {title: 'Siblings Set', value: 'Siblings Set'},
        ],
        layout: 'dropdown', // Display style: dropdown
      },
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
