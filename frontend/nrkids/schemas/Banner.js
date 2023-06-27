export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'bannerlocation',
      title: 'Select Category',
      type: 'string',
      options: {
        list: [
          {title: 'Home top', value: 'home-top'},
          {title: 'Home bottom', value: 'home-bottom'},
          {title: 'Birthday', value: 'birthday'},
          {title: 'New Arrivals', value: 'new-arrivals'},
          {title: 'Ethnic Wear', value: 'ethnic-wear'},
          {title: 'Party Wear', value: 'party-wear'},
          {title: 'Casual Wear', value: 'casual-wear'},
          {title: 'Mom & me', value: 'mom-and-me'},
          {title: 'Siblings Sets', value: 'siblings-sets'},
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    // {
    //   name: 'title',
    //   title: 'Title',
    //   type: 'string',
    // },
  ],
}
