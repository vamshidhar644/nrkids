import React, { useEffect, useState } from 'react';
import CartSection from './Cart/CartSection';

import { UseAuthContext } from '../../hooks/useAuthContext';
import EmptyCart from './Empty/EmptyCart';

import { FetchMongo } from '../../BackOps/FetchMongo';
import { FetchSanity } from '../../BackOps/FetchSanity';

const Bag = () => {
  const { user } = UseAuthContext();
  const { fetchcartData, cartItems } = FetchMongo();
  const { fetchAllProducts, Products } = FetchSanity();

  const [cartExist, setCartExist] = useState(null);

  const [selectSanityCart, setSelectedSanity] = useState();

  useEffect(() => {
    fetchcartData();
    const fetchData = async () => {
      fetchAllProducts();
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const sanityRev = [];
    const cartRev = [];

    if (selectSanityCart) {
      for (let i = selectSanityCart.length - 1; i >= 0; i--) {
        sanityRev.push(selectSanityCart[i]);
        cartRev.push(cartItems[i]);
      }
    }
  }, [selectSanityCart, cartItems]);

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

  // console.log(cartItems);
  return (
    <div className="Parent-cart" style={{ backgroundColor: '#f2f2f2' }}>
      {!cartExist ? (
        <EmptyCart />
      ) : (
        <CartSection SanityProducts={selectSanityCart} cartItems={cartItems} />
      )}
      {/* <SaveforLaterSection /> */}
    </div>
  );
};

export default Bag;
