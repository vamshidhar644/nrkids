import React from 'react';
import { Link } from 'react-router-dom';

import { UseAuthContext } from '../../../hooks/useAuthContext';

import './EmptyCart.css';

const EmptyCart = () => {
  const { user } = UseAuthContext();
  return (
    <div className="emptycart-container">
      <div className="cart-empty">
        <h4>Your cart is empty</h4>
        <div className="image-container">
          <img src="./Assets/shopping-bag.png" alt="" />
        </div>
      </div>
      {!user ? (
        <p>
          Please <Link to="/login-or-signup">login</Link>
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

export default EmptyCart;
