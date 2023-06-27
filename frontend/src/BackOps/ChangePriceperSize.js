import { useState } from 'react';

const ChangePriceperSize = () => {
  const [size, setSize] = useState('');
  const [price, setPrice] = useState();

  const [item, setItem] = useState({ size, price });

  const setSizes = (Product) => {
    let sizes = [];
    let prices = [];

    if (Product.prices[`prices_one`]) {
      sizes.push(Product.prices[`prices_one`].size);
      prices.push(Product.prices[`prices_one`].price);
    }
    if (Product.prices[`prices_two`]) {
      sizes.push(Product.prices[`prices_two`].size);
      prices.push(Product.prices[`prices_two`].price);
    }
    if (Product.prices[`prices_three`]) {
      sizes.push(Product.prices[`prices_three`].size);
      prices.push(Product.prices[`prices_three`].price);
    }
    if (Product.prices[`prices_four`]) {
      sizes.push(Product.prices[`prices_four`].size);
      prices.push(Product.prices[`prices_four`].price);
    }
    if (Product.prices[`prices_five`]) {
      sizes.push(Product.prices[`prices_five`].size);
      prices.push(Product.prices[`prices_five`].price);
    }
    setItem({ ...item, size: sizes, price: prices });
    setSize(sizes[0]);
  };

  return {
    setSizes,
    item,
  };
};

export default ChangePriceperSize;
