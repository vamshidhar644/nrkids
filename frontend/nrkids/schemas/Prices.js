export default {
  name: 'prices',
  title: 'Prices',
  type: 'document',
  fields: [
    {
      name: 'prices_one',
      title: '1',
      type: 'object',
      fields: [
        {
          name: 'size',
          title: 'Size',
          type: 'string',
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
        },
      ],
      order: 1,
    },
    {
      name: 'prices_two',
      title: '2',
      type: 'object',
      fields: [
        {
          name: 'size',
          title: 'Size',
          type: 'string',
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
        },
      ],
      order: 2,
    },
    {
      name: 'prices_three',
      title: '3',
      type: 'object',
      fields: [
        {
          name: 'size',
          title: 'Size',
          type: 'string',
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
        },
      ],
      order: 3,
    },
    {
      name: 'prices_four',
      title: '4',
      type: 'object',
      fields: [
        {
          name: 'size',
          title: 'Size',
          type: 'string',
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
        },
      ],
      order: 4,
    },
    {
      name: 'prices_five',
      title: '5',
      type: 'object',
      fields: [
        {
          name: 'size',
          title: 'Size',
          type: 'string',
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
        },
      ],
      order: 5,
    },
  ],
  fieldset: 'prices',
}
