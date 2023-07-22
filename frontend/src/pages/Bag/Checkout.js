import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FetchMongo } from '../../helpers/FetchMongo';

import { Calcuate } from '../../helpers/Calcuate';
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
    <div className="Checkout__Section">
      <div className="Checkout-header">
        <h5>ORDER SUMMARY</h5>
      </div>
      <div className="Checkout-body">
        <div className="checkout__row price">
          <h6>Sub Total ({itemCount})</h6>
          <p>₹ {totalPrice}.00</p>
        </div>
        <div className="checkout__row discount">
          <h6>Discount</h6>
          <p></p>
        </div>
        <div className="checkout__row delivery__charges">
          <h6>Delivery Charges</h6>
          <div className="d-flex align-items-center gap-1">
            <p>will be decided</p>
            <div className="qstn__container">
              <div className="hover-icon">
                <span className="hover-text">
                  delivery cost is decided upon the location of delivery
                </span>
                <AiOutlineQuestionCircle />
              </div>
            </div>
          </div>
        </div>
        <div className="checkout__row total-amount">
          <h4>Total Amount</h4>
          <h4>₹ {totalPrice}.00</h4>
        </div>
      </div>
      <div className="checkout__footer">
        <Link
          to="/your-bag/check-out"
          className="place__order"
          state={{ data: cartData }}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
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
