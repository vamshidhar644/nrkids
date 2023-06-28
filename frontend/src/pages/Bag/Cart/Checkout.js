import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { FetchMongo } from '../../../BackOps/FetchMongo';

const Checkout = ({ data }) => {
  const { fetchcartData, cartItems } = FetchMongo();

  const [totalPrice, setTotalPrice] = useState();
  const [itemCount, setItemCount] = useState();

  useEffect(() => {
    fetchcartData();
  }, []);

  useEffect(() => {
    const totalPricing = () => {
      const Array = cartItems.filter((item) => item.price !== 0);
      let price = 0;
      if (Array) {
        for (let i = 0; i < Array.length; i++) {
          price += Array[i].price * Array[i].quantity;
        }

        setTotalPrice(price);

        const ArrayLength = Array.length;

        if (ArrayLength === 1) {
          setItemCount(ArrayLength + ' item');
        } else {
          setItemCount(ArrayLength + ' items');
        }
      }
    };

    totalPricing();
  }, [cartItems]);

  useEffect(() => {
    if (data) {
      fetchcartData();
    }
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
        <div className="checkout-row saved">
          <h6>You saved --- on this order</h6>
          <p></p>
        </div>
      </div>
      <div className="checkout-footer">
        <button className="place-order">Place Order</button>
        <button className="bg-white">Continue shopping</button>
      </div>
    </div>
  );
};

export default Checkout;
