import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FetchMongo } from '../../../BackOps/FetchMongo';
import './Checkout.css';
import { Calcuate } from '../../../BackOps/Calcuate';

const Checkout = ({ data }) => {
  const { fetchcartData, cartItems } = FetchMongo();
  const { totalPricing, totalPrice, itemCount, cartData } = Calcuate();

  useEffect(() => {
    totalPricing(cartItems);
  }, [cartItems]);
  useEffect(() => {
    fetchcartData();
  }, [data]);

  return (
    <div className="Checkout-Section w-50">
      <div className="Checkout-header">
        <h5>ORDER SUMMARY</h5>
      </div>
      <div className="Checkout-body">
        <div className="checkout-row price">
          <h6>Sub Total ({itemCount})</h6>
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
      </div>
      <div className="checkout-footer pt-4">
        <Link
          to="/your-bag/check-out"
          className="place-order"
          state={{ data: cartData }}
        >
          Checkout
        </Link>
        <Link to="/" className="bg-white">
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
