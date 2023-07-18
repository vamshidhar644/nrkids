import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FetchMongo } from '../../../BackOps/FetchMongo';
import './Checkout.css';
import { Calcuate } from '../../../BackOps/Calcuate';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

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
    <div className="Checkout-Section w-100">
      <div className="Checkout-header">
        <h5>ORDER SUMMARY</h5>
      </div>
      <div className="Checkout-body">
        <div className="checkout__row price">
          <h6>Sub Total ({itemCount})</h6>
          <p>₹ {totalPrice}</p>
        </div>
        <div className="checkout__row discount">
          <h6>Discount</h6>
          <p></p>
        </div>
        <div className="checkout__row delivery__charges">
          <h6>Delivery Charges</h6>
          <div className="d-flex align-items-center gap-1">
            <p>will be decided</p>
            <div class="qstn__container">
              {/* <p>Delivery cost is decided upon the location of delivery</p> */}
              <div class="hover-icon">
                <span class="hover-text">
                  delivery cost is decided upon the location of delivery
                </span>
                <AiOutlineQuestionCircle />
              </div>
            </div>
            {/* <p>delivery cost is decided upon the location of delivery</p>
            <AiOutlineQuestionCircle /> */}
          </div>
        </div>
        <div className="checkout__row total-amount">
          <h4>Total Amount</h4>
          <h4>₹ {totalPrice}</h4>
        </div>
      </div>
      <div className="checkout__footer pt-4">
        <Link
          to="/your-bag/check-out"
          className="place__order"
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
