import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FetchMongo } from '../../../BackOps/FetchMongo';
import './Checkout.css';

const Checkout = ({ data }) => {
  const { fetchcartData, cartItems } = FetchMongo();

  const [totalPrice, setTotalPrice] = useState();
  const [itemCount, setItemCount] = useState();

  const [cartData, setCartdata] = useState();

  useEffect(() => {
    fetchcartData();
  }, []);
  useEffect(() => {
    if (data) {
      fetchcartData();
    }
  }, [data]);

  useEffect(() => {
    const totalPricing = () => {
      let price = 0;
      let Arrayel = [];
      if (cartItems) {
        Arrayel = cartItems.filter((item) => item.price !== 0);
      }
      setCartdata(Arrayel);
      if (Arrayel) {
        for (let i = 0; i < Arrayel.length; i++) {
          price += Arrayel[i].price * Arrayel[i].quantity;
        }

        setTotalPrice(price);

        const ArrayLength = Arrayel.length;

        if (ArrayLength === 1) {
          setItemCount(ArrayLength + ' item');
        } else {
          setItemCount(ArrayLength + ' items');
        }
      }
    };

    totalPricing();
  }, [cartItems]);

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
          state={{ data: cartData, imgpath: '' }}
        >
          Place Order
        </Link>
        <Link to="/" className="bg-white">
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
