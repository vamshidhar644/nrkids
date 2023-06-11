import React from 'react';
import CartSection from '../Components/CartPage/CartSection';
import SaveforLaterSection from '../Components/CartPage/SaveforLaterSection';

const Cart = () => {
  return (
    <div>
      <CartSection />
      <h4>Save for later</h4>
      <SaveforLaterSection />
    </div>
  );
};

export default Cart;
