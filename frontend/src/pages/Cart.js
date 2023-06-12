import React from 'react';
import CartSection from '../Components/CartPage/CartSection';

import SaveforLaterSection from '../Components/CartPage/SaveforLaterSection';
import { UseAuthContext } from '../hooks/useAuthContext';

const Cart = () => {
  const { user } = UseAuthContext();
  return (
    <div className="Parent-cart" style={{ backgroundColor: '#f2f2f2' }}>
      {user && (
        <>
          <CartSection />
          <SaveforLaterSection />
        </>
      )}
    </div>
  );
};

export default Cart;
