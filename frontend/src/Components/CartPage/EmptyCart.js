import React from 'react';
import '../../Styles/CartPage/EmptyCart.css';

const EmptyCart = () => {
  return (
    <div className="emptycart-container">
      <div className="cart-empty">
        <div className="image-container">
          <img src="../../../Assets/shopping-bag.png" alt="" />
        </div>
      </div>
      <p>Your cart is empty</p>
    </div>
  );
};

export default EmptyCart;
