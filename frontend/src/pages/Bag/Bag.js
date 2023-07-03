import React, { useEffect, useState } from 'react';

import CartSection from './Cart/CartSection';
import EmptyCart from './Empty/EmptyCart';

const Bag = ({ cartItems, Products }) => {
  const [cartExist, setCartExist] = useState(null);

  const [selectSanityCart, setSelectedSanity] = useState();

  useEffect(() => {
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
  }, [cartItems, Products]);

  // useEffect(() => {
  //   const sanityRev = [];
  //   const cartRev = [];

  //   if (selectSanityCart) {
  //     for (let i = selectSanityCart.length - 1; i >= 0; i--) {
  //       sanityRev.push(selectSanityCart[i]);
  //       cartRev.push(cartItems[i]);
  //     }
  //   }
  // }, [selectSanityCart, cartItems]);

  return (
    <div className="Parent-cart" style={{ backgroundColor: '#f2f2f2' }}>
      {cartExist ? (
        <CartSection SanityProducts={selectSanityCart} cartItems={cartItems} />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Bag;
