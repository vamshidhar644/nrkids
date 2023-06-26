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
          {title: 'Birthday', value: 'birthday'},
          {title: 'New Arrivals', value: 'new-arrivals'},
          {title: 'Ethnic Wear', value: 'ethnic-wear'},
          {title: 'Party Wear', value: 'party-wear'},
          {title: 'Casual Wear', value: 'casual-wear'},
          {title: 'Mom & me', value: 'mom-and-me'},
          {title: 'Siblings Set', value: 'siblings-set'},
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
