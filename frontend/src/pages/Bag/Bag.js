import React from 'react';
import CartSection from './Cart/CartSection';

import SaveforLaterSection from './Save/SaveSection';
import { UseAuthContext } from '../../hooks/useAuthContext';

const Bag = () => {
  const { user } = UseAuthContext();
  return (
    <div className="Parent-cart" style={{ backgroundColor: '#f2f2f2' }}>
      <CartSection />
      <SaveforLaterSection />
    </div>
  );
};

export default Bag;
