import React, { useEffect } from 'react';

import CartSection from './Cart/CartSection';
import EmptyCart from './Empty/EmptyCart';
import FilterSanity from '../../BackOps/FilterSanity';

const Bag = ({ cartItems, Products }) => {
  const { filtersanity, filteredItems, cartExist } = FilterSanity();

  useEffect(() => {
    filtersanity(cartItems, Products);
  }, [cartItems, Products]);

  return (
    <div className="Parent-cart">
      {cartExist ? (
        <CartSection SanityProducts={filteredItems} cartItems={cartItems} />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Bag;
