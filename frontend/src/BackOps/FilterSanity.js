import { useState } from 'react';

const FilterSanity = (cartItems, Products) => {
  const [selectSanityCart, setSelectedSanity] = useState();
  const [cartExist, setCartExist] = useState(null);
  console.log(cartItems, Products);
  const filtersanity = () => {
    const sanitycart = [];
    if (cartItems) {
      setCartExist(cartItems.length);
      for (let i = 0; i < cartItems.length; i++) {
        if (Products) {
          for (let j = 0; j < Products.length; j++) {
            if (cartItems[i].productId === Products[j].productId) {
              sanitycart.push(Products[j]);
            }
          }
        }
      }
    }
    if (sanitycart) {
      setSelectedSanity(sanitycart);
    }
    console.log(sanitycart);
  };
  return { filtersanity, selectSanityCart, cartExist };
};

export default FilterSanity;
