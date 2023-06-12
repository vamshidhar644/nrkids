import React from 'react';
import CartSection from '../Components/CartPage/CartSection';

import SaveforLaterSection from '../Components/CartPage/SaveforLaterSection';

const Cart = () => {
  return (
    <div className="Parent-cart" style={{ backgroundColor: '#f2f2f2' }}>
      <CartSection />
      <SaveforLaterSection />
    </div>
  );
};

export default Cart;
