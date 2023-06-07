import React, { useEffect } from 'react';
import { UseAuthContext } from '../hooks/useAuthContext';
import { UseCartContext } from '../hooks/useCartContext';

const Cart = () => {
  const { user } = UseAuthContext();
  const { cartitems, cartdispatch } = UseCartContext();
  useEffect(() => {
    const fetchItemTypes = async () => {
      const response = await fetch('/api/cart');
      const json = await response.json();

      if (response.ok) {
        cartdispatch({ type: 'SET_ITEMS', payload: json });
      }
    };
    fetchItemTypes();
  });
  if (cartitems) {
    console.log(cartitems);
  }
  return <div>Cart</div>;
};

export default Cart;
