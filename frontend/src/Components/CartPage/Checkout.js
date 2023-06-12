import React, { useEffect, useState } from 'react';
import { UseAuthContext } from '../../hooks/useAuthContext';
import '../../Styles/CartPage/Checkout.css'

const Checkout = ({ itemCart }) => {
  const { user } = UseAuthContext();

  const [totalItems, setTotalItems] = useState(0);
  const [itemCount, setItemCount] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (user) {
      totalPricing(itemCart);
    }
  }, [user, itemCart]);

  const totalPricing = (checkoutData) => {
    let price = 0;
    if (checkoutData) {
      for (let i = 0; i < checkoutData.length; i++) {
        price += checkoutData[i].price * checkoutData[i].quantity;
      }
      setTotalItems(checkoutData);
      setTotalPrice(price);
      if (checkoutData.length === 1) {
        setItemCount(checkoutData.length + ' item');
      } else {
        setItemCount(checkoutData.length + ' items');
      }
    }
  };

  if (totalItems) {
    return (
      <div className="Checkout-Section">
        <div className="Checkout-header">
          <h5>PRICE DETAILS</h5>
        </div>
        <div className="Checkout-body">
          <div className="checkout-row price">
            <h6>Price({itemCount})</h6>
            <p>₹ {totalPrice}</p>
          </div>
          <div className="checkout-row discount">
            <h6>Discount</h6>
            <p></p>
          </div>
          <div className="checkout-row delivery-charges">
            <h6>Delivery Charges</h6>
            <p></p>
          </div>
          <div className="checkout-row total-amount">
            <h4>Total Amount</h4>
            <p></p>
          </div>
          <div className="checkout-row saved">
            <h6>You saved --- on this order</h6>
            <p></p>
          </div>
        </div>
        <div className="checkout-footer">
          <button>Place Order</button>
        </div>
      </div>
    );
  }

  return null;
};

export const totalPricing = (checkoutData) => {
  let price = 0;
  if (checkoutData) {
    for (let i = 0; i < checkoutData.length; i++) {
      price += checkoutData[i].price * checkoutData[i].quantity;
    }
    return price;
  }
  return 0;
};

export default Checkout;
